# 1. Título da Feature

Feature 44 — Operação Segura de Containers via Socket Proxy

## 2. Objetivo

Caso o projeto evolua para gerenciamento de containers pelo dashboard, usar `docker-socket-proxy` restrito para reduzir superfície de ataque em vez de expor Docker socket bruto.

## 3. Motivação

Acesso direto ao socket Docker concede privilégios amplos. Um proxy restrito permite operações necessárias com menor risco.

## 4. Problema Atual (Antes)

- A aplicação já possui ações operacionais como restart, mas sem modelo completo de gestão de containers.
- Sem proxy restritivo, qualquer expansão futura de Docker API aumenta risco.

### Antes vs Depois

| Dimensão              | Antes                                   | Depois                   |
| --------------------- | --------------------------------------- | ------------------------ |
| Acesso Docker         | Potencialmente amplo em expansão futura | Escopado por capacidades |
| Segurança operacional | Dependente de disciplina manual         | Enforced por arquitetura |
| Governança            | Limitada                                | Permissões explícitas    |

## 5. Estado Futuro (Depois)

Arquitetura com serviço intermediário de socket proxy e apenas capacidades necessárias habilitadas.

## 6. O que Ganhamos

- Menor risco de abuso de Docker API.
- Base segura para features de operação automatizada.
- Melhor postura de segurança para self-hosting.

## 7. Escopo

- Definição de compose/profile opcional com `docker-socket-proxy`.
- Configurar app para usar `DOCKER_HOST=tcp://docker-proxy:2375`.
- Limitar operações permitidas.

## 8. Fora de Escopo

- Orquestração Kubernetes.
- Gestão avançada multi-host.

## 9. Arquitetura Proposta

```mermaid
flowchart LR
  A[dashboard] --> B[docker-socket-proxy]
  B --> C[/var/run/docker.sock]
```

## 10. Mudanças Técnicas Detalhadas

Arquivos de referência:

- `docker-compose.yml`
- `docker-compose.prod.yml`
- `src/app/api/restart/route.js`

Direção de configuração:

- Habilitar apenas o mínimo: `CONTAINERS=1`, `IMAGES=1`, `POST=1`.
- Negar capacidades perigosas: `EXEC=0`, `VOLUMES=0`, `NETWORKS=0`, etc.

## 11. Impacto em APIs Públicas / Interfaces / Tipos

- APIs novas: opcionais de operação de container.
- APIs alteradas: operações admin podem passar pelo proxy.
- Compatibilidade: **aditiva**.

## 12. Passo a Passo de Implementação Futura

1. Criar profile opcional com docker proxy.
2. Adaptar operações administrativas para `DOCKER_HOST`.
3. Definir limites de capabilities.
4. Testar fallback quando proxy indisponível.

## 13. Plano de Testes

Cenários positivos:

1. Operação permitida (ex.: restart) funciona via proxy.

Cenários de erro:

2. Operação bloqueada (ex.: exec) retorna erro de permissão.

Regressão:

3. Fluxos existentes sem profile de proxy continuam operando.

Compatibilidade retroativa:

4. Ambientes sem Docker não quebram startup.

## 14. Critérios de Aceite

- [ ] Given operação permitida, When chamada, Then executa com sucesso via proxy.
- [ ] Given operação não permitida, When chamada, Then é negada e auditada.
- [ ] Given profile desativado, When aplicação sobe, Then não há regressão de funcionalidades existentes.

## 15. Riscos e Mitigações

- Risco: configuração incorreta de permissões.
- Mitigação: template documentado com defaults seguros.

## 16. Plano de Rollout

1. Introduzir como profile opcional.
2. Validar em ambiente de staging.
3. Tornar recomendação oficial em produção.

## 17. Métricas de Sucesso

- Zero operações Docker fora do escopo permitido.
- Redução de risco percebido em auditoria de deployment.

## 18. Dependências entre Features

- Complementa `feature-observabilidade-de-auditoria-e-acoes-administrativas-21.md`.

## 19. Checklist Final da Feature

- [ ] Profile de socket proxy definido.
- [ ] Permissões mínimas configuradas.
- [ ] Operações críticas validadas.
- [ ] Fallback/documentação concluídos.
