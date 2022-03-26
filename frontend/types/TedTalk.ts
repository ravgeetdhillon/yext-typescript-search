type TedTalk = {
  title: string;
  author: string;
  date: string;
  views: string;
  likes: string;
  link: string;
};

type TedTalkAPI = {
  search: ({ query }: { query: string }) => Promise<TedTalk[]>;
  autocomplete: ({ query }: { query: string }) => Promise<string[]>;
};

export type { TedTalk, TedTalkAPI };
