import { NextResponse } from "next/server";
import {
  OutboundUrlGuardError,
  getProviderValidationGuard,
  parseAndValidateNonMetadataUrl,
  parseAndValidatePublicUrl,
  parseOutboundUrl,
} from "@/shared/network/outboundUrlGuard";

function guardProviderNodeBaseUrl(baseUrl: string): void {
  const guard = getProviderValidationGuard();
  if (guard === "none") {
    parseOutboundUrl(baseUrl);
    return;
  }
  if (guard === "block-metadata") {
    parseAndValidateNonMetadataUrl(baseUrl);
    return;
  }
  parseAndValidatePublicUrl(baseUrl);
}

export function validateProviderNodeBaseUrl(baseUrl: string): NextResponse | null {
  try {
    guardProviderNodeBaseUrl(baseUrl);
    return null;
  } catch (error) {
    const message =
      error instanceof OutboundUrlGuardError
        ? error.code === "OUTBOUND_URL_INVALID"
          ? "Invalid provider base URL format"
          : error.message
        : "Invalid provider base URL";
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "baseUrl", message }],
        },
      },
      { status: 400 }
    );
  }
}
