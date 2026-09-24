# Log export (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Exportação contínua e incremental dos logs de chamadas do OmniRoute para um repositório externo de análises.

A aba Logs do painel mantém o histórico de requisições no SQLite (`call_logs`), limitado por
rotação e retenção. A exportação de logs envia o mesmo conjunto de registros de acordo com um agendamento para que ele possa sobreviver
ao banco de dados local e ser combinado com outros dados. O BigQuery é o primeiro destino; o
pipeline é um registro, portanto outros destinos podem ser adicionados.

---

## 1. Como funciona

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (o conjunto de campos da aba Logs)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Agendamento** — um trabalho cron do `JobRegistry`, `log_export`, com o valor padrão `0 * * * *` (a cada hora,
  UTC). Registrado em `src/lib/initCloudSync.ts`; pode ser substituído por `OMNIROUTE_LOG_EXPORT_CRON`.
  Cada execução processa sequencialmente todos os destinos **habilitados** até esvaziá-los.
- **Cursor** — o `call_logs.rowid` implícito do SQLite, persistido por destino em
  `log_export_destinations.cursor_row_id`. `timestamp` deliberadamente não é usado como cursor: os chamadores
  podem fornecer seus próprios valores, portanto uma requisição lenta pode ser gravada depois de outra mais rápida que começou
  posteriormente, e um cursor de timestamp a ignoraria.
- **Processamento em lotes** — `batch_size` linhas por requisição (padrão: 500), `max_rows_per_run` linhas por execução
  (padrão: 10000), para que um grande acúmulo seja processado ao longo de várias execuções em vez de bloquear uma única.
- **Entrega** — o cursor avança somente depois que `send()` é resolvido. Um lote com falha deixa o
  cursor onde estava, portanto as mesmas linhas são processadas novamente na próxima execução. A garantia é de
  pelo menos uma entrega com desduplicação no destino, e não de exatamente uma entrega: o BigQuery identifica cada
  linha pelo ID do log de chamada, o qual ele respeita com base em melhor esforço dentro da própria janela de desduplicação.
- **Proteção contra sobreposição** — a execução cron e `POST .../run` podem ocorrer simultaneamente. Um destino
  que já esteja sendo processado é ignorado em vez de ser processado duas vezes (`skipped: true` no resultado da execução),
  portanto uma execução concorrente não pode reenviar um lote nem retroceder o cursor.
- **Recuperação após expurgo** — se `cursor_row_id` ficar acima de `MAX(rowid)` (a tabela inteira foi
  expurgada e os rowids foram reiniciados), o executor retrocede para 0 em vez de ficar permanentemente sem detectar novos registros.

### Payloads (prompts e conclusões)

Por padrão, a exportação inclui apenas os campos de resumo exibidos na **lista** de Logs. Ativar
**Exportar prompts e respostas** (`includeBodies`) também envia o que o painel de **detalhes**
de Logs mostra para cada chamada:

| Campo                            | O que contém                                                  |
| -------------------------------- | ------------------------------------------------------------- |
| `request_body` / `response_body` | Os payloads da chamada conforme renderizados pelo painel      |
| `pipeline_route_decision`        | O destino e o modelo escolhidos pelo roteador                 |
| `pipeline_client_request`        | A requisição bruta exatamente como foi enviada pelo cliente   |
| `pipeline_openai_request`        | Após a tradução para o formato OpenAI interno                 |
| `pipeline_provider_request`      | Como efetivamente enviada ao upstream, no dialeto do provedor |
| `pipeline_provider_response`     | A resposta bruta do upstream                                  |
| `pipeline_client_response`       | O que foi retornado ao chamador                               |
| `pipeline_error`                 | Detalhes do erro de pipeline de uma chamada com falha         |
| `bodies_truncated`               | Verdadeiro quando algum campo acima atingiu `maxBodyBytes`    |

Esse é o conteúdo do prompt, portanto fica **desativado por padrão** e é deliberadamente uma escolha por destino.
O que é enviado corresponde ao que o painel mostra, pois ambos leem por meio de `getCallLogById`: os payloads já são
sanitizados para remover PII e têm dados secretos ocultados quando são gravados; além disso, uma chamada feita com uma
chave de API `noLog` não armazena nenhum payload, portanto não há nada a exportar.

Os payloads são lidos por linha a partir do artefato no sistema de arquivos, portanto a hidratação só é executada para destinos
que a solicitaram. Uma linha cujo artefato esteja ausente ou corrompido exporta seu resumo com payloads nulos,
em vez de causar falha no lote e impedir o avanço do cursor.

`maxBodyBytes` (padrão: 262144) limita cada campo. Payloads mais longos são **truncados em vez de
descartados** — um prompt cortado ainda responde à pergunta "o que foi solicitado" — e a linha é sinalizada com
`bodies_truncated`. Deltas transmitidos fragmento por fragmento não são exportados; a resposta montada já está
em `pipeline_provider_response` e `pipeline_client_response`.

---

## 2. Arquivos

| Componente                   | Localização                                  |
| ---------------------------- | -------------------------------------------- |
| Contrato de destino          | `src/lib/logExport/types.ts`                 |
| Registro                     | `src/lib/logExport/registry.ts`              |
| Tratamento de segredos       | `src/lib/logExport/secrets.ts`               |
| Executor (loop do cursor)    | `src/lib/logExport/runner.ts`                |
| Projeção da API              | `src/lib/logExport/presenter.ts`             |
| Destino BigQuery             | `src/lib/logExport/destinations/bigquery.ts` |
| Autenticação de SA do Google | `src/lib/logExport/googleServiceAccount.ts`  |
| Fonte de logs de chamadas    | `src/lib/usage/callLogExportSource.ts`       |
| Persistência                 | `src/lib/db/logExportDestinations.ts`        |
| Tarefa cron                  | `src/lib/jobs/logExportJob.ts`               |
| Camada REST                  | `src/app/api/log-export/`                    |
| Página do painel             | `src/app/(dashboard)/dashboard/log-export/`  |

Esquema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Todas as rotas exigem autenticação de gerenciamento (`requireManagementAuth`). Os segredos nunca são retornados:
um segredo armazenado é retornado como o literal `__stored__`, e enviar esse valor de volta em uma atualização
mantém a credencial armazenada.

Criar ou atualizar um destino cujo tipo declara um segredo **requer
`STORAGE_ENCRYPTION_KEY`**. Sem ela, `encrypt()` é um passthrough silencioso; portanto, a gravação é
recusada com um erro 400, em vez de armazenar uma credencial em texto simples no SQLite (a mesma proteção
aplicada pelo webhook do Telegram).

| Método   | Caminho                                  | Finalidade                                              |
| -------- | ---------------------------------------- | ------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Tipos de destino + lista de campos de configuração      |
| `GET`    | `/api/log-export/destinations`           | Lista destinos (segredos ocultados)                     |
| `POST`   | `/api/log-export/destinations`           | Cria um destino                                         |
| `GET`    | `/api/log-export/destinations/{id}`      | Consulta um destino                                     |
| `PUT`    | `/api/log-export/destinations/{id}`      | Atualiza nome / habilitação / configuração / lotes      |
| `DELETE` | `/api/log-export/destinations/{id}`      | Exclui                                                  |
| `POST`   | `/api/log-export/destinations/{id}/test` | Testa credenciais sem gravar nada                       |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Esvazia agora, pelo mesmo fluxo da execução agendada    |
| `GET`    | `/api/log-export/status`                 | Estado do cron, execuções recentes, backlog por destino |

`GET /api/log-export/types` é o que torna a interface genérica: o formulário do painel é renderizado a partir
dos descritores de campo retornados; portanto, um novo destino não exige alterações na interface.

---

## 4. Destino BigQuery

Chaves de configuração (`type: "bigquery"`):

| Chave                | Observações                                                                   |
| -------------------- | ----------------------------------------------------------------------------- |
| `projectId`          | Projeto do GCP que contém o conjunto de dados                                 |
| `datasetId`          | `[A-Za-z0-9_]+`                                                               |
| `tableId`            | `[A-Za-z0-9_]+`                                                               |
| `location`           | Usada somente quando o conjunto de dados precisa ser criado (padrão `EU`)     |
| `serviceAccountJson` | Chave da conta de serviço. Segredo: criptografada em repouso, nunca retornada |
| `autoCreate`         | Cria o conjunto de dados e a tabela na primeira exportação (padrão `true`)    |

A conta de serviço precisa de `bigquery.tables.updateData` na tabela de destino, além de
`bigquery.datasets.create` / `bigquery.tables.create` quando `autoCreate` está habilitado.

Um lote configurado é uma unidade de **cursor**, não uma unidade HTTP: `send()` o divide em chamadas insertAll
de no máximo 500 linhas, de modo que um `batch_size` grande não ultrapasse o limite de 10 MB por requisição
do BigQuery. Status transitórios (408/429/500/502/503/504) são tentados novamente até três vezes, com backoff
exponencial e reutilizando os mesmos insertIds; falhas de autenticação e de esquema lançam uma exceção na
primeira tentativa, em vez de desperdiçar a execução.

Uma tabela criada há poucos instantes ainda não está visível para o endpoint de streaming, que responde
com 404 por alguns segundos. Esse 404 é tentado novamente, mas **somente quando esta execução criou a tabela** —
uma tabela realmente ausente continua falhando imediatamente. Observe que recriar uma tabela com um nome que
foi excluído recentemente faz o BigQuery recusar inserções por streaming durante vários minutos; essa é uma
característica da operação de excluir e recriar, portanto prefira um novo nome de tabela em vez de remover e
adicionar novamente uma tabela.

**Uma falha parcial chega como HTTP 200 com um `insertErrors[]` não vazio.** Isso é tratado como
falha e lança uma exceção, impedindo que o cursor avance além das linhas que o BigQuery não
aceitou; `tests/unit/log-export-bigquery.test.ts` garante esse comportamento.

O transporte usa REST simples — uma asserção RS256 autoassinada é trocada por um token de acesso em
`https://oauth2.googleapis.com/token`, e depois as linhas são enviadas para `tabledata.insertAll`. Nenhum SDK
do Google é incluído. Os tokens de acesso são armazenados em cache no processo por (conta de serviço, escopo).

A tabela criada contém uma coluna para cada campo da aba Logs, além de `exported_at`, e é estruturada de acordo
com a forma como os logs de chamadas são realmente consultados:

- **Particionada por dia em `timestamp`**, para que uma consulta limitada por data examine apenas esses dias.
- **Clusterizada por `api_key_name`, `provider`, `model`, `status`** (nessa ordem), de modo que filtrar por
  quem executou, para onde foi ou se houve falha elimine blocos dentro de cada partição. O BigQuery
  permite no máximo quatro colunas de clusterização, e a ordem importa: um filtro somente por `api_key_name`
  elimina blocos; um filtro somente por `status` não.
- **Retenção opcional de partições** por meio de `partitionExpirationDays` (0 mantém tudo), aplicada
  quando a tabela é criada.

Ambas as configurações são aplicadas no momento da criação. Uma tabela existente mantém o layout que já possui, portanto
aponte o destino para um novo id de tabela se quiser adotá-las.

`tests/unit/log-export-bigquery.test.ts` garante que o mapeador e o esquema da tabela permaneçam
sincronizados, para que uma nova coluna de log de chamadas não seja descartada silenciosamente durante a exportação.

Os lotes são divididos tanto pela contagem de linhas quanto pelos bytes serializados. Apenas a contagem de linhas não é suficiente
quando os payloads são exportados: 500 linhas contendo prompts podem totalizar dezenas de megabytes, e insertAll
rejeita uma solicitação com mais de 10 MB. Os blocos são fechados ao atingir 500 linhas ou 9 MB, o que ocorrer primeiro.

---

## 5. Adicionando um destino

1. Crie `src/lib/logExport/destinations/<name>.ts` exportando um `LogExportDestinationType`:
   um `configSchema` do Zod, um array descritor `fields` para a interface, `secretFields` e uma
   função `createClient(config)` que retorne `test()` / `prepare()` / `send(records)`.
2. Adicione-o ao array `DESTINATIONS` em `src/lib/logExport/registry.ts`.
3. Escreva testes em `tests/unit/`.

Essa é toda a alteração necessária: a persistência, a tarefa cron, a camada REST, a criptografia de segredos e o
formulário do painel usam o registro.

Duas regras para um novo destino:

- `send()` **deve lançar uma exceção** em caso de falha parcial. Ser resolvido significa que "o destino contém estas linhas",
  e o cursor avança permanentemente para além delas.
- Um destino que aceite uma URL fornecida pelo usuário deve validá-la por meio de
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) antes de realizar a solicitação,
  da mesma forma que os webhooks. O BigQuery não precisa disso: seus hosts são constantes.

---

## 6. Operando o recurso

- **Painel**: Integrações → Exportação de logs. Adicione um destino, execute **Testar** para verificar as credenciais
  sem gravar linhas e, em seguida, habilite-o.
- **Itens pendentes**: cada cartão de destino mostra as linhas pendentes e o cursor; `GET
/api/log-export/status` retorna os mesmos dados, além das últimas 20 execuções da tarefa.
- **Uma falha em um destino não causa falha nos demais** — o resumo da execução registra o status de cada destino
  em `last_status` / `last_error`, e o histórico de execuções da tarefa mantém os dados agregados.
- **Excluir um destino exclui seu cursor.** Adicioná-lo novamente faz com que ele comece pelo log de chamadas retido
  mais antigo, reenviando linhas que o destino talvez já contenha. No BigQuery, o `insertId` por linha
  evita duplicatas apenas dentro da janela de desduplicação do próprio BigQuery; portanto, prefira desabilitar
  um destino em vez de excluí-lo.
