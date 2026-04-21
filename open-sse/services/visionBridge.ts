import { getResolvedModelCapabilities } from "@/lib/modelCapabilities";

const DEFAULT_VISION_BRIDGE_MODEL = process.env.OMNIROUTE_VISION_BRIDGE_MODEL || "gpt-4o-mini";

function hasImageContent(body: Record<string, any>): boolean {
  if (!Array.isArray(body.messages)) return false;

  return body.messages.some((msg: any) =>
    Array.isArray(msg.content)
      ? msg.content.some((part: any) => part?.type === "image_url" || part?.type === "image")
      : false
  );
}

function shouldUseLegacyTextOnlyHeuristic(targetModel: string, targetProvider: string): boolean {
  const lookup = `${targetProvider || ""}/${targetModel || ""}`.toLowerCase();
  return (
    lookup.includes("deepseek") ||
    lookup.includes("qwen3-coder") ||
    lookup.includes("minimax") ||
    lookup.includes("glm")
  );
}

export function shouldApplyVisionBridge(
  body: Record<string, any>,
  targetModel: string,
  targetProvider: string
): boolean {
  if (!hasImageContent(body)) return false;

  const capabilities = getResolvedModelCapabilities({
    provider: targetProvider || null,
    model: targetModel || null,
  });

  if (capabilities.supportsVision === true) return false;
  if (capabilities.supportsVision === false) return true;

  return shouldUseLegacyTextOnlyHeuristic(targetModel, targetProvider);
}

function collapseMessageTextContent(messages: Array<Record<string, any>>): void {
  for (const msg of messages) {
    if (!Array.isArray(msg.content)) continue;

    const newContent = [];
    let currentText = "";
    for (const part of msg.content) {
      if (part?.type === "text" && typeof part.text === "string") {
        currentText += (currentText ? "\n\n" : "") + part.text;
        continue;
      }
      if (currentText) {
        newContent.push({ type: "text", text: currentText });
        currentText = "";
      }
      newContent.push(part);
    }
    if (currentText) {
      newContent.push({ type: "text", text: currentText });
    }

    if (newContent.length === 1 && newContent[0]?.type === "text") {
      msg.content = newContent[0].text;
    } else {
      msg.content = newContent;
    }
  }
}

export async function interceptAndExtractVision(
  body: Record<string, any>,
  targetModel: string,
  targetProvider: string
): Promise<Record<string, any>> {
  if (!shouldApplyVisionBridge(body, targetModel, targetProvider)) return body;

  const port = process.env.PORT || "20128";
  const internalUrl = `http://127.0.0.1:${port}/api/v1/chat/completions`;
  const internalApiKey = process.env.OMNIROUTE_API_KEY || process.env.INTERNAL_API_KEY || "";

  const mutatedBody = JSON.parse(JSON.stringify(body));
  let imageCounter = 0;

  try {
    for (const msg of mutatedBody.messages) {
      if (!Array.isArray(msg.content)) continue;
      for (let i = 0; i < msg.content.length; i++) {
        const part = msg.content[i];
        if (part?.type !== "image_url" && part?.type !== "image") continue;

        const imageUrl =
          part.image_url?.url || (typeof part.image === "string" ? part.image : part.image?.url);
        if (!imageUrl) {
          return body;
        }

        const visionResponse = await fetch(internalUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(internalApiKey ? { Authorization: `Bearer ${internalApiKey}` } : {}),
          },
          body: JSON.stringify({
            model: DEFAULT_VISION_BRIDGE_MODEL,
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: "Describe this image in detail so a text-only model can understand it.",
                  },
                  { type: "image_url", image_url: { url: imageUrl } },
                ],
              },
            ],
          }),
        });

        if (!visionResponse.ok) {
          return body;
        }

        const data = await visionResponse.json();
        const description = data?.choices?.[0]?.message?.content;
        if (typeof description !== "string" || !description.trim()) {
          return body;
        }

        imageCounter += 1;
        msg.content[i] = {
          type: "text",
          text: `[Image ${imageCounter}]: ${description.trim()}`,
        };
      }
    }

    collapseMessageTextContent(mutatedBody.messages);
    return mutatedBody;
  } catch {
    return body;
  }
}
