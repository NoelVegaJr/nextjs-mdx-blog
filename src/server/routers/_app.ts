import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { PrismaClient } from '@prisma/client';
import pusher from '../../utils/pusher';
import Input from '../../components/Input';
import { formatBase64 } from '../../utils/formatBase64';
import { cleanGitHubUrl } from '../../utils/CleanGitHubApiUrl';
import Repo from '../../utils/Tree';
import { RepoDir, RepoFile } from '../../classes/RepoTree';

const prisma: PrismaClient = new PrismaClient();

export const appRouter = router({
  createBlogPost: publicProcedure
    .input(
      z.object({
        title: z.string(),
        date: z.string(),
        description: z.string(),
        thumbnailUrl: z.string(),
        demoUrl: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.blogPost.create({
        data: input,
      });
      return {
        title: input.title,
      };
    }),
  getBlogPosts: publicProcedure.query(async () => {
    const blogPosts = await prisma.blogPost.findMany();
    return blogPosts;
  }),
  getBlogPostsByUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: input.email,
          },
          select: {
            blogPosts: {
              include: {
                steps: {
                  include: {
                    bullets: true,
                  },
                },
                user: true,
              },
            },
          },
        });

        return user?.blogPosts ?? [];
      } catch (error) {
        return [];
      }
    }),
  getBlogPostsById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const blogPost = await prisma.blogPost.findUnique({
        where: {
          id: input.id,
        },
        include: {
          steps: {
            include: {
              bullets: true,
            },
          },
          user: true,
        },
      });

      return blogPost;
    }),
  createBlogPostStep: publicProcedure
    .input(
      z.object({
        blogPostId: z.number(),
        title: z.string(),
        bullets: z.string().array(),
        code: z.string(),
        index: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.blogPostStep.create({
        data: {
          blogPostId: input.blogPostId,
          title: input.title,
          code: input.code,
          index: input.index,
        },
      });
    }),
  editBlogPostStep: publicProcedure
    .input(
      z.object({
        blogPostId: z.number(),
        id: z.number(),
        title: z.string(),
        bullets: z.string().array(),
        code: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.blogPostStep.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          code: input.code,
        },
      });
    }),
  getStepsByBlogPostId: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const steps = await prisma.blogPostStep.findMany({
        where: {
          blogPostId: input.id,
        },
      });

      return steps;
    }),
  pusherMsg: publicProcedure
    .input(
      z.object({
        msg: z.string(),
        blogPostId: z.string(),
        username: z.string(),
        date: z.string(),
        avatar: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const response = await pusher.trigger(input.blogPostId, 'new-message', {
        message: input.msg,
        username: input.username,
        date: input.date,
        avatar: input.avatar,
      });

      return response;
    }),
  getFileContent: publicProcedure
    .input(
      z.object({
        url: z.string(),
      })
    )
    .query(async ({ input }) => {
      // const { username, repo, path } = input;
      const { url } = input;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
        },
      });
      const data = await response.json();

      const file = { base64: data.content, size: data.size };
      return file;
    }),
  getUserRepos: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const { username } = input;
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
          },
        }
      );
      const repos = await response.json();

      return repos.map((repo: any) => {
        return { id: repo.id, name: repo.name, url: repo.url };
      });
    }),
  getRepo: publicProcedure
    .input(z.object({ url: z.string() }))
    .query(async ({ input }) => {
      const tree = {};
      const { url } = input;
      const queue = [url] as any;
      console.log(url);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
        },
      });

      return response.json();
    }),
  getRepoTree: publicProcedure
    .input(z.object({ url: z.string() }))
    .query(async ({ input }) => {
      const { url } = input;
      console.log('root url:', url);
      const root = new RepoDir(url);
      console.log('root:', root);
      let queue: Array<{ id: string; item: RepoDir }> = [];
      queue.push({ id: root.identifier, item: root });

      console.log('Entering queue');
      while (queue.length) {
        for (let repoDir of queue) {
          console.log(repoDir.item.url);
          const dirItems = await repoDir.item.getContent();

          dirItems.forEach((item: any) => {
            if (item.type === 'dir') {
              const newRepoDir = new RepoDir(item.url.split('?')[0]);
              repoDir.item.appendItem(newRepoDir);
              queue.push({ id: newRepoDir.identifier, item: newRepoDir });
            } else if (item.type === 'file') {
              const newRepoFile = new RepoFile(item.url.split('?')[0]);
              repoDir.item.appendItem(newRepoFile);
            }
          });
          queue = queue.filter((item) => item.id !== repoDir.id);
        }
      }
      // console.log('exiting queue');
      // console.log(root.items);
      return root;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
