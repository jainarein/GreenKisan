"""
torch_dataset.py
================
Dataset for BiomassCNN — NaN-safe, global normalisation
"""

from __future__ import annotations

import logging
from pathlib import Path
from typing import Optional, Tuple, Union

import numpy as np
import pandas as pd
import torch
from torch.utils.data import Dataset

logger = logging.getLogger(__name__)


class BiomassDataset(Dataset):

    def __init__(
        self,
        metadata_csv:   str,
        data_root:      str                  = "data",
        augment:        bool                 = False,
        require_labels: bool                 = True,
        channel_mean:   Optional[np.ndarray] = None,
        channel_std:    Optional[np.ndarray] = None,
        label_mean:     float                = 0.0,
        label_std:      float                = 1.0,
    ):
        df      = pd.read_csv(metadata_csv)
        self.df = df[df["valid"] == True].reset_index(drop=True)

        if require_labels:
            before  = len(self.df)
            self.df = self.df.dropna(subset=["biomass_label"]).reset_index(drop=True)
            dropped = before - len(self.df)
            if dropped:
                logger.warning(f"[Dataset] Dropped {dropped} samples without labels")

        self.data_root      = Path(data_root)
        self.augment        = augment
        self.require_labels = require_labels
        self.label_mean     = label_mean
        self.label_std      = label_std

        # Default fallback stats (will be overridden by compute_dataset_stats)
        self.channel_mean = channel_mean if channel_mean is not None else np.zeros(5, dtype=np.float32)
        self.channel_std  = channel_std  if channel_std  is not None else np.ones(5,  dtype=np.float32)

        logger.info(
            f"[Dataset] {len(self.df)} samples | augment={augment} | "
            f"label_mean={label_mean:.3f} label_std={label_std:.3f}"
        )

    def __len__(self):
        return len(self.df)

    def __getitem__(self, idx):
        row      = self.df.iloc[idx]
        img_path = self.data_root / row["image_path"]

        # ── Load & sanitise ───────────────────────────────────────────────────
        try:
            img = np.load(str(img_path)).astype(np.float32)
        except FileNotFoundError:
            logger.error(f"[Dataset] Missing: {img_path}")
            img = np.zeros((5, 128, 128), dtype=np.float32)

        # CRITICAL: replace NaN/Inf from cloud masks / missing pixels
        img = np.nan_to_num(img, nan=0.0, posinf=1.0, neginf=0.0)

        # ── Global channel normalisation ──────────────────────────────────────
        mean = self.channel_mean[:, None, None]
        std  = self.channel_std[:, None, None] + 1e-6
        img  = (img - mean) / std

        # Final NaN guard after normalisation
        img = np.nan_to_num(img, nan=0.0, posinf=0.0, neginf=0.0)

        # ── Augmentation ──────────────────────────────────────────────────────
        if self.augment:
            if np.random.rand() > 0.5:
                img = np.flip(img, axis=2).copy()
            if np.random.rand() > 0.5:
                img = np.flip(img, axis=1).copy()
            k   = np.random.randint(0, 4)
            img = np.rot90(img, k=k, axes=(1, 2)).copy()
            if np.random.rand() > 0.5:
                img = img + np.random.normal(0, 0.02, img.shape).astype(np.float32)
            if np.random.rand() > 0.5:
                jitter = np.random.uniform(0.9, 1.1, (img.shape[0], 1, 1)).astype(np.float32)
                img    = img * jitter

        x = torch.from_numpy(img).float()

        if self.require_labels:
            raw_label    = float(row["biomass_label"])
            normed_label = (raw_label - self.label_mean) / (self.label_std + 1e-6)
            y            = torch.tensor(normed_label, dtype=torch.float32)
            return x, y

        return x


# -----------------------------------------------------------------------------
# COMPUTE DATASET STATISTICS — training split only, no leakage
# -----------------------------------------------------------------------------
def compute_dataset_stats(
    metadata_csv: str,
    data_root:    str = "data",
    train_ratio:  float = 0.8,
) -> Tuple[np.ndarray, np.ndarray, float, float]:
    """
    Returns (channel_mean, channel_std, label_mean, label_std)
    computed over training portion only.
    """
    # Load raw (no normalisation) to compute stats
    tmp_ds = BiomassDataset(
        metadata_csv   = metadata_csv,
        data_root      = data_root,
        augment        = False,
        require_labels = True,
        channel_mean   = np.zeros(5, dtype=np.float32),
        channel_std    = np.ones(5,  dtype=np.float32),
        label_mean     = 0.0,
        label_std      = 1.0,
    )

    n_train = int(len(tmp_ds) * train_ratio)
    logger.info(f"[Stats] Computing over {n_train} training samples...")

    all_imgs   = []
    all_labels = []

    for i in range(n_train):
        x, y = tmp_ds[i]
        arr  = x.numpy()
        # Skip completely-zero images
        if arr.sum() != 0:
            all_imgs.append(arr)
        all_labels.append(y.item())

    imgs = np.stack(all_imgs)          # (N, C, H, W)

    ch_mean    = imgs.mean(axis=(0, 2, 3))
    ch_std     = imgs.std(axis=(0, 2, 3)) + 1e-6

    labels     = np.array(all_labels, dtype=np.float32)
    label_mean = float(labels.mean())
    label_std  = float(labels.std()) + 1e-6

    logger.info(f"[Stats] ch_mean   : {np.round(ch_mean, 4)}")
    logger.info(f"[Stats] ch_std    : {np.round(ch_std, 4)}")
    logger.info(f"[Stats] label_mean: {label_mean:.4f}  label_std: {label_std:.4f}")

    return ch_mean, ch_std, label_mean, label_std