# Monitoring & Costs — Navigation Structure (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Ipinatupad sa Group B (plan 16). Tingnan ang `src/shared/constants/sidebarVisibility.ts`.

---

## Mataas na Antas na Nabigasyon

Ang sidebar ng dashboard (pagkatapos ng Group B) ay may mga sumusunod na seksyon sa pinakamataas na antas, ayon sa pagkakasunod-sunod:

```
Home
Mga Provider
Mga Combo
Mga API Key
Mga Setting
Analytics
Mga Gastos          ← BAGO (Group B, plan 16)
Pagsubaybay          ← MULING INAYOS (Group B, plan 16)
...
```

---

## Seksyon ng Mga Gastos (bago, antas 1)

Prefix ng path: `/dashboard/costs/`

| Item                  | URL                                  | Paglalarawan                                                      |
| --------------------- | ------------------------------------ | ----------------------------------------------------------------- |
| Pangkalahatang-ideya  | `/dashboard/costs`                   | Pinagsama-samang dashboard ng gastos (inilipat mula sa Analytics) |
| Pagpepresyo           | `/dashboard/costs/pricing`           | Talahanayan ng pagpepresyo bawat modelo                           |
| Badyet                | `/dashboard/costs/budget`            | Mga threshold ng badyet + mga alerto                              |
| Pagbabahagi ng Quota  | `/dashboard/costs/quota-share`       | Mga pool ng Quota Share + paggamit                                |
| Configuration ng Plan | `/dashboard/costs/quota-share/plans` | Mga override ng plan bawat provider                               |

**Dahilan**: Ang Pagpepresyo, Badyet, at Pagbabahagi ng Quota ay dating nasa ilalim ng
`Pagsubaybay > Mga Parameter ng Gastos`. Ang paglipat sa mga ito sa isang nakalaang seksyon sa pinakamataas na antas
ay ginagawang mas madaling mahanap ang mga ito nang hindi kailangang dumaan sa tooling para sa observability.

---

## Seksyon ng Pagsubaybay (muling inayos)

Ang seksyon ng Pagsubaybay ay mayroon na ngayong **Aktibidad sa itaas** na sinusundan ng **3 subgroup**:

```
Pagsubaybay
├── Aktibidad            ← Timeline feed (item sa pinakamataas na antas)
├── Grupo ng Mga Log
│   ├── Mga Log (lahat)
│   ├── Mga Proxy Log
│   └── Mga Console Log
├── Grupo ng Audit
│   ├── Log ng Audit
│   ├── MCP Audit
│   └── A2A Audit
└── Grupo ng System
    ├── Kalagayan
    └── Runtime
```

### Mga pagbabago mula sa lumang istruktura

| Dati                                                                                                   | Ngayon                                                |
| ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| Aktibidad = tab sa loob ng Mga Log na nagre-render sa Log ng Audit                                     | Aktibidad = nakalaang feed (`/dashboard/activity`)    |
| Grupo ng Mga Parameter ng Gastos sa Pagsubaybay                                                        | Inilipat sa seksyon ng Mga Gastos                     |
| Patag na listahan: Mga Log, Aktibidad (mga log), Audit, Kalagayan, Runtime, Pagpepresyo, Badyet, Quota | Nakaayos na 3 grupo + nakalaang seksyon ng Mga Gastos |

---

## Aktibidad kumpara sa Log ng Audit

Magkaiba na ngayon ang dalawang ito:

| Dimensyon                    | Aktibidad (`/dashboard/activity`)                                             | Log ng Audit (`/dashboard/audit`)                  |
| ---------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------- |
| **Layunin**                  | Feed ng event para sa user ("ano ang nangyari kamakailan")                    | Log para sa pagsunod sa regulasyon / seguridad     |
| **Pinagmulan ng data**       | `GET /api/compliance/audit-log?level=high`                                    | `GET /api/compliance/audit-log?level=all`          |
| **Format**                   | Timeline, pinangkat ayon sa araw, mga pandiwang madaling maunawaan + mga icon | Siksik na talahanayang hinati sa mga page, 50/page |
| **Mga filter**               | Kategorya ng uri ng event                                                     | Aksyon, tindi, actor, saklaw ng petsa              |
| **Pag-export**               | Hindi available                                                               | Pag-export bilang JSON                             |
| **Filter ng actor**          | Hindi naaangkop                                                               | Maaaring i-filter ayon sa actor                    |
| **Mga event na ipinapakita** | Mga mataas na antas na aksyon lamang (allowlist)                              | Lahat ng event ng audit                            |

### Allowlist ng Mga Mataas na Antas na Aksyon

Tinukoy sa `src/lib/audit/highLevelActions.ts`. Kinokontrol nito kung aling mga event ang lilitaw sa
feed ng Aktibidad. Kabilang sa allowlist ang:

- Mga event ng pagdagdag/pag-alis/pagsubok ng provider
- Paglikha/pag-update/pagtanggal ng combo
- Lifecycle ng API key (paglikha, pagbawi, pag-rotate)
- Pag-abot sa threshold ng badyet
- Pag-login/pag-logout sa auth
- Paglikha ng session ng cloud agent
- Pagpaparehistro ng MCP tool
- Paglikha/pagtanggal ng webhook
- Mga pagbabago sa quota pool/plan (`quota.*` actions, Group B)
- Mga event ng platform (pag-update, pag-deploy)
- Pag-install/pag-alis ng skill

Ang mga event na wala sa listahang ito ay lilitaw lamang sa Log ng Audit.

### Pagdaragdag ng bagong mataas na antas na aksyon

I-edit ang `src/lib/audit/highLevelActions.ts` at idagdag ang string ng aksyon sa
`HIGH_LEVEL_ACTIONS`. Nangangailangan ito ng PR (code ang listahan, hindi ito maaaring i-configure sa DB).
Maaaring idagdag ang katumbas na icon sa `src/lib/audit/activityIcons.ts`.

---

## Redirect: `/dashboard/logs/activity`

Ang lumang path na `/dashboard/logs/activity` ay permanenteng nire-redirect (HTTP 308) sa
`/dashboard/activity` sa pamamagitan ng `permanentRedirect()` sa
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

Ang legacy na sidebar ID na `logs-activity` ay pinananatili sa `HIDEABLE_SIDEBAR_ITEM_IDS`
(ngunit inalis sa `SIDEBAR_DEFINITIONS`) upang maiwasang masira ang mga preset ng user na
tumutukoy sa lumang ID.

---

## i18n

Mga namespace na idinagdag ng Group B:

| Namespace key           | Saklaw                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------ |
| `sidebar.costsSection`  | Label ng seksyon ng Mga Gastos                                                       |
| `sidebar.activity`      | Item ng Aktibidad sa sidebar                                                         |
| `sidebar.logsGroup`     | Label ng subgroup ng Mga Log                                                         |
| `sidebar.systemGroup`   | Label ng subgroup ng System                                                          |
| `sidebar.costsOverview` | Item ng pangkalahatang-ideya ng Mga Gastos                                           |
| `activity.*`            | Lahat ng string sa page ng Aktibidad (pamagat, mga pandiwa, mga filter, empty state) |

Mga source-of-truth na locale: `pt-BR` at `en`. Ang lahat ng iba pang 40 locale ay bumabalik sa
English sa pamamagitan ng fallback mechanism ng `next-intl` (naka-configure sa `src/i18n/config.ts`).
