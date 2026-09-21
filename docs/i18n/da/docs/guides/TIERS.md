# OmniRoute Tiers — User Guide (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TIERS.md) · 🇪🇹 [am](../../../am/docs/guides/TIERS.md) · 🇸🇦 [ar](../../../ar/docs/guides/TIERS.md) · 🇦🇿 [az](../../../az/docs/guides/TIERS.md) · 🇧🇬 [bg](../../../bg/docs/guides/TIERS.md) · 🇧🇩 [bn](../../../bn/docs/guides/TIERS.md) · 🇨🇿 [cs](../../../cs/docs/guides/TIERS.md) · 🇩🇪 [de](../../../de/docs/guides/TIERS.md) · 🇬🇷 [el](../../../el/docs/guides/TIERS.md) · 🇪🇸 [es](../../../es/docs/guides/TIERS.md) · 🇪🇪 [et](../../../et/docs/guides/TIERS.md) · 🇮🇷 [fa](../../../fa/docs/guides/TIERS.md) · 🇫🇮 [fi](../../../fi/docs/guides/TIERS.md) · 🇫🇷 [fr](../../../fr/docs/guides/TIERS.md) · 🇮🇪 [ga](../../../ga/docs/guides/TIERS.md) · 🇮🇳 [gu](../../../gu/docs/guides/TIERS.md) · 🇳🇬 [ha](../../../ha/docs/guides/TIERS.md) · 🇮🇱 [he](../../../he/docs/guides/TIERS.md) · 🇮🇳 [hi](../../../hi/docs/guides/TIERS.md) · 🇭🇷 [hr](../../../hr/docs/guides/TIERS.md) · 🇭🇺 [hu](../../../hu/docs/guides/TIERS.md) · 🇦🇲 [hy](../../../hy/docs/guides/TIERS.md) · 🇮🇩 [id](../../../id/docs/guides/TIERS.md) · 🇳🇬 [ig](../../../ig/docs/guides/TIERS.md) · 🇮🇹 [it](../../../it/docs/guides/TIERS.md) · 🇯🇵 [ja](../../../ja/docs/guides/TIERS.md) · 🇬🇪 [ka](../../../ka/docs/guides/TIERS.md) · 🇰🇭 [km](../../../km/docs/guides/TIERS.md) · 🇮🇳 [kn](../../../kn/docs/guides/TIERS.md) · 🇰🇷 [ko](../../../ko/docs/guides/TIERS.md) · 🇱🇹 [lt](../../../lt/docs/guides/TIERS.md) · 🇱🇻 [lv](../../../lv/docs/guides/TIERS.md) · 🇮🇳 [ml](../../../ml/docs/guides/TIERS.md) · 🇮🇳 [mr](../../../mr/docs/guides/TIERS.md) · 🇲🇾 [ms](../../../ms/docs/guides/TIERS.md) · 🇲🇹 [mt](../../../mt/docs/guides/TIERS.md) · 🇲🇲 [my](../../../my/docs/guides/TIERS.md) · 🇳🇵 [ne](../../../ne/docs/guides/TIERS.md) · 🇳🇱 [nl](../../../nl/docs/guides/TIERS.md) · 🇳🇴 [no](../../../no/docs/guides/TIERS.md) · 🇮🇳 [or](../../../or/docs/guides/TIERS.md) · 🇮🇳 [pa](../../../pa/docs/guides/TIERS.md) · 🇵🇭 [phi](../../../phi/docs/guides/TIERS.md) · 🇵🇱 [pl](../../../pl/docs/guides/TIERS.md) · 🇵🇹 [pt](../../../pt/docs/guides/TIERS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TIERS.md) · 🇷🇴 [ro](../../../ro/docs/guides/TIERS.md) · 🇷🇺 [ru](../../../ru/docs/guides/TIERS.md) · 🇱🇰 [si](../../../si/docs/guides/TIERS.md) · 🇸🇰 [sk](../../../sk/docs/guides/TIERS.md) · 🇸🇮 [sl](../../../sl/docs/guides/TIERS.md) · 🇷🇸 [sr](../../../sr/docs/guides/TIERS.md) · 🇸🇪 [sv](../../../sv/docs/guides/TIERS.md) · 🇰🇪 [sw](../../../sw/docs/guides/TIERS.md) · 🇮🇳 [ta](../../../ta/docs/guides/TIERS.md) · 🇮🇳 [te](../../../te/docs/guides/TIERS.md) · 🇹🇭 [th](../../../th/docs/guides/TIERS.md) · 🇹🇷 [tr](../../../tr/docs/guides/TIERS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TIERS.md) · 🇵🇰 [ur](../../../ur/docs/guides/TIERS.md) · 🇺🇿 [uz](../../../uz/docs/guides/TIERS.md) · 🇻🇳 [vi](../../../vi/docs/guides/TIERS.md) · 🇳🇬 [yo](../../../yo/docs/guides/TIERS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TIERS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TIERS.md)

---

OmniRoute organiserer de 352 understøttede udbydere i 3 økonomiske niveauer. Hver
anmodning sendes gennem dem i rækkefølge, indtil én returnerer et vellykket svar — du
får det billigste brugbare svar uden nogensinde at skulle skrive fallback-kode.

## Niveau 1 — Abonnement

**Udbydere, du allerede betaler for.** OmniRoute bruger hele din kvote, før
den udløber.

| Udbyder                           | Hvorfor niveau 1                            |
| --------------------------------- | ------------------------------------------- |
| Claude Code OAuth                 | Anthropic Pro/Team — fast pris, ofte ubrugt |
| OpenAI Codex (ChatGPT-abonnement) | Plus/Team inkluderer Codex-kvote            |
| GitHub Copilot                    | Pr. bruger — kvoten nulstilles månedligt    |
| Cursor IDE                        | Pro-abonnementskvote                        |
| Antigravity / Devin Desktop       | Indbyggede kvoter                           |

**Strategi**: send først alle anmodninger, der passer til modellens styrker, hertil.
Kvotesporingen overvåger forestående nulstillinger, og kombinationsstrategien
`reset-aware` prioriterer derefter. For først at bruge niveau 1 og kun gå videre
til betalte niveauer, når kvoten er opbrugt, skal du bruge id'et `auto/thrifty` — eller
`auto/subscription` for at blive på den kapacitet, der er inkluderet i abonnementet, og
ellers afvise anmodningen. Se
[Abonnementsbaseret routing først](../routing/SUBSCRIPTION_LADDER.md).

## Niveau 2 — Billig

**Udbydere med betaling pr. token til under $1/1M tokens.** Reserveret til arbejde
med stor volumen, eller når kvoterne på niveau 1 har nået deres grænser.

| Udbyder                    | Pris (input/output)  | Styrker                 |
| -------------------------- | -------------------- | ----------------------- |
| DeepSeek V4 Pro            | $0.27 / $1.10 pr. 1M | Kode, ræsonnering       |
| GLM-4.5                    | $0.60 / $2.20 pr. 1M | Lang kontekst           |
| MiniMax M1                 | $0.20 / $1.10 pr. 1M | Hastighed               |
| Qwen Coder                 | $0.30 / $1.20 pr. 1M | Kode                    |
| OpenRouter (prisoptimeret) | varierer             | 100+ modeller, dynamisk |

**Strategi**: kombinationen `cost-optimized` vælger den model med den laveste
pris pr. token, som opfylder opgavens egenskabsfilter (billeder, JSON-tilstand,
værktøjer, maksimal kontekst).

## Niveau 3 — Gratis

**Udbydere uden omkostninger** — gratis niveauer, kreditprogrammer og daglige
OAuth-kvoter.

| Udbyder          | Gratis kvote/kreditter                        |
| ---------------- | --------------------------------------------- |
| Kiro AI          | Gratis Claude-niveau (generøs rimelig brug)   |
| OpenCode Free    | Ingen godkendelse, generøse hastighedsgrænser |
| Qoder            | Gratis OAuth                                  |
| Google Vertex AI | $300 i kredit til nye konti                   |
| Amazon Q         | Gratis niveau for AWS-brugere                 |
| Pollinations     | Åben offentlig API                            |
| Cloudflare AI    | Gratis Workers AI-niveau                      |

**Strategi**: kombinationen `auto` med budgetloft sender anmodninger hertil, når
niveau 1+2 fejler, eller når `useFreeOnly=true` er angivet. Gratis udbydere har ofte
lavere hastighedsgrænser — kredsløbsafbryderen genaktiverer dem efter en pause.

## Konfiguration af niveauer

Dashboard → **Niveauer** → tildel dine udbydere. Standardindstillingerne (fra
`tierDefaults.json`) er fornuftige; rediger dem, når du har bestemte abonnementer,
der skal prioriteres, eller udbydere, der skal udelukkes.

Auto-Combos vurdering baseret på 16 faktorer tager også højde for niveauet. Se
[`docs/routing/AUTO-COMBO.md`](../routing/AUTO-COMBO.md).

## Telemetri

Dashboard → **Forbrug** viser antallet af tokens brugt pr. niveau pr. dag. Brug dette til at:

- Bekræfte, at niveau 1 udnyttes fuldt ud (ellers spilder du værdien af abonnementet)
- Identificere, hvilke modeller på niveau 2 der vælges oftest (konsolider til 1-2)
- Kontrollere, at niveau 3 sparer penge på test- og udforskningsarbejdsbelastninger

## Almindelige mønstre

### Udelukkende gratis arbejdsbelastning

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "costInv": 0.5, "tierPriority": 0.3 } } }
}
```

Prioriterer niveau 3 kraftigt; bruger kun niveau 2, hvis niveau 3 ikke er tilgængeligt.

### Abonnement først med billig fallback

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

Eksplicit sorteret liste, der svarer til niveau 1 → niveau 2 → niveau 3.
