import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { trpc } from '../../../utils/trpc';
interface IRepoProps {
  name: string;
  path: string;
  setPath: Dispatch<SetStateAction<string>>;
  setFile: Dispatch<SetStateAction<string>>;
}

const Repo: React.FunctionComponent<IRepoProps> = ({
  name,
  path,
  setPath,
  setFile,
}: IRepoProps) => {
  const repo = trpc.getRepo.useQuery({ owner: 'NoelVegaJr', repo: name });

  if (!repo.data) {
    return <div>Loading...</div>;
  }
  if (repo.error) {
    return <div>error</div>;
  }
  return (
    <div className=''>
      <div className='rounded-lg border'>
        <div className='bg-slate-100 p-2'>Latest activity here</div>

        {name &&
          repo.data?.message !== 'This repository is empty.' &&
          repo?.data?.map((item: any, index: number) => {
            return (
              <li
                key={index}
                className='flex cursor-pointer list-none items-center gap-2 border-y border-slate-200 px-3 py-2 hover:bg-slate-100'
                onClick={() => {
                  console.log('Clicked Item: ', item);
                  if (item.type === 'dir') {
                    console.log('SETTING PATH: ', item.name);
                    setPath((prev) => prev + '/' + item.name);
                  } else {
                    console.log('This is a file');
                    setFile(item.name);
                  }
                }}
              >
                {item.type === 'dir' ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='stoke-black h-4 w-4 fill-blue-400'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z'
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-4 w-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                    />
                  </svg>
                )}

                <p className=''>{item.name}</p>
              </li>
            );
          })}
      </div>
    </div>
  );
};

export default Repo;
