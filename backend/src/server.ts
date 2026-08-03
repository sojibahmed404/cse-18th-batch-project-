import app from './app';
import { env } from './config/env';
import { logger } from './config/logger';
import prisma from './config/database';

async function startServer(): Promise<void> {
  try {
    await prisma.$connect();
    logger.info('✅ Database connected successfully');

    const server = app.listen(env.PORT, () => {
      logger.info(`🚀 Server running on http://localhost:${env.PORT}`);
      logger.info(`📚 API docs: http://localhost:${env.PORT}/api/docs`);
      logger.info(`🌍 Environment: ${env.NODE_ENV}`);
      logger.info(`🎓 ${env.APP_NAME} - ${env.UNIVERSITY_NAME}`);
    });

    const gracefulShutdown = async (signal: string): Promise<void> => {
      logger.info(`${signal} received. Shutting down gracefully...`);
      server.close(async () => {
        await prisma.$disconnect();
        logger.info('Server closed and database disconnected.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('unhandledRejection', (reason) => {
      logger.error('Unhandled Rejection:', reason);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

startServer();
