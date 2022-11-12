import '../../styles/globals.css';

import { Layout } from '../components/Layout';
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import { SessionProvider } from 'next-auth/react';
import UserProvider from '../context/user-context';
import { TabsProvider } from '../context/tabs-context';

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}: any) => {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <TabsProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </TabsProvider>
      </UserProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
