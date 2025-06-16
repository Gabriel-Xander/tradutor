const fs = require('fs');
const rabbitmq = require('./config/rabbitmq');
const TranslationService = require('./services/TranslationService');

const dataDir = '/app/data';
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true, mode: 0o777 });
}

try {
  fs.chmodSync(dataDir, 0o777);
} catch (error) {
  console.warn('Aviso: Não foi possível alterar permissões do diretório:', error.message);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startWorker() {
  try {
    console.log('Aguardando serviços estarem prontos...');
    await sleep(15000);
    
    await rabbitmq.connect();
    
    await rabbitmq.consume('translation-queue', TranslationService.processTranslation);
    
    console.log('Worker iniciado');
  } catch (error) {
    console.error('Erro na inicialização do worker:', error);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  console.log('Encerrando worker...');
  await rabbitmq.close();
  process.exit(0);
});

startWorker(); 