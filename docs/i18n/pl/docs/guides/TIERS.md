# OmniRoute Tiers — User Guide (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TIERS.md) · 🇪🇹 [am](../../../am/docs/guides/TIERS.md) · 🇸🇦 [ar](../../../ar/docs/guides/TIERS.md) · 🇦🇿 [az](../../../az/docs/guides/TIERS.md) · 🇧🇬 [bg](../../../bg/docs/guides/TIERS.md) · 🇧🇩 [bn](../../../bn/docs/guides/TIERS.md) · 🇧🇦 [bs](../../../bs/docs/guides/TIERS.md) · 🇨🇿 [cs](../../../cs/docs/guides/TIERS.md) · 🇩🇰 [da](../../../da/docs/guides/TIERS.md) · 🇩🇪 [de](../../../de/docs/guides/TIERS.md) · 🇬🇷 [el](../../../el/docs/guides/TIERS.md) · 🇪🇸 [es](../../../es/docs/guides/TIERS.md) · 🇪🇪 [et](../../../et/docs/guides/TIERS.md) · 🇮🇷 [fa](../../../fa/docs/guides/TIERS.md) · 🇫🇮 [fi](../../../fi/docs/guides/TIERS.md) · 🇫🇷 [fr](../../../fr/docs/guides/TIERS.md) · 🇮🇪 [ga](../../../ga/docs/guides/TIERS.md) · 🇮🇳 [gu](../../../gu/docs/guides/TIERS.md) · 🇳🇬 [ha](../../../ha/docs/guides/TIERS.md) · 🇮🇱 [he](../../../he/docs/guides/TIERS.md) · 🇮🇳 [hi](../../../hi/docs/guides/TIERS.md) · 🇭🇷 [hr](../../../hr/docs/guides/TIERS.md) · 🇭🇺 [hu](../../../hu/docs/guides/TIERS.md) · 🇦🇲 [hy](../../../hy/docs/guides/TIERS.md) · 🇮🇩 [id](../../../id/docs/guides/TIERS.md) · 🇳🇬 [ig](../../../ig/docs/guides/TIERS.md) · 🇮🇹 [it](../../../it/docs/guides/TIERS.md) · 🇯🇵 [ja](../../../ja/docs/guides/TIERS.md) · 🇬🇪 [ka](../../../ka/docs/guides/TIERS.md) · 🇰🇭 [km](../../../km/docs/guides/TIERS.md) · 🇮🇳 [kn](../../../kn/docs/guides/TIERS.md) · 🇰🇷 [ko](../../../ko/docs/guides/TIERS.md) · 🇱🇹 [lt](../../../lt/docs/guides/TIERS.md) · 🇱🇻 [lv](../../../lv/docs/guides/TIERS.md) · 🇮🇳 [ml](../../../ml/docs/guides/TIERS.md) · 🇮🇳 [mr](../../../mr/docs/guides/TIERS.md) · 🇲🇾 [ms](../../../ms/docs/guides/TIERS.md) · 🇲🇹 [mt](../../../mt/docs/guides/TIERS.md) · 🇲🇲 [my](../../../my/docs/guides/TIERS.md) · 🇳🇵 [ne](../../../ne/docs/guides/TIERS.md) · 🇳🇱 [nl](../../../nl/docs/guides/TIERS.md) · 🇳🇴 [no](../../../no/docs/guides/TIERS.md) · 🇮🇳 [or](../../../or/docs/guides/TIERS.md) · 🇮🇳 [pa](../../../pa/docs/guides/TIERS.md) · 🇵🇭 [phi](../../../phi/docs/guides/TIERS.md) · 🇵🇹 [pt](../../../pt/docs/guides/TIERS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TIERS.md) · 🇷🇴 [ro](../../../ro/docs/guides/TIERS.md) · 🇷🇺 [ru](../../../ru/docs/guides/TIERS.md) · 🇱🇰 [si](../../../si/docs/guides/TIERS.md) · 🇸🇰 [sk](../../../sk/docs/guides/TIERS.md) · 🇸🇮 [sl](../../../sl/docs/guides/TIERS.md) · 🇷🇸 [sr](../../../sr/docs/guides/TIERS.md) · 🇸🇪 [sv](../../../sv/docs/guides/TIERS.md) · 🇰🇪 [sw](../../../sw/docs/guides/TIERS.md) · 🇮🇳 [ta](../../../ta/docs/guides/TIERS.md) · 🇮🇳 [te](../../../te/docs/guides/TIERS.md) · 🇹🇭 [th](../../../th/docs/guides/TIERS.md) · 🇹🇷 [tr](../../../tr/docs/guides/TIERS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TIERS.md) · 🇵🇰 [ur](../../../ur/docs/guides/TIERS.md) · 🇺🇿 [uz](../../../uz/docs/guides/TIERS.md) · 🇻🇳 [vi](../../../vi/docs/guides/TIERS.md) · 🇳🇬 [yo](../../../yo/docs/guides/TIERS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TIERS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TIERS.md)

---

OmniRoute organizuje 352 obsługiwanych dostawców w 3 warstwy ekonomiczne. Każde
żądanie jest kierowane przez nie po kolei, aż jedna z nich zwróci prawidłową odpowiedź —
otrzymujesz najtańszą dostępną odpowiedź bez konieczności pisania kodu obsługującego rozwiązania zapasowe.

## Warstwa 1 — Subskrypcja

**Dostawcy, za których już płacisz.** OmniRoute wykorzystuje cały dostępny limit,
zanim wygaśnie.

| Dostawca                           | Dlaczego warstwa 1                                        |
| ---------------------------------- | --------------------------------------------------------- |
| Claude Code OAuth                  | Anthropic Pro/Team — stała opłata, często niewykorzystany |
| OpenAI Codex (subskrypcja ChatGPT) | Plus/Team obejmuje limit Codex                            |
| GitHub Copilot                     | Opłata za stanowisko — limit odnawia się co miesiąc       |
| Cursor IDE                         | Limit planu Pro                                           |
| Antigravity / Devin Desktop        | Wbudowane limity                                          |

**Strategia**: najpierw kieruj tutaj każde żądanie, które odpowiada mocnym stronom
modelu. Mechanizm śledzenia limitów monitoruje zbliżające się odnowienia, a strategia
łączona `reset-aware` odpowiednio ustala priorytety. Aby najpierw kierować ruch do
warstwy 1 i przechodzić do płatnych warstw dopiero po wyczerpaniu limitu, użyj
identyfikatora `auto/thrifty` — albo `auto/subscription`, aby pozostać przy zasobach
uwzględnionych w planie i w przeciwnym razie zakończyć żądanie niepowodzeniem. Zobacz
[Routowanie z priorytetem subskrypcji](../routing/SUBSCRIPTION_LADDER.md).

## Warstwa 2 — Tania

**Dostawcy rozliczani za token, kosztujący poniżej $1 za 1 mln tokenów.** Zarezerwowani
do zadań o dużym wolumenie lub używani po osiągnięciu limitów warstwy 1.

| Dostawca                          | Cena (wejście/wyjście) | Mocne strony                       |
| --------------------------------- | ---------------------- | ---------------------------------- |
| DeepSeek V4 Pro                   | $0.27 / $1.10 za 1 mln | Kod, rozumowanie                   |
| GLM-4.5                           | $0.60 / $2.20 za 1 mln | Długi kontekst                     |
| MiniMax M1                        | $0.20 / $1.10 za 1 mln | Szybkość                           |
| Qwen Coder                        | $0.30 / $1.20 za 1 mln | Kod                                |
| OpenRouter (optymalizacja cenowa) | różna                  | Ponad 100 modeli, dynamiczny wybór |

**Strategia**: strategia łączona `cost-optimized` wybiera model o najniższym koszcie
za token, który spełnia filtr możliwości zadania (obsługa obrazów, tryb JSON,
narzędzia, maksymalny kontekst).

## Warstwa 3 — Bezpłatna

**Dostawcy bez opłat** — bezpłatne plany, programy kredytowe, dzienne limity OAuth.

| Dostawca         | Bezpłatny limit / środki                                      |
| ---------------- | ------------------------------------------------------------- |
| Kiro AI          | Bezpłatna warstwa Claude (hojne zasady uczciwego użytkowania) |
| OpenCode Free    | Bez uwierzytelniania, hojne limity żądań                      |
| Qoder            | Bezpłatny OAuth                                               |
| Google Vertex AI | $300 środków dla nowych kont                                  |
| Amazon Q         | Bezpłatna warstwa dla użytkowników AWS                        |
| Pollinations     | Otwarte publiczne API                                         |
| Cloudflare AI    | Bezpłatna warstwa Workers AI                                  |

**Strategia**: strategia łączona `auto` z limitem budżetu kieruje żądania tutaj,
gdy warstwy 1 i 2 zawiodą lub gdy ustawiono `useFreeOnly=true`. Bezpłatni dostawcy
często mają bardziej restrykcyjne limity żądań — mechanizm circuit breaker przywraca
ich po okresie wycofania.

## Konfigurowanie warstw

Panel → **Warstwy** → przypisz swoich dostawców. Ustawienia domyślne (z pliku
`tierDefaults.json`) są rozsądne; zmień je, jeśli masz określone subskrypcje, którym
chcesz nadać priorytet, lub dostawców, których chcesz wykluczyć.

16-czynnikowa punktacja Auto-Combo również uwzględnia warstwę. Zobacz
[`docs/routing/AUTO-COMBO.md`](../routing/AUTO-COMBO.md).

## Telemetria

Panel → **Użycie** pokazuje dzienne zużycie tokenów w każdej warstwie. Użyj tych
informacji, aby:

- Potwierdzić, że warstwa 1 jest w pełni wykorzystywana (w przeciwnym razie marnujesz wartość subskrypcji)
- Określić, które modele warstwy 2 są wybierane najczęściej (ogranicz ich liczbę do 1–2)
- Sprawdzić, czy warstwa 3 pozwala oszczędzać na zadaniach testowych i eksploracyjnych

## Typowe wzorce

### Obciążenie wyłącznie bezpłatne

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "costInv": 0.5, "tierPriority": 0.3 } } }
}
```

Silnie preferuje warstwę 3; używa warstwy 2 tylko wtedy, gdy warstwa 3 jest niedostępna.

### Najpierw subskrypcja, z tanim rozwiązaniem zapasowym

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

Jawna uporządkowana lista odpowiadająca kolejności: warstwa 1 → warstwa 2 → warstwa 3.
