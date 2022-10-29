import Pusher from 'pusher';
import { NextApiRequest, NextApiResponse } from 'next';

export const handler = (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req);
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID as string,
    key: process.env.PUSHER_APP_KEY as string,
    secret: process.env.PUSHER_SECRET as string,
    cluster: 'us2',
    useTLS: true,
  });

  pusher.trigger('chat', 'message', {
    message: 'hello world',
  });
};

export default handler;
