// import * as React from 'react';
// import Tree from '../utils/Tree';
import { INSPECT_MAX_BYTES } from 'buffer';
import { RepoFile, RepoItem, RepoItemType } from '../classes/RepoTree';
import { RepoDir } from '../classes/RepoTree';
import { trpc } from '../utils/trpc';
interface ITestProps {}

const Test: React.FunctionComponent<ITestProps> = (props) => {
  // const tree = new Tree('root');
  // const pre = tree.createChildNode('pre');
  // tree
  //   .createChildNode('one')
  //   .createChildNode('one-1')
  //   .createChildNode('one-deeper')
  //   .parentNode.createChildNode('another node');

  // tree.createChildNode('two');
  // // tree.removeChildNode('pre');
  // pre.parentNode = tree.getChildNode('two');
  // // pre.appendChildNode(tree);
  // // tree.getChildNode('two').appendChildNode(pre);
  // tree.print();
  // console.log(pre);

  // console.log('has pre: ', tree.hasChildNode('pre'));
  // // console.log(
  // //   'has anothernode: ',
  // //   tree.getChildNode('one').getChildNode('one-1').hasChildNode('another node')
  // // );

  // const repoContent = trpc.getRepoContent.useQuery({
  //   username: 'NoelVegaJr',
  //   name: 'nextjs-mdx-blog',
  // });

  // const repoFile = new RepoFile(
  //   'https://api.github.com/repos/NoelVegaJr/nextjs-mdx-blog/contents/src/pages/index.tsx'
  // );

  const repoDir = new RepoDir(
    'https://api.github.com/repos/NoelVegaJr/nextjs-mdx-blog/contents/src/components'
  );

  repoDir.getContent().then((items) => {
    items.forEach((item: any) => {
      if (item.type === 'file') {
        const file = new RepoFile(item.url.split('?')[0]);
        repoDir.appendItem(file);
      } else if (item.type === 'dir') {
        const dir = new RepoDir(item.url.split('?')[0]);
        repoDir.appendItem(dir);
      }
    });
    console.log(repoDir.items);
  });

  return <div></div>;
};

export default Test;
