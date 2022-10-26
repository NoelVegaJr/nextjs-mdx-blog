import { useRouter } from 'next/router';
import * as React from 'react';

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  const router = useRouter();
  const { slug } = router.query;
  return <div></div>;
};

export default App;
