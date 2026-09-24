/**
 * GET /api/auth/sso/config
 *
 * Public, non-secret Entra discovery so a CLI sign-in helper needs only the
 * OmniRoute base URL. Everything returned is already public — tenant id, public
 * client id and audience all appear in the authorization URL the user's browser
 * visits. The Graph client secret is never included.
 */

import { NextResponse } from "next/server";
import { entraIssuer, getEntraConfig } from "@/server/authz/entra/config";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const config = await getEntraConfig();

    if (!config.enabled) {
      return NextResponse.json({ enabled: false }, { status: 200 });
    }

    return NextResponse.json({
      enabled: true,
      authorityHost: config.authorityHost,
      tenantId: config.tenantId,
      clientId: config.clientId,
      audience: config.audience,
      issuer: entraIssuer(config.tenantId, config.authorityHost),
      scope: `${config.audience}/.default`,
    });
  } catch {
    return NextResponse.json({ enabled: false }, { status: 200 });
  }
}
