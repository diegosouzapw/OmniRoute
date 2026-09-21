# Monitoring & Costs — Navigation Structure (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Implementado no Grupo B (plano 16). Consulte `src/shared/constants/sidebarVisibility.ts`.

---

## Navegação de alto nível

A barra lateral do dashboard (após o Grupo B) possui estas seções de nível superior, nesta ordem:

```
Início
Provedores
Combos
Chaves de API
Configurações
Análises
Custos         ← NOVO (Grupo B, plano 16)
Monitoramento  ← REORGANIZADO (Grupo B, plano 16)
...
```

---

## Seção Custos (nova, nível 1)

Prefixo do caminho: `/dashboard/costs/`

| Item                     | URL                                  | Descrição                                          |
| ------------------------ | ------------------------------------ | -------------------------------------------------- |
| Visão geral              | `/dashboard/costs`                   | Dashboard de custos agregados (movido de Análises) |
| Preços                   | `/dashboard/costs/pricing`           | Tabela de preços por modelo                        |
| Orçamento                | `/dashboard/costs/budget`            | Limites de orçamento + alertas                     |
| Compartilhamento de cota | `/dashboard/costs/quota-share`       | Pools de compartilhamento de cota + uso            |
| Configuração de planos   | `/dashboard/costs/quota-share/plans` | Substituições de plano por provedor                |

**Justificativa**: Preços, Orçamento e Compartilhamento de cota ficavam anteriormente em
`Monitoramento > Parâmetros de custos`. Movê-los para uma seção dedicada de nível superior
facilita sua descoberta sem precisar navegar pelas ferramentas de observabilidade.

---

## Seção Monitoramento (reorganizada)

A seção Monitoramento agora tem **Atividade no topo**, seguida por **3 subgrupos**:

```
Monitoramento
├── Atividade            ← Feed da linha do tempo (item de nível superior)
├── Grupo Logs
│   ├── Logs (todos)
│   ├── Logs de proxy
│   └── Logs do console
├── Grupo Auditoria
│   ├── Log de auditoria
│   ├── Auditoria MCP
│   └── Auditoria A2A
└── Grupo Sistema
    ├── Integridade
    └── Runtime
```

### O que mudou em relação à estrutura antiga

| Antes                                                                                           | Depois                                            |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Atividade = aba dentro de Logs que renderizava o Log de auditoria                               | Atividade = feed dedicado (`/dashboard/activity`) |
| Grupo Parâmetros de custos em Monitoramento                                                     | Movido para a seção Custos                        |
| Lista simples: Logs, Atividade (logs), Auditoria, Integridade, Runtime, Preços, Orçamento, Cota | Estrutura com 3 grupos + seção Custos dedicada    |

---

## Atividade vs. Log de auditoria

Agora, eles são distintos:

| Dimensão              | Atividade (`/dashboard/activity`)                                   | Log de auditoria (`/dashboard/audit`)       |
| --------------------- | ------------------------------------------------------------------- | ------------------------------------------- |
| **Finalidade**        | Feed de eventos voltado ao usuário ("o que aconteceu recentemente") | Log de conformidade/segurança               |
| **Fonte de dados**    | `GET /api/compliance/audit-log?level=high`                          | `GET /api/compliance/audit-log?level=all`   |
| **Formato**           | Linha do tempo, agrupada por dia, com verbos legíveis e ícones      | Tabela densa e paginada, 50/página          |
| **Filtros**           | Categoria do tipo de evento                                         | Ação, gravidade, agente, intervalo de datas |
| **Exportação**        | Não disponível                                                      | Exportação em JSON                          |
| **Filtro por agente** | Não aplicável                                                       | Filtrável por agente                        |
| **Eventos exibidos**  | Somente ações de alto nível (lista de permissões)                   | Todos os eventos de auditoria               |

### Lista de permissões de ações de alto nível

Definida em `src/lib/audit/highLevelActions.ts`. Controla quais eventos aparecem no
feed de Atividade. A lista de permissões inclui:

- Eventos de adição/remoção/teste de provedores
- Criação/atualização/exclusão de combos
- Ciclo de vida das chaves de API (criação, revogação, rotação)
- Limite de orçamento atingido
- Login/logout de autenticação
- Criação de sessão do agente de nuvem
- Registro de ferramenta MCP
- Criação/exclusão de webhook
- Alterações de pools/planos de cota (ações `quota.*`, Grupo B)
- Eventos da plataforma (atualização, implantação)
- Instalação/remoção de habilidades

Os eventos que não estão nessa lista aparecem apenas no Log de auditoria.

### Como adicionar uma nova ação de alto nível

Edite `src/lib/audit/highLevelActions.ts` e adicione a string da ação a
`HIGH_LEVEL_ACTIONS`. Isso requer um PR (a lista faz parte do código e não pode ser
configurada pelo banco de dados). O ícone correspondente pode ser adicionado a
`src/lib/audit/activityIcons.ts`.

---

## Redirecionamento: `/dashboard/logs/activity`

O caminho antigo `/dashboard/logs/activity` é redirecionado permanentemente (HTTP 308) para
`/dashboard/activity` por meio de `permanentRedirect()` em
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

O ID legado da barra lateral `logs-activity` é preservado em `HIDEABLE_SIDEBAR_ITEM_IDS`
(mas removido de `SIDEBAR_DEFINITIONS`) para evitar interromper predefinições de usuários que
fazem referência ao ID antigo.

---

## i18n

Namespaces adicionados pelo Grupo B:

| Chave do namespace      | Abrange                                                                      |
| ----------------------- | ---------------------------------------------------------------------------- |
| `sidebar.costsSection`  | Rótulo da seção Custos                                                       |
| `sidebar.activity`      | Item Atividade da barra lateral                                              |
| `sidebar.logsGroup`     | Rótulo do subgrupo Logs                                                      |
| `sidebar.systemGroup`   | Rótulo do subgrupo Sistema                                                   |
| `sidebar.costsOverview` | Item de visão geral de custos                                                |
| `activity.*`            | Todas as strings da página Atividade (título, verbos, filtros, estado vazio) |

As localidades que servem como fonte da verdade são `pt-BR` e `en`. Todas as outras 40 localidades usam
o inglês como fallback por meio do mecanismo de fallback do `next-intl` (configurado em `src/i18n/config.ts`).
