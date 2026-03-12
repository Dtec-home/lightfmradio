# Setup Instructions

## 1. Install Dependencies

```bash
npm install prisma @prisma/client tsx
npm install -D prisma
```

## 2. Configure Database

Create `.env` file in project root:

```env
DATABASE_URL="postgresql://username:password@app.lightfmradio.org:5432/lightfm?schema=public"
```

Replace `username`, `password` with your PostgreSQL credentials.

## 3. Run Migrations

```bash
npm run prisma:generate
npm run prisma:migrate
```

This will create the database tables.

## 4. Seed Database

```bash
npm run prisma:seed
```

This will populate the database with initial shows and articles.

## 5. Run Development Server

```bash
npm run dev
```

## Database Setup on AzuraCast Server

SSH into your AzuraCast server and run:

```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE lightfm;
CREATE USER lightfm_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE lightfm TO lightfm_user;
\q

# Allow remote connections (edit postgresql.conf)
sudo nano /etc/postgresql/*/main/postgresql.conf
# Change: listen_addresses = '*'

# Edit pg_hba.conf to allow remote connections
sudo nano /etc/postgresql/*/main/pg_hba.conf
# Add: host    all    all    0.0.0.0/0    md5

# Restart PostgreSQL
sudo systemctl restart postgresql

# Open firewall port
sudo ufw allow 5432/tcp
```

## API Endpoints

- `GET /api/shows` - Fetch all shows
- `GET /api/articles` - Fetch all articles

## Managing Content

Use Prisma Studio to manage content:

```bash
npx prisma studio
```

This opens a web interface at `http://localhost:5555` to add/edit/delete shows and articles.


## Admin Panel

Access at: `http://localhost:3000/admin/login`

**Default credentials:**
- Email: `admin@lightfmradio.org`
- Password: `admin123`

**⚠️ Change password immediately after first login!**

### Admin Features
- Create, edit, delete shows
- Create, edit, delete articles
- JWT-based authentication
- Protected routes

### Security Notes
- Change `JWT_SECRET` in `.env` to a strong random string
- Use bcrypt for production (current implementation is simplified)
- Enable HTTPS in production
