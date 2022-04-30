import csv from "csvtojson";
import {
  provideCore,
  AutocompleteResponse,
  Result,
  AutocompleteResult,
  VerticalSearchResponse,
} from "@yext/answers-core";
import "dotenv/config";
import type { TedTalk, TedTalkAPI } from "./types";

const { YEXT_API_KEY } = process.env;

const core = provideCore({
  apiKey: YEXT_API_KEY as string,
  experienceKey: "ted-talks",
  locale: "en",
  experienceVersion: "PRODUCTION",
});

const getTedTalksData: () => Promise<TedTalk[]> = async () => {
  const result: TedTalk[] = await csv().fromFile("./data/data.csv");
  return result;
};

const TedTalksAPIService: TedTalkAPI = {
  find: async () => {
    const data: TedTalk[] = await getTedTalksData();
    return data;
  },

  count: async () => {
    const data: TedTalk[] = await getTedTalksData();
    return data.length;
  },

  search: async ({ query }) => {
    const yextResponse: VerticalSearchResponse = await core.verticalSearch({
      verticalKey: "ted_talks",
      query: query,
    });

    const searchResults: TedTalk[] =
      yextResponse.verticalResults.results.flatMap(
        (result: Result) =>
          ({
            title: result.rawData.name,
            author: result.rawData.c_author,
            date: result.rawData.c_postedOn,
            views: result.rawData.c_views,
            likes: result.rawData.c_likes,
            link: result.rawData.c_link,
          } as TedTalk)
      );

    return searchResults;
  },

  autocomplete: async ({ query }) => {
    const yextResponse: AutocompleteResponse = await core.verticalAutocomplete({
      verticalKey: "ted_talks",
      input: query,
    });

    const autocompleteResults: string[] = yextResponse.results.flatMap(
      (result: AutocompleteResult) => result.value
    );

    return autocompleteResults;
  },
};

export { TedTalksAPIService };
