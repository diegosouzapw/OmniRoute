# Feature 125 — Management Secret Hashing (bcrypt)

## Objetivo

Implementar hashing automático da chave de acesso ao Management API usando bcrypt. No primeiro startup, a chave plaintext é hashada e o hash persiste de volta na configuração, garantindo que credenciais sensíveis nunca fiquem em texto plano.

## Motivação

A Management API do OmniRoute (dashboard, config endpoints) é protegida por uma chave secreta. Hoje essa chave fica em texto plano no `.env` ou na config. Se o arquivo for vazado (git commit acidental, backup inseguro, log), a chave está exposta. O CLIProxyAPI resolve isso hashando automaticamente a chave com bcrypt no startup.

## O que Ganhamos

- **Segurança**: Chave nunca fica em texto plano após primeiro boot
- **Auditoria**: Se o arquivo for comprometido, hash não revela a chave
- **Transparência**: Processo automático sem intervenção do admin
- **Padrão**: Consistente com best practices de armazenamento de senhas

## Situação Atual (Antes)

```env
# .env
MANAGEMENT_SECRET=minha-chave-super-secreta   ← Em texto plano!
```

```
Se .env vazar:
  → Atacante tem acesso direto ao Management API
  → Pode adicionar/remover credenciais
  → Pode mudar routing e roubar tokens
```

## Situação Proposta (Depois)

```env
# .env (após primeiro boot)
MANAGEMENT_SECRET=$2b$10$K5V5x...hashed...value   ← bcrypt hash
```

```
Se .env vazar:
  → Atacante vê apenas o hash
  → Não consegue reverter para a chave original
  → Management API protegido
```

## Especificação Técnica

### Fluxo de Startup

```
1. Ler MANAGEMENT_SECRET do .env
2. Se NÃO começa com "$2b$" (não é bcrypt hash):
   a. Gerar hash: bcrypt(plaintext, salt_rounds=10)
   b. Salvar hash de volta no .env
   c. Manter plaintext em memória para esta sessão
3. Se JÁ começa com "$2b$":
   a. É um hash, usar bcrypt.compare para validar requests
```

### Implementação

```javascript
// src/lib/auth/managementAuth.js
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;
const BCRYPT_PREFIX = "$2b$";

export class ManagementAuth {
  constructor(secret) {
    this.isHashed = secret.startsWith(BCRYPT_PREFIX);
    this.hash = this.isHashed ? secret : null;
    this.plaintext = this.isHashed ? null : secret;
  }

  async initialize() {
    if (!this.isHashed && this.plaintext) {
      // First boot: hash the plaintext
      this.hash = await bcrypt.hash(this.plaintext, SALT_ROUNDS);
      await this.persistHash();
      console.log("Management secret hashed and persisted (bcrypt)");
    }
  }

  async validate(provided) {
    if (!this.hash) return false;
    return bcrypt.compare(provided, this.hash);
  }

  async persistHash() {
    // Atualizar .env com o hash
    const envPath = path.resolve(process.cwd(), ".env");
    let envContent = fs.readFileSync(envPath, "utf8");
    envContent = envContent.replace(/^MANAGEMENT_SECRET=.+$/m, `MANAGEMENT_SECRET=${this.hash}`);
    fs.writeFileSync(envPath, envContent);
  }
}
```

### Middleware de Autenticação

```javascript
// src/middleware/managementAuth.js

export function managementAuthMiddleware(managementAuth) {
  return async (req, res, next) => {
    const secret =
      req.headers["x-management-secret"] || req.headers["authorization"]?.replace("Bearer ", "");

    if (!secret || !(await managementAuth.validate(secret))) {
      return res.status(401).json({ error: "Invalid management secret" });
    }
    next();
  };
}
```

## Arquivos a Criar/Modificar

| Arquivo                            | Ação                                   |
| ---------------------------------- | -------------------------------------- |
| `src/lib/auth/managementAuth.js`   | **NOVO** — bcrypt hashing logic        |
| `src/middleware/managementAuth.js` | **MODIFICAR** — Usar bcrypt compare    |
| `open-sse/sse-server.js`           | **MODIFICAR** — Inicializar no startup |
| `package.json`                     | **MODIFICAR** — Adicionar dep `bcrypt` |

## Critérios de Aceite

- [ ] Plaintext é hashada com bcrypt no primeiro startup
- [ ] Hash persiste de volta no `.env`
- [ ] Validação usa `bcrypt.compare` (timing-safe)
- [ ] Chaves já hashadas são reconhecidas e não re-hashadas
- [ ] Management API funciona normalmente com chave hashada
- [ ] Log confirma que hashing ocorreu (sem logar a chave)

## Referência

- [CLIProxyAPI: internal/config/config.go](https://github.com/router-for-me/CLIProxyAPI) — Management key bcrypt hashing on startup
