import Image from 'next/image';
import Link from 'next/link';
import ProductDescription from '../components/HeroSections/ProductDescription';
import { trpc } from '../utils/trpc';

interface IHomeProps {}
const Home = () => {
  const posts = trpc.getBlogPosts.useQuery();

  if (!posts.data || posts.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div
        id='landing'
        className='flex h-full w-full  flex-col gap-8 bg-white px-4 sm:px-12'
      >
        <div className='flex h-full w-full'>
          <div className='grid h-full w-full place-items-center lg:w-1/2 '>
            <div>
              <h1 className=' mb-6 text-5xl font-bold text-black  drop-shadow-2xl'>
                A{' '}
                <span className='bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent'>
                  fully featured
                </span>{' '}
                documentation platform for your code.
              </h1>
              <p className='mb-12 text-2xl'>
                Documenting your work made open source.
              </p>
              <div className='flex gap-4'>
                <Link href='/admin'>
                  <a className=' block rounded bg-blue-500 bg-gradient-to-r from-blue-500 to-cyan-600 py-3 px-6 text-xl font-semibold text-white saturate-150 transition-all duration-300 hover:scale-105 hover:from-blue-500 '>
                    Get started
                  </a>
                </Link>
                <button className='group flex items-center gap-2  rounded border  py-3 px-6 text-xl font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-gray-50  hover:from-slate-500 hover:to-slate-400 '>
                  <Image
                    src='/GitHub-Mark-32px.png'
                    alt='GitHub logo'
                    width='20'
                    height='20'
                    className=' rounded-full transition-all duration-300 group-hover:bg-slate-100 '
                  />
                  GitHub
                </button>
              </div>
            </div>
          </div>
          <div className='hidden h-full  w-1/2  place-items-center lg:grid'>
            <div className='  '>
              <Image
                src='/employees-doing-planning-of-work.png'
                alt='employees working'
                width='500'
                height='500'
              />
            </div>
          </div>
        </div>
      </div>
      <section
        id='product'
        className='flex  w-full grow flex-col justify-evenly gap-32 bg-orange-50 py-20 lg:gap-16'
      >
        <ProductDescription
          title='Documenting your app made easy.'
          description='Code Fork is built to give developers a platform to more easily
                document applications of any size.'
          image='/document.png'
          linkLabel='Learn more about Code Fork features'
          linkUrl='/'
        />
        <ProductDescription
          title='Improve documentation together.'
          description='Collaborate with your team or other engineers to document and solve problems for yourself and future developers.'
          image='/community.png'
          linkLabel='Learn how collaboration can help your documentation'
          linkUrl='/'
        />
        <ProductDescription
          title='Organize and grow your app.'
          description='Use Code Fork to organize your thoughts and code.'
          image='/planning.png'
          linkLabel='Let Code Fork organize your thoughts and ideas'
          linkUrl='/'
        />
      </section>
      <section id='features' className='hidden py-32 lg:block'>
        <div>
          {/* <h3 className='mb-12 text-center text-5xl font-semibold'>Features</h3> */}
          <div className=' justify flex justify-evenly gap-6 px-6'>
            <div className='flex h-96 w-1/3 flex-col gap-6  p-6'>
              <h5 className='text-center text-2xl font-semibold'>
                Create Documents
              </h5>
              <div className='flex justify-center'>
                <Image src='/working.png' alt='' width='200' height='200' />
              </div>
              <p className='text-left'>
                After linking your Git Hub repo, you can begin to create
                documents for various code sections. Within each document you
                can create steps and bullet points to highlight and describe
                what a section of code does.
              </p>
            </div>
            <div className='flex h-96 w-1/3 flex-col gap-6  p-6'>
              <h5 className='text-center text-2xl font-semibold'>
                Edit and Review changes
              </h5>
              <div className='flex justify-center'>
                <Image src='/searching.png' alt='' width='200' height='200' />
              </div>
              <p className='text-left'>
                With our document editor you can edit documents and commit
                changes. The doc master can then review and commit changes.
              </p>
            </div>
            <div className='flex h-96 w-1/3 flex-col gap-6  p-6'>
              <h5 className='text-center text-2xl font-semibold'>
                Collaboration
              </h5>
              <div className='flex justify-center'>
                <Image
                  src='/collaboration.png'
                  alt=''
                  width='200'
                  height='200'
                />
              </div>
              <p className='text-left'>
                Code Fork aims to make documentation a collaborative effort.
                While viewing or editing a document you can chat with others who
                are viewing/editing the same document.
              </p>
            </div>
          </div>
        </div>
        <div className='mt-32 flex flex-col gap-6'>
          <h3 className='text-center text-5xl font-bold text-slate-700'>
            Teams large and small rely on Code Fork
          </h3>
          <p className='text-center text-xl font-semibold'>
            Scale up your application with effective documenation
          </p>
          <div className='flex w-full justify-center gap-8'>
            <button className='rounded bg-slate-700 py-4 px-6 font-semibold uppercase text-white'>
              Meet Code Fork for Enterprise
            </button>
            <button className='rounded border border-slate-700 py-4 px-6 font-semibold uppercase'>
              Meet Code Fork Open Source
            </button>
          </div>
        </div>
      </section>
      <section id='' className=''>
        <div className='flex flex-col gap-12 bg-slate-900 py-16 px-4'>
          <h3 className=' text-center text-2xl font-bold text-white lg:text-5xl'>
            Welcome to the encylopedia of code
          </h3>
          <div className='flex w-full flex-col justify-center gap-8 px-8 sm:flex-row lg:px-40'>
            <button className='rounded bg-slate-50 py-4 px-6 text-lg font-semibold text-slate-900 md:w-1/2'>
              Create an account today
            </button>
            <button className='rounded border py-4 px-6 text-lg font-semibold text-white md:w-1/2'>
              Continue as a guest
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
