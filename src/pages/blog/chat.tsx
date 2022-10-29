import * as React from 'react';
import { FormEvent, useContext, useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import { trpc } from '../../utils/trpc';
import { UserContext } from '../../context/user-context';
import Image from 'next/image';

interface IChatProps {}

const Chat: React.FunctionComponent<IChatProps> = (props) => {
  const userCtx = useContext(UserContext);
  const newMessage = trpc.pusherMsg.useMutation();
  const [msg, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  console.log(userCtx);
  useEffect(() => {
    const pusher = new Pusher('9be33f1d0ef0e0514ba3', {
      cluster: 'us2',
    });
    const channel = pusher.subscribe('chat');

    channel.bind('chat-event', (msg: any) => {
      setMessages((prev) => [...prev, msg.message]);
      console.log(msg);
      console.log(messages);
    });

    return () => {
      pusher.unsubscribe('chat');
    };
  }, [messages]);
  // console.log(messages);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!msg) return;
    newMessage.mutate({ msg });
    setMessage('');
  };

  return (
    <div className=' flex h-full w-96 flex-col border'>
      <ul className=' col flex w-full grow flex-col gap-2 p-2'>
        {messages?.map((message) => {
          console.log(message);
          return (
            <li key={Math.random()} className='flex gap-2'>
              <div>
                <Image
                  src={userCtx.image}
                  alt='user avatar'
                  width='25'
                  height='25'
                  className='rounded-full'
                />
              </div>
              <p className='w-fit rounded-lg bg-slate-400 p-2 font-semibold'>
                {message}
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
