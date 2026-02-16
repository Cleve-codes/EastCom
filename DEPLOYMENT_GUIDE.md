# Next.js Solar Energy E-commerce Application Deployment Guide

This comprehensive guide covers the deployment of a Next.js solar energy e-commerce application with PostgreSQL database, Paystack payment integration, and production-ready configurations.

## Table of Contents
1. [Environment Setup and Configuration](#environment-setup-and-configuration)
2. [Database Deployment](#database-deployment)
3. [Build and Deployment Process](#build-and-deployment-process)
4. [Environment Variables Setup](#environment-variables-setup)
5. [Production Considerations](#production-considerations)
6. [Monitoring and Maintenance](#monitoring-and-maintenance)

## Environment Setup and Configuration

### Prerequisites
- Node.js 18+ or higher
- npm or yarn package manager
- Git
- PostgreSQL 14+ (for local development)
- Docker (optional, for containerized deployment)

### System Requirements
- Minimum 2GB RAM
- 10GB free disk space
- Linux, macOS, or Windows 10+

### Development Environment Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd eastcom
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Install Prisma CLI globally (if not already installed):**
   ```bash
   npm install -g prisma
   ```

5. **Initialize the database:**
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

## Database Deployment

### PostgreSQL Setup

#### Option 1: Managed Database (Recommended)

**DigitalOcean Managed PostgreSQL:**
1. Create a new PostgreSQL cluster
2. Choose appropriate plan (minimum 1GB RAM)
3. Set up VPC network for security
4. Create a database user with limited permissions
5. Note down the connection string

**Connection String Format:**
```
postgresql://username:password@host:port/database
```

#### Option 2: Self-Hosted PostgreSQL

**Docker Deployment:**
```bash
# Create docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: eastcom_db
      POSTGRES_USER: eastcom_user
      POSTGRES_PASSWORD: your_secure_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U eastcom_user -d eastcom_db"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  postgres_data:
```

**Manual Installation (Ubuntu/Debian):**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Create database and user
sudo -u postgres psql
CREATE DATABASE eastcom_db;
CREATE USER eastcom_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE eastcom_db TO eastcom_user;
\q
```

### Database Migration and Seeding

1. **Run migrations:**
   ```bash
   npx prisma migrate deploy
   ```

2. **Seed the database (optional):**
   ```bash
   npx prisma db seed
   ```

## Build and Deployment Process

### Vercel Deployment (Recommended)

#### Prerequisites
- Vercel account
- Vercel CLI installed
- GitHub repository connected to Vercel

#### Step-by-Step Deployment

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

4. **Configure Environment Variables in Vercel Dashboard:**
   - Go to Project Settings → Environment Variables
   - Add all required variables

#### Vercel Configuration

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs",
  "env": {
    "DATABASE_URL": "@database_url",
    "NEXTAUTH_SECRET": "@nextauth_secret",
    "NEXTAUTH_URL": "@nextauth_url",
    "PAYSTACK_PUBLIC_KEY": "@paystack_public_key",
    "PAYSTACK_SECRET_KEY": "@paystack_secret_key",
    "PAYSTACK_WEBHOOK_SECRET": "@paystack_webhook_secret"
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ]
}
```

### Docker Deployment

#### Prerequisites
- Docker and Docker Compose installed
- Basic Docker knowledge

#### Dockerfile

**Dockerfile:**
```dockerfile
# Multi-stage build for production
FROM node:18-alpine AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production

# Build the application
FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM base AS runner
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Docker Compose

**docker-compose.prod.yml:**
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - PAYSTACK_PUBLIC_KEY=${PAYSTACK_PUBLIC_KEY}
      - PAYSTACK_SECRET_KEY=${PAYSTACK_SECRET_KEY}
      - PAYSTACK_WEBHOOK_SECRET=${PAYSTACK_WEBHOOK_SECRET}
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: unless-stopped

volumes:
  postgres_data:
```

#### Deployment Commands

```bash
# Build and deploy with Docker Compose
docker-compose -f docker-compose.prod.yml up -d --build

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop services
docker-compose -f docker-compose.prod.yml down
```

## Environment Variables Setup

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NEXTAUTH_SECRET` | NextAuth.js secret key | `your-super-secret-key` |
| `NEXTAUTH_URL` | Application URL | `https://your-app.com` |
| `PAYSTACK_PUBLIC_KEY` | Paystack public key | `pk_test_your_public_key` |
| `PAYSTACK_SECRET_KEY` | Paystack secret key | `sk_test_your_secret_key` |
| `PAYSTACK_WEBHOOK_SECRET` | Paystack webhook secret | `your_webhook_secret` |

### Environment Variable Management

#### Vercel Dashboard
1. Go to Project Settings → Environment Variables
2. Add variables with appropriate values
3. Set scope to Production

#### Docker Environment File

**.env.prod:**
```bash
NODE_ENV=production
DATABASE_URL=postgresql://eastcom_user:password@postgres:5432/eastcom_db
NEXTAUTH_SECRET=your-super-secret-key
NEXTAUTH_URL=https://your-app.com
PAYSTACK_PUBLIC_KEY=pk_test_your_public_key
PAYSTACK_SECRET_KEY=sk_test_your_secret_key
PAYSTACK_WEBHOOK_SECRET=your_webhook_secret
```

#### Kubernetes ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: eastcom-config
data:
  NODE_ENV: "production"
  NEXTAUTH_SECRET: "your-super-secret-key"
  NEXTAUTH_URL: "https://your-app.com"
  PAYSTACK_PUBLIC_KEY: "pk_test_your_public_key"
  PAYSTACK_SECRET_KEY: "sk_test_your_secret_key"
  PAYSTACK_WEBHOOK_SECRET: "your_webhook_secret"
```

## Production Considerations

### Security Best Practices

#### SSL/TLS Configuration
- Always use HTTPS in production
- Configure automatic SSL renewal
- Set HSTS headers

#### Database Security
- Use strong passwords
- Limit database user permissions
- Enable connection encryption
- Regular security updates

#### Application Security
- Implement rate limiting
- Use Content Security Policy (CSP)
- Enable CORS restrictions
- Regular security audits

### Performance Optimization

#### Next.js Configuration

**next.config.ts:**
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable production optimizations
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    domains: ['your-cdn-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Analytics and monitoring
  experimental: {
    optimizePackageImports: true,
    optimizeCss: true,
  },
};

export default nextConfig;
```

#### Caching Strategy
- Implement CDN for static assets
- Configure proper cache headers
- Use service workers for offline support
- Implement edge caching

### Scalability

#### Horizontal Scaling
- Use load balancers
- Implement stateless architecture
- Use Redis for session storage
- Database connection pooling

#### Vertical Scaling
- Monitor resource usage
- Auto-scaling based on traffic
- Database optimization
- Memory management

## Monitoring and Maintenance

### Application Monitoring

#### Error Tracking
- Implement Sentry or similar error tracking
- Set up error alerting
- Monitor error rates and types

#### Performance Monitoring
- Use Google Analytics
- Implement Core Web Vitals tracking
- Monitor API response times
- Track user engagement metrics

#### Health Checks
- Implement health check endpoints
- Set up uptime monitoring
- Monitor database connectivity
- Check external service availability

### Database Maintenance

#### Regular Tasks
- Database backups (daily)
- Index optimization
- Query performance analysis
- Storage cleanup

#### Backup Strategy
```bash
# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="eastcom_backup_$DATE.sql"

# Create backup
pg_dump -U eastcom_user -h localhost -d eastcom_db > /backups/$BACKUP_FILE

# Compress backup
gzip /backups/$BACKUP_FILE

# Remove backups older than 30 days
find /backups/ -name "eastcom_backup_*.sql.gz" -mtime +30 -delete
```

### Log Management

#### Log Rotation
- Configure log rotation for application logs
- Set up centralized logging
- Implement log retention policies
- Monitor log sizes and growth

#### Log Analysis
- Use ELK stack or similar for log analysis
- Set up log-based alerts
- Monitor error patterns
- Track user behavior through logs

### Update and Upgrade Strategy

#### Regular Updates
- Keep Node.js and dependencies updated
- Apply security patches promptly
- Test updates in staging environment
- Monitor for breaking changes

#### Database Updates
- Plan database migrations carefully
- Test migrations in staging
- Backup before major changes
- Monitor performance after updates

### Disaster Recovery

#### Recovery Plan
- Document recovery procedures
- Regular recovery testing
- Off-site backups
- Communication plan for downtime

#### Failover Strategy
- Implement database replication
- Set up load balancer failover
- Monitor system health
- Automated failover triggers

## Troubleshooting

### Common Issues

#### Deployment Failures
1. Check environment variables
2. Verify database connectivity
3. Review build logs
4. Check file permissions

#### Performance Issues
1. Monitor database queries
2. Check memory usage
3. Review CDN configuration
4. Optimize images and assets

#### Security Issues
1. Review access logs
2. Check for vulnerabilities
3. Update dependencies
4. Audit configuration

### Support Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Vercel Documentation](https://vercel.com/docs)
- [Docker Documentation](https://docs.docker.com/)

---

**Last Updated:** 2026-02-16  
**Version:** 1.0  
**Application:** Next.js Solar Energy E-commerce