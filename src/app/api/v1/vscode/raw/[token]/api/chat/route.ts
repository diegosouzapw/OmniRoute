import { POST as basePost, OPTIONS } from "@/app/api/v1/api/chat/route";
import { withSanitizedPathTokenApiKey } from "@/app/api/v1/vscode/raw/[token]/tokenizedRequest";

export { OPTIONS };

export async function POST(request: Request) {
  return basePost(await withSanitizedPathTokenApiKey(request));
}
