# Playground Studio (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Fonctionnalité :** Playground Studio — espace de travail unifié de test d’IA pour `/dashboard/playground`.
> **Plans :** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Statut :** Publié dans la v3.8.6

---

## Vue d’ensemble

Playground Studio transforme `/dashboard/playground`, qui était un simple éditeur basé sur Monaco, en
un espace de travail de test complet. Il remplace l’ancien `page.tsx` par une structure `PlaygroundStudio`
qui affiche quatre onglets et un volet de configuration partagé.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Chat] [⚖ Comparer] [{} API] [🔧 Créer]    142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {contenu de l’onglet actif}             │ ─ Configuration           │
│                                          │ Endpoint  [chat ∨]        │
│                                          │ Modèle    [gpt-5.4 ∨]     │
│                                          │ Système   [zone de texte] │
│                                          │ Temp.     ▕▕▔▔ 0.7        │
│                                          │ Préréglages [▾ charger]   │
│                                          │              [enregistrer]│
│                                          │ [✨ Améliorer le prompt]   │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Onglets

### Onglet Chat

Fait évoluer `ChatPlayground.tsx` en un atelier de streaming multi-tour :

- Rendu Markdown complet via `MarkdownMessage.tsx` (blocs de code, tableaux, listes, liens).
- Prompt système provenant du volet de configuration partagé.
- Nombre de tokens/coût par message (tokens du prompt + de complétion).
- Régénération de la dernière réponse.
- Envoi vers `POST /v1/chat/completions` avec streaming SSE.

### Onglet Comparer

Le principal élément différenciateur pour un proxy : exécuter 1 prompt sur jusqu’à **4 modèles en parallèle**.

- Jusqu’à 4 colonnes, chacune diffusant indépendamment depuis `/v1/chat/completions`.
- Bouton `+ Ajouter un modèle` (raccourci Cmd+K) pour ajouter des colonnes.
- `Tout exécuter ▶` déclenche tous les flux simultanément via `Promise.all` + un `AbortController` par colonne.
- L’option globale **Tout annuler** interrompt chaque flux en cours.
- Le composant `ProviderMetrics` de chaque colonne affiche en temps réel le TTFT, le TPS, les tokens et le coût estimé.
- Métriques libellées **« estimation côté client »** (D12) — mesurées à partir du premier fragment SSE.

### Onglet API

Conserve 100 % de l’éditeur Monaco d’origine pour les utilisateurs avancés (D14) :

- 10 endpoints : complétions de chat, complétions, embeddings, images, audio, parole, transcriptions, modérations, reclassement, recherche.
- Téléversement de fichiers multimodaux.
- Streaming SSE avec sortie en temps réel.
- Encapsulé dans `ApiTab.tsx` (chargement différé, `ssr: false`).

### Onglet Créer

Interface utilisateur pour les outils/appels de fonctions et les sorties structurées :

- `ToolsBuilder.tsx` — ajouter/modifier/supprimer des éléments `tools[]` avec un éditeur de schéma JSON pour chaque outil.
  Valide les paramètres via `ToolDefinitionSchema` (Zod).
- `StructuredOutputEditor.tsx` — activer/désactiver le mode JSON + éditeur de schéma JSON.
  Valide la réponse par rapport au schéma via `StructuredOutputSchema` (Zod).
- Envoie la requête à `/v1/chat/completions` avec `tools[]` et/ou `response_format`.

## Panneau de configuration (partagé)

`StudioConfigPane.tsx` — toujours visible, réductible.

| Champ                | Composant             | Notes                                                                                                  |
| -------------------- | --------------------- | ------------------------------------------------------------------------------------------------------ |
| Point de terminaison | `<select>`            | 10 options correspondant à `PlaygroundEndpoint`                                                        |
| Modèle               | `<input>`             | texte libre, p. ex. `openai/gpt-4o`                                                                    |
| Prompt système       | `<textarea>`          | transmis à tous les onglets                                                                            |
| Paramètres           | `ParamSliders`        | temperature, max_tokens, top_p, pénalité de présence/fréquence, seed, stop                             |
| Préréglages          | `PresetPicker`        | charger/enregistrer des instantanés de configuration nommés (conservés dans la base de données)        |
| Améliorer le prompt  | `ImprovePromptButton` | ouvre une fenêtre modale d’avertissement concernant le quota, appelle `/api/playground/improve-prompt` |

L’état est remonté dans `PlaygroundStudio.tsx` et transmis à tous les onglets. Le changement d’onglet
préserve l’état de la configuration.

---

## Barre supérieure

`StudioTopBar.tsx` :

- Sélecteur d’onglets (role="tablist").
- `TokenCostCounter` — affichage en temps réel des tokens (↑/↓) et du coût estimé.
- Bouton d’exportation du code (`</>`) — ouvre `ExportCodeModal`.

---

## Fenêtre modale d’exportation du code

`ExportCodeModal.tsx` utilise `codeExport.ts` pour générer des extraits curl / Python / TypeScript
à partir du `PlaygroundState` actuel. L’espace réservé à la clé API est toujours `$OMNIROUTE_API_KEY` (D11).

---

## Outil d’amélioration des prompts

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt` :

1. La fenêtre modale avertit que l’opération « consommera du quota ».
2. Après confirmation, envoie `{ system, prompt, model, tone }` à la route.
3. La route appelle `/v1/chat/completions` en interne avec `promptImprover.META_SYSTEM_PROMPT`.
4. Renvoie `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. L’interface utilisateur met à jour le prompt système du panneau de configuration et le prompt utilisateur de l’onglet Chat.

---

## Préréglages

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*` :

- Stockés dans la table SQLite `playground_presets` (migration `084_playground_presets.sql`).
- Chaque préréglage stocke : `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD : liste via `GET`, création via `POST`, `GET /:id`, `PUT /:id`, `DELETE /:id`.

---

## Métriques de flux

`useStreamMetrics.ts` + `streamMetrics.ts` (fonction pure) :

- `start()` — enregistre l’heure de début de la requête.
- `onFirstChunk()` — enregistre le TTFT.
- `onChunk(n)` — cumule le nombre de tokens de complétion.
- `finish(usage?)` — calcule les métriques finales : `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Tarification issue de la table statique dans `src/lib/playground/types.ts` (indiquée comme « estimée » — D13).

---

## Routes backend

| Méthode  | Chemin                           | Gestionnaire                                                                                      |
| -------- | -------------------------------- | ------------------------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | Valide `ImprovePromptRequestSchema` avec Zod ; appelle `/v1/chat/completions` avec le méta-prompt |
| `GET`    | `/api/playground/presets`        | Renvoie `{ presets: PlaygroundPresetListItem[] }`                                                 |
| `POST`   | `/api/playground/presets`        | Crée un préréglage ; valide `PlaygroundPresetCreateSchema`                                        |
| `GET`    | `/api/playground/presets/:id`    | Renvoie un préréglage ou une erreur 404                                                           |
| `PUT`    | `/api/playground/presets/:id`    | Mise à jour partielle                                                                             |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                               |

Authentification : facultative (`REQUIRE_API_KEY`). Erreurs via `buildErrorBody()` (règle stricte nº 12).

---

## Fichiers clés

| Chemin                                                                     | Rôle                                                  |
| -------------------------------------------------------------------------- | ----------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Composant principal, orchestration des onglets        |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Onglets + compteur + bouton d’exportation             |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Panneau de configuration partagé                      |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Espace de travail de chat                             |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Comparaison de plusieurs modèles                      |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Éditeur Monaco (conservé)                             |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Outils + sortie structurée                            |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Fenêtre modale d’exportation du code                  |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Colonne de comparaison individuelle                   |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | Affichage TTFT/TPS                                    |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Hook de métriques côté client                         |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | Hook CRUD des préréglages                             |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Hook d’amélioration des prompts                       |
| `src/lib/playground/codeExport.ts`                                         | Générateur curl/Python/TS (partagé avec Search Tools) |
| `src/lib/playground/promptImprover.ts`                                     | Générateur de méta-prompts                            |
| `src/lib/playground/streamMetrics.ts`                                      | Calcul pur des métriques                              |
| `src/lib/db/playgroundPresets.ts`                                          | Module de base de données (CRUD)                      |
| `src/app/api/playground/improve-prompt/route.ts`                           | Route REST d’amélioration des prompts                 |
| `src/app/api/playground/presets/route.ts`                                  | Liste et création des préréglages                     |
| `src/app/api/playground/presets/[id]/route.ts`                             | Consultation/mise à jour/suppression des préréglages  |
| `src/lib/db/migrations/084_playground_presets.sql`                         | Migration de base de données                          |

---

## Dépannage

| Symptôme                                            | Cause                                          | Correctif                                                                                                    |
| --------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| L’éditeur Monaco ne s’affiche pas dans l’onglet API | Monaco chargé lors du rendu côté serveur (SSR) | Vérifiez que `ApiTab` utilise `dynamic(..., { ssr: false })`                                                 |
| Les flux de comparaison démarrent séquentiellement  | Utilisation incorrecte de `Promise.all`        | Tous les démarrages de flux doivent être lancés dans un seul appel à `Promise.all`                           |
| Les métriques affichent une TTFT `null`             | Gestionnaire du premier fragment non connecté  | Vérifiez que `useStreamMetrics.onFirstChunk()` est appelé dans la boucle de lecture SSE                      |
| Le préréglage n’est pas conservé                    | Migration de la base de données non exécutée   | Exécutez `npm run db:migrate` ou redémarrez le serveur (la migration s’exécute automatiquement au démarrage) |
| L’amélioration du prompt renvoie une erreur 502     | Modèle non défini dans la configuration        | L’utilisateur doit saisir un nom de modèle dans le volet de configuration avant de lancer l’amélioration     |
| Le code exporté affiche `MISSING_API_KEY`           | Espace réservé non inséré                      | `codeExport.ts` utilise toujours `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`                                |

---

## Références

- Plan directeur : `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Plan de la fonctionnalité : `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Exportation du code : `src/lib/playground/codeExport.ts`
- Outil d’amélioration des prompts : `src/lib/playground/promptImprover.ts`
- Studio des outils de recherche : `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
