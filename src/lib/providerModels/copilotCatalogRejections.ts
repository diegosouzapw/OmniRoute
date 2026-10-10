import { getCopilotModelRejections } from "@omniroute/open-sse/services/copilotModelRejections.ts";
import {
  hasEligibleConnectionForModel,
  isModelAdvertisedByConnection,
  isModelExcludedByConnection,
} from "@/domain/connectionModelRules";
import { getSyncedAvailableModelsByConnection } from "@/lib/db/models";

type Connection = { id: string; providerSpecificData?: unknown };

/** A response-build snapshot only: synced inventory and combo definitions remain authoritative. */
export async function createCatalogConnectionExclusionFilter(
  aliasToProviderId: Record<string, string>,
  providerIdToAlias: Record<string, string>,
  getConnections: (...keys: string[]) => Connection[]
) {
  const rejected = new Map<string, Set<string>>();
  const inventories = new Map<string, Set<string>>();
  const entries = getCopilotModelRejections();
  for (const entry of entries) {
    const key = JSON.stringify([entry.provider, entry.model]);
    const connections = rejected.get(key) ?? new Set<string>();
    connections.add(entry.connectionId);
    rejected.set(key, connections);
  }
  for (const provider of new Set(entries.map((entry) => entry.provider))) {
    const synced = await getSyncedAvailableModelsByConnection(provider);
    for (const [connectionId, models] of Object.entries(synced)) {
      inventories.set(connectionId, new Set(models.map((model) => model.id)));
    }
  }
  return (providerKey: string, model: string): boolean => {
    const provider = aliasToProviderId[providerKey] || providerKey;
    const alias = providerIdToAlias[provider] || providerKey;
    const connections = getConnections(provider, alias, providerKey);
    if (connections.length === 0) return false; // noAuth / no DB row: keep
    if (!hasEligibleConnectionForModel(connections, model)) return true;
    const rejectedConnections = rejected.get(JSON.stringify([provider, model]));
    if (!rejectedConnections || connections.length === 0) return false;
    return !connections.some(
      (connection) =>
        !rejectedConnections.has(connection.id) &&
        !isModelExcludedByConnection(model, connection.providerSpecificData) &&
        isModelAdvertisedByConnection(model, inventories.get(connection.id))
    );
  };
}
