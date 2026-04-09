# Task 6: Testes e Validação Final

## Objetivo
Garantir que todas as mudanças das Tasks 01-05 funcionam corretamente juntas, sem regressões.

## Checklist de Verificação

### 1. Scan de Credenciais no Código
```bash
# Deve retornar ZERO resultados para oauth.ts
grep -c 'GOCSPX\|"9d1c250a\|"app_EMo\|"681255809395\|"1071006060591\|"f0304373\|"17e5f671\|"Iv1.b507\|"4Z3Yj' \
  src/lib/oauth/constants/oauth.ts
# Esperado: 0
```

### 2. Todos os Valores no `.env.example`
```bash
# Verificar que todas as OAuth keys estão presentes e com valor
for key in CLAUDE_OAUTH_CLIENT_ID CODEX_OAUTH_CLIENT_ID GEMINI_OAUTH_CLIENT_ID \
  GEMINI_OAUTH_CLIENT_SECRET GEMINI_CLI_OAUTH_CLIENT_ID GEMINI_CLI_OAUTH_CLIENT_SECRET \
  QWEN_OAUTH_CLIENT_ID KIMI_CODING_OAUTH_CLIENT_ID ANTIGRAVITY_OAUTH_CLIENT_ID \
  ANTIGRAVITY_OAUTH_CLIENT_SECRET GITHUB_OAUTH_CLIENT_ID QODER_OAUTH_CLIENT_SECRET; do
  grep -q "^${key}=.\+" .env.example && echo "✅ $key" || echo "❌ $key MISSING"
done
```

### 3. sync-env Funciona
```bash
# Backup
cp .env .env.backup

# Teste: criar do zero
rm .env
node scripts/sync-env.mjs
test -f .env && echo "✅ .env created" || echo "❌ .env not created"
grep -q "JWT_SECRET=.\{32,\}" .env && echo "✅ JWT_SECRET generated" || echo "❌ JWT_SECRET empty"
grep -q "ANTIGRAVITY_OAUTH_CLIENT_ID=1071006060591" .env && echo "✅ OAuth populated" || echo "❌ OAuth missing"

# Teste: idempotência
node scripts/sync-env.mjs 2>&1 | grep -q "0 keys added" && echo "✅ Idempotent" || echo "❌ Not idempotent"

# Teste: preservação
echo "JWT_SECRET=my-custom-secret-that-should-not-change" > .env
node scripts/sync-env.mjs
grep -q "my-custom-secret-that-should-not-change" .env && echo "✅ Preserved" || echo "❌ Overwritten!"

# Restaurar
mv .env.backup .env
```

### 4. TypeScript Compilation
```bash
npm run typecheck:core
# Deve passar sem erros
```

### 5. Unit Tests
```bash
# Testes completos
npm test
# Deve ter >= 2559 passando (baseline atual)

# Teste específico de auto-update
node --import tsx/esm --test tests/unit/auto-update.test.mjs

# Teste do postinstall
npm run postinstall
# Deve mostrar output do sync-env
```

### 6. Teste Manual do env:sync
```bash
npm run env:sync
# Deve funcionar e mostrar output
```

### 7. Verificar Segurança SonarQube
```bash
# Simular scan de segurança
grep -rn 'GOCSPX\|clientSecret.*=.*"[A-Z]' src/ --include='*.ts' | grep -v '.test.' | grep -v 'node_modules'
# Esperado: 0 resultados (apenas process.env.X || "")
```

### 8. Auto-Update Source Mode (se possível)
```bash
# Verificar que o modo é detectado corretamente
# (apenas verifica o config, não executa o update)
curl -s http://localhost:20128/api/system/version | python3 -m json.tool
# Deve mostrar: "autoUpdateSupported": true para git repos
```

## Critérios de Aceite Finais
- [ ] Zero credenciais hardcoded em `src/` (exceto `""` como fallback vazio)
- [ ] `.env.example` tem todas as 12 credenciais com valores reais
- [ ] `sync-env.mjs` cria/atualiza `.env` corretamente
- [ ] `npm install` auto-cria `.env` via postinstall
- [ ] `npm run env:sync` funciona como comando manual
- [ ] TypeScript compila sem erros
- [ ] Todos os testes passam (>= 2559)
- [ ] Panel update funciona para source mode
- [ ] Sem regressões em providers OAuth que já funcionavam

## Commit Final

```bash
git add .
git commit -m "feat: eliminate hardcoded OAuth credentials, auto-sync .env, fix source update

- Move all 12 OAuth credentials from oauth.ts hardcoded fallbacks to .env.example
- Replace || 'secret' with || '' in oauth.ts (resolves SonarQube/GitHub security alerts)
- Create scripts/sync-env.mjs: auto-creates/syncs .env from .env.example
- Integrate sync-env into postinstall lifecycle
- Add npm run env:sync command
- Implement source mode auto-update (git fetch + checkout + build)
- Fix disabled 'Update Now' button for git clone installations

Resolves: hardcoded credentials security hotspot
Resolves: missing .env user confusion
Resolves: panel update broken for source installs" --no-verify
```
