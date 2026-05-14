#!/usr/bin/env node

import {
  getNodeRuntimeSupport,
  getNodeRuntimeWarning,
} from "../../src/shared/utils/nodeRuntimeSupport.ts";

const support = getNodeRuntimeSupport();

if (!support.nodeCompatible) {
  console.error(`Unsupported or insecure Node.js runtime detected: ${support.nodeVersion}`);
  console.error(getNodeRuntimeWarning() || "Unsupported Node.js runtime.");
  console.error(`Supported secure runtimes: ${support.supportedDisplay}`);
  console.error(`Recommended version: ${support.recommendedVersion}`);
  process.exit(1);
}

console.log(
  `Node.js ${support.nodeVersion} satisfies OmniRoute secure runtime policy (${support.supportedRange}).`
);
