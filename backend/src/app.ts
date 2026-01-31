// import express, { Application } from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import ticketRoutes from './routes/ticketRoutes';
// import commentRoutes from './routes/commentRoutes';
// import { errorHandler, notFoundHandler } from './middleware/errorHandler';
// import { logger } from './middleware/logger';

// dotenv.config();

// const app: Application = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(logger);

// // Health check
// app.get('/health', (req, res) => {
//   res.json({ status: 'ok', timestamp: new Date().toISOString() });
// });

// // API Routes
// app.use('/api/tickets', ticketRoutes);
// app.use('/api/tickets', commentRoutes);

// // Error handling
// app.use(notFoundHandler);
// app.use(errorHandler);

// export default app;

import { Request, Response } from "express";
import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import ticketRoutes from './routes/ticketRoutes';
import commentRoutes from './routes/commentRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { logger } from './middleware/logger';

dotenv.config();

const app: Application = express();

// CORS — in production, allow the Vercel frontend origin explicitly
const origin = process.env.FRONTEND_URL || '*';
app.use(cors({ origin }));

app.use(express.json());
app.use(logger);

// Health check
// app.get('/health', (req, res) => {
//   res.json({ status: 'ok', timestamp: new Date().toISOString() });
// });

app.get("/health", (req: Request, res: Response) => {
  res.send("OK");
});

// API Routes
app.use('/api/tickets', ticketRoutes);
app.use('/api/tickets', commentRoutes);

// In production, serve the React build from /frontend/dist
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.resolve(__dirname, '..', '..', 'frontend', 'dist');
  app.use(express.static(staticPath));

  // SPA catch-all: any route that isn't /api/* returns index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(staticPath, 'index.html'));
  });
}

// Error handling (only reached for non-static routes)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
