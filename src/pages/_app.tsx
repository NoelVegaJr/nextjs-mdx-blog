import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Nav from '../components/Nav';
import { Layout } from '../components/Layout';
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import { SessionProvider } from 'next-auth/react';

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}: any) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
