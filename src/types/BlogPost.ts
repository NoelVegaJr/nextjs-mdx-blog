export interface IBlogPost {
  id: number;
  title: string;
  date: string;
  description: string;
  thumbnailUrl: string;
  demoUrl: string;
  email: string;
  steps: {
    id: number;
    blogPostId: number;
    title: string;
    code: string;
    index: number;
    bullets: {
      id: number;
      text: string;
      index: number;
    }[];
  }[];
  user: {
    email: string | null;
    name: string | null;
    image: string | null;
  };
}
