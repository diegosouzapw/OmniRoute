---
title: "OmniRoute Tiers — Przewodnik użytkownika"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute Tiers — Przewodnik użytkownika

OmniRoute organizuje 207+ obsługiwanych providerów w 3 poziomy ekonomiczne (tiers). Każde
żądanie przechodzi przez nie po kolei, aż któreś zwróci sukces — otrzymujesz
najtańszą sensowną odpowiedź, bez pisania kodu fallbacku.

## Tier 1 — Subskrypcja

**Providerzy, za których już płacisz.** OmniRoute wykorzystuje każdą jednostkę quoty, zanim
wygaśnie.

| Provider                            | Dlaczego Tier 1                                           |
| ----------------------------------- | --------------------------------------------------------- |
| Claude Code OAuth                   | Anthropic Pro/Team — stała stawka, często niewykorzystana |
| OpenAI Codex (ChatGPT subscription) | Plus/Team obejmuje quotę Codex                            |
| GitHub Copilot                      | Per-seat — quota resetuje się co miesiąc                  |
| Cursor IDE                          | Quota planu Pro                                           |
| Antigravity / Windsurf              | Wbudowane quoty                                           |

**Strategia**: kieruj tutaj najpierw każde żądanie pasujące do mocnych stron
modelu. Tracker quoty monitoruje zbliżający się reset; strategie combo
`reset-aware` i `subscription` priorytetyzują odpowiednio.

## Tier 2 — Tanie

**Providerzy pay-per-token poniżej $1/1M tokenów.** Zarezerwowane na pracę wysokonakładową
lub gdy quoty Tier 1 osiągną limity.

| Provider                     | Cena (input/output)  | Mocne strony         |
| ---------------------------- | -------------------- | -------------------- |
| DeepSeek V4 Pro              | $0.27 / $1.10 per 1M | Code, reasoning      |
| GLM-4.5                      | $0.60 / $2.20 per 1M | Long context         |
| MiniMax M1                   | $0.20 / $1.10 per 1M | Speed                |
| Qwen Coder                   | $0.30 / $1.20 per 1M | Code                 |
| OpenRouter (price-optimized) | varies               | 100+ models, dynamic |

**Strategia**: combo `cost-optimized` wybiera model o najniższym $/token, który spełnia
filtr możliwości zadania (vision, JSON mode, tools, max-context).

## Tier 3 — Darmowe

**Providerzy zerokosztowi** — darmowe tiers, programy kredytowe, dzienne quoty OAuth.

| Provider         | Darmowa quota / kredyty           |
| ---------------- | --------------------------------- |
| Kiro AI          | Free Claude tier (hojny fair-use) |
| OpenCode Free    | Bez auth, hojne limity rate       |
| Qoder            | Free OAuth                        |
| Google Vertex AI | $300 kredytów na nowe konto       |
| Amazon Q         | Free tier dla użytkowników AWS    |
| Pollinations     | Otwarte publiczne API             |
| Cloudflare AI    | Workers AI free tier              |

**Strategia**: combo `auto` z limitem budżetu kieruje tutaj, gdy Tier 1+2 zawiodą
lub gdy ustawiono `useFreeOnly=true`. Darmowi providerzy często mają słabsze
limity rate — circuit breaker przywraca ich po backoffie.

## Konfiguracja tiers

Dashboard → **Tiers** → przypisz swoich providerów. Domyślne wartości (z `tierDefaults.json`) są
rozsądne; edytuj je, gdy masz konkretne subskrypcje do priorytetyzacji lub providerów do wykluczenia.

Scoring 9-czynnikowy Auto-Combo również uwzględnia tier. Zobacz
[`docs/routing/AUTO-COMBO.md`](../routing/AUTO-COMBO.md).

## Telemetria

Dashboard → **Usage** pokazuje tokeny zużyte per tier per dzień. Użyj tego, aby:

- Potwierdzić, że Tier 1 jest w pełni wykorzystywany (w przeciwnym razie marnujesz wartość subskrypcji)
- Zidentyfikować, które modele Tier 2 są wybierane najczęściej (skonsoliduj do 1–2)
- Zweryfikować, że Tier 3 oszczędza pieniądze na obciążeniach testowych/eksploracyjnych

## Typowe wzorce

### Czysto darmowe obciążenie

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "costInv": 0.5, "tierPriority": 0.3 } } }
}
```

Silnie wymusza Tier 3; używa Tier 2 tylko gdy Tier 3 jest niedostępny.

### Najpierw subskrypcja z tanim fallbackiem

```json
{
  "strategy": "priority",
  "targets": [
    { "provider": "claude-code-oauth", "weight": 1 },
    { "provider": "deepseek", "weight": 1 },
    { "provider": "kiro", "weight": 1 }
  ]
}
```

Jawna uporządkowana lista odpowiadająca Tier 1 → Tier 2 → Tier 3.
