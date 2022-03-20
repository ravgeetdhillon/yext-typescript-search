type TedTalk = {
  title: string;
  author: string;
  date: string;
  views: string;
  likes: string;
  link: string;
};

type TedTalkAPI = {
  find: () => Promise<TedTalk[]>;
  count: () => Promise<number>;
  search: ({ query }: { query: string }) => Promise<TedTalk[]>;
  autocomplete: ({ query }: { query: string }) => Promise<string[]>;
};

export { TedTalk, TedTalkAPI };
