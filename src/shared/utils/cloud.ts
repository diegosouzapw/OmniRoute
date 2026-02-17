import { getMachineId } from "@/shared/utils/machine";

// Function to get cloud URL with machine ID
export function getCloudUrl(machineId) {
  // Get from environment or default to localhost:8787
  const cloudUrl = process.env.NEXT_PUBLIC_CLOUD_URL || "http://localhost:8787";
  return `${cloudUrl}/${machineId}/v1/chat/completions`;
}

// Function to call cloud with machine ID
export async function callCloudWithMachineId(request) {
  const machineId = await getMachineId();
  if (!machineId) {
    throw new Error("Could not get machine ID");
  }

  const cloudUrl = getCloudUrl(machineId);

  // Get the original request body and headers
  const body = await request.json();
  const headers = new Headers(request.headers);

  // Remove authorization header since cloud won't need it (uses machineId instead)
  headers.delete("authorization");

  // Call the cloud with machine ID
  const response = await fetch(cloudUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  return response;
}

// Function to periodically sync provider data to cloud (now a no-op)
export function startProviderSync(cloudUrl, intervalMs = 900000) {
  // Default 15 minutes
  console.log("Frontend sync is disabled. Use backend sync instead.");
  return null;
}
