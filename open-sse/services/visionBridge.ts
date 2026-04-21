export async function interceptAndExtractVision(
  body: Record<string, any>,
  targetModel: string,
  targetProvider: string
): Promise<Record<string, any>> {
  let hasImages = false;
  if (!Array.isArray(body.messages)) return body;

  for (const msg of body.messages) {
    if (Array.isArray(msg.content)) {
      if (msg.content.some((part: any) => part.type === "image_url" || part.type === "image")) {
        hasImages = true;
        break;
      }
    }
  }

  if (!hasImages) return body;

  // Target text-only models
  const isTextOnly =
    targetModel.toLowerCase().includes("deepseek") ||
    targetModel.toLowerCase().includes("qwen3-coder") ||
    targetModel.toLowerCase().includes("minimax") ||
    targetModel.toLowerCase().includes("glm");

  if (!isTextOnly) return body;

  const port = process.env.PORT || "20128";
  const internalUrl = `http://127.0.0.1:${port}/api/v1/chat/completions`;
  const internalApiKey = process.env.OMNIROUTE_API_KEY || process.env.INTERNAL_API_KEY || "";

  const mutatedBody = JSON.parse(JSON.stringify(body));

  for (const msg of mutatedBody.messages) {
    if (Array.isArray(msg.content)) {
      for (let i = 0; i < msg.content.length; i++) {
        const part = msg.content[i];
        if (part.type === "image_url" || part.type === "image") {
          const imageUrl =
            part.image_url?.url || (typeof part.image === "string" ? part.image : part.image?.url);
          if (imageUrl) {
            try {
              const visionResponse = await fetch(internalUrl, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  ...(internalApiKey ? { Authorization: `Bearer ${internalApiKey}` } : {}),
                },
                body: JSON.stringify({
                  model: "gpt-4o-mini", // Fallback vision model
                  messages: [
                    {
                      role: "user",
                      content: [
                        {
                          type: "text",
                          text: "Describe this image in detail. Be as descriptive as possible so a text-only model can understand what is in the image.",
                        },
                        { type: "image_url", image_url: { url: imageUrl } },
                      ],
                    },
                  ],
                }),
              });
              if (visionResponse.ok) {
                const data = await visionResponse.json();
                const description =
                  data.choices?.[0]?.message?.content || "Image description not available";
                msg.content[i] = {
                  type: "text",
                  text: `[Image extracted by Vision Bridge]: ${description}`,
                };
              } else {
                msg.content[i] = { type: "text", text: `[Image]: (Description extraction failed)` };
              }
            } catch (err: any) {
              msg.content[i] = {
                type: "text",
                text: `[Image]: (Extraction error: ${err.message})`,
              };
            }
          } else {
            msg.content[i] = { type: "text", text: `[Image]: (Invalid image payload)` };
          }
        }
      }

      const newContent = [];
      let currentText = "";
      for (const part of msg.content) {
        if (part.type === "text") {
          currentText += (currentText ? "\n\n" : "") + part.text;
        } else {
          if (currentText) {
            newContent.push({ type: "text", text: currentText });
            currentText = "";
          }
          newContent.push(part);
        }
      }
      if (currentText) {
        newContent.push({ type: "text", text: currentText });
      }
      if (newContent.length === 1 && newContent[0].type === "text") {
        msg.content = newContent[0].text;
      } else {
        msg.content = newContent;
      }
    }
  }

  return mutatedBody;
}
