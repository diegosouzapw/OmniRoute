# SQLite Runtime Resolution (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute na-achọpụta draịva SQLite ya mgbe ọ na-amalite site n'usoro ndaghachi nwere nzọụkwụ 5:

1. **`better-sqlite3` etinyere n'ime ngwugwu** (site na `dependencies` dị na `package.json`)
   — ọ kachasị ọsọ, ọ bụ binary nke sistemụ ahụ, `npm install` na-etinye ya mgbe ngwaọrụ build dị.

2. **`better-sqlite3` etinyere n'oge ojiji** (n'ime `~/.omniroute/runtime/`)
   — a na-etinye ya naanị mgbe achọrọ ya n'oge mbụ a na-agba ya **MA Ọ BỤ** site na `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Ọ na-enyocha magic bytes nke `.node` nke sistemụ ahụ (ELF / Mach-O / PE) tupu ebugo ya
   iji gbochie binary mebiri emebi ma ọ bụ nke e mere maka platform na-ezighị ezi.

3. **`node:sqlite`** (stdlib nke Node ≥22.5) — ọ dịghị mkpa ịrụ build nke sistemụ ahụ; a na-eji ya mgbe
   ụzọ better-sqlite3 abụọ ahụ dara. Ọ nwere atụmatụ ole na ole.

4. **`sql.js`** (WASM) — ndaghachi ikpeazụ. Ọ na-arụ ọrụ ebe niile mana ọ na-eji nwayọọ
   ma na-ede data n'oge etinyere n'etiti oge kama ide ya ozugbo n'otu oge.

## Gịnị mere o ji sie ike otu a?

- **Windows EBUSY**: `npm install -g omniroute@latest` nwere ike ịda ma ọ bụrụ na
  proses na-agba ọrụ akpọchiela `better_sqlite3.node` nke ụdị gara aga. Ntinye n'oge ojiji
  n'ime `~/.omniroute/runtime/` na-agafe cache npm zuru ụwa ọnụ.
- **Enweghị ngwaọrụ build**: Ụfọdụ gburugburu ọrụ (Windows ụlọ ọrụ na-enweghị VS Build
  Tools, obere onyonyo Docker) enweghị ike ịkọmpaịlụ `better-sqlite3`. Onye nrụnye n'oge ojiji
  na-enweta binary e wuru tupu oge eruo site na ndekọ npm; draịva ndaghachi
  na-ahụ na OmniRoute ka ga-amalite ọbụlagodi ma nke ahụ daa.
- **Sistemụ ndị a kewapụrụ na netwọkụ**: Ọ bụrụ na enweghị ike iru ndekọ npm, `node:sqlite`
  ma ọ bụ `sql.js` na-ekwe nkwa ọrụ ndị bụ isi.

## Nnyocha magic-byte

Tupu ebugo faịlụ `.node` etinyere n'oge ojiji, OmniRoute na-agụ byte 8 mbụ
ma jiri ha tụnyere magic ndị a maara nke platform:

| Platform              | Bytes (hex)   | Label       |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Magic na-adabaghị → a na-eleghara faịlụ ahụ anya, ndaghachi na-aga n'ihu na nzọụkwụ na-esote.

## Ịlele draịva na-arụ ọrụ

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Njikwa aka

```bash
# Mafee nkwadebe postinstall (maka ntinye CI ngwa ngwa)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Manye nrụnye better-sqlite3 nke runtime ọzọ
rm -rf ~/.omniroute/runtime
omniroute  # ọ ga-etinyegharị ya mgbe ọ malitere ọzọ

# Lelee draịva na-arụ ọrụ
omniroute config db-info  # (ọ bụrụ na iwu CLI ahụ dị)
```

## Nrụtụaka

Mmejuputa:

- `bin/cli/runtime/magicBytes.mjs` — ngwaọrụ enyemaka maka nnyocha magic-byte nke binary
- `bin/cli/runtime/sqliteRuntime.mjs` — onye na-achọpụta runtime nwere nzọụkwụ 5 + onye nrụnye mgbe achọrọ ya
- `bin/cli/runtime/index.mjs` — onye nhazi mmalite (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — hook npm mgbe ntinye gasịrị (nkwadebe na-adịghị egbu usoro ma ọ daa)
- `src/lib/db/core.ts` — mbupụ `ensureDbInitialized()` / `getDriverInfo()`

## Nhazi otu onye na-ede ihe (anaghị akwado HA)

Usoro ndaghachi draịva dị n'elu ka na-agba n'ime **otu proses**. SQLite ndabara
nke OmniRoute bụ **otu onye na-ede ihe**:

- Ejikọla replica OmniRoute abụọ na otu faịlụ `storage.sqlite`.
- Mmalitegharị container, mbugharị Recreate, ogbugbu OOM, ma ọ bụ mmalitegharị HEALTHCHECK na-akwụsị
  session SSE niile na-aga n'ihu. Enweghị igbunyụ session nwayọọ nwayọọ n'ụzọ ndabara.
- Nnyocha ịdị ndụ nke orchestrator nke na-ewere `/healthz` na-adịghị aza ngwa ngwa dịka nke nwụrụ anwụ ga-egbu naanị
  replica ahụ. Ka mma iji ịdị ndụ TCP + ịdị njikere HTTP `/healthz`. Lee
  [Nduzi Docker — nnweta](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  na [ndụmọdụ probe Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
