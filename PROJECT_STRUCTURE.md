# 📁 COMPLETE PROJECT STRUCTURE & FILE TREE

## Visual Project Structure

```
mini-support-desk/
│
├── 📄 README.md                          # Main documentation
├── 📄 ARCHITECTURE.md                    # Architecture explanation
├── 📄 SETUP_GUIDE.md                     # Step-by-step setup
├── 📄 .gitignore                         # Git ignore file
│
├── 📁 backend/                           # Backend Node.js application
│   ├── 📄 package.json                   # Backend dependencies
│   ├── 📄 tsconfig.json                  # TypeScript config
│   ├── 📄 .env                           # Environment variables
│   ├── 📄 .gitignore                     # Backend git ignore
│   │
│   ├── 📁 prisma/
│   │   └── 📄 schema.prisma             # Database schema
│   │
│   └── 📁 src/
│       ├── 📄 index.ts                   # Server entry point
│       ├── 📄 app.ts                     # Express app setup
│       ├── 📄 seed.ts                    # Database seeder
│       │
│       ├── 📁 db/
│       │   └── 📄 prisma.ts             # Prisma client
│       │
│       ├── 📁 validators/
│       │   └── 📄 schemas.ts            # Zod validation schemas
│       │
│       ├── 📁 repositories/
│       │   ├── 📄 ticketRepository.ts   # Ticket data access
│       │   └── 📄 commentRepository.ts  # Comment data access
│       │
│       ├── 📁 services/
│       │   ├── 📄 ticketService.ts      # Ticket business logic
│       │   └── 📄 commentService.ts     # Comment business logic
│       │
│       ├── 📁 controllers/
│       │   ├── 📄 ticketController.ts   # Ticket request handlers
│       │   └── 📄 commentController.ts  # Comment request handlers
│       │
│       ├── 📁 routes/
│       │   ├── 📄 ticketRoutes.ts       # Ticket API routes
│       │   └── 📄 commentRoutes.ts      # Comment API routes
│       │
│       └── 📁 middleware/
│           ├── 📄 errorHandler.ts       # Error handling
│           └── 📄 logger.ts             # Request logging
│
└── 📁 frontend/                          # Frontend React application
    ├── 📄 package.json                   # Frontend dependencies
    ├── 📄 tsconfig.json                  # TypeScript config
    ├── 📄 vite.config.ts                 # Vite configuration
    ├── 📄 tailwind.config.js             # Tailwind CSS config
    ├── 📄 postcss.config.js              # PostCSS config
    ├── 📄 index.html                     # HTML entry point
    ├── 📄 .gitignore                     # Frontend git ignore
    │
    └── 📁 src/
        ├── 📄 main.tsx                   # React entry point
        ├── 📄 App.tsx                    # Main App component
        ├── 📄 index.css                  # Global styles
        │
        ├── 📁 types/
        │   └── 📄 index.ts              # TypeScript types
        │
        ├── 📁 api/
        │   └── 📄 client.ts             # API client (Axios)
        │
        ├── 📁 store/
        │   └── 📄 filterStore.ts        # Zustand state store
        │
        ├── 📁 utils/
        │   └── 📄 helpers.ts            # Helper functions
        │
        ├── 📁 components/
        │   ├── 📁 layout/
        │   │   └── 📄 Header.tsx        # Header component
        │   │
        │   ├── 📁 ui/
        │   │   ├── 📄 Button.tsx        # Button component
        │   │   ├── 📄 Input.tsx         # Input component
        │   │   ├── 📄 TextArea.tsx      # TextArea component
        │   │   ├── 📄 Select.tsx        # Select component
        │   │   ├── 📄 Badge.tsx         # Badge component
        │   │   ├── 📄 Loading.tsx       # Loading spinner
        │   │   ├── 📄 ErrorMessage.tsx  # Error display
        │   │   └── 📄 EmptyState.tsx    # Empty state display
        │   │
        │   └── 📁 tickets/
        │       ├── 📄 TicketCard.tsx    # Ticket card component
        │       ├── 📄 TicketFilters.tsx # Filters component
        │       └── 📄 CommentItem.tsx   # Comment component
        │
        └── 📁 pages/
            ├── 📄 TicketListPage.tsx    # List page
            ├── 📄 TicketDetailPage.tsx  # Detail page
            └── 📄 CreateTicketPage.tsx  # Create page
```

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Pages (React Router)                                       │
│  ├── TicketListPage                                        │
│  ├── TicketDetailPage                                      │
│  └── CreateTicketPage                                      │
│                    ↓                                        │
│  Components                                                 │
│  ├── UI Components (Button, Input, etc.)                   │
│  ├── Layout (Header)                                       │
│  └── Feature Components (TicketCard, etc.)                 │
│                    ↓                                        │
│  State Management                                           │
│  ├── React Query (Server State)                            │
│  └── Zustand (Client State - Filters)                      │
│                    ↓                                        │
│  API Client (Axios)                                         │
│                    ↓                                        │
└─────────────────────────────────────────────────────────────┘
                      ↓ HTTP/JSON ↓
┌─────────────────────────────────────────────────────────────┐
│                         BACKEND                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Routes (Express Router)                                    │
│  ├── /api/tickets                                          │
│  └── /api/tickets/:id/comments                            │
│                    ↓                                        │
│  Controllers                                                │
│  ├── TicketController                                      │
│  └── CommentController                                     │
│         (Request/Response, Validation)                     │
│                    ↓                                        │
│  Services                                                   │
│  ├── TicketService                                         │
│  └── CommentService                                        │
│         (Business Logic)                                   │
│                    ↓                                        │
│  Repositories                                               │
│  ├── TicketRepository                                      │
│  └── CommentRepository                                     │
│         (Data Access Layer)                                │
│                    ↓                                        │
│  Prisma ORM                                                 │
│                    ↓                                        │
└─────────────────────────────────────────────────────────────┘
                      ↓ SQL ↓
┌─────────────────────────────────────────────────────────────┐
│                      POSTGRESQL                             │
│                                                             │
│  Tables:                                                    │
│  ├── Ticket (id, title, description, status, priority)     │
│  └── Comment (id, ticketId, authorName, message)           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Database Schema

```
┌─────────────────────────────────────────┐
│              Ticket                     │
├─────────────────────────────────────────┤
│ id          : UUID (PK)                 │
│ title       : String (5-80 chars)       │
│ description : String (20-2000 chars)    │
│ status      : Enum (OPEN/IN_PROGRESS/   │
│               RESOLVED)                 │
│ priority    : Enum (LOW/MEDIUM/HIGH)    │
│ createdAt   : DateTime                  │
│ updatedAt   : DateTime                  │
└─────────────────────────────────────────┘
                ↓ 1:N
┌─────────────────────────────────────────┐
│             Comment                     │
├─────────────────────────────────────────┤
│ id         : UUID (PK)                  │
│ ticketId   : UUID (FK) → Ticket.id      │
│ authorName : String (1-100 chars)       │
│ message    : String (1-500 chars)       │
│ createdAt  : DateTime                   │
└─────────────────────────────────────────┘
```

## 🔌 API Endpoints

```
Backend API (http://localhost:5000/api)

Tickets:
├── GET    /tickets              # Get all tickets (paginated, filtered)
│   Query params: ?q=search&status=OPEN&priority=HIGH&sort=newest&page=1&limit=10
│
├── GET    /tickets/:id          # Get single ticket by ID
│   Returns: Ticket with comments
│
├── POST   /tickets              # Create new ticket
│   Body: { title, description, priority }
│
├── PATCH  /tickets/:id          # Update ticket
│   Body: { title?, description?, status?, priority? }
│
└── DELETE /tickets/:id          # Delete ticket

Comments:
├── GET    /tickets/:id/comments # Get comments for ticket (paginated)
│   Query params: ?page=1&limit=20
│
└── POST   /tickets/:id/comments # Add comment to ticket
    Body: { authorName, message }
```

## 🎨 Frontend Routes

```
Frontend Routes (http://localhost:3000)

├── /                    # Home - Ticket List
│   Component: TicketListPage
│   Features: Search, Filter, Sort, Pagination
│
├── /tickets/:id        # Ticket Detail
│   Component: TicketDetailPage
│   Features: View details, Add comments, Update status, Delete
│
└── /create             # Create Ticket
    Component: CreateTicketPage
    Features: Form with validation
```

## 📦 Technology Stack Breakdown

### Backend Stack
```
Runtime & Framework:
├── Node.js v18+        # JavaScript runtime
├── Express.js          # Web framework
└── TypeScript          # Type safety

Database:
├── PostgreSQL          # Relational database
└── Prisma ORM          # Database toolkit

Validation & Utils:
├── Zod                 # Schema validation
├── CORS                # Cross-origin requests
└── dotenv              # Environment variables
```

### Frontend Stack
```
UI Framework:
├── React 18            # UI library
├── TypeScript          # Type safety
└── Vite                # Build tool

State Management:
├── TanStack Query      # Server state (caching, fetching)
└── Zustand             # Client state (filters)

Routing & HTTP:
├── React Router v7     # Client-side routing
└── Axios               # HTTP client

Styling:
├── Tailwind CSS        # Utility-first CSS
├── PostCSS             # CSS processing
└── Lucide React        # Icon library
```

## 🔍 File Purpose Overview

### Backend Files

| File | Purpose |
|------|---------|
| `index.ts` | Server entry point, starts Express server |
| `app.ts` | Express app configuration, middleware, routes |
| `seed.ts` | Database seeding with sample data |
| `schema.prisma` | Database schema definition |
| `prisma.ts` | Prisma client initialization |
| `schemas.ts` | Zod validation schemas |
| `*Repository.ts` | Database queries (data access) |
| `*Service.ts` | Business logic |
| `*Controller.ts` | HTTP request/response handling |
| `*Routes.ts` | API endpoint definitions |
| `errorHandler.ts` | Global error handling |
| `logger.ts` | Request logging |

### Frontend Files

| File | Purpose |
|------|---------|
| `main.tsx` | React app entry point |
| `App.tsx` | Main app component with routing |
| `index.css` | Global styles and Tailwind |
| `client.ts` | Axios API client setup |
| `filterStore.ts` | Zustand store for filters |
| `helpers.ts` | Utility functions (date, colors) |
| `index.ts` (types) | TypeScript type definitions |
| `Header.tsx` | Navigation header |
| `Button.tsx` | Reusable button component |
| `Input.tsx` | Reusable input component |
| `TicketCard.tsx` | Ticket list item |
| `TicketFilters.tsx` | Search and filter UI |
| `*Page.tsx` | Route page components |

## 🌊 Request Flow Example

### Creating a Ticket

```
1. User fills form in CreateTicketPage.tsx
   ↓
2. Form submits → API client (client.ts)
   ↓
3. POST /api/tickets → Express routes (ticketRoutes.ts)
   ↓
4. Route → TicketController.createTicket()
   ↓
5. Validates with Zod schema (schemas.ts)
   ↓
6. Controller → TicketService.createTicket()
   ↓
7. Service → TicketRepository.create()
   ↓
8. Repository → Prisma → PostgreSQL
   ↓
9. Database returns created ticket
   ↓
10. Response flows back up the chain
   ↓
11. React Query updates cache
   ↓
12. User redirected to ticket detail page
```

## 🎯 Key Design Decisions

### Why Layered Architecture?
- **Separation of Concerns**: Each layer has one job
- **Testability**: Easy to mock and test layers
- **Maintainability**: Changes isolated to specific layers
- **Scalability**: Easy to add features

### Why React Query?
- **Automatic Caching**: No manual cache management
- **Background Refetching**: Keeps data fresh
- **Optimistic Updates**: Better UX
- **Built for Server State**: Perfect for API data

### Why Prisma?
- **Type Safety**: Auto-generated types
- **Developer Experience**: Great tooling
- **Migrations**: Easy schema changes
- **Query Building**: Clean, readable syntax

### Why Tailwind CSS?
- **Utility-First**: Fast development
- **No Context Switching**: Write CSS in JSX
- **Tree Shaking**: Small production bundle
- **Responsive**: Easy breakpoints

## 📝 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
PORT=5000
NODE_ENV=development
```

### Frontend (Vite)
```env
VITE_API_URL="http://localhost:5000"
```

## 🚀 Build Process

### Backend Build
```
TypeScript (.ts) → Compiler → JavaScript (.js) → dist/
```

### Frontend Build
```
React/TypeScript → Vite → 
├── Bundled JavaScript
├── Optimized CSS
└── Static HTML
→ dist/
```

This is the complete architecture! All files are properly structured and ready to use.
