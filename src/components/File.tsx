import * as React from 'react';
import { useEffect, useState } from 'react';
import { formatBase64 } from '../utils/formatBase64';
import { trpc } from '../utils/trpc';
interface IRepoFileProps {
  url: string;
}

const RepoFile: React.FunctionComponent<IRepoFileProps> = ({ url }) => {
  console.log('REPOFILE Url:');
  const base64 = trpc.getFileContent.useQuery({ url });
  const [code, setCode] = useState(['']);

  useEffect(() => {
    if (base64.data) {
      const rawString = formatBase64(base64.data);
      const codeLines = rawString.split('\n');
      setCode(codeLines);
    }
  }, [base64]);
  console.log(base64);
  if (base64.isError) {
    return <div>Error</div>;
  }

  if (base64.isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      {code?.map((line, index: number) => {
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
    </div>
  );
};

export default RepoFile;
