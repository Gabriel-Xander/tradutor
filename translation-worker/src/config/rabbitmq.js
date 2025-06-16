const amqp = require('amqplib');

class RabbitMQConsumer {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    try {
      this.connection = await amqp.connect(process.env.RABBITMQ || 'amqp://guest:guest@rabbitmq:5672');
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue('translation-queue');
      console.log('Worker conectado ao RabbitMQ');
    } catch (error) {
      console.error('Erro ao conectar ao RabbitMQ:', error);
      throw error;
    }
  }

  async consume(queue, callback) {
    if (!this.channel) {
      await this.connect();
    }
    
    this.channel.consume(queue, async (msg) => {
      if (msg) {
        try {
          const data = JSON.parse(msg.content.toString());
          await callback(data);
          this.channel.ack(msg);
        } catch (error) {
          console.error('Erro ao processar mensagem:', error);
          this.channel.nack(msg, false, false);
        }
      }
    });
  }

  async close() {
    if (this.connection) {
      await this.connection.close();
    }
  }
}

module.exports = new RabbitMQConsumer(); 