import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para el frontend (ajusta origin si es necesario)
  app.enableCors({
    origin: '*', // Cambia esto por el dominio de tu frontend en producción
  });

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('Gateway para microservicios de agencias, proyectos y relaciones')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3010);
  console.log('Gateway API is running on port', process.env.PORT ?? 3010);
  console.log('Swagger docs available at /api');
}
bootstrap();
