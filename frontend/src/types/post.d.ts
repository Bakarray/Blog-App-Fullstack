interface IPost {
  author: string;
  title: string;
  createdAt: string;
  updatedAt?: string;
  content: string;
  tags: string[];
  readTimeMinutes: number;
}
