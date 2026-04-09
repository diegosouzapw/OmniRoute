# Prompt de Revisão Editorial — Docs de Features (`docs/new_features`)

Você é um revisor técnico-editorial de documentação de engenharia. Revise os 12 arquivos `feature-*.md` em `docs/new_features` com foco em padronização de linguagem, consistência de granularidade e legibilidade para implementação futura.

## Objetivo

Padronizar os documentos para que qualquer desenvolvedor consiga implementar as features sem ambiguidade, mantendo o template obrigatório de 19 seções e o nível técnico já definido.

## Entradas

- Pasta: `docs/new_features`
- Arquivos-alvo: `feature-*.md` (01 a 12)
- Escopo: somente documentação (não alterar código-fonte da aplicação)

## Regras de Revisão

1. Preservar exatamente as 19 seções obrigatórias em cada arquivo.
2. Manter o foco técnico e linguagem objetiva em pt-BR.
3. Remover inconsistências de estilo entre documentos (tom, precisão, terminologia).
4. Tornar critérios de aceite verificáveis e mensuráveis.
5. Garantir que cada documento explicite compatibilidade e estratégia de transição.
6. Não remover referências a caminhos reais do repositório.

## Ajustes Obrigatórios

1. Na seção **11. Impacto em APIs Públicas / Interfaces / Tipos**:

- Padronizar bullets para incluir: APIs novas, APIs alteradas, tipos impactados, compatibilidade e estratégia de transição.
- Quando não houver impacto público, declarar explicitamente: “Sem impacto em API pública; impacto interno apenas.”

2. Na seção **14. Critérios de Aceite**:

- Padronizar em formato verificável `Given / When / Then`.
- Garantir critérios objetivos (ex.: comportamento esperado, ausência de regressão, evidência em testes/logs/métricas).

3. Revisão de qualidade textual:

- Corrigir erros gramaticais/ortográficos.
- Reduzir frases vagas e reforçar termos operacionais (ex.: threshold, fallback, cooldown, rollout).

## Processo de Execução

1. Ler os 12 arquivos e identificar divergências de estilo e precisão.
2. Aplicar edição editorial sem mudar escopo funcional de cada feature.
3. Validar automaticamente:

- 12 arquivos presentes.
- 19 seções por arquivo.
- seção `Antes vs Depois` presente.
- diagrama textual presente.
- snippet técnico presente.
- plano de testes mínimo mantido.

4. Gerar resumo final com:

- O que foi padronizado.
- Quais arquivos foram ajustados.
- Resultado das validações.

## Critério de Conclusão

A revisão editorial está concluída quando os 12 documentos estiverem consistentes em linguagem e granularidade, com critérios de aceite objetivos e sem perda de requisitos técnicos.
