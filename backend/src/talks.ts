import csv from "csvtojson";

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
};

const getTedTalksData: () => Promise<TedTalk[]> = async () => {
  const result: TedTalk[] = await csv().fromFile("./data/data.csv");
  return result;
};

const TedTalksAPIService: TedTalkAPI = {
  find: async () => {
    const data = await getTedTalksData();
    return data;
  },
  count: async () => {
    const data = await getTedTalksData();
    return data.length;
  },
  search: async ({ query }) => {
    const data = await getTedTalksData();
    return data.filter(
      (tedTalk: TedTalk) =>
        tedTalk.title.includes(query) ||
        tedTalk.author.includes(query) ||
        tedTalk.date.includes(query) ||
        tedTalk.views.includes(query) ||
        tedTalk.likes.includes(query) ||
        tedTalk.link.includes(query)
    );
  },
};

export { TedTalksAPIService };
