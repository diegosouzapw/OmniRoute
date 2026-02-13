import { NextResponse } from "next/server";

export async function POST() {
  // Graceful restart: exit with code 0 so the process manager (pm2/systemd) restarts
  setTimeout(() => {
    process.exit(0);
  }, 500);

  return NextResponse.json({ status: "restarting" });
}
