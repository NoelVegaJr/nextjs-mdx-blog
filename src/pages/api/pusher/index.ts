import Pusher from 'pusher';
import { NextApiRequest, NextApiResponse } from 'next';
export const pusher = new Pusher({
  appId: process.env.app_id as string,
  key: process.env.key as string,
  secret: process.env.secret as string,
  cluster: process.env.cluster as string,
  useTLS: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { message, sender } = req.body;
  const response = await pusher.trigger('chat', 'chat-event', {
    message,
    sender,
  });

  res.json({ message: 'completed' });
}
