import { getChannel } from '../utils/rabbitmq.js';
import prisma from '../utils/db.js';

export const startNotificationWorker = async () => {
  const channel = getChannel();
  if (!channel) return;

  channel.consume('NOTIFICATIONS_QUEUE', async (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      
      if (data.type === 'TASK_ASSIGNED') {
        await prisma.notification.create({
          data: {
            userId: data.userId,
            message: `You have been assigned a new task: ${data.taskTitle}`
          }
        });
      } else if (data.type === 'TASK_COMPLETED') {
        const admins = await prisma.user.findMany({ where: { role: 'ADMIN' } });
        for (const admin of admins) {
          await prisma.notification.create({
            data: {
              userId: admin.id,
              message: `Task completed by employee: ${data.taskTitle}`
            }
          });
        }
      }
      channel.ack(msg);
    }
  });
};
