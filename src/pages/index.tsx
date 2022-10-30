import Image from 'next/image';
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
        className='flex h-full flex-col gap-8 bg-white px-4 sm:px-12'
      >
        <div className='flex h-full '>
          <div className='grid h-full w-1/2 place-items-center '>
            <div>
              <h1 className=' mb-6 text-5xl font-bold text-black drop-shadow-2xl'>
                A <span className='text-blue-500'>fully featured</span>{' '}
                documentation platform for your code.
              </h1>
              <p className='mb-12 text-2xl'>
                Documenting your work made open source.
              </p>
              <div className='flex gap-4'>
                <button className='rounded bg-cyan-600 py-3 px-6 text-xl font-semibold text-white saturate-150 hover:saturate-100'>
                  Get started
                </button>
                <button className='flex items-center  gap-2 rounded border py-3 px-6 text-xl font-semibold text-black hover:bg-gray-50'>
                  <Image
                    src='/GitHub-Mark-32px.png'
                    alt='GitHub logo'
                    width='20'
                    height='20'
                  />
                  GitHub
                </button>
              </div>
            </div>
          </div>
          <div className='h-full w-1/2'>
            <div className='grid h-full place-items-center'>
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
        className='flex  flex-col justify-evenly gap-16 bg-orange-50 py-20'
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
      <section id='features' className='py-32'>
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
            Code Fork allows you to scale up your application more easily with
            documenation{' '}
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
        <div className='flex flex-col gap-12 bg-slate-900 py-32'>
          <h3 className=' text-center text-5xl font-bold text-white'>
            Welcome to the encylopedia of code
          </h3>
          <div className='flex justify-center gap-8'>
            <button className='rounded bg-slate-50 py-4 px-6 font-semibold text-slate-900'>
              Create an account today
            </button>
            <button className='rounded border py-4 px-6 font-semibold text-white'>
              Continue as a guest
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
