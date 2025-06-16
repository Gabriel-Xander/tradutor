const fs = require('fs');
const path = require('path');
const swaggerSpec = require('./config');

const outputPath = path.join(__dirname, '../../swagger.json');

fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));

console.log('Documentação Swagger gerada em:', outputPath); 