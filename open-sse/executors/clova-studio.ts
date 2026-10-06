import { DefaultExecutor } from "./default.ts";

/** CLOVA Chat Completions v3 places the selected model in the URL path. */
export class ClovaStudioExecutor extends DefaultExecutor {
  constructor() {
    super("clova-studio");
  }

  buildUrl(model: string): string {
    return `${this.config.baseUrl}/${encodeURIComponent(model)}`;
  }
}
