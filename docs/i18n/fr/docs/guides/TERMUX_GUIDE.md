# Termux Headless Setup (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute peut fonctionner comme serveur sans interface graphique sur Android via Termux. L’application de bureau Electron n’est pas prise en charge dans Termux, mais le tableau de bord web et l’API compatible avec OpenAI sont accessibles depuis le navigateur local ou depuis d’autres appareils sur le même réseau.

## Prérequis

Installez Termux depuis F-Droid ou les versions publiées sur GitHub, puis mettez à jour les paquets et installez les outils de compilation requis par les dépendances natives telles que `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Version de Node.js :** OmniRoute nécessite Node `>=22.22.2 <23 || >=24.0.0 <27` (correspond à `engines` dans `package.json` / `SUPPORTED_NODE_RANGE`). Le paquet `nodejs-lts` de Termux fournit généralement Node 20 LTS, qui n’est **plus pris en charge** — installez plutôt `pkg install nodejs` (version actuelle) et vérifiez que `node --version` indique une version 22.x/24.x ou ultérieure.

Si la compilation des paquets natifs échoue, réexécutez la commande `pkg install` ci-dessus, puis réessayez d’installer OmniRoute.

## Installation

Exécutez directement la dernière version publiée du paquet :

```bash
npx -y omniroute@latest
```

Vous pouvez également l’installer globalement :

```bash
npm install -g omniroute
omniroute
```

## Exécution

Démarrez OmniRoute en mode serveur sans interface graphique :

```bash
omniroute
```

ou :

```bash
npx omniroute
```

Le tableau de bord est accessible à l’adresse suivante :

```text
http://localhost:20128
```

Ouvrez cette URL dans le navigateur Android. Si vous exécutez des clients dans Termux, utilisez le même hôte et le même port comme URL de base compatible avec OpenAI.

## Exécution en arrière-plan

Pour un simple processus en arrière-plan :

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Pour l’arrêter :

```bash
pkill -f omniroute
```

Pour un démarrage automatique après le démarrage de l’appareil, installez le module complémentaire Termux:Boot et créez un script de démarrage :

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

L’optimisation de la batterie d’Android peut arrêter les processus d’arrière-plan de longue durée. Désactivez l’optimisation de la batterie pour Termux si le serveur doit rester en ligne.

## Accès depuis d’autres appareils

Trouvez l’adresse IP du téléphone sur le réseau WiFi :

```bash
ip addr show wlan0
```

Ouvrez ensuite le tableau de bord depuis un autre appareil :

```text
http://PHONE_IP:20128
```

Par exemple :

```text
http://192.168.1.50:20128
```

Gardez le téléphone et le client sur le même réseau de confiance. Si vous exposez OmniRoute en dehors du téléphone, activez les clés d’API et l’authentification du tableau de bord.

## Répertoire de données

Par défaut, OmniRoute stocke les données dans le répertoire personnel de Termux, en suivant le même comportement de chemin de données côté serveur que sous Linux. Pour placer la base de données dans un emplacement explicite :

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Limitations

- Electron ne fonctionne pas dans Termux.
- Il n’y a pas de zone de notification ni d’intégration au bureau.
- Cette configuration est réservée au serveur : utilisez le tableau de bord dans le navigateur.
- Les dépendances natives peuvent nécessiter une compilation locale.
- Les appareils Android disposant de peu de mémoire peuvent nécessiter moins de requêtes simultanées.
- Les fonctionnalités de certificat MITM/système peuvent nécessiter des modifications du magasin de confiance au niveau d’Android, en dehors de Termux.

## Résolution des problèmes

### Plateforme non prise en charge : android (chaque requête renvoie une erreur HTTP 500)

**Symptôme :** `omniroute` / `omniroute serve` affiche `✔ OmniRoute is running!`, mais chaque requête vers le tableau de bord ou l’API renvoie simplement `500 Internal Server Error`. Le fichier `~/.omniroute/logs/application/app.log` reste vide, `APP_LOG_LEVEL=debug` n’affiche aucune information utile et le corps de la réponse est en texte brut (`Internal Server Error`), sans détail JSON.

**Cause :** Certaines versions de Termux/Node indiquent `process.platform === "android"`. La fonction `getCacheDirectory()` de Next.js ne gère pas cette plateforme : elle exige que `~/.cache` (ou un répertoire temporaire générique) existe _déjà_, sinon elle échoue lors du chargement du hook d’instrumentation avec :

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Comme le hook n’est jamais chargé, la journalisation ne démarre jamais — l’erreur 500 semble totalement impossible à diagnostiquer. OmniRoute crée `~/.cache` (et définit `XDG_CACHE_HOME` lorsqu’elle n’est pas définie) dans le point d’entrée de la CLI avant le démarrage de Next.js, afin que cette vérification réussisse sur Android/Termux.

**Solution prise en charge (sans modifier le paquet) :**

```bash
mkdir -p ~/.cache
omniroute serve
```

Dans les versions actuelles d’OmniRoute, la CLI effectue automatiquement cette opération sur Android/Termux — une nouvelle installation avec `npx -y omniroute@latest` ou une installation globale ne devrait pas nécessiter cette étape manuelle. Si l’erreur persiste après la mise à niveau, créez `~/.cache` une fois comme indiqué ci-dessus, puis redémarrez.

**Ne modifiez pas** `dist/server.js` pour forcer `process.platform = "linux"`. Ce type de modification du paquet est écrasé à chaque réinstallation ou mise à niveau et devient inutile dès que le répertoire de cache existe.

### Erreurs de compilation de better-sqlite3

Installez la chaîne d’outils de compilation de Termux :

```bash
pkg install nodejs python build-essential
```

Puis réexécutez :

```bash
npx -y omniroute@latest
```

### Port déjà utilisé

Vérifiez quel processus écoute sur le port par défaut :

```bash
ss -ltnp | grep 20128
```

Arrêtez l’ancien processus :

```bash
pkill -f omniroute
```

### Tableau de bord inaccessible depuis un autre appareil

Vérifiez que les deux appareils se trouvent sur le même réseau WiFi, puis effectuez un test depuis Termux :

```bash
curl http://localhost:20128
```

Si l’accès local fonctionne, mais pas l’accès via le réseau local, vérifiez l’isolation du point d’accès ou du réseau WiFi Android, ainsi que tout pare-feu ou profil VPN configuré sur le téléphone.
