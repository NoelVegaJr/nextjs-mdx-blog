import * as React from 'react';
import Image from 'next/image';

interface IBlogCardProps {
  title: string;
  description: string;
  date: string;
  demoUrl: string;
  thumbnailUrl: string;
}

const BlogCard: React.FunctionComponent<IBlogCardProps> = ({
  title,
  description,
  date,
  demoUrl,
  thumbnailUrl,
}: IBlogCardProps) => {
  return (
    <div className='w-full'>
      <div
        className='mx-auto flex w-full max-w-5xl cursor-pointer flex-col  rounded-lg  border border-slate-300 p-8 shadow-md duration-300 hover:scale-105 hover:shadow-lg
            '
      >
        <header className='mb-2'>
          <h5 className=' text-lg md:text-2xl'>
            <strong>{title}</strong>
          </h5>
        </header>

        <main className='flex w-full flex-col items-center  justify-between gap-4'>
          <div className='flex h-full w-full flex-col justify-between gap-4 md:flex-row '>
            <div className='flex flex-col justify-between gap-4 md:w-full md:flex-row'>
              <div className='flex h-full flex-col justify-between'>
                <div>
                  <p className='mb-2 font-semibold'>{description}</p>
                  <div className='flex flex-col gap-2 '>
                    <i className=''>{date}</i>

                    {/* <div className='flex flex-wrap'>
                          {post.tags?.map((tag: string, index: number) => {
                            return (
                              <div
                                key={index}
                                className='w-fit rounded border bg-blue-600 px-2 py-1 text-sm text-white duration-300 hover:brightness-110'
                              >
                                {tag}
                              </div>
                            );
                          })}
                        </div> */}
                  </div>
                </div>
                {demoUrl && (
                  <a
                    href={demoUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className='group w-fit rounded bg-slate-900 px-4 py-1 text-white hover:brightness-105'
                  >
                    Live Demo
                    <div className='h-0.5 w-0 bg-white transition-all duration-500 ease-in-out group-hover:w-full' />
                  </a>
                )}
              </div>
              <div className='md:justify-right relative mx-auto flex w-full justify-center md:w-2/4 md:justify-end'>
                <Image
                  src={thumbnailUrl}
                  alt='thumbnail'
                  width={400}
                  height={300}
                  className='absolute w-full rounded'
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BlogCard;
