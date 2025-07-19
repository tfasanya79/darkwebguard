# Security Configuration for Production

## Environment Variables Required for Production

### Essential Security Settings
```bash
# Strong secret key (minimum 32 characters)
SECRET_KEY=your-long-random-secret-key-here

# Production environment
ENV=production

# Database (PostgreSQL recommended for production)
DATABASE_URL=postgresql://username:password@host:port/database

# CORS settings (restrict to your domain)
FRONTEND_URL=https://yourdomain.com
```

### Recommended PostgreSQL Configuration

```bash
# Create production database
sudo -u postgres createdb darkwebguard_prod
sudo -u postgres createuser darkwebguard_user

# Set password
sudo -u postgres psql -c "ALTER USER darkwebguard_user PASSWORD 'secure_password';"

# Grant permissions
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE darkwebguard_prod TO darkwebguard_user;"
```

### SSL/TLS Configuration

For production deployment, SSL is essential:

1. **Obtain SSL Certificate**
   ```bash
   # Using Let's Encrypt
   sudo certbot certonly --standalone -d yourdomain.com
   ```

2. **Update nginx.conf for SSL**
   ```nginx
   server {
       listen 443 ssl;
       server_name yourdomain.com;
       
       ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
       
       # Modern SSL configuration
       ssl_protocols TLSv1.2 TLSv1.3;
       ssl_ciphers HIGH:!aNULL:!MD5;
       ssl_prefer_server_ciphers on;
       
       # HSTS
       add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
       
       # Other security headers
       add_header X-Frame-Options DENY;
       add_header X-Content-Type-Options nosniff;
       add_header X-XSS-Protection "1; mode=block";
   }
   
   # Redirect HTTP to HTTPS
   server {
       listen 80;
       server_name yourdomain.com;
       return 301 https://$server_name$request_uri;
   }
   ```

### Application Security

1. **Rate Limiting** (add to nginx.conf)
   ```nginx
   limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
   
   location /api/ {
       limit_req zone=api burst=20 nodelay;
       proxy_pass http://backend:8000/api/;
   }
   ```

2. **Input Validation**
   - All endpoints use Pydantic models for validation
   - SQL injection prevention via SQLAlchemy ORM
   - Password hashing with bcrypt

3. **Authentication**
   - JWT tokens with configurable expiry
   - Secure password requirements
   - Session management

### Monitoring and Logging

1. **Log Configuration**
   ```yaml
   # In docker-compose.yml
   services:
     backend:
       logging:
         driver: "json-file"
         options:
           max-size: "10m"
           max-file: "3"
   ```

2. **Health Monitoring**
   ```bash
   # Setup monitoring script
   #!/bin/bash
   # check-health.sh
   
   if ! curl -f http://localhost:8000/health > /dev/null 2>&1; then
       echo "Backend health check failed" | logger
       # Add notification logic here
   fi
   ```

### Backup Strategy

1. **Database Backup**
   ```bash
   #!/bin/bash
   # backup-db.sh
   
   DATE=$(date +%Y%m%d_%H%M%S)
   pg_dump darkwebguard_prod > "/backups/darkwebguard_${DATE}.sql"
   
   # Keep only last 7 days
   find /backups -name "darkwebguard_*.sql" -mtime +7 -delete
   ```

2. **Application State Backup**
   ```bash
   # Backup uploaded files, configs, logs
   tar -czf "app_backup_${DATE}.tar.gz" \
       .env \
       logs/ \
       uploads/
   ```

### Firewall Configuration

```bash
# Basic UFW setup
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### Docker Security

1. **Use specific image versions** (avoid `:latest`)
2. **Run as non-root user** (already implemented)
3. **Limit container resources**
   ```yaml
   services:
     backend:
       deploy:
         resources:
           limits:
             memory: 512M
             cpus: 0.5
   ```

### Regular Maintenance

1. **Update Dependencies**
   ```bash
   # Monthly security updates
   docker-compose pull
   docker-compose down
   docker-compose up -d
   ```

2. **Certificate Renewal**
   ```bash
   # Automated via cron
   0 2 * * 1 certbot renew --nginx --quiet
   ```

3. **Log Rotation**
   ```bash
   # Setup logrotate for application logs
   /var/log/darkwebguard/*.log {
       daily
       rotate 7
       compress
       delaycompress
       missingok
       notifempty
   }
   ```