import { NextResponse } from "next/server";
import { getSettings } from "@/lib/db/settings";

export const dynamic = "force-dynamic";

const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/x-icon",
  "image/svg+xml",
  "image/gif",
  "image/webp",
  "image/jpeg",
];
const MAX_FAVICON_SIZE = 50 * 1024; // 50KB
const FETCH_TIMEOUT = 5000; // 5 seconds
const CACHE_DURATION = 300; // 5 minutes

function isAllowedUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    // Only allow https (or http for local development)
    if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
      return false;
    }
    // Block private/internal IPs
    const hostname = parsedUrl.hostname;
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "0.0.0.0" ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      hostname.startsWith("172.") ||
      hostname.endsWith(".local") ||
      hostname === "localhost"
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

function validateImageData(base64Data: string, contentType: string): boolean {
  if (!ALLOWED_IMAGE_TYPES.includes(contentType)) {
    console.error("Invalid content type:", contentType);
    return false;
  }
  // Check for obvious image magic bytes
  const matches = base64Data.match(/^data:[^;]+;base64,(.+)$/);
  if (!matches) return false;

  const binaryData = Buffer.from(matches[1], "base64");
  if (binaryData.length > MAX_FAVICON_SIZE) {
    console.error("Favicon too large:", binaryData.length);
    return false;
  }

  return true;
}

export async function GET() {
  try {
    const settings = await getSettings();

    const customFaviconBase64 = settings?.customFaviconBase64 as string | undefined;
    const customFaviconUrl = settings?.customFaviconUrl as string | undefined;

    let faviconData: string | null = null;

    if (customFaviconBase64) {
      // Validate stored Base64 data
      const match = customFaviconBase64.match(/^data:([^;]+);base64,(.+)$/);
      if (match && validateImageData(customFaviconBase64, match[1])) {
        faviconData = customFaviconBase64;
      }
    } else if (customFaviconUrl) {
      // Validate URL before fetching (SSRF protection)
      if (!isAllowedUrl(customFaviconUrl)) {
        console.error("Blocked invalid favicon URL:", customFaviconUrl);
      } else {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

          const response = await fetch(customFaviconUrl, {
            signal: controller.signal,
            headers: {
              "User-Agent": "OmniRoute/2.0",
            },
          });
          clearTimeout(timeoutId);

          if (response.ok) {
            const contentType = response.headers.get("content-type") || "";
            const arrayBuffer = await response.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);

            // Validate size before processing
            if (uint8Array.length > MAX_FAVICON_SIZE) {
              console.error("Favicon exceeds max size:", uint8Array.length);
            } else {
              const base64 = Buffer.from(uint8Array).toString("base64");
              const fullData = `data:${contentType};base64,${base64}`;

              if (validateImageData(fullData, contentType)) {
                faviconData = fullData;
              }
            }
          }
        } catch (error) {
          console.error("Failed to fetch custom favicon:", error);
        }
      }
    }

    if (!faviconData) {
      return NextResponse.redirect("/favicon.svg");
    }

    const match = faviconData.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      return NextResponse.redirect("/favicon.svg");
    }

    const contentType = match[1];
    const base64Data = match[2];
    const buffer = Buffer.from(base64Data, "base64");

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": `public, max-age=${CACHE_DURATION}`,
      },
    });
  } catch (error) {
    console.error("Favicon API error:", error);
    return NextResponse.redirect("/favicon.svg");
  }
}
