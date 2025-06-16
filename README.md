# 🌐 Serviço de Tradução Assíncrona

Um sistema de tradução assíncrona construído com arquitetura de microserviços, utilizando Node.js, RabbitMQ, LibreTranslate e SQLite.

## 🏗️ Arquitetura

O sistema é composto por 5 serviços principais:

- **Translation API**: API REST para gerenciar solicitações de tradução
- **Translation Worker**: Worker que processa as traduções de forma assíncrona
- **LibreTranslate**: Serviço de tradução de código aberto
- **RabbitMQ**: Message broker para comunicação assíncrona
- **Adminer**: Interface web para gerenciamento do banco de dados

## 🚀 Tecnologias

- **Node.js 18** - Runtime JavaScript
- **Express.js** - Framework web
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados
- **RabbitMQ** - Message broker
- **LibreTranslate** - Serviço de tradução
- **Docker & Docker Compose** - Containerização
- **Swagger** - Documentação da API

## 📋 Pré-requisitos

- Docker
- Docker Compose

## 🔧 Instalação e Execução

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd tradutor
```

2. **Execute os serviços**
```bash
docker-compose up -d --build
```

3. **Aguarde a inicialização**
O LibreTranslate pode demorar alguns minutos para baixar os modelos de tradução na primeira execução.

## 🌐 Endpoints e Interfaces

### API REST
- **Base URL**: http://localhost:4040
- **Documentação Swagger**: http://localhost:4040/api-docs
- **Health Check**: http://localhost:4040/translations/health

### Principais Endpoints

#### Criar Tradução
```http
POST /translations
Content-Type: application/json

{
  "originalText": "Hello, how are you?",
  "sourceLanguage": "en",
  "targetLanguage": "pt"
}
```

#### Consultar Tradução
```http
GET /translations/{id}
```

#### Listar Traduções
```http
GET /translations
```

### Interfaces de Gerenciamento

- **RabbitMQ Management**: http://localhost:15672
  - Usuário: `guest`
  - Senha: `guest`

- **Adminer (Banco de dados)**: http://localhost:8080
  - Sistema: SQLite
  - Servidor: deixar vazio
  - Usuário e senha: deixar vazio
  - Base de dados: `/var/www/html/data/dev.db`
  

- **LibreTranslate**: http://localhost:5000

## 📊 Status de Tradução

As traduções passam pelos seguintes status:

- `queued` - Solicitação criada e na fila
- `processing` - Sendo processada pelo worker
- `completed` - Tradução concluída com sucesso
- `failed` - Erro durante o processamento

## 🔄 Fluxo de Funcionamento

1. **Cliente** faz uma requisição POST para `/translations`
2. **API** salva a solicitação no banco com status `queued`
3. **API** envia mensagem para a fila RabbitMQ
4. **Worker** consome a mensagem da fila
5. **Worker** atualiza status para `processing` via API
6. **Worker** aguarda 10 segundos (simulação)
7. **Worker** chama o LibreTranslate para traduzir
8. **Worker** atualiza o resultado via API
9. **Cliente** pode consultar o status/resultado via GET

## 🛠️ Comandos Úteis

### Gerar documentação Swagger
```bash
cd translation-api
npm run swagger
```

### Logs dos serviços
```bash
# Todos os serviços
docker-compose logs -f

# Serviço específico
docker-compose logs -f translation-api
docker-compose logs -f translation-worker
```

### Parar os serviços
```bash
docker-compose down
```

### Rebuild completo
```bash
docker-compose down
docker-compose up -d --build
```

## 🏛️ Estrutura do Projeto

```
tradutor/
├── translation-api/
│   ├── src/
│   │   ├── config/          # Configurações (DB, RabbitMQ)
│   │   ├── controllers/     # Controladores da API
│   │   ├── models/          # Modelos de dados
│   │   ├── routes/          # Definição das rotas
│   │   ├── services/        # Lógica de negócio
│   │   ├── helpers/         # Utilitários e tratamento de erros
│   │   └── swagger/         # Configuração do Swagger
│   ├── prisma/
│   │   └── schema.prisma    # Schema do banco de dados
│   └── Dockerfile
├── translation-worker/
│   ├── src/
│   │   ├── config/          # Configurações (RabbitMQ)
│   │   └── services/        # Serviços (LibreTranslate, API)
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🔒 Boas Práticas Implementadas

- **Separação de responsabilidades** por camadas (controllers, services, models)
- **Microserviços independentes** - Worker não acessa banco diretamente
- **Comunicação via API REST** entre microserviços
- **Tratamento de erros centralizado**
- **Health checks** para todos os serviços
- **Documentação automática** com Swagger
- **Retry automático** para falhas de rede
- **Containerização** com Docker

## 🌍 Idiomas Suportados

O LibreTranslate está configurado para suportar:
- **en** - Inglês
- **pt** - Português
- **es** - Espanhol

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.