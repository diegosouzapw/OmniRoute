# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

Ce guide documente la référence en matière d'infrastructure réseau pour protéger**OmniRoute**et exposer votre application à Internet en toute sécurité,**sans ouvrir de port (Zéro entrant)**.## What was done on your VM?

Nous avons activé OmniRoute en mode**Split-Port**via PM2 :

-**Port `20128` :**Exécute**uniquement l'API**`/v1`. -**Port `20129` :**exécute**uniquement le tableau de bord administratif**.

De plus, le service interne nécessite « REQUIRE_API_KEY=true », ce qui signifie qu'aucun agent ne peut consommer les points de terminaison de l'API sans envoyer un « jeton de porteur » légitime généré dans l'onglet Clés API du tableau de bord.

Cela nous permet de créer deux règles de réseau complètement indépendantes. C'est là qu'intervient le**Cloudflare Tunnel (cloudflared)**.---

## 1. How to Create the Tunnel in Cloudflare

L'utilitaire « cloudflared » est déjà installé sur votre machine. Suivez ces étapes dans le cloud :

1. Accédez à votre tableau de bord**Cloudflare Zero Trust**(one.dash.cloudflare.com).
2. Dans le menu de gauche, accédez à**Réseaux > Tunnels**.
3. Cliquez sur**Ajouter un tunnel**, choisissez**Cloudflared**et nommez-le « OmniRoute-VM ».
4. Il générera une commande à l'écran appelée "Installer et exécuter un connecteur".**Il vous suffit de copier le jeton (la longue chaîne après `--token`)**.
5. Connectez-vous via SSH à votre machine virtuelle (ou Terminal Proxmox) et exécutez : ```bash
   # Starts and permanently binds the tunnel to your account
   cloudflared service install YOUR_GIANT_TOKEN_HERE
   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

Toujours sur l'écran Tunnel nouvellement créé, accédez à l'onglet**Noms d'hôtes publics**et ajoutez les**deux**routes, en profitant de la séparation que nous avons effectuée :### Route 1: Secure API (Limited)

-**Sous-domaine :**`api` -**Domaine :**`yourglobal.com` (choisissez votre vrai domaine) -**Type de service :**`HTTP` -**URL :**`127.0.0.1:20128` _(Port API interne)_### Route 2: Zero Trust Dashboard (Closed)

-**Sous-domaine :**`omniroute` ou `panel` -**Domaine :**`yourglobal.com` -**Type de service :**`HTTP` -**URL :**`127.0.0.1:20129` _(Application interne/Port visuel)_

À ce stade, la connectivité « physique » est résolue. Maintenant, protégeons-le vraiment.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Aucun mot de passe local ne protège mieux votre tableau de bord que de supprimer complètement l’accès à celui-ci depuis l’Internet ouvert.

1. Dans le tableau de bord Zero Trust, accédez à**Accès > Applications > Ajouter une application**.
2. Sélectionnez**Auto-hébergé**.
3. Dans**Nom de l'application**, saisissez « OmniRoute Panel ».
4. Dans**Domaine d'application**, saisissez « omniroute.yourglobal.com » (le même que celui que vous avez utilisé dans « Route 2 »).
5. Cliquez sur**Suivant**.
6. Dans**Action de règle**, choisissez « Autoriser ». Pour le nom de la règle, saisissez « Admin uniquement ».
7. Dans**Inclure**, sous le menu déroulant « Sélecteur », choisissez « E-mails » et saisissez votre e-mail, par exemple « admin@spgeo.com.br ».
8. Enregistrez (« Ajouter une application »).

> **Ce que cela a fait :**Si vous essayez d'ouvrir « omniroute.yourglobal.com », il n'atteint plus votre application OmniRoute ! Il atterrit sur un élégant écran Cloudflare vous demandant de saisir votre e-mail. Ce n'est que si vous (ou l'e-mail que vous avez saisi) y êtes saisi que vous recevrez un code temporaire à 6 chiffres dans Outlook/Gmail qui déverrouille le tunnel vers le port « 20129 ».---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

Le Zero Trust Dashboard ne s'applique pas à la route API (`api.yourglobal.com`), car il s'agit d'un accès programmatique via des outils automatisés (agents) sans navigateur. Pour cela, nous utiliserons le pare-feu principal (WAF) de Cloudflare.

1. Accédez au**Tableau de bord Cloudflare normal**(dash.cloudflare.com) et accédez à votre domaine.
2. Dans le menu de gauche, accédez à**Sécurité > WAF > Règles de limitation de débit**.
3. Cliquez sur**Créer une règle**. 4.**Nom :**`API OmniRoute Anti-Abus` 5.**Si les demandes entrantes correspondent...**
   - Choisissez le champ : `Nom d'hôte`
   - Opérateur : `égal à`
   - Valeur : `api.yourglobal.com`
4. Sous**Avec les mêmes caractéristiques :**Conservez « IP ».
5. Pour les limites (Limite) : -**Lorsque les demandes dépassent :**`50` -**Période :**`1 minute`
6. À la fin, sous**Action** : « Bloquer » et décidez si le blocage dure 1 minute ou 1 heure. 9.**Déployer**.

> **Ce que cela a fait :**Personne ne peut envoyer plus de 50 requêtes sur une période de 60 secondes à l'URL de votre API. Étant donné que vous exécutez plusieurs agents et que la consommation qui les sous-tend atteint déjà les limites de débit et suit les jetons, il s'agit simplement d'une mesure au niveau de la couche périphérique Internet qui protège votre instance sur site contre une panne due à un stress thermique avant même que le trafic ne descende dans le tunnel.---

## Finalization

1. Votre VM**n'a pas de ports exposés**dans `/etc/ufw`.
2. OmniRoute ne communique que via HTTPS sortant (« cloudflared ») et ne reçoit pas de TCP direct du monde.
3. Vos requêtes adressées à OpenAI sont obscurcies car nous les avons configurées globalement pour passer via un proxy SOCKS5 (le cloud ne se soucie pas de SOCKS5 car il est entrant).
4. Votre tableau de bord Web dispose d'une authentification à 2 facteurs avec e-mail.
5. Votre API est limitée en périphérie par Cloudflare et ne traite que les jetons Bearer.
