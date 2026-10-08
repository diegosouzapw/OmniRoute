# Embeddings client runbook (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

הערות למפעילים עבור `POST /v1/embeddings` כאשר OmniRoute נמצא לפני
Hindsight 0.9.1 ‏(`encode(list[str])` לטקסט בלבד) ו-Memorix 1.6.0 (שער המדיה של
Jina). אומת בסביבה חיה ב-2026-08-17 מול OmniRoute 3.8.49 בכתובת
`https://omniroute.jaguar-fish.ts.net/v1`. אין סודות להלן.

## מזהי מודלים פעילים

| מזהה לקוח                                      | HTTP | וקטורים     | ממד     | הערות                                   |
| ---------------------------------------------- | ---- | ----------- | ------- | --------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | אצווה 2 → 2 | 3072    | פועל ללא מפתח Gemini מקורי              |
| `openrouter/google/gemini-embedding-2-preview` | 200  | אצווה 2 → 2 | 3072    | אותו מרחב כמו המזהה שאינו preview       |
| `openrouter/google/gemini-embedding-001`       | 200  | אצווה 2 → 2 | 3072    | מופיע ב-`GET /v1/embeddings`            |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | אצווה 2 → 2 | 1024    | מזהה ה-omni הקנוני של Jina              |
| `jina/jina-embeddings-v5-omni-small`           | 200  | אצווה 2 → 2 | 1024    | כינוי; `model` בתגובה הוא `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | אצווה 2 → 2 | 1024    | גם המזהה ללא קידומת מזוהה               |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768** | מרחב וקטורי שונה מזה של small           |

`GET /v1/models` ו-`GET /v1/embeddings` הציגו את
`jina-ai/jina-embeddings-v5-omni-small` ‏(1024), את
`jina-ai/jina-embeddings-v5-omni-nano` ‏(768) ואת
`openrouter/google/gemini-embedding-001`. הם **לא** הציגו את
`openrouter/google/gemini-embedding-2`, אף שמזהה זה כבר מספק שירות.

אין לערבב nano ‏(768 ממדים) ו-small ‏(1024 ממדים) באותו אינדקס. הם אינם
ברי-השוואה.

## מזהים שבורים / מטעים

### Gemini Embedding 2 מקורי

בקשה:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

בפועל (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` מחזיר את אותה שגיאת 400. ‏`google/gemini-embedding-2`
מחזיר HTTP **400** עם `Unknown embedding provider: google`, אלא אם צומת ספק
מותאם אישית משתמש בקידומת `google`.

מצופה: הטמעה מקורית של Gemini עם מפתח Google AI Studio אצל הספק
`gemini`, או שגיאת 400 שמציינת את מזהה OpenRouter הפעיל.

שחזור (יש להשחיר את אסימון הגישה):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

תחליף פעיל:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

`gemini-embedding-2` המקורי אינו יכול לפעול באמצעות GitOps בלבד. יש להוסיף מפתח של Google AI
Studio כחיבור לספק `gemini` (דרך לוח הבקרה או באמצעות ייבוא
`GEMINI_API_KEY` אל OmniRoute). הסוד הזה אינו נמצא במאגר זה.

### הנתיב הרב-אופני של Jina

`POST /v1/multimodal-embeddings` → HTTP **404**

```json
{
  "error": {
    "message": "Unknown API route: /v1/multimodal-embeddings",
    "type": "not_found",
    "code": "unknown_route",
    "path": "/v1/multimodal-embeddings"
  }
}
```

יש להשתמש ב-`POST /v1/embeddings` עד שיהיה כינוי.

### אובייקט תמונה של Jina / Memorix

פריט התמונה הקנוני של OmniRoute ‏(PNG בגודל 28×28, ‏784 פיקסלים — Jina דוחה 1×1):

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [
    {
      "type": "image",
      "source": {
        "type": "base64",
        "data": "<base64-png>",
        "media_type": "image/png"
      }
    }
  ]
}
```

בפועל: HTTP **200**, וקטור אחד, 1024 ממדים.

המבנה המקורי של Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

בפועל: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

גם ערבוב של `{ "text": "..." }` עם `{ "image": "data:..." }` גורם לאותה שגיאת 400.

## הערות ללקוחות

### Hindsight 0.9.1

ההטמעות של Hindsight הן לטקסט בלבד (`encode(list[str])`). הוא אינו שולח
אובייקטי תמונה. יש להפנות את כתובת ה-URL הבסיסית של ההטמעות תואמות-OpenAI של Hindsight אל
`/v1` של OmniRoute ולהשתמש במזהה פעיל מהטבלה לעיל
(`jina-ai/jina-embeddings-v5-omni-small` או
`openrouter/google/gemini-embedding-2`). אין להגדיר את המודל למזהה ללא הקידומת
`gemini-embedding-2`, אלא אם קיים בשער מפתח API עבור `gemini`.

### Memorix 1.6.0

Memorix מתייחס רק ל-`baseUrl` שתואם ל-`/jina\.ai/i` כאל מדיה מקורית. כתובת
URL של OmniRoute נשארת בנתיב המיועד לטקסט בלבד, גם כאשר המודל הוא Jina omni.
השער הזה הוא בעיה בלקוח Memorix. ללא תלות בכך, OmniRoute עדיין דוחה
את גוף הבקשה של Jina במבנה `{image: "data:..."}` ש-Memorix היה שולח אילו השער
היה נפתח, ולכן לקוחות תואמי-Jina אינם יכולים להטמיע תמונות דרך OmniRoute
ללא הסכימה הקנונית `{type,source}`.

יש להשתמש ב-`jina-ai/jina-embeddings-v5-omni-small` עבור טקסט. אין להפנות את
`base_url` של Memorix אל `https://api.jina.ai` — יש להשאיר את OmniRoute כתחנה היחידה.
