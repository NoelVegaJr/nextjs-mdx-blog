import * as React from 'react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import useFork from '../hooks/fork';
import { trpc } from '../utils/trpc';

interface IAppProps {}

interface IForkProps {
  children: JSX.Element | JSX.Element[];
}

const Fork = ({ children }: IForkProps) => {
  const { isLoading, code } = useFork(
    'NoelVegaJr',
    'orderly',
    'backend/src/types/types.ts'
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(code);
  return (
    <div>
      {window.atob(code)}
      {/* <SyntaxHighlighter style={atomOneDark} showLineNumbers> */}
      {}
      {/* </SyntaxHighlighter> */}
    </div>
  );
};

const App: React.FunctionComponent<IAppProps> = (props) => {
  const username = useRef<HTMLInputElement>(null);
  const repo = useRef<HTMLInputElement>(null);
  const path = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState() as any;
  const [lines, setLines] = useState<string[]>([]);

  // console.log(content.data?.split('\n').length);
  // const lines = content.data?.split('\n');

  useEffect(() => {
    if (content) {
      setLines(content.split('\n'));
    }
  }, [content]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !username.current?.value ||
      !repo.current?.value ||
      !path.current?.value
    )
      return;
    const response = await fetch('/api/repo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.current.value,
        repo: repo.current.value,
        path: path.current.value,
      }),
    });
    const data = await response.json();
    console.log(data);
    setContent(data.content);
  };
  return (
    // <Fork>
    <div>
      <form onSubmit={submitHandler}>
        <input
          ref={username}
          type='text'
          placeholder='username'
          value='NoelVegaJr'
        />
        <input ref={repo} type='text' placeholder='repo' value='orderly' />
        <input
          ref={path}
          type='text'
          placeholder='path'
          value='backend/src/types/types.ts'
        />
        <button type='submit'>submit</button>
      </form>
      <pre>
        {lines?.map((line, index: number) => {
          return (
            <li
              className={`flex cursor-pointer list-none p-0.5 hover:bg-slate-100 `}
              key={index}
              onClick={() => console.log(index + 1)}
            >
              <div className='mr-8 text-orange-600'>{index + 1}</div>
              <p>{line}</p>
            </li>
          );
        })}
      </pre>
    </div>
    // </Fork>
  );
};

export const getServerSideProps = () => {
  return { props: { filePath: process.cwd() } };
};

export default App;
