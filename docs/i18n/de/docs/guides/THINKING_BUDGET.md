# Thinking Budget (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Dashboard:** Einstellungen → **KI** → Thinking-Budget  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Quelle:** `open-sse/services/thinkingBudget.ts`

Das Thinking-Budget steuert, ob OmniRoute **die Thinking-/Reasoning-Parameter des Clients umschreibt**, bevor Anfragen an die Provider weitergeleitet werden. Es aktiviert oder deaktiviert **weder** Komprimierung noch Routing oder Prompt-Cache.

## Modi

| Modus                        | Verhalten von OmniRoute                                                                                              | Verwendungszweck                                                                                                                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (Standard) | Lässt Client-Felder unverändert (`reasoning`, `reasoning_effort`, Claude `thinking`, Gemini `thinking_config` usw.). | **Codex / Desktop / jeder Client, der Aufwand und Reasoning-Zusammenfassungen selbst steuern soll.** Erforderlich für sichtbare Thinking-Bereiche, wenn der Client `reasoning.summary` anfordert. |
| **`auto`**                   | **Entfernt alle** Thinking-/Reasoning-Felder aus dem Request-Body, bevor die Anfrage an den Upstream gesendet wird.  | Nur, wenn der **Provider** bewusst Standardwerte festlegen soll und kein clientgesteuertes Thinking benötigt wird. Bedeutet **nicht** „Thinking automatisch anzeigen“.                            |
| **`custom`**                 | Überschreibt jede Anfrage mit einem festen Token-Budget für Thinking.                                                | Harte Obergrenze für Thinking-Tokens im gesamten Datenverkehr.                                                                                                                                    |
| **`adaptive`**               | Skaliert das Budget ausgehend von einem Basisaufwand anhand der Nachrichtenanzahl, der Tools und der Prompt-Länge.   | Flexible Token-Steuerung, ohne die Absicht des Clients vollständig zu verwerfen.                                                                                                                  |

### Was `auto` entfernt

Wenn der Modus `auto` ist, löscht `stripThinkingConfig()` unter anderem:

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking` sowie `output_config.effort`, sofern vorhanden
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Wenn ein Client (z. B. Codex Desktop) `reasoning: { effort: "ultra", summary: "detailed" }` gesendet hat, **verwirft `auto` dieses Objekt**. Der Upstream kann weiterhin einige Reasoning-Tokens abrechnen, gibt jedoch häufig **leere oder ausschließlich verschlüsselte** Reasoning-Elemente zurück – sodass die Benutzeroberfläche keinen brauchbaren Thinking-Stream anzeigt.

## Was dies **nicht** ist

| Funktion                                           | Beziehung                                                                                                                                 |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Komprimierung** (Caveman, RTK, stacked, …)       | Separate Pipeline. Funktioniert in jedem Thinking-Budget-Modus.                                                                           |
| **Prompt-/semantischer Cache**                     | Separat. Vom Thinking-Budget-Modus nicht betroffen.                                                                                       |
| **Combo-Routing / Fallbacks**                      | Separat. Nicht betroffen.                                                                                                                 |
| **Token-Limits für API-Schlüssel / Kostenbudgets** | Separat. Nicht betroffen.                                                                                                                 |
| **Reasoning-Replay-Cache**                         | Multi-Turn-Wiedereinspeisung für strikte Provider (DeepSeek, Kimi, Qwen-thinking, …). Nicht dasselbe wie „Thinking anzeigen“ in Desktop.  |
| **Entschlüsselung von `encrypted_content`**        | **Unmöglich.** Private Reasoning-Blobs von OpenAI/Codex sind undurchsichtig. OmniRoute entschlüsselt sie niemals (#7095 / #7176 / #7304). |

## Sichtbarer Denkprozess (Codex-/Responses-Clients)

Damit ein Client den Denktext anzeigen kann, benötigen Sie **alles** Folgende:

1. Thinking-Budget-Modus = **`passthrough`** (oder `custom`/`adaptive`, sofern Zusammenfassungsanforderungen für den verwendeten Pfad ausreichend unverändert bleiben).
2. Der Client fordert eine Zusammenfassung an, z. B. Codex `model_reasoning_summary = "detailed"` / `auto` (nicht `none`).
3. Der Upstream streamt tatsächlich `response.reasoning_summary_text.*` (oder das Element enthält ein nicht leeres `reasoning.summary`).

Wenn Sie nur einen „verschlüsselten privaten Denkprozess“ erhalten, gilt entweder:

- Der Modus war **`auto`** (die Client-Anforderung wurde entfernt), oder
- der Upstream gab `encrypted_content` ohne Zusammenfassungstext zurück (Einschränkung des Anbieters; OmniRoute kann nur einen Platzhalter anzeigen, keinen Klartext).

## API-Beispiele

```bash
# Lesen
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Empfohlen für die Sichtbarkeit des Denkprozesses in Codex / Desktop
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Schema (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; optional `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`.

### Persistenz / Neustart

Der Wert wird unter dem Einstellungsschlüssel `thinkingBudget` gespeichert und beim Prozessstart geladen (`hydrateThinkingBudgetConfig`). Starten Sie nach Änderungen über die Datenbank oder bestimmte Pfade außerhalb der API **den OmniRoute-Prozess neu**, damit der In-Memory-Singleton dem Datenträgerstand entspricht.

## Checkliste für Betreiber

- [ ] Codex-/Desktop-Benutzer: Modus = **passthrough**
- [ ] Lassen Sie die Komprimierung aktiviert, wenn Sie bei **Nachrichten** Tokens sparen möchten, nicht durch das Entfernen des Denkprozesses
- [ ] Erwarten Sie nicht, dass `auto` „mehr Denkprozess anzeigt“
- [ ] Nur verschlüsselte Zusammenfassungen sind ein Verhalten des **Anbieters**; `passthrough` kann sie nicht entschlüsseln

## Zugehörige Dokumentation

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — mehrstufiger `reasoning_content`-Cache
- [USER_GUIDE.md](./USER_GUIDE.md) — Registerkarten des Einstellungs-Dashboards
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — Einstellungs-Endpunkte
