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

// Module Routes
import authRoutes from './modules/auth/auth.routes';
import usersRoutes from './modules/users/users.routes';
import studentsRoutes from './modules/students/students.routes';
import teachersRoutes from './modules/teachers/teachers.routes';
import semestersRoutes from './modules/semesters/semesters.routes';
import coursesRoutes from './modules/courses/courses.routes';
import assignmentsRoutes from './modules/assignments/assignments.routes';
import noticesRoutes from './modules/notices/notices.routes';
import routinesRoutes from './modules/routines/routines.routes';
import eventsRoutes from './modules/events/events.routes';
import galleryRoutes from './modules/gallery/gallery.routes';
import notificationsRoutes from './modules/notifications/notifications.routes';
import analyticsRoutes from './modules/analytics/analytics.routes';
import searchRoutes from './modules/search/search.routes';
import uploadRoutes from './modules/upload/upload.routes';

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

// Body Parsers & Compression (must come before routes)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser(env.COOKIE_SECRET));
app.use(compression());

// Rate limiters
const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

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

// Register API v1 Module Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/students', studentsRoutes);
app.use('/api/v1/teachers', teachersRoutes);
app.use('/api/v1/semesters', semestersRoutes);
app.use('/api/v1/courses', coursesRoutes);
app.use('/api/v1/assignments', assignmentsRoutes);
app.use('/api/v1/notices', noticesRoutes);
app.use('/api/v1/routines', routinesRoutes);
app.use('/api/v1/events', eventsRoutes);
app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/v1/notifications', notificationsRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/upload', uploadRoutes);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
