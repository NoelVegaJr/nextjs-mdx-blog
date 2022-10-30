import '../../styles/globals.css';

import { Layout } from '../components/Layout';
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import { SessionProvider } from 'next-auth/react';
import UserProvider from '../context/user-context';

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}: any) => {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
