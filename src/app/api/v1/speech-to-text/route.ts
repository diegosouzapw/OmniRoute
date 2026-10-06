import {
  elevenLabsOptionsResponse,
  proxyElevenLabsRequest,
} from "@/app/api/v1/_shared/elevenLabsProxy";

export async function OPTIONS() {
  return elevenLabsOptionsResponse();
}

export async function POST(request: Request) {
  return proxyElevenLabsRequest(request, "/speech-to-text", {
    method: "POST",
    body: request.body,
    duplex: "half",
  });
}
