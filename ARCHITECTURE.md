# Architecture Documentation

## Overview

Mini Support Desk is a full-stack web application built with React (frontend) and Node.js/Express (backend), designed to manage support tickets with a clean, scalable architecture.

## High-Level Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│                 │         │                  │         │                 │
│  React Client   │◄───────►│   Express API    │◄───────►│   PostgreSQL    │
│  (Port 3000)    │  HTTP   │   (Port 5000)    │  Prisma │   Database      │
│                 │  JSON   │                  │         │                 │
└─────────────────┘         └──────────────────┘         └─────────────────┘
```

### Communication Flow
1. **Frontend → Backend**: React app makes HTTP requests to Express API endpoints via Axios
2. **Backend → Database**: Express routes call services → repositories → Prisma ORM → PostgreSQL
3. **Response Flow**: Data flows back through the same layers with proper error handling at each level

## Backend Architecture

### Layered Architecture Pattern

The backend follows a clean, layered architecture:

```
Routes → Controllers → Services → Repositories → Database
```

**1. Routes Layer** (`src/routes/`)
- Define API endpoints and HTTP methods
- Map URLs to controller methods
- Thin layer that delegates to controllers

**2. Controllers Layer** (`src/controllers/`)
- Handle HTTP request/response
- Input validation using Zod schemas
- Error handling and status code management
- Call service layer for business logic

**3. Services Layer** (`src/services/`)
- Business logic implementation
- Orchestrate multiple repository calls if needed
- Domain-specific validations
- Transaction management

**4. Repository Layer** (`src/repositories/`)
- Data access abstraction
- Database queries using Prisma
- CRUD operations
- Query building and optimization

**5. Database Layer**
- PostgreSQL database
- Prisma ORM for type-safe queries
- Schema defined in `prisma/schema.prisma`

### Why This Architecture?

**Separation of Concerns**: Each layer has a single responsibility
- Routes: HTTP concerns
- Controllers: Request/response handling
- Services: Business logic
- Repositories: Data access

**Testability**: Layers can be tested independently with mocks

**Maintainability**: Changes in one layer don't affect others

**Scalability**: Easy to add new features following the same pattern

## Frontend Architecture

### Component Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (Button, Input, etc.)
│   ├── layout/          # Layout components (Header, Footer)
│   └── tickets/         # Feature-specific components
├── pages/               # Route-level page components
├── api/                 # API client and endpoints
├── store/               # Zustand state management
├── types/               # TypeScript type definitions
└── utils/               # Helper functions
```

### State Management Strategy

**React Query** for server state:
- Automatic caching
- Background refetching
- Optimistic updates
- Loading and error states

**Zustand** for client state:
- Filter state (search, status, priority, sort)
- Lightweight and simple
- No boilerplate

**Why this combination?**
- React Query excels at server state synchronization
- Zustand handles local UI state efficiently
- Avoids Redux complexity for this scale
- Clear separation between server and client state

## Data Model

### Entities

**Ticket**
```typescript
{
  id: string (UUID)
  title: string (5-80 chars)
  description: string (20-2000 chars)
  status: OPEN | IN_PROGRESS | RESOLVED
  priority: LOW | MEDIUM | HIGH
  createdAt: DateTime
  updatedAt: DateTime
  comments: Comment[]
}
```

**Comment**
```typescript
{
  id: string (UUID)
  ticketId: string (foreign key)
  authorName: string (1-100 chars)
  message: string (1-500 chars)
  createdAt: DateTime
}
```

### Relationships
- One Ticket has many Comments (1:N)
- Comments cascade delete when Ticket is deleted
- Indexed on ticketId for efficient queries

### Design Decisions

**UUIDs over Auto-increment IDs**: 
- Better for distributed systems
- No sequential enumeration
- URL-safe

**Enum for Status/Priority**: 
- Type safety
- Database constraints
- Clear domain model

**Cascade Delete**: 
- Comments belong to tickets
- Deleting a ticket should remove its comments
- Maintains referential integrity

## Scalability Considerations

### Current Implementation

**Pagination**: 
- Server-side pagination on ticket list
- Page size limits (10 for tickets, 20 for comments)
- Reduces data transfer and improves performance

**Database Indexing**:
- Indexed fields: status, priority, createdAt, ticketId
- Speeds up filtering and sorting operations
- Optimizes join queries

**Search Strategy**:
- Server-side search using PostgreSQL `ILIKE`
- Case-insensitive search on title and description
- Efficient for current scale (< 100k tickets)

### Future Scaling Strategies

**For Large Ticket Volumes (100k+ tickets)**:
1. **Full-Text Search**: 
   - Implement PostgreSQL full-text search
   - Or integrate Elasticsearch for advanced search
   - Better performance for complex queries

2. **Caching**:
   - Add Redis for frequently accessed tickets
   - Cache ticket list with TTL
   - Invalidate on updates

3. **Database Optimization**:
   - Separate read replicas for queries
   - Write to primary, read from replicas
   - Reduces load on primary database

4. **API Rate Limiting**:
   - Prevent abuse
   - Implement per-IP or per-user limits
   - Use express-rate-limit middleware

**For High Traffic**:
1. **Horizontal Scaling**:
   - Deploy multiple API instances
   - Load balancer (nginx/AWS ALB)
   - Stateless API design supports this

2. **CDN for Frontend**:
   - Static assets served from CDN
   - Faster load times globally
   - Reduced server load

3. **Database Connection Pooling**:
   - Already implemented via Prisma
   - Configure pool size based on load

## Reliability & Error Handling

### Backend Error Handling

**Validation Errors** (400):
- Zod schema validation
- Detailed field-level error messages
- Prevents invalid data from reaching database

**Not Found Errors** (404):
- Explicit checks for resource existence
- Clear error messages

**Server Errors** (500):
- Caught and logged
- Generic message to client (security)
- Detailed logs for debugging

**Database Errors**:
- Prisma error handling
- Transaction rollback on failure
- Connection retry logic

### Frontend Error Handling

**Network Errors**:
- React Query retry logic (1 retry)
- User-friendly error messages
- Retry buttons for failed requests

**Validation Errors**:
- Client-side validation before API call
- Server-side validation as fallback
- Field-level error display

**Loading States**:
- Skeleton screens / spinners
- Optimistic UI updates
- Disabled buttons during mutations

## Security Considerations

### Implemented
- Input validation (Zod schemas)
- SQL injection prevention (Prisma parameterized queries)
- CORS configuration
- Environment variable management (.env)

### Future Enhancements
- Authentication (JWT or session-based)
- Authorization (role-based access control)
- Rate limiting
- HTTPS in production
- Input sanitization (XSS prevention)
- CSRF protection

## Technology Choices & Tradeoffs

### Backend

**Express vs NestJS**
- ✅ Chose Express: Lightweight, flexible, minimal boilerplate
- ❌ NestJS: More structure but overkill for this scale

**Prisma vs TypeORM**
- ✅ Chose Prisma: Better DX, type safety, modern syntax
- ❌ TypeORM: More mature but verbose

**PostgreSQL vs SQLite**
- ✅ Chose PostgreSQL: Production-ready, better for deployment
- ❌ SQLite: Would work for dev but not ideal for deployment

### Frontend

**React Query vs Redux**
- ✅ Chose React Query: Built for server state, less boilerplate
- ❌ Redux: Powerful but overkill, more complexity

**Tailwind vs Component Library (MUI/Chakra)**
- ✅ Chose Tailwind: Full control, smaller bundle, faster development
- ❌ MUI/Chakra: Consistent design but heavier, less customization

**Axios vs Fetch**
- ✅ Chose Axios: Better error handling, interceptors, cleaner API
- ❌ Fetch: Native but requires more boilerplate

## What Was Intentionally Skipped

### Authentication & Authorization
- **Why**: Not in requirements, adds significant complexity
- **How to add**: JWT tokens, user model, protected routes

### Real-time Updates (WebSockets)
- **Why**: Not required, polling is sufficient for this use case
- **How to add**: Socket.io for real-time ticket updates

### File Attachments
- **Why**: Not in requirements, requires file storage (S3/local)
- **How to add**: Multer middleware, file storage service

### Advanced Search (Filters on comments, date ranges)
- **Why**: Basic search meets requirements
- **How to add**: Additional query parameters, complex WHERE clauses

### Email Notifications
- **Why**: Out of scope
- **How to add**: Email service (SendGrid), notification system

### Audit Logs
- **Why**: Not required for MVP
- **How to add**: Separate audit table, track all changes

### Mobile Responsiveness (Partial)
- **Why**: Focused on desktop-first, basic mobile support
- **How to add**: More responsive breakpoints, mobile-specific layouts

## Development vs Production

### Current Configuration (Development)
- Separate dev servers (React: 3000, API: 5000)
- Hot reloading enabled
- Detailed error messages
- Verbose logging

### Production Recommendations
- Build React app (`npm run build`)
- Serve static files from Express
- Minified assets
- Environment-based configuration
- Proper error logging (Winston, Sentry)
- Database migrations (Prisma Migrate)
- HTTPS
- Monitoring and alerting

## Deployment Strategy

See README.md for specific deployment instructions on:
- Render (free tier)
- Railway
- Vercel + Railway
- Heroku

Key considerations:
- Environment variables
- Database provisioning
- Build process
- Health checks
