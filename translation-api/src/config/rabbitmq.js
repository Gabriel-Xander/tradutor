const amqp = require('amqplib');

class RabbitMQService {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    try {
      this.connection = await amqp.connect(process.env.RABBITMQ || 'amqp://guest:guest@rabbitmq:5672');
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue('translation-queue');
      console.log('Conectado ao RabbitMQ');
    } catch (error) {
      console.error('Erro ao conectar ao RabbitMQ:', error);
      throw error;
    }
  }

  async publishMessage(queue, message) {
    if (!this.channel) {
      await this.connect();
    }
    return this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }

  async close() {
    if (this.connection) {
      await this.connection.close();
    }
  }
}

module.exports = new RabbitMQService(); 