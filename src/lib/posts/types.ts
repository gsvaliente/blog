export type PostData = {
  title: string;
  date: string;
  tags: string[];
  description: string;
};

export type Post = PostData & {
  slug: string;
  content: string;
  readingTime: number;
};

export type SearchablePost = {
  slug: string;
  title: string;
  description: string;
  content?: string;
  tags: string[];
};