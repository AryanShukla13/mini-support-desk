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

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
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
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/tickets', ticketRoutes);
app.use('/api/tickets', commentRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;