# Monitoring & Costs — Navigation Structure (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Implémenté dans le groupe B (plan 16). Voir `src/shared/constants/sidebarVisibility.ts`.

---

## Navigation de haut niveau

La barre latérale du tableau de bord (après le groupe B) comporte les sections de premier niveau suivantes, dans cet ordre :

```
Accueil
Fournisseurs
Combinaisons
Clés API
Paramètres
Analytique
Coûts          ← NOUVEAU (groupe B, plan 16)
Surveillance   ← RÉORGANISÉ (groupe B, plan 16)
...
```

---

## Section Coûts (nouvelle, niveau 1)

Préfixe du chemin : `/dashboard/costs/`

| Élément                 | URL                                  | Description                                             |
| ----------------------- | ------------------------------------ | ------------------------------------------------------- |
| Vue d’ensemble          | `/dashboard/costs`                   | Tableau de bord agrégé des coûts (déplacé d’Analytique) |
| Tarification            | `/dashboard/costs/pricing`           | Tableau des tarifs par modèle                           |
| Budget                  | `/dashboard/costs/budget`            | Seuils budgétaires + alertes                            |
| Partage de quotas       | `/dashboard/costs/quota-share`       | Pools de partage de quotas + utilisation                |
| Configuration des plans | `/dashboard/costs/quota-share/plans` | Remplacements de plans propres à chaque fournisseur     |

**Justification** : la tarification, le budget et le partage de quotas se trouvaient auparavant sous
`Surveillance > Paramètres de coûts`. Leur déplacement vers une section dédiée de premier niveau
permet de les trouver sans avoir à parcourir les outils d’observabilité.

---

## Section Surveillance (réorganisée)

La section Surveillance comporte désormais **Activité en premier**, suivie de **3 sous-groupes** :

```
Surveillance
├── Activité              ← Flux chronologique (élément de premier niveau)
├── Groupe Journaux
│   ├── Journaux (tous)
│   ├── Journaux du proxy
│   └── Journaux de la console
├── Groupe Audit
│   ├── Journal d’audit
│   ├── Audit MCP
│   └── Audit A2A
└── Groupe Système
    ├── État
    └── Exécution
```

### Changements par rapport à l’ancienne structure

| Avant                                                                                             | Après                                         |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Activité = onglet dans Journaux qui affichait le Journal d’audit                                  | Activité = flux dédié (`/dashboard/activity`) |
| Groupe Paramètres de coûts dans Surveillance                                                      | Déplacé vers la section Coûts                 |
| Liste à plat : Journaux, Activité (journaux), Audit, État, Exécution, Tarification, Budget, Quota | Structure en 3 groupes + section Coûts dédiée |

---

## Activité et Journal d’audit

Ces deux éléments sont désormais distincts :

| Dimension               | Activité (`/dashboard/activity`)                                              | Journal d’audit (`/dashboard/audit`)      |
| ----------------------- | ----------------------------------------------------------------------------- | ----------------------------------------- |
| **Objectif**            | Flux d’événements destiné aux utilisateurs (« ce qui s’est passé récemment ») | Journal de conformité / sécurité          |
| **Source de données**   | `GET /api/compliance/audit-log?level=high`                                    | `GET /api/compliance/audit-log?level=all` |
| **Format**              | Chronologie regroupée par jour, verbes lisibles + icônes                      | Tableau paginé dense, 50/page             |
| **Filtres**             | Catégorie de type d’événement                                                 | Action, gravité, acteur, plage de dates   |
| **Exportation**         | Non disponible                                                                | Exportation JSON                          |
| **Filtre d’acteur**     | Non applicable                                                                | Filtrable par acteur                      |
| **Événements affichés** | Actions de haut niveau uniquement (liste d’autorisation)                      | Tous les événements d’audit               |

### Liste d’autorisation des actions de haut niveau

Définie dans `src/lib/audit/highLevelActions.ts`. Elle détermine quels événements apparaissent dans
le flux Activité. La liste d’autorisation comprend :

- Événements d’ajout, de suppression et de test de fournisseurs
- Création, mise à jour et suppression de combinaisons
- Cycle de vie des clés API (création, révocation, rotation)
- Seuil budgétaire atteint
- Connexion/déconnexion d’authentification
- Création de sessions d’agent cloud
- Enregistrement d’outils MCP
- Création/suppression de webhooks
- Modifications des pools/plans de quotas (actions `quota.*`, groupe B)
- Événements de plateforme (mise à jour, déploiement)
- Installation/suppression de compétences

Les événements qui ne figurent pas dans cette liste apparaissent uniquement dans le Journal d’audit.

### Ajout d’une nouvelle action de haut niveau

Modifiez `src/lib/audit/highLevelActions.ts` et ajoutez la chaîne d’action à
`HIGH_LEVEL_ACTIONS`. Cela nécessite une PR (la liste se trouve dans le code et n’est pas configurable
dans la base de données). L’icône correspondante peut être ajoutée à
`src/lib/audit/activityIcons.ts`.

---

## Redirection : `/dashboard/logs/activity`

L’ancien chemin `/dashboard/logs/activity` est redirigé de façon permanente (HTTP 308) vers
`/dashboard/activity` via `permanentRedirect()` dans
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

L’identifiant historique de la barre latérale `logs-activity` est conservé dans `HIDEABLE_SIDEBAR_ITEM_IDS`
(mais supprimé de `SIDEBAR_DEFINITIONS`) afin d’éviter de rendre inutilisables les préréglages utilisateur qui
font référence à l’ancien identifiant.

---

## i18n

Espaces de noms ajoutés par le groupe B :

| Clé de l’espace de noms | Portée                                                                     |
| ----------------------- | -------------------------------------------------------------------------- |
| `sidebar.costsSection`  | Libellé de la section Coûts                                                |
| `sidebar.activity`      | Élément Activité de la barre latérale                                      |
| `sidebar.logsGroup`     | Libellé du sous-groupe Journaux                                            |
| `sidebar.systemGroup`   | Libellé du sous-groupe Système                                             |
| `sidebar.costsOverview` | Élément de vue d’ensemble des coûts                                        |
| `activity.*`            | Toutes les chaînes de la page Activité (titre, verbes, filtres, état vide) |

Les paramètres régionaux faisant autorité sont `pt-BR` et `en`. Les 40 autres paramètres régionaux utilisent
l’anglais comme solution de repli via le mécanisme de repli de `next-intl` (configuré dans `src/i18n/config.ts`).
