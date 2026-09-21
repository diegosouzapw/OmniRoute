# Providers Guide: Connect AI Models to OmniRoute (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../getting-started/PROVIDERS-GUIDE.md) · 🇪🇹 [am](../../../am/docs/getting-started/PROVIDERS-GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/getting-started/PROVIDERS-GUIDE.md) · 🇦🇿 [az](../../../az/docs/getting-started/PROVIDERS-GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/getting-started/PROVIDERS-GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/getting-started/PROVIDERS-GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/getting-started/PROVIDERS-GUIDE.md) · 🇩🇰 [da](../../../da/docs/getting-started/PROVIDERS-GUIDE.md) · 🇩🇪 [de](../../../de/docs/getting-started/PROVIDERS-GUIDE.md) · 🇬🇷 [el](../../../el/docs/getting-started/PROVIDERS-GUIDE.md) · 🇪🇸 [es](../../../es/docs/getting-started/PROVIDERS-GUIDE.md) · 🇪🇪 [et](../../../et/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/getting-started/PROVIDERS-GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/getting-started/PROVIDERS-GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇱 [he](../../../he/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/getting-started/PROVIDERS-GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/getting-started/PROVIDERS-GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/getting-started/PROVIDERS-GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇩 [id](../../../id/docs/getting-started/PROVIDERS-GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇹 [it](../../../it/docs/getting-started/PROVIDERS-GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/getting-started/PROVIDERS-GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/getting-started/PROVIDERS-GUIDE.md) · 🇰🇭 [km](../../../km/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/getting-started/PROVIDERS-GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/getting-started/PROVIDERS-GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/getting-started/PROVIDERS-GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/getting-started/PROVIDERS-GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/getting-started/PROVIDERS-GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/getting-started/PROVIDERS-GUIDE.md) · 🇲🇲 [my](../../../my/docs/getting-started/PROVIDERS-GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/getting-started/PROVIDERS-GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/getting-started/PROVIDERS-GUIDE.md) · 🇳🇴 [no](../../../no/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇳 [or](../../../or/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/getting-started/PROVIDERS-GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/getting-started/PROVIDERS-GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/getting-started/PROVIDERS-GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/getting-started/PROVIDERS-GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/getting-started/PROVIDERS-GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/getting-started/PROVIDERS-GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/getting-started/PROVIDERS-GUIDE.md) · 🇱🇰 [si](../../../si/docs/getting-started/PROVIDERS-GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/getting-started/PROVIDERS-GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/getting-started/PROVIDERS-GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/getting-started/PROVIDERS-GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/getting-started/PROVIDERS-GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇳 [te](../../../te/docs/getting-started/PROVIDERS-GUIDE.md) · 🇹🇭 [th](../../../th/docs/getting-started/PROVIDERS-GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/getting-started/PROVIDERS-GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/getting-started/PROVIDERS-GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/getting-started/PROVIDERS-GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/getting-started/PROVIDERS-GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/getting-started/PROVIDERS-GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/getting-started/PROVIDERS-GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/getting-started/PROVIDERS-GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/getting-started/PROVIDERS-GUIDE.md)

---

> **En bref** : un fournisseur est une connexion à un service d’IA (comme OpenAI, Anthropic ou Google). Vous avez besoin d’au moins un fournisseur pour utiliser OmniRoute.

---

## Qu’est-ce qu’un fournisseur ?

Considérez un fournisseur comme un **opérateur téléphonique**. Tout comme vous avez besoin d’un opérateur téléphonique pour passer des appels, vous avez besoin d’un fournisseur d’IA pour utiliser des modèles d’IA. OmniRoute est comparable à un téléphone qui fonctionne avec **tous les opérateurs** — vous pouvez basculer automatiquement de l’un à l’autre.

### Types de fournisseurs

| Type           | Description                         | Exemples                          | Coût                       |
| -------------- | ----------------------------------- | --------------------------------- | -------------------------- |
| **Gratuit**    | Aucun paiement requis               | Kiro, OpenCode Free, Pollinations | 0 $                        |
| **Clé API**    | Une clé API est nécessaire          | OpenAI, Anthropic, Google         | Paiement à l’utilisation   |
| **OAuth**      | Connexion avec votre compte         | Claude Code, GitHub Copilot       | Abonnement                 |
| **Cookie Web** | Utilise votre session de navigateur | ChatGPT Web (Codex), Gemini Web   | 0 $ (utilise votre compte) |

### Fournisseurs utilisant des cookies Web

Consultez **[WEB-COOKIE-GUIDE.md](./WEB-COOKIE-GUIDE.md)** pour obtenir les instructions générales de configuration, les limitations, les conseils de dépannage et les indications d’authentification propres à chaque fournisseur.
---

## Démarrage rapide : connectez votre premier fournisseur

### Configuration facultative des fournisseurs gratuits au premier démarrage

L’assistant de premier démarrage propose une carte explicite **Configurer les fournisseurs gratuits**. Il détermine la liste actuelle des fournisseurs admissibles à partir du registre des fournisseurs sans authentification d’OmniRoute, puis vous permet de les examiner et de désélectionner chacun d’entre eux avant de confirmer. OmniRoute affiche l’avertissement du fournisseur ainsi qu’un lien vers son site afin que vous puissiez d’abord consulter les conditions des tiers, leur politique de confidentialité, leur disponibilité et leurs limites de débit.

Cette action est facultative : terminer l’assistant ne crée jamais silencieusement de connexions à des fournisseurs gratuits. Il crée uniquement les fournisseurs qui sont encore manquants, laisse intactes les connexions existantes personnalisées et indique individuellement les fournisseurs créés, déjà configurés et en échec. Après un résultat partiel, vous pouvez réessayer en toute sécurité uniquement ceux qui ont échoué.

### Option A : fournisseur gratuit (aucune carte bancaire)

1. Ouvrez le tableau de bord à l’adresse `http://localhost:20128`
2. Accédez à **Fournisseurs** → **Ajouter un fournisseur**
3. Sélectionnez l’un de ces fournisseurs gratuits :
   - **Kiro AI** — Modèles Claude gratuits (aucune authentification nécessaire)
   - **OpenCode Free** — Modèles GPT gratuits (aucune authentification nécessaire)
   - **Pollinations** — GPT-5, Claude et Gemini gratuits (aucune clé nécessaire)
   - **LongCat** — 10 millions de jetons gratuits (allocation unique, compte et vérification d’identité requis)
   - **Cloudflare AI** — Plus de 50 modèles, 10 000 neurones/jour
   - **MLX Gemma 26B** — Modèle Apple Silicon local (~38,5 jetons/s, ~15,9 Go de RAM)
   - **MLX Qwen 3.8 27B** — Modèle Apple Silicon local (~9,1 jetons/s, ~13,1 Go de RAM)
4. Cliquez sur **Connecter**
5. Terminé ! Vous disposez maintenant d’un accès gratuit à l’IA.

### Option B : fournisseur avec clé API (payant)

1. Obtenez une clé API sur le site Web du fournisseur :
   - **OpenAI** : https://platform.openai.com/api-keys
   - **Anthropic** : https://console.anthropic.com/
   - **Google** : https://aistudio.google.com/apikey
   - **DeepSeek** : https://platform.deepseek.com/
   - **Groq** : https://console.groq.com/
2. Ouvrez le tableau de bord à l’adresse `http://localhost:20128`
3. Accédez à **Fournisseurs** → **Ajouter un fournisseur**
4. Sélectionnez votre fournisseur
5. Collez votre clé API
6. Cliquez sur **Connecter**
7. Terminé ! Vous avez maintenant accès aux modèles de ce fournisseur.

### Option C : fournisseur OAuth (abonnement)

1. Ouvrez le tableau de bord à l’adresse `http://localhost:20128`
2. Accédez à **Fournisseurs** → **Ajouter un fournisseur**
3. Sélectionnez votre fournisseur (par exemple, Claude Code ou GitHub Copilot)
4. Cliquez sur **Se connecter avec OAuth**
5. Connectez-vous avec votre compte
6. Terminé ! Vous avez maintenant accès aux modèles inclus dans votre abonnement.

### Option D : modèles MLX locaux (Apple Silicon)

Pour les Mac Apple Silicon dotés de mémoire unifiée, OmniRoute permet de se connecter à des modèles MLX locaux exécutés via `mlx-lm.server` comme à des fournisseurs locaux ordinaires compatibles avec OpenAI.

#### Prérequis

- **Mac Apple Silicon** (M1/M2/M3/M4) avec au moins 24 Go de mémoire unifiée recommandés
- Gestionnaire de paquets **uv** : `curl -LsSf https://astral.sh/uv/install.sh | sh`
- **mlx-lm** : `uv pip install mlx-lm`

#### Démarrage rapide

1. **Installez les dépendances** :

   ```bash
   # Installer uv s’il n’est pas déjà installé
   curl -LsSf https://astral.sh/uv/install.sh | sh

   # Installer mlx-lm
   uv pip install mlx-lm
   ```

2. **Démarrez manuellement les serveurs MLX** (dans des terminaux distincts) :

   ```bash
   # Terminal 1 : Gemma 4 26B A4B IT-QAT (port 11435)
   uv run mlx_lm.server --model mlx-community/gemma-4-26B-A4B-it-qat-q4_0-mlx-aligned --port 11435 --host 127.0.0.1

   # Terminal 2 : Qwen 3.8 27B MLX Mixed (port 11436)
   uv run mlx_lm.server --model maglun/Qwen3.8-27B-MLX-Mixed-3.80bpw --port 11436 --host 127.0.0.1
   ```

3. **Connectez-vous depuis le tableau de bord OmniRoute** :
   - Accédez à **Fournisseurs** → **Ajouter un fournisseur**
   - Sélectionnez **MLX Gemma 26B** ou **MLX Qwen 3.8 27B**
   - Cliquez sur **Connecter** (aucune clé API nécessaire)

4. **Utilisez les modèles avec OpenCode** :
   ```bash
   # Configurer OpenCode pour utiliser OmniRoute
   opencode config set api.base_url http://localhost:20128/v1
   opencode config set api.key <your-omniroute-api-key>

   # Utiliser les modèles MLX
   opencode run --model mlx-gemma/gemma-4-26b
   opencode run --model mlx-qwen/qwen3.8-27b
   ```

#### Gestion de la mémoire

**Important** : avec 24 Go de mémoire unifiée, **un seul grand modèle MLX peut être exécuté à la fois**.

- Gemma 26B : ~15,9 Go de mémoire maximale
- Qwen 3.8 27B : ~13,1 Go de mémoire maximale

Vous devez gérer cela manuellement :

- N’exécutez qu’un seul serveur MLX à la fois, ou
- Exécutez-les sur des machines distinctes, ou
- Arrêtez-en un avant de démarrer l’autre

OmniRoute ne gère pas automatiquement les processus des serveurs MLX — il se contente d’acheminer les requêtes vers les points de terminaison compatibles avec OpenAI que vous configurez.

#### Prise en charge des appels d’outils

Les deux modèles prennent en charge les appels d’outils compatibles avec OpenAI. Testez-les avec :

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "mlx-gemma/gemma-4-26b",
    "messages": [{"role": "user", "content": "What is 2+2? Use the calculator tool."}],
    "tools": [{"type": "function", "function": {"name": "calculator", "description": "Calculate", "parameters": {"type": "object", "properties": {"expression": {"type": "string"}}, "required": ["expression"]}}}]
  }'
```

#### Dépannage

| Problème                  | Solution                                                                                                                   |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Le serveur ne démarre pas | Consultez `uv run mlx_lm.server --help` et vérifiez les identifiants des modèles                                           |
| Mémoire insuffisante      | Assurez-vous qu’un seul modèle est exécuté ; fermez les autres applications ; consultez le Moniteur d’activité             |
| Connexion refusée         | Vérifiez que le serveur s’exécute sur le bon port (11435/11436)                                                            |
| Réponses lentes           | La première requête charge le modèle en mémoire (~30-60 s) ; les requêtes suivantes sont rapides                           |
| Échec de l’appel d’outils | Assurez-vous que le modèle prend en charge les outils ; recherchez les erreurs de traduction dans les journaux d’OmniRoute |

---

## Meilleurs fournisseurs gratuits

Ces fournisseurs offrent un **accès gratuit** sans carte bancaire :

| Fournisseur       | Quota gratuit                 | Modèles                                  | Méthode de connexion            |
| ----------------- | ----------------------------- | ---------------------------------------- | ------------------------------- |
| **Kiro AI**       | 50 crédits/mois               | Claude Sonnet 4.5, Haiku 4.5, Opus 4.6   | Aucune authentification requise |
| **OpenCode Free** | Illimité                      | GPT-4o, Claude, Gemini                   | Aucune authentification requise |
| **Pollinations**  | Aucune clé requise            | GPT-5, Claude, Gemini, DeepSeek, Llama 4 | Aucune authentification requise |
| **LongCat**       | 10M en une seule fois         | LongCat-2.0                              | Clé API + KYC                   |
| **Cloudflare AI** | 10K neurones/jour             | Plus de 50 modèles                       | Aucune authentification requise |
| **NVIDIA NIM**    | Environ 40 RPM                | 129 modèles                              | Clé API requise                 |
| **Cerebras**      | 5 $ de crédit à l’inscription | GLM 4.7, GPT-OSS 120B                    | Clé API + carte                 |
| **Qoder**         | Illimité                      | Kimi-K2, DeepSeek-R1, Qwen3-coder        | Aucune authentification requise |

**Conseil** : connectez plusieurs fournisseurs gratuits pour bénéficier d’une **IA gratuite et illimitée** avec basculement automatique !

---

## Meilleurs fournisseurs payants

Ces fournisseurs proposent des **modèles de haute qualité** accessibles avec des clés API :

| Fournisseur   | Meilleurs modèles           | Coût                        | Offre gratuite                |
| ------------- | --------------------------- | --------------------------- | ----------------------------- |
| **OpenAI**    | GPT-5, GPT-4o               | 2,50 $-10 $/1M de tokens    | 5 $ de crédits gratuits       |
| **Anthropic** | Claude Opus 4.6, Sonnet 4.6 | 3 $-15 $/1M de tokens       | 5 $ de crédits gratuits       |
| **Google**    | Gemini 2.5 Pro, Flash       | 0,075 $-1,25 $/1M de tokens | 1 500 requêtes/jour gratuites |
| **DeepSeek**  | DeepSeek V4                 | 0,14 $-0,28 $/1M de tokens  | 5M de tokens gratuits         |
| **Groq**      | Llama 4, Mixtral            | 0,05 $-0,27 $/1M de tokens  | 30 RPM gratuits               |
| **xAI**       | Grok 3                      | 0,30 $-0,60 $/1M de tokens  | —                             |

---

## Comment connecter un fournisseur (étape par étape)

### Étape 1 : ouvrir le tableau de bord

Accédez à `http://localhost:20128` dans votre navigateur.

### Étape 2 : accéder aux fournisseurs

Cliquez sur **Fournisseurs** dans la barre latérale.

### Étape 3 : cliquer sur Ajouter un fournisseur

Cliquez sur le bouton **+ Ajouter un fournisseur**.

### Étape 4 : sélectionner votre fournisseur

Parcourez la liste ou recherchez votre fournisseur. Cliquez dessus.

### Étape 5 : saisir les identifiants

- **Fournisseurs gratuits** : aucun identifiant requis — cliquez simplement sur **Connecter**
- **Fournisseurs avec clé API** : collez votre clé API
- **Fournisseurs OAuth** : cliquez sur **Se connecter avec OAuth** et identifiez-vous

### Étape 6 : tester la connexion

Cliquez sur **Tester la connexion** pour vérifier qu’elle fonctionne.

### Étape 7 : terminé !

Votre fournisseur est maintenant connecté. Vous pouvez l’utiliser avec `model: "auto"` ou indiquer directement le fournisseur.

---

## Utilisation de plusieurs fournisseurs

OmniRoute fonctionne de manière optimale avec **plusieurs fournisseurs**. Cela vous permet de bénéficier des avantages suivants :

- **Basculement automatique** — si un fournisseur échoue, OmniRoute essaie le suivant
- **Optimisation des coûts** — OmniRoute choisit le fournisseur le moins cher pour chaque requête
- **Optimisation de la vitesse** — OmniRoute choisit le fournisseur le plus rapide pour chaque requête
- **Optimisation de la qualité** — OmniRoute choisit le meilleur fournisseur pour chaque tâche

### Configuration recommandée

Connectez au moins **3 fournisseurs** pour une expérience optimale :

1. **Un fournisseur gratuit** (Kiro, OpenCode Free ou Pollinations) — toujours disponible
2. **Un fournisseur rapide** (Groq, Cerebras) — pour des réponses rapides
3. **Un fournisseur de qualité** (OpenAI, Anthropic, Google) — pour les tâches complexes

Utilisez ensuite `model: "auto"` et OmniRoute choisira automatiquement le meilleur fournisseur pour chaque requête.

---

## Configuration spécifique aux fournisseurs

### OpenAI

1. Obtenez une clé API : https://platform.openai.com/api-keys
2. Dans OmniRoute : Fournisseurs → Ajouter un fournisseur → OpenAI
3. Collez la clé API → Se connecter

### Anthropic

1. Obtenez une clé API : https://console.anthropic.com/
2. Dans OmniRoute : Fournisseurs → Ajouter un fournisseur → Anthropic
3. Collez la clé API → Se connecter

### Google (Gemini)

1. Obtenez une clé API : https://aistudio.google.com/apikey
2. Dans OmniRoute : Fournisseurs → Ajouter un fournisseur → Gemini
3. Collez la clé API → Se connecter

### DeepSeek

1. Obtenez une clé API : https://platform.deepseek.com/
2. Dans OmniRoute : Fournisseurs → Ajouter un fournisseur → DeepSeek
3. Collez la clé API → Se connecter

### Groq

1. Obtenez une clé API : https://console.groq.com/
2. Dans OmniRoute : Fournisseurs → Ajouter un fournisseur → Groq
3. Collez la clé API → Se connecter

---

## Questions fréquentes

### « Dois-je payer pour utiliser OmniRoute ? »

**Non !** OmniRoute est gratuit et open source. Vous pouvez utiliser des fournisseurs gratuits (Kiro, OpenCode Free, Pollinations) sans rien payer. Vous ne payez que si vous choisissez d'utiliser des fournisseurs payants.

### « Par quel fournisseur devrais-je commencer ? »

Commencez par **Kiro AI** — il est gratuit, ne nécessite aucune clé API et vous donne accès aux modèles Claude. Ajoutez ensuite d'autres fournisseurs selon vos besoins.

### « Puis-je utiliser plusieurs fournisseurs à la fois ? »

**Oui !** C'est tout l'intérêt d'OmniRoute. Connectez plusieurs fournisseurs et utilisez `model: "auto"` pour laisser OmniRoute choisir le meilleur pour chaque requête.

### « Que se passe-t-il si un fournisseur devient indisponible ? »

OmniRoute ignore automatiquement les fournisseurs défaillants et essaie le suivant. Vous n'avez rien à faire.

### « Comment déconnecter un fournisseur ? »

Accédez à Fournisseurs → cliquez sur le fournisseur → cliquez sur **Déconnecter**.

### « Puis-je utiliser mes clés API existantes ? »

**Oui !** Si vous disposez déjà de clés API pour OpenAI, Anthropic, Google, etc., vous pouvez les utiliser dans OmniRoute. Il vous suffit de les coller lors de la connexion au fournisseur.

---

## Et maintenant ?

- **[Guide d'Auto-Combo](./AUTO-COMBO-GUIDE.md)** — Laissez OmniRoute choisir la meilleure IA pour vous
- **[Guide des offres gratuites](./FREE-TIERS-GUIDE.md)** — Accédez gratuitement à l'IA sans carte bancaire
- **[Dépannage](../guides/TROUBLESHOOTING.md)** — Résolvez les problèmes courants
- **[Référence des fournisseurs](../reference/PROVIDER_REFERENCE.md)** — Liste complète des 226 fournisseurs

## Images Cursor

Les images du forfait Cursor utilisent `IMAGE_PROVIDERS.cursor` (`cursor-agent-image`). Consultez [CURSOR_IMAGE.md](../providers/CURSOR_IMAGE.md).
