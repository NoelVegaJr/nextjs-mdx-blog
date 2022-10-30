import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AnchorLink from 'react-anchor-link-smooth-scroll';

interface INavProps {}

const Nav: React.FC<INavProps> = (props) => {
  const router = useRouter();
  const baseLinkStyles = 'cursor-pointer underline-none';
  const linkStyles = 'text-xl';
  const logoStyles = `${baseLinkStyles}text-3xl`;
  const { data: session } = useSession();
  console.log(router);
  console.log(session);
  return (
    <nav className=' fixed z-50 flex h-20 w-full items-center justify-between border-b border-b-gray-400 bg-slate-800 p-8 text-white'>
      <div className='flex items-center'>
        {router.pathname === '/' ? (
          <AnchorLink
            href='#landing'
            className={`${logoStyles}  mr-12 text-3xl font-semibold`}
            offset='150'
          >
            Code Fork
          </AnchorLink>
        ) : (
          <Link href='/'>
            <a
              href='#'
              className={`${logoStyles}  mr-12 text-3xl font-semibold`}
            >
              Code Fork
            </a>
          </Link>
        )}

        <AnchorLink
          href='#product'
          className={`${logoStyles}  mr-12 text-lg font-semibold`}
          offset='75'
        >
          Product
        </AnchorLink>
        <AnchorLink
          href='#features'
          className={`${logoStyles}  mr-12 text-lg font-semibold`}
          offset='10'
        >
          Features
        </AnchorLink>
        {/* <Link href='/'>
          <a className={`${logoStyles}  mr-12 text-lg font-semibold`}>
            Company
          </a>
        </Link> */}
        <Link href='/posts'>
          <a href='#' className={`${logoStyles}  mr-12 text-lg font-semibold`}>
            Demo
          </a>
        </Link>
      </div>
      <div className='flex items-center gap-4 text-xl'>
        {!session ? (
          <button onClick={() => signIn('google')}>Login</button>
        ) : (
          <>
            <button onClick={() => signOut()}>Logout</button>
            <Link href='/admin'>
              <a className={`${baseLinkStyles} ${linkStyles}`}>Admin</a>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
