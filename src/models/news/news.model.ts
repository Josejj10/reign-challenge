import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Extend dayjs with relative time plugin
dayjs.extend(relativeTime);

export class NewsModel {
  id: number;
  author: string;
  story_title: string;
  story_url: string;
  created_at: string;

  constructor({ author, story_title, story_url, created_at, objectID }: any) {
    this.id = objectID;
    this.author = author;
    this.story_title = story_title;
    this.story_url = story_url;
    // Handle datetime to string
    // 4 hours ago by author
    this.created_at = dayjs(created_at).fromNow();
  }
}
