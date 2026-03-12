# Production Deployment Checklist

## ✅ Completed

### Database
- [x] PostgreSQL schema with migrations
- [x] Shows and Articles models
- [x] Admin authentication model
- [x] Seed data script

### API Integration
- [x] AzuraCast now playing data
- [x] Live broadcasting info
- [x] Listener statistics
- [x] Song history
- [x] Playing next track
- [x] Playlist information

### Admin Panel
- [x] JWT authentication
- [x] CRUD for Shows
- [x] CRUD for Articles
- [x] Protected routes
- [x] Login/logout functionality

### Frontend
- [x] All pages fetch from database
- [x] No hardcoded data
- [x] Real-time AzuraCast integration
- [x] Responsive UI components

## 🔧 Pre-Production Tasks

### 1. Environment Variables
Create `.env` file with:
```env
DATABASE_URL="postgresql://user:pass@host:5432/lightfm"
JWT_SECRET="generate-strong-random-secret"
NEXT_PUBLIC_STREAM_URL="https://app.lightfmradio.org/listen/lightfm/radio.mp3"
NEXT_PUBLIC_API_URL="https://app.lightfmradio.org/api/nowplaying/lightfm"
NEXT_PUBLIC_SITE_URL="https://lightfmradio.org"
```

### 2. Security
- [ ] Change JWT_SECRET to strong random string
- [ ] Change default admin password
- [ ] Install bcryptjs for production: `npm install bcryptjs`
- [ ] Install jsonwebtoken: `npm install jsonwebtoken`
- [ ] Update `lib/auth.ts` to use bcrypt and jsonwebtoken
- [ ] Enable HTTPS
- [ ] Set secure cookie flags in production

### 3. Database Setup
```bash
# On AzuraCast server
sudo apt install postgresql postgresql-contrib
sudo -u postgres psql
CREATE DATABASE lightfm;
CREATE USER lightfm_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE lightfm TO lightfm_user;
\q

# Configure remote access
sudo nano /etc/postgresql/*/main/postgresql.conf
# Set: listen_addresses = '*'

sudo nano /etc/postgresql/*/main/pg_hba.conf
# Add: host all all 0.0.0.0/0 md5

sudo systemctl restart postgresql
sudo ufw allow 5432/tcp
```

### 4. Run Migrations
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### 5. Build & Deploy
```bash
npm run build
npm start
```

### 6. Post-Deployment
- [ ] Test admin login
- [ ] Change default admin password
- [ ] Create shows via admin panel
- [ ] Create articles via admin panel
- [ ] Verify AzuraCast data is displaying
- [ ] Test all CRUD operations
- [ ] Check mobile responsiveness

## 📊 Data Flow

```
AzuraCast API → PlayerContext (15s polling)
    ↓
- Now Playing
- Live Status
- Listeners
- Song History
- Playing Next

PostgreSQL Database → Next.js API Routes → Frontend
    ↓
- Shows (CRUD via Admin)
- Articles (CRUD via Admin)
```

## 🔐 Admin Access

URL: `/admin/login`
Default: `admin@lightfmradio.org` / `admin123`

**⚠️ CHANGE IMMEDIATELY IN PRODUCTION**

## 🚀 Production URLs

- Frontend: `https://lightfmradio.org`
- Admin: `https://lightfmradio.org/admin`
- API: `https://lightfmradio.org/api/*`
- Stream: `https://app.lightfmradio.org/listen/lightfm/radio.mp3`

## 📝 Notes

- All content is now dynamic (no hardcoded data)
- Admin can manage shows and articles
- AzuraCast provides real-time radio data
- Database stores all custom content
