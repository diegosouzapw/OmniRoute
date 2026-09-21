# Embeddings client runbook (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Notes d’exploitation pour `POST /v1/embeddings` lorsqu’OmniRoute est placé devant
Hindsight 0.9.1 (`encode(list[str])` en texte uniquement) et Memorix 1.6.0
(passerelle média Jina). Vérifié en conditions réelles le 2026-08-17 avec
OmniRoute 3.8.49 sur `https://omniroute.jaguar-fish.ts.net/v1`. Aucun secret
ci-dessous.

## Identifiants de modèle fonctionnels

| Identifiant client                             | HTTP | Vecteurs     | Dim     | Notes                                                     |
| ---------------------------------------------- | ---- | ------------ | ------- | --------------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | lot de 2 → 2 | 3072    | Fonctionne sans clé Gemini native                         |
| `openrouter/google/gemini-embedding-2-preview` | 200  | lot de 2 → 2 | 3072    | Même espace vectoriel que l’identifiant sans preview      |
| `openrouter/google/gemini-embedding-001`       | 200  | lot de 2 → 2 | 3072    | Répertorié dans `GET /v1/embeddings`                      |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | lot de 2 → 2 | 1024    | Identifiant Jina omni canonique                           |
| `jina/jina-embeddings-v5-omni-small`           | 200  | lot de 2 → 2 | 1024    | Alias ; le champ `model` de la réponse vaut `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | lot de 2 → 2 | 1024    | L’identifiant seul est également résolu                   |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1        | **768** | Espace vectoriel différent de small                       |

`GET /v1/models` et `GET /v1/embeddings` répertoriaient
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) et
`openrouter/google/gemini-embedding-001`. Ils ne répertoriaient **pas**
`openrouter/google/gemini-embedding-2`, bien que cet identifiant soit déjà
opérationnel.

Ne mélangez pas nano (768 dimensions) et small (1024 dimensions) dans un même
index. Ils ne sont pas comparables.

## Identifiants défectueux ou trompeurs

### Gemini Embedding 2 natif

Requête :

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Résultat réel (2026-08-17) : HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` renvoie la même erreur 400.
`google/gemini-embedding-2` renvoie HTTP **400**
`Unknown embedding provider: google`, sauf si un nœud de fournisseur
personnalisé utilise le préfixe `google`.

Résultat attendu : soit un embedding Gemini natif avec une clé Google AI Studio
sur le fournisseur `gemini`, soit une erreur 400 indiquant l’identifiant
OpenRouter fonctionnel.

Reproduction (masquez le jeton bearer) :

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Solution de remplacement fonctionnelle :

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Le modèle natif `gemini-embedding-2` ne peut pas fonctionner uniquement à
partir de GitOps. Une clé Google AI Studio doit être ajoutée en tant que
connexion au fournisseur `gemini` (tableau de bord ou `GEMINI_API_KEY` importée
dans OmniRoute). Ce secret ne se trouve pas dans ce dépôt.

### Chemin multimodal Jina

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

Utilisez `POST /v1/embeddings` jusqu’à ce qu’un alias existe.

### Objet image Jina / Memorix

Élément image canonique d’OmniRoute (PNG 28×28, 784 pixels — Jina refuse les
images 1×1) :

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

Résultat réel : HTTP **200**, 1 vecteur, 1024 dimensions.

Format natif de Memorix 1.6.0 / Jina :

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Résultat réel : HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

Le mélange de `{ "text": "..." }` avec `{ "image": "data:..." }` entraîne la
même erreur 400.

## Notes sur les clients

### Hindsight 0.9.1

Les embeddings Hindsight sont exclusivement textuels (`encode(list[str])`).
Hindsight n’envoie pas d’objets image. Faites pointer l’URL de base des
embeddings compatibles OpenAI de Hindsight vers `/v1` d’OmniRoute et utilisez
un identifiant fonctionnel du tableau ci-dessus
(`jina-ai/jina-embeddings-v5-omni-small` ou
`openrouter/google/gemini-embedding-2`). Ne définissez pas le modèle sur
`gemini-embedding-2` seul, sauf si une clé API `gemini` existe sur la
passerelle.

### Memorix 1.6.0

Memorix ne traite comme média natif qu’une `baseUrl` correspondant à
`/jina\.ai/i`. Une URL OmniRoute reste sur le chemin exclusivement textuel,
même lorsque le modèle est Jina omni. Cette passerelle est un problème du
client Memorix. Indépendamment de cela, OmniRoute refuse toujours le corps
Jina `{image: "data:..."}` que Memorix enverrait si la passerelle s’ouvrait ;
les clients compatibles Jina ne peuvent donc pas générer d’embeddings d’images
via OmniRoute sans le schéma canonique `{type,source}`.

Utilisez `jina-ai/jina-embeddings-v5-omni-small` pour le texte. Ne faites pas
pointer la `base_url` de Memorix vers `https://api.jina.ai` — conservez
OmniRoute comme unique intermédiaire.
