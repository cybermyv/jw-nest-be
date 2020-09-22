import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  const options = new DocumentBuilder()
  .setTitle('Ювелирный интернет-магазин')
  .setDescription('API магазине')
  .setVersion('0.0.1')
  // .addTag('store')
  .build()

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
