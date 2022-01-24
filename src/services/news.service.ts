import { waitFor } from "@testing-library/react";
import { EDropdownOptions } from "../constants/dropdown.constants";
import { NewsModel } from "../models";
import { https } from "../utils/https";
import { StorageService } from "./storage.service";

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

  static saveFilters = (filters: { query: string; page: number }) => {
    // Save query and page as JSON object
    // This allows for more filters to be saved in case it's needed
    StorageService.set("filters", JSON.stringify(filters));
  };

  static getFilters = async (): Promise<{
    query: string;
    page: number;
  }> => {
    const rawFilters = await StorageService.get("filters");
    if (rawFilters) {
      return Promise.resolve({ ...JSON.parse(rawFilters) });
    }
    // else, return default values
    return Promise.resolve({ query: EDropdownOptions.ANGULAR, page: 0 });
  };

  static toggleFavorite = async (favorite: NewsModel) => {
    const rawFavorites = await StorageService.get("favorites");
    if (rawFavorites) {
      const favoritesObject: { [id: string]: NewsModel } = {
        ...JSON.parse(rawFavorites),
      };

      // Check if not already in favorites
      if (!favoritesObject[favorite.id]) {
        // Add to favorites
        favoritesObject[favorite.id] = favorite;
      } else {
        // Remove from favorites
        delete favoritesObject[favorite.id];
      }
      StorageService.set("favorites", JSON.stringify(favoritesObject));
    } else {
      // First time adding a favorite
      const favoritesObject: { [id: string]: NewsModel } = {
        [favorite.id]: favorite,
      };
      StorageService.set("favorites", JSON.stringify(favoritesObject));
    }
  };

  static getFavorites = async (): Promise<{
    [id: string]: NewsModel;
  }> => {
    const rawFavorites = await StorageService.get("favorites");
    if (rawFavorites) {
      return Promise.resolve({ ...JSON.parse(rawFavorites) });
    }
    // else, return default value
    return Promise.resolve({});
  };
}
