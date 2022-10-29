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
    </>
  );
};

export default Home;
