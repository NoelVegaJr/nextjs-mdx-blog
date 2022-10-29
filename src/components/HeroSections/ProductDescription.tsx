import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
interface IProductDescriptionProps {
  image: string;
  title: string;
  description: string;
  linkLabel: string;
  linkUrl: string;
}

const ProductDescription: React.FunctionComponent<IProductDescriptionProps> = ({
  image,
  title,
  description,
  linkLabel,
  linkUrl,
}) => {
  return (
    <article className='mx-auto flex max-w-5xl items-center gap-32'>
      <div className='flex  w-1/2 justify-center rounded-lg bg-white'>
        <Image src={image} alt='' width='300' height='300' />
      </div>
      <div className=' w-3/4 gap-8 p-6'>
        <div className='flex flex-col gap-6'>
          <h3 className=' text-left text-5xl font-bold'>{title}</h3>
          <p className='text-left text-xl font-semibold'>{description}</p>
          <Link href={linkUrl}>
            <div className='group w-fit cursor-pointer'>
              <a
                href='#'
                className='flex items-center gap-2 text-lg font-semibold text-cyan-600'
              >
                {linkLabel}
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
                    d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3'
                  />
                </svg>
              </a>
              <div className='h-0.5 w-0 bg-cyan-600 transition-all duration-500 ease-in-out group-hover:w-full' />
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductDescription;
