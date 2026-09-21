# ADR: Pluggable persistence boundary (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Estado:** Proposto — requer a aprovação de um responsável pela manutenção antes do início do trabalho de runtime
- **Issue de acompanhamento:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Âmbito:** Apenas a arquitetura de persistência; esta decisão não adiciona nem seleciona uma base de dados externa

## Contexto

Atualmente, o OmniRoute apresenta funções de persistência orientadas ao domínio a partir de `src/lib/db/`, enquanto a ligação partilhada devolvida por `src/lib/db/core.ts` implementa o contrato síncrono `SqliteAdapter` em `src/lib/db/adapters/types.ts`. Esse adaptador suporta vários runtimes de SQLite, mas a sua interface continua a seguir o modelo do SQLite: instruções preparadas síncronas, `pragma`, transações diferidas e imediatas, cópias de segurança nativas/por cópia de ficheiros, checkpoint e um identificador local da base de dados.

O atual percurso de inicialização e recuperação também gere o ciclo de vida do ficheiro SQLite. `src/lib/db/core.ts` resolve `storage.sqlite`, mantém um adaptador global por processo, cria checkpoints da WAL, preserva tabelas selecionadas durante a recuperação e remove os ficheiros auxiliares do SQLite ao reconstruir uma base de dados. A seleção do driver em `src/lib/db/adapters/driverFactory.ts` escolhe entre os runtimes de SQLite suportados; não constitui uma abstração de backend externo.

A evolução do esquema encontra-se igualmente acoplada. `src/lib/db/migrationRunner.ts` aplica ficheiros SQL numerados, consulta `sqlite_master` e `PRAGMA table_info`, deteta o suporte opcional de FTS5 e executa o trabalho de migração em transações SQLite. Os módulos operacionais, como `src/lib/db/backup.ts` e `src/lib/db/optimizationSettings.ts`, utilizam diretamente semânticas de cópia de segurança, `PRAGMA`, WAL, tamanho de página, auto-vacuum e `VACUUM`.

Estas são propriedades válidas da implementação SQLite incorporada. Devem continuar disponíveis sem obrigar o PostgreSQL ou o MySQL a emular uma API SQLite.

## Decisão

Adotar uma fronteira de persistência com dois níveis para o estado duradouro portável:

1. **Contratos de repositório de domínio** definem as operações de persistência necessárias para o código de negócio e de encaminhamento. Os consumidores dependem do comportamento e dos dados do domínio, e não de texto SQL, instruções preparadas, ficheiros de bases de dados ou objetos de dialeto.
2. **Um contrato interno assíncrono de backend** suporta implementações de repositórios com contextos de transação, estado de funcionamento/disponibilidade, coordenação de migrações, capacidades do backend e erros classificados. A interface exata em TypeScript será proposta com o primeiro PR de implementação e validada por testes de conformidade; este ADR não fixa intencionalmente uma API especulativa.

O SQLite continua a ser a implementação predefinida. A atual cadeia de seleção de drivers SQLite e o `SqliteAdapter` síncrono permanecem atrás da implementação de repositório SQLite, enquanto os domínios são migrados em pequenas partes verticais. Nenhum utilizador é obrigado a configurar um serviço externo.

O PostgreSQL é a primeira implementação externa proposta depois de a fronteira do repositório ser validada com o SQLite. O MySQL segue-se como uma implementação equivalente, validada pela mesma suite de conformidade, em vez de constituir uma segunda bifurcação da lógica de negócio.

## Regras da fronteira

### Interface de repositório portável

Um repositório portável pode expor:

- leituras e escritas de domínio;
- operações atómicas explícitas e acesso ao repositório no âmbito de uma transação;
- operações de comparação/atualização ou de concessão temporária quando a semântica de concorrência fizer parte do domínio;
- paginação, ordenação e erros de restrições independentes do backend.

O estado de funcionamento, a disponibilidade e a coordenação de migrações do backend pertencem ao contrato interno de backend/operações, e não aos repositórios de domínio individuais.

Um repositório portável não pode expor:

- `prepare`, `get`, `all`, `run` ou identificadores de drivers em bruto;
- `PRAGMA`, modos de checkpoint da WAL, `VACUUM` ou ajuste de páginas/cache;
- caminhos de ficheiros SQLite, ficheiros auxiliares ou cópias de segurança por cópia de ficheiros;
- `lastInsertRowid` como contrato de domínio comum a vários backends;
- sintaxe de FTS5 ou `sqlite-vec`;
- um mecanismo genérico de escape para dialetos utilizado pelo código de negócio normal.

### Interface de capacidades do backend

O comportamento específico do backend permanece explícito e detetável. A manutenção exclusiva do SQLite permanece encapsulada na respetiva implementação e interface operacional, incluindo:

- seleção do driver de runtime;
- checkpoint da WAL e comportamento de encerramento do SQLite;
- definições de tamanho de página, tamanho da cache e auto-vacuum;
- cópia de segurança, restauro e recuperação do ficheiro da base de dados;
- introspeção do esquema SQLite;
- integração com FTS5 e `sqlite-vec`.

Um backend externo não é obrigado a imitar estas funcionalidades. Os repositórios devem utilizar uma capacidade portável, fornecer uma implementação específica do backend com comportamento documentado ou indicar que uma capacidade não está disponível.

## Modelo de transações e migrações

As APIs dos repositórios definem a operação de negócio atómica; os chamadores não selecionam um modo de transação SQL.
Cada operação deve definir as suas garantias de concorrência observáveis: invariantes protegidas, deteção de
conflitos, classificação de novas tentativas, expectativas de idempotência e propagação do contexto da transação.
As implementações podem utilizar mecanismos de transação e isolamento diferentes apenas quando essas garantias
observáveis permanecerem equivalentes. O SQLite pode continuar a utilizar internamente o seu comportamento atual
de transações diferidas ou imediatas quando este satisfizer o contrato da operação.

Os backends externos exigem a atribuição explícita da responsabilidade pelas migrações, para que várias réplicas
da aplicação não possam executar em simultâneo a mesma alteração ao esquema. Os históricos de migração dos backends
podem partilhar marcos lógicos, mas não se pressupõe que os ficheiros SQL do SQLite sejam portáveis ou reutilizáveis
noutro dialeto.

## Semântica de conformidade entre backends

Os testes de conformidade devem abranger o comportamento, não apenas as assinaturas dos métodos dos repositórios. Cada domínio
migrado deve definir e verificar:

- o fuso horário, a precisão e a serialização dos carimbos de data/hora;
- as expectativas de ordenação de `NULL`, de colação e de sensibilidade a maiúsculas e minúsculas;
- a representação de JSON e o comportamento de comparação;
- a precisão de números inteiros, decimais e valores monetários;
- a ordenação estável e os critérios de desempate determinísticos para a paginação;
- a geração de IDs sem depender dos IDs de linha do SQLite;
- a classificação de violações de exclusividade e de chaves estrangeiras;
- o comportamento das linhas afetadas para operações sem efeito, de comparação/atualização e de eliminação;
- os resultados de escritas simultâneas, os conflitos que permitem novas tentativas e as novas tentativas idempotentes.

Se um domínio não conseguir definir uma semântica observável equivalente, ainda não é portável e deve permanecer
específico do backend até que esse contrato seja concebido.

## Requisitos de compatibilidade

Qualquer implementação que siga este ADR deve preservar estas propriedades:

- O SQLite continua a ser a predefinição sem necessidade de configuração.
- Os ficheiros SQLite e o histórico de migrações existentes continuam legíveis.
- Os mecanismosos de recurso para SQLite do npm, Electron, Docker e ambientes de execução restritos mantêm o seu processo de arranque atual.
- As credenciais de fornecedores armazenadas continuam a utilizar o comportamento de encriptação existente da aplicação.
- Uma migração de repositório não altera silenciosamente a semântica de encaminhamento, quotas, chaves de API ou auditoria.
- O comportamento de cópia de segurança e recuperação é documentado por backend, em vez de ser apresentado como universal.
- Uma instalação limpa apenas com SQLite não carrega nem requer um controlador de base de dados externo.

## Sequência de entrega

1. Publicar um inventário reproduzível do acoplamento ao SQLite como artefacto de revisão separado.
2. Introduzir os primeiros contratos de repositório de domínio e testes de conformidade.
3. Adaptar a implementação existente do SQLite a esses contratos sem alterar as predefinições.
4. Mediante aprovação dos responsáveis pela manutenção, adicionar o PostgreSQL como primeira implementação externa para uma
   área delimitada do plano de controlo.
5. Alargar o estado partilhado apenas depois de existirem testes de escrita simultânea e de responsabilidade pelas migrações.
6. Adicionar um processo offline e validado de migração do SQLite para um backend externo antes de anunciar a possibilidade de mudança de base de dados.
7. Adicionar o MySQL com base nos contratos comprovados de repositório e backend.

Cada etapa de execução corresponde a um PR separado e passível de revisão. Uma etapa posterior não deve ser utilizada para justificar a integração de uma
abstração não comprovada numa etapa anterior.

## Primeira etapa de implementação

A primeira etapa de execução deve ser selecionada após a revisão do inventário de acoplamentos. As ligações a fornecedores, as chaves de API, as combinações e a configuração de encaminhamento são candidatas, porque as respetivas tabelas de base estão visíveis em `src/lib/db/core.ts`, mas este ADR não aprova uma lista de tabelas nem um PR de migração.
A etapa deve incluir:

- testes de preservação do comportamento do SQLite;
- testes de conformidade dos repositórios;
- limites de transação explícitos;
- verificação da encriptação e ocultação das credenciais armazenadas;
- nenhuma alteração à configuração predefinida de arranque.

## Alternativas consideradas

### Adicionar PostgreSQL sob `SqliteAdapter`

Rejeitado. `SqliteAdapter` é uma camada de compatibilidade para ambientes de execução SQLite e expõe operações específicas do SQLite. A emulação dessa interface introduziria pressupostos síncronos e específicos do dialeto num novo backend.

### Expor uma API genérica de consulta/execução a todos os domínios

Rejeitado como limite principal. Centralizaria a gestão de ligações, mas manteria o acoplamento ao dialeto SQL, às transações e às tabelas nos módulos de negócio. Pode existir uma primitiva de backend de baixo nível dentro das implementações dos repositórios, mas não como API de persistência destinada à aplicação.

### Reescrever toda a persistência antes de validar uma etapa

Rejeitado. A atual superfície de persistência é ampla e inclui o ciclo de vida dos ficheiros, a recuperação, a pesquisa e as definições operacionais. As etapas verticais proporcionam limites de comportamento e reversão passíveis de revisão.

### Substituir o SQLite como predefinição

Rejeitado. As implementações incorporadas e para computadores dependem do atual modelo de arranque sem serviços. Um backend externo é opcional.

### Utilizar o Redis como autoridade duradoura

Rejeitado. O Redis pode suportar coordenação explicitamente efémera, cache ou contadores, mas não substitui o contrato de repositório duradouro aqui descrito.

## Consequências

### Positivas

- O código de negócio obtém um ponto de abstração de persistência estável e independente do dialeto da base de dados.
- O comportamento do SQLite é testado antes de um backend externo definir a abstração.
- O PostgreSQL e o MySQL partilham contratos e testes, em vez de duplicarem a lógica de domínio.
- As capacidades exclusivas do SQLite permanecem funcionalidades de primeira classe, em vez de se tornarem camadas de compatibilidade com fugas de abstração.
- O comportamento das migrações e transações com múltiplas réplicas torna-se uma preocupação de conceção explícita.

### Custos e riscos

- A extração dos repositórios exige uma migração incremental dos pontos de chamada.
- Os limites assíncronos podem propagar-se pelo código de serviço atualmente síncrono.
- A semântica entre diferentes backends exige testes de conformidade para além da compatibilidade da sintaxe SQL.
- As cópias de segurança, a pesquisa, o armazenamento vetorial e a manutenção continuam a depender de capacidades específicas.
- A execução de mais do que uma implementação de persistência aumenta o custo de CI e de suporte operacional.

## Não objetivos

Este ADR não:

- adiciona uma dependência de base de dados, variável de ambiente, esquema ou migração;
- altera o singleton SQLite ativo nem a sequência de fallback dos controladores;
- garante suporte para PostgreSQL ou MySQL numa versão específica;
- torna portáveis o FTS5, o `sqlite-vec`, os ficheiros de cópia de segurança ou a manutenção do SQLite;
- define a preparação para um modelo ativo-ativo antes de existirem testes de estado partilhado e de coordenação;
- aprova uma reescrita integral e única de `src/lib/db/`.

## Questões em aberto para aprovação dos responsáveis pela manutenção

1. O repositório com uma fronteira interna assíncrona para o backend é a abordagem preferida, ou deverá
   a persistência externa ficar por trás de um serviço de plano de controlo separado?
2. O PostgreSQL é aceitável como primeira implementação externa após a conformidade com o SQLite?
3. Que domínio deverá constituir a primeira unidade delimitada do repositório?
4. Que estado deverá ser partilhado no primeiro marco de múltiplas réplicas e qual permanecerá local ao nó?
5. Que janela de compatibilidade é necessária para uma migração do repositório interrompida ou revertida?

Até estas questões serem resolvidas, este documento é uma proposta e não implica qualquer refatorização em tempo de execução.
