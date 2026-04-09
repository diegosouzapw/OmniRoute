# 1. Título da Feature

Feature 11 — Migração Automática de Aliases de Modelo

## 2. Objetivo

Criar mecanismo de migração automática e idempotente de aliases/model IDs legados para novos padrões, sem quebrar configurações existentes.

## 3. Motivação

Com a evolução contínua de providers/modelos, IDs legados ficam obsoletos. Sem migração automática, upgrades passam a exigir ajuste manual, elevando risco de quebra operacional.

## 4. Problema Atual (Antes)

- Mudanças de nomenclatura dependem de ajuste manual de configuração.
- Falta versionamento explícito de migração para aliases.
- Risco de inconsistência entre aliases persistidos e registry atual.

### Antes vs Depois

| Dimensão               | Antes           | Depois                  |
| ---------------------- | --------------- | ----------------------- |
| Atualização de aliases | Manual          | Automática e versionada |
| Idempotência           | Não formalizada | Garantida               |
| Rollback               | Ad-hoc          | Estratégia explícita    |
| Suporte a legado       | Parcial         | Sistemático             |

## 5. Estado Futuro (Depois)

Adicionar motor de migração de aliases com controle de versão e execução no startup/config load.

## 6. O que Ganhamos

- Upgrades mais seguros.
- Menos regressão após atualização de catálogo.
- Menor custo de manutenção para usuários antigos.

## 7. Escopo

- Criar pipeline de migração versionada.
- Persistir versão aplicada.
- Registrar mudanças aplicadas para auditoria.

## 8. Fora de Escopo

- Migração de dados não relacionados a modelos/aliases.
- Refatorar schema completo de banco nesta etapa.

## 9. Arquitetura Proposta

```text
Startup
  -> load settings/aliases
  -> detect migrationVersion
  -> apply pending migrations (ordered)
  -> persist new version + changelog
  -> continue bootstrap
```

## 10. Mudanças Técnicas Detalhadas

Arquivos de referência:

- `open-sse/services/model.js`
- `open-sse/config/providerRegistry.js`
- `src/lib/db/core.js`
- `src/lib/db/models.js`
- `src/lib/db/domainState.js`

Pseudo-código:

```js
const MIGRATIONS = [
  { version: 1, up: migrateLegacyOssAliases },
  { version: 2, up: migrateDeepseekV32Aliases },
];

function runAliasMigrations(currentVersion) {
  for (const m of MIGRATIONS) {
    if (m.version > currentVersion) m.up();
  }
}
```

## 11. Impacto em APIs Públicas / Interfaces / Tipos

- APIs novas: nenhuma obrigatória.
- APIs alteradas: nenhuma no contrato público.
- Tipos/interfaces: novo tipo interno `AliasMigrationRecord`.
- Compatibilidade: **non-breaking** com foco em retrocompatibilidade.
- Estratégia de transição: rollout gradual por feature flag e fallback para comportamento anterior quando aplicável.
- Registro explícito: “Sem impacto em API pública; impacto interno apenas.”

## 12. Passo a Passo de Implementação Futura

1. Definir armazenamento de `aliasMigrationVersion`.
2. Criar catálogo de migrações ordenadas.
3. Implementar execução idempotente em bootstrap.
4. Registrar relatório de migração aplicada.
5. Criar comando/endpoint opcional para dry-run de migração.

## 13. Plano de Testes

Cenários positivos:

1. Dado versão antiga com aliases legados, quando startup roda, então migra para novos IDs.
2. Dado startup subsequente, quando migrações já aplicadas, então não altera dados novamente.
3. Dado múltiplas migrações pendentes, quando executa, então aplica em ordem correta.

Cenários de erro:

4. Dado migração falha no meio, quando executa, então rollback transacional evita estado inconsistente.
5. Dado alias inválido não mapeável, quando migrar, então registra warning sem corromper configuração.

Regressão:

6. Dado alias já canônico, quando migrador executa, então valor permanece inalterado.

Compatibilidade retroativa:

7. Dado configuração antiga sem campo de versão, quando startup roda, então assume versão base e migra corretamente.

## 14. Critérios de Aceite

- [ ] Given ambiente com aliases legados e `migrationVersion` antigo, When o startup executa, Then todas as migrações pendentes são aplicadas em ordem e uma única vez.
- [ ] Given migração já aplicada em execução anterior, When o sistema reinicia, Then nenhuma alteração adicional é realizada (idempotência comprovada).
- [ ] Given falha em uma etapa de migração, When o processo é interrompido, Then rollback transacional mantém a configuração consistente sem perda de aliases válidos.
- [ ] Given aliases já canônicos, When o motor de migração roda, Then os valores permanecem inalterados e logs de auditoria são emitidos.

## 15. Riscos e Mitigações

- Risco: migração parcial quebrar resolução de modelo.
- Mitigação: transação, backup e rollback automático.

## 16. Plano de Rollout

1. Introduzir em modo dry-run com telemetria.
2. Ativar migração automática em staging.
3. Ativar produção com backup prévio.

## 17. Métricas de Sucesso

- Taxa de migração bem-sucedida.
- Zero incidentes por alias legado após upgrade.
- Redução de erros de resolução pós-release.

## 18. Dependências entre Features

- Dependente de `feature-modelo-compatibilidade-cross-proxy-01.md` para tabela de mapeamentos.
- Complementa `feature-registro-de-capacidades-de-modelo-08.md`.

## 19. Checklist Final da Feature

- [ ] Versionamento de migração definido.
- [ ] Motor idempotente implementável.
- [ ] Rollback documentado.
- [ ] Testes cobrindo ordem/falha/regressão.
- [ ] Compatibilidade retroativa garantida.
