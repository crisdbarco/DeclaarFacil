import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';  // Import correto do Reflector

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Declara Fácil')
    .setDescription('The Declara Facil API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const reflector = app.get(Reflector);  // Obtendo o Reflector
  const jwtService = app.get(JwtService); // Obtendo o JwtService

  // Passando os parâmetros necessários para o JwtAuthGuard
  app.useGlobalGuards(new JwtAuthGuard(reflector, jwtService));

  await app.listen(3000);
}
bootstrap();