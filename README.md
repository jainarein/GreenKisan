# GreenKisan

![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-2.x-EE4C2C?logo=pytorch&logoColor=white)
![XGBoost](https://img.shields.io/badge/XGBoost-1.7%2B-blue?logo=xgboost&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**GreenKisan** is a modular AI-driven geospatial intelligence system integrating satellite imagery, deep learning, and time-series forecasting into a unified environmental decision pipeline. Designed for agricultural intelligence and environmental monitoring, it combines convolutional neural networks, LSTM-based forecasting, and gradient-boosted decision trees to deliver actionable insights from raw satellite data.

---

## Table of Contents

- [System Architecture](#system-architecture)
- [Modules Overview](#modules-overview)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [CNN Module](#cnn-module)
  - [LSTM Module](#lstm-module)
  - [XGBoost Module](#xgboost-module)
  - [Frontend](#frontend)
- [Training](#training)
- [Running the System](#running-the-system)
- [Production Build](#production-build)
- [Performance Benchmarks](#performance-benchmarks)
- [License](#license)

---

## System Architecture

```
Farmer (Mobile/Web App)
        │
        ▼
Enter GPS Location (Lat, Lon)
        │
        ▼
FastAPI Backend
        │
        ▼
Sentinel‑2 Image Fetch (Cloud < 20%)
        │
        ▼
CNN Model (Biomass + 128D Embedding)
        │
        ├──────────────► LSTM (AQI Forecast)
        │
        ▼
XGBoost (Burn Risk Prediction)
        │
        ▼
Decision & Buyer Matching
        │
        ▼
Frontend Dashboard Output
```

---

## Screenshots

**Login — BioSphere Authentication Portal**

Multilingual authentication interface supporting English, Hindi, and Punjabi. Entry point to the BioSphere platform with secure credential-based access.

---

**Farmer Intelligence Center — Dashboard**

Farmer-facing intelligence dashboard displaying real-time CNN-derived biomass output (Detected Residue: 14.2 t/ha), verified field area (45.5 Acres), projected earnings (Rs. 42,500), and a live biomass output progress tracker. Supports multilingual UI and bottom-navigation for Home, Market, Dashboard, and Profile modules.

---

## Modules Overview

### CNN Module — Biomass Estimation

Processes multispectral Sentinel-2 satellite imagery to estimate above-ground biomass and produce dense feature embeddings for downstream modules.

| Property        | Value                          |
|-----------------|--------------------------------|
| Input Bands     | B02, B03, B04, B08             |
| Patch Size      | 128 x 128 pixels               |
| Output          | Biomass (t/ha), 128-d embedding|
| R²              | ~0.85                          |
| RMSE            | ~1.5 t/ha                      |

### LSTM Module — AQI Forecasting

Performs sequential time-series forecasting of Air Quality Index using historical AQI measurements and CNN-derived spatial embeddings as context signals.

| Property        | Value                          |
|-----------------|--------------------------------|
| Input           | Historical AQI, CNN embeddings |
| Output          | Future AQI values              |

### XGBoost Module — Burn Risk and Buyer Matching

Gradient-boosted decision tree ensemble for dual-objective prediction: agricultural burn risk classification and buyer-farmer matching based on environmental and biomass signals.

| Property        | Value                          |
|-----------------|--------------------------------|
| Input           | CNN embeddings, LSTM output    |
| Output          | Burn risk probability, buyer match |

### Frontend

Interactive geospatial dashboard built with React and TypeScript, consuming module outputs for visualization and decision support.

| Property        | Value                          |
|-----------------|--------------------------------|
| Framework       | React 18 + TypeScript          |
| Build Tool      | Vite                           |
| Styling         | Tailwind CSS                   |
| Runtime         | Node.js + npm                  |
| Dev Server      | localhost:5173                 |

---

## Project Structure

```
GreenKisan/
├── CNN/
│   ├── model.py                # CNN architecture definition
│   ├── dataset.py              # Sentinel-2 patch loader
│   ├── train.py                # Training loop and checkpointing
│   ├── inference.py            # Biomass prediction and embedding export
│   ├── utils.py                # Preprocessing utilities
│   └── requirements.txt
│
├── LSTM/
│   ├── model.py                # LSTM architecture definition
│   ├── dataset.py              # Time-series AQI data loader
│   ├── train.py                # Training loop
│   ├── inference.py            # AQI forecasting
│   ├── utils.py                # Sequence utilities
│   └── requirements.txt
│
├── XGboost_decision/
│   ├── train.py                # XGBoost training and hyperparameter tuning
│   ├── inference.py            # Burn risk and buyer matching prediction
│   ├── feature_engineering.py  # Feature construction from embeddings
│   ├── buyer_matching.py       # Buyer-farmer matching logic
│   └── requirements.txt
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Route-level page components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API integration layer
│   │   ├── types/              # TypeScript type definitions
│   │   └── main.tsx            # Entry point
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
└── README.md
```

---

## Prerequisites

**Python Modules (CNN, LSTM, XGBoost)**

- Python 3.10 or higher
- pip 23+
- CUDA 11.8+ (recommended for CNN and LSTM GPU training)

**Frontend**

- Node.js 18.x or higher
- npm 9.x or higher

---

## Installation

### CNN Module

```bash
cd CNN
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

**Key dependencies:** `torch`, `torchvision`, `rasterio`, `numpy`, `scikit-learn`, `matplotlib`

---

### LSTM Module

```bash
cd LSTM
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

**Key dependencies:** `torch`, `pandas`, `numpy`, `scikit-learn`

---

### XGBoost Module

```bash
cd XGboost_decision
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

**Key dependencies:** `xgboost`, `scikit-learn`, `pandas`, `numpy`, `joblib`

---

### Frontend

```bash
cd Frontend
npm install
```

---

## Training

### Train CNN (Biomass Estimation)

```bash
cd CNN
source venv/bin/activate
python train.py \
  --data_dir ./data/sentinel2_patches \
  --epochs 128 \
  --batch_size 8 \
  --lr 5e-4 \
  --output_dir ./checkpoints
```

### Train LSTM (AQI Forecasting)

```bash
cd LSTM
source venv/bin/activate
python train.py \
  --data_dir ./data/aqi_series \
  --embedding_dir ../CNN/embeddings \
  --epochs 80 \
  --batch_size 64 \
  --seq_len 30 \
  --output_dir ./checkpoints
```

### Train XGBoost (Burn Risk + Buyer Matching)

```bash
cd XGboost_decision
source venv/bin/activate
python train.py \
  --embedding_dir ../CNN/embeddings \
  --lstm_output_dir ../LSTM/outputs \
  --labels_path ./data/burn_labels.csv \
  --model_output_dir ./models
```

---

## Running the System

### Run CNN Inference

```bash
cd CNN
source venv/bin/activate
python inference.py \
  --checkpoint ./checkpoints/best_model.pth \
  --input_dir ./data/sentinel2_patches \
  --output_dir ./embeddings
```

### Run LSTM Inference

```bash
cd LSTM
source venv/bin/activate
python inference.py \
  --checkpoint ./checkpoints/best_model.pth \
  --embedding_dir ../CNN/embeddings \
  --aqi_input ./data/aqi_series/latest.csv \
  --output_dir ./outputs
```

### Run XGBoost Inference

```bash
cd XGboost_decision
source venv/bin/activate
python inference.py \
  --model_dir ./models \
  --embedding_dir ../CNN/embeddings \
  --lstm_output_dir ../LSTM/outputs \
  --output_path ./results/predictions.csv
```

### Run Frontend (Development)

```bash
cd Frontend
npm run dev
```

The development server will be available at `http://localhost:5173`.

---

## Production Build

### Frontend Production Build

```bash
cd Frontend
npm run build
```

Build artifacts are output to `Frontend/dist/`. To preview the production build locally:

```bash
npm run preview
```

### Model Packaging

To export trained models for deployment:

```bash
# Export CNN model to TorchScript
cd CNN
python -c "
import torch
from model import BiomassNet
model = BiomassNet()
model.load_state_dict(torch.load('./checkpoints/best_model.pth'))
scripted = torch.jit.script(model)
scripted.save('./export/biomassnet_scripted.pt')
"

# Export XGBoost model
cd XGboost_decision
python -c "
import joblib
model = joblib.load('./models/burn_risk_model.pkl')
joblib.dump(model, './export/burn_risk_model_prod.pkl', compress=3)
"
```

---

## Performance Benchmarks

| Module         | Metric   | Value        |
|----------------|----------|--------------|
| CNN (Biomass)  | R²       | ~0.85        |
| CNN (Biomass)  | RMSE     | ~0.44 t/ha    |
| LSTM (AQI)     | MAE      | Evaluated on holdout set |
| XGBoost        | AUC-ROC  | Evaluated on burn risk test set |

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
