# Error Message Sanitization (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Source de vérité :** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` et les générateurs publics dans `open-sse/utils/error.ts`
> **Tests :** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Dernière mise à jour :** 2026-09-02 — v3.8.51
> **Public :** tout ingénieur intervenant sur les réponses d’erreur (routes HTTP, flux SSE, exécuteurs, gestionnaires MCP).
> **Statut :** **OBLIGATOIRE** pour chaque chemin de code qui renvoie un message d’erreur à un client.

## Pourquoi cela existe

La règle CodeQL `js/stack-trace-exposure` (CWE-209) signale tout chemin de code dans lequel un message d’erreur provenant d’une exception d’exécution atteint une réponse HTTP / SSE sans être assaini. Les traces de pile et les chemins de fichiers absolus dans les réponses de production fournissent aux attaquants :

- La structure des répertoires internes (`/srv/app/src/lib/...`) → reconnaissance en vue d’attaques ultérieures.
- Les versions des bibliothèques / frameworks déduites des frames de pile → sélection d’exploits ciblés.
- Des valeurs d’exécution sensibles susceptibles d’être interpolées sous forme de chaînes dans les erreurs (requêtes de base de données, valeurs de configuration).

L’utilitaire `sanitizeErrorMessage` exporté par `open-sse/utils/error.ts` supprime les catégories de
fuites suivantes :

1. Les suffixes de frames de pile JavaScript physiques, sérialisés et clairement intégrés en ligne.
2. Les chemins de système de fichiers absolus POSIX, Windows, UNC et `file://`, tout en préservant les URL HTTPS sûres
   et les routes d’API explicitement marquées.
3. Les affectations d’identifiants, les formats de jetons courants de fournisseurs, les blocs PEM de clés privées et les URL de données
   en base64.

L’assainisseur limite la longueur des entrées et adopte un comportement fermé lorsqu’une valeur levée refuse la conversion en chaîne.
L’assainissement récursif du JSON en amont supprime également les clés non sûres d’identifiants/de chemins, les alias de session et
les clés de contrôle du prototype avant la sérialisation d’une réponse.

## Modèle obligatoire

### 1. Construction d’une réponse d’erreur (routes HTTP / API)

Utilisez `buildErrorBody()` — l’assainissement est intégré :

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... logique du gestionnaire ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Ou, pour les fonctions utilitaires du même module :

```ts
import {
  errorResponse, // objet Response prêt à l’emploi
  writeStreamError, // rédacteur SSE
  createErrorResult, // structure { success: false, status, response, ... }
  unavailableResponse, // ajoute Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Toutes appliquent la frontière canonique des erreurs publiques. `errorResponse`, `writeStreamError` et
`createErrorResult` passent par `buildErrorBody` ; les trois utilitaires spécialisés de nouvelle tentative/coupe-circuit
projettent et assainissent directement leur contexte public. **Vous n’avez jamais besoin d’appeler
`sanitizeErrorMessage` manuellement** lorsque vous utilisez ces utilitaires.

### 2. Enveloppes d’erreur personnalisées (rare)

Lorsque vous ne pouvez pas utiliser les utilitaires ci-dessus (p. ex. lorsque la structure de la réponse est imposée par un protocole en amont comme Connect-RPC), importez directement `sanitizeErrorMessage` :

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

C’est la seule manière autorisée de construire un corps d’erreur personnalisé. Consultez `open-sse/executors/cursor.ts::buildErrorResponse` pour l’implémentation de référence.

### 3. Journalisation ou réponse

Les exceptions internes de confiance peuvent conserver leur message complet et leur trace de pile afin que les opérateurs puissent effectuer le débogage. Les valeurs
provenant de fournisseurs, de la validation, de sessions de navigateur ou de limites proches des identifiants doivent être
assainies avant d’entrer dans la sortie de la console, les métadonnées d’audit ou les journaux d’appels persistants. Modèle :

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // exception interne de confiance uniquement
  return errorResponse(500, getErrorMessage(err)); // assaini — envoyé au client
}
```

Pour les échecs contrôlés par un fournisseur, projetez également la valeur journalisée :

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Modèles interdits

❌ **Ne placez jamais** la sortie brute d’une exception dans le corps d’une Response :

```ts
// MAUVAIS : la trace de pile et les chemins de fichiers parviennent au client
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **N’implémentez jamais** votre propre mécanisme de sélection de la première ligne :

```ts
// MAUVAIS : ne supprime pas les chemins absolus et peut diverger de l’utilitaire canonique
const safe = String(err).split("\n")[0];
```

❌ **N’assainissez jamais** uniquement dans la route en oubliant le chemin SSE. Tout ce qui écrit dans un flux doit passer par `writeStreamError` (ou par son mécanisme sous-jacent `buildErrorBody`).

❌ **N’incluez jamais** intentionnellement `process.cwd()`, `__filename`, `__dirname` ou des chemins dérivés de variables d’environnement
dans les messages d’erreur. L’assainisseur couvre les chemins absolus comme mesure de défense en profondeur, mais les appelants ne doivent pas
construire en premier lieu des messages révélant la topologie.

## Couverture dans la CI

`tests/unit/error-message-sanitization.test.ts` garantit que :

- Chaque route sous `/api/model-combo-mappings/*` renvoie des corps assainis pour les erreurs 4xx/5xx.
- `sanitizeErrorMessage` supprime les traces de pile multilignes.
- `sanitizeErrorMessage` remplace les chemins absolus POSIX et Windows par `<path>`.
- `sanitizeErrorMessage` traite de manière sûre les entrées `null`/`undefined`/instances de `Error`.
- `buildErrorBody` n’expose jamais de traces de pile dans son champ `message`.

Lors de l’ajout d’une nouvelle route ou d’un nouvel exécuteur, copiez le modèle d’assertion de ce fichier. Le seuil de couverture (`npm run test:coverage`) impose une couverture ≥60 % des instructions/lignes/fonctions/branches — les chemins d’erreur doivent être couverts.

## Contrôles associés

- Les alertes CodeQL `js/stack-trace-exposure` dans `.github/security` doivent toujours être **soit** corrigées à l’aide de ces utilitaires, **soit** rejetées avec un commentaire citant ce document.
- La configuration de masquage de `pino` (`src/shared/utils/logRedaction.ts`) traite séparément les journaux structurés de confiance. Ce document couvre les messages de réponse publics et les valeurs contrôlées par les fournisseurs qui franchissent les limites persistantes des journaux d’appels/de proxy.
- La liste de refus des en-têtes en amont (`src/shared/constants/upstreamHeaders.ts`) couvre les fuites d’en-têtes — maintenez les deux fichiers alignés lors de l’ajout d’un nouveau risque d’exfiltration.

## Transmission des détails en amont

`buildErrorBody` accepte un troisième argument facultatif `upstreamDetails` (corps brut analysé provenant du fournisseur en amont). Lorsqu’il est fourni, il est assaini par `sanitizeUpstreamDetails` avant d’être inclus dans la réponse sous `upstream_details`.

Un quatrième argument facultatif `classification`
(`{ type?: string; code?: string; reason?: string }`) accepte une classification publique explicite.
Chaque champ est projeté dans le vocabulaire borné des identifiants publics. Les valeurs non sûres, ressemblant à des identifiants d’accès, contenant des caractères de contrôle ou trop longues sont remplacées par le type/code dérivé du statut ; une raison facultative non sûre est omise. Les identifiants de statut HTTP à trois chiffres (`100` à `599`) restent valides pour les contrats de fournisseurs qui exposent le statut numérique en amont sous forme de code lisible par machine. La même plage bornée est acceptée dans la forme d’espace réservé de statut HTTP générée localement ; les nombres et noms arbitraires des fournisseurs restent en dehors du vocabulaire.

Transmettez chaque classification explicite dans ce quatrième argument. Ne remplacez jamais
`body.error.code`, `body.error.type` ou `body.error.reason` après le retour de `buildErrorBody()` ;
une modification postérieure à la construction contourne la projection publique.

Règles d’assainissement appliquées à `upstreamDetails` :

1. Feuilles de type chaîne : passage dans `sanitizeErrorMessage` (suppression des traces de pile et des chemins absolus).
2. Les clés non sûres liées aux chemins, aux identifiants d’accès, aux alias de session et au contrôle des prototypes sont supprimées.
3. Limite de profondeur : les imbrications au-delà de 4 niveaux sont remplacées par la chaîne `"[truncated]"`.
4. Les tableaux sont limités à 32 éléments.

Seuls les sites d’appel disposant d’un corps d’erreur de fournisseur analysé doivent transmettre `upstreamDetails`. Les erreurs OmniRoute internes (échecs d’analyse SSE, contenu vide, blocages par garde-fou) ne doivent pas l’inclure.

Ne transmettez PAS de valeur brute `err.stack`, `err.message` ni aucune chaîne provenant d’une exception d’exécution à `upstreamDetails`. Ces valeurs doivent toujours passer par `errorResponse` / `buildErrorBody(code, msg)` sans corps en amont.

La transmission sélective des erreurs 4xx en amont préserve la structure JSON sûre du fournisseur et la formulation requise par la récupération automatique du client, mais il ne s’agit pas d’une transmission octet pour octet : l’assainisseur récursif s’exécute toujours avant la sérialisation. Les corps cycliques, contenant des valeurs BigInt ou des fonctions `toJSON()` hostiles échouent de manière fermée et ne sont pas éligibles à la transmission. L’OCR et la modération appliquent la même règle ; les corps en amont non JSON, vides ou incorrectement étiquetés sont convertis dans l’enveloppe d’erreur JSON OmniRoute canonique.

## Limitation connue de CodeQL : les assainisseurs personnalisés ne sont pas reconnus

La requête CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) utilise une liste d’autorisation fixe de motifs d’assainissement (par exemple, `.split("\n")[0]` en ligne, `String#replace` avec certaines formes spécifiques d’expressions régulières, ou l’accès à `.message` sur `Error`). Elle ne reconnaît **pas** l’indirection via une fonction utilitaire personnalisée comme notre `sanitizeErrorMessage()`.

Cela signifie que les sites d’appel qui effectuent manifestement un assainissement via ce module — par exemple `open-sse/utils/error.ts::errorResponse` et `open-sse/executors/cursor.ts::buildErrorResponse` — peuvent continuer à déclencher l’alerte même si le code est fonctionnellement sûr. Précédents de rejets : `#224`, `#231` (mai 2026), tous deux marqués `false positive` avec une justification technique.

**Comment traiter une nouvelle occurrence :**

1. Vérifiez que le site d’appel fait effectivement passer le message par `sanitizeErrorMessage` / `buildErrorBody` / l’un des wrappers documentés ci-dessus (lisez la chaîne d’appels de bout en bout — ne vous fiez pas à un commentaire).
2. Vérifiez que `tests/unit/error-message-sanitization.test.ts` couvre ce chemin (ou ajoutez une couverture).
3. Rejetez l’alerte via `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` en faisant référence à ce document.
4. Ne « corrigez » **pas** le problème en intégrant `.split("\n")[0]` partout — la fonction utilitaire constitue la source unique de vérité ; dupliquer ce motif affaiblit l’assainisseur (suppression du nettoyage des chemins, de la limite de longueur et de la coercition de type) dans le seul but apparent de satisfaire l’analyseur.

L’adoption de fonctionnalités optionnelles telles que la [configuration d’assainisseur personnalisé `@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) de CodeQL constitue la solution à long terme ; elle ne relève pas de ce document.

## Références

- [CWE-209 : exposition d’informations par l’intermédiaire d’un message d’erreur](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP : aide-mémoire sur la gestion des erreurs](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit centralisant la fonction utilitaire : `1a39c31f` — _fix(security): mask public upstream creds + centralize error sanitization_
