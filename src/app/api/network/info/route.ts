import os from "os";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { getRuntimePorts } from "@/lib/runtime/ports";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { apiPort } = getRuntimePorts();
  const interfaces = os.networkInterfaces();
  const lanUrls: string[] = [];
  let tailscaleIpUrl: string | null = null;

  for (const [ifaceName, addrs] of Object.entries(interfaces)) {
    for (const addr of addrs ?? []) {
      if (addr.family !== "IPv4" || addr.internal) continue;
      const isTailscale =
        ifaceName.toLowerCase().startsWith("tailscale") || addr.address.startsWith("100.");
      if (isTailscale) {
        tailscaleIpUrl = `http://${addr.address}:${apiPort}/v1`;
      } else {
        lanUrls.push(`http://${addr.address}:${apiPort}/v1`);
      }
    }
  }

  return NextResponse.json({ lanUrls, tailscaleIpUrl });
}
