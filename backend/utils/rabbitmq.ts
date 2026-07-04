import amqp from 'amqplib';

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://guest:guest@localhost:5672');
    channel = await connection.createChannel();
    await channel.assertQueue('NOTIFICATIONS_QUEUE', { durable: true });
    console.log('RabbitMQ connected');
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
  }
};

export const publishNotification = (message: any) => {
  if (channel) {
    channel.sendToQueue('NOTIFICATIONS_QUEUE', Buffer.from(JSON.stringify(message)), { persistent: true });
  }
};

export const getChannel = () => channel;
