import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';

const prisma = new PrismaClient();
const threeMonths = 3 * 30 * 24 * 60 * 60 * 1000;

cron.schedule('0 0 0 * * *', async () => {
  try {
    console.log('Running Cron Job', new Date().toISOString());

    const now = new Date();
    const users = await prisma.user.findMany({
      where: {
        OR: [{ points: { gt: 0 } }, { discount: true }],
      },
    });

    for (const user of users) {
      const lastPointUpdate = now.getTime() - user.lastPointsUpdate.getTime();

      if (lastPointUpdate >= threeMonths) {
        await prisma.user.update({
          where: { id: user.id },
          data: { points: 0, lastPointsUpdate: now },
        });
      }

      if (
        user.discount &&
        user.discountExpires &&
        user.discountExpires <= now
      ) {
        await prisma.user.update({
          where: { id: user.id },
          data: { discount: false, discountExpires: null },
        });
      }
    }
    console.log('Cron Job Completed', new Date().toISOString());
  } catch (error) {
    console.error('Cron Job Error', error);
  }
});
