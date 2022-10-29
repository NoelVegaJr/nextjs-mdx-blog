import Pusher from 'pusher';
const pusher = new Pusher({
  appId: process.env.app_id as string,
  key: process.env.PUSHER_APP_KEY as string,
  secret: process.env.secret as string,
  cluster: 'us2',
  useTLS: true,
});

export default pusher;
