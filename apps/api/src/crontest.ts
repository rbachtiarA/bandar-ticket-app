import cron from 'node-cron';

cron.schedule('* * * * *', async () => {
    console.log('testing cron job');
});