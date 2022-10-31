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
    <article className='flex w-full grow flex-col items-center lg:mx-auto lg:max-w-5xl lg:flex-row lg:gap-32'>
      <div className=' justify-center  rounded-lg bg-white lg:flex lg:w-1/2'>
        <Image src={image} alt='' width='300' height='300' />
      </div>
      <div className='w-full  p-6 lg:w-3/4'>
        <div className='flex w-full flex-col gap-6'>
          <h3 className=' text-center text-3xl font-bold lg:text-left lg:text-5xl'>
            {title}
          </h3>
          <p className='px-12 text-center text-xl font-semibold lg:p-0 lg:text-left'>
            {description}
          </p>
          <Link href={linkUrl}>
            <div className='group mx-auto w-fit cursor-pointer'>
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
