# Feature OQueElaFaz 16 — Hierarquia de Chaves (Org -> Team -> User -> Key)

**Origem:** necessidade de governança multi-tenant avançada  
**Prioridade:** P2  
**Impacto esperado:** controle de acesso e orçamento mais granular

---

## O que ela faz

Evolui o modelo atual de chave plana para hierarquia multi-tenant:

- organização
- times
- usuários
- chaves

com herança de políticas de limite, orçamento e permissões.

---

## Motivação

Ambientes com múltiplas equipes precisam segregação de custos, limites e trilha de auditoria por unidade.

---

## O que ganhamos

1. Governança de custo por time/usuário
2. Controle de permissão mais seguro
3. Base para billing interno e chargeback

---

## Antes e Depois

## Antes

- controle por chave isolada
- pouca estrutura para multi-time

## Depois

- políticas herdadas e sobreposição por nível
- relatórios por organização/time/usuário

---

## Como fazer (passo a passo)

1. Estender schema SQLite com tabelas `orgs`, `teams`, `users`, `keys` e relacionamentos.
2. Criar serviço de resolução de política efetiva por request.
3. Aplicar orçamento e limites por nível hierárquico.
4. Atualizar APIs administrativas para CRUD da hierarquia.
5. Migrar dados existentes com estratégia backward compatible.

---

## Arquivos-alvo sugeridos

- `src/lib/db/core.js` (migrações)
- `src/lib/db/apiKeys.js`
- `src/lib/db/settings.js`
- `src/app/api/admin/*`
- `src/lib/usageAnalytics.js`

---

## Critérios de aceite

- request resolve política efetiva corretamente.
- limites e budget funcionam por nível (key/team/org).
- trilha de auditoria inclui escopo hierárquico.

---

## Riscos e mitigação

| Risco                    | Mitigação                                     |
| ------------------------ | --------------------------------------------- |
| complexidade de migração | fase de compatibilidade dual e rollback claro |
| regressão em auth        | testes de autorização por papel/escopo        |

---

## Métricas de sucesso

- adoção de escopo por time/org
- acurácia de cobrança por unidade
- redução de incidentes de permissão indevida
