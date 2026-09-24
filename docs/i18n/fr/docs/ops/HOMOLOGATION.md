# Homologation Suite (`npm run homolog`) (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇧🇦 [bs](../../../bs/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Validation E2E en environnement réel du déploiement OmniRoute exécuté sur le VPS d’homologation
(`HOMOLOG_BASE_URL`, par ex. `http://192.168.0.15:20128`). Une seule commande remplace la liste de contrôle
manuelle de la version STOP #2 par une exécution automatisée produisant des preuves.

## Ce qui est couvert

| Couche                                | Ce qui est vérifié                                                                                                                                                                                                          | Implémentation                                                                |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — santé/parité                     | `/api/monitoring/health` répond avec le code `200`, `status: "healthy"` et la version attendue                                                                                                                              | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — clé éphémère                    | Connexion administrateur → `POST /api/keys` crée une clé d’API limitée à l’exécution, révoquée (`DELETE /api/keys/:id`) dans un bloc `finally`, quel que soit le résultat                                                   | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — surface de l’API                | Catalogue `/v1/models`, véritable complétion de chat sans streaming (modèle critique pour le niveau, `max_tokens: 5`), erreur `401` avec une clé non valide et endpoint public `/api/monitoring/health`                     | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — streaming SSE                   | Véritable complétion de chat en streaming ; vérifie `text/event-stream`, au moins un delta de contenu et un marqueur de fin `[DONE]`                                                                                        | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — fournisseurs réels               | Une requête de chat à coût minimal pour chaque fournisseur critique présent dans le catalogue `/v1/models` actif, générée à la volée avec promptfoo                                                                         | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — authentification de l’interface | Se connecte une seule fois via le véritable formulaire de connexion et réutilise la session (`storageState`) sur l’ensemble de la couche d’interface                                                                        | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — routes de l’interface           | Chaque fichier `page.tsx` statique sous `src/app/(dashboard)/dashboard` (détecté depuis le système de fichiers, routes dynamiques `[param]` ignorées) se charge sans erreur HTTP, erreur de page ni limite d’erreur Next.js | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — flux critique de l’interface    | Crée une clé d’API via l’interface du tableau de bord, puis la révoque (ne laisse aucun résidu sur le VPS)                                                                                                                  | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — rapport unifié                   | Fusionne httpYac (via `junit-to-ctrf`), l’adaptateur promptfoo→CTRF et le rapporteur CTRF de Playwright dans un unique fichier `homolog-ctrf.json`, ainsi qu’un fichier `homolog-report/summary.md` lisible par l’humain    | `scripts/homolog/run.mjs`                                                     |

Aucune intervention d’un LLM dans la réexécution elle-même — il s’agit d’une batterie de
régression déterministe, et non d’une évaluation. L’IA n’intervient que dans les futurs travaux de maintenance (voir la feuille de route ci-dessous).

## Prérequis

1. Copiez `.env.homolog.example` vers `.env.homolog` (ignoré par git — ne le validez jamais) et renseignez :
   - `HOMOLOG_BASE_URL` — le déploiement cible, par exemple `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — le mot de passe de gestion du tableau de bord pour ce déploiement.
   - `HOMOLOG_CRITICAL_PROVIDERS` — les préfixes de fournisseurs séparés par des virgules qui font l’objet d’une véritable
     requête de chat de vérification rapide (par exemple `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — laissez vide lors des exécutions normales ; la suite crée et révoque sa
     propre clé éphémère. Définissez cette variable uniquement pour déboguer une seule couche de manière isolée.
2. Exécutez `npm install` dans le dépôt (les dépendances de la suite — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — sont des devDependencies ordinaires).
3. Exécutez `npx playwright install` si les binaires du navigateur ne sont pas déjà présents.

## Procédure d’exécution

```bash
npm run homolog
```

Pour effectuer la validation sur un déploiement dont la version ne correspond pas au `package.json`
local (par exemple, un environnement d’homologation encore sur une version corrective précédente), remplacez explicitement la
version attendue :

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

L’exécution se termine avec un code différent de zéro si une couche échoue et tente toujours de révoquer la clé
API éphémère qu’elle a créée, même en cas d’échec (bloc `finally` dans `scripts/homolog/run.mjs`).

## Lecture du rapport

Toutes les sorties sont enregistrées dans `homolog-report/` (ignoré par git) :

- `summary.md` — le même tableau que celui affiché sur la sortie standard, avec une ligne par couche (✅/❌ + détails).
- `homolog-ctrf.json` — le rapport CTRF unifié (fusion des résultats API/SSE, de vérification rapide des fournisseurs et
  de l’interface utilisateur) — il s’agit de l’artefact à joindre à la liste de contrôle STOP #2 d’une version.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — les
  rapports bruts/intermédiaires de chaque couche.
- `promptfooconfig.yaml`, `provider-misses.json` — la configuration promptfoo générée pour
  l’exécution actuelle et tous les fournisseurs critiques absents du catalogue actif.

Un échec de L0 interrompt immédiatement l’exécution (aucune clé éphémère n’est créée), car une incompatibilité
de version ou d’état de santé signifierait que chaque couche en aval validerait le mauvais déploiement.

## Réinitialisation de la référence lorsque l’interface utilisateur change légitimement

L4b (vérification rapide des routes) et L4c (parcours de la clé API dans l’interface utilisateur) s’appuient sur de véritables sélecteurs DOM, et non sur des
instantanés ; la plupart des modifications légitimes de l’interface utilisateur ne nécessitent donc aucune mise à jour de la suite. Lorsqu’une modification
rend un sélecteur inopérant (par exemple, le libellé d’un bouton a été renommé ou une page de paramètres a été déplacée) :

1. Vérifiez à nouveau le sélecteur par rapport au code source actuel (les spécifications indiquent déjà le
   fichier et la ligne sur lesquels chaque sélecteur a été vérifié — suivez le même modèle, ne faites pas de supposition).
2. Mettez à jour la spécification dans `tests/homolog/ui/`.
3. Réexécutez `npm run homolog` (ou uniquement la spécification Playwright concernée) sur le VPS pour
   confirmer le correctif, puis validez les modifications.

Cette suite ne contient aucune référence visuelle/au pixel près (F1) — consultez la feuille de route à ce sujet.

## Feuille de route (F2 / F3)

La conception et le déploiement progressif sont décrits dans la spécification de planification interne
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (sans lien — artefact
interne de `_tasks/`, ne faisant pas partie de la documentation suivie dans ce dépôt). Résumé :

- **F2** — enregistrement complet du parcours → les agents de test Playwright (`planner`/`generator`)
  le transforment en spécifications de parcours (créer une combinaison, tester un fournisseur, modifier les paramètres, outils MCP) +
  référence de régression visuelle (Lost Pixel) avec des masques sur les données dynamiques (métriques,
  horodatages, journaux) + une routine de maintenance `healer` pour chaque version.
- **F3** — couverture de la résilience, des contrats et de l’intégration : toxiproxy + un faux fournisseur compatible avec OpenAI
  sur la machine de développement, une combinaison `homolog-resilience` sur le VPS pointant vers celui-ci
  (délai d’expiration injecté → vérifier le repli + l’ouverture/la fermeture du disjoncteur via
  `/api/monitoring/health`) ; tests contractuels Schemathesis contrôlés par une condition sur
  `docs/openapi.yaml` (`--max-examples` faible, graines fixes, points de terminaison non-LLM uniquement) ; et
  intégration de `npm run homolog` + son `summary.md` dans la phase STOP #2 de `/generate-release`.
