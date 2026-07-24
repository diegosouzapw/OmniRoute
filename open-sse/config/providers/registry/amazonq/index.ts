import type { RegistryEntry } from "../../shared.ts";
import { kiroProvider } from "../kiro/index.ts";

// Amazon Q reuses Kiro's AWS CodeWhisperer backend, OAuth device flow (app.kiro.dev),
// token refresh, executor, and — because it is the same upstream account/catalog — the
// same model IDs. It exists as a distinct provider only to keep connections and quota
// separate from Kiro. Kiro is deprecated upstream (riskNoticeVariant "deprecated"), so
// Amazon Q is the supported path onto these models.
//
// Reuse Kiro's registry config verbatim, overriding only the identity fields and the
// executor key (executors["amazon-q"] === new KiroExecutor("amazon-q"), which keeps
// Amazon Q connections separate while hitting the identical Kiro runtime host). The
// models array is copied (not shared by reference) so the two catalogs can diverge
// later without cross-mutation.
//
// Without this entry, generateModels()/PROVIDER_MODELS has no "aq" namespace, so the
// dashboard model dropdown and /v1/models expose nothing for Amazon Q even though its
// connections authenticate and the executor is wired — the empty-dropdown /
// "[Error: Missing model]" symptom.
export const amazonQProvider: RegistryEntry = {
  ...kiroProvider,
  id: "amazon-q",
  alias: "aq",
  executor: "amazon-q",
  models: kiroProvider.models.map((model) => ({ ...model })),
};
