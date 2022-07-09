export type Post = {
  id: string;
  title: string;
  content?: string;
  body?: string;
  authorId: string;
};

export type User = {
  userId: string;
  email: string;
  name?: string;
  Posts: Post[];
};
