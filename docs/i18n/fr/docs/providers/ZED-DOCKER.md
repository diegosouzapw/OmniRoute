# Zed IDE Integration in Docker Environments (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Lorsque OmniRoute s’exécute dans Docker, le processus standard « Importer depuis le trousseau Zed » échoue, car le conteneur ne peut pas accéder au service de trousseau du système d’exploitation hôte (`libsecret` sous Linux, Trousseaux d’accès sous macOS, Gestionnaire d’informations d’identification sous Windows) et les répertoires de configuration de Zed présents sur le système de fichiers hôte ne sont pas visibles par défaut à l’intérieur du conteneur.

## Pourquoi l’importation depuis le trousseau échoue dans Docker

Deux problèmes bloquants surviennent à l’intérieur d’un conteneur :

1. **Isolation du système de fichiers** — `isZedInstalled()` recherche `~/.config/zed` (Linux), `~/Library/Application Support/Zed` (macOS) ou l’équivalent sous Windows. Ces chemins se trouvent sur l’hôte et ne sont pas accessibles à moins d’être explicitement montés en tant que volumes.
2. **Isolation IPC** — Même lorsque le répertoire de configuration est monté, le module natif `keytar` communique avec le service de trousseau du système d’exploitation via un socket Unix ou une session D-Bus. Aucun des deux n’est relié par défaut au conteneur, de sorte que la lecture des identifiants échoue systématiquement.

OmniRoute détecte l’environnement Docker à l’aide de deux heuristiques :

- Présence de `/.dockerenv` (écrit par le démon Docker au démarrage du conteneur).
- Présence de la chaîne `docker` dans `/proc/1/cgroup` (cgroup v1 sous Linux).

Lorsque l’une de ces heuristiques se déclenche, la route d’importation renvoie une réponse HTTP 422 avec `zedDockerEnvironment: true` et un message vous invitant à utiliser l’onglet Importation manuelle du jeton.

## Utilisation de l’onglet Importation manuelle du jeton

1. Ouvrez **Tableau de bord → Fournisseurs → Zed**.
2. Le panneau **Importation manuelle du jeton** apparaît sous la carte d’importation depuis le trousseau. Lorsqu’OmniRoute détecte Docker, ce panneau se déploie automatiquement après la première tentative infructueuse d’importation depuis le trousseau.
3. Sélectionnez le fournisseur dans la liste déroulante (OpenAI, Anthropic, Google, Mistral, xAI, OpenRouter ou DeepSeek).
4. Collez la clé API dans le champ de mot de passe.
5. Cliquez sur **Importer**.

La clé est enregistrée en tant que nouvelle connexion au fournisseur sous le nom `Zed Manual Import (<provider>)`.

## Emplacement de stockage des clés API Zed sur l’hôte

Zed stocke les clés des fournisseurs d’IA dans le trousseau du système d’exploitation sous des noms de service tels que `zed-openai`, `ai.zed.openai`, `zed-anthropic`, etc. Pour les récupérer en vue d’une importation manuelle, consultez les emplacements suivants :

**Linux**

```
~/.config/zed/settings.json
```

La section `language_models` contient les configurations des fournisseurs. Les clés enregistrées dans le trousseau via l’interface utilisateur de Zed ne figurent pas en texte brut dans `settings.json` ; récupérez-les à l’aide d’un gestionnaire de trousseau tel que GNOME Keyring / Seahorse, ou en exécutant :

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Les entrées du trousseau peuvent être trouvées dans **Trousseaux d’accès.app** en recherchant `zed`.

## Option de montage de volume (avancée)

Vous pouvez éventuellement monter le répertoire de configuration de Zed en lecture seule dans le conteneur. Cela ne résout pas le problème du trousseau, mais peut s’avérer utile pour de futures fonctionnalités lisant des valeurs de configuration Zed non confidentielles (par exemple, les préférences de modèles).

```yaml
# Extrait de docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Hôte Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Hôte macOS (décommenter à la place)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # À venir : ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Remarque : le remplacement au moyen d’une variable d’environnement `ZED_CONFIG_PATH` n’est pas encore implémenté. Cet extrait est fourni à titre de référence pour le moment où cette fonctionnalité sera ajoutée.

## API d’importation manuelle

Le point de terminaison d’importation manuelle peut également être appelé directement :

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Ma clé OpenAI Zed"   // facultatif
}
```

En cas de réussite, il renvoie :

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Dépannage

| Symptôme                                | Cause                                                   | Solution                                                        |
| --------------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`      | Exécution à l’intérieur de Docker                       | Utiliser l’onglet Importation manuelle du jeton                 |
| 404 + `zedInstalled: false`             | Zed n’est pas installé sur l’hôte                       | Installer Zed ou utiliser l’importation manuelle                |
| 403 + accès au trousseau refusé         | Le système d’exploitation a refusé l’accès au trousseau | Accorder l’autorisation dans l’invite du système d’exploitation |
| 404 + service de trousseau indisponible | `libsecret` est absent sous Linux                       | Installer `libsecret-1-dev`                                     |
