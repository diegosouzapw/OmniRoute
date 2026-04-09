# Feature 126 — Distributed Config Store (Git/S3/Postgres)

## Objetivo

Implementar opções de armazenamento distribuído para configuração e tokens OAuth, permitindo que múltiplas instâncias do proxy compartilhem estado via Git repo, Object Store (S3/R2), ou PostgreSQL.

## Motivação

Em cenários de deploy multi-instância (Kubernetes, múltiplas VMs), cada instância precisa acessar os mesmos tokens OAuth e configurações. Hoje o OmniRoute armazena tudo localmente (DB SQLite, arquivos). O CLIProxyAPI suporta 3 backends de armazenamento remoto via variáveis de ambiente.

## O que Ganhamos

- **Multi-instância**: Múltiplos pods Kubernetes compartilham tokens
- **Backup automático**: Config e tokens versionados via Git
- **Disaster recovery**: Estado restaurável de qualquer backend
- **Escalabilidade**: Horizontal scaling com estado compartilhado

## Situação Atual (Antes)

```
Instância A → SQLite local → tokens, config
Instância B → SQLite local → tokens, config (SEPARADO!)
  → Admin adiciona credencial em A → B não tem
  → Token refresh em A → B tem token expirado
  → Inconsistência de estado ❌
```

## Situação Proposta (Depois)

```
Instância A ─┐
Instância B ─┤→ PostgreSQL (compartilhado)
Instância C ─┘     → Tokens OAuth
               → Credenciais
               → Config
  → Admin adiciona credencial → Todas as instâncias têm
  → Token refresh → Todos vêem o token novo ✓
```

## Especificação Técnica

### Configuração

```env
# === Option 1: PostgreSQL Token Store ===
PG_TOKEN_STORE_ENABLED=true
PG_TOKEN_STORE_HOST=db.example.com
PG_TOKEN_STORE_PORT=5432
PG_TOKEN_STORE_USER=omniroute
PG_TOKEN_STORE_PASSWORD=secret
PG_TOKEN_STORE_DATABASE=omniroute
PG_TOKEN_STORE_SSL=true

# === Option 2: Git-backed Config Store ===
GIT_CONFIG_STORE_ENABLED=true
GIT_CONFIG_STORE_URL=https://github.com/org/omniroute-config.git
GIT_CONFIG_STORE_BRANCH=main
GIT_CONFIG_STORE_TOKEN=ghp_xxxxx
GIT_CONFIG_STORE_SYNC_INTERVAL=60   # seconds

# === Option 3: Object Store (S3/R2/MinIO) ===
OBJECT_STORE_ENABLED=true
OBJECT_STORE_ENDPOINT=https://s3.amazonaws.com
OBJECT_STORE_BUCKET=omniroute-state
OBJECT_STORE_ACCESS_KEY=AKIA...
OBJECT_STORE_SECRET_KEY=secret...
OBJECT_STORE_REGION=us-east-1
```

### Interface Abstrata

```javascript
// src/lib/store/storeInterface.js

/**
 * @typedef {Object} ConfigStore
 * @property {function} get - (key: string) => Promise<any>
 * @property {function} set - (key: string, value: any) => Promise<void>
 * @property {function} delete - (key: string) => Promise<void>
 * @property {function} list - (prefix?: string) => Promise<string[]>
 * @property {function} sync - () => Promise<void>
 */

export function createStore(config) {
  if (config.pgTokenStore?.enabled) {
    return new PostgresStore(config.pgTokenStore);
  }
  if (config.gitConfigStore?.enabled) {
    return new GitStore(config.gitConfigStore);
  }
  if (config.objectStore?.enabled) {
    return new ObjectStore(config.objectStore);
  }
  // Default: local file store
  return new LocalFileStore(config.dataDir);
}
```

### PostgreSQL Store

```javascript
// src/lib/store/postgresStore.js

export class PostgresStore {
  constructor(config) { ... }

  async get(key) {
    const result = await this.pool.query(
      'SELECT value FROM config_store WHERE key = $1', [key]
    );
    return result.rows[0]?.value;
  }

  async set(key, value) {
    await this.pool.query(
      `INSERT INTO config_store (key, value, updated_at) VALUES ($1, $2, NOW())
       ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()`,
      [key, JSON.stringify(value)]
    );
  }
}
```

## Arquivos a Criar/Modificar

| Arquivo                           | Ação                                          |
| --------------------------------- | --------------------------------------------- |
| `src/lib/store/storeInterface.js` | **NOVO** — Interface abstrata                 |
| `src/lib/store/postgresStore.js`  | **NOVO** — PostgreSQL backend                 |
| `src/lib/store/gitStore.js`       | **NOVO** — Git repo backend                   |
| `src/lib/store/objectStore.js`    | **NOVO** — S3/R2/MinIO backend                |
| `src/lib/store/localFileStore.js` | **NOVO** — Local fallback (refactor existing) |
| `.env.example`                    | **MODIFICAR** — Variáveis de store            |

## Critérios de Aceite

- [ ] PostgreSQL store funciona para tokens OAuth e config
- [ ] Git store sincroniza config com repo remoto
- [ ] Object store (S3) funciona para state persistente
- [ ] Fallback para local file store quando nenhum backend configurado
- [ ] Múltiplas instâncias compartilham estado via qualquer backend
- [ ] Conflitos de escrita são tratados (last-write-wins ou merge)

## Referência

- [CLIProxyAPI: .env.example linhas 1-35](https://github.com/router-for-me/CLIProxyAPI) — PG, Git, Object Store config vars
