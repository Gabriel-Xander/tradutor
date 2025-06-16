FROM node:18-alpine

# Instalar dependências necessárias para o Prisma e health check
RUN apk add --no-cache openssl libc6-compat wget

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run prisma:generate

# Criar diretório de dados com permissões corretas
RUN mkdir -p /app/data && chmod 777 /app/data

EXPOSE 4040

CMD ["sh", "-c", "npx prisma db push --accept-data-loss && npm start"]
