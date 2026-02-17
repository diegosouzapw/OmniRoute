"use server";

import { NextResponse } from "next/server";
import {
  getMitmStatus,
  startMitm,
  stopMitm,
  getCachedPassword,
  setCachedPassword,
} from "@/mitm/manager";

// GET - Check MITM status
export async function GET() {
  try {
    const status = await getMitmStatus();
    return NextResponse.json({
      running: status.running,
      pid: status.pid || null,
      dnsConfigured: status.dnsConfigured || false,
      certExists: status.certExists || false,
      hasCachedPassword: !!getCachedPassword(),
    });
  } catch (error) {
    console.log("Error getting MITM status:", error.message);
    return NextResponse.json({ error: "Failed to get MITM status" }, { status: 500 });
  }
}

// POST - Start MITM proxy
export async function POST(request) {
  try {
    const { apiKey, sudoPassword } = await request.json();
    const isWin = process.platform === "win32";
    const pwd = sudoPassword || getCachedPassword() || "";

    if (!apiKey || (!isWin && !pwd)) {
      return NextResponse.json(
        { error: isWin ? "Missing apiKey" : "Missing apiKey or sudoPassword" },
        { status: 400 }
      );
    }

    const result = await startMitm(apiKey, pwd);
    if (!isWin) setCachedPassword(pwd);

    return NextResponse.json({
      success: true,
      running: result.running,
      pid: result.pid,
    });
  } catch (error) {
    console.log("Error starting MITM:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to start MITM proxy" },
      { status: 500 }
    );
  }
}

// DELETE - Stop MITM proxy
export async function DELETE(request) {
  try {
    const { sudoPassword } = await request.json();
    const isWin = process.platform === "win32";
    const pwd = sudoPassword || getCachedPassword() || "";

    if (!isWin && !pwd) {
      return NextResponse.json({ error: "Missing sudoPassword" }, { status: 400 });
    }

    await stopMitm(pwd);
    if (!isWin && sudoPassword) setCachedPassword(sudoPassword);

    return NextResponse.json({ success: true, running: false });
  } catch (error) {
    console.log("Error stopping MITM:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to stop MITM proxy" },
      { status: 500 }
    );
  }
}
