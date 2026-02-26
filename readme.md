# 🌍 GreenKisan-AI Geospatial Biomass Intelligence System

An end‑to‑end modular AI system integrating satellite imagery, deep learning, time‑series forecasting, and decision intelligence.

---

## 📌 Overview

This project consists of three independent but integrated machine learning modules:

- **CNN** → Satellite-based Biomass Estimation  
- **LSTM** → AQI Time-Series Forecasting  
- **XGBoost Decision Layer** → Burn Risk Prediction & Buyer Matching  

Each module is developed separately and connected through a structured pipeline.

---

# 🗂 Project Structure
project-root/
│
├── CNN/
│ ├── files/
│ │ ├── cnn_model.py
│ │ ├── dataset_builder.py
│ │ ├── sentinel_downloader.py
│ │ ├── torch_dataset.py
│ │ ├── train_cnn.py
│ │ ├── inference.py
│ │ ├── real_data_pipeline.py
│ │ └── requirements.txt
│ ├── data/
│ ├── checkpoints/
│ ├── outputs/
│ └── cnn_env/
│
├── LSTM/
│ ├── download_data.py
│ ├── model.py
│ ├── train.py
│ ├── evaluate.py
│ ├── data/
│ ├── checkpoints/
│ ├── outputs/
│ └── venv/
│
├── XGboost_decision/
│ ├── xgboost_decision.py
│ ├── pipeline.py
│ ├── buyer_matching.py
│ ├── checkpoints/
│ ├── outputs/
│ └── venv/
│
└── README.md


---

# 🧠 Module Details

---

## 1️⃣ CNN Module – Biomass Estimation

### Purpose
Estimate crop residue biomass from Sentinel‑2 satellite imagery.

### Key Features
- Uses Sentinel‑2 bands (B02, B03, B04, B08)
- 128×128 patch extraction
- Reflectance normalization
- Outputs:
  - Biomass (tons/hectare)
  - 128‑dim embedding vector
- R² ≈ 0.85  
- RMSE ≈ 1.5 t/ha  

### Train CNN

```bash
cd CNN/files
pip install -r requirements.txt
python train_cnn.py
Run Inference
python inference.py
2️⃣ LSTM Module – AQI Forecasting
Purpose
Predict future AQI using historical time‑series data and CNN features.

Train LSTM
cd LSTM
python train.py
Evaluate
python evaluate.py
3️⃣ XGBoost Decision Module
Purpose
Predict burn risk probability and perform buyer matching.

Train Model
cd XGboost_decision
python xgboost_decision.py
Run Full Pipeline
python pipeline.py
🔄 Integrated Workflow
Satellite Image
      ↓
CNN → Biomass + Embedding
      ↓
LSTM → AQI Prediction
      ↓
XGBoost → Burn Risk Score
      ↓
Buyer Matching
⚙ Requirements
Python 3.10+

PyTorch

XGBoost

NumPy

Pandas

Scikit‑learn

SentinelHub API

Each module can run independently inside its own virtual environment.

👨‍💻 Team
Arein Jain
Aryan Tripathi
Nancy Gupta