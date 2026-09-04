# CropShield deployment

## Backend — Render
1. Push this repository to GitHub.
2. In Render, create a Web Service from the repository, or use the included `render.yaml`.
3. Build command: `pip install -r backend/requirements.txt`
4. Start command: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`
5. Set `ALLOWED_ORIGINS` to the exact Vercel frontend URL, e.g. `https://your-project.vercel.app`.
6. After deployment, verify `https://YOUR-RENDER-SERVICE.onrender.com/docs` and `/api/health`.

## Frontend — Vercel
1. Import the same GitHub repository into Vercel.
2. Framework: Vite.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Add environment variable `VITE_API_URL` with your Render backend URL, without a trailing slash.
6. Redeploy.

The frontend now calls `${VITE_API_URL}/api/health` instead of assuming the API is on the same host.

## Important
Never commit `.env` or real API keys.
