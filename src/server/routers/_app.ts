import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { PrismaClient } from '@prisma/client';
import pusher from '../../utils/pusher';
import Input from '../../components/Input';

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
      console.log(input);
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
        console.log(error);
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

      console.log(blogPost);
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
      console.log(input);
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
      console.log(input);
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

      console.log('STEPS: ', steps);
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
      console.log(input);
      const response = await pusher.trigger(input.blogPostId, 'new-message', {
        message: input.msg,
        username: input.username,
        date: input.date,
        avatar: input.avatar,
      });

      return response;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
