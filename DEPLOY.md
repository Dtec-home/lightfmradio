# Deployment Guide (Vercel + Remote PostgreSQL)

## Setup (One-Time)

### 1. Setup PostgreSQL on AzuraCast Server

SSH into your server:
```bash
ssh user@app.lightfmradio.org

# Install PostgreSQL
sudo apt update && sudo apt install postgresql postgresql-contrib

# Create database
sudo -u postgres psql
```

In PostgreSQL:
```sql
CREATE DATABASE lightfm;
CREATE USER lightfm_user WITH PASSWORD 'your_strong_password';
GRANT ALL PRIVILEGES ON DATABASE lightfm TO lightfm_user;
\q
```

Allow remote connections:
```bash
sudo nano /etc/postgresql/*/main/postgresql.conf
# Change: listen_addresses = '*'

sudo nano /etc/postgresql/*/main/pg_hba.conf
# Add: host all all 0.0.0.0/0 md5

sudo systemctl restart postgresql
sudo ufw allow 5432/tcp
```

### 2. Push Database Schema

From local:
```bash
# Temporarily add to .env
DATABASE_URL="postgresql://lightfm_user:password@app.lightfmradio.org:5432/lightfm"

npx prisma db push
npm run prisma:seed

# Remove from .env
```

### 3. Configure Vercel

Add environment variables in Vercel dashboard:
- `DATABASE_URL`: `postgresql://lightfm_user:password@app.lightfmradio.org:5432/lightfm`
- `JWT_SECRET`: (generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- `NEXT_PUBLIC_STREAM_URL`: `https://app.lightfmradio.org/listen/lightfm/radio.mp3`
- `NEXT_PUBLIC_API_URL`: `https://app.lightfmradio.org/api/nowplaying/lightfm`
- `NEXT_PUBLIC_SITE_URL`: `https://your-domain.vercel.app`

Vercel automatically runs `npm run build` which includes `prisma generate`.

---

## Workflow (CI/CD)

### Regular Updates (No Schema Changes)
1. Make changes locally
2. Test: `npm run dev`
3. Commit and push to GitHub
4. Vercel auto-deploys ✅

### Schema Changes
1. Update `prisma/schema.prisma` locally
2. Test locally: `npx prisma db push` (with local DB)
3. Push schema to production:
   ```bash
   DATABASE_URL="postgresql://lightfm_user:password@app.lightfmradio.org:5432/lightfm" npx prisma db push
   ```
4. Commit and push to GitHub
5. Vercel auto-deploys ✅

---

## Post-Deployment

Visit `/admin/login`:
- Email: `admin@lightfmradio.org`
- Password: `admin123`
- **Change password immediately**
