import { NextResponse } from "next/server";

export function methodNotAllowed(allowedMethods: readonly string[]) {
  return NextResponse.json(
    { error: "Method Not Allowed" },
    {
      status: 405,
      headers: {
        Allow: allowedMethods.join(", "),
      },
    }
  );
}
