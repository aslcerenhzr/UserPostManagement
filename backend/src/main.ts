import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend communication
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Allow both common frontend ports
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  await app.listen(3001);
  console.log('Backend server running on http://localhost:3001');
}
bootstrap();
