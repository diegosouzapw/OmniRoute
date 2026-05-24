// @ts-nocheck
import { default as __fd_glob_63 } from "../docs/security/meta.json?collection=docs";
import { default as __fd_glob_62 } from "../docs/reference/openapi.yaml?collection=docs";
import { default as __fd_glob_61 } from "../docs/reference/meta.json?collection=docs";
import { default as __fd_glob_60 } from "../docs/routing/meta.json?collection=docs";
import { default as __fd_glob_59 } from "../docs/ops/meta.json?collection=docs";
import { default as __fd_glob_58 } from "../docs/guides/meta.json?collection=docs";
import { default as __fd_glob_57 } from "../docs/frameworks/meta.json?collection=docs";
import { default as __fd_glob_56 } from "../docs/compression/meta.json?collection=docs";
import { default as __fd_glob_55 } from "../docs/architecture/meta.json?collection=docs";
import { default as __fd_glob_54 } from "../docs/meta.json?collection=docs";
import * as __fd_glob_53 from "../docs/reference/PROVIDER_REFERENCE.md?collection=docs";
import * as __fd_glob_52 from "../docs/reference/FREE_TIERS.md?collection=docs";
import * as __fd_glob_51 from "../docs/reference/ENVIRONMENT.md?collection=docs";
import * as __fd_glob_50 from "../docs/reference/CLI-TOOLS.md?collection=docs";
import * as __fd_glob_49 from "../docs/reference/API_REFERENCE.md?collection=docs";
import * as __fd_glob_48 from "../docs/security/STEALTH_GUIDE.md?collection=docs";
import * as __fd_glob_47 from "../docs/security/ROUTE_GUARD_TIERS.md?collection=docs";
import * as __fd_glob_46 from "../docs/security/PUBLIC_CREDS.md?collection=docs";
import * as __fd_glob_45 from "../docs/security/GUARDRAILS.md?collection=docs";
import * as __fd_glob_44 from "../docs/security/ERROR_SANITIZATION.md?collection=docs";
import * as __fd_glob_43 from "../docs/security/COMPLIANCE.md?collection=docs";
import * as __fd_glob_42 from "../docs/security/CLI_TOKEN_AUTH.md?collection=docs";
import * as __fd_glob_41 from "../docs/security/CLI_TOKEN.md?collection=docs";
import * as __fd_glob_40 from "../docs/routing/REASONING_REPLAY.md?collection=docs";
import * as __fd_glob_39 from "../docs/routing/AUTO-COMBO.md?collection=docs";
import * as __fd_glob_38 from "../docs/ops/VM_DEPLOYMENT_GUIDE.md?collection=docs";
import * as __fd_glob_37 from "../docs/ops/TUNNELS_GUIDE.md?collection=docs";
import * as __fd_glob_36 from "../docs/ops/SQLITE_RUNTIME.md?collection=docs";
import * as __fd_glob_35 from "../docs/ops/RELEASE_CHECKLIST.md?collection=docs";
import * as __fd_glob_34 from "../docs/ops/PROXY_GUIDE.md?collection=docs";
import * as __fd_glob_33 from "../docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md?collection=docs";
import * as __fd_glob_32 from "../docs/ops/E2E_DASHBOARD_SHAKEDOWN_v3.8.0.md?collection=docs";
import * as __fd_glob_31 from "../docs/ops/COVERAGE_PLAN.md?collection=docs";
import * as __fd_glob_30 from "../docs/guides/USER_GUIDE.md?collection=docs";
import * as __fd_glob_29 from "../docs/guides/UNINSTALL.md?collection=docs";
import * as __fd_glob_28 from "../docs/guides/TROUBLESHOOTING.md?collection=docs";
import * as __fd_glob_27 from "../docs/guides/TERMUX_GUIDE.md?collection=docs";
import * as __fd_glob_26 from "../docs/guides/SETUP_GUIDE.md?collection=docs";
import * as __fd_glob_25 from "../docs/guides/PWA_GUIDE.md?collection=docs";
import * as __fd_glob_24 from "../docs/guides/KIRO_SETUP.md?collection=docs";
import * as __fd_glob_23 from "../docs/guides/I18N.md?collection=docs";
import * as __fd_glob_22 from "../docs/guides/FEATURES.md?collection=docs";
import * as __fd_glob_21 from "../docs/guides/ELECTRON_GUIDE.md?collection=docs";
import * as __fd_glob_20 from "../docs/guides/DOCKER_GUIDE.md?collection=docs";
import * as __fd_glob_19 from "../docs/frameworks/WEBHOOKS.md?collection=docs";
import * as __fd_glob_18 from "../docs/frameworks/SKILLS.md?collection=docs";
import * as __fd_glob_17 from "../docs/frameworks/OPENCODE.md?collection=docs";
import * as __fd_glob_16 from "../docs/frameworks/MEMORY.md?collection=docs";
import * as __fd_glob_15 from "../docs/frameworks/MCP-SERVER.md?collection=docs";
import * as __fd_glob_14 from "../docs/frameworks/GAMIFICATION.md?collection=docs";
import * as __fd_glob_13 from "../docs/frameworks/EVALS.md?collection=docs";
import * as __fd_glob_12 from "../docs/frameworks/CLOUD_AGENT.md?collection=docs";
import * as __fd_glob_11 from "../docs/frameworks/AGENT_PROTOCOLS_GUIDE.md?collection=docs";
import * as __fd_glob_10 from "../docs/frameworks/A2A-SERVER.md?collection=docs";
import * as __fd_glob_9 from "../docs/compression/RTK_COMPRESSION.md?collection=docs";
import * as __fd_glob_8 from "../docs/compression/COMPRESSION_RULES_FORMAT.md?collection=docs";
import * as __fd_glob_7 from "../docs/compression/COMPRESSION_LANGUAGE_PACKS.md?collection=docs";
import * as __fd_glob_6 from "../docs/compression/COMPRESSION_GUIDE.md?collection=docs";
import * as __fd_glob_5 from "../docs/compression/COMPRESSION_ENGINES.md?collection=docs";
import * as __fd_glob_4 from "../docs/architecture/RESILIENCE_GUIDE.md?collection=docs";
import * as __fd_glob_3 from "../docs/architecture/REPOSITORY_MAP.md?collection=docs";
import * as __fd_glob_2 from "../docs/architecture/CODEBASE_DOCUMENTATION.md?collection=docs";
import * as __fd_glob_1 from "../docs/architecture/AUTHZ_GUIDE.md?collection=docs";
import * as __fd_glob_0 from "../docs/architecture/ARCHITECTURE.md?collection=docs";
import { server } from "fumadocs-mdx/runtime/server";
import type * as Config from "../source.config";

const create = server<
  typeof Config,
  import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
    DocData: {};
  }
>({ doc: { passthroughs: ["extractedReferences"] } });

export const docs = await create.docs(
  "docs",
  "docs",
  {
    "meta.json": __fd_glob_54,
    "architecture/meta.json": __fd_glob_55,
    "compression/meta.json": __fd_glob_56,
    "frameworks/meta.json": __fd_glob_57,
    "guides/meta.json": __fd_glob_58,
    "ops/meta.json": __fd_glob_59,
    "routing/meta.json": __fd_glob_60,
    "reference/meta.json": __fd_glob_61,
    "reference/openapi.yaml": __fd_glob_62,
    "security/meta.json": __fd_glob_63,
  },
  {
    "architecture/ARCHITECTURE.md": __fd_glob_0,
    "architecture/AUTHZ_GUIDE.md": __fd_glob_1,
    "architecture/CODEBASE_DOCUMENTATION.md": __fd_glob_2,
    "architecture/REPOSITORY_MAP.md": __fd_glob_3,
    "architecture/RESILIENCE_GUIDE.md": __fd_glob_4,
    "compression/COMPRESSION_ENGINES.md": __fd_glob_5,
    "compression/COMPRESSION_GUIDE.md": __fd_glob_6,
    "compression/COMPRESSION_LANGUAGE_PACKS.md": __fd_glob_7,
    "compression/COMPRESSION_RULES_FORMAT.md": __fd_glob_8,
    "compression/RTK_COMPRESSION.md": __fd_glob_9,
    "frameworks/A2A-SERVER.md": __fd_glob_10,
    "frameworks/AGENT_PROTOCOLS_GUIDE.md": __fd_glob_11,
    "frameworks/CLOUD_AGENT.md": __fd_glob_12,
    "frameworks/EVALS.md": __fd_glob_13,
    "frameworks/GAMIFICATION.md": __fd_glob_14,
    "frameworks/MCP-SERVER.md": __fd_glob_15,
    "frameworks/MEMORY.md": __fd_glob_16,
    "frameworks/OPENCODE.md": __fd_glob_17,
    "frameworks/SKILLS.md": __fd_glob_18,
    "frameworks/WEBHOOKS.md": __fd_glob_19,
    "guides/DOCKER_GUIDE.md": __fd_glob_20,
    "guides/ELECTRON_GUIDE.md": __fd_glob_21,
    "guides/FEATURES.md": __fd_glob_22,
    "guides/I18N.md": __fd_glob_23,
    "guides/KIRO_SETUP.md": __fd_glob_24,
    "guides/PWA_GUIDE.md": __fd_glob_25,
    "guides/SETUP_GUIDE.md": __fd_glob_26,
    "guides/TERMUX_GUIDE.md": __fd_glob_27,
    "guides/TROUBLESHOOTING.md": __fd_glob_28,
    "guides/UNINSTALL.md": __fd_glob_29,
    "guides/USER_GUIDE.md": __fd_glob_30,
    "ops/COVERAGE_PLAN.md": __fd_glob_31,
    "ops/E2E_DASHBOARD_SHAKEDOWN_v3.8.0.md": __fd_glob_32,
    "ops/FLY_IO_DEPLOYMENT_GUIDE.md": __fd_glob_33,
    "ops/PROXY_GUIDE.md": __fd_glob_34,
    "ops/RELEASE_CHECKLIST.md": __fd_glob_35,
    "ops/SQLITE_RUNTIME.md": __fd_glob_36,
    "ops/TUNNELS_GUIDE.md": __fd_glob_37,
    "ops/VM_DEPLOYMENT_GUIDE.md": __fd_glob_38,
    "routing/AUTO-COMBO.md": __fd_glob_39,
    "routing/REASONING_REPLAY.md": __fd_glob_40,
    "security/CLI_TOKEN.md": __fd_glob_41,
    "security/CLI_TOKEN_AUTH.md": __fd_glob_42,
    "security/COMPLIANCE.md": __fd_glob_43,
    "security/ERROR_SANITIZATION.md": __fd_glob_44,
    "security/GUARDRAILS.md": __fd_glob_45,
    "security/PUBLIC_CREDS.md": __fd_glob_46,
    "security/ROUTE_GUARD_TIERS.md": __fd_glob_47,
    "security/STEALTH_GUIDE.md": __fd_glob_48,
    "reference/API_REFERENCE.md": __fd_glob_49,
    "reference/CLI-TOOLS.md": __fd_glob_50,
    "reference/ENVIRONMENT.md": __fd_glob_51,
    "reference/FREE_TIERS.md": __fd_glob_52,
    "reference/PROVIDER_REFERENCE.md": __fd_glob_53,
  }
);
