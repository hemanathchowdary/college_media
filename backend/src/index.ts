import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createServer } from 'http';
import authRoutes from './routes/auth';
import friendsRoutes, { setSocketIOInstance } from './routes/friends';
import messagesRoutes from './routes/messages';
import { initializeSocket } from './lib/socket';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 4000;

// MongoDB Atlas connection string with database name
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://hemboy:fd6XQS2j59c4XZXB@cluster0.dcwndln.mongodb.net/collegemedia?retryWrites=true&w=majority';

// Enable CORS for all routes
app.use(cors({ 
  origin: true, // Allow all origins in development
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

// Middleware to ensure JSON responses
app.use((req, res, next) => {
  // Store original json method
  const originalJson = res.json.bind(res);
  
  // Override json method to always set content-type
  res.json = function(body: any) {
    res.setHeader('Content-Type', 'application/json');
    return originalJson(body);
  };
  
  next();
});

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/auth', authRoutes);
app.use('/api', friendsRoutes);
app.use('/api', messagesRoutes);

// 404 handler - must be after all routes
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler - must be last
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal server error' 
  });
});

// Initialize Socket.IO
const io = initializeSocket(httpServer);
// Make Socket.IO instance available to routes
setSocketIOInstance(io);

async function start() {
  await mongoose.connect(MONGODB_URI);
  console.log('MongoDB connected');
  httpServer.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
}

start().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
