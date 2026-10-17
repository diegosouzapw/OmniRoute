type CatalogModel = {
  id: string;
  name?: string;
  apiFormat?: string;
  supportedEndpoints?: string[];
  endpointCapabilitySource?: "declared" | "inferred" | "defaulted" | "operator";
  supportsVision?: unknown;
};

/** Keep explicit false distinct from missing discovery capability metadata. */
export function toDiscoveryCatalogModel(model: CatalogModel, ownedBy?: string) {
  return {
    id: model.id,
    name: model.name || model.id,
    ...(model.apiFormat ? { apiFormat: model.apiFormat } : {}),
    ...(model.supportedEndpoints ? { supportedEndpoints: model.supportedEndpoints } : {}),
    ...(model.endpointCapabilitySource ? { endpointCapabilitySource: model.endpointCapabilitySource } : {}),
    ...(typeof model.supportsVision === "boolean" ? { supportsVision: model.supportsVision } : {}),
    ...(ownedBy ? { owned_by: ownedBy } : {}),
  };
}
