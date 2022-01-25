import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Extend dayjs with relative time plugin
dayjs.extend(relativeTime);

export class NewsModel {
  id: string;
  author: string;
  story_title: string;
  story_url: string;
  created_at: string;
  date: Dayjs;

  constructor({
    author,
    story_title,
    story_url,
    created_at,
    story_id,
    objectID,
  }: any) {
    this.id = `${story_id} ${objectID}`;
    this.author = author;
    this.story_title = story_title;
    this.story_url = story_url;
    // Handle datetime to string
    // 4 hours ago by author
    this.date = dayjs(created_at);
    this.created_at = dayjs(created_at).fromNow();
  }
}
