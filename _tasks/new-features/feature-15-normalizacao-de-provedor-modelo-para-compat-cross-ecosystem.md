# Feature 08 - Normalizacao de provedor/modelo para compat cross-ecosystem

## O que ela faz

Cria camada de normalizacao para IDs de provedor e modelo vindos de clientes externos, reduzindo falhas por divergencia de alias e naming.

## Motivacao

Mesmo com catalogo robusto no `9router`, clientes externos usam variacoes de identificador que nao batem 1:1 com IDs internos.

## Antes x Depois

| Dimensao              | Antes           | Depois                      |
| --------------------- | --------------- | --------------------------- |
| Alias de provedor     | Parcial         | Governado por mapa canonico |
| Variacoes de model ID | Sensivel a erro | Normalizadas                |
| Erro de integracao    | Frequente       | Reduzido                    |

## Como implementar

1. Criar `src/lib/management/modelAliasMap.js`.
2. Criar `normalizeProviderAndModel()` consumido por endpoints management.
3. Integrar com `open-sse/services/model.js` antes da resolucao final.
4. Registrar eventos de normalizacao para auditoria.

## Criterios de aceite

- IDs alternativos resolvem para modelo suportado quando houver mapeamento.
- Ambiguidade continua retornando erro explicito (nao escolher arbitrariamente).
- Mapeamento versionado e testado.

## Riscos

- Mapeamento incorreto pode rotear para modelo errado.

## Mitigacoes

- Revisao de mapa por provider owner.
- Teste de regressao por alias critico.

## O que ganhamos

- Menos erros de migracao de cliente.
- Maior cobertura real de modelos sem alterar core de registry.

## Esforco estimado

- Medio (2 a 3 dias uteis).
