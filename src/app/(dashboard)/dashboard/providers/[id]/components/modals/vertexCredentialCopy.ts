import { providerText, type ProviderMessageTranslator } from "../../providerPageHelpers";

/** Vertex-specific credential label/placeholder/hint for the connection modals. */
export function getVertexCredentialCopy(t: ProviderMessageTranslator) {
  return {
    label: providerText(t, "vertexCredentialLabel", "API Key or Service Account JSON"),
    placeholder: t("vertexServiceAccountPlaceholder"),
    hint: providerText(
      t,
      "vertexCredentialHint",
      "API keys use the curated project catalog. Service Account JSON enables live Model Garden discovery."
    ),
  };
}
