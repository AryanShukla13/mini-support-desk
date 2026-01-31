# Mini Support Desk

A full-stack support ticket management system built with React, Node.js, Express, and PostgreSQL.

## 🚀 Features

- ✅ Create, view, update, and delete support tickets
- ✅ Search tickets by title and description
- ✅ Filter tickets by status and priority
- ✅ Sort tickets by date (newest/oldest)
- ✅ Add comments to tickets
- ✅ Pagination for tickets and comments
- ✅ Real-time form validation
- ✅ Responsive UI with Tailwind CSS
- ✅ RESTful API with proper error handling
- ✅ Type-safe with TypeScript
- ✅ Server-side search and filtering

## 📋 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **TanStack Query (React Query)** - Server state management
- **Zustand** - Client state management
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM
- **PostgreSQL** - Database
- **Zod** - Schema validation
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
mini-support-desk/
├── frontend/
│   ├── src/
│   │   ├── api/              # API client
│   │   ├── components/       # React components
│   │   │   ├── layout/       # Header, Footer
│   │   │   ├── tickets/      # Ticket-specific components
│   │   │   └── ui/           # Reusable UI components
│   │   ├── pages/            # Route pages
│   │   ├── store/            # Zustand stores
│   │   ├── types/            # TypeScript types
│   │   ├── utils/            # Helper functions
│   │   ├── App.tsx           # Main app component
│   │   ├── main.tsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── services/         # Business logic
│   │   ├── repositories/     # Data access
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Express middleware
│   │   ├── validators/       # Zod schemas
│   │   ├── db/               # Database client
│   │   ├── app.ts            # Express app
│   │   ├── index.ts          # Server entry
│   │   └── seed.ts           # Database seeder
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── ARCHITECTURE.md           # Architecture documentation
└── README.md                 # This file
```

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd mini-support-desk
```

### 2. Setup PostgreSQL Database

**Option A: Local PostgreSQL**

1. Install PostgreSQL on your system
2. Create a new database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE supportdesk;

# Exit psql
\q
```

3. Update the connection string in `backend/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/supportdesk?schema=public"
```

Replace `postgres:postgres` with your PostgreSQL username:password.

**Option B: Free Cloud Database (Recommended for deployment)**

Use a free PostgreSQL provider like:
- **Neon** (https://neon.tech) - Free tier, no credit card
- **Supabase** (https://supabase.com) - Free tier, no credit card
- **Railway** (https://railway.app) - $5 free credit

Get the connection string from your provider and update `backend/.env`.

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Push database schema (creates tables)
npm run db:push

# Seed database with sample data
npm run db:seed

# Start development server
npm run dev
```

The backend server will start on **http://localhost:5000**

### 4. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on **http://localhost:3000**

### 5. Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/health

## 🎯 Usage

### Creating a Ticket

1. Click "New Ticket" button in the header
2. Fill in the form:
   - **Title**: 5-80 characters
   - **Description**: 20-2000 characters
   - **Priority**: Low, Medium, or High
3. Click "Create Ticket"

### Viewing Tickets

- All tickets are displayed on the home page
- Use filters to search and filter tickets:
  - **Search**: Search by title or description
  - **Status**: Filter by Open, In Progress, or Resolved
  - **Priority**: Filter by Low, Medium, or High
  - **Sort**: Sort by newest or oldest

### Managing a Ticket

1. Click on any ticket card to view details
2. On the detail page you can:
   - Change the ticket status
   - Add comments
   - Delete the ticket

### Adding Comments

1. Open a ticket detail page
2. Scroll to the "Add a Comment" section
3. Enter your name and message
4. Click "Post Comment"

## 🔧 Available Scripts

### Backend

```bash
npm run dev         # Start development server with hot reload
npm run build       # Compile TypeScript to JavaScript
npm start           # Run production server
npm run db:push     # Push schema changes to database
npm run db:seed     # Seed database with sample data
npm run db:studio   # Open Prisma Studio (database GUI)
```

### Frontend

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Lint code
```

## 🌐 API Endpoints

### Tickets

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tickets` | Get all tickets (with pagination & filters) |
| GET | `/api/tickets/:id` | Get ticket by ID |
| POST | `/api/tickets` | Create new ticket |
| PATCH | `/api/tickets/:id` | Update ticket |
| DELETE | `/api/tickets/:id` | Delete ticket |

### Comments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tickets/:id/comments` | Get comments for a ticket |
| POST | `/api/tickets/:id/comments` | Add comment to ticket |

### Query Parameters

**GET /api/tickets**
```
?q=search          # Search term
&status=OPEN       # Filter by status
&priority=HIGH     # Filter by priority
&sort=newest       # Sort order (newest/oldest)
&page=1            # Page number
&limit=10          # Items per page
```

**GET /api/tickets/:id/comments**
```
?page=1            # Page number
&limit=20          # Items per page
```

## 🚢 Deployment

### Option 1: Render (Free Tier) - Recommended

**Backend & Database on Render:**

1. Create account on [Render](https://render.com)

2. Create PostgreSQL database:
   - Dashboard → New → PostgreSQL
   - Name: `supportdesk-db`
   - Copy the "Internal Database URL"

3. Create Web Service for backend:
   - Dashboard → New → Web Service
   - Connect your Git repository
   - Settings:
     - **Name**: `supportdesk-api`
     - **Root Directory**: `backend`
     - **Build Command**: `npm install && npx prisma generate && npm run build`
     - **Start Command**: `npm start`
     - **Environment Variables**:
       ```
       DATABASE_URL=<paste Internal Database URL>
       NODE_ENV=production
       PORT=5000
       ```
   - After deployment, run migration:
     - Go to Shell tab
     - Run: `npx prisma db push && npm run db:seed`

4. Deploy frontend to **Vercel**:
   - Go to [Vercel](https://vercel.com)
   - Import your repository
   - Settings:
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Environment Variables**:
       ```
       VITE_API_URL=https://your-render-backend-url.onrender.com
       ```
   - Update `frontend/src/api/client.ts`:
     ```typescript
     const api = axios.create({
       baseURL: import.meta.env.VITE_API_URL || '/api',
     });
     ```

### Option 2: Railway (Free $5 Credit)

1. Create account on [Railway](https://railway.app)
2. Create new project → Deploy PostgreSQL
3. Create new service → Connect Git repo
4. Configure backend service:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm start`
   - Add environment variables from PostgreSQL service
   - Generate domain
5. Create frontend service:
   - **Root Directory**: `frontend`
   - Configure as above for Vercel

### Option 3: Heroku

1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Create Heroku app:
```bash
heroku create your-app-name
heroku addons:create heroku-postgresql:mini
```
3. Push backend:
```bash
cd backend
git subtree push --prefix backend heroku main
```
4. Run migrations:
```bash
heroku run npm run db:push
heroku run npm run db:seed
```

### Environment Variables for Production

**Backend:**
```env
DATABASE_URL=<your-production-database-url>
NODE_ENV=production
PORT=5000
```

**Frontend:**
```env
VITE_API_URL=<your-backend-api-url>
```

## 🧪 Testing the Application

### Manual Testing Checklist

- [ ] Create a new ticket
- [ ] View ticket list with pagination
- [ ] Search for tickets
- [ ] Filter tickets by status and priority
- [ ] Sort tickets by date
- [ ] View ticket details
- [ ] Add a comment to a ticket
- [ ] Change ticket status
- [ ] Delete a ticket
- [ ] Test form validations (empty fields, character limits)
- [ ] Test error states (disconnect backend, invalid data)

### Sample API Requests (using cURL)

```bash
# Health check
curl http://localhost:5000/health

# Get all tickets
curl http://localhost:5000/api/tickets

# Create ticket
curl -X POST http://localhost:5000/api/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Ticket",
    "description": "This is a test ticket with more than 20 characters",
    "priority": "HIGH"
  }'

# Get ticket by ID
curl http://localhost:5000/api/tickets/<ticket-id>

# Add comment
curl -X POST http://localhost:5000/api/tickets/<ticket-id>/comments \
  -H "Content-Type: application/json" \
  -d '{
    "authorName": "John Doe",
    "message": "This is a test comment"
  }'
```

## 🐛 Troubleshooting

### Database Connection Issues

**Error**: "Can't reach database server"
- Check PostgreSQL is running: `pg_isready`
- Verify DATABASE_URL in `.env`
- Check PostgreSQL credentials

**Error**: "Table does not exist"
```bash
cd backend
npm run db:push
npm run db:seed
```

### Port Already in Use

**Backend (port 5000)**:
```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

**Frontend (port 3000)**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Build Errors

```bash
# Clear node_modules and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

Make sure backend CORS is configured properly in `backend/src/app.ts`:
```typescript
app.use(cors());
```

For production, specify allowed origins:
```typescript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

## 📝 Assumptions

1. **No Authentication**: The system does not implement user authentication. In production, you would add JWT-based auth.

2. **Single User Context**: All tickets and comments are public to everyone accessing the application.

3. **No File Attachments**: Comments and tickets are text-only. File uploads would require additional storage setup.

4. **Search is Case-Insensitive**: Server-side search uses PostgreSQL ILIKE for case-insensitive matching.

5. **Soft Delete Not Implemented**: Deleting a ticket permanently removes it from the database.

6. **Comment Editing Not Supported**: Once posted, comments cannot be edited or deleted.

7. **Desktop-First Design**: UI is optimized for desktop but includes basic mobile responsiveness.

## 🤝 Contributing

This is a technical assessment project. If you want to extend it:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is created for educational and assessment purposes.

## 🆘 Support

If you encounter any issues:

1. Check the troubleshooting section
2. Review the ARCHITECTURE.md file
3. Check the browser console and server logs
4. Verify all environment variables are set correctly

## ✨ Future Enhancements

- [ ] User authentication and authorization
- [ ] Real-time updates with WebSockets
- [ ] File attachments for tickets
- [ ] Email notifications
- [ ] Advanced search with Elasticsearch
- [ ] Ticket assignment to agents
- [ ] SLA tracking
- [ ] Audit logs
- [ ] Export tickets to CSV
- [ ] Dashboard with analytics
