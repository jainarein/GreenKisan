# 🌱 GreenKisan

![Python](https://img.shields.io/badge/Python-3.10+-blue)
![PyTorch](https://img.shields.io/badge/PyTorch-Deep%20Learning-red)
![XGBoost](https://img.shields.io/badge/XGBoost-ML-orange)
![React](https://img.shields.io/badge/React-Frontend-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-TS-blue)
![Vite](https://img.shields.io/badge/Vite-BuildTool-purple)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

GreenKisan is a modular AI-driven geospatial intelligence system integrating satellite imagery, deep learning, and time-series forecasting into a unified environmental decision pipeline.

The platform combines spatial and temporal modeling to generate biomass estimation, AQI forecasting, and burn risk prediction using a scalable architecture.

---

# 🚀 System Overview

GreenKisan integrates three independent AI modules:

- **CNN** → Biomass Estimation from Sentinel‑2 imagery  
- **LSTM** → AQI Time-Series Forecasting  
- **XGBoost** → Burn Risk Prediction & Decision Logic  

All modules are connected through a structured pipeline.

---

# 🧠 System Workflow
Sentinel‑2 Satellite Image
↓
CNN → Biomass + 128‑dim Embedding
↓
LSTM → AQI Forecast
↓
XGBoost → Burn Risk Probability
↓
Buyer Matching Logic
↓
Frontend Dashboard


---

# 📂 Project Structure
GreenKisan/
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
├── Frontend/
│ ├── src/
│ ├── public/
│ ├── index.html
│ ├── package.json
│ ├── vite.config.ts
│ ├── tailwind.config.js
│ ├── postcss.config.js
│ ├── tsconfig.json
│ ├── eslint.config.js
│ ├── node_modules/
│ └── dist/
│
└── README.md


---

# 📊 Module Details

## 1️⃣ CNN – Biomass Estimation

- Input: Sentinel‑2 bands (B02, B03, B04, B08)
- Patch size: 128×128
- Output:
  - Biomass (tons/hectare)
  - 128‑dim embedding
- Performance:
  - R² ≈ 0.85
  - RMSE ≈ 1.5 t/ha
- Realistic agronomic constraint: 0–12 t/ha

### Train CNN

```bash
cd CNN/files
pip install -r requirements.txt
python train_cnn.py
Run Inference
python inference.py
2️⃣ LSTM – AQI Forecasting
Input:

Historical AQI

CNN embeddings

Output:

Future AQI prediction

Train LSTM
cd LSTM
python train.py
Evaluate
python evaluate.py
3️⃣ XGBoost – Burn Risk & Decision Layer
Input:

CNN embedding

LSTM AQI output

Output:

Burn risk probability

Buyer recommendation

Train Model
cd XGboost_decision
python xgboost_decision.py
Run Integrated Pipeline
python pipeline.py
🌐 Frontend (React + TypeScript + Vite + Tailwind)
Modern UI dashboard for visualization and decision support.

Install Dependencies
cd Frontend
npm install
Run Development Server
npm run dev
Runs at:

http://localhost:5173
Production Build
npm run build
Output will be generated inside:

Frontend/dist/
⚙ Requirements
Backend / ML
Python 3.10+

PyTorch

XGBoost

NumPy

Pandas

Scikit‑learn

SentinelHub API

Frontend
Node.js 18+

npm

Each module can run independently inside its own virtual environment.

🔬 Key Highlights
Real Sentinel‑2 satellite integration

Deep learning–based biomass estimation

Time-series AQI modeling

Probabilistic burn risk prediction

Modular scalable architecture

Separate ML environments

Modern frontend with TypeScript

🏗 Architecture Design
GreenKisan follows a modular micro‑component architecture:

Independent model training

Embedding reuse for efficiency

Clear separation of spatial and temporal modeling

Scalable frontend integration

👨‍💻 Team
Arein Jain

Aryan Tripathi

Nancy Gupta

🌍 Vision
Building scalable AI-powered geospatial intelligence systems for environmental analytics, sustainable agriculture, and smart decision support.
