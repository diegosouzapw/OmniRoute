# SQLite Runtime Resolution (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

O OmniRoute resolve o respetivo controlador SQLite no arranque através de uma cadeia de contingência de 5 passos:

1. **`better-sqlite3` incluído** (através de `dependencies` em `package.json`)
   — o mais rápido, binário nativo, instalado por `npm install` quando estão disponíveis ferramentas de compilação.

2. **`better-sqlite3` instalado em tempo de execução** (em `~/.omniroute/runtime/`)
   — instalado de forma diferida na primeira execução **OU** por `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Valida os bytes mágicos nativos de `.node` (ELF / Mach-O / PE) antes do carregamento
   para proteger contra binários corrompidos ou destinados à plataforma errada.

3. **`node:sqlite`** (biblioteca padrão do Node ≥22.5) — não requer compilação nativa; utilizado quando
   ambos os caminhos de better-sqlite3 falham. Conjunto de funcionalidades limitado.

4. **`sql.js`** (WASM) — contingência final. Funciona em todo o lado, mas é mais lento
   e escreve os dados periodicamente, em vez de o fazer de forma síncrona.

## Porquê esta complexidade?

- **EBUSY no Windows**: `npm install -g omniroute@latest` pode falhar se o
  `better_sqlite3.node` da versão anterior estiver bloqueado por um processo em execução. A instalação
  em tempo de execução em `~/.omniroute/runtime/` contorna a cache global do npm.
- **Ausência de ferramentas de compilação**: Alguns ambientes (Windows empresariais sem VS Build
  Tools, imagens Docker mínimas) não conseguem compilar `better-sqlite3`. O instalador em tempo de
  execução obtém um binário pré-compilado do registo npm; os controladores de contingência
  garantem que o OmniRoute consegue arrancar mesmo que esse processo falhe.
- **Sistemas isolados da rede**: Se o registo npm estiver inacessível, `node:sqlite`
  ou `sql.js` garantem a funcionalidade básica.

## Validação de bytes mágicos

Antes de carregar um ficheiro `.node` instalado em tempo de execução, o OmniRoute lê os primeiros 8
bytes e compara-os com os valores mágicos conhecidos das plataformas:

| Plataforma            | Bytes (hex)   | Etiqueta    |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64 bits BE      | `FE ED FA CF` | `macho`     |
| macOS 64 bits LE      | `CF FA ED FE` | `macho-le`  |
| macOS universal (fat) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Um valor mágico incompatível → o ficheiro é ignorado e a contingência prossegue para o passo seguinte.

## Verificar o controlador ativo

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Controlo manual

```bash
# Ignorar a preparação após a instalação (para instalações rápidas em CI)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Forçar a reinstalação do better-sqlite3 em tempo de execução
rm -rf ~/.omniroute/runtime
omniroute  # será reinstalado no próximo arranque

# Verificar qual é o controlador ativo
omniroute config db-info  # (se o comando da CLI existir)
```

## Referência

Implementação:

- `bin/cli/runtime/magicBytes.mjs` — funções auxiliares de validação dos bytes mágicos do binário
- `bin/cli/runtime/sqliteRuntime.mjs` — resolvedor de 5 passos em tempo de execução + instalador diferido
- `bin/cli/runtime/index.mjs` — orquestrador de arranque (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — hook de pós-instalação do npm (preparação não fatal)
- `src/lib/db/core.ts` — exportações de `ensureDbInitialized()` / `getDriverInfo()`

## Topologia de escritor único (HA não suportada)

A cadeia de contingência de controladores acima continua a ser executada em **um processo**. Por
predefinição, o SQLite do OmniRoute utiliza **um único escritor**:

- Não associe duas réplicas do OmniRoute ao mesmo ficheiro `storage.sqlite`.
- Um reinício do contentor, uma implementação Recreate, um encerramento por OOM ou um reinício por HEALTHCHECK termina
  todas as sessões SSE em curso. Não existe drenagem de sessões no fluxo padrão.
- Uma verificação de atividade do orquestrador que considere um `/healthz` lento como inativo terminará a única
  réplica. Prefira verificações de atividade TCP + verificações de prontidão HTTP em `/healthz`. Consulte o
  [Guia do Docker — disponibilidade](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  e as [recomendações de sondas do Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
