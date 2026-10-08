type Model = { id: string };
type Dependencies = {
  load: (provider: string, connection: string) => Promise<Model[]>;
  sync: (provider: string, connection: string) => Promise<boolean>;
};
const inFlight = new Map<string, Promise<boolean>>();
const defaults: Dependencies = {
  load: async (provider, connection) => {
    const { getSyncedAvailableModelsForConnection } = await import("@/lib/db/models");
    return getSyncedAvailableModelsForConnection(provider, connection);
  },
  sync: async (_provider, connection) => {
    const { fetchModelSyncInternal, getModelSyncInternalBaseUrl, buildModelSyncInternalHeaders } =
      await import("@/shared/services/modelSyncScheduler");
    const response = await fetchModelSyncInternal(
      `${getModelSyncInternalBaseUrl()}/api/providers/${encodeURIComponent(connection)}/sync-models`,
      {
        method: "POST",
        headers: buildModelSyncInternalHeaders(),
        signal: AbortSignal.timeout(15000),
      }
    );
    return response.ok;
  },
};

/** Populate a missing account catalog before an explicit model test reaches routing. */
export async function prepareConnectionModelTest(
  provider: string,
  connection: string | undefined,
  model: string,
  dependencies: Dependencies = defaults
): Promise<{ status: number; message: string } | null> {
  if (provider !== "codex" || !connection) return null;
  const id = model.replace(/^(codex|cx)\//, "");
  try {
    let models = await dependencies.load(provider, connection);
    if (models.length === 0) {
      const key = `${provider}:${connection}`;
      let pending = inFlight.get(key);
      if (!pending) {
        pending = dependencies.sync(provider, connection).finally(() => inFlight.delete(key));
        inFlight.set(key, pending);
      }
      if (!(await pending))
        return {
          status: 503,
          message:
            "This account's model catalog could not be refreshed. Retry model sync before testing.",
        };
      models = await dependencies.load(provider, connection);
    }
    if (!models.some((entry) => entry.id === id))
      return {
        status: 422,
        message:
          "The selected model is not advertised for this account. Sync its models and choose an available model.",
      };
    return null;
  } catch {
    return {
      status: 503,
      message: "This account's model catalog is unavailable. Retry model sync before testing.",
    };
  }
}
