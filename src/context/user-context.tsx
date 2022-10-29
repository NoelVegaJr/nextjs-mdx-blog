import { useSession } from 'next-auth/react';
import * as React from 'react';
import { createContext, useEffect } from 'react';

interface IUserProviderProps {
  children: JSX.Element | JSX.Element[];
}

interface User {
  email: string;
  image: string;
}

export const UserContext = createContext({ email: '', image: '' } as User);
const UserProvider: React.FunctionComponent<IUserProviderProps> = ({
  children,
}) => {
  const { data: session } = useSession();
  console.log('session: ', session);

  return (
    <UserContext.Provider
      value={{
        email: session?.user?.email ?? '',
        image: session?.user?.image ?? '',
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
