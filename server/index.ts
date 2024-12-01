import express from 'express';
import cors from 'cors';
import assetRoutes from './routes/assetRoutes';
import portfolioRoutes from './routes/portfolioRoutes';
import { errorHandler } from './middleware/errorMiddleware';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio API is running' });
});

// API routes
app.use('/api/assets', assetRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Health check available at http://localhost:${port}/`);
  console.log(`API endpoints available at http://localhost:${port}/api/*`);
});