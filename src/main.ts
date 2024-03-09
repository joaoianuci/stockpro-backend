import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
  })

  const swaggerConfig = new DocumentBuilder().setTitle('Stocks Pro API').setDescription('The Stocks PRO API').setVersion('0.1').build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    useGlobalPrefix: false,
  });

  await app.listen(3333);
}
bootstrap();
