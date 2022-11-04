import * as React from 'react';
import { useEffect, useState } from 'react';
import { formatBase64 } from '../utils/formatBase64';
import { trpc } from '../utils/trpc';
interface IRepoFileProps {
  url: string;
}

const RepoFile: React.FunctionComponent<IRepoFileProps> = ({ url }) => {
  const file = trpc.getFileContent.useQuery({ url });
  const [code, setCode] = useState(['']);

  useEffect(() => {
    if (file.data) {
      const rawString = formatBase64(file.data.base64);
      const codeLines = rawString.split('\n');
      setCode(codeLines);
    }
  }, [file.data]);

  if (file.isError) {
    return <div>Error</div>;
  }

  if (file.isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div className='rounded-lg border '>
      <div className='border-bottom border bg-neutral-50 p-2'>
        <p className='flex gap-4'>
          <span>{code.length} lines</span>
          <span>
            {file.data.size / 1000 > 1
              ? `${file.data.size / 1000} kb`
              : `${file.data.size} Bytes`}{' '}
          </span>
        </p>
      </div>
      <ul className='p-2'>
        {code?.map((line, index: number) => {
          return (
            <li
              className={`flex cursor-pointer list-none items-center p-0.5 hover:bg-slate-100 `}
              key={index}
              onClick={() => console.log(index + 1)}
            >
              <div className='mr-8 text-sm text-orange-600'>{index + 1}</div>
              <p>{line}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RepoFile;
