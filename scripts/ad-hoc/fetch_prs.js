import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const REPO = "diegosouzapw/OmniRoute";
const artifactsDir =
  process.env.ARTIFACTS_DIR ||
  path.join(process.cwd(), "artifacts");

async function main() {
  try {
    // 1. Get PR numbers
    console.log("Fetching open PR numbers...");
    const prNumbersOutput = execSync(
      `gh pr list --repo ${REPO} --state open --limit 500 --json number --jq '.[].number'`,
      { encoding: "utf-8" }
    );
    const prNumbers = prNumbersOutput.trim().split("\n").map(Number).filter(Boolean);
    console.log(`Found ${prNumbers.length} open PRs:`, prNumbers);

    if (!fs.existsSync(artifactsDir)) {
      fs.mkdirSync(artifactsDir, { recursive: true });
    }

    // 2. Fetch metadata and diff for each PR
    for (const prNum of prNumbers) {
      console.log(`\n--- Fetching PR #${prNum} ---`);

      // Metadata
      try {
        const metadataCmd = `gh pr view ${prNum} --repo ${REPO} --json number,title,author,headRefName,baseRefName,body,createdAt,additions,deletions,files`;
        const metadataJson = execSync(metadataCmd, { encoding: "utf-8" });
        const metadataPath = path.join(artifactsDir, `pr_${prNum}_meta.json`);
        fs.writeFileSync(metadataPath, metadataJson);
        console.log(`Saved metadata to ${metadataPath}`);
      } catch (err) {
        console.error(`Failed to fetch metadata for PR #${prNum}:`, err.message);
      }

      // Diff
      try {
        const diffCmd = `gh pr diff ${prNum} --repo ${REPO}`;
        const diffText = execSync(diffCmd, { encoding: "utf-8", maxBuffer: 100 * 1024 * 1024 });
        const diffPath = path.join("/tmp", `pr${prNum}.diff`);
        fs.writeFileSync(diffPath, diffText);
        console.log(`Saved diff to ${diffPath} (Size: ${diffText.length} bytes)`);
      } catch (err) {
        console.error(`Failed to fetch diff for PR #${prNum}:`, err.message);
      }
    }

    console.log("\nAll PR data fetched successfully!");
  } catch (error) {
    console.error("Error during PR fetching:", error);
  }
}

main();
