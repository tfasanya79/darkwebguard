# DarkWebGuard

## MVP Feature Breakdown

**1. Brand Monitoring**
- Users can add and manage a list of brand names to monitor.

**2. Dark Web & Scam Forum Crawling**
- Automated crawlers scan dark web and scam forums for mentions of monitored brands.
- Crawlers run on a schedule and aggregate findings.

**3. Alerting System**
- When a brand is mentioned, an alert is generated.
- Alerts are delivered via email and shown in the user dashboard.

**4. User Authentication & Subscription Management**
- Secure user registration and login (JWT or OAuth).
- Subscription/payment integration (e.g., Stripe) for monthly plans.

**5. Admin Dashboard**
- Admins can view all users, brands, and alerts.
- Manage subscriptions and system health.

## Tech Stack
- **Backend:** Python (FastAPI), SQLAlchemy, SQLite/PostgreSQL
- **Frontend:** React (TypeScript), Tailwind CSS
- **Crawlers:** Python scripts/services
- **Deployment:** Docker, Nginx, Cloud provider (AWS, DigitalOcean, etc.)

## Project Structure (Key Directories)
- `backend/` — API, business logic, database models
- `frontend/` — React app for dashboard and user interface
- `scanner/` — Crawlers for dark web and scam forums
- `deploy/` — Deployment scripts and configs
- `docs/` — Architecture and technical documentation

## Next Steps
1. Finalize and document MVP features (this section)
2. Set up backend API endpoints for users, brands, and alerts
3. Implement authentication and subscription logic
4. Build frontend dashboard and alert views
5. Develop and schedule crawlers
6. Integrate alerting and notifications
7. Prepare for deployment (Docker, Nginx, cloud setup)

---
This README will be updated as the project evolves. See `docs/` for more detailed technical documentation.

## Crawler Integration Plan

- Crawlers in `scanner/forum_crawlers/` will be run as background services or scheduled jobs (e.g., with cron or APScheduler).
- Each crawler will:
  1. Fetch the list of brands from the backend database (via direct DB access or API).
  2. Scan dark web/scam forums for mentions of these brands.
  3. For each new mention, create an alert in the database (if not already present).
- Alerts will be visible in the dashboard and can trigger notifications.

## Deployment Plan

- Dockerize backend and frontend for consistent deployment.
- Use Nginx as a reverse proxy to serve the frontend and route API requests to the backend.
- Prepare `docker-compose.yml` for local and cloud deployment.
- Add environment variable support for secrets and configuration.
- Target cloud providers: DigitalOcean, AWS, or similar.

---
Next: Implement backend-crawler connection and scheduling, then Docker and deployment setup.

## Planned API Endpoints (MVP)

### Users
- `POST /api/users/register` — Register a new user
- `POST /api/users/login` — User login (returns JWT)
- `GET /api/users/me` — Get current user profile

### Brands
- `GET /api/brands` — List brands monitored by the user
- `POST /api/brands` — Add a new brand to monitor
- `DELETE /api/brands/{brand_id}` — Remove a brand

### Alerts
- `GET /api/alerts` — List alerts for the user
- `GET /api/alerts/{alert_id}` — Get alert details
- `POST /api/alerts/mark_read` — Mark alert as read

### Admin (MVP)
- `GET /api/admin/users` — List all users
- `GET /api/admin/alerts` — List all alerts

## Core Data Models (Simplified)

**User**: id, email, password_hash, is_admin, subscription_status
**Brand**: id, user_id, name, created_at
**Alert**: id, brand_id, mention_context, source, timestamp, is_read

---
Next: Implement backend structure and endpoints in `backend/app/`.

---

# Professional Production & DevOps Best Practices

## Backend Dockerfile (Production-Ready)
- Uses multi-stage build for smaller images and security.
- Installs system dependencies for Python wheels and PostgreSQL support.
- Uses a non-root user (`appuser`) for security.
- Installs dependencies from `requirements.txt` for reproducibility and caching.
- Exposes only the necessary port (8000).
- Uses Uvicorn with production flags (`--proxy-headers`, `--forwarded-allow-ips=*`).

## Environment Variables
- All secrets and config (e.g., `SECRET_KEY`, DB URL) are managed via `.env` files and loaded with `python-dotenv`.
- `.env.example` is provided for onboarding and CI/CD reference.

## CI/CD (GitHub Actions)
- Automated build, lint, and test for backend, frontend, and crawlers on every push/PR.
- Uses service containers for PostgreSQL to test DB integration.
- Fails fast on errors, and provides logs for debugging.

## Git & GitHub
- All code is versioned and pushed to GitHub (`main` branch).
- Use Pull Requests for code review and feature integration.
- CI status is visible on PRs and main branch.

## Deployment
- Use `docker-compose.yml` for local and cloud deployment.
- Nginx reverse proxy for SSL, static files, and API routing.
- Use `docker-compose --env-file .env up -d` for production.
- For SSL, use Let's Encrypt (Certbot) or Caddy for automatic HTTPS.
- Store secrets securely (never commit `.env` with real secrets).

## Local Development
- Use `.env` for local secrets (never commit real secrets).
- Run backend: `docker-compose up backend`
- Run frontend: `docker-compose up frontend`
- Run crawlers: `docker-compose up crawler`
- Run all: `docker-compose up -d`

## Security & Hardening
- Use non-root users in all containers.
- Only expose necessary ports.
- Use strong, unique secrets in production.
- Regularly update dependencies and base images.
- Use PostgreSQL in production (not SQLite).
- Set up automated backups and monitoring.

## Contributing
- Fork the repo, create a feature branch, and submit a PR.
- Ensure all tests pass and code is linted before PR.
- Document new features in README and/or `docs/`.

---

# Quick Start

1. Clone the repo: `git clone git@github.com:tfasanya79/darkwebguard.git`
2. Copy `.env.example` to `.env` and fill in secrets.
3. Build and run: `docker-compose --env-file .env up -d`
4. Access frontend at `http://localhost:3000`, backend API at `http://localhost:8000`
5. For production, set up a real domain and SSL (see `deploy/` and docs).

---

# Questions?
See `docs/` for architecture, or open an issue/PR on GitHub.
