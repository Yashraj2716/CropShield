# CropShield — SIH26131

**AI-Powered Crop-Health Early-Warning Platform for Farmers and Agricultural Authorities**  
*Problem Statement:* SIH26131 — Early Detection and Management of Crop Diseases & Pest Infestation  
*Target Agro-Ecology:* Maharashtra (Tomato, Cotton, Soybean)

---

## 1. Project Overview & Architecture

CropShield bridges the gap between field-level foliar symptom detection and regional outbreak prevention. Rather than functioning solely as an isolated leaf classifier, it fuses:
1. **Lightweight Edge Image Classification** (MobileNetV3 on 12 defensible agricultural classes).
2. **Microclimate Vulnerability Modeling** (Open-Meteo temperature, humidity, rainfall).
3. **Phenological Susceptibility Weighting** (Growth-stage vulnerability).
4. **KVK / Agriculture Authority GIS Triage** (Anonymized spatial outbreak heatmaps and ground-truth verification).
5. **Non-Hallucinatory Integrated Pest Management (IPM)** (Curated guidelines in Marathi, Hindi, and English).

```
CropShield/
├── backend/                  # FastAPI Application
│   ├── app/
│   │   ├── api/              # API Endpoints (health, diagnose, weather, risk, gis)
│   │   ├── core/             # Configuration & Environment Variables
│   │   ├── models/           # SQLAlchemy DB Models (Farmer, Farm, TriageRecord)
│   │   ├── schemas/          # Pydantic Schemas for Input/Output Validation
│   │   └── services/         # Vision Inference, Weather Client, Risk Engine
│   ├── requirements.txt      # Python Dependencies
│   └── main.py               # Local FastAPI Entrypoint
├── frontend/ (src/)          # React 18 + Tailwind CSS + Lucide Icons
│   ├── components/           # Farmer UI, GIS Heatmap, Expert Dashboard
│   └── App.tsx               # Main Application Orchestrator
├── ml/                       # Machine Learning Pipeline
│   ├── dataset/              # Dataset Documentation & Preprocessing scripts
│   ├── training/             # PyTorch MobileNetV3 Training & Evaluation scripts
│   └── inference/            # Model Loading & Prediction Handlers
├── .env.example              # Environment Variable Template
├── .gitignore                # Source Control Exclusions
└── README.md                 # Project Guide
```

---

## 2. Quick Start for Beginners

### A. Python Backend (FastAPI)
1. Ensure Python 3.10+ is installed:
   ```bash
   python3 --version
   ```
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
4. Run the FastAPI development server:
   ```bash
   uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
   ```
5. Test the Health Check endpoint in your browser or terminal:
   - **Interactive API Docs (Swagger):** `http://localhost:8000/docs`
   - **Health Check:** `http://localhost:8000/api/health`

### B. Frontend (React + Vite)
1. Install Node.js dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your web browser.

---

## 3. Supported Crops & Initial Classes (MVP)

| Crop | Disease / Pest Condition | Pathogen / Sign | Field Significance in Maharashtra |
| :--- | :--- | :--- | :--- |
| **Tomato** | Early Blight | *Alternaria solani* | Fungal foliar necrosis in humid conditions |
| | Late Blight | *Phytophthora infestans* | Rapid water-mold collapse in rainy periods |
| | Yellow Leaf Curl | Geminivirus (Whitefly) | Vector-driven foliar curl and stunting |
| | Healthy Leaf | Baseline control | Normal vegetative control |
| **Cotton** | Bacterial Blight | *Xanthomonas citri* | Angular leaf spot common in Vidarbha/Marathwada |
| | Target / Leaf Spot | *Corynespora casiicola* | Mid-season fungal foliar spotting |
| | Sucking Pest Curl | Aphids / Thrips damage | Early-season leaf curling and cupping |
| | Healthy Leaf | Baseline control | Normal vegetative control |
| **Soybean** | Soybean Rust | *Phakopsora pachyrhizi* | Destructive Kharif foliar epidemic threat |
| | Yellow Mosaic | MYMV (Whitefly vector) | Chlorotic patches and yield suppression |
| | Foliar Pest Damage | *Spodoptera litura* sign | Chewing and shot-hole feeding damage |
| | Healthy Leaf | Baseline control | Normal vegetative control |
