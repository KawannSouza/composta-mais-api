// src/config/swaggerConfig.js

import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  // Informações básicas da API
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Composta+ API',
      version: '1.0.0',
      description: 'Documentação da API do projeto Composta+, para gerenciamento de compostagem e doações.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento Local',
      },
    ],
    // Adiciona a definição de segurança para o Bearer Token (JWT)
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Caminho para os arquivos que contêm as anotações da API
  apis: ['./src/routes/*.js'], // Aponta para todos os arquivos de rota
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;