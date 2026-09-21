# Monitoring & Costs — Navigation Structure (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Implementado no Grupo B (plano 16). Consulte `src/shared/constants/sidebarVisibility.ts`.

---

## Navegação de alto nível

A barra lateral do painel (após o Grupo B) tem estas secções de nível superior, pela seguinte ordem:

```
Início
Fornecedores
Combinações
Chaves de API
Definições
Análises
Custos         ← NOVO (Grupo B, plano 16)
Monitorização  ← REORGANIZADO (Grupo B, plano 16)
...
```

---

## Secção Custos (nova, nível 1)

Prefixo do caminho: `/dashboard/costs/`

| Item                   | URL                                  | Descrição                                       |
| ---------------------- | ------------------------------------ | ----------------------------------------------- |
| Visão geral            | `/dashboard/costs`                   | Painel de custos agregados (movido de Análises) |
| Preços                 | `/dashboard/costs/pricing`           | Tabela de preços por modelo                     |
| Orçamento              | `/dashboard/costs/budget`            | Limites de orçamento + alertas                  |
| Partilha de quotas     | `/dashboard/costs/quota-share`       | Conjuntos de partilha de quotas + utilização    |
| Configuração de planos | `/dashboard/costs/quota-share/plans` | Substituições de planos por fornecedor          |

**Justificação**: Preços, Orçamento e Partilha de quotas encontravam-se anteriormente em
`Monitorização > Parâmetros de custos`. Movê-los para uma secção dedicada de nível superior
torna-os mais fáceis de encontrar sem ser necessário navegar pelas ferramentas de observabilidade.

---

## Secção Monitorização (reorganizada)

A secção Monitorização tem agora a **Atividade no topo**, seguida de **3 subgrupos**:

```
Monitorização
├── Atividade              ← Feed cronológico (item de nível superior)
├── Grupo Registos
│   ├── Registos (todos)
│   ├── Registos do proxy
│   └── Registos da consola
├── Grupo Auditoria
│   ├── Registo de auditoria
│   ├── Auditoria MCP
│   └── Auditoria A2A
└── Grupo Sistema
    ├── Estado
    └── Execução
```

### O que mudou em relação à estrutura anterior

| Antes                                                                                                 | Depois                                            |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Atividade = separador dentro de Registos que apresentava o Registo de auditoria                       | Atividade = feed dedicado (`/dashboard/activity`) |
| Grupo Parâmetros de custos em Monitorização                                                           | Movido para a secção Custos                       |
| Lista simples: Registos, Atividade (registos), Auditoria, Estado, Execução, Preços, Orçamento, Quotas | Estrutura com 3 grupos + secção Custos dedicada   |

---

## Atividade vs. Registo de auditoria

Estes dois elementos são agora distintos:

| Dimensão                     | Atividade (`/dashboard/activity`)                                        | Registo de auditoria (`/dashboard/audit`)          |
| ---------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------- |
| **Finalidade**               | Feed de eventos destinado ao utilizador («o que aconteceu recentemente») | Registo de conformidade/segurança                  |
| **Origem dos dados**         | `GET /api/compliance/audit-log?level=high`                               | `GET /api/compliance/audit-log?level=all`          |
| **Formato**                  | Cronologia agrupada por dia, com verbos legíveis e ícones                | Tabela densa e paginada, 50/página                 |
| **Filtros**                  | Categoria do tipo de evento                                              | Ação, gravidade, interveniente, intervalo de datas |
| **Exportação**               | Não disponível                                                           | Exportação JSON                                    |
| **Filtro por interveniente** | Não aplicável                                                            | Filtrável por interveniente                        |
| **Eventos apresentados**     | Apenas ações de alto nível (lista de permissões)                         | Todos os eventos de auditoria                      |

### Lista de permissões de ações de alto nível

Definida em `src/lib/audit/highLevelActions.ts`. Controla os eventos que aparecem no
feed de Atividade. A lista de permissões inclui:

- Eventos de adição/remoção/teste de fornecedores
- Criação/atualização/eliminação de combinações
- Ciclo de vida das chaves de API (criação, revogação, rotação)
- Limite de orçamento atingido
- Início/fim de sessão de autenticação
- Criação de sessões de agentes na cloud
- Registo de ferramentas MCP
- Criação/eliminação de webhooks
- Alterações a conjuntos/planos de quotas (ações `quota.*`, Grupo B)
- Eventos da plataforma (atualização, implementação)
- Instalação/remoção de competências

Os eventos que não constem desta lista aparecem apenas no Registo de auditoria.

### Adicionar uma nova ação de alto nível

Edite `src/lib/audit/highLevelActions.ts` e adicione a cadeia da ação a
`HIGH_LEVEL_ACTIONS`. Isto requer um PR (a lista encontra-se no código e não pode ser configurada na BD).
O ícone correspondente pode ser adicionado a `src/lib/audit/activityIcons.ts`.

---

## Redirecionamento: `/dashboard/logs/activity`

O caminho antigo `/dashboard/logs/activity` é redirecionado permanentemente (HTTP 308) para
`/dashboard/activity` através de `permanentRedirect()` em
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

O ID antigo da barra lateral `logs-activity` é preservado em `HIDEABLE_SIDEBAR_ITEM_IDS`
(mas removido de `SIDEBAR_DEFINITIONS`) para evitar danificar as predefinições dos utilizadores que
referenciam o ID antigo.

---

## i18n

Namespaces adicionados pelo Grupo B:

| Chave do namespace      | Abrange                                                                      |
| ----------------------- | ---------------------------------------------------------------------------- |
| `sidebar.costsSection`  | Etiqueta da secção Custos                                                    |
| `sidebar.activity`      | Item Atividade da barra lateral                                              |
| `sidebar.logsGroup`     | Etiqueta do subgrupo Registos                                                |
| `sidebar.systemGroup`   | Etiqueta do subgrupo Sistema                                                 |
| `sidebar.costsOverview` | Item de visão geral dos custos                                               |
| `activity.*`            | Todas as cadeias da página Atividade (título, verbos, filtros, estado vazio) |

Os idiomas de referência são `pt-BR` e `en`. Todos os outros 40 idiomas recorrem ao
inglês através do mecanismo de fallback do `next-intl` (configurado em `src/i18n/config.ts`).
