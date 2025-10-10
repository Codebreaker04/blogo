# Blogo Monorepo - Docker Deployment

This repository contains Docker configurations for deploying the Blogo monorepo project. The backend is deployed to Cloudflare Workers, while the frontend can be containerized.

## Project Structure

```
blogo/
├── backend/          # Hono API server (deployed to Cloudflare Workers)
├── frontend/         # React + Vite application (containerized)
├── common/           # Shared utilities
└── docker-compose.yml # Docker orchestration (frontend only)
```

## Prerequisites

- Docker and Docker Compose installed
- Git (to clone the repository)
- Cloudflare account (for backend deployment)

## Quick Start

### For Frontend Development:

1. **Clone the repository** (if not already done):

   ```bash
   git clone <repository-url>
   cd blogo
   ```

2. **Start frontend service**:

   ```bash
   docker-compose up -d frontend
   ```

3. **Access the frontend**:
   - Frontend: http://localhost

### For Backend Development:

1. **Deploy to Cloudflare Workers**:

   ```bash
   cd backend
   npm run deploy
   ```

2. **Access the backend**:
   - Backend API: https://your-worker.your-subdomain.workers.dev
   - API Documentation: https://your-worker.your-subdomain.workers.dev/ui

## Services

### Frontend (Port 80)

- **Technology**: React + Vite + TailwindCSS
- **Container**: nginx:alpine
- **Health Check**: http://localhost/health

### Database (Port 5432) - Development Only

- **Technology**: PostgreSQL 15
- **Credentials**:
  - Database: `blogo`
  - Username: `blogo_user`
  - Password: `blogo_password`
- **Note**: This is for local development only. In production, use Cloudflare D1 or another managed database.

## Development Commands

### Frontend Commands:

```bash
# Build and start frontend
docker-compose up --build frontend

# View frontend logs
docker-compose logs -f frontend

# Stop frontend
docker-compose down
```

### Backend Commands:

```bash
# Deploy to Cloudflare Workers
cd backend
npm run deploy

# Run locally with Wrangler
npm run dev
```

## Production Deployment

### Frontend:

- Deploy the Docker container to your preferred platform (AWS ECS, Google Cloud Run, etc.)
- Configure environment variables for API endpoints
- Set up SSL/TLS certificates

### Backend:

- Deploy to Cloudflare Workers using `npm run deploy`
- Configure environment variables in Cloudflare dashboard
- Set up custom domain if needed

### Database:

- Use Cloudflare D1 (recommended for Cloudflare Workers)
- Or use any managed PostgreSQL service (AWS RDS, Google Cloud SQL, etc.)

## Environment Variables

### Frontend:

- `VITE_API_URL`: Backend API URL (e.g., https://your-worker.your-subdomain.workers.dev)

### Backend (Cloudflare Workers):

- Configure in Cloudflare dashboard or wrangler.toml
- `DATABASE_URL`: Database connection string

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure port 80 is available for frontend
2. **CORS issues**: Configure CORS in your Cloudflare Worker
3. **Build failures**: Check Docker logs for specific error messages

### Health Checks

- Frontend: `curl http://localhost/health`
- Backend: Check Cloudflare Workers dashboard for deployment status

### Logs

View frontend logs:

```bash
docker-compose logs frontend
```

View backend logs in Cloudflare Workers dashboard.

## File Structure

```
├── backend/
│   ├── .dockerignore
│   ├── src/
│   │   └── index.ts      # Cloudflare Workers entry
│   ├── package.json
│   └── wrangler.toml
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── nginx.conf
│   └── package.json
└── docker-compose.yml
```

## Notes

- The backend runs on Cloudflare Workers (serverless)
- The frontend runs in a Docker container with nginx
- Database is only included for local development
- In production, use Cloudflare D1 or another managed database service
- CORS must be configured in the Cloudflare Worker to allow frontend requests
