// This API route is called automatically to initialize sync
export async function GET() {
  return new Response("Initialized", { status: 200 });
}
