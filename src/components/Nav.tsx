import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

interface INavProps {}

const Nav: React.FC<INavProps> = (props) => {
  const baseLinkStyles = 'cursor-pointer underline-none';
  const linkStyles = 'text-xl';
  const logoStyles = `${baseLinkStyles}text-3xl`;
  const { data: session } = useSession();
  console.log(session);
  return (
    <nav className=' flex h-20 w-full items-center justify-between border-b border-b-gray-400 bg-white p-8'>
      <div className='flex items-center'>
        <Link href='/'>
          <a className={`${logoStyles}  mr-12 text-3xl font-bold`}>Code Fork</a>
        </Link>
        <Link href='/bio'>
          <a className={`${baseLinkStyles} ${linkStyles}`}>Bio</a>
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
