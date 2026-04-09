# Task 4: Integrar sync-env no Lifecycle (postinstall + package.json)

## Objetivo
Garantir que o `sync-env.mjs` seja executado automaticamente em todo `npm install` (fresh install ou update), e disponibilizar como comando manual `npm run env:sync`.

## Arquivos Alvo
1. `/home/diegosouzapw/dev/proxys/9router/scripts/postinstall.mjs`
2. `/home/diegosouzapw/dev/proxys/9router/package.json`

## Mudanças em `postinstall.mjs`

### Adicionar no FINAL do arquivo (após o bloco de @swc/helpers)

```javascript
// ── .env sync ────────────────────────────────────────────────────────────────
// Ensure .env exists with all required keys from .env.example.
// This runs silently — failures are non-fatal (don't break npm install).
try {
  const { syncEnv } = await import("./sync-env.mjs");
  syncEnv({ rootDir: ROOT });
} catch (err) {
  console.warn(`  ⚠️  .env sync skipped: ${err.message}`);
}
```

### Importância
- Deve estar no **final** do postinstall, depois do fix de native modules
- Deve ser envolvido em try/catch — falha no sync **não deve** impedir o `npm install`
- Usa o mesmo `ROOT` já definido no topo do arquivo

## Mudanças em `package.json`

### Adicionar script `env:sync`

Na seção `"scripts"`, adicionar:

```diff
     "typecheck:noimplicit:core": "tsc --noEmit -p tsconfig.typecheck-noimplicit-core.json",
+    "env:sync": "node scripts/sync-env.mjs",
     "check": "npm run lint && npm run test",
```

### Posicionamento
Colocar próximo aos outros scripts de utilidade, antes de `"check"`.

## Validação da Integração

### Verificar que postinstall chama sync-env
```bash
npm run postinstall
# Deve mostrar output do sync-env no final
```

### Verificar que npm install chama postinstall
```bash
# Em um ambiente limpo (sem .env):
rm -f .env
npm install
test -f .env && echo "SUCCESS: .env created" || echo "FAIL: .env not created"
```

### Verificar comando manual
```bash
npm run env:sync
# Deve mostrar output do sync-env
```

## Critérios de Aceite
- [ ] `npm install` cria `.env` automaticamente se não existir
- [ ] `npm run env:sync` funciona como comando standalone
- [ ] Falha no sync-env NÃO impede `npm install`
- [ ] Log do sync-env visível durante `npm install`
- [ ] Script `env:sync` aparece no `package.json`

## Notas de Implementação
- O `ROOT` em postinstall.mjs aponta para a raiz do projeto (onde está `.env.example`)
- O import dinâmico `await import()` é necessário porque postinstall é um script que roda antes do bundling
- Envolver em try/catch é crítico — ambientes com `--ignore-scripts` não devem ter problemas
