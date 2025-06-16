const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Translation API',
      version: '1.0.0',
      description: 'API para serviço de tradução assíncrona',
    },
    servers: [
      {
        url: process.env.SERVER_SW || 'http://localhost:4040',
        description: 'Servidor de desenvolvimento',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs; 