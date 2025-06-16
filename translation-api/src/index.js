const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');

const prisma = require('./config/database');
const rabbitmq = require('./config/rabbitmq');
const routes = require('./routes');
const swaggerSpec = require('./swagger/config');
const { errorHandler, notFoundHandler } = require('./helpers/errorHandler');

const app = express();
const port = process.env.PORT || 4040;
const host = process.env.HOST || '0.0.0.0';

const dataDir = '/app/data';
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true, mode: 0o777 });
}

try {
  fs.chmodSync(dataDir, 0o777);
} catch (error) {
  console.warn('Aviso: Não foi possível alterar permissões do diretório:', error.message);
}

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', routes);

app.use(notFoundHandler);
app.use(errorHandler);

async function startServer() {
  try {
    await prisma.$connect();
    console.log('Conectado ao banco de dados');

    await rabbitmq.connect();

    app.listen(port, host, () => {
      console.log(`Servidor rodando em http://${host}:${port}`);
      console.log(`Documentação disponível em http://${host}:${port}/api-docs`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  console.log('Encerrando servidor...');
  await prisma.$disconnect();
  await rabbitmq.close();
  process.exit(0);
});

startServer(); 