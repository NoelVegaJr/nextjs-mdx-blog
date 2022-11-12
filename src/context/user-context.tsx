import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { createContext, useEffect, useState } from 'react';

interface IUserProviderProps {
  children: JSX.Element | JSX.Element[];
}

// interface User {
//   email: string;
//   image: string;
//   username: string;
// }

export const UserSessionContext = createContext<Session | null>(null);

const UserProvider: React.FunctionComponent<IUserProviderProps> = ({
  children,
}) => {
  const { data: session } = useSession();
  const [userSession, setUserSession] = useState<Session | null>(session);
  useEffect(() => {
    if (session) {
      setUserSession(session);
    }
  }, [session]);
  return (
    <UserSessionContext.Provider value={userSession?.user}>
      {children}
    </UserSessionContext.Provider>
  );
};

export default UserProvider;
