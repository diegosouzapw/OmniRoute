import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
// extractGeminiAuthZip is a generic, content-agnostic .json-from-ZIP extractor
// (path-traversal + size guards); reused as-is for agy token-file archives.
import { extractGeminiAuthZip } from "@/lib/oauth/utils/geminiAuthZipExtract";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const ZIP_BODY_LIMIT = 11 * 1024 * 1024; // 11 MB — slightly above the 10 MB extracted limit

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > ZIP_BODY_LIMIT) {
    return NextResponse.json(
      { error: "ZIP file exceeds the 10 MB size limit", code: "file_too_large" },
      { status: 413 }
    );
  }

  let buffer: Buffer;
  try {
    const arrayBuffer = await request.arrayBuffer();
    if (arrayBuffer.byteLength > ZIP_BODY_LIMIT) {
      return NextResponse.json(
        { error: "ZIP file exceeds the 10 MB size limit", code: "file_too_large" },
        { status: 413 }
      );
    }
    buffer = Buffer.from(arrayBuffer);
  } catch {
    return NextResponse.json({ error: "Failed to read request body" }, { status: 400 });
  }

  try {
    const files = extractGeminiAuthZip(buffer);

    const entries = files.map((f) => {
      try {
        return { name: f.name, json: JSON.parse(f.content), parseError: null };
      } catch {
        return { name: f.name, json: null, parseError: "Not valid JSON" };
      }
    });

    return NextResponse.json({ entries });
  } catch (error) {
    return NextResponse.json(
      { error: sanitizeErrorMessage(error) || "Failed to extract ZIP", code: "extract_failed" },
      { status: 400 }
    );
  }
}
