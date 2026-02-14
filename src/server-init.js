// Server startup script
import initializeCloudSync from "./shared/services/initializeCloudSync.js";
import { enforceSecrets } from "./shared/utils/secretsValidator.js";

async function startServer() {
  // FASE-01: Validate required secrets before anything else (fail-fast)
  enforceSecrets();

  console.log("Starting server with cloud sync...");

  try {
    // Initialize cloud sync
    await initializeCloudSync();
    console.log("Server started with cloud sync initialized");
  } catch (error) {
    console.log("Error initializing cloud sync:", error);
    process.exit(1);
  }
}

// Start the server initialization
startServer().catch(console.log);

// Export for use as module if needed
export default startServer;
