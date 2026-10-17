import type { ImageProviderConfig } from "../../../imageRegistryTypes.ts";

export const ANTIGRAVITY_IMAGE_PROVIDER: ImageProviderConfig = {
  id: "antigravity",
  baseUrl: "https://daily-cloudcode-pa.googleapis.com/v1internal:generateContent",
  authType: "oauth",
  authHeader: "bearer",
  format: "gemini-image",
  models: [
    { id: "gemini-3.1-flash-image", name: "Gemini 3.1 Flash Image", inputModalities: ["text", "image"] },
    // Registration enables exact route admission, not OAuth account entitlement.
    { id: "gemini-3-pro-image", name: "Gemini 3 Pro Image", inputModalities: ["text", "image"] },
  ],
  supportedSizes: ["1024x1024"],
};
