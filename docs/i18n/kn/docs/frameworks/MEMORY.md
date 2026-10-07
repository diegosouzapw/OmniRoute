# Memory System (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **ಅಧಿಕೃತ ಮೂಲ:** `src/lib/memory/` ಮತ್ತು `src/app/api/memory/`
> **ಕೊನೆಯ ನವೀಕರಣ:** 2026-06-28 — v3.8.40 (ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ನಿಷ್ಕ್ರಿಯ + int8 ಕ್ವಾಂಟೈಸೇಶನ್ ಹೊಂದಾಣಿಕೆ)

OmniRoute, API ಕೀ (ಮತ್ತು ಐಚ್ಛಿಕವಾಗಿ ಸೆಷನ್ id) ಆಧಾರಿತ ನಿರಂತರ ಸಂಭಾಷಣಾ ಮೆಮೊರಿಯನ್ನು ಒದಗಿಸುತ್ತದೆ. ಹಗುರವಾದ regex ಮಾದರಿ ಹೊಂದಾಣಿಕೆಯ ಮೂಲಕ LLM ಪ್ರತಿಕ್ರಿಯೆಗಳಿಂದ ಮೆಮೊರಿಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಹೊರತೆಗೆಯಲಾಗುತ್ತದೆ ಮತ್ತು ನಂತರದ ವಿನಂತಿಗಳಿಗೆ ಆರಂಭಿಕ ಸಿಸ್ಟಮ್ ಸಂದೇಶವಾಗಿ (ಅಥವಾ ಸಿಸ್ಟಮ್ ಪಾತ್ರವನ್ನು ತಿರಸ್ಕರಿಸುವ ಪೂರೈಕೆದಾರರಿಗೆ ಮೊದಲ ಬಳಕೆದಾರ ಸಂದೇಶವಾಗಿ) ಮರುಸೇರಿಸಲಾಗುತ್ತದೆ.

> **ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ಮೆಮೊರಿ ನಿಷ್ಕ್ರಿಯವಾಗಿದೆ (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> ಈಗ `false` ಆಗಿದೆ (`src/lib/memory/settings.ts`). ಮೆಮೊರಿಯನ್ನು ಸಕ್ರಿಯಗೊಳಿಸುವುದರಿಂದ
> ಹಿಂಪಡೆಯಲಾದ ಸಂದರ್ಭದ `maxTokens` (~2k) ವರೆಗೆ **ಪ್ರತಿಯೊಂದು** ಚಾಟ್ ವಿನಂತಿಗೂ
> ಸೇರಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಅದಕ್ಕೆ ಶುಲ್ಕ ವಿಧಿಸಲಾಗುತ್ತದೆ — ಹೊಸ ಸ್ಥಾಪನೆಗಳಿಗೆ ಹಾಗೂ ತಮ್ಮದೇ
> ಸಂದರ್ಭವನ್ನು ನಿರ್ವಹಿಸುವ ಕ್ಲೈಂಟ್ಗಳಿಗೆ ಇದು ಅನಿರೀಕ್ಷಿತ ವೆಚ್ಚವಾಗಬಹುದು. **Settings → Memory**
> ಅಡಿಯಲ್ಲಿ ಸ್ಪಷ್ಟವಾಗಿ ಸಕ್ರಿಯಗೊಳಿಸಿ (ಮೆಮೊರಿ ಸಕ್ರಿಯಗೊಂಡಾಗ `MemorySkillsTab` ಟೋಕನ್-ವೆಚ್ಚದ
> ಎಚ್ಚರಿಕೆಯ ಸೂಚನೆಯನ್ನು ತೋರಿಸುತ್ತದೆ). ಕ್ಲೈಂಟ್ ಒಂದೇ ವಿನಂತಿಗೆ `x-omniroute-no-memory`
> ವಿನಂತಿ ಹೆಡರ್ (`true`/`1`/`yes`) ಮೂಲಕ ಮೆಮೊರಿಯಿಂದ ಹೊರಗುಳಿಯಬಹುದು — ವಿನಂತಿ-ಹೆಡರ್
> ಕೋಷ್ಟಕವನ್ನು [API_REFERENCE.md](../reference/API_REFERENCE.md) ನಲ್ಲಿ ನೋಡಿ.
> ಮೆಮೊರಿ-ರಹಿತ ವಿನಂತಿಯು `memoryOwnerId = null` ಅನ್ನು ಹೊಂದಿಸುತ್ತದೆ; ಇದು ಆ ವಿನಂತಿಗೆ
> ಮೆಮೊರಿ ಮತ್ತು ಕೌಶಲ್ಯ ಸೇರಿಸುವಿಕೆ **ಎರಡನ್ನೂ** ನಿಷ್ಕ್ರಿಯಗೊಳಿಸುತ್ತದೆ
> (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

ಮೆಮೊರಿಯ ವ್ಯಾಪ್ತಿಯನ್ನು **ಪ್ರತಿ API ಕೀಗೆ** ನಿಗದಿಪಡಿಸಲಾಗಿದೆ, ಪ್ರತಿ ಬಳಕೆದಾರನಿಗೆ ಅಲ್ಲ — ಅದೇ API ಕೀ ಮೂಲಕ ದೃಢೀಕರಿಸಲಾದ ಪ್ರತಿಯೊಂದು ವಿನಂತಿಯೂ ಒಂದೇ ಮೆಮೊರಿ ಸಂಗ್ರಹವನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತದೆ; `sessionId` ಮೂಲಕ ಐಚ್ಛಿಕವಾಗಿ ಇನ್ನಷ್ಟು ವ್ಯಾಪ್ತಿ ನಿರ್ಧರಿಸಬಹುದು.

## ಆರ್ಕಿಟೆಕ್ಚರ್

```
ಕ್ಲೈಂಟ್ → /v1/chat/completions (apiKeyInfo ಅನ್ನು ಅಪ್ಸ್ಟ್ರೀಮ್ನಲ್ಲಿ ಪರಿಹರಿಸಲಾಗಿದೆ)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # id ಅನ್ನು ಹೊರತೆಗೆಯುತ್ತದೆ
    → getMemorySettings()                     # ಕ್ಯಾಶ್ ಮಾಡಿದ ಸೆಟ್ಟಿಂಗ್ಗಳು
    → shouldInjectMemory(body, {enabled})     # ನಿಯಂತ್ರಣ ದ್ವಾರ
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + ಐಚ್ಛಿಕ ವೆಕ್ಟರ್
    → injectMemory(body, memories, provider)  # ಸಿಸ್ಟಮ್ ಅಥವಾ ಬಳಕೆದಾರ ಸಂದೇಶ
  → ಅಪ್ಸ್ಟ್ರೀಮ್ ಪೂರೈಕೆದಾರರ ಕರೆ
  → ಪ್ರತಿಕ್ರಿಯೆಯಾದಾಗ: extractFacts(text, apiKeyId, sessionId)  # ನಿರ್ಬಂಧಿಸದ
    → setImmediate → ಪ್ರತಿ ಹೊಂದಾಣಿಕೆಗೆ createMemory(fact)
                   → embed(content) + upsertVector(id, vec)
```

ಸೇರಿಸುವಿಕೆ ಮತ್ತು ಹೊರತೆಗೆಯುವಿಕೆಯ ಕರೆ-ಸ್ಥಳಗಳನ್ನು `open-sse/handlers/chatCore.ts` ನಲ್ಲಿ ಜೋಡಿಸಲಾಗಿದೆ (`retrieveMemories`, `injectMemory` ಮತ್ತು `extractFacts` ಅನ್ನು ಹುಡುಕಿ).

## ಎಂಜಿನ್ ಆರ್ಕಿಟೆಕ್ಚರ್ (3-ಹಂತದ ಪರಿಹಾರ)

ಲಭ್ಯವಿರುವ ಮೂಲಸೌಕರ್ಯ ಮತ್ತು ಸೆಟ್ಟಿಂಗ್ಗಳ ಆಧಾರದ ಮೇಲೆ Memory Engine ರನ್ಟೈಮ್ನಲ್ಲಿ ಹಿಂಪಡೆಯುವಿಕೆಯ ಮಾರ್ಗವನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ. ಆದ್ಯತಾ ಕ್ರಮದಲ್ಲಿ ಅನ್ವಯಿಸಲಾದ ಮೂರು ಹಂತಗಳಿವೆ:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  ಹಂತ 0 — ಕೀವರ್ಡ್ (FTS5)                                    │
  │  ಪರಿಶೀಲನೆ-ಚಾಲಿತ ಲಭ್ಯತೆ: SQLite ಬಿಲ್ಡ್ ಬೆಂಬಲಿಸಿದಾಗ FTS5      │
  │  ಲಭ್ಯವಿರುತ್ತದೆ (better-sqlite3 / node:sqlite / bun:sqlite); │
  │  FTS5 ಇಲ್ಲದ ಬಿಲ್ಡ್ಗಳಲ್ಲಿ ಲಭ್ಯವಿರುವುದಿಲ್ಲ                    │
  │  (ಉದಾ. sql.js/WASM — "no such module: fts5").               │
  │  strategy = "exact" ಆಗಿದ್ದಾಗ ಅಥವಾ ಪರ್ಯಾಯವಾಗಿ ಬಳಸಲಾಗುತ್ತದೆ;   │
  │  engine-status keyword ಪರಿಶೀಲನೆಯ ಫಲಿತಾಂಶವನ್ನು ಸೂಚಿಸುತ್ತದೆ.  │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  ಹಂತ 1 — ಎಂಬೆಡೆಡ್ ವೆಕ್ಟರ್ (sqlite-vec)                      │
  │  sqlite-vec v0.1.9 ಅನ್ನು db.loadExtension() ಮೂಲಕ ಲೋಡ್        │
  │  ಮಾಡಲಾಗುತ್ತದೆ. Float32 ವೆಕ್ಟರ್ಗಳ ಮೇಲೆ KNN ಬ್ರೂಟ್-ಫೋರ್ಸ್.    │
  │  ಕೆಳಗಿನ ಸಂದರ್ಭಗಳಲ್ಲಿ ಸಕ್ರಿಯವಾಗಿರುತ್ತದೆ:                      │
  │   • sqlite-vec loadExtension ಯಶಸ್ವಿಯಾಗುತ್ತದೆ                  │
  │   • Float32Array ಉತ್ಪಾದಿಸಬಲ್ಲ ಎಂಬೆಡಿಂಗ್ ಮೂಲ                 │
  │     (remote | static | transformers) ಲಭ್ಯವಿರುತ್ತದೆ           │
  │   • vec_memories ಕೋಷ್ಟಕ ಅಸ್ತಿತ್ವದಲ್ಲಿರುತ್ತದೆ                 │
  │     (ಮೊದಲ ready() ಸಂದರ್ಭದಲ್ಲಿ ರಚಿಸಲಾಗುತ್ತದೆ)                  │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  ಹಂತ 2 — Qdrant (ಆಯ್ಕೆಯ ಬಾಹ್ಯ ವೆಕ್ಟರ್ ಡೇಟಾಬೇಸ್)             │
  │  ಸಕ್ರಿಯಗೊಳಿಸಿದಾಗ semantic/hybrid ಗಾಗಿ sqlite-vec ಅನ್ನು       │
  │  ಬದಲಿಸುತ್ತದೆ. ಚಾಲನೆಯಲ್ಲಿರುವ Qdrant ನಿದರ್ಶನ ಮತ್ತು ಕಾನ್ಫಿಗರ್  │
  │  ಮಾಡಿದ host/port ಅಗತ್ಯವಿದೆ.                                  │
  └─────────────────────────────────────────────────────────────┘
```

ಗುಣಮಟ್ಟ ಇಳಿಕೆ ಸ್ವಯಂಚಾಲಿತ ಮತ್ತು ಪಾರದರ್ಶಕವಾಗಿದೆ:

- sqlite-vec ಲೋಡ್ ಆಗಲು ವಿಫಲವಾದರೆ, ಹಂತ 1 ಲಭ್ಯವಿರುವುದಿಲ್ಲ → ಹಂತ 0 ಗೆ ಮರಳುತ್ತದೆ.
- ಎಂಬೆಡಿಂಗ್ ಮೂಲವು ದೋಷವನ್ನು ಹಿಂತಿರುಗಿಸಿದರೆ, ಹಂತ 1 ಹಂತ 0 ಗೆ ಮರಳುತ್ತದೆ.
- Qdrant ಸಮರ್ಪಕವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸದಿದ್ದರೆ, ಹಂತ 2 ಹಂತ 1 ಗೆ ಮರಳುತ್ತದೆ (ಅಥವಾ ಹಂತ 1 ಸಹ ಲಭ್ಯವಿಲ್ಲದಿದ್ದರೆ ಹಂತ 0 ಗೆ ಮರಳುತ್ತದೆ).

## ಎಂಬೆಡಿಂಗ್ ಮೂಲಗಳು

ಎಂಬೆಡಿಂಗ್ ಲೇಯರ್ (`src/lib/memory/embedding/`) `MemorySettingsExtended.embeddingSource` ಆಧರಿಸಿ ಯಾವ ಮೂಲವನ್ನು ಬಳಸಬೇಕೆಂದು ನಿರ್ಧರಿಸುತ್ತದೆ:

| ಮೂಲ            | ವಿವರಣೆ                                                                              | ಕೀ ಅಗತ್ಯವಿದೆ | ಕೋಲ್ಡ್ ಸ್ಟಾರ್ಟ್  |
| -------------- | ----------------------------------------------------------------------------------- | ------------ | ---------------- |
| `remote`       | ಕಾನ್ಫಿಗರ್ ಮಾಡಲಾದ ಪೂರೈಕೆದಾರರ ಎಂಬೆಡಿಂಗ್ API ಅನ್ನು ಬಳಸುತ್ತದೆ (OpenAI, Cohere, ಇತ್ಯಾದಿ) | ಹೌದು         | ಯಾವುದೂ ಇಲ್ಲ      |
| `static`       | `potion-base-8M` ಮೂಲಕ ಸ್ಥಳೀಯ ಲುಕ್ಅಪ್-ಟೇಬಲ್ ಎಂಬೆಡಿಂಗ್ (WordPiece + ಮೀನ್ ಪೂಲಿಂಗ್)     | ಇಲ್ಲ         | ~200ms           |
| `transformers` | `@huggingface/transformers` v4, `all-MiniLM-L6-v2` ಮೂಲಕ ಸ್ಥಳೀಯ ONNX ಇನ್ಫರೆನ್ಸ್      | ಇಲ್ಲ         | ~3s + ~400MB RAM |
| `auto`         | ರನ್ಟೈಮ್ ನಿರ್ಧಾರ: remote (ಕೀ ಇದ್ದರೆ) → static → transformers → null                  | ಅವಲಂಬಿತ      | ಅವಲಂಬಿತ          |

**`auto` ಗಾಗಿ ನಿರ್ಧಾರ ಕ್ರಮ:**

1. `listEmbeddingProviders()` ನಲ್ಲಿ `hasKey === true` ಹೊಂದಿರುವ ಮೊದಲ ಪೂರೈಕೆದಾರರನ್ನು ಹುಡುಕಿ → `remote`.
2. `settings.staticEnabled === true` ಆಗಿದ್ದರೆ → `static`.
3. `settings.transformersEnabled === true` ಆಗಿದ್ದರೆ → `transformers`.
4. ಇಲ್ಲದಿದ್ದರೆ → `null` (FTS5 ಕೀವರ್ಡ್ ಹುಡುಕಾಟಕ್ಕೆ ಹಿಮ್ಮೆಟ್ಟುತ್ತದೆ).

ಎಂಬೆಡಿಂಗ್ ಕ್ಯಾಶ್ (`src/lib/memory/embedding/cache.ts`) `${source}:${model}:${dim}:${sha256(text)}` ಮೂಲಕ ಕೀ ಮಾಡಲಾದ ಇನ್-ಮೆಮೊರಿ LRU ಮ್ಯಾಪ್ ಅನ್ನು ಬಳಸುತ್ತದೆ. ಇದು ಗರಿಷ್ಠ `MEMORY_EMBEDDING_CACHE_MAX` ನಮೂದುಗಳಿಗೆ (ಡೀಫಾಲ್ಟ್ 1000), `MEMORY_EMBEDDING_CACHE_TTL_MS` TTLನೊಂದಿಗೆ (ಡೀಫಾಲ್ಟ್ 5 ನಿಮಿಷ) ಸೀಮಿತವಾಗಿದೆ. ಪ್ರತಿ ಪ್ರೊಸೆಸ್ ಜೀವನಚಕ್ರದಲ್ಲಿ ಎಲ್ಲ ಕಾಲರ್ಗಳ ನಡುವೆ ಹಂಚಿಕೊಳ್ಳಲಾಗುತ್ತದೆ.

## ಹೈಬ್ರಿಡ್ RRF (k=60)

`strategy = "hybrid"` ಆಗಿರುವಾಗ ಮತ್ತು ವೆಕ್ಟರ್ ಸ್ಟೋರ್ ಲಭ್ಯವಿರುವಾಗ, ರಿಟ್ರೀವಲ್ FTS5 ಮತ್ತು ವೆಕ್ಟರ್ ಫಲಿತಾಂಶಗಳನ್ನು ವಿಲೀನಗೊಳಿಸಲು ರೆಸಿಪ್ರೋಕಲ್ ರ್ಯಾಂಕ್ ಫ್ಯೂಷನ್ ಅನ್ನು ಬಳಸುತ್ತದೆ:

```
RRF(d) = Σ  1 / (k + rank_i(d))      ಇಲ್ಲಿ k = 60 (MEMORY_RRF_K ಮೂಲಕ ಕಾನ್ಫಿಗರ್ ಮಾಡಬಹುದು)
          i
```

ನಿರ್ದಿಷ್ಟವಾಗಿ:

1. FTS5 ಹುಡುಕಾಟವನ್ನು ಚಲಾಯಿಸಿ → ರ್ಯಾಂಕ್ ಮಾಡಲಾದ ಪಟ್ಟಿ `R_fts` (ಸ್ಥಾನ 1..N).
2. KNN ವೆಕ್ಟರ್ ಹುಡುಕಾಟವನ್ನು ಚಲಾಯಿಸಿ → ರ್ಯಾಂಕ್ ಮಾಡಲಾದ ಪಟ್ಟಿ `R_vec` (ಸ್ಥಾನ 1..M).
3. ಪ್ರತಿ ವಿಶಿಷ್ಟ `memoryId` ಗಾಗಿ:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (ಪಟ್ಟಿಯಲ್ಲಿ ಇಲ್ಲದಿದ್ದರೆ 0).
4. `rrf_score` ಆಧರಿಸಿ DESC ಕ್ರಮದಲ್ಲಿ ವಿಂಗಡಿಸಿ, ಟೋಕನ್ ಬಜೆಟ್ ವಾಕ್ ಅನ್ನು ಅನ್ವಯಿಸಿ.

ವೈವಿಧ್ಯಮಯ ರಿಟ್ರೀವಲ್ ಸಿಸ್ಟಮ್ಗಳಾದ್ಯಂತ ಸ್ಕೋರ್ ಸಾಮಾನ್ಯೀಕರಣದ ಅಗತ್ಯವಿಲ್ಲದೆ RRF ಪರಿಣಾಮಕಾರಿಯಾಗಿದೆ ಎಂಬುದು ಸುಪ್ರಸಿದ್ಧ. ಡೀಫಾಲ್ಟ್ `k=60` ಮೂಲ Cormack et al. ಪ್ರಬಂಧದಿಂದ ಬಂದಿದ್ದು, ಸಣ್ಣ ಕಾರ್ಪೊರಾಗಳಿಗೆ (<10k ಮೆಮೊರಿಗಳು) ಉತ್ತಮವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ.

## ಬ್ಯಾಕ್ಫಿಲ್ (ಲೇಝಿ + ರೀಇಂಡೆಕ್ಸ್)

ಎಂಬೆಡಿಂಗ್ ಮಾಡೆಲ್ ಬದಲಾದಾಗ (`embedding_signature` ಮೂಲಕ ಪತ್ತೆಹಚ್ಚಲಾಗುತ್ತದೆ), ವೆಕ್ಟರ್ ಸ್ಟೋರ್ ಅನ್ನು ಮರುನಿರ್ಮಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಎಲ್ಲ ಮೆಮೊರಿಗಳನ್ನು `memories` ಟೇಬಲ್ನಲ್ಲಿ `needs_reindex = 1` ಎಂದು ಗುರುತಿಸಲಾಗುತ್ತದೆ.

**ಲೇಝಿ ಬ್ಯಾಕ್ಫಿಲ್**: ಮುಂದಿನ ರಿಟ್ರೀವಲ್ನಲ್ಲಿ, ವೆಕ್ಟರ್ ನಮೂದು ಇಲ್ಲದ ಯಾವುದೇ ಮೆಮೊರಿಯನ್ನು ಎಂಬೆಡ್ ಮಾಡಿ, ಹುಡುಕಾಟ ಪ್ರಾರಂಭವಾಗುವ ಮೊದಲು `vec_memories` ಗೆ ಸೇರಿಸಲಾಗುತ್ತದೆ. ಇದು ಸ್ಟಾರ್ಟ್ಅಪ್ ಅನ್ನು ನಿರ್ಬಂಧಿಸದೆ ನೈಜ ವಿನಂತಿಗಳಾದ್ಯಂತ ಬ್ಯಾಕ್ಫಿಲ್ ವೆಚ್ಚವನ್ನು ಹಂಚುತ್ತದೆ.

**ಸ್ಪಷ್ಟ ರೀಇಂಡೆಕ್ಸ್**: `/dashboard/memory` ನಲ್ಲಿರುವ Engine ಟ್ಯಾಬ್ `POST /api/memory/reindex` ಅನ್ನು ಕರೆಮಾಡುವ "ಈಗಲೇ ರೀಇಂಡೆಕ್ಸ್ ಮಾಡಿ" ಬಟನ್ ಅನ್ನು ಒದಗಿಸುತ್ತದೆ. ಹ್ಯಾಂಡ್ಲರ್ `src/lib/memory/reindex.ts` ನಿಂದ `runReindexBatch()` ಅನ್ನು ಕರೆಮಾಡುತ್ತದೆ, ಇದು ಪ್ರತಿ ವಿನಂತಿಗೆ ಬಾಕಿ ಇರುವ ಗರಿಷ್ಠ `limit` ನಮೂದುಗಳನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುತ್ತದೆ. ಪ್ರಗತಿಯನ್ನು `GET /api/memory/engine-status` (`vectorStore.needsReindex`) ಮೂಲಕ ಪೋಲ್ ಮಾಡಬಹುದು.

`memory_vec_meta` ಟೇಬಲ್ (ಮೈಗ್ರೇಶನ್ `083_memory_vec.sql`) ಇವುಗಳನ್ನು ಸಂಗ್ರಹಿಸುತ್ತದೆ:

- `active_dim` — ಪ್ರಸ್ತುತ ವೆಕ್ಟರ್ ಆಯಾಮ (null = ಇನ್ನೂ ಕ್ಯಾಲಿಬ್ರೇಟ್ ಮಾಡಲಾಗಿಲ್ಲ).
- `embedding_signature` — ಬದಲಾವಣೆಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಬಳಸುವ `${source}:${model}:${dim}`.
- `last_reset_at` — ಕೊನೆಯ ಸಂಪೂರ್ಣ ರೀಸೆಟ್ನ ಟೈಮ್ಸ್ಟ್ಯಾಂಪ್.
- `vec_loaded` — sqlite-vec ಯಶಸ್ವಿಯಾಗಿ ಲೋಡ್ ಆಗಿದೆಯೇ ಎಂಬುದನ್ನು ಸೂಚಿಸುವ 0/1 ಫ್ಲ್ಯಾಗ್.

## ಸೆಟ್ಟಿಂಗ್ಗಳ ವಿಸ್ತರಣೆ

ಒಂಬತ್ತು ಎಂಬೆಡ್ಡಿಂಗ್ ಮತ್ತು ವೆಕ್ಟರ್ ಕ್ಷೇತ್ರಗಳು `src/shared/schemas/memory.ts` ನಲ್ಲಿನ
`MemorySettingsExtended` ನಲ್ಲಿ ಲಭ್ಯವಿದ್ದು, `src/lib/db/settings.ts` ಮೂಲಕ ಶಾಶ್ವತವಾಗಿ ಉಳಿಸಲ್ಪಡುತ್ತವೆ:

| ಕ್ಷೇತ್ರ                  | ಪ್ರಕಾರ                                             | ಡೀಫಾಲ್ಟ್ | ವಿವರಣೆ                                                                     |
| ------------------------ | -------------------------------------------------- | -------- | -------------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | ಬಳಸಬೇಕಾದ ಎಂಬೆಡ್ಡಿಂಗ್ ಮೂಲ                                                   |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | `provider/model` ಸ್ವರೂಪದಲ್ಲಿರುವ ಪೂರೈಕೆದಾರ/ಮಾದರಿ                            |
| `customBaseUrl`          | `string \| null`                                   | `null`   | Memoryಗೆ ಮಾತ್ರ ಅನ್ವಯಿಸುವ OpenAI-ಹೊಂದಾಣಿಕೆಯ ಎಂಡ್ಪಾಯಿಂಟ್ ಮೂಲ URL             |
| `customModelId`          | `string \| null`                                   | `null`   | ಕಸ್ಟಮ್ ಎಂಡ್ಪಾಯಿಂಟ್ಗೆ ಕಳುಹಿಸುವ ಮಾದರಿ ID                                     |
| `transformersEnabled`    | `boolean`                                          | `false`  | Transformers.jsಗೆ ಸಮ್ಮತಿ-ಆಧಾರಿತ ಸಕ್ರಿಯಗೊಳಿಸುವಿಕೆ (MiniLM, ~400MB)          |
| `staticEnabled`          | `boolean`                                          | `false`  | ಸ್ಥಿರ potion-base-8M ಸ್ಥಳೀಯ ಮಾದರಿಗೆ ಸಮ್ಮತಿ-ಆಧಾರಿತ ಸಕ್ರಿಯಗೊಳಿಸುವಿಕೆ         |
| `rerankEnabled`          | `boolean`                                          | `false`  | ಮರುಶ್ರೇಣೀಕರಣ ಹಂತವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ (ಪ್ರತಿ ವಿನಂತಿಗೆ +200-500ms ಸೇರಿಸುತ್ತದೆ) |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | `provider/model` ಸ್ವರೂಪದಲ್ಲಿರುವ ಮರುಶ್ರೇಣೀಕರಣ ಪೂರೈಕೆದಾರ/ಮಾದರಿ               |

`rerankProviderModel` ಅನ್ನು `POST /v1/rerank` ಮೂಲಕ ಪರಿಹರಿಸಲಾಗುತ್ತದೆ (ಲೂಪ್ಬ್ಯಾಕ್ ಮೂಲಕ ಕರೆಯಲಾಗುತ್ತದೆ), ಆದ್ದರಿಂದ ಆ ಮಾರ್ಗವು ಸ್ವೀಕರಿಸುವ ಯಾವುದನ್ನಾದರೂ ಇದು ಸ್ವೀಕರಿಸುತ್ತದೆ: ಆಯ್ದ ಕ್ಲೌಡ್ ಮರುಶ್ರೇಣೀಕರಣ ಮಾದರಿ (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) ಅಥವಾ `<node-prefix>/<model>` ರೂಪದಲ್ಲಿರುವ OpenAI-ಹೊಂದಾಣಿಕೆಯ ಪೂರೈಕೆದಾರ ನೋಡ್ (ಉದಾ. TEI/Infinity ಬಾಕ್ಸ್ಗಾಗಿ `skilled-mini/bge-reranker-v2-m3`). ಲೂಪ್ಬ್ಯಾಕ್ ನೋಡ್ಗಳು ಯಾವಾಗಲೂ ಅರ್ಹವಾಗಿರುತ್ತವೆ; ಮತ್ತೊಂದು ಹೋಸ್ಟ್ನಲ್ಲಿರುವ ನೋಡ್ಗೆ (LAN, Tailscale) ಹೆಚ್ಚುವರಿಯಾಗಿ `RERANK_REMOTE_PROVIDER_NODES` ವೈಶಿಷ್ಟ್ಯ ಫ್ಲ್ಯಾಗ್ ಅಗತ್ಯವಿದ್ದು, ಅದು ಪೂರೈಕೆದಾರರ ಔಟ್ಬೌಂಡ್ URL ನೀತಿಯನ್ನು ಪೂರೈಸಬೇಕು — [ವೈಶಿಷ್ಟ್ಯ ಫ್ಲ್ಯಾಗ್ಗಳು](../reference/FEATURE_FLAGS.md) ನೋಡಿ. ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಆಯ್ಕೆಕಾರವು ಆಯ್ದ ಪೂರೈಕೆದಾರರು ಮತ್ತು ಸ್ಥಳೀಯ ನೋಡ್ಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡುತ್ತದೆ; ಯಾವುದೇ ಮಾನ್ಯ `provider/model` ಸ್ಟ್ರಿಂಗ್ ಅನ್ನು `PUT /api/settings/memory` ಮೂಲಕ ನೇರವಾಗಿ ಹೊಂದಿಸಬಹುದು.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | ಬಳಸಬೇಕಾದ ವೆಕ್ಟರ್ ಬ್ಯಾಕೆಂಡ್ |

ಇವುಗಳನ್ನು `GET /PUT /api/settings/memory` ಮೂಲಕ ಬಹಿರಂಗಪಡಿಸಲಾಗಿದೆ (ಸ್ಕೀಮಾ `MemorySettingsExtendedSchema`).

`remote` ಮೂಲಕ್ಕಾಗಿ, Memory ಐಚ್ಛಿಕ `customBaseUrl` ಮತ್ತು
`customModelId` ಸೆಟ್ಟಿಂಗ್ಗಳನ್ನೂ ಸ್ವೀಕರಿಸುತ್ತದೆ. ಒಟ್ಟಾಗಿ, ಅವು ಜಾಗತಿಕ ಎಂಬೆಡ್ಡಿಂಗ್ ರಿಜಿಸ್ಟ್ರಿಯನ್ನು ಬದಲಾಯಿಸದೆ OpenAI-ಹೊಂದಾಣಿಕೆಯ `/embeddings`
ಎಂಡ್ಪಾಯಿಂಟ್ ಮತ್ತು ಮಾದರಿಯನ್ನು ಆಯ್ಕೆಮಾಡುತ್ತವೆ. ಎಂಡ್ಪಾಯಿಂಟ್ ಅನ್ನು
ಬಳಕೆಗೆ ಮೊದಲು ಸಾಮಾನ್ಯೀಕರಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಪೂರೈಕೆದಾರರ ಔಟ್ಬೌಂಡ್ URL ನೀತಿಯ ಪ್ರಕಾರ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ: HTTP(S)
ಅಗತ್ಯವಿದೆ, ಅಳವಡಿಸಲಾದ ರುಜುವಾತುಗಳು ಮತ್ತು ಕ್ವೆರಿ ಸ್ಟ್ರಿಂಗ್ಗಳನ್ನು ತಿರಸ್ಕರಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಕ್ಲೌಡ್-ಮೆಟಾಡೇಟಾ
ವಿಳಾಸಗಳು ನಿರ್ಬಂಧಿತವಾಗಿಯೇ ಉಳಿಯುತ್ತವೆ. ಖಾಲಿ ಮೌಲ್ಯಗಳು ಆಯ್ದ ರಿಜಿಸ್ಟ್ರಿ ಪೂರೈಕೆದಾರನನ್ನು ಉಳಿಸಿಕೊಳ್ಳುತ್ತವೆ. ಡ್ಯಾಶ್ಬೋರ್ಡ್ಗೆ
ಹಿಂತಿರುಗಿಸಲಾದ ದೋಷಗಳನ್ನು ಶುದ್ಧೀಕರಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಎಂಡ್ಪಾಯಿಂಟ್ ರುಜುವಾತುಗಳನ್ನು ಎಂದಿಗೂ ಲಾಗ್ ಮಾಡಲಾಗುವುದಿಲ್ಲ.

> **ಮಾಡಬೇಕಿರುವುದು (D20):** `global` ವ್ಯಾಪ್ತಿ (ಎಲ್ಲಾ API ಕೀಗಳಾದ್ಯಂತ ಮೆಮೊರಿಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳುವುದು) ಈ
> ಬಿಡುಗಡೆಯಲ್ಲಿ ಅನುಷ್ಠಾನಗೊಂಡಿಲ್ಲ. ಇದಕ್ಕೆ ಸ್ಕೀಮಾ ಬದಲಾವಣೆಗಳು ಮತ್ತು ಜಾಗತಿಕ ಮರುಪಡೆಯುವಿಕೆ
> ಮಾರ್ಗ ಅಗತ್ಯವಿದೆ. ಪ್ರತ್ಯೇಕವಾಗಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.

## ಸಂಗ್ರಹಣೆ ಪದರಗಳು

### ಪ್ರಾಥಮಿಕ: SQLite (`memories` ಕೋಷ್ಟಕ)

`015_create_memories.sql` ಮೈಗ್ರೇಶನ್ನಿಂದ ರಚಿಸಲಾಗಿದೆ:

| ಕಾಲಮ್                       | ಪ್ರಕಾರ             | ಟಿಪ್ಪಣಿಗಳು                                                                                  |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | `crypto.randomUUID()` ಮೂಲಕ ರಚಿಸಲಾದ UUID                                                     |
| `api_key_id`                | `TEXT NOT NULL`    | ಮಾಲೀಕತ್ವ ಹೊಂದಿರುವ API ಕೀ                                                                    |
| `session_id`                | `TEXT`             | ಪ್ರತಿ ಸಂಭಾಷಣೆಗೆ ಐಚ್ಛಿಕ ವ್ಯಾಪ್ತಿ                                                             |
| `type`                      | `TEXT NOT NULL`    | `factual`, `episodic`, `procedural`, `semantic` ಇವುಗಳಲ್ಲಿ ಒಂದು                              |
| `key`                       | `TEXT`             | ಸ್ಥಿರ ಅಪ್ಸರ್ಟ್ ಕೀ, ಉದಾ. `preference:i_prefer_python`                                        |
| `content`                   | `TEXT NOT NULL`    | ನೈಜ ವಾಸ್ತವಾಂಶದ ಪಠ್ಯ                                                                         |
| `metadata`                  | `TEXT`             | JSON ಬ್ಲಾಬ್ (ವರ್ಗ, ಹೊರತೆಗೆದ ಸಮಯ, ಮೂಲ, ...)                                                  |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 ಸ್ಟ್ರಿಂಗ್ಗಳು                                                                       |
| `expires_at`                | `TEXT`             | ಐಚ್ಛಿಕ ಅವಧಿಮುಕ್ತಾಯ; `NULL` ಎಂದರೆ ಶಾಶ್ವತ                                                     |
| `memory_id`                 | `INTEGER UNIQUE`   | UUIDಗಳು ↔ FTS5 rowidಗಳ ನಡುವೆ ಸಂಪರ್ಕ ಕಲ್ಪಿಸಲು `023_fix_memory_fts_uuid.sql` ಮೂಲಕ ಸೇರಿಸಲಾಗಿದೆ |

ಸೂಚ್ಯಂಕಗಳು: `api_key_id`, `session_id`, `type`, `expires_at`, ಜೊತೆಗೆ ಅನನ್ಯ
`memory_id` ಸೂಚ್ಯಂಕ.

**ಅಪ್ಸರ್ಟ್ ಅರ್ಥವಿಧಾನ**: `createMemory()` ಒಂದೇ
`(api_key_id, key)` ಹೊಂದಿರುವ ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಸಾಲನ್ನು ಹುಡುಕುತ್ತದೆ ಮತ್ತು ಕಂಡುಬಂದಾಗ ಅದನ್ನೇ ಅಲ್ಲಿಯೇ ನವೀಕರಿಸುತ್ತದೆ (`metadata` ಅನ್ನು
ಶ್ಯಾಲೋ ಸ್ಪ್ರೆಡ್ ಮೂಲಕ ವಿಲೀನಗೊಳಿಸುತ್ತದೆ). ಪುನರಾವರ್ತಿತ
ಆದ್ಯತೆಯ ಹೇಳಿಕೆಗಳಿಂದ ಕೋಷ್ಟಕವು ಮಿತಿಯಿಲ್ಲದೆ ಬೆಳೆಯುವುದನ್ನು ಇದು ತಡೆಯುತ್ತದೆ.

### ಪೂರ್ಣ-ಪಠ್ಯ ಹುಡುಕಾಟ (`memory_fts` ವರ್ಚುವಲ್ ಕೋಷ್ಟಕ)

`022_add_memory_fts5.sql`, `content` ಮತ್ತು
`key` ಮೇಲೊಂದು FTS5 ವರ್ಚುವಲ್ ಕೋಷ್ಟಕವನ್ನು ರಚಿಸುತ್ತದೆ. UUID
ಪ್ರಾಥಮಿಕ ಕೀ FTS5 ನ ಪೂರ್ಣಾಂಕ rowid ಗೆ ಜೋಡಣೆಯಾಗದ ನೈಜ-ಪ್ರಪಂಚದ ದೋಷವನ್ನು `023_fix_memory_fts_uuid.sql` ಸರಿಪಡಿಸುತ್ತದೆ — ಈ ಮೈಗ್ರೇಶನ್
`memory_id` ಕಾಲಮ್ ಅನ್ನು ಸೇರಿಸಿ, FTS ಕೋಷ್ಟಕವನ್ನು ಮರುರಚಿಸುತ್ತದೆ ಮತ್ತು INSERT, DELETE ಹಾಗೂ UPDATE ಸಂದರ್ಭಗಳಲ್ಲಿ FTS ಅನ್ನು ಸಿಂಕ್ನಲ್ಲಿ ಇರಿಸುವ ಟ್ರಿಗರ್ಗಳನ್ನು
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) ಸಂಪರ್ಕಿಸುತ್ತದೆ.

`semantic` ಮತ್ತು `hybrid` ತಂತ್ರಗಳಿಗಾಗಿ `retrieval.ts` ಇದನ್ನು ಬಳಸುತ್ತದೆ (ಕೆಳಗೆ ನೋಡಿ).
ಮರುಪಡೆಯುವಿಕೆ ಕೋಡ್ `hasTable("memory_fts")` ಮೂಲಕ ರಕ್ಷಣೆ ಒದಗಿಸುತ್ತದೆ ಮತ್ತು FTS ಕೋಷ್ಟಕ ಲಭ್ಯವಿಲ್ಲದಿದ್ದರೆ ಅಥವಾ FTS ಕ್ವೆರಿ ದೋಷವನ್ನು ಎಸೆದರೆ
ಕಾಲಾನುಕ್ರಮದ ಕ್ರಮಕ್ಕೆ ಹಿಂತಿರುಗುತ್ತದೆ.

### ಐಚ್ಛಿಕ: Qdrant (ವೆಕ್ಟರ್ ಸ್ಟೋರ್ ಹಂತ 2)

`src/lib/memory/qdrant.ts`, ಹಂತ 2
ವೆಕ್ಟರ್ ಸ್ಟೋರ್ ಆಗಿ ಐಚ್ಛಿಕ Qdrant ಏಕೀಕರಣವನ್ನು ಅಳವಡಿಸುತ್ತದೆ. ಎಂಜಿನ್ ಸೆಲೆಕ್ಟರ್
`memoryVectorStore === "qdrant"` ಆಗಿದ್ದಾಗ ಮಾತ್ರ ಮರುಪಡೆಯುವಿಕೆ Qdrant ಗೆ ರೂಟ್ ಆಗುತ್ತದೆ — ಡೀಫಾಲ್ಟ್ `"auto"` (ಮತ್ತು `"sqlite-vec"`)
Qdrant ಅನ್ನು **ಎಂದಿಗೂ** ಆಯ್ಕೆಮಾಡುವುದಿಲ್ಲ. Engine-ಟ್ಯಾಬ್ ಟಾಗಲ್ `qdrantEnabled` ಮತ್ತು
`memoryVectorStore` ಎರಡನ್ನೂ ಒಟ್ಟಿಗೆ ಹೊಂದಿಸುತ್ತದೆ: ಸಕ್ರಿಯಗೊಳಿಸುವುದರಿಂದ Qdrant ಪ್ರಾಥಮಿಕ ಸ್ಟೋರ್ ಆಗುತ್ತದೆ, ನಿಷ್ಕ್ರಿಯಗೊಳಿಸುವುದರಿಂದ
`"auto"` ಗೆ ಮರುಹೊಂದಿಸಲಾಗುತ್ತದೆ (#5597 — ಆ ಸರಿಪಡಿಸುವಿಕೆಗೆ ಮೊದಲು, ಯಾವುದೂ ಎಂಜಿನ್ ಸೆಲೆಕ್ಟರ್ಗೆ
ಬರೆಯದ ಕಾರಣ ಸಕ್ರಿಯಗೊಳಿಸುವಿಕೆ ನಿಷ್ಪರಿಣಾಮಕಾರಿಯಾಗಿತ್ತು). Qdrant ತಲುಪಲಾಗದಿದ್ದರೆ ಅಥವಾ ಏನನ್ನೂ ಹಿಂತಿರುಗಿಸದಿದ್ದರೆ, ಮರುಪಡೆಯುವಿಕೆಯು
sqlite-vec → FTS5 ಗೆ ಹಿಂತಿರುಗುತ್ತದೆ.

- `upsertSemanticMemoryPoint()` — ಕಾನ್ಫಿಗರ್ ಮಾಡಲಾದ embedding model ಬಳಸಿ `key + content` ಅನ್ನು embed ಮಾಡುತ್ತದೆ, collection ಅಸ್ತಿತ್ವದಲ್ಲಿರುವುದನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ (ಮೊದಲ ಬಳಕೆಯಲ್ಲಿ cosine-distance vectors ರಚಿಸುತ್ತದೆ), ಮತ್ತು `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}` payload ಹೊಂದಿರುವ point ಅನ್ನು upsert ಮಾಡುತ್ತದೆ.
- `searchSemanticMemory(query, topK, scope)` — query ಅನ್ನು embed ಮಾಡುತ್ತದೆ, `kind = "omniroute_memory"` ಆಧಾರದ ಮೇಲೆ filter ಮಾಡಲಾದ collection ಅನ್ನು ಹುಡುಕುತ್ತದೆ ಮತ್ತು ಐಚ್ಛಿಕವಾಗಿ `apiKeyId` / `sessionId` ಆಧಾರದ ಮೇಲೂ filter ಮಾಡುತ್ತದೆ. `topK` ಅನ್ನು `[1, 20]` ವ್ಯಾಪ್ತಿಗೆ ಮಿತಿಗೊಳಿಸುತ್ತದೆ.
- `deleteSemanticMemoryPoint(id)` — ಒಂದೇ point ಅನ್ನು ಅಳಿಸುತ್ತದೆ. SQLite row ತೆಗೆದುಹಾಕಿದ ನಂತರ `deleteMemory()` ಇದನ್ನು ಕರೆಯುತ್ತದೆ (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — `expiresAtUnix` ಕಳೆದಿರುವ ಅಥವಾ `createdAtUnix` retention cutoff ಗಿಂತ ಹಳೆಯದಾಗಿರುವ points ಅನ್ನು ಒಟ್ಟಾಗಿ ಅಳಿಸುತ್ತದೆ. dashboard ವಾಸ್ತವಿಕ ಸಂಖ್ಯೆಗಳನ್ನು ತೋರಿಸಲು ಮೊದಲು ಎಣಿಕೆ ಮಾಡುತ್ತದೆ.
- `checkQdrantHealth()` — latency ಸಹಿತ `GET /readyz` health probe.

settings UI, `/dashboard/memory` ನ **Engine tab** ನಲ್ಲಿ Qdrant config, health check, semantic search test ಮತ್ತು cleanup ಅನ್ನು ಒದಗಿಸುತ್ತದೆ. `src/app/api/settings/qdrant/` ಅಡಿಯಲ್ಲಿನ ಸಂಬಂಧಿತ routes ಎಲ್ಲವೂ v3.8.6 ರಿಂದ ಸಂಪರ್ಕಗೊಂಡಿವೆ:

| Route                                   | Method        | ವಿವರಣೆ                                |
| --------------------------------------- | ------------- | ------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdrant settings ಓದಿ / ನವೀಕರಿಸಿ        |
| `/api/settings/qdrant/health`           | `GET`         | Liveness probe + latency              |
| `/api/settings/qdrant/search`           | `POST`        | Semantic search test                  |
| `/api/settings/qdrant/cleanup`          | `POST`        | ಅವಧಿ ಮೀರಿದ / ಹಳೆಯ points ತೆಗೆದುಹಾಕಿ   |
| `/api/settings/qdrant/embedding-models` | `GET`         | ಲಭ್ಯವಿರುವ embedding models ಪಟ್ಟಿ ಮಾಡಿ |

**ವರ್ತನೆಯ ಟಿಪ್ಪಣಿಗಳು (ಏನನ್ನು ನಿರೀಕ್ಷಿಸಬಹುದು):**

- **Engine ಆಯ್ಕೆ** — Engine tab ನಲ್ಲಿ Qdrant ಅನ್ನು ಸಕ್ರಿಯಗೊಳಿಸುವುದರಿಂದ ಅದು ಪ್ರಾಥಮಿಕ store ಆಗುತ್ತದೆ (`memoryVectorStore="qdrant"` ಅನ್ನು ಹೊಂದಿಸುತ್ತದೆ); ನಿಷ್ಕ್ರಿಯಗೊಳಿಸುವುದರಿಂದ `"auto"` ಗೆ ಮರುಹೊಂದಿಸಲಾಗುತ್ತದೆ (#5597).
- **Back-fill ಇಲ್ಲ** — Qdrant ಸಕ್ರಿಯಗೊಳಿಸಿದ **ನಂತರ** ರಚಿಸಲಾದ/ನವೀಕರಿಸಲಾದ memories ಮಾತ್ರ ಅದರಲ್ಲಿ ಬರೆಯಲ್ಪಡುತ್ತವೆ (fire-and-forget dual-write). ಮೊದಲೇ ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ SQLite memories ಅನ್ನು migrate ಮಾಡಲಾಗುವುದಿಲ್ಲ; "Reindex Now" sqlite-vec index ಅನ್ನು ಮಾತ್ರ ಮರುನಿರ್ಮಿಸುತ್ತದೆ, Qdrant ಅನ್ನು ಅಲ್ಲ.
- **Vector dimension ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪತ್ತೆಯಾಗುತ್ತದೆ** — ಮೊದಲ ಬಳಕೆಯಲ್ಲಿನ ನೈಜ embedding ನಿಂದ; ಭರ್ತಿ ಮಾಡಲು ಯಾವುದೇ dimension field ಇಲ್ಲ. collection ಅಸ್ತಿತ್ವಕ್ಕೆ ಬಂದ ನಂತರ embedding model ಅನ್ನು ಬದಲಾಯಿಸುವುದನ್ನು **ಸ್ವಯಂಚಾಲಿತವಾಗಿ** ನಿರ್ವಹಿಸಲಾಗುವುದಿಲ್ಲ: ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ collection ಅನ್ನು ಬದಲಾಯಿಸದೆ ಬಿಡಲಾಗುತ್ತದೆ, dimension ಹೊಂದಿಕೆಯಾಗದ writes/searches ವಿಫಲವಾಗುತ್ತವೆ ಮತ್ತು sqlite-vec ಗೆ fallback ಆಗುತ್ತವೆ. embedders ಬದಲಾಯಿಸಲು collection ಅನ್ನು ಮರುರಚಿಸಿ (ಹೊಸ ಹೆಸರು ನೀಡಿ ಅಥವಾ Qdrant ನಲ್ಲಿ ಅದನ್ನು ಅಳಿಸಿ).
- **Distance metric** — ಯಾವಾಗಲೂ **Cosine** (collection ರಚಿಸುವಾಗ hardcode ಮಾಡಲಾಗಿದೆ; configure ಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ).
- **Auth** — API key ಮಾತ್ರ (`api-key` header ಆಗಿ ಕಳುಹಿಸಲಾಗುತ್ತದೆ; authentication ಇಲ್ಲದ local Docker ಗಾಗಿ ಐಚ್ಛಿಕ). JWT/RBAC ಬಳಸಲಾಗುವುದಿಲ್ಲ.
- **Config fields** — UI, `host`, `port`, `collection`, `embeddingModel`, `apiKey` ಅನ್ನು ಒದಗಿಸುತ್ತದೆ. `vectorSize` / `hnswEfConstruct` env/DB ನಲ್ಲಿ ಮಾತ್ರ ಲಭ್ಯವಿವೆ ಮತ್ತು collection ರಚನೆಗೆ `vectorSize` ಅನ್ನು ಬಳಸಲಾಗುವುದಿಲ್ಲ (dimension embedding ನಿಂದ ಬರುತ್ತದೆ).

### Vector quantization (int8 — opt-in, ಎರಡೂ backends)

ಸಂಗ್ರಹಿಸಲಾದ vectors ನ memory footprint ಅನ್ನು ಕಡಿಮೆ ಮಾಡಲು (~Float32 ಗಿಂತ 4× ಚಿಕ್ಕದು), ಸ್ವಲ್ಪ recall ನಷ್ಟದೊಂದಿಗೆ, ಎರಡೂ vector backends **opt-in int8 quantization** ಅನ್ನು ಬೆಂಬಲಿಸುತ್ತವೆ. ಎರಡರಲ್ಲೂ default ಆಗಿ ಇದು **off** ಆಗಿರುತ್ತದೆ — ಸ್ಪಷ್ಟವಾಗಿ ಸಕ್ರಿಯಗೊಳಿಸದ ಹೊರತು vectors full-precision ಆಗಿಯೇ ಉಳಿಯುತ್ತವೆ.

| Backend    | Setting                         | Type                           | Default  | ಎಲ್ಲಿ ಓದಲಾಗುತ್ತದೆ                                           |
| ---------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB key)   | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** ಅನ್ನು `qdrantQuantization` setting key ಮೂಲಕ ಪ್ರತಿ instance ಗೆ configure ಮಾಡಲಾಗುತ್ತದೆ (`PUT /api/settings/qdrant` ನಲ್ಲಿ `quantization` field ಆಗಿ ಒದಗಿಸಲಾಗಿದೆ). `"int8"` ಆಗಿರುವಾಗ, `buildQuantizationConfig()` scalar quantization (`always_ram`, quantile `0.99`) ಅನ್ನು ವಿನಂತಿಸುತ್ತದೆ ಮತ್ತು searches ನಲ್ಲಿ `rescore: true` ಸಕ್ರಿಯಗೊಳಿಸಲಾಗುತ್ತದೆ, ಇದರಿಂದ full-precision vectors, int8 candidate set ಅನ್ನು ಪರಿಷ್ಕರಿಸುತ್ತವೆ.
- **sqlite-vec** quantization **environment-only** ಆಗಿದೆ (DB setting ಅಲ್ಲ): local vectors ಅನ್ನು `vec_quantize_int8(?, 'unit')` ಮೂಲಕ `int8[dim]` column ಆಗಿ ಸಂಗ್ರಹಿಸಲು `MEMORY_VEC_QUANTIZATION=int8` ಅನ್ನು ಹೊಂದಿಸಿ. ಆಯ್ಕೆಮಾಡಿದ mode ಅನ್ನು `embedding_signature` ನಲ್ಲಿ (`:int8` suffix ಆಗಿ) ಸೇರಿಸಲಾಗುತ್ತದೆ, ಆದ್ದರಿಂದ modes ಬದಲಾಯಿಸಿದಾಗ `vec_memories` table ನ ಪೂರ್ಣ reindex ಪ್ರಚೋದಿತವಾಗುತ್ತದೆ — embedding model ಬದಲಾದಾಗ ಬಳಸಲಾಗುವ ಅದೇ lazy-backfill path.

## ಮೆಮೊರಿ ಪ್ರಕಾರಗಳು

`MemoryType` (`src/lib/memory/types.ts`):

| ಪ್ರಕಾರ       | ಬಳಸುವುದು                                                                                |
| ------------ | --------------------------------------------------------------------------------------- |
| `factual`    | ಆದ್ಯತೆಗಳು, ಸ್ಥಿರ ಬಳಕೆದಾರ ಸಂಗತಿಗಳು, ವರ್ತನೆಯ ಮಾದರಿಗಳು                                     |
| `episodic`   | ನಿರ್ದಿಷ್ಟ ಕ್ಷಣಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ನಿರ್ಧಾರಗಳು ("ನಾನು Postgres ಅನ್ನು ಆಯ್ಕೆ ಮಾಡಿದೆ")            |
| `procedural` | ಕಾರ್ಯಪ್ರವಾಹ / ಹೇಗೆ-ಮಾಡುವುದು ಮೆಮೊರಿ (ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ; ಪ್ರಸ್ತುತ ಸ್ವಯಂ-ಹೊರತೆಗೆಯುವಿಕೆ ಇಲ್ಲ) |
| `semantic`   | ವೆಕ್ಟರ್-ಸ್ಟೋರ್ ನಮೂದುಗಳಿಗಾಗಿ ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ                                             |

`MemoryConfig` ಮರುಪಡೆಯುವಿಕೆ ಕಾರ್ಯತಂತ್ರವು `exact`, `semantic`, ಅಥವಾ `hybrid` ಇವುಗಳಲ್ಲಿ ಒಂದಾಗಿರುತ್ತದೆ,
ಮತ್ತು ವ್ಯಾಪ್ತಿಯು `session`, `apiKey`, ಅಥವಾ `global` ಇವುಗಳಲ್ಲಿ ಒಂದಾಗಿರುತ್ತದೆ. `getMemorySettings()` ನಿಂದ
ಬರುವ ಡೀಫಾಲ್ಟ್ ವ್ಯಾಪ್ತಿಯು `apiKey` ಆಗಿದೆ.

## ಸಂಗತಿ ಹೊರತೆಗೆಯುವಿಕೆ (`extraction.ts`)

ಹೊರತೆಗೆಯುವಿಕೆಯು **regex-ಆಧಾರಿತವಾಗಿದೆ**, LLM-ಆಧಾರಿತವಲ್ಲ — ಇದು ಪ್ರಕ್ರಿಯೆಯೊಳಗೇ
`setImmediate()` ಮೂಲಕ ರನ್ ಆಗುವುದರಿಂದ ಪ್ರತಿಕ್ರಿಯೆ ಸ್ಟ್ರೀಮ್ ಅನ್ನು ಎಂದಿಗೂ ನಿರ್ಬಂಧಿಸುವುದಿಲ್ಲ:

- **ಆದ್ಯತೆ ಮಾದರಿಗಳು** → `MemoryType.FACTUAL`
  (ಉದಾ. `ನಾನು … ಅನ್ನು ಆದ್ಯತೆ ನೀಡುತ್ತೇನೆ`, `ನಾನು … ಅನ್ನು ತುಂಬಾ ಇಷ್ಟಪಡುತ್ತೇನೆ`, `ನನ್ನ ಮೆಚ್ಚಿನದು …`, `ನಾನು … ಅನ್ನು ದ್ವೇಷಿಸುತ್ತೇನೆ`)
- **ನಿರ್ಧಾರ ಮಾದರಿಗಳು** → `MemoryType.EPISODIC`
  (ಉದಾ. `ನಾನು … ಬಳಸುತ್ತೇನೆ`, `ನಾನು … ಆಯ್ಕೆ ಮಾಡಿದೆ`, `ನಾನು … ಅನ್ನು ಆರಿಸಿಕೊಂಡೆ`, `ನಾನು … ಅಳವಡಿಸಿಕೊಳ್ಳಲಿದ್ದೇನೆ`)
- **ವರ್ತನಾ ಮಾದರಿಗಳು** → `MemoryType.FACTUAL`
  (ಉದಾ. `ನಾನು ಸಾಮಾನ್ಯವಾಗಿ …`, `ನಾನು ಯಾವಾಗಲೂ …`, `ನಾನು … ಮಾಡಲು ಒಲವು ಹೊಂದಿದ್ದೇನೆ`)

ಪ್ರತಿಯೊಂದು ಹೊಂದಾಣಿಕೆಯನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಲಾಗುತ್ತದೆ (`trim`, ಖಾಲಿ ಜಾಗಗಳ ಸಂಕುಚನ, ಗರಿಷ್ಠ 500 ಅಕ್ಷರಗಳಿಗೆ ಮಿತಿ),
ಸ್ಥಿರವಾದ `factKey(category, content)` ಮೂಲಕ ಬ್ಯಾಚ್ನೊಳಗೆ ನಕಲುಗಳನ್ನು ತೆಗೆದುಹಾಕಲಾಗುತ್ತದೆ, ಮತ್ತು
`{category, extractedAt, source: "llm_response"}` ಮೆಟಾಡೇಟಾದೊಂದಿಗೆ
`createMemory()` ಮೂಲಕ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ. ಇನ್ಪುಟ್ ಪಠ್ಯವನ್ನು
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) ಗೆ ಮಿತಿಗೊಳಿಸಲಾಗಿದೆ — ಅದು ಹೆಚ್ಚು ಉದ್ದವಾಗಿರುವಾಗ, ತೀರಾ ಇತ್ತೀಚಿನ ಸಹಾಯಕ ವಿಷಯವು
ಯಾವಾಗಲೂ ಭಾಗವಹಿಸುವಂತೆ ಪಠ್ಯದ **ಕೊನೆಯ ಭಾಗವನ್ನು** ಬಳಸಲಾಗುತ್ತದೆ.

`extractFactsFromText(text)` ಅನ್ನು ಪರೀಕ್ಷೆಗಳಿಗಾಗಿ ರಫ್ತು ಮಾಡಲಾಗಿದೆ ಮತ್ತು ಇದು ಸಂಗತಿಗಳನ್ನು ಸಂಗ್ರಹಿಸದೆ
ರಚನಾತ್ಮಕ ಸಂಗತಿಗಳನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ.

## ಮರುಪಡೆಯುವಿಕೆ (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` ಮುಖ್ಯ ಪ್ರವೇಶ ಬಿಂದುವಾಗಿದೆ. ಇದು:

1. `MemoryConfigSchema` ಮೂಲಕ ಕಾನ್ಫಿಗ್ ಅನ್ನು ಸಾಮಾನ್ಯೀಕರಿಸಿ ಮೌಲ್ಯೀಕರಿಸುತ್ತದೆ.
2. `enabled` false ಆಗಿದ್ದಾಗ ಅಥವಾ `maxTokens <= 0` ಆಗಿದ್ದಾಗ ತಕ್ಷಣವೇ `[]` ಅನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ.
3. `maxTokens` ಅನ್ನು `[1, 8000]` ವ್ಯಾಪ್ತಿಗೆ ಸೀಮಿತಗೊಳಿಸುತ್ತದೆ.
4. ಹಳೆಯ ಡೇಟಾಬೇಸ್ಗಳು ಕಾರ್ಯನಿರ್ವಹಿಸುವುದನ್ನು ಮುಂದುವರಿಸಲು ಆಧುನಿಕ `memories` ಟೇಬಲ್ ಅಸ್ತಿತ್ವದಲ್ಲಿದೆಯೇ
   (ಹಳೆಯ `memory` ಟೇಬಲ್ಗೆ ವಿರುದ್ಧವಾಗಿ) ಎಂಬುದನ್ನು ಪತ್ತೆ ಮಾಡುತ್ತದೆ.
5. ಅವಧಿ ಮುಕ್ತಾಯದ ಸಂರಕ್ಷಣಾ ಷರತ್ತು
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), ಐಚ್ಛಿಕ
   ಸೆಷನ್ ವ್ಯಾಪ್ತಿ, ಮತ್ತು ಐಚ್ಛಿಕ `retentionDays` ಕಟ್ಆಫ್ನೊಂದಿಗೆ ಮೂಲ ಕ್ವೆರಿಯನ್ನು ರಚಿಸುತ್ತದೆ.
6. ಕಾರ್ಯತಂತ್ರದ ಆಧಾರದ ಮೇಲೆ ವಿಭಜಿಸುತ್ತದೆ:
   - **`exact`** (ಡೀಫಾಲ್ಟ್): ಕಾಲಾನುಕ್ರಮದ `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: `config.query` ನೀಡಲಾಗಿದ್ದು `memory_fts` ಅಸ್ತಿತ್ವದಲ್ಲಿದ್ದರೆ,
     `memory_fts MATCH ?` ಅನ್ನು JOIN ಮಾಡಿ FTS ಶ್ರೇಣಿಯ ಪ್ರಕಾರ ಕ್ರಮಗೊಳಿಸುತ್ತದೆ; FTS 0 ಸಾಲುಗಳನ್ನು ಹಿಂದಿರುಗಿಸಿದಾಗ
     ಕಾಲಾನುಕ್ರಮಕ್ಕೆ ಹಿಂತಿರುಗುತ್ತದೆ.
   - **`hybrid`**: FTS ಫಲಿತಾಂಶಗಳು (ಹೆಚ್ಚಿನ ಪ್ರಸ್ತುತತೆ) ಮತ್ತು ಕಾಲಾನುಕ್ರಮದ ಸೆಟ್ನ
     ಯೂನಿಯನ್, id ಮೂಲಕ ನಕಲುಗಳನ್ನು ತೆಗೆದುಹಾಕಲಾಗುತ್ತದೆ.
7. ಕ್ವೆರಿ ಒದಗಿಸಿದಾಗ `content`, `key`, ಮತ್ತು `metadata` JSON ಮೇಲೆ
   ಕೀವರ್ಡ್ ಪ್ರಸ್ತುತತೆ ಸ್ಕೋರ್ (`getRelevanceScore`) ಅನ್ನು ಲೆಕ್ಕಾಚಾರ ಮಾಡುತ್ತದೆ. ಶೂನ್ಯ ಸ್ಕೋರ್ ಹೊಂದಿರುವ ಸಾಲುಗಳನ್ನು
   ಫಿಲ್ಟರ್ ಮಾಡಿ ತೆಗೆದುಹಾಕಲಾಗುತ್ತದೆ.
8. ಮೊದಲು ಸ್ಕೋರ್ನ ಅವರೋಹಣ ಕ್ರಮದಲ್ಲಿ, ನಂತರ `createdAt` ಅವರೋಹಣ ಕ್ರಮದಲ್ಲಿ ವಿಂಗಡಿಸುತ್ತದೆ.
9. ಶ್ರೇಯಾಂಕಿತ ಪಟ್ಟಿಯಲ್ಲಿ ಕ್ರಮವಾಗಿ ಸಾಗುತ್ತಾ, ಸಂಚಿತ `estimateTokens(content)` (≈ `length / 4`)
   ಬಜೆಟ್ನೊಳಗೆ ಇರುವವರೆಗೆ ನಮೂದುಗಳನ್ನು ಸ್ವೀಕರಿಸುತ್ತದೆ. ಯಾವುದೇ ಹೊಂದಾಣಿಕೆಗಳಿದ್ದರೆ ಯಾವಾಗಲೂ
   ಕನಿಷ್ಠ ಒಂದು ನಮೂದನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ.

`estimateTokens` ಅನ್ನು ರಫ್ತು ಮಾಡಲಾಗಿದೆ ಮತ್ತು ಮರುಪಡೆಯುವಿಕೆ, ಸಾರಾಂಶೀಕರಣ, ಹಾಗೂ MCP
`omniroute_memory_search` ಪರಿಕರವು ಇದನ್ನು ಬಳಸುತ್ತವೆ.

## ಇಂಜೆಕ್ಷನ್ (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. ಎಲ್ಲಾ ಮೆಮೊರಿ ವಿಷಯಗಳನ್ನು ಒಂದೇ `Memory context: …` ಸ್ಟ್ರಿಂಗ್ ಆಗಿ ಸೇರಿಸುತ್ತದೆ.
2. ಪ್ರೊವೈಡರ್ ಹೆಸರಿನ ಆಧಾರದ ಮೇಲೆ ಕಾರ್ಯತಂತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡುತ್ತದೆ:
   - **ಸಿಸ್ಟಮ್ ಸಂದೇಶ** (OpenAI, Anthropic, Gemini, … ಗೆ ಡೀಫಾಲ್ಟ್) — ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಯಾವುದೇ ಸಿಸ್ಟಮ್ ಸಂದೇಶಗಳಿಗಿಂತ ಮೊದಲು
     `{role: "system", content: memoryText}` ಅನ್ನು ಸೇರಿಸುತ್ತದೆ, ಇದರಿಂದ ಬಳಕೆದಾರರ ಸಿಸ್ಟಮ್ ಪ್ರಾಂಪ್ಟ್ಗಳು ಇನ್ನೂ ಆದ್ಯತೆ ಪಡೆಯುತ್ತವೆ.
   - **ಬಳಕೆದಾರ ಸಂದೇಶ** (ಪರ್ಯಾಯ) — `PROVIDERS_WITHOUT_SYSTEM_MESSAGE` ನಲ್ಲಿರುವ
     ಪ್ರೊವೈಡರ್ಗಳಿಗಾಗಿ: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. ಇವು ಸಿಸ್ಟಮ್ ಪಾತ್ರವನ್ನು
     ತಿರಸ್ಕರಿಸುತ್ತವೆ ಮತ್ತು ಇಲ್ಲದಿದ್ದರೆ 400 ದೋಷವನ್ನು ನೀಡುತ್ತವೆ (GLM/Zhipu ಗಾಗಿ issue #1701 ನೋಡಿ).
3. `memory.injection.injected` ಅಡಿಯಲ್ಲಿ ಎಣಿಕೆ, ಕಾರ್ಯತಂತ್ರ ಮತ್ತು ಮಾಡೆಲ್ ಅನ್ನು ಲಾಗ್ ಮಾಡುತ್ತದೆ.

ತಮ್ಮದೇ ರೂಟಿಂಗ್ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಬೇಕಾದ ಕಾಲರ್ಗಳಿಗಾಗಿ `providerSupportsSystemMessage(provider)` ಅನ್ನು ಎಕ್ಸ್ಪೋರ್ಟ್ ಮಾಡಲಾಗಿದೆ. ಸುರಕ್ಷತೆಗಾಗಿ ಅಜ್ಞಾತ ಪ್ರೊವೈಡರ್ಗಳು ಡೀಫಾಲ್ಟ್ ಆಗಿ `true`
(ಸಿಸ್ಟಮ್ ಪಾತ್ರಕ್ಕೆ ಅನುಮತಿ ಇದೆ) ಅನ್ನು ಬಳಸುತ್ತವೆ.

## ಸೆಟ್ಟಿಂಗ್ಗಳು (`settings.ts`)

ಮೆಮೊರಿ ಕಾನ್ಫಿಗರೇಶನ್ ಅನ್ನು env vars ನಲ್ಲಿ ಅಲ್ಲ, **DB ಸೆಟ್ಟಿಂಗ್ಗಳ ಟೇಬಲ್ನಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ**.
`getMemorySettings()` ಎಂಬುದು `getSettings()` ನಿಂದ ಓದಿ, ಫಲಿತಾಂಶವನ್ನು
ಪ್ರಕ್ರಿಯೆಯೊಳಗೆ ಕ್ಯಾಶ್ ಮಾಡುತ್ತದೆ; ಬರೆಯುವಿಕೆಯ ನಂತರ ಸೆಟ್ಟಿಂಗ್ಗಳ PUT
ರೂಟ್ನಿಂದ `invalidateMemorySettingsCache()` ಅನ್ನು ಕರೆ ಮಾಡಲಾಗುತ್ತದೆ.

### ಲೆಗಸಿ ಫೀಲ್ಡ್ಗಳು (ಎಲ್ಲಾ ಆವೃತ್ತಿಗಳು)

| DB ಕೀ                 | ಪ್ರಕಾರ   | ಡೀಫಾಲ್ಟ್                                                | UI ನಿಯಂತ್ರಣ                                                      |
| --------------------- | -------- | ------------------------------------------------------- | ---------------------------------------------------------------- |
| `memoryEnabled`       | ಬೂಲಿಯನ್  | `false` (v3.8.30 ರಿಂದ ಡೀಫಾಲ್ಟ್ ಆಗಿ ಆಫ್)                 | ಮೆಮೊರಿ ಆನ್/ಆಫ್                                                   |
| `memoryMaxTokens`     | ಪೂರ್ಣಾಂಕ | `2000` (ವ್ಯಾಪ್ತಿ `0–16000`)                             | ಇಂಜೆಕ್ಷನ್ಗಾಗಿ ಟೋಕನ್ ಬಜೆಟ್                                        |
| `memoryRetentionDays` | ಪೂರ್ಣಾಂಕ | `30` (ವ್ಯಾಪ್ತಿ `1–365`)                                 | ಧಾರಣಾ ಅವಧಿ                                                       |
| `memoryStrategy`      | ಎನಮ್     | `"hybrid"` (`recent`, `semantic`, `hybrid` ಗಳಲ್ಲಿ ಒಂದು) | ಮರುಪಡೆಯುವಿಕೆ ಕಾರ್ಯತಂತ್ರ                                          |
| `skillsEnabled`       | ಬೂಲಿಯನ್  | `false`                                                 | ಪ್ರತಿ-ಕೀ ಕೌಶಲ್ಯ ಇಂಜೆಕ್ಷನ್ ಅನ್ನು ಟಾಗಲ್ ಮಾಡುತ್ತದೆ (SKILLS.md ನೋಡಿ) |

ಗಮನಿಸಿ: UI ಕಾರ್ಯತಂತ್ರ `"recent"` ಅನ್ನು `toMemoryRetrievalConfig()` ಮೂಲಕ ಆಂತರಿಕ `"exact"` ಮರುಪಡೆಯುವಿಕೆ
ಕಾರ್ಯತಂತ್ರಕ್ಕೆ ಮ್ಯಾಪ್ ಮಾಡಲಾಗುತ್ತದೆ (ಕಾಲಾನುಕ್ರಮದ ಕ್ರಮ).

### ಹೊಸ ಫೀಲ್ಡ್ಗಳು (v3.8.6, ಯೋಜನೆ 21 D9)

ಫೀಲ್ಡ್ ವಿವರಣೆಗಳಿಗಾಗಿ ಮೇಲಿನ "ಸೆಟ್ಟಿಂಗ್ಗಳ ವಿಸ್ತರಣೆ" ವಿಭಾಗವನ್ನೂ ನೋಡಿ.

| DB ಕೀ                       | API ಫೀಲ್ಡ್               | ಡೀಫಾಲ್ಟ್ |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Qdrant-ಸಂಬಂಧಿತ DB ಕೀಗಳನ್ನು (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` ಡೀಫಾಲ್ಟ್ `"omniroute_memory"`,
`qdrantEmbeddingModel` ಡೀಫಾಲ್ಟ್ `"openai/text-embedding-3-small"`) `qdrant.ts` ನಲ್ಲಿರುವ
`normalizeQdrantConfig()` ಓದುತ್ತದೆ.

### ಎನ್ವಿರಾನ್ಮೆಂಟ್ ವೇರಿಯೇಬಲ್ಗಳು (v3.8.6)

ಆರು ಐಚ್ಛಿಕ env vars ಎಂಜಿನ್ನ ರನ್ಟೈಮ್ ನಡವಳಿಕೆಯನ್ನು ಹೊಂದಿಸುತ್ತವೆ (`.env.example` ನಲ್ಲಿ ದಾಖಲಿಸಲಾಗಿದೆ):

| ವೇರಿಯೇಬಲ್                       | ಡೀಫಾಲ್ಟ್                   | ವಿವರಣೆ                                                                                                                                                                 |
| ------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | ಎಂಬೆಡಿಂಗ್ ಕ್ಯಾಶ್ TTL (5 ನಿಮಿಷ)                                                                                                                                         |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | ಎಂಬೆಡಿಂಗ್ LRU ಕ್ಯಾಶ್ನಲ್ಲಿನ ಗರಿಷ್ಠ ನಮೂದುಗಳು                                                                                                                             |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js ಮಾಡೆಲ್ಗಾಗಿ HF ರೆಪೊ                                                                                                                                     |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | ಸ್ಥಿರ potion ಮಾಡೆಲ್ಗಾಗಿ HF ರೆಪೊ                                                                                                                                        |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | ಡೌನ್ಲೋಡ್ ಮಾಡಿದ ಮಾಡೆಲ್ಗಳನ್ನು ಸಂಗ್ರಹಿಸುವ ಸ್ಥಳ                                                                                                                            |
| `MEMORY_VEC_TOP_K`              | `20`                       | ವೆಕ್ಟರ್ ಹುಡುಕಾಟಕ್ಕಾಗಿ ಡೀಫಾಲ್ಟ್ top-K                                                                                                                                   |
| `MEMORY_RRF_K`                  | `60`                       | ಹೈಬ್ರಿಡ್ ಹುಡುಕಾಟಕ್ಕಾಗಿ RRF k ಸ್ಥಿರಾಂಕ                                                                                                                                  |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | ಸ್ಥಳೀಯ sqlite-vec ವೆಕ್ಟರ್ಗಳನ್ನು ಕ್ವಾಂಟೈಸ್ ಮಾಡಿ ಸಂಗ್ರಹಿಸಲು `int8` ಗೆ ಹೊಂದಿಸಿ (~4× ಚಿಕ್ಕದು; ಆಯ್ಕೆಮಾಡಿದಾಗ ಮಾತ್ರ). ಮೋಡ್ ಬದಲಾವಣೆಯು ಮರು-ಇಂಡೆಕ್ಸಿಂಗ್ ಅನ್ನು ಕಡ್ಡಾಯಗೊಳಿಸುತ್ತದೆ. |

## ಸಾರಾಂಶಗೊಳಿಸುವಿಕೆ (`summarization.ts`)

ಕೀಲಿಯ ಮೆಮೊರಿಗಳ ಒಟ್ಟು ಚಾಲನೆಯಲ್ಲಿರುವ ಟೋಕನ್ ಮೊತ್ತವು ಬಜೆಟ್ ಮೀರಿದಾಗ `summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` ಹಳೆಯ ವಿಷಯವನ್ನು ಸಂಕ್ಷಿಪ್ತಗೊಳಿಸುತ್ತದೆ. ಇದು `created_at` ಆಧಾರದಲ್ಲಿ DESC ಕ್ರಮದಲ್ಲಿ ಸಾಲುಗಳ ಮೂಲಕ ಪುನರಾವರ್ತಿಸುತ್ತದೆ, ಮಿತಿಯೊಳಗೆ ಹೊಂದುವ ಸಾಲುಗಳನ್ನು ಉಳಿಸಿಕೊಳ್ಳುತ್ತದೆ ಮತ್ತು ಉಳಿದವುಗಳ `content` ಅನ್ನು ಮೂಲ ವಿಷಯದ ಮೊದಲ ಮೂರು ವಾಕ್ಯಗಳಿಂದ ಅದೇ ಸ್ಥಳದಲ್ಲಿ ಬದಲಾಯಿಸುತ್ತದೆ. `tokensSaved` ಎಂಬುದು ಹಳೆಯ ಮತ್ತು ಹೊಸ ವಿಷಯಗಳ ನಡುವಿನ `estimateTokens` ವ್ಯತ್ಯಾಸವಾಗಿದೆ.

ಈ ರೂಟೀನ್ ಪ್ರಸ್ತುತ ಚಾಟ್ ಪೈಪ್ಲೈನ್ನಲ್ಲಿ **ಲಭ್ಯವಿದೆ, ಆದರೆ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಕರೆಯಲಾಗುವುದಿಲ್ಲ** — ನಿಮಗೆ ನಿರಂತರ ಸಂಕ್ಷಿಪ್ತಗೊಳಿಸುವಿಕೆ ಅಗತ್ಯವಿದ್ದರೆ ಇದನ್ನು cron, ನಿರ್ವಾಹಕ ಕ್ರಿಯೆ ಅಥವಾ `MemoryConfig.autoSummarize` ಸಂಯೋಜನೆಯಿಂದ ಕರೆ ಮಾಡಿ. ಡೇಟಾ ನಷ್ಟವು ಏಕಮುಖವಾಗಿದೆ: ಮೂಲ ಪಠ್ಯವನ್ನು ತಿದ್ದಿ ಬರೆಯಲಾಗುತ್ತದೆ.

## REST API

ಎಲ್ಲಾ ಎಂಡ್ಪಾಯಿಂಟ್ಗಳಿಗೆ ನಿರ್ವಹಣಾ ದೃಢೀಕರಣ (`requireManagementAuth`) ಅಗತ್ಯವಿದೆ.

### ಪ್ರಮುಖ ಮೆಮೊರಿ ಎಂಡ್ಪಾಯಿಂಟ್ಗಳು (ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ + ನವೀಕರಿಸಿದ)

| ವಿಧಾನ    | ಪಥ                   | ವಿವರಣೆ                                                                                                                                                                                              |
| -------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | ಫಿಲ್ಟರ್ಗಳೊಂದಿಗೆ ಪುಟೀಕೃತ ಪಟ್ಟಿ: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. ಪ್ರತಿಕ್ರಿಯೆಯು `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` ಅನ್ನು ಒಳಗೊಂಡಿರುತ್ತದೆ |
| `POST`   | `/api/memory`        | ನಮೂದನ್ನು ರಚಿಸುತ್ತದೆ (Zod-ಮೌಲ್ಯೀಕೃತ: `content`, `key`, ಐಚ್ಛಿಕ `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). `(apiKeyId, key)` ಮೇಲೆ ಅಪ್ಸರ್ಟ್ ಮಾಡುವ `createMemory()` ಅನ್ನು ಕರೆಯುತ್ತದೆ     |
| `GET`    | `/api/memory/[id]`   | UUID ಮೂಲಕ ಒಂದೇ ನಮೂದನ್ನು ಪಡೆಯುತ್ತದೆ                                                                                                                                                                  |
| `PUT`    | `/api/memory/[id]`   | ನಮೂದು ಕ್ಷೇತ್ರಗಳನ್ನು (`type`, `key`, `content`, `metadata`) ನವೀಕರಿಸುತ್ತದೆ. ಬಾಡಿ: `MemoryUpdatePutSchema`. ಎಂಬೆಡಿಂಗ್ ಮೂಲ ಲಭ್ಯವಿದ್ದರೆ ವೆಕ್ಟರ್ ಅನ್ನೂ ಸಿಂಕ್ ಮಾಡುತ್ತದೆ.                                   |
| `DELETE` | `/api/memory/[id]`   | ನಮೂದನ್ನು ಅಳಿಸುತ್ತದೆ; `vec_memories` (D15) ಮತ್ತು Qdrantನಿಂದಲೂ ಸಾಧ್ಯವಾದಷ್ಟು ಅಳಿಸುತ್ತದೆ. ನಮೂದು ಇಲ್ಲದಿದ್ದಾಗ 404 ಹಿಂತಿರುಗಿಸುತ್ತದೆ.                                                                       |
| `GET`    | `/api/memory/health` | `verifyExtractionPipeline("health-check")` ಅನ್ನು ಚಲಾಯಿಸುತ್ತದೆ — ರಚನೆ→ಪಟ್ಟಿ→ಅಳಿಸುವಿಕೆ ಎಂಬ ಪೂರ್ಣ-ಚಕ್ರ ಪರೀಕ್ಷೆ. `{working, latencyMs, error?}` ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ                                  |

### ಹೊಸ ಮೆಮೊರಿ ಎಂಜಿನ್ ಎಂಡ್ಪಾಯಿಂಟ್ಗಳು (ಯೋಜನೆ 21)

| ವಿಧಾನ  | ಪಥ                                | ವಿವರಣೆ                                                                                                                                                                                               |
| ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | `retrieveMemories` ನ ಪ್ರಾಯೋಗಿಕ ಚಾಲನೆ — ಸ್ಕೋರ್, ಟಿಯರ್ ಮತ್ತು ಟೋಕನ್ಗಳೊಂದಿಗೆ ಶ್ರೇಯಾಂಕಿತ ಫಲಿತಾಂಶಗಳನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ. ಬಾಡಿ: `RetrievePreviewSchema`. ಮೆಮೊರಿಗಳನ್ನು ಸೇರಿಸುವುದಿಲ್ಲ ಅಥವಾ ಮಾರ್ಪಡಿಸುವುದಿಲ್ಲ. |
| `GET`  | `/api/memory/embedding-providers` | ಎಂಬೆಡಿಂಗ್ ಮಾದರಿಗಳಿರುವ ಪೂರೈಕೆದಾರರನ್ನು ಪಟ್ಟಿಮಾಡುತ್ತದೆ ಮತ್ತು ಯಾವುವು ಸಂರಚಿಸಲಾದ API ಕೀಲಿಯನ್ನು ಹೊಂದಿವೆ ಎಂಬುದನ್ನು ಸೂಚಿಸುತ್ತದೆ.                                                                              |
| `GET`  | `/api/memory/engine-status`       | ಸಂಪೂರ್ಣ ಎಂಜಿನ್ ಸ್ಥಿತಿಯನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ: ಕೀವರ್ಡ್ ಟಿಯರ್, ಎಂಬೆಡಿಂಗ್ ರೆಸಲ್ಯೂಶನ್, ವೆಕ್ಟರ್ ಸ್ಟೋರ್ ಅಂಕಿಅಂಶಗಳು, Qdrant ಆರೋಗ್ಯ, ಮರುಶ್ರೇಯಾಂಕ ಸಂರಚನೆ. ಆಕಾರ: `MemoryEngineStatusSchema`.                    |
| `POST` | `/api/memory/summarize`           | ಮೆಮೊರಿ ಸಂಕ್ಷಿಪ್ತಗೊಳಿಸುವಿಕೆಯನ್ನು ಕೈಯಾರೆ ಪ್ರಚೋದಿಸುತ್ತದೆ. ಬಾಡಿ: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). `{candidates, tokensSaved}` ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ.                   |
| `POST` | `/api/memory/reindex`             | `needs_reindex=1` ಹೊಂದಿರುವ ಮೆಮೊರಿಗಳಿಗಾಗಿ ವೆಕ್ಟರ್ ಮರುಸೂಚಿಕೆಯನ್ನು ಪ್ರಚೋದಿಸುತ್ತದೆ. ಬಾಡಿ: `MemoryReindexSchema` (`force`). `{started, pending}` ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ.                                  |

### ಸೆಟ್ಟಿಂಗ್ಗಳ ಎಂಡ್ಪಾಯಿಂಟ್ಗಳು

| ವಿಧಾನ  | ಪಥ                                      | ವಿವರಣೆ                                                                                                                         |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/memory`                  | ಪ್ರಸ್ತುತ ಸಾಮಾನ್ಯೀಕರಿಸಿದ `MemorySettingsExtended` (7 ಹೊಸ ಕ್ಷೇತ್ರಗಳು + ಲೆಗಸಿ)                                                    |
| `PUT`  | `/api/settings/memory`                  | `MemorySettingsExtendedSchema` ನಿಂದ ಯಾವುದೇ ಕ್ಷೇತ್ರವನ್ನು ನವೀಕರಿಸುತ್ತದೆ (ಒಟ್ಟು 12 ಕ್ಷೇತ್ರಗಳು)                                    |
| `GET`  | `/api/settings/qdrant`                  | ಪ್ರಸ್ತುತ Qdrant ಸೆಟ್ಟಿಂಗ್ಗಳು (`QdrantSettingsSchema`)                                                                          |
| `PUT`  | `/api/settings/qdrant`                  | Qdrant ಸೆಟ್ಟಿಂಗ್ಗಳನ್ನು ನವೀಕರಿಸುತ್ತದೆ. ಬಾಡಿ: `QdrantSettingsUpdateSchema`. `apiKey` = ಖಾಲಿ ಸ್ಟ್ರಿಂಗ್ ಕೀಲಿಯನ್ನು ತೆಗೆದುಹಾಕುತ್ತದೆ. |
| `GET`  | `/api/settings/qdrant/health`           | ಸಂರಚಿಸಲಾದ Qdrant ನಿದರ್ಶನದ ವಿರುದ್ಧ ಜೀವಂತಿಕೆ ಪರಿಶೀಲನೆ. `QdrantHealthResultSchema` ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ.                        |
| `POST` | `/api/settings/qdrant/search`           | Qdrant ವಿರುದ್ಧ ಸೀಮ್ಯಾಂಟಿಕ್ ಹುಡುಕಾಟ ಪರೀಕ್ಷೆ. ಬಾಡಿ: `QdrantSearchSchema` (`query`, `topK`).                                      |
| `POST` | `/api/settings/qdrant/cleanup`          | ಅವಧಿ ಮೀರಿದ / ಹಳೆಯ ಮೆಮೊರಿಗಳ Qdrant ಪಾಯಿಂಟ್ಗಳನ್ನು ತೆಗೆದುಹಾಕುತ್ತದೆ.                                                               |
| `GET`  | `/api/settings/qdrant/embedding-models` | Qdrantಗೆ ಲಭ್ಯವಿರುವ ಎಂಬೆಡಿಂಗ್ ಮಾದರಿಗಳನ್ನು ಪಟ್ಟಿಮಾಡುತ್ತದೆ.                                                                       |

`/api/memory` ಪಟ್ಟಿ ಕ್ವೆರಿಯು `page`-ಆಧಾರಿತ ಪುಟೀಕರಣ (`parsePaginationParams`) **ಅಥವಾ** ನೇರ `offset` ಅನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ — `offset` ಇದ್ದಾಗ ಅದಕ್ಕೆ ಆದ್ಯತೆ ನೀಡಲಾಗುತ್ತದೆ ಮತ್ತು ಪ್ರತಿಕ್ರಿಯೆಯ ಆಕಾರಕ್ಕಾಗಿ ವ್ಯುತ್ಪನ್ನ `page` ಅನ್ನು ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತದೆ.

## MCP ಪರಿಕರಗಳು (`open-sse/mcp-server/tools/memoryTools.ts`)

MCP ಸರ್ವರ್ ಸಕ್ರಿಯಗೊಂಡಾಗ, ಮೂರು ಮೆಮೊರಿ ಪರಿಕರಗಳನ್ನು ನೋಂದಾಯಿಸಲಾಗುತ್ತದೆ:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → `retrieveMemories()` ಅನ್ನು ಆವರಿಸುತ್ತದೆ. v3.8.6 (D16) ರಿಂದ, `strategy` ಅನ್ನು
  `"exact"` ಎಂದು ಹಾರ್ಡ್ಕೋಡ್ ಮಾಡುವ ಬದಲು `getMemorySettings()` ನಿಂದ ಓದಲಾಗುತ್ತದೆ.
  `query` ಒದಗಿಸಲಾಗಿದ್ದು, `strategy` `semantic` ಅಥವಾ `hybrid` ಆಗಿದ್ದರೆ, ಲಭ್ಯವಿರುವಾಗ
  ವೆಕ್ಟರ್ ಸ್ಟೋರ್ ಅನ್ನು ಬಳಸಲಾಗುತ್ತದೆ.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → `createMemory()` ಅನ್ನು ಆವರಿಸುತ್ತದೆ. 4 ಅಂಗೀಕೃತ ಪ್ರಕಾರಗಳನ್ನು ಮಾತ್ರ
  ಸ್ವೀಕರಿಸುತ್ತದೆ: `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → ಹೊಂದಿಕೆಯಾಗುವ
  ನಮೂದುಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡುತ್ತದೆ, ಐಚ್ಛಿಕವಾಗಿ ನಿರ್ದಿಷ್ಟ ಸಮಯಮುದ್ರೆಗೆ ಮೊದಲು ರಚಿಸಲಾದವುಗಳ
  ಆಧಾರದ ಮೇಲೆ ಫಿಲ್ಟರ್ ಮಾಡುತ್ತದೆ, ನಂತರ ಪ್ರತಿಯೊಂದನ್ನೂ `deleteMemory()` ಮೂಲಕ ಅಳಿಸುತ್ತದೆ
  (ಇದು sqlite-vec + Qdrant ನಿಂದ ವೆಕ್ಟರ್ಗಳನ್ನೂ ತೆಗೆದುಹಾಕುತ್ತದೆ).

ಟ್ರಾನ್ಸ್ಪೋರ್ಟ್ ಮತ್ತು ವ್ಯಾಪ್ತಿಯ ವಿವರಗಳಿಗಾಗಿ [MCP-SERVER.md](./MCP-SERVER.md) ನೋಡಿ.

## ಡ್ಯಾಶ್ಬೋರ್ಡ್ (ಮೆಮೊರಿ ಸ್ಟುಡಿಯೋ)

`src/app/(dashboard)/dashboard/memory/page.tsx` ಈಗ **3-ಟ್ಯಾಬ್ ಸ್ಟುಡಿಯೋ** ಆಗಿದೆ:

### ಟ್ಯಾಬ್: ಮೆಮೊರಿಗಳು

- ಪರಿಕಲ್ಪನೆ ಕಾರ್ಡ್ (ಕುಗ್ಗಿಸಬಹುದಾದ "ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ" ವಿವರಣೆ).
- ನೈಜ-ಸಮಯದ ಪಟ್ಟಿ, ಹುಡುಕಾಟ ಮತ್ತು ಪುಟವಿಂಗಡಣೆ (300 ms ಡಿಬೌನ್ಸ್).
- ಪ್ರಕಾರದ ಫಿಲ್ಟರ್ (`factual` / `episodic` / `procedural` / `semantic` / ಎಲ್ಲವೂ).
- ಮೆಮೊರಿ ಸೇರಿಸುವ ಮೋಡಲ್ (ಕೀಲಿ, ವಿಷಯ, ಪ್ರಕಾರ).
- ಇನ್ಲೈನ್ ಸಂಪಾದನೆ (ಪೆನ್ಸಿಲ್ ಬಟನ್ → `PUT /api/memory/[id]`).
- ಪ್ರತಿ ಸಾಲಿಗೆ ಅಳಿಸುವಿಕೆ (ದೃಢೀಕರಣ ಸಂವಾದದೊಂದಿಗೆ).
- ಪ್ರಸ್ತುತ ಪುಟದ JSON ರಫ್ತು; ಫೈಲ್ ಪಿಕರ್ ಮೂಲಕ JSON ಆಮದು.
- ಅಂಕಿಅಂಶ ಕಾರ್ಡ್ಗಳು: `totalEntries`, `tokensUsed`, `hitRate`.
- "ಹಳೆಯವುಗಳನ್ನು ಸಂಕುಚಿತಗೊಳಿಸಿ" ಬಟನ್ → `POST /api/memory/summarize` (ಮೊದಲು
  ಡ್ರೈ-ರನ್ ಅಭ್ಯರ್ಥಿಗಳ ಸಂಖ್ಯೆಯನ್ನು ತೋರಿಸುತ್ತದೆ, ನಂತರ ದೃಢೀಕರಿಸುತ್ತದೆ).
- `GET /api/memory/health` ನಿಂದ ನಿಯಂತ್ರಿಸಲ್ಪಡುವ ಹಸಿರು/ಕೆಂಪು ಸ್ಥಿತಿ ಬಿಂದು.

### ಟ್ಯಾಬ್: ಪ್ಲೇಗ್ರೌಂಡ್

- ಕ್ವೆರಿ ಇನ್ಪುಟ್ + ತಂತ್ರದ ಆಯ್ಕೆಗಾರ (ನಿಖರ / ಸೀಮ್ಯಾಂಟಿಕ್ / ಹೈಬ್ರಿಡ್) + ಟೋಕನ್ ಬಜೆಟ್.
- "ಅನುಕರಿಸಿ" → `POST /api/memory/retrieve-preview` — ಶ್ರೇಯಾಂಕಿತ ಫಲಿತಾಂಶಗಳನ್ನು
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore` ಜೊತೆಗೆ ತೋರಿಸುತ್ತದೆ.
- ಯಾವ ಎಂಬೆಡಿಂಗ್ ಮೂಲ / ವೆಕ್ಟರ್ ಸ್ಟೋರ್ ಬಳಸಲಾಗಿದೆ ಮತ್ತು ಫಾಲ್ಬ್ಯಾಕ್ ಸಂಭವಿಸಿದೆಯೇ
  ಎಂಬುದನ್ನು ತೋರಿಸುವ ರೆಸಲ್ಯೂಶನ್ ಪ್ಯಾನೆಲ್.

### ಟ್ಯಾಬ್: ಎಂಜಿನ್

- ಎಂಜಿನ್ ಸ್ಥಿತಿ ಪ್ಯಾನೆಲ್ (ಕೀವರ್ಡ್ FTS5 ಚಿಪ್, ಎಂಬೆಡಿಂಗ್ ಚಿಪ್, ವೆಕ್ಟರ್ ಸ್ಟೋರ್ ಚಿಪ್,
  Qdrant ಆರೋಗ್ಯ ಚಿಪ್, ಮರುಶ್ರೇಯಾಂಕ ಚಿಪ್).
- "ಈಗ ಮರುಸೂಚಿಕೆ ಮಾಡಿ" ಬಟನ್ → `POST /api/memory/reindex`.
- ಎಂಬೆಡಿಂಗ್ ಮೂಲ ಆಯ್ಕೆಗಾರ (ಸ್ವಯಂ / ರಿಮೋಟ್ / ಸ್ಥಿರ / ಟ್ರಾನ್ಸ್ಫಾರ್ಮರ್ಗಳು + ಟಾಗಲ್ಗಳು).
- Qdrant ಸಂರಚನಾ ಕಾರ್ಡ್ (ಸಕ್ರಿಯಗೊಳಿಸುವ ಟಾಗಲ್, ಹೋಸ್ಟ್/ಪೋರ್ಟ್/ಕಲೆಕ್ಷನ್/ಕೀಲಿ,
  ಸಂಪರ್ಕ ಪರೀಕ್ಷೆ, ಸೀಮ್ಯಾಂಟಿಕ್ ಹುಡುಕಾಟ ಪರೀಕ್ಷೆ, ಸ್ವಚ್ಛಗೊಳಿಸುವಿಕೆ).
- ಮರುಶ್ರೇಯಾಂಕ ಸಂರಚನಾ ಕಾರ್ಡ್ (ಸಕ್ರಿಯಗೊಳಿಸುವ ಟಾಗಲ್, ಪೂರೈಕೆದಾರ/ಮಾದರಿ ಆಯ್ಕೆಗಾರ).

ಹಳೆಯ/ಜಾಗತಿಕ ಸೆಟ್ಟಿಂಗ್ಗಳ ಮೇಲ್ಮೈಗಾಗಿ ಮೆಮೊರಿ ಮತ್ತು Qdrant ಸೆಟ್ಟಿಂಗ್ಗಳು
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) ಅಡಿಯಲ್ಲಿಯೂ
ಲಭ್ಯವಿವೆ.

## ಕ್ಯಾಶಿಂಗ್

`src/lib/memory/store.ts`, `getMemory(id)` ಓದುವಿಕೆಗಳಿಗಾಗಿ ಪ್ರಕ್ರಿಯೆಯೊಳಗಿನ
LRU-ಸದೃಶ ಕ್ಯಾಶ್ ಅನ್ನು (`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`,
20 % ಅತ್ಯಂತ ಹಳೆಯ ನಮೂದುಗಳ ತೆರವುಗೊಳಿಸುವಿಕೆಯೊಂದಿಗೆ) ನಿರ್ವಹಿಸುತ್ತದೆ. ಜೊತೆಗೆ,
ತಮ್ಮದೇ ವ್ಯಾಪ್ತಿಯ ಕ್ಯಾಶ್ ಬಯಸುವ ಕಾಲರ್ಗಳು ಬಳಸುವ `get`/`set`/`invalidate`
ವಿಧಾನಗಳಿರುವ ಸಾಮಾನ್ಯ ಕೀಲಿ/ಮೌಲ್ಯ `memoryCache` ಪದರವನ್ನೂ
(`src/lib/memory/cache.ts`) ನಿರ್ವಹಿಸುತ್ತದೆ (1 000-ನಮೂದುಗಳ LRU,
ಡೀಫಾಲ್ಟ್ TTL 5 min).

## ಗೌಪ್ಯತೆ & ಜೀವನಚಕ್ರ

- ಮೆಮೊರಿಯ ಮಾಲೀಕತ್ವವು API ಕೀ id ಆಗಿದೆ (`chatCore.ts` ನಲ್ಲಿರುವ
  `resolveMemoryOwnerId`). `apiKeyInfo.id` ಇಲ್ಲದಿದ್ದರೆ ಮರುಪಡೆಯುವಿಕೆ, ಇಂಜೆಕ್ಷನ್
  ಅಥವಾ ಹೊರತೆಗೆಯುವಿಕೆ ಯಾವುದೂ ನಡೆಯುವುದಿಲ್ಲ.
- ಭವಿಷ್ಯದ `expires_at` ಹೊಂದಿರುವ ನಮೂದುಗಳನ್ನು ಮರುಪಡೆಯುವಿಕೆಯಿಂದ ಫಿಲ್ಟರ್ ಮಾಡಲಾಗುತ್ತದೆ;
  `retentionDays` ಮೀರಿದ ಹಳೆಯ ನಮೂದುಗಳನ್ನು `retrieveMemories` ನಲ್ಲಿರುವ
  `created_at >= cutoff` ಷರತ್ತಿನ ಮೂಲಕ ಹೊರಗಿಡಲಾಗುತ್ತದೆ.
- ಶಾಶ್ವತ ಅಳಿಸುವಿಕೆಗಾಗಿ, `DELETE /api/memory/[id]` ಅಥವಾ `omniroute_memory_clear` ಬಳಸಿ.
- ಹೊರತೆಗೆಯುವಿಕೆಯನ್ನು `setImmediate` ಮೂಲಕ ಪ್ರಾರಂಭಿಸಿ ಅದರ ಪೂರ್ಣಗೊಳ್ಳುವಿಕೆಗಾಗಿ
  ಕಾಯಲಾಗುವುದಿಲ್ಲ; ವೈಫಲ್ಯಗಳನ್ನು `memory.extraction.background.failed` ಅಡಿಯಲ್ಲಿ
  ಲಾಗ್ ಮಾಡಲಾಗುತ್ತದೆ ಮತ್ತು ಅವು ಕಾಲರ್ಗೆ ಎಂದಿಗೂ ತಲುಪುವುದಿಲ್ಲ.
- ಪರಿಶೀಲನಾ ರೌಂಡ್-ಟ್ರಿಪ್ಗಳು (`verifyExtractionPipeline`) ತಮ್ಮದೇ ಪರೀಕ್ಷಾ
  ನಮೂದುಗಳನ್ನು `finally` ಬ್ಲಾಕ್ನಲ್ಲಿ ತೆರವುಗೊಳಿಸುತ್ತವೆ.

## ಇದನ್ನೂ ನೋಡಿ

- [SKILLS.md](./SKILLS.md) — `skillsEnabled` ಸೆಟ್ಟಿಂಗ್ ಮೆಮೊರಿಯ ಜೊತೆಗೆ ಟೂಲ್
  ವ್ಯಾಖ್ಯಾನಗಳನ್ನು ಇಂಜೆಕ್ಟ್ ಮಾಡುತ್ತದೆ.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP ಟ್ರಾನ್ಸ್ಪೋರ್ಟ್ / ಸ್ಕೋಪ್ಗಳು.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ವಿಸ್ತೃತ API ವ್ಯಾಪ್ತಿ.
- ಮೂಲ ಮಾಡ್ಯೂಲ್ಗಳು:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + ಹೈಬ್ರಿಡ್ RRF
  - `src/lib/memory/embedding/index.ts` — ಬಹು-ಮೂಲ ಎಂಬೆಡಿಂಗ್ ಲೇಯರ್
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — ಎಲ್ಲಾ ಮೆಮೊರಿ API ಬಾಡಿಗಳಿಗಾಗಿ Zod ಸ್ಕೀಮಾಗಳು
  - `src/shared/schemas/qdrant.ts` — Qdrant ಸೆಟ್ಟಿಂಗ್ಗಳು/ಕಾರ್ಯಾಚರಣೆಗಳಿಗಾಗಿ Zod ಸ್ಕೀಮಾಗಳು
  - `src/lib/db/memoryVec.ts` — `memory_vec_meta` ಗಾಗಿ CRUD
  - `src/lib/db/migrations/015_create_memories.sql`,
    `022_add_memory_fts5.sql`, `023_fix_memory_fts_uuid.sql`,
    `083_memory_vec.sql`
  - `src/app/api/memory/route.ts`, `[id]/route.ts`, `health/route.ts`
  - `src/app/api/memory/retrieve-preview/route.ts`
  - `src/app/api/memory/engine-status/route.ts`
  - `src/app/api/memory/embedding-providers/route.ts`
  - `src/app/api/memory/summarize/route.ts`
  - `src/app/api/memory/reindex/route.ts`
  - `src/app/api/settings/memory/route.ts`
  - `src/app/api/settings/qdrant/route.ts` + ಉಪ-ರೂಟ್ಗಳು
  - `src/app/(dashboard)/dashboard/memory/` — Studio UI (ಪುಟ + ಕಾಂಪೊನೆಂಟ್ಗಳು +
    ಟ್ಯಾಬ್ಗಳು + ಹುಕ್ಗಳು)
  - `open-sse/handlers/chatCore.ts` (ಇಂಜೆಕ್ಷನ್ / ಹೊರತೆಗೆಯುವಿಕೆ ವೈರಿಂಗ್)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## ಎಂಬೆಡಿಂಗ್ ಪ್ರೊವೈಡರ್ ಆಯ್ಕೆಮಾಡುವುದು (v3.8.16+)

OmniRoute ನ ಮೆಮೊರಿ ಎಂಜಿನ್ **ನಾಲ್ಕು ಎಂಬೆಡಿಂಗ್ ಮೂಲಗಳನ್ನು** (`src/lib/memory/embedding/`) ಬೆಂಬಲಿಸುತ್ತದೆ. ಪ್ರತಿಯೊಂದೂ **ವಿಳಂಬ, ವೆಚ್ಚ, ಮಾಡೆಲ್ ಗುಣಮಟ್ಟ ಮತ್ತು ಸೆಟಪ್ ಸಂಕೀರ್ಣತೆ** ವಿಷಯದಲ್ಲಿ ವಿಭಿನ್ನ ಹೊಂದಾಣಿಕೆಗಳನ್ನು ಹೊಂದಿದೆ.

### ಎಂಬೆಡಿಂಗ್ ಮೂಲಗಳು

| ಪ್ರೊವೈಡರ್      | ಮೂಲ                                                      | ವಿಳಂಬ                           | ವೆಚ್ಚ                  | ಗುಣಮಟ್ಟ                                        | ಸೆಟಪ್                            |
| -------------- | -------------------------------------------------------- | ------------------------------- | ---------------------- | ---------------------------------------------- | -------------------------------- |
| `transformers` | ಸ್ಥಳೀಯ ONNX ಮಾಡೆಲ್ (Xenova/all-MiniLM-L6-v2)             | ~50-150ms (CPU)                 | ಉಚಿತ                   | ಉತ್ತಮ                                          | `npm install` ಮಾತ್ರ              |
| `static`       | ಪೂರ್ವ-ಲೆಕ್ಕಾಚಾರ ಮಾಡಿದ ವೆಕ್ಟರ್ಗಳು (ಕ್ಯಾಶ್ ಮಾಡಲಾಗಿದೆ)      | <1ms                            | ಉಚಿತ                   | ಅನ್ವಯಿಸುವುದಿಲ್ಲ (ಕ್ಯಾಶ್ ಹಿಟ್ ಅನ್ನು ಅವಲಂಬಿಸಿದೆ) | ಯಾವುದೂ ಇಲ್ಲ                      |
| `remote`       | OpenAI / Cohere / Voyage API                             | ~100-300ms                      | $0.02-0.10/1M ಟೋಕನ್ಗಳು | ಅತ್ಯುತ್ತಮ                                      | API ಕೀ                           |
| `auto`         | ರನ್ಟೈಮ್ನಲ್ಲಿ ಲಭ್ಯವಿರುವ ಅತ್ಯುತ್ತಮ ಮೂಲವನ್ನು ಆಯ್ಕೆಮಾಡುತ್ತದೆ | ಆಯ್ಕೆಮಾಡಿದ ಮೂಲದಂತೆಯೇ            | ಉಚಿತ                   | ಆಯ್ಕೆಮಾಡಿದ ಮೂಲದಂತೆಯೇ                           | ಯಾವುದೂ ಇಲ್ಲ                      |
| _(ಕ್ಯಾಶ್)_     | ಯಾವುದೇ ಮೂಲದ ಮೇಲಿರುವ ಇನ್-ಮೆಮೊರಿ LRU ಲೇಯರ್                 | <1ms (ಹಿಟ್), ಪೂರ್ಣ ವಿಳಂಬ (ಮಿಸ್) | ಉಚಿತ                   | ಆಧಾರವಾಗಿರುವ ಮೂಲದಂತೆಯೇ                          | ಸದಾ ಆನ್ (ಆಯ್ಕೆಮಾಡಬಹುದಾದ ಮೂಲವಲ್ಲ) |

### ನಿರ್ಧಾರ ವೃಕ್ಷ

```
                  ನಿಮ್ಮ ಡಿಪ್ಲಾಯ್ಮೆಂಟ್ ಸಂದರ್ಭ ಯಾವುದು?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  DEV/TEST    ಸಣ್ಣ PROD   ದೊಡ್ಡ PROD    EDGE / ಆಫ್ಲೈನ್
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (ಉಚಿತ, API ಇಲ್ಲ)            (ಅತ್ಯುತ್ತಮ ಗುಣಮಟ್ಟ)   (ಇಂಟರ್ನೆಟ್ ಇಲ್ಲ)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            ಮೇಲೆ ಯಾವಾಗಲೂ `cache` ಲೇಯರ್ ಸೇರಿಸಿ
            (LruCache ಯಾವುದೇ ಪ್ರೊವೈಡರ್ ಅನ್ನು ಸುತ್ತುವರಿಯುತ್ತದೆ)
```

### ಡೇಟಾಬೇಸ್ & API ಕಾನ್ಫಿಗರೇಶನ್

ಮೆಮೊರಿ ಎಂಬೆಡಿಂಗ್ ಆಯ್ಕೆಗಳನ್ನು ಪರಿಸರ ವೇರಿಯಬಲ್ಗಳ ಮೂಲಕವಲ್ಲದೆ Settings API/UI ಮೂಲಕ ಕಾನ್ಫಿಗರ್ ಮಾಡಲಾಗುತ್ತದೆ. Settings ಅಡಿಯಲ್ಲಿರುವ ಸಂಬಂಧಿತ ಸೆಟ್ಟಿಂಗ್ಗಳ ಡೇಟಾಬೇಸ್ ಕೀಗಳು (`src/lib/memory/settings.ts` ನಲ್ಲಿರುವ `normalizeMemorySettings`) ಇವು:

- `memoryEmbeddingSource`: `"transformers"` (ಸ್ಥಳೀಯ), `"remote"` (API-ಆಧಾರಿತ, ಉದಾ. OpenAI), `"static"` (ಬಾಹ್ಯ ಸ್ಟೋರ್), ಅಥವಾ `"auto"`
- `memoryEmbeddingProviderModel`: ರಿಮೋಟ್/ಸ್ಟ್ಯಾಟಿಕ್ ಮೂಲಗಳಿಗಾಗಿ ಮಾಡೆಲ್ ಗುರುತಿಸುವಿಕೆ (ಉದಾ., `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, ಅಥವಾ `"auto"`

#### ಸ್ಥಳೀಯ ಮಾಡೆಲ್ (`transformers`)

ಸ್ಥಳೀಯ ಮಾಡೆಲ್ಗಳನ್ನು ರನ್ ಮಾಡಲು ಆಂತರಿಕವಾಗಿ transformers.js ಅನ್ನು ಬಳಸುತ್ತದೆ:

```bash
# ಕೋಡ್ನಲ್ಲಿ ಓದಲಾಗುವ ಪರಿಸರ ವೇರಿಯಬಲ್ಗಳು (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF ಮಾಡೆಲ್ ರೆಪೊ
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF ಸ್ಟ್ಯಾಟಿಕ್ ಪೋಶನ್ ಮಾಡೆಲ್
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # ಕ್ಯಾಶ್ ಡೈರೆಕ್ಟರಿ
```

#### LRU ಎಂಬೆಡಿಂಗ್ ಕ್ಯಾಶ್

ಕ್ಯಾಶ್ ಡೀಫಾಲ್ಟ್ ಆಗಿ ಸದಾ ಆನ್ ಆಗಿರುತ್ತದೆ ಮತ್ತು ಪರಿಸರ ವೇರಿಯಬಲ್ಗಳ ಮೂಲಕ ಕಾನ್ಫಿಗರ್ ಮಾಡಲಾಗುತ್ತದೆ:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # ಕ್ಯಾಶ್ ಮಾಡಲಾದ ಐಟಂಗಳ ಗರಿಷ್ಠ ಸಂಖ್ಯೆ
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 ನಿಮಿಷ)
```

### ಕಾರ್ಯಕ್ಷಮತೆಯ ಅಂಕಿಅಂಶಗಳು

ಸಾಮಾನ್ಯ 4-ಕೋರ್ x86 ಸರ್ವರ್ನಲ್ಲಿನ ಬೆಂಚ್ಮಾರ್ಕ್ (ಪ್ರತಿ ಪಠ್ಯವು ~100 ಟೋಕನ್ಗಳು):

| ಪೂರೈಕೆದಾರ            | p50   | p95   | p99   | 1M ಎಂಬೆಡ್ಡಿಂಗ್ಗಳ ವೆಚ್ಚ             |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | ಉಚಿತ                               |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Qdrant ಹೋಸ್ಟಿಂಗ್ ಅನ್ನು ಅವಲಂಬಿಸಿದೆ  |
| `cache` (ಹಿಟ್)       | <1ms  | <1ms  | 2ms   | ಉಚಿತ                               |

---

## ವಾಸ್ತವಾಂಶ ಹೊರತೆಗೆಯುವಿಕೆ ಮಾದರಿಗಳು (v3.8.16+)

`extraction.ts` ಮಾಡ್ಯೂಲ್ (`src/lib/memory/extraction.ts`) ಸಂಭಾಷಣೆಯ ಸಂದೇಶಗಳಿಂದ ರಚನಾತ್ಮಕ ವಾಸ್ತವಾಂಶಗಳನ್ನು ಹೊರತೆಗೆಯಲು **ರೆಜೆಕ್ಸ್ ಮಾದರಿ ಹೊಂದಾಣಿಕೆಯನ್ನು** ಬಳಸುತ್ತದೆ. ಈ ಮಾದರಿಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದರಿಂದ ನಿಮ್ಮ ಬಳಕೆಯ ಸಂದರ್ಭಕ್ಕೆ ಹೊರತೆಗೆಯುವಿಕೆಯ ಗುಣಮಟ್ಟವನ್ನು ಸರಿಹೊಂದಿಸಲು ಸಹಾಯವಾಗುತ್ತದೆ.

### ಡೀಫಾಲ್ಟ್ ಮಾದರಿ ವರ್ಗಗಳು

| ವರ್ಗ                | ಉದಾಹರಣೆ ಮಾದರಿ                                                                               | ಸೆರೆಹಿಡಿಯುವುದು                 |
| ------------------- | ------------------------------------------------------------------------------------------- | ------------------------------ |
| PREFERENCE_PATTERNS | `"ನಾನು <X> ಅನ್ನು ಆದ್ಯತೆ ನೀಡುತ್ತೇನೆ"`, `"ನನಗೆ <X> ಇಷ್ಟ"`, `"ನಾನು <X> ಅನ್ನು ದ್ವೇಷಿಸುತ್ತೇನೆ"`  | ಬಳಕೆದಾರರ ಆದ್ಯತೆಗಳು             |
| DECISION_PATTERNS   | `"ನಾನು <X> ಬಳಸುತ್ತೇನೆ"`, `"ನಾನು <X> ಮಾಡಲು ನಿರ್ಧರಿಸಿದೆ"`, `"ನಾನು <X> ಅನ್ನು ಆಯ್ಕೆ ಮಾಡಿಕೊಂಡೆ"` | ಬಳಕೆದಾರರ ನಿರ್ಧಾರಗಳು (ಘಟನಾತ್ಮಕ) |
| PATTERN_PATTERNS    | `"ನಾನು ಸಾಮಾನ್ಯವಾಗಿ <X>"`, `"ನಾನು ಯಾವಾಗಲೂ <X>"`, `"ನಾನು ಎಂದಿಗೂ <X>"`                         | ನಿರಂತರ ವರ್ತನಾ ಮಾದರಿಗಳು         |

### ಉದಾಹರಣೆ ಮಾದರಿಗಳು (ಸರಳೀಕೃತ)

```ts
// src/lib/memory/extraction.ts ನಿಂದ
const PREFERENCE_PATTERNS = [
  /\bI\s+(?:really\s+)?prefer\s+([^.,\n]+)/gi,
  /\bI\s+(?:really\s+)?like\s+([^.,\n]+)/gi,
  /\bI\s+(?:hate|dislike|avoid)\s+([^.,\n]+)/gi,
];
const DECISION_PATTERNS = [
  /\bI'?(?:ll|will)\s+use\s+([^.,\n]+)/gi,
  /\bI\s+(?:have\s+)?decided\s+(?:to\s+)?([^.,\n]+)/gi,
];
const PATTERN_PATTERNS = [/\bI\s+usually\s+([^.,\n]+)/gi, /\bI\s+always\s+([^.,\n]+)/gi];
```

### ಏನನ್ನು ಹೊರತೆಗೆಯಲಾಗುತ್ತದೆ

ಬಳಕೆದಾರರು ಹೀಗೆ ಹೇಳಿದಾಗ:

> "ನಾನು TypeScript ಅನ್ನು ಆದ್ಯತೆ ನೀಡುತ್ತೇನೆ. ಈ ಪ್ರಾಜೆಕ್ಟ್ಗೆ Postgres ಬಳಸುತ್ತೇನೆ. push ಮಾಡುವ ಮೊದಲು ನಾನು ಯಾವಾಗಲೂ commit ಮಾಡುತ್ತೇನೆ. ನನಗೆ Python ಇಷ್ಟವಿಲ್ಲ."
> ಹೊರತೆಗೆಯುವಿಕೆಯು 4 ಸ್ಮೃತಿಗಳನ್ನು ಉತ್ಪಾದಿಸುತ್ತದೆ:
>
> | ಕೀ                                   | ವರ್ಗ    | ಪ್ರಕಾರ   | ವಿಷಯ                      |
> | ------------------------------------ | ------- | -------- | ------------------------- |
> | `preference:typescript`              | ಆದ್ಯತೆ  | ವಾಸ್ತವಿಕ | "TypeScript"              |
> | `decision:postgres_for_this_project` | ನಿರ್ಧಾರ | ಘಟನಾತ್ಮಕ | "ಈ ಪ್ರಾಜೆಕ್ಟ್ಗೆ Postgres" |
> | `pattern:commit_before_pushing`      | ಮಾದರಿ   | ವಾಸ್ತವಿಕ | "push ಮಾಡುವ ಮೊದಲು commit" |
> | `preference:python`                  | ಆದ್ಯತೆ  | ವಾಸ್ತವಿಕ | "Python"                  |

### ಹೊರತೆಗೆಯುವಿಕೆಯ ಮಿತಿಗಳು

ಅನಿಯಂತ್ರಿತ ಹೊರತೆಗೆಯುವಿಕೆಯನ್ನು ತಡೆಯಲು, ಈ ಕೆಳಗಿನ ಮಿತಿಗಳು ಅನ್ವಯಿಸುತ್ತವೆ:

| ಕನಿಷ್ಠ ವಿಷಯದ ಉದ್ದ | 3 ಅಕ್ಷರಗಳು |
| ಗರಿಷ್ಠ ವಿಷಯದ ಉದ್ದ | 500 ಅಕ್ಷರಗಳು |

### ಹೊರತೆಗೆಯುವಿಕೆಯನ್ನು ಯಾವಾಗ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಬೇಕು

ಮೆಮೊರಿ ಸಕ್ರಿಯವಾಗಿರುವಾಗಲೆಲ್ಲಾ ಹೊರತೆಗೆಯುವಿಕೆಯು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನಡೆಯುತ್ತದೆ; ಇದಕ್ಕಾಗಿ ಪ್ರತ್ಯೇಕವಾಗಿ
ಹೊರತೆಗೆಯುವಿಕೆ-ಮಾತ್ರ ಟಾಗಲ್ ಇಲ್ಲ. ಅದನ್ನು ಆಫ್ ಮಾಡಲು, ಮೆಮೊರಿಯನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿ (`enabled: false`
ಅನ್ನು `PUT /api/settings/memory` ಮೂಲಕ). ಈ ಸಂದರ್ಭಗಳಲ್ಲಿ ಹಾಗೆ ಮಾಡುವುದನ್ನು ಪರಿಗಣಿಸಿ:

- ನೀವು ಹೆಚ್ಚಿನ ಸಂದೇಶ ಪ್ರಮಾಣವನ್ನು ಹೊಂದಿದ್ದು, ಹೊರತೆಗೆಯುವಿಕೆಯ ವೆಚ್ಚವು ಗಮನಾರ್ಹವಾಗಿದ್ದರೆ
- ನಿಮ್ಮ ಸಂಭಾಷಣೆಗಳು ಬಹುತೇಕ ತಾತ್ಕಾಲಿಕವಾಗಿದ್ದು (ಚಾಟ್, ಡೀಬಗಿಂಗ್), ದೀರ್ಘಕಾಲೀನ ಮೌಲ್ಯವನ್ನು ಹೊಂದಿಲ್ಲದಿದ್ದರೆ
- ನೀವು ಈಗಾಗಲೇ ಕಸ್ಟಮ್ ಪ್ಲಗಿನ್ಗಳ ಮೂಲಕ ಸಂದರ್ಭವನ್ನು ಸೆರೆಹಿಡಿಯುತ್ತಿದ್ದರೆ

---

## ಹೈಬ್ರಿಡ್ RRF ಸರಿಹೊಂದಿಸುವಿಕೆ (v3.8.16+)

**Reciprocal Rank Fusion (RRF)** ಅಲ್ಗಾರಿದಮ್ FTS5 (ಕೀವರ್ಡ್) ಮತ್ತು ವೆಕ್ಟರ್ (ಅರ್ಥಾಧಾರಿತ) ಫಲಿತಾಂಶಗಳನ್ನು ಸಂಯೋಜಿಸುತ್ತದೆ. ಕೆಳಗಿನ ಶ್ರೇಣಿಯ ಫಲಿತಾಂಶಗಳಿಗೆ ಎಷ್ಟು ತೂಕ ನೀಡಬೇಕು ಎಂಬುದನ್ನು `k` ಪ್ಯಾರಾಮೀಟರ್ ನಿಯಂತ್ರಿಸುತ್ತದೆ.

### ಸೂತ್ರ

ಪ್ರತಿ ಅಭ್ಯರ್ಥಿ ಮೆಮೊರಿಗೆ, RRF ಸ್ಕೋರ್ ಹೀಗಿರುತ್ತದೆ:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

ಇಲ್ಲಿ:

- `k` ಸ್ಥಿರಾಂಕವಾಗಿದೆ (ಡೀಫಾಲ್ಟ್ 60)
- `rank_i(d)` ಎಂಬುದು i-ನೇ ಮರುಪಡೆಯುವಿಕೆ ವ್ಯವಸ್ಥೆಯಲ್ಲಿ (FTS, ವೆಕ್ಟರ್) `d` ಡಾಕ್ಯುಮೆಂಟ್ನ ಶ್ರೇಣಿಯಾಗಿದೆ
- ಎಲ್ಲಾ ಮರುಪಡೆಯುವಿಕೆ ವ್ಯವಸ್ಥೆಗಳ ಮೇಲೆ ಮೊತ್ತವನ್ನು ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತದೆ

### `k` ಫಲಿತಾಂಶಗಳ ಮೇಲೆ ಹೇಗೆ ಪರಿಣಾಮ ಬೀರುತ್ತದೆ

| `k` ಮೌಲ್ಯ             | ಪರಿಣಾಮ                                                                                           | ಇದಕ್ಕೆ ಅತ್ಯುತ್ತಮ                           |
| --------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| `k=0`                 | ಶುದ್ಧ ಶ್ರೇಣಿ ಸಂಯೋಜನೆ (ಸುಗಮಗೊಳಿಸುವಿಕೆ ಇಲ್ಲ)                                                       | ಸೈದ್ಧಾಂತಿಕ ಮೂಲಮಾನ                          |
| `k=10-30`             | ಅಗ್ರ ಫಲಿತಾಂಶಗಳಿಗೆ ಹೆಚ್ಚಿನ ತೂಕ ನೀಡುತ್ತದೆ, ಕೆಳಗಿನ ಶ್ರೇಣಿಯ ಕೊಡುಗೆ ತೀರಾ ಕಡಿಮೆ                        | ಅಗ್ರ-3 ಫಲಿತಾಂಶಗಳು ಸಾಮಾನ್ಯವಾಗಿ ಸರಿಯಾಗಿರುವಾಗ |
| **`k=60`** (ಡೀಫಾಲ್ಟ್) | ಸಮತೋಲಿತ — ಅಗ್ರ-10 ಫಲಿತಾಂಶಗಳೆಲ್ಲವೂ ಅರ್ಥಪೂರ್ಣವಾಗಿ ಕೊಡುಗೆ ನೀಡುತ್ತವೆ                                 | ಸಾಮಾನ್ಯ-ಉದ್ದೇಶದ ಮರುಪಡೆಯುವಿಕೆ               |
| `k=100+`              | ಹೆಚ್ಚು ಸಮತಟ್ಟಾದ — ಕೆಳಗಿನ ಶ್ರೇಣಿಯ ಫಲಿತಾಂಶಗಳೂ ಅನೇಕ ವ್ಯವಸ್ಥೆಗಳಲ್ಲಿ ಕಾಣಿಸಿಕೊಂಡರೆ ಪ್ರಾಬಲ್ಯ ಸಾಧಿಸಬಹುದು | recall > precision ನಿರ್ಣಾಯಕವಾಗಿರುವಾಗ       |

### ಪ್ರಾಯೋಗಿಕವಾಗಿ `k` ಅನ್ನು ಸರಿಹೊಂದಿಸುವುದು

```bash
# ಡೀಫಾಲ್ಟ್
MEMORY_RRF_K=60

# ಆಕ್ರಮಣಕಾರಿ ನಿಖರತೆ (ಸಣ್ಣ ಮೆಮೊರಿ, ಕೆಲವು ಡಾಕ್ಯುಮೆಂಟ್ಗಳು)
MEMORY_RRF_K=20

# ಗರಿಷ್ಠ ಮರುಪಡೆಯುವಿಕೆ (ದೊಡ್ಡ ಮೆಮೊರಿ, ವೈವಿಧ್ಯಮಯ ಕ್ವೆರಿಗಳು)
MEMORY_RRF_K=120
```

**`k=20` ಹೊಂದಿರುವ ಉದಾಹರಣೆ:**

- FTS ಶ್ರೇಣಿ 1 → ಕೊಡುಗೆ `1/21 = 0.048`
- FTS ಶ್ರೇಣಿ 10 → ಕೊಡುಗೆ `1/30 = 0.033`
- ವೆಕ್ಟರ್ ಶ್ರೇಣಿ 1 → ಕೊಡುಗೆ `0.048`
- ಸಂಯೋಜಿತ ಗರಿಷ್ಠ: `0.096`

**`k=60` ಹೊಂದಿರುವ ಉದಾಹರಣೆ:**

- FTS ಶ್ರೇಣಿ 1 → ಕೊಡುಗೆ `1/61 = 0.016`
- FTS ಶ್ರೇಣಿ 10 → ಕೊಡುಗೆ `1/70 = 0.014`
- ವೆಕ್ಟರ್ ಶ್ರೇಣಿ 1 → ಕೊಡುಗೆ `0.016`
- ಸಂಯೋಜಿತ ಗರಿಷ್ಠ: `0.033`

ಹೆಚ್ಚಿನ `k` ಇದ್ದಾಗ, ಅಗ್ರ-1 ಮತ್ತು ಶ್ರೇಣಿ-10 ನಡುವಿನ **ಸಾಪೇಕ್ಷ ವ್ಯತ್ಯಾಸ** ಚಿಕ್ಕದಾಗಿರುತ್ತದೆ, ಆದ್ದರಿಂದ ಅಲ್ಗಾರಿದಮ್ ಅಗ್ರ-ಶ್ರೇಣಿಯ ವಿಶ್ವಾಸಕ್ಕಿಂತ **ಮರುಪಡೆಯುವಿಕೆ ವ್ಯವಸ್ಥೆಗಳಾದ್ಯಂತ ಒಮ್ಮತವನ್ನು** ಹೆಚ್ಚು ಅವಲಂಬಿಸುತ್ತದೆ.

### `k` ಅನ್ನು ಯಾವಾಗ ಬದಲಾಯಿಸಬೇಕು

| ಲಕ್ಷಣ                                                  | ಪ್ರಯತ್ನಿಸಿ                                                                 |
| ------------------------------------------------------ | -------------------------------------------------------------------------- |
| ಅಗ್ರ ಫಲಿತಾಂಶ ಯಾವಾಗಲೂ ಗೆಲ್ಲುತ್ತದೆ, ಆದರೆ ಅದು ತಪ್ಪಾಗಿದೆ   | **ಕಡಿಮೆ** k (ಉದಾ., 20) — ಅಗ್ರ-ಶ್ರೇಣಿಯ ವಿಶ್ವಾಸಕ್ಕೆ ಹೆಚ್ಚು ಮಹತ್ವವಿರುತ್ತದೆ    |
| ಸರಿಯಾದ ಉತ್ತರ ಅಗ್ರ-5 ರಲ್ಲಿದೆ, ಆದರೆ ಅಗ್ರ-1 ರಲ್ಲಿಲ್ಲ      | **ಹೆಚ್ಚಿನ** k (ಉದಾ., 100) — ಸಮತಟ್ಟಾದ ಸ್ಕೋರಿಂಗ್ ಒಮ್ಮತಕ್ಕೆ ಪ್ರತಿಫಲ ನೀಡುತ್ತದೆ |
| recall ಹೆಚ್ಚಿದೆ ಆದರೆ precision ಕಡಿಮೆಯಾಗಿದೆ             | **ಕಡಿಮೆ** k — ಶ್ರೇಣೀಕರಣವನ್ನು ತೀಕ್ಷ್ಣಗೊಳಿಸಿ                                 |
| recall ಕಡಿಮೆಯಾಗಿದೆ (ಸಂಬಂಧಿತ ಡಾಕ್ಯುಮೆಂಟ್ಗಳು ಕಾಣೆಯಾಗಿವೆ) | **ಹೆಚ್ಚಿನ** k — ಕೆಳಗಿನ ಶ್ರೇಣಿಯ ಡಾಕ್ಯುಮೆಂಟ್ಗಳಿಗೆ ಅವಕಾಶ ನೀಡಿ                 |

### RRF ತೂಕ ನೀಡುವಿಕೆ

ರೆಸಿಪ್ರೋಕಲ್ ಶ್ರೇಣಿ ಸಂಯೋಜನೆಯು ಅರ್ಥಾಧಾರಿತ ವೆಕ್ಟರ್ ಶ್ರೇಣಿ ಮತ್ತು ಪೂರ್ಣ-ಪಠ್ಯ ಹುಡುಕಾಟದ ಶ್ರೇಣಿಗೆ ಸಮಾನ ತೂಕಗಳನ್ನು ಬಳಸುತ್ತದೆ:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

ಪ್ರತ್ಯೇಕ ತೂಕಗಳನ್ನು ಸರಿಹೊಂದಿಸಲು ಯಾವುದೇ ಪರಿಸರ ಚರಾಂಶಗಳಿಲ್ಲ (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` ಅಸ್ತಿತ್ವದಲ್ಲಿಲ್ಲ).

---

## ಸಾರಾಂಶಗೊಳಿಸುವ ತಂತ್ರ (v3.8.16+)

` summarization.ts` ಮಾಡ್ಯೂಲ್ (`src/lib/memory/summarization.ts`) ಹಳೆಯ ಸ್ಮೃತಿಗಳನ್ನು ಸಂಕುಚಿತಗೊಳಿಸಿ, ಮರುಸ್ಮರಣೆಯ ಸಾಮರ್ಥ್ಯವನ್ನು ಉಳಿಸಿಕೊಂಡೇ ಸಕ್ರಿಯ ಗುಂಪನ್ನು ಚಿಕ್ಕದಾಗಿ ಇರಿಸುತ್ತದೆ.

### ಸಾರಾಂಶಗೊಳಿಸುವಿಕೆ ಪ್ರಚೋದನೆಯಾಗುವ ಸಂದರ್ಭ

| ಪ್ರಚೋದಕ                     | ಮಿತಿ (ಪೂರ್ವನಿಯೋಜಿತ) |
| --------------------------- | ------------------- |
| API ಮೂಲಕ ಹಸ್ತಚಾಲಿತ ಪ್ರಚೋದನೆ | ಅನ್ವಯಿಸುವುದಿಲ್ಲ     |

### ಏನನ್ನು ಸಾರಾಂಶಗೊಳಿಸಲಾಗುತ್ತದೆ

`summarization.ts` ನಿಂದ ಎರಡು ಪ್ರವೇಶ ಬಿಂದುಗಳನ್ನು ರಫ್ತು ಮಾಡಲಾಗುತ್ತದೆ:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — ಒಂದು ಸೆಷನ್ನ
  ಸ್ಮೃತಿಗಳನ್ನು ಟೋಕನ್ ಮಿತಿಯೊಳಗಿನ ಒಂದೇ ಸಾರಾಂಶ ಪಠ್ಯವಾಗಿ ಸಂಕ್ಷಿಪ್ತಗೊಳಿಸುತ್ತದೆ.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API ಬಳಸುವ ವಯಸ್ಸು-ಆಧಾರಿತ
  ಸಂಕುಚನ: ಇದು `days` ಗಿಂತ ಹಳೆಯ ಪ್ರತಿಯೊಂದು ಸ್ಮೃತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ, ಅವುಗಳಿಂದ
  ಒಂದು ಸಂಕ್ಷಿಪ್ತ ಸಾರಾಂಶ ಸ್ಮೃತಿಯನ್ನು ರಚಿಸುತ್ತದೆ ಮತ್ತು (`dryRun` `false` ಆಗಿರುವಾಗ)
  ಮೂಲ ಸ್ಮೃತಿಗಳನ್ನು ಅಳಿಸುತ್ತದೆ. ಏನನ್ನೂ ಮಾರ್ಪಡಿಸದೆ ಅಭ್ಯರ್ಥಿ ಗುಂಪು ಮತ್ತು ಒಟ್ಟು
  ಟೋಕನ್ಗಳನ್ನು ಮುನ್ನೋಟ ಮಾಡಲು `dryRun: true` ಅನ್ನು ಪಾಸ್ ಮಾಡಿ.

ಯಾವುದೇ ಟ್ಯಾಗ್/ಕೀ ಕ್ಲಸ್ಟರಿಂಗ್ ಹಂತ ಅಥವಾ ಪ್ರತಿ-ಸ್ಮೃತಿಯ "ಮೂಲಭೂತ ಮತ್ತು ಸಾರಾಂಶಗೊಳಿಸಬಹುದಾದ" ಅಂಕನ ಇರುವುದಿಲ್ಲ —
ಆಯ್ಕೆಯು ಸಂಪೂರ್ಣವಾಗಿ ವಯಸ್ಸಿನ ಮಿತಿಯನ್ನು ಆಧರಿಸಿದ್ದು, ಸಾರಾಂಶ ಪಠ್ಯವು ಪ್ರತಿ ಅಭ್ಯರ್ಥಿಗೆ
ಪ್ರಕಾರದ ಪೂರ್ವಪ್ರತ್ಯಯವಿರುವ ಸಂಕ್ಷಿಪ್ತ ಸಾಲಾಗಿರುತ್ತದೆ.

### ಸಾರಾಂಶಗೊಳಿಸುವಿಕೆಯನ್ನು ಪ್ರಚೋದಿಸುವುದು

ಸಾರಾಂಶಗೊಳಿಸುವಿಕೆಯು **ಹಸ್ತಚಾಲಿತ / ಆಯ್ಕೆ-ಆಧಾರಿತ**ವಾಗಿದೆ — `autoSummarize` ಸೆಟ್ಟಿಂಗ್ ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ
`false` ಆಗಿರುವುದರಿಂದ, ಯಾವುದೂ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸಂಕುಚಿತಗೊಳ್ಳುವುದಿಲ್ಲ. API ಮೂಲಕ ಅದನ್ನು ಪ್ರಚೋದಿಸಿ:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

ಅದನ್ನು ಆಫ್ ಆಗಿಯೇ ಇರಿಸಲು, `autoSummarize` ಅನ್ನು ಅದರ ಪೂರ್ವನಿಯೋಜಿತ ಮೌಲ್ಯವಾದ (`false`) ನಲ್ಲಿಯೇ ಇರಿಸಿ.

### ಸಾರಾಂಶಗೊಳಿಸುವಿಕೆಯ ಗುಣಮಟ್ಟದ ಸಲಹೆಗಳು

- **ಮೊದಲು `dryRun` ಬಳಸಿ ಮುನ್ನೋಟ ನೋಡಿ** — `summarizeMemoriesOlderThan(..., true)` ಅಭ್ಯರ್ಥಿಗಳ
  ಪಟ್ಟಿ ಮತ್ತು ಒಟ್ಟು ಟೋಕನ್ ಎಣಿಕೆಯನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ; ಆದ್ದರಿಂದ ಮೂಲ ಸ್ಮೃತಿಗಳನ್ನು ಅಳಿಸುವ ಮೊದಲು
  ಏನನ್ನು ವಿಲೀನಗೊಳಿಸಲಾಗುತ್ತದೆ ಎಂಬುದನ್ನು ನೀವು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಬಹುದು.
- ನೀವು ದೊಡ್ಡ ಸ್ಮೃತಿ ಸಂಗ್ರಹವನ್ನು ಹೊಂದಿದ್ದರೆ **ಕಡಿಮೆ ಟ್ರಾಫಿಕ್ ಇರುವ ಸಮಯದಲ್ಲಿ ಸಾರಾಂಶಗೊಳಿಸುವಿಕೆಯನ್ನು ಚಲಾಯಿಸಿ** — LLM ಕರೆ ನಿಧಾನವಾದ ಭಾಗವಾಗಿದೆ

```bash
# Cron-ಶೈಲಿ: ಪ್ರತಿದಿನ ಮುಂಜಾನೆ 3 ಗಂಟೆಗೆ ಸಾರಾಂಶಗೊಳಿಸಿ
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend ಪೂರೈಕೆದಾರ ಮಾದರಿ

> **ಅಧಿಕೃತ ಮೂಲ:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **ಪರೀಕ್ಷೆಗಳು:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend ಪೂರೈಕೆದಾರ ಮಾದರಿಯು ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಸ್ಮೃತಿ ಎಂಜಿನ್ನ ಮೇಲೆ **ಪ್ಲಗ್ ಮಾಡಬಹುದಾದ ಬ್ಯಾಕೆಂಡ್ ಅಮೂರ್ತೀಕರಣ ಪದರವನ್ನು** ಪರಿಚಯಿಸುತ್ತದೆ. ಒಂದೇ ಸಂಗ್ರಹಣಾ ಅನುಷ್ಠಾನಕ್ಕೆ ಬದ್ಧವಾಗಿರುವ ಬದಲು, ಸ್ಮೃತಿ ವ್ಯವಸ್ಥೆಯು ಈಗ ಸಂರಚಿಸಬಹುದಾದ ಪ್ರಾಥಮಿಕ/ಪರ್ಯಾಯ ರೂಟಿಂಗ್ನೊಂದಿಗೆ ಅನೇಕ ಬ್ಯಾಕೆಂಡ್ಗಳನ್ನು (SQLite, Obsidian, Notion, ಕಸ್ಟಮ್ HTTP ಬ್ಯಾಕೆಂಡ್ಗಳು) ಬೆಂಬಲಿಸುತ್ತದೆ.

### ವಾಸ್ತುಶಿಲ್ಪ

```
┌──────────────────────────────────────────────────────────┐
│                    API ರೂಟ್ಗಳು                           │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           ಸಿಂಗಲ್ಟನ್ ಸಂಯೋಜಕ (manager.ts)                  │
│                                                          │
│  ಪ್ರಾಥಮಿಕ ──► ಬ್ಯಾಕೆಂಡ್ A  (ಉದಾ. SQLite)                 │
│  ಪರ್ಯಾಯ   ──► ಬ್ಯಾಕೆಂಡ್ B  (ಉದಾ. Obsidian)               │
│              ಬ್ಯಾಕೆಂಡ್ C  (ಉದಾ. GenericBackend ಮೂಲಕ Notion)│
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ ಬ್ಯಾಕೆಂಡ್  │ │ ಬ್ಯಾಕೆಂಡ್  │ │ ಬ್ಯಾಕೆಂಡ್ (HTTP) │
└────────────┘ └────────────┘ └──────────────────┘
```

#### ಮೂಲ ಇಂಟರ್ಫೇಸ್ (`backend.ts`)

ಪ್ರತಿಯೊಂದು ಬ್ಯಾಕೆಂಡ್ `MemoryBackend` ಇಂಟರ್ಫೇಸ್ ಅನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸಬೇಕು:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // CRUD
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // ಹುಡುಕಾಟ
  search(config: SearchConfig): Promise<Memory[]>;

  // ಆರೋಗ್ಯ
  health(): Promise<HealthCheckResult>;

  // ಜೀವನಚಕ್ರ (ಐಚ್ಛಿಕ)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

ಈ ಕೆಳಗಿನ ಕಾರ್ಯಗಳನ್ನು ನಿರ್ವಹಿಸುವ ಸಿಂಗಲ್ಟನ್ ಸಂಯೋಜಕ:

- `register(backend)` ಮೂಲಕ ಬ್ಯಾಕೆಂಡ್ಗಳನ್ನು **ನೋಂದಾಯಿಸುತ್ತದೆ** — ಬೂಟ್ ಸಮಯದಲ್ಲಿ `index.ts` ನಿಂದ ಕರೆಯಲಾಗುತ್ತದೆ
- `configure(primary, fallbacks)` ಮೂಲಕ ಪ್ರಾಥಮಿಕ + ಪರ್ಯಾಯಗಳನ್ನು **ಸಂರಚಿಸುತ್ತದೆ**
- ವಿಫಲವಾದಾಗ ಪರ್ಯಾಯ ಸರಣಿಯನ್ನು ಬಳಸಿಕೊಂಡು CRUD/ಹುಡುಕಾಟವನ್ನು ಪ್ರಾಥಮಿಕ ಬ್ಯಾಕೆಂಡ್ಗೆ **ರೂಟ್ ಮಾಡುತ್ತದೆ**
- ಎಲ್ಲ ಬ್ಯಾಕೆಂಡ್ಗಳ **ಆರೋಗ್ಯ ಪರಿಶೀಲನೆಗಳನ್ನು** ನಿಯತಕಾಲಿಕವಾಗಿ ನಡೆಸುತ್ತದೆ

**ಪರ್ಯಾಯ ವರ್ತನೆ:**

| ಕಾರ್ಯಾಚರಣೆ | ಪ್ರಾಥಮಿಕ                          | ಪರ್ಯಾಯಗಳು                    |
| ---------- | --------------------------------- | ---------------------------- |
| `create`   | ✅ ಪ್ರಾಥಮಿಕ ಮಾತ್ರ                 | ❌                           |
| `get`      | ✅ ಮೊದಲು ಪ್ರಾಥಮಿಕವನ್ನು ಪ್ರಯತ್ನಿಸಿ | ✅ null ಆಗಿದ್ದರೆ ಪರ್ಯಾಯ ಬಳಸಿ |
| `update`   | ✅ ಪ್ರಾಥಮಿಕ ಮಾತ್ರ                 | ✅ ಫಲಿತಾಂಶಕ್ಕಾಗಿ ಕಾಯದ ಸಿಂಕ್  |
| `delete`   | ✅ ಪ್ರಾಥಮಿಕ ಮಾತ್ರ                 | ✅ ಫಲಿತಾಂಶಕ್ಕಾಗಿ ಕಾಯದ ಸಿಂಕ್  |
| `list`     | ✅ ಪ್ರಾಥಮಿಕ ಮಾತ್ರ                 | ❌                           |
| `search`   | ✅ ಮೊದಲು ಪ್ರಾಥಮಿಕ                 | ✅ ದೋಷವಾದಾಗ ಪರ್ಯಾಯ ಬಳಸಿ      |

#### GenericMemoryBackend (`genericBackend.ts`)

ಯಾವುದೇ REST API ಅನ್ನು MemoryBackend ಆಗಿ ಹೊಂದಿಸುವ ಸಾಮಾನ್ಯ HTTP ಕನೆಕ್ಟರ್. ಈ ಕೆಳಗಿನವುಗಳಿಗೆ ಉಪಯುಕ್ತವಾಗಿದೆ:

- **Notion** — Notion API ಮೂಲಕ ಸಂಪರ್ಕಿಸಿ
- **Obsidian** — Obsidian Local REST API ಮೂಲಕ ಸಂಪರ್ಕಿಸಿ
- **ಕಸ್ಟಮ್ ಬ್ಯಾಕೆಂಡ್ಗಳು** — RESTful ಸ್ಮೃತಿ API ಅನ್ನು ಒದಗಿಸುವ ಯಾವುದೇ ಸೇವೆ

**ಸಂರಚನೆ:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // ಬ್ಯಾಕೆಂಡ್ API ಯ ಮೂಲ URL
  apiKey?: string;           // ದೃಢೀಕರಣಕ್ಕಾಗಿ Bearer ಟೋಕನ್
  headers?: Record<string, string>;  // ಕಸ್ಟಮ್ HTTP ಹೆಡರ್ಗಳು
  timeout?: number;          // ವಿನಂತಿಯ ಕಾಲಮಿತಿ (ಡೀಫಾಲ್ಟ್: 30000ms)
  backendType?: string;      // ಲಾಗಿಂಗ್ಗಾಗಿ

  // ಎಂಡ್ಪಾಯಿಂಟ್ ಓವರ್ರೈಡ್ಗಳು (ಡೀಫಾಲ್ಟ್ಗಳು REST ಸಂಪ್ರದಾಯಗಳನ್ನು ಬಳಸುತ್ತವೆ)
  endpoints?: {
    search?: string;   // ಡೀಫಾಲ್ಟ್: "/memories/search"
    create?: string;   // ಡೀಫಾಲ್ಟ್: "/memories"
    list?: string;     // ಡೀಫಾಲ್ಟ್: "/memories"
    get?: string;      // ಡೀಫಾಲ್ಟ್: "/memories/{id}"
    update?: string;   // ಡೀಫಾಲ್ಟ್: "/memories/{id}"
    delete?: string;   // ಡೀಫಾಲ್ಟ್: "/memories/{id}"
    health?: string;   // ಡೀಫಾಲ್ಟ್: "/health"
  };

  // ಕ್ವೆರಿ ಪ್ಯಾರಾಮೀಟರ್ ಹೆಸರಿನ ಮ್ಯಾಪಿಂಗ್ಗಳು
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // ಪಾತ್ ಪ್ಯಾರಾಮೀಟರ್ ಹೆಸರಿನ ಮ್ಯಾಪಿಂಗ್ಗಳು
  pathParams?: {
    id?/memoryId?
  };
}
```

**ತಿಳಿದಿರುವ ಬ್ಯಾಕೆಂಡ್ಗಳು** `KNOWN_BACKENDS` ನಲ್ಲಿ ಪೂರ್ವ-ಕಾನ್ಫಿಗರ್ ಆಗಿವೆ:

```typescript
createKnownBackend("obsidian"); // → localhost:27123 ಅನ್ನು ಸೂಚಿಸುವ GenericMemoryBackend
createKnownBackend("notion"); // → api.notion.com/v1 ಅನ್ನು ಸೂಚಿಸುವ GenericMemoryBackend
```

#### ಅಂತರ್ನಿರ್ಮಿತ ಬ್ಯಾಕೆಂಡ್ಗಳು

##### SQLiteBackend (`sqliteBackend.ts`)

ಡೀಫಾಲ್ಟ್ ಪ್ರಾಥಮಿಕ ಬ್ಯಾಕೆಂಡ್. `src/lib/memory/store.ts` ಅನ್ನು ಬಳಸಿಕೊಂಡು ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ SQLite-ಆಧಾರಿತ ಮೆಮೊರಿ ಸ್ಟೋರ್ ಅನ್ನು ಆವರಿಸುತ್ತದೆ. ಬೂಟ್ ಸಮಯದಲ್ಲಿ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನೋಂದಾಯಿಸಲ್ಪಡುತ್ತದೆ.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ Obsidian ಏಕೀಕರಣವನ್ನು (`src/lib/memory/obsidianBackend.ts`) ಆವರಿಸುತ್ತದೆ. Obsidian Local REST API ಮೂಲಕ Obsidian ವಾಲ್ಟ್ಗೆ ಸಂಪರ್ಕಿಸುತ್ತದೆ.

### ಸೆಟ್ಟಿಂಗ್ಗಳು

ಮೆಮೊರಿ ಬ್ಯಾಕೆಂಡ್ ಸೆಟ್ಟಿಂಗ್ಗಳನ್ನು ಆ್ಯಪ್ ಸೆಟ್ಟಿಂಗ್ಗಳ ಟೇಬಲ್ನಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ ಮತ್ತು `src/lib/memory/settings.ts` ಮೂಲಕ ನಿರ್ವಹಿಸಲಾಗುತ್ತದೆ:

| ಸೆಟ್ಟಿಂಗ್               | Env/ಕಾನ್ಫಿಗ್ ಕೀ          | ಡೀಫಾಲ್ಟ್   | ವಿವರಣೆ                                 |
| ----------------------- | ------------------------ | ---------- | -------------------------------------- |
| ಪ್ರಾಥಮಿಕ ಬ್ಯಾಕೆಂಡ್      | `memoryPrimaryBackend`   | `"sqlite"` | ಪ್ರಾಥಮಿಕ ಬ್ಯಾಕೆಂಡ್ನ ID                 |
| ಫಾಲ್ಬ್ಯಾಕ್ ಬ್ಯಾಕೆಂಡ್ಗಳು | `memoryFallbackBackends` | `[]`       | ಕ್ರಮಬದ್ಧ ಫಾಲ್ಬ್ಯಾಕ್ ಬ್ಯಾಕೆಂಡ್ IDಗಳು    |
| ಬ್ಯಾಕೆಂಡ್ ಕಾನ್ಫಿಗ್ಗಳು   | `memoryBackendConfigs`   | `{}`       | ಪ್ರತಿ ಬ್ಯಾಕೆಂಡ್ಗೆ ಕಾನ್ಫಿಗ್ ಓವರ್ರೈಡ್ಗಳು |

ಸೆಟ್ಟಿಂಗ್ಗಳನ್ನು `normalizeMemorySettings()` ಮೂಲಕ ಸಾಮಾನ್ಯೀಕರಿಸಲಾಗುತ್ತದೆ ಮತ್ತು `getMemorySettings()` ನಲ್ಲಿ ಕ್ಯಾಶ್ ಮಾಡಲಾಗುತ್ತದೆ.

### ಪ್ರಾರಂಭೀಕರಣದ ಹರಿವು

```
ಆ್ಯಪ್ ಬೂಟ್ಸ್ಟ್ರ್ಯಾಪ್
  → index.ts ಇಂಪೋರ್ಟ್ಗಳು (ಪಾರ್ಶ್ವ ಪರಿಣಾಮ): SQLiteBackend ಅನ್ನು ನೋಂದಾಯಿಸುತ್ತವೆ
  → ಆ್ಯಪ್ ಜೀವನಚಕ್ರದಿಂದ initMemoryBackends() ಅನ್ನು ಕರೆಯಲಾಗುತ್ತದೆ:
      1. ಸೆಟ್ಟಿಂಗ್ಗಳನ್ನು ಲೋಡ್ ಮಾಡಿ (getMemorySettings)
      2. ಪ್ರಾಥಮಿಕ + ಫಾಲ್ಬ್ಯಾಕ್ ಅನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಿ
      3. ಎಲ್ಲಾ ಬ್ಯಾಕೆಂಡ್ಗಳನ್ನು ಪ್ರಾರಂಭಿಸಿ (ಆರೋಗ್ಯ ಪರಿಶೀಲನೆ)
      4. ವಿನಂತಿಗಳಿಗೆ ಸಿದ್ಧ
```

### ಹೊಸ ಬ್ಯಾಕೆಂಡ್ ಸೇರಿಸುವುದು

1. `src/lib/memory/<name>Backend.ts` ನಲ್ಲಿ **`MemoryBackend` ಅನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸಿ**
2. `src/lib/memory/index.ts` ನಿಂದ **ಎಕ್ಸ್ಪೋರ್ಟ್ ಮಾಡಿ**
3. ಬೂಟ್ ಸಮಯದಲ್ಲಿ `memoryManager.register(yourBackend)` ಮೂಲಕ **ನೋಂದಾಯಿಸಿ**
4. ಸೆಟ್ಟಿಂಗ್ಗಳ ಮೂಲಕ **ಕಾನ್ಫಿಗರ್ ಮಾಡಿ**: `memoryPrimaryBackend` ಅನ್ನು ನಿಮ್ಮ ಬ್ಯಾಕೆಂಡ್ IDಗೆ ಹೊಂದಿಸಿ
5. `src/lib/memory/__tests__/generic-backend.test.ts` ಅನ್ನು ಉಲ್ಲೇಖವಾಗಿ ಬಳಸಿಕೊಂಡು **ಪರೀಕ್ಷಿಸಿ**

#### ಉದಾಹರಣೆ: Brain ಬ್ಯಾಕೆಂಡ್

```typescript
import { createGenericMemoryBackend } from "./genericBackend";

const brainBackend = createGenericMemoryBackend("brain", "BK-Brain", {
  baseUrl: process.env.BRAIN_API_URL || "http://localhost:9099",
  apiKey: process.env.BRAIN_API_KEY,
  endpoints: {
    search: "/api/memory/search",
    create: "/api/memory",
    health: "/api/health",
  },
});

memoryManager.register(brainBackend);
```

### ಪರಿಶೀಲನೆ

#### ಯೂನಿಟ್ ಪರೀಕ್ಷೆಗಳು

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

ನಿರೀಕ್ಷಿತ ಔಟ್ಪುಟ್: ಈ ಕೆಳಗಿನವುಗಳನ್ನು ಒಳಗೊಂಡ **35 ಪರೀಕ್ಷೆಗಳು, ಎಲ್ಲವೂ ಉತ್ತೀರ್ಣ**:

- ಕನ್ಸ್ಟ್ರಕ್ಟರ್ (2)
- ಆರೋಗ್ಯ ಪರಿಶೀಲನೆ (4) — ಯಶಸ್ಸು, ವೈಫಲ್ಯ 500, ನೆಟ್ವರ್ಕ್ ದೋಷ, ಲೇಟೆನ್ಸಿ
- ಪ್ರಾರಂಭೀಕರಣ (2) — ಯಶಸ್ಸು, ವೈಫಲ್ಯ
- ರಚನೆ (2) — ಡೀಫಾಲ್ಟ್ ಎಂಡ್ಪಾಯಿಂಟ್, ಕಸ್ಟಮ್ ಎಂಡ್ಪಾಯಿಂಟ್
- ಪಡೆಯುವುದು (4) — ಯಶಸ್ಸು, 404 → null, 404 ಅಲ್ಲದಿದ್ದರೆ throw, ಕಸ್ಟಮ್ ಪಾತ್ ಪ್ಯಾರಾಮೀಟರ್ಗಳು
- ನವೀಕರಣ (2) — ಯಶಸ್ಸು, 404 → false
- ಅಳಿಸುವಿಕೆ (2) — ಯಶಸ್ಸು, 404 → false
- ಪಟ್ಟಿ (2) — ಕ್ವೆರಿ ಪ್ಯಾರಾಮೀಟರ್ಗಳು, ಕಸ್ಟಮ್ ಪ್ಯಾರಾಮೀಟರ್ ಹೆಸರುಗಳು
- ಹುಡುಕಾಟ (3) — ಕ್ವೆರಿ ಪ್ಯಾರಾಮೀಟರ್ಗಳು, ಕಸ್ಟಮ್ ಎಂಡ್ಪಾಯಿಂಟ್, ಆಯ್ಕೆಗಳ ಸೀರಿಯಲೈಸೇಶನ್
- ದೃಢೀಕರಣ ಹೆಡರ್ಗಳು (2) — Bearer ಟೋಕನ್, ಕಸ್ಟಮ್ ಹೆಡರ್ಗಳು
- ಫ್ಯಾಕ್ಟರಿ (1)

#### ಟೈಪ್ ಪರಿಶೀಲನೆ

```bash
npm run typecheck:core
```

ನಿರೀಕ್ಷಿತ ಫಲಿತಾಂಶ: **0 ದೋಷಗಳು**.
