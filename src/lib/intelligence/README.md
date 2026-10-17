# Intelligence Sync

External model intelligence sources (modelgrep, PublicAI, Arena external, Hugging Face)
integrated into OmniRoute's model_intelligence system.

Entry points: `transforms/modelgrep.ts` (`transformModelgrep`), `transforms/publicai.ts`
(`transformPublicAI`), `transforms/arenaExternal.ts` (`transformArenaExternal`),
`transforms/huggingface.ts` (`transformHuggingFace`), plus shared helpers in
`transforms/shared.ts` (`clamp01`, `normId`, `TASK_CATEGORIES`, `fanOutCategories`).
Each transform takes its source's raw snapshot rows and returns one
`Omit<ModelIntelligenceEntry, "syncedAt">` row per model × each of the 7 canonical
task categories. Downstream sync jobs will consume these transforms to upsert rows
via `src/lib/db/modelIntelligence.ts` (`upsertModelIntelligence` /
`bulkUpsertModelIntelligence`).

See openspec/changes/add-model-intelligence-external-sources for design/spec.
