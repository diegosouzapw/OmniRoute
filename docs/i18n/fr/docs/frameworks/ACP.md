# ACP registry and registered CLI launchers (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute distingue la **détection des CLI**, le **protocole natif Agent Client Protocol** et
les **adaptateurs stdio hérités**. La détection d’un binaire installé ne garantit ni son
authentification, ni la compatibilité de ses modèles, ni sa capacité à traiter une requête.

Le tableau de bord utilise `GET /api/acp/agents` et `POST /api/acp/agents` pour l’inventaire
et l’enregistrement d’agents personnalisés. Il s’agit de routes de gestion exclusivement
locales, et non d’une API publique permettant de lancer des processus ou de soumettre des
requêtes. Le composant interne `AcpManager` ne devient pas automatiquement une solution de
repli de fournisseur HTTP.

## Contrats enregistrés

`config/cli-tools-manifest.json` constitue la source de vérité pour les binaires de lancement
intégrés, leurs arguments et les modes de backend. Le registre dérive ses définitions de ce
manifeste. La détection est mise en cache pendant 60 secondes.

- `acp` : le contrat Gemini lance `gemini --experimental-acp` et communique
  en ACP JSON-RPC délimité par des retours à la ligne via le SDK TypeScript officiel.
- `stdio-adapter` : les autres contrats enregistrés conservent l’adaptateur hérité avec
  entrée délimitée par des retours à la ligne et sortie sur stdout. Une période d’inactivité
  de sortie de deux secondes met fin à sa réponse. Cet adaptateur ne garantit **pas** la
  prise en charge native d’ACP par ces CLI.

Gemini documente l’option de lancement dans sa [référence CLI](https://geminicli.com/docs/cli/cli-reference/).
Le client utilise le [SDK ACP officiel](https://github.com/agentclientprotocol/typescript-sdk)
pour l’initialisation, la création de sessions, les requêtes de prompt, les notifications et l’annulation.

Les définitions d’agents personnalisés restent des contrats de lancement contrôlés par
l’administrateur. L’enregistrement d’un binaire et de ses arguments accorde à ce processus
les privilèges d’exécution locaux de l’utilisateur du serveur ; l’enregistrement ne constitue
pas un bac à sable. Les sondes de version n’acceptent que l’exécutable enregistré et une
option de version reconnue.

## API de lancement interne

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Ne transmettre que les variables du fournisseur délibérément attribuées à cet agent.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explique ce projet", 120_000);
  // Traiter la réponse dans l’application appelante.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` détermine l’exécutable et les arguments à partir de la
définition enregistrée. Les seules options disponibles pour l’appelant sont `cwd` et `env` ;
l’ancienne signature `spawn(agentId, binary, args, env)` et les remplacements d’exécutable
sont rejetés. Les contrats de lancement HTTP ne sont pas pris en charge par ce gestionnaire.

Le processus enfant hérite du même système d’exploitation, terminal, paramètres régionaux
et liste d’autorisation de certificats que les lanceurs CLI. Les secrets du serveur ou du
fournisseur ne sont pas copiés depuis l’environnement parent. Les identifiants requis par la
CLI choisie doivent être transmis explicitement ou fournis par l’intermédiaire du mécanisme
d’authentification local propre à cette CLI. Le processus enfant conserve néanmoins les
autorisations de l’utilisateur local sur le système de fichiers et peut lire sa propre
configuration.

## Cycle de vie natif et limites

1. Lancer le binaire enregistré, initialiser ACP et créer une session dont la racine
   correspond au répertoire de travail sélectionné. L’initialisation est limitée à dix secondes.
2. Soumettre un prompt et collecter les notifications textuelles pour cette session uniquement.
   L’achèvement correspond à la réponse RPC du prompt, et non à une période de silence sur stdout.
3. Utiliser une seule échéance pour le prompt, incluant toute initialisation non terminée ; la
   valeur par défaut est de 120 secondes. Les prompts simultanés dans un même processus sont rejetés.
4. En cas d’expiration du délai natif, tenter `session/cancel` et terminer le processus. Une
   fenêtre limitée de 100 ms permet l’envoi de la notification avant la terminaison.
5. Fermer l’état du transport et supprimer la session lorsque l’initialisation échoue, que la
   connexion se ferme, que le processus se termine ou que l’appelant l’arrête.

Les demandes d’autorisation d’outils sont refusées. Aucune capacité cliente relative au
système de fichiers ou au terminal n’est annoncée. Ces restrictions ne placent pas le
binaire enfant dans un bac à sable et ne remplacent pas les paramètres d’autorisation
propres à une CLI.

Le texte natif comme les sorties stdout/stderr héritées conservent au maximum 1 Mio de
caractères, en gardant la sortie la plus récente accompagnée d’un avis de troncature.
Une trame filaire native individuelle est limitée à 2 Mio d’octets avant son analyse par
le SDK. Les tampons sont réinitialisés pour chaque prompt.

`kill(sessionId)` envoie SIGTERM, puis SIGKILL après cinq secondes si le processus ne s’est
pas terminé. Les expirations de délai des prompts hérités libèrent les écouteurs et les
minuteries, mais laissent la session disponible pour un autre prompt ; il incombe toujours
aux appelants d’utiliser `kill()` ou `killAll()` lorsqu’ils ont terminé.

## Événements et inspection

Le gestionnaire émet `stdout`, `stderr` et `exit`, chacun avec `sessionId`.
`sessionError` signale une erreur de transport expurgée. L’événement de compatibilité `error`
n’est émis que s’il dispose d’un abonné, afin qu’un binaire manquant ne puisse pas provoquer
une erreur EventEmitter non gérée.

- `getSession(sessionId)` renvoie une session gérée ou `undefined`.
- `getActiveSessions()` exclut les sessions arrêtées ou en cours d’arrêt.
- `sendInput(sessionId, input)` n’est disponible que pour un adaptateur hérité actif ;
  l’ACP natif rejette les entrées brutes afin de protéger son flux JSON-RPC.
- `killAll()` termine toutes les sessions gérées par cette instance.

## Limites de validation

Des jeux de données déterministes couvrent la négociation native, la sortie textuelle, les
autorisations refusées, l’annulation, les prompts simultanés, l’échec de l’initialisation,
la fin du processus, les limites de sortie et l’isolation des secrets. Les régressions
existantes relatives aux tampons et aux écouteurs hérités restent couvertes. Ces tests ne
démontrent ni une connexion Gemini active ni la réussite d’une inférence auprès du
fournisseur ; celles-ci nécessitent un test rapide autorisé séparément dans l’environnement
cible.

## Documentation connexe

- [Protocoles d’agents](./AGENT_PROTOCOLS_GUIDE.md)
- [Contrats de lancement des CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [Outils CLI](../reference/CLI-TOOLS.md)
- [Serveur A2A](./A2A-SERVER.md)
- [Agents cloud](./CLOUD_AGENT.md)
