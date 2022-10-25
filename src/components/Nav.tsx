import Link from 'next/link';

interface INavProps {}

const Nav: React.FC<INavProps> = (props) => {
  const baseLinkStyles = 'cursor-pointer underline-none';
  const linkStyles = 'text-xl';
  const logoStyles = `${baseLinkStyles}text-3xl`;

  return (
    <nav className=' border-b border-b-gray-400 p-6 flex items-center '>
      <Link href='/'>
        <h2 className={`${logoStyles}  mr-12 text-3xl font-bold`}>Noel Vega</h2>
      </Link>
      <Link href='/bio'>
        <p className={`${baseLinkStyles} ${linkStyles}`}>Bio</p>
      </Link>
    </nav>
  );
};

export default Nav;
