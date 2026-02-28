# Dépannage

🌐 **Languages:** 🇺🇸 [English](../../TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../pt-BR/TROUBLESHOOTING.md) | 🇪🇸 [Español](../es/TROUBLESHOOTING.md) | 🇫🇷 [Français](../fr/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../it/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../ru/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../zh-CN/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../de/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../in/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../th/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../uk-UA/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../ar/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../ja/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../vi/TROUBLESHOOTING.md) | 🇧🇬 [Български](../bg/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../da/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../fi/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../he/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../hu/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../id/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../ko/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../ms/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../nl/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../no/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../pt/TROUBLESHOOTING.md) | 🇷🇴 [Română](../ro/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../pl/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../sk/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../sv/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../phi/TROUBLESHOOTING.md)

Problèmes courants et solutions pour OmniRoute.

---

## Corrections rapides

| Problème                                       | Solutions                                                                              |
| ---------------------------------------------- | -------------------------------------------------------------------------------------- |
| La première connexion ne fonctionne pas        | Vérifiez `INITIAL_PASSWORD` dans `.env` (par défaut : `123456`)                        |
| Le tableau de bord s'ouvre sur le mauvais port | Définir `PORT=20128` et `NEXT_PUBLIC_BASE_URL=http://localhost:20128`                  |
| Aucun journal de requête sous `logs/`          | Définir `ENABLE_REQUEST_LOGS=true`                                                     |
| EACCES : autorisation refusée                  | Définissez `DATA_DIR=/path/to/writable/dir` pour remplacer `~/.omniroute`              |
| La stratégie de routage ne sauvegarde pas      | Mise à jour vers v1.4.11+ (correctif du schéma Zod pour la persistance des paramètres) |

---

## Problèmes de fournisseur

### "Le modèle linguistique n'a pas fourni de messages"

**Cause :** Quota de fournisseur épuisé.

**Correction :**

1. Vérifiez le suivi des quotas du tableau de bord
2. Utilisez un combo avec des niveaux de secours
3. Passez au niveau moins cher/gratuit

### Limitation du débit

**Cause :** Quota d'abonnement épuisé.

**Correction :**

- Ajouter une solution de secours : `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Utilisez GLM/MiniMax comme sauvegarde bon marché

### Jeton OAuth expiré

OmniRoute actualise automatiquement les jetons. Si les problèmes persistent :

1. Tableau de bord → Fournisseur → Reconnecter
2. Supprimez et rajoutez la connexion du fournisseur

---

## Problèmes liés au cloud

### Erreurs de synchronisation dans le cloud

1. Vérifiez que `BASE_URL` pointe vers votre instance en cours d'exécution (par exemple, `http://localhost:20128`)
2. Vérifiez que `CLOUD_URL` pointe vers votre point de terminaison cloud (par exemple, `https://omniroute.dev`)
3. Gardez les valeurs `NEXT_PUBLIC_*` alignées avec les valeurs côté serveur

### Cloud `stream=false` renvoie 500

**Symptôme :** `Unexpected token 'd'...` sur le point de terminaison cloud pour les appels sans streaming.

**Cause :** Upstream renvoie la charge utile SSE alors que le client attend du JSON.

**Solution :** Utilisez `stream=true` pour les appels directs vers le cloud. Le runtime local inclut le repli SSE → JSON.

### Cloud indique Connecté mais "Clé API non valide"

1. Créez une nouvelle clé à partir du tableau de bord local (`/api/keys`)
2. Exécutez la synchronisation cloud : Activer le cloud → Synchroniser maintenant
3. Les clés anciennes/non synchronisées peuvent toujours renvoyer `401` sur le cloud

---

## Problèmes avec Docker

### L'outil CLI indique qu'il n'est pas installé

1. Vérifiez les champs d'exécution : `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Pour le mode portable : utilisez la cible d'image `runner-cli` (CLI fournies)
3. Pour le mode de montage de l'hôte : définissez `CLI_EXTRA_PATHS` et montez le répertoire bin de l'hôte en lecture seule.
4. Si `installed=true` et `runnable=false` : le binaire a été trouvé mais le contrôle de santé a échoué

### Validation rapide de l'exécution

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Problèmes de coûts

### Coûts élevés

1. Vérifiez les statistiques d'utilisation dans le tableau de bord → Utilisation
2. Basculez le modèle principal vers GLM/MiniMax
3. Utilisez l'offre gratuite (Gemini CLI, iFlow) pour les tâches non critiques
4. Définissez les budgets de coûts par clé API : Tableau de bord → Clés API → Budget

---

## Débogage

### Activer les journaux de requêtes

Définissez `ENABLE_REQUEST_LOGS=true` dans votre fichier `.env`. Les journaux apparaissent sous le répertoire `logs/`.

### Vérifier l'état du fournisseur

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Stockage d'exécution

- État principal : `${DATA_DIR}/db.json` (fournisseurs, combos, alias, clés, paramètres)
- Utilisation : `${DATA_DIR}/usage.json`, `${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`
- Journaux de demande : `<repo>/logs/...` (quand `ENABLE_REQUEST_LOGS=true`)

---

## Problèmes de disjoncteur

### Fournisseur bloqué à l'état OUVERT

Lorsque le disjoncteur d'un fournisseur est OUVERT, les demandes sont bloquées jusqu'à l'expiration du temps de recharge.

**Correction :**

1. Accédez à **Tableau de bord → Paramètres → Résilience**
2. Vérifiez la carte de disjoncteur du fournisseur concerné
3. Cliquez sur **Réinitialiser tout** pour effacer tous les disjoncteurs ou attendez l'expiration du temps de recharge.
4. Vérifiez que le fournisseur est réellement disponible avant de réinitialiser

### Le fournisseur continue de déclencher le disjoncteur

Si un fournisseur entre à plusieurs reprises dans l’état OPEN :

1. Vérifiez **Tableau de bord → Santé → Santé du fournisseur** pour connaître le modèle d'échec.
2. Accédez à **Paramètres → Résilience → Profils de fournisseur** et augmentez le seuil d'échec.
3. Vérifiez si le fournisseur a modifié les limites de l'API ou nécessite une ré-authentification
4. Examinez la télémétrie de latence : une latence élevée peut provoquer des échecs liés au délai d'attente.

---

## Problèmes de transcription audio

### Erreur "Modèle non pris en charge"

- Assurez-vous d'utiliser le préfixe correct : `deepgram/nova-3` ou `assemblyai/best`
- Vérifiez que le fournisseur est connecté dans **Tableau de bord → Fournisseurs**

### La transcription revient vide ou échoue

- Vérifiez les formats audio pris en charge : `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Vérifiez que la taille du fichier est dans les limites du fournisseur (généralement < 25 Mo)
- Vérifier la validité de la clé API du fournisseur dans la carte du fournisseur

---

## Débogage du traducteur

Utilisez **Tableau de bord → Traducteur** pour déboguer les problèmes de traduction de format :

| Mode                   | Quand utiliser                                                                                                       |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Aire de jeux**       | Comparez les formats d'entrée/sortie côte à côte : collez une requête qui a échoué pour voir comment elle se traduit |
| **Testeur de chat**    | Envoyez des messages en direct et inspectez la charge utile complète de la demande/réponse, y compris les en-têtes   |
| **Banc d'essai**       | Exécutez des tests par lots sur les combinaisons de formats pour identifier les traductions défectueuses             |
| **Moniteur en direct** | Observez le flux de requêtes en temps réel pour détecter les problèmes de traduction intermittents                   |

### Problèmes de format courants

- **Les balises de réflexion n'apparaissent pas** — Vérifiez si le fournisseur cible prend en charge la réflexion et le paramètre de budget de réflexion
- **Abandon des appels d'outils** — Certaines traductions de format peuvent supprimer des champs non pris en charge ; vérifier en mode Playground
- **Invite système manquante** — Claude et Gemini gèrent les invites système différemment ; vérifier le résultat de la traduction
- **Le SDK renvoie une chaîne brute au lieu d'un objet** — Corrigé dans la version 1.1.0 : le désinfectant de réponse supprime désormais les champs non standard (`x_groq`, `usage_breakdown`, etc.) qui provoquent des échecs de validation OpenAI SDK Pydantic
- **GLM/ERNIE rejette le rôle `system`** — Corrigé dans la version 1.1.0 : le normalisateur de rôle fusionne automatiquement les messages système dans les messages utilisateur pour les modèles incompatibles
- **Rôle `developer` non reconnu** — Corrigé dans la v1.1.0 : automatiquement converti en `system` pour les fournisseurs non OpenAI
- **`json_schema` ne fonctionne pas avec Gemini** — Corrigé dans la version 1.1.0 : `response_format` est maintenant converti en `responseMimeType` + `responseSchema` de Gemini

---

## Paramètres de résilience

### La limite de débit automatique ne se déclenche pas

- La limite de débit automatique s'applique uniquement aux fournisseurs de clés API (pas à OAuth/abonnement)
- Vérifiez que **Paramètres → Résilience → Profils de fournisseur** a activé la limite de débit automatique.
- Vérifiez si le fournisseur renvoie les codes d'état `429` ou les en-têtes `Retry-After`

### Réglage de l'intervalle exponentiel

Les profils de fournisseur prennent en charge ces paramètres :

- **Délai de base** — Temps d'attente initial après le premier échec (par défaut : 1 s)
- **Délai maximum** — Limite maximale du temps d'attente (par défaut : 30 s)
- **Multiplicateur** — De combien augmenter le délai par échec consécutif (par défaut : 2x)

### Troupeau anti-tonnerre

Lorsque de nombreuses requêtes simultanées atteignent un fournisseur à débit limité, OmniRoute utilise mutex + limitation de débit automatique pour sérialiser les requêtes et éviter les échecs en cascade. Ceci est automatique pour les fournisseurs de clés API.

---

## Toujours bloqué ?

- **Problèmes GitHub** : [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Architecture** : voir [link](ARCHITECTURE.md) pour les détails internes
- **Référence API** : voir [link](API_REFERENCE.md) pour tous les points de terminaison
- **Tableau de bord de santé** : consultez **Tableau de bord → Santé** pour connaître l'état du système en temps réel
- **Traducteur** : utilisez **Tableau de bord → Traducteur** pour déboguer les problèmes de format
