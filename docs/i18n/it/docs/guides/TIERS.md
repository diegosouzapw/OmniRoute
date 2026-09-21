# OmniRoute Tiers — User Guide (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TIERS.md) · 🇪🇹 [am](../../../am/docs/guides/TIERS.md) · 🇸🇦 [ar](../../../ar/docs/guides/TIERS.md) · 🇦🇿 [az](../../../az/docs/guides/TIERS.md) · 🇧🇬 [bg](../../../bg/docs/guides/TIERS.md) · 🇧🇩 [bn](../../../bn/docs/guides/TIERS.md) · 🇨🇿 [cs](../../../cs/docs/guides/TIERS.md) · 🇩🇰 [da](../../../da/docs/guides/TIERS.md) · 🇩🇪 [de](../../../de/docs/guides/TIERS.md) · 🇬🇷 [el](../../../el/docs/guides/TIERS.md) · 🇪🇸 [es](../../../es/docs/guides/TIERS.md) · 🇪🇪 [et](../../../et/docs/guides/TIERS.md) · 🇮🇷 [fa](../../../fa/docs/guides/TIERS.md) · 🇫🇮 [fi](../../../fi/docs/guides/TIERS.md) · 🇫🇷 [fr](../../../fr/docs/guides/TIERS.md) · 🇮🇪 [ga](../../../ga/docs/guides/TIERS.md) · 🇮🇳 [gu](../../../gu/docs/guides/TIERS.md) · 🇳🇬 [ha](../../../ha/docs/guides/TIERS.md) · 🇮🇱 [he](../../../he/docs/guides/TIERS.md) · 🇮🇳 [hi](../../../hi/docs/guides/TIERS.md) · 🇭🇷 [hr](../../../hr/docs/guides/TIERS.md) · 🇭🇺 [hu](../../../hu/docs/guides/TIERS.md) · 🇦🇲 [hy](../../../hy/docs/guides/TIERS.md) · 🇮🇩 [id](../../../id/docs/guides/TIERS.md) · 🇳🇬 [ig](../../../ig/docs/guides/TIERS.md) · 🇯🇵 [ja](../../../ja/docs/guides/TIERS.md) · 🇬🇪 [ka](../../../ka/docs/guides/TIERS.md) · 🇰🇭 [km](../../../km/docs/guides/TIERS.md) · 🇮🇳 [kn](../../../kn/docs/guides/TIERS.md) · 🇰🇷 [ko](../../../ko/docs/guides/TIERS.md) · 🇱🇹 [lt](../../../lt/docs/guides/TIERS.md) · 🇱🇻 [lv](../../../lv/docs/guides/TIERS.md) · 🇮🇳 [ml](../../../ml/docs/guides/TIERS.md) · 🇮🇳 [mr](../../../mr/docs/guides/TIERS.md) · 🇲🇾 [ms](../../../ms/docs/guides/TIERS.md) · 🇲🇹 [mt](../../../mt/docs/guides/TIERS.md) · 🇲🇲 [my](../../../my/docs/guides/TIERS.md) · 🇳🇵 [ne](../../../ne/docs/guides/TIERS.md) · 🇳🇱 [nl](../../../nl/docs/guides/TIERS.md) · 🇳🇴 [no](../../../no/docs/guides/TIERS.md) · 🇮🇳 [or](../../../or/docs/guides/TIERS.md) · 🇮🇳 [pa](../../../pa/docs/guides/TIERS.md) · 🇵🇭 [phi](../../../phi/docs/guides/TIERS.md) · 🇵🇱 [pl](../../../pl/docs/guides/TIERS.md) · 🇵🇹 [pt](../../../pt/docs/guides/TIERS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TIERS.md) · 🇷🇴 [ro](../../../ro/docs/guides/TIERS.md) · 🇷🇺 [ru](../../../ru/docs/guides/TIERS.md) · 🇱🇰 [si](../../../si/docs/guides/TIERS.md) · 🇸🇰 [sk](../../../sk/docs/guides/TIERS.md) · 🇸🇮 [sl](../../../sl/docs/guides/TIERS.md) · 🇷🇸 [sr](../../../sr/docs/guides/TIERS.md) · 🇸🇪 [sv](../../../sv/docs/guides/TIERS.md) · 🇰🇪 [sw](../../../sw/docs/guides/TIERS.md) · 🇮🇳 [ta](../../../ta/docs/guides/TIERS.md) · 🇮🇳 [te](../../../te/docs/guides/TIERS.md) · 🇹🇭 [th](../../../th/docs/guides/TIERS.md) · 🇹🇷 [tr](../../../tr/docs/guides/TIERS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TIERS.md) · 🇵🇰 [ur](../../../ur/docs/guides/TIERS.md) · 🇺🇿 [uz](../../../uz/docs/guides/TIERS.md) · 🇻🇳 [vi](../../../vi/docs/guides/TIERS.md) · 🇳🇬 [yo](../../../yo/docs/guides/TIERS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TIERS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TIERS.md)

---

OmniRoute organizza i 352 provider supportati in 3 fasce economiche. Ogni
richiesta li attraversa in ordine finché uno non risponde correttamente: ottieni
la risposta valida più economica senza dover mai scrivere codice di fallback.

## Fascia 1 — Abbonamento

**Provider per i quali paghi già.** OmniRoute utilizza ogni parte della quota prima
che scada.

| Provider                           | Perché Fascia 1                                         |
| ---------------------------------- | ------------------------------------------------------- |
| Claude Code OAuth                  | Anthropic Pro/Team — tariffa fissa, spesso inutilizzata |
| OpenAI Codex (abbonamento ChatGPT) | Plus/Team include una quota Codex                       |
| GitHub Copilot                     | Per utente — la quota si azzera mensilmente             |
| Cursor IDE                         | Quota del piano Pro                                     |
| Antigravity / Devin Desktop        | Quote integrate                                         |

**Strategia**: instrada qui per prima ogni richiesta compatibile con i punti di forza
del modello. Il monitoraggio delle quote rileva l'avvicinarsi degli azzeramenti e la
strategia combinata `reset-aware` assegna le priorità di conseguenza. Per instradare
prima verso la Fascia 1 e passare alle fasce a pagamento solo quando la quota si esaurisce,
usa l'id `auto/thrifty` — oppure `auto/subscription` per rimanere sulla capacità inclusa
nel piano e interrompere le richieste in caso di esaurimento. Consulta
[Instradamento con priorità agli abbonamenti](../routing/SUBSCRIPTION_LADDER.md).

## Fascia 2 — Economica

**Provider con pagamento per token sotto $1/1M token.** Riservati ai carichi di lavoro
ad alto volume o ai casi in cui le quote della Fascia 1 raggiungono i limiti.

| Provider                               | Prezzo (input/output) | Punti di forza              |
| -------------------------------------- | --------------------- | --------------------------- |
| DeepSeek V4 Pro                        | $0.27 / $1.10 per 1M  | Codice, ragionamento        |
| GLM-4.5                                | $0.60 / $2.20 per 1M  | Contesto esteso             |
| MiniMax M1                             | $0.20 / $1.10 per 1M  | Velocità                    |
| Qwen Coder                             | $0.30 / $1.20 per 1M  | Codice                      |
| OpenRouter (ottimizzato per il prezzo) | variabile             | Oltre 100 modelli, dinamico |

**Strategia**: la combinazione `cost-optimized` sceglie il modello con il costo
$/token più basso che soddisfa il filtro delle funzionalità dell'attività
(visione, modalità JSON, strumenti, contesto massimo).

## Fascia 3 — Gratuita

**Provider a costo zero** — piani gratuiti, programmi di credito, quote giornaliere OAuth.

| Provider         | Quota gratuita / crediti                             |
| ---------------- | ---------------------------------------------------- |
| Kiro AI          | Piano Claude gratuito (uso corretto generoso)        |
| OpenCode Free    | Nessuna autenticazione, limiti di frequenza generosi |
| Qoder            | OAuth gratuito                                       |
| Google Vertex AI | $300 di crediti per i nuovi account                  |
| Amazon Q         | Piano gratuito per gli utenti AWS                    |
| Pollinations     | API pubblica aperta                                  |
| Cloudflare AI    | Piano gratuito Workers AI                            |

**Strategia**: la combinazione `auto` con limite di budget instrada qui quando
le Fasce 1 e 2 falliscono o quando è impostato `useFreeOnly=true`. I provider
gratuiti hanno spesso limiti di frequenza più restrittivi — il circuit breaker
li ripristina dopo il backoff.

## Configurazione delle fasce

Dashboard → **Fasce** → assegna i tuoi provider. Le impostazioni predefinite
(da `tierDefaults.json`) sono ragionevoli; modificale quando hai abbonamenti specifici
a cui dare priorità o provider da escludere.

Il sistema di valutazione a 16 fattori di Auto-Combo considera anche la fascia. Consulta
[`docs/routing/AUTO-COMBO.md`](../routing/AUTO-COMBO.md).

## Telemetria

Dashboard → **Utilizzo** mostra i token consumati ogni giorno per ciascuna fascia. Usalo per:

- Verificare che la Fascia 1 sia utilizzata pienamente (altrimenti stai sprecando il valore dell'abbonamento)
- Identificare quali modelli della Fascia 2 vengono scelti più spesso (riducili a 1-2)
- Verificare che la Fascia 3 consenta di risparmiare sui carichi di lavoro di test/esplorazione

## Schemi comuni

### Carico di lavoro completamente gratuito

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "costInv": 0.5, "tierPriority": 0.3 } } }
}
```

Favorisce fortemente la Fascia 3; utilizza la Fascia 2 solo se la Fascia 3 non è disponibile.

### Priorità all'abbonamento con fallback economico

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

Elenco ordinato esplicito corrispondente a Fascia 1 → Fascia 2 → Fascia 3.
