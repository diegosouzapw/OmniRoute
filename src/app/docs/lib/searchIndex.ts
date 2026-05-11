import { autoSearchIndex } from "./docs-auto-generated";

export interface SearchItem {
  slug: string;
  title: string;
  fileName: string;
  section: string;
  content: string;
  headings: string[];
}

export const SEARCH_INDEX: SearchItem[] = autoSearchIndex as SearchItem[];
