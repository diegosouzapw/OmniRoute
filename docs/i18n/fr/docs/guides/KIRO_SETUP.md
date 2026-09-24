# Kiro Setup Guide (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇧🇦 [bs](../../../bs/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Ce guide explique comment ajouter des comptes Kiro (assistant de programmation IA hébergé par AWS) à OmniRoute, en mettant l’accent sur l’utilisation simultanée de plusieurs comptes sans conflits de session.

---

## Contexte : pourquoi les comptes Kiro peuvent entrer en conflit

Le backend de Kiro utilise les inscriptions de clients AWS SSO OIDC pour suivre les sessions actives.
La contrainte essentielle est la suivante : **chaque inscription de client OIDC ne prend en charge qu’une seule session active à la fois**. Lorsqu’un deuxième appareil ou utilisateur s’authentifie à l’aide du même client inscrit, le backend invalide le jeton d’actualisation du premier compte.

Il s’agit du même mécanisme qui provoque des problèmes lors de l’exécution de `kiro-cli login` sur une machine où un autre compte Kiro est déjà connecté : la nouvelle connexion révoque le jeton du premier compte.

---

## Comment OmniRoute résout ce problème (v3.8.0+)

À partir de la v3.8.0, OmniRoute appelle `registerClient()` (AWS SSO OIDC) lors de chaque importation de connexion Kiro. Chaque connexion OmniRoute dispose ainsi de sa propre inscription de client OIDC dédiée. Comme chaque inscription de client est indépendante, l’actualisation ou la réauthentification d’un compte n’affecte le jeton d’actualisation d’aucun autre compte.

L’isolation s’applique aux méthodes d’importation de jetons d’actualisation, tandis que l’authentification par clé API évite entièrement les sessions d’actualisation OIDC :

| Méthode d’importation                                           | État de l’isolation                                                                                                         |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Flux de code d’appareil AWS Builder ID / IDC                    | Isolé depuis l’introduction du flux de code d’appareil                                                                      |
| **Importer un jeton** (collage manuel du jeton d’actualisation) | Isolé depuis la v3.8.0                                                                                                      |
| **Connexion sociale Google / GitHub**                           | Isolée depuis la v3.8.0                                                                                                     |
| **Importation automatique** (SQLite de kiro-cli)                | Isolée depuis la v3.8.0 (le chemin SQLite était déjà isolé ; la solution de secours du cache SSO l’est désormais également) |
| **Clé API** (clé CodeWhisperer de longue durée)                 | Aucune session d’actualisation ; la clé est validée et stockée comme identifiant bearer                                     |

---

## Note de migration pour les connexions créées avant la v3.8.0

Les connexions importées avant la v3.8.0 ne disposent pas d’une inscription de client OIDC dédiée stockée dans `providerSpecificData`. Ces connexions continuent de fonctionner, mais utilisent le point de terminaison partagé d’actualisation de l’authentification sociale, ce qui signifie que deux connexions de ce type peuvent encore s’invalider mutuellement.

**Pour bénéficier de l’isolation :** supprimez l’ancienne connexion depuis **Tableau de bord → Fournisseurs**, puis réimportez-la à l’aide de l’un des flux d’importation pris en charge. Toutes les connexions nouvellement créées recevront automatiquement leur propre inscription de client.

---

## Ajout de deux comptes Kiro côte à côte

### Prérequis

- OmniRoute v3.8.0 ou version ultérieure.
- Un compte Kiro fonctionnel (connexion par adresse e-mail et mot de passe, Google ou GitHub).
- Éventuellement, un deuxième compte Kiro.

### Étape 1 : importer le premier compte

1. Ouvrez **Tableau de bord → Fournisseurs → Ajouter un fournisseur → Kiro**.
2. Choisissez l’une des options suivantes :
   - **Importer un jeton** — collez un jeton d’actualisation commençant par `aorAAAAAG`.
   - **Clé API** — collez une clé API Kiro / CodeWhisperer de longue durée.
   - **Connexion Google / GitHub** — terminez le flux OAuth dans le navigateur.
   - **Importation automatique** — cliquez sur le bouton ; OmniRoute lit les identifiants depuis la base de données kiro-cli locale ou `~/.aws/sso/cache`.
3. La connexion est enregistrée. Les flux utilisant un jeton d’actualisation inscrivent automatiquement un client OIDC dédié. Les flux utilisant une clé API valident la clé auprès d’AWS et ne stockent aucun jeton d’actualisation.

### Étape 2 : importer le deuxième compte

Répétez l’étape 1 pour le deuxième compte. Comme chaque importation crée une inscription de client OIDC distincte, les deux connexions sont entièrement isolées.

### Étape 3 : vérifier que les deux connexions sont actives

1. **Tableau de bord → Fournisseurs** — les deux connexions Kiro doivent afficher l’état **Actif**.
2. **Tableau de bord → Santé** — les deux connexions doivent réussir la vérification de l’état de leur jeton.

### Étape 4 : utiliser une combinaison pour répartir le routage entre les comptes

Créez une combinaison ayant les deux connexions comme cibles afin de répartir la charge ou de basculer de l’une à l’autre en cas d’échec :

```
kiro/kiro-dev → kiro/kiro-pro
```

Consultez [FEATURES.md](./FEATURES.md) et la documentation sur le routage pour configurer les combinaisons.

---

## Utilisateurs Enterprise / IDC

Pour les comptes AWS IAM Identity Center (IDC), utilisez le flux de **code d’appareil AWS Builder ID / IDC** depuis **Tableau de bord → Fournisseurs → Kiro → Code d’appareil**. Le flux de code d’appareil a toujours été entièrement isolé. Aucune réimportation n’est nécessaire pour ces connexions.

Les utilisateurs Enterprise qui opèrent dans une région AWS autre que celle par défaut peuvent spécifier la région lors de l’importation via l’API Import Token :

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Le champ `region` utilise par défaut `us-east-1` lorsqu’il est omis.

---

## Flux d’importation par clé API

L’authentification par clé API est destinée aux identifiants bearer Kiro / AWS CodeWhisperer à longue durée de vie. Elle n’utilise pas l’actualisation OAuth et évite donc l’invalidation des sessions OIDC partagées.

### Tableau de bord

1. Ouvrez **Tableau de bord -> Fournisseurs -> Kiro**.
2. Sélectionnez **Clé API**.
3. Collez la clé API et, éventuellement, la région AWS (`us-east-1` par défaut).
4. OmniRoute valide la clé et enregistre la connexion.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Contrat interne

La route API valide la clé en appelant `KiroService.validateApiKey()`, qui utilise `ListAvailableProfiles` avec le point de terminaison CodeWhisperer/Amazon Q correspondant à la région et détermine un `profileArn`.

La connexion enregistrée utilise :

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

Lors de l’exécution, `KiroExecutor.buildHeaders()` envoie la clé sous la forme `Authorization: Bearer <key>` et ajoute `tokentype: API_KEY`. Les appels relatifs aux quotas et aux profils utilisent le même marqueur afin qu’AWS traite le bearer comme une clé API à longue durée de vie plutôt que comme un jeton d’accès OIDC ou de réseau social.

---

## Expiration du client OIDC

Les clients publics AWS SSO OIDC expirent généralement après 90 jours (`clientSecretExpiresAt`). OmniRoute stocke cet horodatage dans `providerSpecificData` à des fins d’observabilité. Si l’actualisation d’une connexion cesse de fonctionner après environ 90 jours, réimportez la connexion afin d’obtenir un nouvel enregistrement de client OIDC. La réinscription automatique à l’expiration est prévue comme amélioration future.

Les connexions par clé API ne sont pas soumises à l’expiration du client OIDC, car elles ne sont pas actualisées via AWS SSO OIDC.

---

## Dépannage

### Le deuxième compte est constamment déconnecté

- Vérifiez les deux connexions dans **Tableau de bord → Fournisseurs** et confirmez que chacune affiche un `clientId` non nul dans son JSON brut (visible via l’icône d’information). Si `clientId` est absent de l’une des connexions, celle-ci a été importée avant la v3.8.0 — réimportez-la.

### Échec de l’importation avec « Token validation failed »

- Vérifiez que le jeton d’actualisation commence par `aorAAAAAG`.
- Vérifiez qu’OmniRoute peut accéder à `https://oidc.us-east-1.amazonaws.com` (ou à la région configurée). Si vous utilisez un proxy d’entreprise, définissez un proxy au niveau du fournisseur dans **Tableau de bord → Paramètres → Proxys**.

### Échec de l’importation par clé API

- Vérifiez que la clé est une clé API Kiro / CodeWhisperer, et non un jeton d’actualisation.
- Vérifiez que la région AWS correspond à la clé ou au compte. `us-east-1` est la valeur par défaut.
- La clé doit permettre d’appeler `ListAvailableProfiles` ; sinon, OmniRoute ne peut pas déterminer le `profileArn` requis.

Pour les autres problèmes, consultez le fichier principal [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
