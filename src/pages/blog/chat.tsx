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
            <li
              key={Math.random()}
              className={` flex ${
                message.username !== userCtx.username
                  ? 'justify-start'
                  : 'justify-end gap-2'
              }`}
            >
              <div>
                {!message.avatar ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                ) : (
                  <Image
                    src={message.avatar}
                    alt='user avatar'
                    width='25'
                    height='25'
                    className='rounded-full'
                  />
                )}
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
