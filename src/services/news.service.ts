import { NewsModel } from "../models";
import { https } from "../utils/https";

export class NewsService {
  // Using the HackerNews API
  // https://hn.algolia.com/api

  static getNews = async ({
    query,
    page,
  }: {
    query: string;
    page: number;
  }): Promise<NewsModel[]> => {
    const params = new URLSearchParams();
    params.append("query", query);
    params.append("page", page.toString());
    // To only get 8 news per page
    params.append("hitsPerPage", "8");

    const rawNews = (await https.get("/search_by_date", { params })) as any;

    const newsList = rawNews.hits.map((news: any) => new NewsModel(news));

    return Promise.resolve(newsList);
  };
}
