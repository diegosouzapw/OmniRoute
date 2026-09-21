# Embeddings client runbook (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Uwagi operatorskie dotyczące `POST /v1/embeddings`, gdy OmniRoute znajduje się przed
Hindsight 0.9.1 (tekstowe `encode(list[str])`) i Memorix 1.6.0 (bramka multimediów
Jina). Zweryfikowano w środowisku produkcyjnym 2026-08-17 z OmniRoute 3.8.49 pod adresem
`https://omniroute.jaguar-fish.ts.net/v1`. Poniżej nie ma żadnych sekretów.

## Działające identyfikatory modeli

| Identyfikator klienta                          | HTTP | Wektory      | Wymiar  | Uwagi                                                          |
| ---------------------------------------------- | ---- | ------------ | ------- | -------------------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | partia 2 → 2 | 3072    | Działa bez natywnego klucza Gemini                             |
| `openrouter/google/gemini-embedding-2-preview` | 200  | partia 2 → 2 | 3072    | Ta sama przestrzeń co w przypadku identyfikatora bez `preview` |
| `openrouter/google/gemini-embedding-001`       | 200  | partia 2 → 2 | 3072    | Wymieniony w `GET /v1/embeddings`                              |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | partia 2 → 2 | 1024    | Kanoniczny identyfikator Jina omni                             |
| `jina/jina-embeddings-v5-omni-small`           | 200  | partia 2 → 2 | 1024    | Alias; pole `model` w odpowiedzi ma wartość `jina-ai/...`      |
| `jina-embeddings-v5-omni-small`                | 200  | partia 2 → 2 | 1024    | Sam identyfikator również jest rozpoznawany                    |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1        | **768** | Inna przestrzeń wektorowa niż w wariancie small                |

`GET /v1/models` i `GET /v1/embeddings` zwracały
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) oraz
`openrouter/google/gemini-embedding-001`. Nie zwracały
`openrouter/google/gemini-embedding-2`, mimo że ten identyfikator już działa.

Nie należy mieszać wariantów nano (768 wymiarów) i small (1024 wymiary) w jednym indeksie. Nie są one
porównywalne.

## Niedziałające / mylące identyfikatory

### Natywny Gemini Embedding 2

Żądanie:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Rzeczywisty wynik (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` zwraca ten sam błąd 400. `google/gemini-embedding-2`
zwraca HTTP **400** `Unknown embedding provider: google`, chyba że niestandardowy
węzeł dostawcy używa prefiksu `google`.

Oczekiwany wynik: natywne osadzenie Gemini z kluczem Google AI Studio dla
dostawcy `gemini` albo błąd 400 wskazujący działający identyfikator OpenRouter.

Reprodukcja (zanonimizuj token bearer):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Działający zamiennik:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Natywny `gemini-embedding-2` nie może działać wyłącznie na podstawie konfiguracji GitOps. Klucz Google AI
Studio musi zostać dodany jako połączenie z dostawcą `gemini` (przez panel lub
przez zaimportowanie `GEMINI_API_KEY` do OmniRoute). Tego sekretu nie ma w tym repozytorium.

### Ścieżka multimodalna Jina

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

Do czasu udostępnienia aliasu należy używać `POST /v1/embeddings`.

### Obiekt obrazu Jina / Memorix

Kanoniczny element obrazu OmniRoute (PNG 28×28, 784 piksele — Jina odrzuca obrazy 1×1):

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

Rzeczywisty wynik: HTTP **200**, 1 wektor, 1024 wymiary.

Natywny format Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Rzeczywisty wynik: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

Połączenie `{ "text": "..." }` z `{ "image": "data:..." }` skutkuje tym samym błędem 400.

## Uwagi dotyczące klientów

### Hindsight 0.9.1

Osadzenia Hindsight są wyłącznie tekstowe (`encode(list[str])`). Nie wysyła on
obiektów obrazów. Ustaw bazowy adres URL osadzeń zgodnych z OpenAI w Hindsight na
OmniRoute `/v1` i użyj działającego identyfikatora z powyższej tabeli
(`jina-ai/jina-embeddings-v5-omni-small` lub
`openrouter/google/gemini-embedding-2`). Nie ustawiaj modelu na sam
`gemini-embedding-2`, chyba że w bramie istnieje klucz API `gemini`.

### Memorix 1.6.0

Memorix traktuje multimedia natywnie tylko wtedy, gdy `baseUrl` pasuje do `/jina\.ai/i`. Adres URL
OmniRoute pozostaje na ścieżce wyłącznie tekstowej, nawet jeśli model to Jina omni.
Ta bramka jest problemem klienta Memorix. Niezależnie od tego OmniRoute nadal odrzuca
treść Jina w formacie `{image: "data:..."}`, którą Memorix wysłałby po
otwarciu bramki, dlatego klienci zgodni z Jina nie mogą osadzać obrazów za pośrednictwem OmniRoute
bez użycia kanonicznego schematu `{type,source}`.

Dla tekstu używaj `jina-ai/jina-embeddings-v5-omni-small`. Nie kieruj parametru
`base_url` Memorix na `https://api.jina.ai` — OmniRoute powinien pozostać jedynym pośrednikiem.
