# ADR: Pluggable persistence boundary (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇧🇦 [bs](../../../bs/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Status:** Proposto — requer aprovação dos mantenedores antes do início do trabalho no runtime
- **Issue de acompanhamento:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Escopo:** Somente a arquitetura de persistência; esta decisão não adiciona nem seleciona um banco de dados externo

## Contexto

Atualmente, o OmniRoute disponibiliza funções de persistência orientadas ao domínio em `src/lib/db/`, enquanto a conexão compartilhada retornada por `src/lib/db/core.ts` implementa o contrato síncrono `SqliteAdapter` definido em `src/lib/db/adapters/types.ts`. Esse adaptador oferece suporte a vários runtimes do SQLite, mas sua interface permanece estruturada em torno do SQLite: instruções preparadas síncronas, `pragma`, transações adiadas e imediatas, backup nativo ou por cópia de arquivo, checkpoint e um identificador local do banco de dados.

O fluxo atual de inicialização e recuperação também gerencia o ciclo de vida do arquivo SQLite. `src/lib/db/core.ts` resolve `storage.sqlite`, mantém um adaptador global por processo, executa checkpoints do WAL, preserva tabelas selecionadas durante a recuperação e remove arquivos complementares do SQLite ao recriar um banco de dados. A seleção de driver em `src/lib/db/adapters/driverFactory.ts` escolhe entre os runtimes do SQLite compatíveis; ela não é uma abstração de backend externo.

A evolução do esquema apresenta acoplamento semelhante. `src/lib/db/migrationRunner.ts` aplica arquivos SQL numerados, consulta `sqlite_master` e `PRAGMA table_info`, detecta o suporte opcional ao FTS5 e executa o trabalho de migração em transações do SQLite. Módulos operacionais como `src/lib/db/backup.ts` e `src/lib/db/optimizationSettings.ts` usam diretamente semânticas de backup, `PRAGMA`, WAL, tamanho de página, vacuum automático e `VACUUM`.

Essas são propriedades válidas da implantação com SQLite incorporado. Elas devem continuar disponíveis sem obrigar PostgreSQL ou MySQL a emular uma API do SQLite.

## Decisão

Adotar uma fronteira de persistência em dois níveis para o estado durável portável:

1. **Contratos de repositório de domínio** definem as operações de persistência necessárias ao código de negócio e de roteamento. Os consumidores dependem do comportamento e dos dados do domínio, não de texto SQL, instruções preparadas, arquivos de banco de dados ou objetos de dialeto.
2. **Um contrato interno assíncrono de backend** oferece suporte às implementações dos repositórios com contextos de transação, integridade/prontidão, coordenação de migrações, recursos do backend e erros classificados. A interface TypeScript exata será proposta no primeiro PR de implementação e validada por testes de conformidade; este ADR intencionalmente não cristaliza uma API especulativa.

O SQLite continua sendo a implementação padrão. A cascata existente de drivers SQLite e o `SqliteAdapter` síncrono permanecem por trás da implementação SQLite dos repositórios, enquanto os domínios são migrados em pequenas fatias verticais. Nenhum usuário precisa configurar um serviço externo.

O PostgreSQL é a primeira implementação externa proposta após a fronteira de repositório ser validada com o SQLite. O MySQL virá em seguida como uma implementação equivalente, validada pelo mesmo conjunto de testes de conformidade, em vez de constituir uma segunda bifurcação da lógica de negócio.

## Regras da fronteira

### Interface portável dos repositórios

Um repositório portável pode expor:

- leituras e gravações do domínio;
- operações atômicas explícitas e acesso a repositórios no escopo de transações;
- operações de comparação/atualização ou de concessão quando a semântica de concorrência fizer parte do domínio;
- paginação, ordenação e erros de restrição independentes de backend.

A integridade, a prontidão e a coordenação de migrações do backend pertencem ao contrato interno operacional/de backend, e não aos repositórios individuais de domínio.

Um repositório portável não deve expor:

- `prepare`, `get`, `all`, `run` ou identificadores brutos de drivers;
- `PRAGMA`, modos de checkpoint do WAL, `VACUUM` ou ajuste de página/cache;
- caminhos de arquivos SQLite, arquivos complementares ou backup por cópia de arquivo;
- `lastInsertRowid` como contrato de domínio entre backends;
- sintaxe de FTS5 ou `sqlite-vec`;
- um mecanismo genérico de acesso direto ao dialeto usado pelo código normal de negócio.

### Interface de recursos do backend

O comportamento específico de cada backend permanece explícito e detectável. A manutenção exclusiva do SQLite permanece por trás de sua própria implementação e interface operacional, incluindo:

- seleção do driver em runtime;
- checkpoint do WAL e comportamento de encerramento do SQLite;
- configurações de tamanho de página, tamanho do cache e vacuum automático;
- backup, restauração e recuperação do arquivo de banco de dados;
- introspecção do esquema SQLite;
- integração com FTS5 e `sqlite-vec`.

Um backend externo não precisa imitar esses recursos. Os repositórios devem usar um recurso portável, fornecer uma implementação específica do backend com comportamento documentado ou informar que um recurso não está disponível.

## Modelo de transações e migrações

As APIs dos repositórios definem a operação de negócio atômica; os chamadores não selecionam um modo de transação SQL.
Cada operação deve definir suas garantias de concorrência observáveis: invariantes protegidas, detecção de conflitos, classificação de novas tentativas, expectativas de idempotência e propagação do contexto da transação.
As implementações podem usar diferentes mecanismos de transação e isolamento somente quando essas garantias observáveis permanecerem equivalentes. O SQLite pode continuar usando internamente seu comportamento atual de transações adiadas ou imediatas quando ele atender ao contrato da operação.

Backends externos exigem que a responsabilidade pelas migrações seja explicitamente definida, para que várias réplicas da aplicação não disputem a mesma alteração de esquema. Os históricos de migração dos backends podem compartilhar marcos lógicos, mas não se pressupõe que os arquivos SQL do SQLite sejam portáveis ou reutilizáveis em outro dialeto.

## Semântica de conformidade entre backends

Os testes de conformidade devem abranger o comportamento, não apenas as assinaturas dos métodos dos repositórios. Cada domínio migrado deve definir e verificar:

- fuso horário, precisão e serialização de timestamps;
- ordenação de `NULL`, regras de ordenação e expectativas quanto à diferenciação entre maiúsculas e minúsculas;
- representação de JSON e comportamento de comparação;
- precisão de números inteiros, decimais e valores monetários;
- ordenação estável e critérios determinísticos de desempate para paginação;
- geração de IDs sem depender de IDs de linha do SQLite;
- classificação de violações de unicidade e de chave estrangeira;
- comportamento das linhas afetadas para operações sem efeito, de comparação/atualização e de exclusão;
- resultados de gravações concorrentes, conflitos que permitem nova tentativa e novas tentativas idempotentes.

Se um domínio não puder declarar semânticas observáveis equivalentes, ele ainda não é portável e deve permanecer específico do backend até que esse contrato seja definido.

## Requisitos de compatibilidade

Qualquer implementação que siga este ADR deve preservar estas propriedades:

- O SQLite continua sendo o padrão que não requer configuração.
- Os arquivos e o histórico de migrações existentes do SQLite continuam legíveis.
- Os fallbacks para SQLite do npm, Electron, Docker e de ambientes de execução restritos mantêm seu fluxo de inicialização atual.
- As credenciais armazenadas dos provedores continuam usando o comportamento de criptografia existente da aplicação.
- Uma migração de repositório não altera silenciosamente a semântica de roteamento, cota, chave de API ou auditoria.
- O comportamento de backup e recuperação é documentado por backend, em vez de ser apresentado como universal.
- Uma instalação limpa que use somente SQLite não carrega nem exige um driver de banco de dados externo.

## Sequência de entrega

1. Publicar um inventário reproduzível de acoplamentos ao SQLite como um artefato de revisão separado.
2. Introduzir os primeiros contratos de repositório de domínio e os testes de conformidade.
3. Adaptar a implementação existente do SQLite por trás desses contratos sem alterar os padrões.
4. Sujeito à aprovação dos mantenedores, adicionar o PostgreSQL como a primeira implementação externa para uma parte delimitada do plano de controle.
5. Estender o estado compartilhado somente após a existência de testes de gravação concorrente e de responsabilidade pelas migrações.
6. Adicionar um processo offline e validado de migração do SQLite para um backend externo antes de divulgar a alternância entre bancos de dados.
7. Adicionar o MySQL com base nos contratos comprovados de repositório e backend.

Cada etapa de execução corresponde a um PR separado e passível de revisão. Uma etapa posterior não deve ser usada para justificar a integração de uma abstração ainda não comprovada em uma etapa anterior.

## Primeira fatia de implementação

A primeira fatia de runtime deve ser selecionada após a revisão do inventário de acoplamentos. Conexões com
provedores, chaves de API, combos e configurações de roteamento são candidatos porque suas tabelas base
estão visíveis em `src/lib/db/core.ts`, mas este ADR não aprova uma lista de tabelas nem um PR de migração.
A fatia deve incluir:

- testes de preservação de comportamento do SQLite;
- testes de conformidade dos repositórios;
- limites explícitos de transação;
- verificação de criptografia e ocultação das credenciais armazenadas;
- nenhuma alteração na configuração padrão de inicialização.

## Alternativas consideradas

### Adicionar PostgreSQL sob o `SqliteAdapter`

Rejeitada. O `SqliteAdapter` é uma camada de compatibilidade para runtimes SQLite e expõe operações
específicas do SQLite. Emular essa superfície faria com que pressupostos síncronos e específicos do dialeto
vazassem para um novo backend.

### Expor uma API genérica de consulta/execução a todos os domínios

Rejeitada como limite principal. Isso centralizaria o gerenciamento de conexões, mas deixaria o dialeto SQL,
as transações e o acoplamento às tabelas nos módulos de negócio. Uma primitiva de backend de baixo nível
pode existir dentro das implementações de repositório, mas não como a API de persistência voltada à aplicação.

### Reescrever toda a persistência antes de validar uma fatia

Rejeitada. A superfície atual de persistência é ampla e inclui ciclo de vida de arquivos, recuperação, pesquisa
e configurações operacionais. Fatias verticais fornecem limites revisáveis de comportamento e reversão.

### Substituir o SQLite como padrão

Rejeitada. Implantações embarcadas e para desktop dependem do modelo atual de inicialização sem serviços
externos. Um backend externo é opcional.

### Usar o Redis como autoridade durável

Rejeitada. O Redis pode oferecer suporte a coordenação explicitamente efêmera, cache ou contadores, mas não
substitui o contrato de repositório durável descrito aqui.

## Consequências

### Positivas

- O código de negócio ganha um ponto de integração de persistência estável e independente do dialeto do banco de dados.
- O comportamento do SQLite é testado antes que um backend externo defina a abstração.
- PostgreSQL e MySQL compartilham contratos e testes em vez de duplicar a lógica de domínio.
- Os recursos exclusivos do SQLite permanecem de primeira classe, em vez de se tornarem camadas de compatibilidade com abstrações vazando.
- O comportamento de migração e transação com múltiplas réplicas torna-se uma preocupação explícita de projeto.

### Custos e riscos

- A extração de repositórios exige a migração incremental dos pontos de chamada.
- Limites assíncronos podem se propagar pelo código de serviço atualmente síncrono.
- A semântica entre backends exige testes de conformidade que vão além da compatibilidade da sintaxe SQL.
- Backup, pesquisa, armazenamento vetorial e manutenção permanecem específicos de cada capacidade.
- A execução de mais de uma implementação de persistência aumenta o custo de CI e de suporte operacional.

## Não objetivos

Este ADR não:

- adiciona dependência de banco de dados, variável de ambiente, esquema ou migração;
- altera o singleton ativo do SQLite nem a cascata de drivers;
- promete suporte a PostgreSQL ou MySQL em uma versão específica;
- torna FTS5, `sqlite-vec`, arquivos de backup ou a manutenção do SQLite portáveis;
- define a prontidão para active-active antes que existam testes de estado compartilhado e coordenação;
- aprova uma reescrita de uma só vez de `src/lib/db/`.

## Questões em aberto para aprovação do mantenedor

1. O limite entre o repositório e o backend assíncrono interno é a direção preferida ou a persistência
   externa deve ficar atrás de um serviço de plano de controle separado?
2. O PostgreSQL é aceitável como a primeira implementação externa após a conformidade com o SQLite?
3. Qual domínio deve ser a primeira fatia delimitada do repositório?
4. Qual estado deve ser compartilhado no primeiro marco com múltiplas réplicas e qual deve permanecer local ao nó?
5. Qual janela de compatibilidade é necessária para uma migração de repositório interrompida ou revertida?

Até que essas questões sejam resolvidas, este documento é uma proposta e não implica nenhuma refatoração em tempo de execução.
