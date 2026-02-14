import { NextResponse } from "next/server";
import {
  configureIPFilter,
  getIPFilterConfig,
  addToBlacklist,
  removeFromBlacklist,
  addToWhitelist,
  removeFromWhitelist,
  tempBanIP,
  removeTempBan,
} from "@omniroute/open-sse/services/ipFilter.js";

export async function GET() {
  try {
    return NextResponse.json(getIPFilterConfig());
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();

    // Configure entire filter
    if (body.enabled !== undefined || body.mode || body.blacklist || body.whitelist) {
      configureIPFilter(body);
    }

    // Add/remove individual IPs
    if (body.addBlacklist) addToBlacklist(body.addBlacklist);
    if (body.removeBlacklist) removeFromBlacklist(body.removeBlacklist);
    if (body.addWhitelist) addToWhitelist(body.addWhitelist);
    if (body.removeWhitelist) removeFromWhitelist(body.removeWhitelist);

    // Temp bans
    if (body.tempBan) {
      tempBanIP(body.tempBan.ip, body.tempBan.durationMs || 3600000, body.tempBan.reason || "Manual ban");
    }
    if (body.removeBan) removeTempBan(body.removeBan);

    return NextResponse.json(getIPFilterConfig());
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
