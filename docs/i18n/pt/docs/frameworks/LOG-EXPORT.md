# Log export (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Exportação contínua e incremental dos registos de chamadas do OmniRoute para um repositório de análise externo.

O separador Logs do painel mantém o histórico de pedidos em SQLite (`call_logs`), que é limitado pela
rotação e retenção. A exportação de registos envia periodicamente o mesmo conjunto de registos para que possa sobreviver
à base de dados local e ser combinado com outros dados. O BigQuery é o primeiro destino; o
pipeline é um registo, pelo que é possível adicionar mais destinos.

---

## 1. Como funciona

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (o conjunto de campos do separador Logs)
      → cliente de destino.send(lote)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Agendamento** — uma tarefa cron do `JobRegistry`, `log_export`, com a predefinição `0 * * * *` (de hora a hora,
  UTC). Registada em `src/lib/initCloudSync.ts`; pode ser substituída através de `OMNIROUTE_LOG_EXPORT_CRON`.
  Cada execução processa sequencialmente todos os destinos **ativados** até os esvaziar.
- **Cursor** — o `call_logs.rowid` implícito do SQLite, persistido por destino em
  `log_export_destinations.cursor_row_id`. O `timestamp` não é deliberadamente utilizado como cursor: os autores das chamadas
  podem fornecer o seu próprio valor, pelo que um pedido lento pode ser gravado depois de um pedido mais rápido iniciado
  posteriormente, e um cursor baseado no carimbo de data/hora iria ignorá-lo.
- **Processamento em lotes** — `batch_size` linhas por pedido (predefinição: 500), `max_rows_per_run` linhas por execução
  (predefinição: 10000), para que um grande volume pendente seja processado ao longo de várias execuções em vez de bloquear uma só.
- **Entrega** — o cursor só avança depois de `send()` ser resolvido. Um lote que falhe deixa o
  cursor onde estava, pelo que é efetuada uma nova tentativa com as mesmas linhas na execução seguinte. A garantia é
  de, pelo menos, uma entrega, juntamente com a desduplicação no destino, e não uma entrega verdadeiramente única: o BigQuery identifica cada
  linha pelo ID do registo de chamada, que respeita segundo o princípio de melhor esforço dentro da sua própria janela de desduplicação.
- **Proteção contra sobreposição** — a execução cron e `POST .../run` podem ocorrer em simultâneo. Um destino
  que já esteja a ser processado é ignorado em vez de ser processado duas vezes (`skipped: true` no resultado da execução),
  para que uma execução simultânea não possa reenviar um lote nem recuar o cursor.
- **Recuperação após limpeza** — se `cursor_row_id` ficar acima de `MAX(rowid)` (a tabela inteira foi
  limpa e os rowids foram reiniciados), o executor repõe o cursor em 0, em vez de deixar de encontrar permanentemente novos registos.

### Payloads (prompts e conclusões)

Por predefinição, a exportação inclui apenas os campos de resumo apresentados na **lista** de Logs. Ativar
**Exportar prompts e respostas** (`includeBodies`) envia adicionalmente o que o painel de **detalhes**
de Logs apresenta para cada chamada:

| Campo                            | Conteúdo                                                               |
| -------------------------------- | ---------------------------------------------------------------------- |
| `request_body` / `response_body` | Os payloads da chamada tal como são apresentados pelo painel           |
| `pipeline_route_decision`        | O destino e o modelo escolhidos pelo router                            |
| `pipeline_client_request`        | O pedido em bruto, exatamente como foi enviado pelo cliente            |
| `pipeline_openai_request`        | Após a tradução para o formato OpenAI interno                          |
| `pipeline_provider_request`      | Tal como foi efetivamente enviado a montante, no dialeto do fornecedor |
| `pipeline_provider_response`     | A resposta em bruto recebida a montante                                |
| `pipeline_client_response`       | O que foi devolvido ao autor da chamada                                |
| `pipeline_error`                 | Detalhes do erro ao nível do pipeline para uma chamada falhada         |
| `bodies_truncated`               | Verdadeiro quando qualquer campo acima atingiu `maxBodyBytes`          |

Isto constitui conteúdo de prompts, pelo que está **desativado por predefinição** e é deliberadamente uma opção por destino.
O que é enviado corresponde ao que o painel apresenta, porque ambos leem através de `getCallLogById`: os payloads são
previamente higienizados para remover PII e os segredos são ocultados quando são gravados, e uma chamada efetuada com uma
chave de API `noLog` não armazena qualquer payload, pelo que não existe nada para exportar.

Os payloads são lidos por linha a partir do artefacto no sistema de ficheiros, pelo que a hidratação só é executada para os destinos
que a solicitaram. Uma linha cujo artefacto esteja em falta ou corrompido exporta o respetivo resumo com payloads
nulos, em vez de causar a falha do lote e deixar o cursor bloqueado.

`maxBodyBytes` (predefinição: 262144) limita cada campo. Os payloads mais longos são **truncados em vez de
descartados** — um prompt cortado continua a responder a «o que foi pedido» — e a linha é assinalada com
`bodies_truncated`. Os deltas transmitidos fragmento a fragmento não são exportados; a resposta montada já se encontra em
`pipeline_provider_response` e `pipeline_client_response`.

---

## 2. Ficheiros

| Componente                      | Localização                                  |
| ------------------------------- | -------------------------------------------- |
| Contrato de destino             | `src/lib/logExport/types.ts`                 |
| Registo                         | `src/lib/logExport/registry.ts`              |
| Gestão de segredos              | `src/lib/logExport/secrets.ts`               |
| Executor (ciclo do cursor)      | `src/lib/logExport/runner.ts`                |
| Projeção da API                 | `src/lib/logExport/presenter.ts`             |
| Destino BigQuery                | `src/lib/logExport/destinations/bigquery.ts` |
| Autenticação de SA do Google    | `src/lib/logExport/googleServiceAccount.ts`  |
| Origem dos registos de chamadas | `src/lib/usage/callLogExportSource.ts`       |
| Persistência                    | `src/lib/db/logExportDestinations.ts`        |
| Tarefa cron                     | `src/lib/jobs/logExportJob.ts`               |
| Camada REST                     | `src/app/api/log-export/`                    |
| Página do painel                | `src/app/(dashboard)/dashboard/log-export/`  |

Esquema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Todas as rotas são autenticadas ao nível da gestão (`requireManagementAuth`). Os segredos nunca são devolvidos:
um segredo armazenado é devolvido como o literal `__stored__`, e enviar novamente esse valor numa atualização
mantém a credencial armazenada.

Criar ou atualizar um destino cujo tipo declare um segredo **requer
`STORAGE_ENCRYPTION_KEY`**. Sem esta variável, `encrypt()` faz silenciosamente uma passagem direta, pelo que a escrita é
recusada com um 400, em vez de colocar uma credencial no SQLite em texto simples (a mesma proteção aplicada pelo
webhook do Telegram).

| Método   | Caminho                                  | Finalidade                                                                  |
| -------- | ---------------------------------------- | --------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Tipos de destino + respetiva lista de campos de configuração                |
| `GET`    | `/api/log-export/destinations`           | Listar destinos (segredos ocultados)                                        |
| `POST`   | `/api/log-export/destinations`           | Criar um destino                                                            |
| `GET`    | `/api/log-export/destinations/{id}`      | Ler um destino                                                              |
| `PUT`    | `/api/log-export/destinations/{id}`      | Atualizar nome / estado de ativação / configuração / processamento em lotes |
| `DELETE` | `/api/log-export/destinations/{id}`      | Eliminar                                                                    |
| `POST`   | `/api/log-export/destinations/{id}/test` | Testar credenciais sem escrever nada                                        |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Escoar agora, pelo mesmo fluxo da execução agendada                         |
| `GET`    | `/api/log-export/status`                 | Estado do cron, execuções recentes e dados pendentes por destino            |

`GET /api/log-export/types` é o que torna a IU genérica: o formulário do painel é composto a partir
dos descritores de campos devolvidos, pelo que um novo destino não requer alterações na IU.

---

## 4. Destino BigQuery

Chaves de configuração (`type: "bigquery"`):

| Chave                | Notas                                                                               |
| -------------------- | ----------------------------------------------------------------------------------- |
| `projectId`          | Projeto GCP que contém o conjunto de dados                                          |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                     |
| `tableId`            | `[A-Za-z0-9_]+`                                                                     |
| `location`           | Utilizada apenas quando é necessário criar o conjunto de dados (predefinição: `EU`) |
| `serviceAccountJson` | Chave da conta de serviço. Segredo: cifrado em repouso, nunca devolvido             |
| `autoCreate`         | Criar o conjunto de dados e a tabela na primeira exportação (predefinição: `true`)  |

A conta de serviço necessita de `bigquery.tables.updateData` na tabela de destino, além de
`bigquery.datasets.create` / `bigquery.tables.create` quando `autoCreate` está ativo.

Um lote configurado é uma unidade do **cursor**, não de HTTP: `send()` divide-o em chamadas insertAll
com um máximo de 500 linhas, pelo que um `batch_size` elevado não ultrapassa o limite de 10 MB por pedido do BigQuery.
Os estados transitórios (408/429/500/502/503/504) são repetidos até três vezes com espera
exponencial, reutilizando os mesmos insertIds; as falhas de autenticação e de esquema lançam um erro na primeira tentativa,
em vez de desperdiçarem a execução.

Uma tabela criada há instantes ainda não está visível para o endpoint de streaming, que responde
com 404 durante alguns segundos. Esse 404 é repetido, mas **apenas quando esta execução criou a tabela** —
uma tabela efetivamente inexistente continua a falhar de imediato. Tenha em atenção que recriar uma tabela com um nome que
foi eliminado recentemente faz com que o BigQuery recuse inserções por streaming durante vários minutos; esta é uma
característica da operação de eliminar e recriar, pelo que deve preferir um novo nome de tabela em vez de eliminar e voltar a adicionar uma.

**Uma falha parcial chega como HTTP 200 com um `insertErrors[]` não vazio.** Isto é tratado como
uma falha e lança um erro, impedindo o cursor de avançar para além das linhas que o BigQuery nunca
aceitou; `tests/unit/log-export-bigquery.test.ts` fixa este comportamento.

O transporte usa REST simples — uma asserção RS256 autoassinada é trocada por um token de acesso em
`https://oauth2.googleapis.com/token` e, em seguida, as linhas são enviadas para `tabledata.insertAll`. Não é
incluído qualquer SDK da Google. Os tokens de acesso são mantidos em cache no processo por (conta de serviço, âmbito).

A tabela criada contém uma coluna por campo do separador Logs, além de `exported_at`, e está estruturada de acordo com
a forma como os registos de chamadas são efetivamente consultados:

- **Particionada por dia em `timestamp`**, para que uma consulta limitada por data analise apenas esses dias.
- **Agrupada por `api_key_name`, `provider`, `model`, `status`** (por esta ordem), para que a filtragem por
  quem a executou, para onde foi enviada ou se falhou elimine blocos dentro de cada partição. O BigQuery
  permite, no máximo, quatro colunas de agrupamento, e a ordem é importante: um filtro apenas por `api_key_name`
  elimina blocos; um filtro apenas por `status` não.
- **Retenção opcional de partições** através de `partitionExpirationDays` (0 mantém tudo), aplicada
  quando a tabela é criada.

Ambas as definições são aplicadas no momento da criação. Uma tabela existente mantém o esquema que já possui, por isso
aponte o destino para um novo id de tabela se pretender adotá-las.

`tests/unit/log-export-bigquery.test.ts` garante que o mapeador e o esquema da tabela permanecem
sincronizados, para que uma nova coluna do registo de chamadas não possa ser silenciosamente descartada durante a exportação.

Os lotes são divididos em blocos com base **tanto** no número de linhas como nos bytes serializados. O número de linhas, por si só, não é suficiente
quando os payloads são exportados: 500 linhas com prompts podem ocupar dezenas de megabytes, e insertAll
rejeita pedidos com mais de 10 MB. Os blocos são fechados ao atingirem 500 linhas ou 9 MB, consoante o que ocorrer primeiro.

---

## 5. Adicionar um destino

1. Crie `src/lib/logExport/destinations/<name>.ts` que exporte um `LogExportDestinationType`:
   um `configSchema` do Zod, um array de descritores `fields` para a IU, `secretFields` e uma
   função `createClient(config)` que devolva `test()` / `prepare()` / `send(records)`.
2. Adicione-o ao array `DESTINATIONS` em `src/lib/logExport/registry.ts`.
3. Escreva testes em `tests/unit/`.

Essa é toda a alteração necessária: a persistência, a tarefa cron, a camada REST, a encriptação de segredos e o
formulário do painel utilizam o registo.

Duas regras para um novo destino:

- `send()` **tem de lançar uma exceção** em caso de falha parcial. A resolução significa «o destino contém estas linhas»,
  e o cursor avança definitivamente para além delas.
- Um destino que aceite um URL fornecido pelo utilizador tem de o validar através de
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) antes de efetuar o pedido,
  da mesma forma que os webhooks. O BigQuery não necessita desta validação: os respetivos anfitriões são constantes.

---

## 6. Operação

- **Painel**: Integrações → Exportação de registos. Adicione um destino, execute **Testar** para verificar as credenciais
  sem escrever linhas e, em seguida, ative-o.
- **Dados pendentes**: cada cartão de destino apresenta as linhas pendentes e o cursor; `GET
/api/log-export/status` devolve os mesmos valores, juntamente com as últimas 20 execuções da tarefa.
- **Uma falha num destino não provoca falhas nos restantes** — o resumo da execução regista o estado de cada destino
  em `last_status` / `last_error`, e o histórico de execuções da tarefa mantém os dados agregados.
- **Eliminar um destino elimina o respetivo cursor.** Ao voltar a adicioná-lo, o processamento começa no registo de chamadas
  retido mais antigo, o que reenvia linhas que o destino poderá já conter. No BigQuery, o `insertId` de cada linha
  apenas evita essa duplicação dentro da janela de desduplicação do próprio BigQuery, pelo que é preferível desativar
  um destino em vez de o eliminar.
