import { execSync } from "child_process";

try {
  console.log("Fetching workflow runs...");
  const output = execSync("gh run list --limit 100 --json status,conclusion,databaseId", {
    encoding: "utf8",
  });
  const runs = JSON.parse(output);

  console.log(`Found ${runs.length} runs.`);
  let count = 0;
  for (const run of runs) {
    if (run.conclusion !== "success") {
      console.log(`Deleting run ID ${run.databaseId} with conclusion '${run.conclusion}'...`);
      try {
        execSync(`gh run delete ${run.databaseId}`);
        count++;
      } catch (err) {
        console.error(`Failed to delete run ID ${run.databaseId}:`, err.message);
      }
    }
  }
  console.log(`Deleted ${count} runs successfully.`);
} catch (error) {
  console.error("Error executing script:", error);
}
