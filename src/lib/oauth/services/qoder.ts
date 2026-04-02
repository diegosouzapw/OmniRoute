import { getServerCredentials } from "../config/index";
import { spinner as createSpinner } from "../utils/ui";

/**
 * Qoder AI - PAT Import Service
 *
 * Qoder uses Personal Access Tokens (PAT) generated at https://qoder.com/settings.
 * This replaces the old iflow OAuth flow — no browser redirect is needed.
 * Users paste their PAT directly into OmniRoute.
 */
export class QoderService {
  /**
   * Save a Qoder Personal Access Token to the OmniRoute server.
   * The PAT is stored as the apiKey credential for the qoder provider.
   */
  async savePat(pat: string) {
    const spinner = createSpinner("Saving Qoder Personal Access Token...").start();

    try {
      const { server, token, userId } = getServerCredentials();

      const response = await fetch(`${server}/api/cli/providers/qoder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-User-Id": userId,
        },
        body: JSON.stringify({
          apiKey: pat,
          accessToken: null,
          refreshToken: null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save Qoder PAT");
      }

      spinner.succeed("Qoder PAT saved successfully!");
      return true;
    } catch (error: any) {
      spinner.fail(`Failed: ${error.message}`);
      throw error;
    }
  }
}
