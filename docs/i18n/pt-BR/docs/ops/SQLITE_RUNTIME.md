# SQLite Runtime Resolution (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

O OmniRoute resolve seu driver SQLite na inicialização por meio de uma cadeia de fallback em 5 etapas:

1. **`better-sqlite3` incluído** (via `dependencies` no `package.json`)
   — mais rápido, binário nativo, instalado pelo `npm install` quando as ferramentas de compilação estão disponíveis.

2. **`better-sqlite3` instalado em tempo de execução** (em `~/.omniroute/runtime/`)
   — instalado sob demanda na primeira execução **OU** por `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Valida os bytes mágicos do arquivo `.node` nativo (ELF / Mach-O / PE) antes de carregá-lo
   para evitar binários corrompidos ou destinados à plataforma errada.

3. **`node:sqlite`** (biblioteca padrão do Node ≥22.5) — nenhuma compilação nativa é necessária; usado quando
   ambos os caminhos do better-sqlite3 falham. Conjunto limitado de recursos.

4. **`sql.js`** (WASM) — fallback final. Funciona em qualquer ambiente, mas é mais lento
   e grava os dados em intervalos, em vez de fazê-lo de forma síncrona.

## Por que essa complexidade?

- **EBUSY no Windows**: `npm install -g omniroute@latest` pode falhar se o
  `better_sqlite3.node` da versão anterior estiver bloqueado por um processo em execução. A instalação
  em tempo de execução em `~/.omniroute/runtime/` evita o cache global do npm.
- **Ausência de ferramentas de compilação**: alguns ambientes (Windows corporativo sem VS Build
  Tools, imagens mínimas do Docker) não conseguem compilar o `better-sqlite3`. O instalador em tempo
  de execução obtém um binário pré-compilado do registro npm; os drivers de fallback
  garantem que o OmniRoute ainda seja inicializado mesmo se isso falhar.
- **Sistemas isolados da rede**: se o registro npm estiver inacessível, `node:sqlite`
  ou `sql.js` garantem a funcionalidade básica.

## Validação de bytes mágicos

Antes de carregar um arquivo `.node` instalado em tempo de execução, o OmniRoute lê os primeiros 8
bytes e os compara com os bytes mágicos conhecidos das plataformas:

| Plataforma            | Bytes (hex)   | Rótulo      |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64 bits BE      | `FE ED FA CF` | `macho`     |
| macOS 64 bits LE      | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Um byte mágico incompatível → o arquivo é ignorado e o fallback prossegue para a próxima etapa.

## Verificação do driver ativo

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Controle manual

```bash
# Ignorar o aquecimento pós-instalação (para instalações rápidas de CI)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Forçar a reinstalação do better-sqlite3 em tempo de execução
rm -rf ~/.omniroute/runtime
omniroute  # será reinstalado na próxima inicialização

# Verificar qual driver está ativo
omniroute config db-info  # (se o comando da CLI existir)
```

## Referência

Implementação:

- `bin/cli/runtime/magicBytes.mjs` — auxiliares de validação de bytes mágicos de binários
- `bin/cli/runtime/sqliteRuntime.mjs` — resolvedor em tempo de execução de 5 etapas + instalador sob demanda
- `bin/cli/runtime/index.mjs` — orquestrador de inicialização (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — gancho pós-instalação do npm (aquecimento não fatal)
- `src/lib/db/core.ts` — exportações de `ensureDbInitialized()` / `getDriverInfo()`

## Topologia de gravador único (HA não suportada)

A cadeia de fallback de drivers acima ainda é executada em **um único processo**. Com o SQLite
padrão, o OmniRoute tem **um único gravador**:

- Não conecte duas réplicas do OmniRoute ao mesmo arquivo `storage.sqlite`.
- Uma reinicialização do contêiner, uma implantação com Recreate, um encerramento por OOM ou uma reinicialização causada pelo HEALTHCHECK interrompe
  todas as sessões SSE em andamento. Não há drenagem de sessões no fluxo padrão.
- Uma verificação de atividade do orquestrador que interprete uma resposta lenta de `/healthz` como inatividade encerrará a única
  réplica. Prefira uma verificação de atividade por TCP + uma verificação de prontidão HTTP em `/healthz`. Consulte o
  [Guia do Docker — disponibilidade](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  e as [recomendações de probes do Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
