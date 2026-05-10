#!/usr/bin/env node

import { rollupDailyUsage, rollupHourlyQuota } from "@/lib/usage/aggregateHistory";

interface BackfillOptions {
  from: string;
  to: string;
  granularity?: "hourly" | "daily" | "both";
}

function parseArgs(): BackfillOptions {
  const args = process.argv.slice(2);
  const options: Partial<BackfillOptions> = {
    granularity: "both",
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--from=")) {
      options.from = arg.split("=")[1];
    } else if (arg.startsWith("--to=")) {
      options.to = arg.split("=")[1];
    } else if (arg.startsWith("--granularity=")) {
      const value = arg.split("=")[1];
      if (value === "hourly" || value === "daily" || value === "both") {
        options.granularity = value;
      }
    }
  }

  if (!options.from || !options.to) {
    console.error(
      "Usage: npm run backfill-aggregation -- --from=YYYY-MM-DD --to=YYYY-MM-DD [--granularity=hourly|daily|both]"
    );
    process.exit(1);
  }

  return options as BackfillOptions;
}

function validateDate(dateStr: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;

  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date.getTime());
}

async function backfillAggregation() {
  const options = parseArgs();

  if (!validateDate(options.from) || !validateDate(options.to)) {
    console.error("Error: Dates must be in YYYY-MM-DD format");
    process.exit(1);
  }

  const fromDate = new Date(options.from);
  const toDate = new Date(options.to);

  if (fromDate > toDate) {
    console.error("Error: --from date must be before --to date");
    process.exit(1);
  }

  console.log("=".repeat(60));
  console.log("Aggregation Backfill Started");
  console.log("=".repeat(60));
  console.log(`From: ${options.from}`);
  console.log(`To: ${options.to}`);
  console.log(`Granularity: ${options.granularity}`);
  console.log("=".repeat(60));

  const startTime = Date.now();
  let totalProcessed = 0;
  let totalInserted = 0;
  let totalErrors = 0;

  try {
    if (options.granularity === "daily" || options.granularity === "both") {
      console.log("\n[Daily Aggregation] Starting...");
      const dailyResult = await rollupDailyUsage(options.from, options.to);
      totalProcessed += dailyResult.processed;
      totalInserted += dailyResult.inserted;
      totalErrors += dailyResult.errors;
      console.log(
        `[Daily Aggregation] Processed: ${dailyResult.processed}, Inserted: ${dailyResult.inserted}, Errors: ${dailyResult.errors}`
      );
    }

    if (options.granularity === "hourly" || options.granularity === "both") {
      console.log("\n[Hourly Aggregation] Starting...");
      const fromDateTime = `${options.from} 00:00:00`;
      const toDateTime = `${options.to} 23:59:59`;
      const hourlyResult = await rollupHourlyQuota(fromDateTime, toDateTime);
      totalProcessed += hourlyResult.processed;
      totalInserted += hourlyResult.inserted;
      totalErrors += hourlyResult.errors;
      console.log(
        `[Hourly Aggregation] Processed: ${hourlyResult.processed}, Inserted: ${hourlyResult.inserted}, Errors: ${hourlyResult.errors}`
      );
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log("\n" + "=".repeat(60));
    console.log("Aggregation Backfill Complete");
    console.log("=".repeat(60));
    console.log(`Total Processed: ${totalProcessed}`);
    console.log(`Total Inserted: ${totalInserted}`);
    console.log(`Total Errors: ${totalErrors}`);
    console.log(`Duration: ${duration}s`);
    console.log("=".repeat(60));

    if (totalErrors > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error("\n[FATAL ERROR]", error);
    process.exit(1);
  }
}

backfillAggregation();
