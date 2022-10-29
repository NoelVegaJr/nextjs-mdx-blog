import * as React from 'react';
import { FormEvent, useContext, useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import { trpc } from '../../utils/trpc';
import { UserContext } from '../../context/user-context';
import Image from 'next/image';

interface IChatProps {
  blogPostId: string;
}

const Chat: React.FunctionComponent<IChatProps> = ({
  blogPostId,
}: IChatProps) => {
  const userCtx = useContext(UserContext);
  const newMessage = trpc.pusherMsg.useMutation();
  const [msg, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  useEffect(() => {
    const pusher = new Pusher('88425a056d940139aefb', {
      cluster: 'us2',
    });
    const channel = pusher.subscribe(blogPostId);

    channel.bind('new-message', (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      pusher.unsubscribe(blogPostId);
    };
  }, [messages, blogPostId]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!msg) return;
    newMessage.mutate({
      msg,
      blogPostId,
      username: userCtx.username,
      date: new Date().toString(),
      avatar: userCtx.image,
    });
    setMessage('');
  };

  return (
    <div className=' flex h-full w-96 flex-col border'>
      <ul className=' col flex w-full grow flex-col gap-2 p-2'>
        {messages?.map((message) => {
          return (
            <li key={Math.random()} className='flex gap-2'>
              <div>
                <Image
                  src={message.avatar}
                  alt='user avatar'
                  width='25'
                  height='25'
                  className='rounded-full'
                />
              </div>
              <p className='w-fit rounded-lg bg-slate-400 p-2 font-semibold'>
                {message.message}
              </p>
            </li>
          );
        })}
      </ul>
      <form onSubmit={submitHandler} className='p-2'>
        <input
          type='text'
          placeholder='message'
          className='w-full rounded  border border-slate-400 p-2 outline-none focus:border-2 focus:border-slate-500'
          value={msg}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Chat;
