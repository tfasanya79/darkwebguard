# DarkWebGuard Production Deployment Guide

## Prerequisites

- Docker and Docker Compose installed
- Domain name (for production with SSL)
- Basic knowledge of Linux/Unix systems

## Quick Start (Development)

1. **Clone and Setup**
   ```bash
   git clone https://github.com/tfasanya79/darkwebguard.git
   cd darkwebguard
   ./scripts/dev-server.sh
   ```

2. **Access the Application**
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Production Deployment

### 1. Initial Setup

```bash
# Clone the repository
git clone https://github.com/tfasanya79/darkwebguard.git
cd darkwebguard

# Run production setup script
./scripts/setup-production.sh
```

### 2. Configure Environment

Edit the `.env` file with your production values:

```bash
# Database (use PostgreSQL for production)
DATABASE_URL=postgresql://user:pass@localhost:5432/darkwebguard

# Security
SECRET_KEY=your-generated-secret-key
ENV=production

# Services
BACKEND_PORT=8000
FRONTEND_PORT=80
FRONTEND_URL=https://yourdomain.com
```

### 3. Deploy with Docker Compose

```bash
# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Security Checklist

- [x] Non-root users in containers
- [x] Strong secret key generation
- [x] Environment-based configuration
- [x] CORS properly configured
- [x] Production logging
- [ ] SSL/HTTPS setup (requires domain)
- [ ] PostgreSQL for production database
- [ ] Regular backups
- [ ] Monitor logs and health checks

## SSL Setup (Production with Domain)

For production with a real domain, add SSL support:

1. **Install Certbot**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Generate SSL Certificate**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

3. **Update nginx.conf for SSL**
   (See `deploy/nginx-ssl.conf.example`)

## Monitoring and Maintenance

### Health Checks
- Backend: `curl http://localhost:8000/health`
- Frontend: `curl http://localhost:80`

### Log Monitoring
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
```

### Database Backup
```bash
# SQLite backup
cp darkwebguard.db darkwebguard_backup_$(date +%Y%m%d).db

# PostgreSQL backup
pg_dump darkwebguard > backup_$(date +%Y%m%d).sql
```

### Updates
```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   - Change ports in `docker-compose.yml` or `.env`
   - Kill existing processes: `sudo lsof -ti:8000 | xargs kill`

2. **Database Connection Failed**
   - Check `DATABASE_URL` in `.env`
   - Ensure database server is running
   - Verify credentials

3. **Frontend Not Loading**
   - Check nginx logs: `docker-compose logs frontend`
   - Verify backend is accessible: `curl http://backend:8000/health`

### Debug Commands

```bash
# Check container status
docker-compose ps

# Access container shell
docker-compose exec backend bash
docker-compose exec frontend sh

# Rebuild specific service
docker-compose build --no-cache backend
docker-compose up -d backend
```

## Performance Optimization

### For High Traffic

1. **Use PostgreSQL**
   - Better performance than SQLite
   - Supports concurrent connections

2. **Add Redis for Caching**
   ```yaml
   redis:
     image: redis:alpine
     ports:
       - "6379:6379"
   ```

3. **Scale with Multiple Workers**
   ```yaml
   backend:
     deploy:
       replicas: 3
   ```

## Support

- Check the main README.md for feature documentation
- Open issues on GitHub for bugs
- Review logs first before reporting issues