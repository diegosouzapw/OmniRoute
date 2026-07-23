/** Escolhe 1 modelo por provider crítico a partir do catálogo /v1/models. */
export function pickSmokeModels(catalog, criticalProviders) {
  return criticalProviders.map((provider) => {
    const hit = catalog.find((m) => m.id.startsWith(`${provider}/`));
    return { provider, model: hit ? hit.id : null };
  });
}
