# Portfolio — Dynamic Cloud Portfolio

React + Vite frontend with Django REST Framework backend, PostgreSQL database, and Cloudinary media storage.

---

## What Changed

### Backend

| File | Change |
|------|--------|
| `config/settings.py` | Removed SQLite. Added PostgreSQL via env vars. Cloudinary storage configured. CORS from env. |
| `config/urls.py` | URL prefix changed from `/api/v1/` to `/api/` |
| `portfolio/models.py` | Replaced `Hero`/`Resume` (SingletonModel) with `PortfolioImage` + `Resume` (multi-record). Added `Contact`. Cloudinary auto-delete on image removal. Resume auto-deactivates old on new upload. |
| `portfolio/serializers.py` | `PortfolioImageSerializer` uploads to Cloudinary on create. `ResumeSerializer` validates PDF. |
| `portfolio/views.py` | Full CRUD for images. Resume list/upload/delete. Contact create. |
| `portfolio/urls.py` | New endpoints: `/api/images/`, `/api/resume/`, `/api/resume/upload/`, `/api/contact/` |
| `portfolio/admin.py` | Django admin for `PortfolioImage`, `Resume`, `Contact` |
| `portfolio/migrations/0004_*` | New migration for updated models |
| `work/models.py` | Stores projects, services, skills, and editable portfolio profile content. |
| `work/views.py` / `work/urls.py` | Public read endpoints for projects, services, skills, and profile content. |
| `work/admin.py` | Django admin management for projects, services, skills, and the portfolio profile. |
| `work/migrations/0003_content_api.py` | Adds API-backed content models and migrates the existing services, skills, and profile content. |
| `requirements.txt` | Added `psycopg2-binary`, `Pillow`. Pinned all versions. |
| `.env` / `.env.example` | Added `DB_*`, `CORS_ALLOWED_ORIGINS`, `CSRF_TRUSTED_ORIGINS` |

### Frontend

| File | Change |
|------|--------|
| `src/api/index.js` | New — axios API layer for images, resume, contact |
| `src/Pages/Admin/AdminLayout.jsx` | New — admin nav shell |
| `src/Pages/Admin/AdminImages.jsx` | New — upload/edit/delete/filter images |
| `src/Pages/Admin/AdminResume.jsx` | New — upload/replace/delete resume PDF |
| `src/main.jsx` | Added `/admin`, `/admin/images`, `/admin/resume` routes |
| `src/Pages/Resume.jsx` | Download button now fetches PDF URL from API (falls back to `/Resume.pdf`) |
| `src/Components/HeroSlider.jsx` | Fetches from `/api/images/?category=hero`, reads `image_url` field |
| `.env` / `.env.example` | Added `VITE_API_URL` |

---

## Local Setup

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL 14+ running locally

### 1. Clone & install

```bash
git clone <your-repo-url>
cd Portfolio
```

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

**Frontend:**
```bash
cd client
npm install
```

### 2. Configure environment variables

**`backend/.env`** — copy from `.env.example` and fill in:
```env
SECRET_KEY=your-django-secret-key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost

DB_NAME=portfolio_db
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

CORS_ALLOWED_ORIGINS=http://localhost:5173
CSRF_TRUSTED_ORIGINS=http://localhost:5173
```

**`client/.env`:**
```env
VITE_API_URL=http://127.0.0.1:8000/api
```

### 3. Create local PostgreSQL database

```bash
psql -U postgres
```
```sql
CREATE DATABASE portfolio_db;
\q
```

### 4. Run migrations

```bash
cd backend
python manage.py migrate
python manage.py createsuperuser
```

Create the initial admin account once. The Django admin then disables adding or deleting admin accounts; the account is shared with the existing JWT authentication endpoints.

### 5. Run the project

```bash
# Terminal 1 — backend
cd backend
source venv/bin/activate
python manage.py runserver

# Terminal 2 — frontend
cd client
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://127.0.0.1:8000/api/
- Django Admin: http://127.0.0.1:8000/admin/
- Portfolio Admin Dashboard: http://localhost:5173/admin/images

### Portfolio content API

The public frontend loads portfolio content from the backend API:

| Endpoint | Content |
|----------|---------|
| `GET /api/work/` | Projects |
| `GET /api/work/services/` | Active services |
| `GET /api/work/skills/` | Active skill categories |
| `GET /api/work/profile/` | Profile, contact, and social-link details |
| `GET /api/images/?category=hero` | Hero images |

After applying migrations, edit these records in Django admin. Add or remove project records under **Work → Works**; edit service and skill records under their respective sections, and update the singleton profile under **Work → Portfolio profiles**. The first content migration seeds the current services, skills, and profile details. Projects are not seeded from the old static JSON; only projects present in the API database appear on the site.

---

## Cloud PostgreSQL Setup (Neon — recommended free tier)

[Neon](https://neon.tech) provides a free serverless PostgreSQL database.

### Steps

1. Go to [neon.tech](https://neon.tech) → **Sign up** → **New Project**
2. Choose a region close to your deployment server
3. After creation, go to **Dashboard → Connection Details**
4. Select **Connection string** → copy the `postgresql://` URL

It looks like:
```
postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

5. Break it into individual env vars in `backend/.env`:

```env
DB_NAME=neondb
DB_USER=username
DB_PASSWORD=password
DB_HOST=ep-xxx.us-east-2.aws.neon.tech
DB_PORT=5432
```

6. Neon requires SSL. Add `OPTIONS` to your database config if you see SSL errors:

In `backend/config/settings.py`, update the `DATABASES` block:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST'),
        'PORT': config('DB_PORT', cast=int, default=5432),
        'OPTIONS': {'sslmode': 'require'},
    }
}
```

7. Run migrations against the cloud DB:
```bash
cd backend
python manage.py migrate
python manage.py createsuperuser
```

> **Alternatives:** Supabase (free), Railway ($5/mo), Render (free tier), AWS RDS.

---

## Cloudinary Setup

1. Go to [cloudinary.com](https://cloudinary.com) → **Sign up free**
2. Dashboard → copy **Cloud Name**, **API Key**, **API Secret**
3. Paste into `backend/.env`

Images are stored under `portfolio/images/`, resumes under `resumes/`.

---

## API Reference

The interactive API documentation is available at `/api/schema/swagger-ui/` (Swagger UI) and `/api/schema/redoc/` (ReDoc). The generated OpenAPI schema is at `/api/schema/`.

---

## Deployment

### Backend — Render (free tier)

1. Push code to GitHub
2. Go to [render.com](https://render.com) → **New Web Service** → connect repo
3. Set:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn config.wsgi:application`
4. Add all env vars from `backend/.env` in the **Environment** tab
5. Set `DEBUG=False`, `ALLOWED_HOSTS=your-render-domain.onrender.com`
6. Add `gunicorn` to `requirements.txt`:
   ```
   gunicorn==21.2.0
   ```
7. After deploy, run migrations via Render Shell:
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```

### Frontend — Vercel (free)

1. Go to [vercel.com](https://vercel.com) → **New Project** → connect repo
2. Set **Root Directory** to `client`
3. Add environment variable:
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   ```
4. Deploy — Vercel auto-detects Vite

### Update CORS after deployment

In `backend/.env` on Render:
```env
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
CSRF_TRUSTED_ORIGINS=https://your-frontend.vercel.app
ALLOWED_HOSTS=your-backend.onrender.com
```

---

## Admin Dashboard

| Route | Description |
|-------|-------------|
| `/admin/images` | Upload, edit, delete, filter portfolio images |
| `/admin/resume` | Upload/replace/delete resume PDF |

> Sign in at `/admin/login` with the single admin account to access the React dashboard. Resume uploads are stored in Cloudinary. Django's built-in admin is also available at `/admin/` (requires superuser login).
> In Django admin, **Portfolio → Resumes** supports uploading PDF files (max 10 MB) directly to Cloudinary, editing metadata/active status, and deleting records. Add a new resume to replace the active file; previous versions are retained until explicitly deleted.

---

## Project Structure

```
Portfolio/
├── backend/
│   ├── config/
│   │   ├── settings.py
│   │   └── urls.py
│   ├── portfolio/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   └── migrations/
│   ├── requirements.txt
│   ├── .env
│   └── .env.example
└── client/
    ├── src/
    │   ├── api/
    │   │   └── index.js
    │   ├── Pages/
    │   │   ├── Admin/
    │   │   │   ├── AdminLayout.jsx
    │   │   │   ├── AdminImages.jsx
    │   │   │   └── AdminResume.jsx
    │   │   └── Resume.jsx  (updated)
    │   ├── Components/
    │   │   └── HeroSlider.jsx  (updated)
    │   └── main.jsx  (updated)
    ├── .env
    └── .env.example
```
