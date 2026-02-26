# LSTM AQI Forecasting — Real Data Pipeline
### CNN (Biomass) → LSTM (Pollution Forecast) → Impact Estimation

---

## Files

```
lstm_aqi/
├── download_data.py   ← STEP 1: pull real data from 3 free APIs
├── train.py           ← STEP 2: train LSTM on merged_dataset.csv
├── evaluate.py        ← STEP 3: metrics + plots + pipeline inference
├── model.py           ← LSTM architecture (attention + stacked layers)
├── data/
│   └── merged_dataset.csv     ← produced by download_data.py
├── checkpoints/
│   ├── best_lstm.pt
│   └── scaler.pkl
└── outputs/
    ├── forecast_vs_actual.png
    └── attention_weights.png
```

---

## Step 1 — Get Free API Keys (5 minutes)

| API | What it provides | Sign-up URL |
|---|---|---|
| **Open-Meteo** | Weather (temp, humidity, wind) | ❌ No key needed |
| **OpenAQ v3** | PM2.5 → AQI for Punjab stations | https://explore.openaq.org/register |
| **NASA FIRMS** | Fire Radiative Power (biomass proxy) | https://firms.modaps.eosdis.nasa.gov/usfs/api/area/ |

---

## Step 2 — Download Data

```bash
pip install requests pandas numpy tqdm

# Full download (all 3 sources):
python download_data.py --openaq-key YOUR_KEY --firms-key YOUR_KEY

# Weather only (no keys needed, uses seasonal biomass fallback):
python download_data.py --weather-only
```

This produces `data/merged_dataset.csv` with **~2,100 rows** (2019–2024) and these columns:

| Column | Source | Description |
|---|---|---|
| `date` | — | Daily timestamp |
| `aqi` | OpenAQ | Air Quality Index (target) |
| `temperature` | Open-Meteo | °C, daily mean |
| `humidity` | Open-Meteo | %, daily mean |
| `wind_speed` | Open-Meteo | m/s, daily mean |
| `precipitation` | Open-Meteo | mm/day |
| `solar_radiation` | Open-Meteo | MJ/m² |
| `day_of_year` | computed | 1–365 |
| `month` | computed | 1–12 |
| `weekday` | computed | 0–6 |
| `doy_sin / doy_cos` | computed | Cyclical time encoding |
| `aqi_lag1` | computed | Yesterday's AQI |
| `aqi_lag7` | computed | Same day last week |
| `aqi_7d_mean` | computed | 7-day rolling mean |
| `biomass_tons_per_ha` | NASA FIRMS | Fire radiative power → tons/ha |

---

## Step 3 — Train

```bash
pip install torch scikit-learn pandas numpy matplotlib joblib

# Next-day forecast:
python train.py --data data/merged_dataset.csv --horizon 1

# Next-week forecast:
python train.py --data data/merged_dataset.csv --horizon 7 --seq-len 60

# All options:
python train.py --help
```

---

## Step 4 — Evaluate

```bash
python evaluate.py
```

Produces:
- `outputs/forecast_vs_actual.png` — predicted vs real AQI over test period
- `outputs/attention_weights.png` — which past days the LSTM focused on

---

## Step 5 — Use in Your CNN→LSTM Pipeline

```python
from evaluate import predict_aqi

result = predict_aqi(
    recent_df=last_30_days_dataframe,     # DataFrame with all 15 feature columns
    biomass_prediction=cnn_model_output,  # float, tons/ha from your CNN
)

print(result)
# {
#   'predicted_aqi'   : 247.3,
#   'impact_category' : 'Very Unhealthy',
#   'health_advisory' : 'Avoid all outdoor activity; issue public health alert',
#   'risk_flag'       : True
# }
```

---

## Architecture Improvements (vs dummy version)

| Feature | Old (dummy) | New (real data) |
|---|---|---|
| Input features | 7 | 15 (+ lag features, cyclical time) |
| Scaler | MinMaxScaler | **RobustScaler** (handles AQI outliers) |
| Temporal context | Last hidden state only | **Attention** over all 30 timesteps |
| Time encoding | raw day/month | **sin/cos** (no boundary discontinuity) |
| Autoregressive | None | aqi_lag1, aqi_lag7, aqi_7d_mean |
| Scheduler | ReduceLROnPlateau | **CosineAnnealingWarmRestarts** |
| Loss | HuberLoss(δ=1.0) | **HuberLoss(δ=1.5)** |