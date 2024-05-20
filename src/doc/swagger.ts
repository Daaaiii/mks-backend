import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerDocumentConfig = new DocumentBuilder()
  .setVersion(process.env.npm_package_version || '1.0.0')
  .setTitle('Movies')
  .setDescription(process.env.npm_package_description || 'API de filmes')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      name: 'authorization',
      in: 'header',
      bearerFormat: 'JWT',
      description: 'Use `accessToken`, ele é obtido no login.',
    },
    'access',
  )
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      name: 'authorization',
      in: 'header',
      bearerFormat: 'JWT',
      description:
        'Use `recoveryToken`, ele é obtido no e-mail enviado ao pedir a redefinição de senha.',
    },
    'recovery',
  )
  .build();
