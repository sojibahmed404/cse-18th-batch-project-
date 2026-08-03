import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { env } from './config/env';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import { logger } from './config/logger';

const app = express();

app.set('trust proxy', 1);

app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false,
}));

const corsOrigins = env.CORS_ORIGINS.split(',').map(o => o.trim());
app.use(cors({
  origin: corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many authentication attempts.' },
});
app.use('/api/v1/auth/', authLimiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser(env.COOKIE_SECRET));
app.use(compression());

if (env.NODE_ENV !== 'test') {
  app.use(morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) },
  }));
}

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: env.NODE_ENV,
    app: env.APP_NAME,
  });
});

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'CSE 18th Batch Academic Portal API',
    version: '1.0.0',
    description: 'API documentation for the CSE 18th Batch Academic Portal',
  },
  servers: [{ url: '/api/v1', description: 'API v1' }],
};
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
