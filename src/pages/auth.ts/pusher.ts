import { NextApiRequest, NextApiResponse } from 'next';
import { pusher } from '../api/pusher';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { socket_id, channel_name, username } = req.body;

  const randomString = Math.random().toString(36).slice(2);
  const presenceData = {
    user_id: randomString,
    user_info: {
      username,
    },
  };

  try {
    const auth = pusher.authenticate(socket_id, channel_name, presenceData);
  } catch (error: any) {
    console.log(error);
  }
}
