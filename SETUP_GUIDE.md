# 📝 COMPLETE SETUP GUIDE - STEP BY STEP

## What You'll Need to Run in Your Terminal

Follow these commands **exactly in this order**.

---

## 🔍 STEP 1: Check Prerequisites

```bash
# Check Node.js (must be v18+)
node --version

# Check npm
npm --version

# Check PostgreSQL (must be v14+)
psql --version
```

**If missing, install from:**
- Node.js: https://nodejs.org/
- PostgreSQL: https://www.postgresql.org/download/

---

## 🗄️ STEP 2: Setup Database

**If PostgreSQL is not running, start it:**

```bash
# macOS (Homebrew)
brew services start postgresql@14

# Linux
sudo service postgresql start

# Windows (Run as Admin)
net start postgresql-x64-14
```

**Create the database:**

```bash
# Connect to PostgreSQL
psql -U postgres

# Inside psql, type:
CREATE DATABASE supportdesk;
\q
```

---

## 📁 STEP 3: Download/Clone Project

```bash
# If you have a Git repository:
git clone <your-repo-url>
cd mini-support-desk

# OR if you have the project files already, navigate to the folder:
cd /path/to/mini-support-desk
```

---

## 🔧 STEP 4: Setup Backend

**Open Terminal 1:**

```bash
# Go to backend folder
cd backend

# Install dependencies (takes 2-3 minutes)
npm install

# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma db push

# Add sample data
npm run db:seed

# Start backend server
npm run dev
```

**✅ You should see:**
```
🚀 Server running on port 5000
📊 Health check: http://localhost:5000/health
📝 API: http://localhost:5000/api
```

**KEEP THIS TERMINAL OPEN!**

---

## ⚛️ STEP 5: Setup Frontend

**Open NEW Terminal 2:**

```bash
# Go to frontend folder (from project root)
cd frontend

# Install dependencies (takes 3-4 minutes)
npm install

# Start frontend server
npm run dev
```

**✅ You should see:**
```
VITE v6.0.5  ready in XXX ms
➜  Local:   http://localhost:3000/
```

**KEEP THIS TERMINAL OPEN TOO!**

---

## 🎉 STEP 6: Open Application

**In your browser, go to:**
```
http://localhost:3000
```

You should see the Mini Support Desk with sample tickets!

---

## 🚀 DEPLOYMENT (FREE)

### Deploy to Render + Vercel (Completely Free)

#### Part A: Backend on Render

1. **Go to https://render.com** and sign up

2. **Create PostgreSQL Database:**
   - Click "New +" → PostgreSQL
   - Name: `supportdesk-db`
   - Click "Create Database"
   - Copy the "Internal Database URL"

3. **Create Web Service:**
   - Click "New +" → Web Service
   - Connect your GitHub repository
   - **Settings:**
     - Name: `supportdesk-api`
     - Root Directory: `backend`
     - Build Command:
       ```
       npm install && npx prisma generate && npm run build
       ```
     - Start Command:
       ```
       npm start
       ```
     - Environment Variables → Add:
       ```
       DATABASE_URL = <paste your Internal Database URL>
       NODE_ENV = production
       PORT = 5000
       ```
   - Click "Create Web Service"

4. **After deployment, run migrations:**
   - Go to Shell tab in Render
   - Run:
     ```bash
     npx prisma db push
     npm run db:seed
     ```

5. **Copy your backend URL** (e.g., `https://supportdesk-api.onrender.com`)

#### Part B: Frontend on Vercel

1. **Update frontend to use environment variable:**
   
   Edit `frontend/src/api/client.ts`:
   ```typescript
   const api = axios.create({
     baseURL: import.meta.env.VITE_API_URL || '/api',
   });
   ```

2. **Go to https://vercel.com** and sign up

3. **Import your project:**
   - Click "New Project"
   - Import your Git repository
   - **Settings:**
     - Framework Preset: Vite
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Environment Variables:
       ```
       VITE_API_URL = https://your-render-backend-url.onrender.com
       ```
   - Click "Deploy"

4. **Your app is live!** Vercel gives you a URL like:
   ```
   https://mini-support-desk.vercel.app
   ```

---

## ❌ Common Issues & Solutions

### "Port 5000 already in use"
```bash
# Find what's using the port
lsof -i :5000

# Kill it
kill -9 <PID>

# Restart backend
cd backend
npm run dev
```

### "Port 3000 already in use"
```bash
# Find what's using the port
lsof -i :3000

# Kill it
kill -9 <PID>

# Restart frontend
cd frontend
npm run dev
```

### "Can't connect to database"
```bash
# Make sure PostgreSQL is running
pg_isready

# Check your DATABASE_URL in backend/.env
cat backend/.env

# Should be:
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/supportdesk?schema=public"
```

### "Prisma errors"
```bash
cd backend

# Regenerate Prisma client
npx prisma generate

# Push schema again
npx prisma db push

# Reseed
npm run db:seed
```

---

## 📋 Summary - What to Run

**Just need to run the app locally? Run these:**

**Terminal 1:**
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

**Terminal 2:**
```bash
cd frontend
npm install
npm run dev
```

**Browser:**
```
http://localhost:3000
```

That's it! 🎉
