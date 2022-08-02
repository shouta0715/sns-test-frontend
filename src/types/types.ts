export type Post = {
  id: string;
  title: string;
  content?: string;
  body?: string;
  authorId: string;
};

export type Profile = { id: string; img: string };

export type User = {
  userId: string;
  email: string;
  password: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
  Posts: Post[];
  Profile: Profile;
};
