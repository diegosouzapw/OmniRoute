# Radar Free-Model Catalog (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Fonte fidedigna:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Última atualização:** 2026-09-01 — v3.8.51
> **Limites da evidência do serviço alojado:** as regras do lado do servidor aqui descritas foram verificadas em
> 2026-09-01 no servidor Radar intencionalmente privado, na revisão exata
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`. Essa implementação não é distribuída neste
> repositório OSS; a disponibilidade do serviço alojado continua a ser um estado operacional distinto.

O Radar é um **complemento opcional** que sobrepõe um catálogo de modelos gratuitos
assinado e cuidadosamente atualizado à linha de base da versão (`FREE_MODEL_BUDGETS` em
`open-sse/config/freeModelCatalog.data.ts`). Existe porque o panorama do escalão gratuito muda
mais rapidamente do que a cadência de lançamentos — os fornecedores adicionam, reduzem ou descontinuam quotas gratuitas entre
lançamentos, e o catálogo de base só pode ser atualizado quando é disponibilizada uma nova versão.

**Nada do que é gratuito hoje deixa de o ser devido ao feed remoto.** O Radar nunca
coloca uma entrada de base atrás de uma subscrição paga; apenas atualiza os campos de limites/estado no momento da leitura e pode
acrescentar modelos gratuitos recém-descobertos entre lançamentos. Um operador pode continuar a ocultar um
modelo localmente e pode restaurá-lo a partir do mesmo painel. O próprio catálogo de base
nunca é alterado no disco — consulte
[Regras de combinação da sobreposição no momento da leitura](#read-time-overlay-merge-rules) abaixo.

---

## Estado de disponibilização na v3.8.51

O estado seguinte distingue o que esta versão OSS implementa dos fluxos de trabalho
posteriores do Radar. Trata-se de um estado ao nível do código, não de uma promessa de que uma determinada implementação alojada
ou integração externa esteja atualmente disponível.

| Área                                        | Estado nesta versão                                                                                                                                                                                                                                                                                       |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cliente de catálogo assinado                | Implementado sob `RADAR_ENABLED`, com consentimento separado, verificação Ed25519, definições/cache locais encriptadas, substituições persistentes de apresentação/ativação, marcadores de eliminação reversíveis, agendador e painel.                                                                    |
| Ativação de contribuidores                  | O painel liga ao fluxo de reivindicação do GitHub alojado no servidor e aceita uma chave `omr_…` existente. A elegibilidade dos contribuidores é determinada pelo serviço privado; o cliente OSS não contém qualquer token do GitHub nem lógica de emissão.                                               |
| Ativação por chave de apoiante              | Implementada. A chave não processada é validada, encriptada em repouso, mascarada nas leituras e enviada apenas pela sincronização do lado do servidor. Alterar ou limpar a chave invalida as quatro caches de feeds sensíveis a direitos de acesso.                                                      |
| Ligações de referência                      | Implementadas como um feed assinado separadamente e atualizado de hora a hora. As ligações fixas estão imediatamente disponíveis para o escalão da comunidade; as campanhas limitadas continuam a ser dados do escalão em direto.                                                                         |
| Ofertas para apoiantes                      | Implementadas como um feed separado, assinado e disponível apenas em direto, e como uma página do painel. O cliente volta a validar o esquema fechado de benefícios, preserva a última cache válida, filtra as entradas expiradas e identifica explicitamente as ofertas de parceiros.                    |
| Informações e reconhecimento de apoiantes   | Implementados como um feed estrito, assinado e disponível apenas em direto, com ELO gerido pelo Radar, dados factuais sobre a atualidade/tendência do catálogo, um distintivo local verificado de apoiante, uma página do painel e comandos de estado/sincronização da CLI disponíveis apenas localmente. |
| Pagamentos e e-mail transacional            | Não implementados no cliente OSS. A compra, doação, análise de recibos, recuperação e entrega de correio pertencem ao serviço privado; a disponibilidade alojada continua a depender da respetiva implementação supervisionada e configuração do fornecedor.                                              |
| Fluxo de trabalho do agente de investigação | Não faz parte desta versão do cliente. Os conteúdos selecionados do feed continuam a ser dados do lado do servidor; nenhum agente de investigação autónomo é executado numa instalação do OmniRoute.                                                                                                      |

---

## Leitor de anúncios públicos

O leitor genérico de anúncios é independente da feature flag do Radar. A página inicial do dashboard e o
visualizador do Changelog obtêm o ficheiro público `news.json` do repositório através de um simples `GET` para
`NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). Não enviam qualquer definição do Radar, prompt, configuração
de fornecedor, registo de utilização ou estado local de dispensa.

O `news.json` utiliza o esquema v2 fechado implementado por `parseNewsPayload()`:

- `schemaVersion: 2` e uma coleção `items[]` limitada;
- valores `id` de anúncio estáveis e únicos;
- campos explícitos `active` e `publishedAt` em formato ISO;
- texto em inglês obrigatório, com texto localizado opcional;
- ligações HTTPS opcionais sem credenciais e um ícone incluído numa lista de permissões;
- seleção dos anúncios ativos mais recentes primeiro, recurso ao inglês quando a localização não estiver disponível e dispensa local por ID.

O analisador aceita temporariamente o formato singular anterior `{ active, title, message, ... }`, para que
forks mais antigos possam migrar sem uma vista do Changelog danificada. Os feeds inválidos permanecem inertes. A entrada de lançamento
do Radar é fornecida com `active: false`; alterá-la para `true` é uma ação de lançamento separada, posterior ao merge e à implementação,
e não altera `RADAR_ENABLED` nem o consentimento independente para sincronização do feed.

---

## Flag: `RADAR_ENABLED` (desativada por predefinição)

O Radar é condicionado, de ponta a ponta, pela feature flag `RADAR_ENABLED`
(`src/shared/constants/featureFlagDefinitions.ts`, categoria `policies`,
`defaultValue: "false"`).

**Quando a flag está desativada, a superfície não existe:**

- Todos os endpoints `/api/radar/*`, incluindo leituras e escritas locais do estado dos modelos,
  devolvem `404` antes de acederem a qualquer módulo do Radar.
- Os ecrãs do dashboard (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) renderizam
  `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) devolve a linha de base inalterada —
  a mesma contagem de entradas, os mesmos valores, todas as entradas marcadas com `origin: "baseline"` — e nunca
  lê a cache do feed.
- Nunca é efetuada qualquer chamada de rede do Radar; cada módulo de sincronização devolve `{ status: "disabled" }`
  antes de aceder a `fetch`.

Esta é uma condição estrita e abrangente: ativar a flag desbloqueia os _ecrãs_, nada
mais. Não carrega dados, não inicia uma sincronização em segundo plano e não altera
o encaminhamento nem a seleção de modelos — consulte o consentimento separado abaixo.

---

## A sincronização de dados é um consentimento SEPARADO — a promessa de privacidade

Ativar `RADAR_ENABLED` apenas desbloqueia a interface. A sincronização do feed exige um segundo
consentimento independente, armazenado em `radar_settings.opt_in` (`src/lib/db/radar.ts`,
migração `136_radar_cache_settings.sql`). `syncRadar()` verifica a flag _e_ o
consentimento antes de efetuar qualquer chamada de rede:

```
Flag desativada       → { status: "disabled" }   — sem chamada de rede
Consentimento falso   → { status: "opt_out" }    — sem chamada de rede
```

Quando ambos estão ativados, o fluxo de sincronização é:

1. `GET <feed base URL>/v1/catalog/latest` com `x-omniroute-radar-schema: 2` e um cabeçalho
   opcional `Authorization: Bearer <supporter key>` (ver abaixo). Na ausência do cabeçalho do esquema,
   os servidores usam, por predefinição, o artefacto de transição v1 assinado separadamente, para que os clientes
   instalados mais antigos continuem a receber atualizações.
2. Trata-se de um fluxo da aplicação apenas para transferência, mas continua a ser um pedido HTTPS. A infraestrutura
   alojada recebe metadados de ligação comuns, como o IP de origem. Quando uma chave de apoiante
   está configurada, a sincronização também envia essa chave no cabeçalho Bearer para que o serviço possa determinar
   o direito de acesso. Na revisão exata do servidor privado identificada no limite das provas acima,
   a contabilização dos pedidos do feed utiliza hashes das chaves, utilização agregada e um HMAC truncado
   do IP, com rotação diária, para análise manual de abusos; essas tabelas não conservam nem a chave nem o IP em formato não processado.
   Os registos de acesso da infraestrutura e a caixa de saída de entrega encriptada constituem limites operacionais
   separados.
3. O OmniRoute nunca envia prompts, respostas, conversas, credenciais de fornecedores, tráfego de modelos,
   tempo de atividade, latência ou a configuração local de fornecedores para o serviço Radar.
4. A resposta é verificada, validada e armazenada localmente em cache (consulte
   [Modelo de segurança](#security-model)). O Radar tem exatamente quatro caminhos de rede do lado do servidor:
   `syncRadar()` para o catálogo, `syncRadarReferrals()` para referências e
   `syncRadarOffers()` / `syncRadarIntel()` para ofertas e Intel exclusivas para apoiantes.

A **chave de apoiante** é um token Bearer opcional (`radar_settings.supporter_key`)
que permite ao serviço de feed decidir que nível disponibilizar (consulte
[Níveis](#tiers-community-and-live)). A chave:

- É armazenada **encriptada em repouso** com as mesmas funções auxiliares AES-256-GCM `encrypt()`/`decrypt()`
  (`src/lib/db/encryption.ts`) utilizadas para as credenciais dos fornecedores.
- É definida através de `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) e
  **nunca é devolvida integralmente** — a resposta devolve uma forma ocultada (`omr_****abcd`).
- Quando é alterada ou removida, invalida atomicamente as caches do catálogo, das referências, das ofertas e do Intel. A
  sincronização/leitura seguinte determina o novo direito de acesso no servidor; guardar uma chave não efetua, por si só,
  um pedido de rede nem consome uma chave de ativação de utilização única.
- É enviada para o serviço de feed como token Bearer no GET de sincronização — nenhuma outra informação sobre a
  chave sai do cliente.

---

## Regras de acesso e segurança apresentadas antes da adesão

O painel inativo apresenta estas regras a partir de
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **antes** de qualquer uma das ações de ativação.
A escala de acesso canónica é:

| Nível                     | Elegibilidade                                                                                                   | Acesso                                                          | Regra de repetição/expiração                                                |
| ------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Comunidade                | Qualquer pessoa; sem chave                                                                                      | Catálogo completo com um atraso de cerca de 30 dias             | Sempre disponível; sem emissão                                              |
| Estrela + seguir          | O GitHub OAuth verifica tanto uma estrela no repositório como o seguimento do proprietário                      | Uma consulta do catálogo em tempo real e, depois, Comunidade    | Uma emissão por início de sessão; nunca é reemitida                         |
| Contribuidor Top 10       | Posições 1–10 na classificação semanal completa mais recente                                                    | 365 dias em tempo real                                          | Reivindicado a pedido; sair da classificação não reduz um período atribuído |
| Contribuidor Top 100      | Posições 11–100 nessa classificação                                                                             | 90 dias em tempo real                                           | A mesma regra de reivindicação a pedido/idempotente                         |
| Compra de apoiante        | Compra única de 6 meses, 1 ano ou vitalícia                                                                     | Catálogo em tempo real, ofertas em tempo real assinadas e Intel | Sem renovação automática                                                    |
| Donativo/concessão manual | Donativo revisto pelo proprietário ou concessão pelo proprietário durante um número explícito de dias/vitalícia | O mesmo direito em tempo real durante o período concedido       | Concessão auditada e idempotente                                            |

Os PRs integrados, commits e linhas alteradas são **apenas dados de entrada para a classificação**. Um início de sessão fora do Top 100 não recebe
qualquer concessão de contribuidor, independentemente do número de PRs. As compras finitas, os donativos, os períodos de contribuidor e as
concessões manuais acumulam-se a partir da data de expiração atual; o acesso vitalício prevalece. Uma alteração de classificação nunca
revoga retroativamente nem reduz o tempo já atribuído.

A licença alojada é pessoal e a regra apresentada ao utilizador é uma instalação ativa de cada vez. Esta
versão **não** alega ter um bloqueio de hardware: a sincronização OSS não cria impressões digitais do hardware nem mantém um
aluguer criptográfico do dispositivo. Na revisão verificada do servidor privado acima, a aplicação implementada
consiste na validação do direito de acesso e num sinal para revisão manual quando a mesma chave ativa é detetada a partir de um quarto
endereço IP distinto num período de 24 horas. Esse sinal nunca bloqueia nem revoga automaticamente uma chave. A recuperação
revoga e substitui a chave perdida, preservando a data de expiração existente; não reinicia o
período comprado ou concedido.

As ofertas em tempo real são selecionadas manualmente e podem ser alteradas ou expirar. O ecrã de adesão também indica o limite exato
de privacidade: são descarregados metadados assinados de catálogo/referenciação; uma chave válida desbloqueia adicionalmente
ofertas assinadas e Intel; a chave Bearer e os metadados normais da ligação chegam ao serviço alojado;
os prompts, as respostas, as conversas, as credenciais dos fornecedores, o tráfego dos modelos, o tempo de atividade, a latência e a configuração local
dos fornecedores não chegam ao serviço.

---

## Obter uma chave de apoiante

O ecrã de ativação (`/dashboard/radar`) contém ligações para dois fluxos destinados a **obter** uma
chave de apoiante. O próprio repositório OSS nunca emite uma chave, nunca executa código de pagamento e
**nunca indica um preço** — os preços são decididos e apresentados inteiramente nas
páginas de destino, não neste repositório (decisão de especificação D14).

- **"Sou colaborador"** — abre `RADAR_CONTRIBUTOR_CLAIM_URL` (predefinição
  `https://radar.omniroute.online/auth/github`), um fluxo de reivindicação através de OAuth do GitHub alojado no
  servidor privado do Radar. Este verifica a classificação semanal completa mais recente: os 10 primeiros recebem 365 dias
  e as posições 11–100 recebem 90 dias. Fora dos 100 primeiros, o número de PRs nunca concede acesso; em vez disso, o fluxo
  verifica o nível separado de utilização única associado a estrela + seguir.
- **"Apoiar o projeto"** — abre `RADAR_SUPPORTER_PLANS_URL` (predefinição
  `https://radar.omniroute.online/planos`), a página alojada com as opções de pagamento único de 6 meses, 1 ano e
  vitalícia. A página OSS continua sem apresentar qualquer valor monetário.

Ambos os URLs são resolvidos no lado do servidor (`src/lib/radar/links.ts`, seguindo o mesmo padrão de
substituição por variável de ambiente que `RADAR_FEED_URL`) e transmitidos ao dashboard através da resposta
existente de `GET /api/radar/settings` (`contributorClaimUrl`, `supporterPlansUrl`) — o
componente do cliente nunca lê diretamente `process.env`.

| Var                           | Finalidade                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Substitui o URL de reivindicação de colaborador (predefinição `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Substitui o URL dos planos de apoiante (predefinição `https://radar.omniroute.online/planos`).               |

### Recuperar uma chave de apoiante perdida

O ponto de entrada de recuperação do serviço alojado é `https://radar.omniroute.online/recover`; também está
associado a partir da página de planos. A recuperação permanece inteiramente fora do cliente OSS, porque a instalação
local nunca recebe o e-mail do comprador/colaborador e não consegue reconstruir uma chave em bruto a partir
das respetivas definições encriptadas.

1. Submeta o e-mail associado à chave. O serviço devolve a mesma página de confirmação, quer exista ou não uma
   licença recuperável, para que o formulário não permita enumerar contas.
2. Se for elegível, o worker de entrega envia uma ligação de curta duração e utilização única. Ao abri-la, o
   token é imediatamente transferido para um cookie transitório encriptado `HttpOnly`/`Secure` e ocorre um redirecionamento para o URL
   limpo `/recover`; a página não contém qualquer token, e-mail, chave antiga ou chave de substituição.
3. Confirme a revogação. O serviço privado revoga a chave anterior, cria a substituição com
   o mesmo plano/prazo de validade e coloca-a em fila para envio por e-mail numa única transação. A chave de substituição nunca
   é devolvida ao browser.
4. Cole a chave de substituição em `/dashboard/radar`. A chave antiga deverá agora passar para `community`; a
   chave de substituição deverá produzir uma sincronização `live` verificada. A reabertura da mesma ligação de recuperação deverá falhar com
   uma resposta genérica de ligação inválida/expirada.

A rota de recuperação alojada e o worker de e-mail podem estar presentes no código e, ainda assim, estar indisponíveis numa determinada
implementação. Não considere o fluxo pronto para produção até o servidor ter sido implementado, o fornecedor de entrega
ter sido configurado com um destinatário controlado e a ligação completa de utilização única ter sido testada.

Assim que um visitante tiver uma chave (`omr_` + 40 carateres hexadecimais), o ecrã de ativação
(`src/app/(dashboard)/dashboard/radar/page.tsx`) apresenta um campo para colar a chave como percurso
principal: colar uma chave e submeter envia `POST /api/radar/settings`
(`{ optIn: true, supporterKey }`) numa única chamada — colar uma chave define-a e ativa a participação,
desbloqueando o ecrã. O formato (`omr_` + 40 carateres hexadecimais) é primeiro verificado no lado do cliente
com o auxiliar partilhado `isValidSupporterKeyFormat()` (`src/lib/radar/supporterKey.ts`)
para melhorar a experiência de utilização; em qualquer dos casos, o esquema Zod do servidor é a validação autoritativa. Depois de uma
chave ser definida, o ecrã de ativação apresenta a forma mascarada (`supporterKeyMasked` de
`GET /api/radar/settings`) em vez de um campo vazio, com um controlo "alterar chave" para
colar uma nova — a chave em bruto nunca volta a ser apresentada. Os dois botões de reivindicação/planos acima
continuam a ser a forma de _obter_ uma chave inicialmente; este campo é onde um operador
que já possui uma a ativa.

### Ativação ponto a ponto e configuração orientada

O serviço privado de feed e este cliente OSS têm uma fronteira deliberadamente restrita: o serviço
emite e valida a chave de apoiante, enquanto a instalação local do OmniRoute encripta a chave,
sincroniza artefactos assinados no lado do servidor e orienta a configuração do fornecedor. A ordem da validação assistida é:

1. Obtenha uma chave recém-emitida ou recuperada através da reivindicação de colaborador, de plans/checkout, do
   processo de recuperação ou de um operador autorizado de um servidor privado. Não cole a chave em bruto em registos,
   capturas de ecrã, comentários de problemas ou argumentos da linha de comandos.
2. Ative a flag de funcionalidade `RADAR_ENABLED` na instalação local do OmniRoute. Isto disponibiliza a IU,
   mas esta permanece sem atividade de rede até que a adesão separada seja guardada.
3. Abra `/dashboard/radar`, cole a chave e ative. O browser envia um único
   `POST /api/radar/settings` local com `{ optIn: true, supporterKey }`; a chave é encriptada localmente e
   a resposta contém apenas `omr_****<last4>`.
4. Deixe o ecrã de ativação executar a sincronização do catálogo ou selecione **Sincronizar agora**. Confirme que a página
   indica `live`, uma versão do feed e uma hora de obtenção. Para um diagnóstico local autenticado,
   `GET /api/radar/status` indica a adesão/presença da chave e os quatro estados da cache sem devolver
   a chave. `POST /api/radar/sync-all` pode atualizar explicitamente o catálogo, as referências, as ofertas e o Intel.
5. Abra `/dashboard/radar/setup?provider=<provider>`. Siga o URL das credenciais gerido pelo fornecedor,
   selecione **Adicionar chave de API**, guarde através do formulário real do fornecedor, regresse ao guia e execute
   **Testar ligação**. O guia utiliza as rotas normais `/api/providers` e
   `/api/providers/<connection-id>/test`; não cria uma credencial Radar paralela.
6. Abra `/dashboard/radar/combos` depois de estarem ativas pelo menos duas ligações de fornecedores compatíveis.
   Reveja a família sugerida e crie a combinação através da API de combinações existente. As ofertas e o
   Intel permanecem caches assinadas separadas e apenas em tempo real, podendo ser consultadas nas respetivas páginas do Radar.
7. Recarregue `/dashboard/radar` e a página de configuração. A adesão, o estado da chave ocultada, a cache verificada, a ligação
   de fornecedor guardada e a ação de teste têm de persistir após o recarregamento. Recolha provas apenas depois de
   a chave em bruto e a credencial do fornecedor deixarem de estar visíveis.

Guardar uma chave não constitui, por si só, prova de um direito de acesso em tempo real. A prova é a combinação do resultado de
`GET /v1/license/check` do serviço privado, do nível `live` fornecido pelo catálogo OSS, de uma cache assinada
e verificada e do fluxo real de ligação/teste do fornecedor. Uma chave inválida, expirada ou revogada
faz com que o catálogo reverta de forma segura para `community`; não pode ser apresentada como uma validação bem-sucedida de uma chave ativa.

### Ligação para o painel de administração privado

`RADAR_ADMIN_URL` adiciona opcionalmente **Administração do Radar ↗** imediatamente após o item Radar destinado ao utilizador
na secção Custos da barra lateral. Deliberadamente, não tem um valor predefinido: quando a variável
não está definida ou é inválida, a barra lateral estática, a paleta de comandos e o ecrã de personalização da barra lateral não contêm
qualquer item de administração nem URL privado.

O valor é resolvido no lado do servidor e transmitido através da resposta
`GET /api/settings`, autenticada pela gestão, apenas para uma sessão autenticada do painel de controlo ou para o proprietário
de loopback fidedigno durante uma inicialização local sem início de sessão. A autenticação por chave de API da CLI, de serviços internos
e com âmbito de gestão não recebe este valor. O browser valida novamente a resposta antes de materializar
a ligação externa, que é aberta com `noopener noreferrer`.

Utilize um URL de túnel HTTPS/tailnet sem credenciais. HTTP simples apenas é aceite para um reencaminhamento SSH
de loopback, como `http://127.0.0.1:9351`; outros esquemas, credenciais incorporadas, URLs malformados e
destinos HTTP remotos falham de forma segura e deixam a navegação inerte.

---

## Modelo de segurança

### Assinatura Ed25519 sobre os bytes exatos

O conteúdo do feed é assinado com Ed25519. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) verifica a assinatura sobre os **bytes exatos da resposta**
recebidos através da rede — o conteúdo nunca é serializado novamente antes da verificação, pelo que uma
recodificação byte a byte não pode invalidar nem contornar silenciosamente a verificação da assinatura.
Uma falha de verificação (`invalid_signature`) interrompe a sincronização antes de o conteúdo ser
analisado ou armazenado em cache.

### Chave pública fixa + rotação

A chave pública de verificação está fixada em `src/lib/radar/pinnedKeys.ts`
(`PINNED_FEED_PUBLIC_KEYS`), uma matriz que permite adicionar uma nova chave no início antes de uma
rotação, enquanto os feeds antigos em cache, assinados com uma chave anterior, permanecem válidos até
serem novamente sincronizados.

### Substituições através de variáveis de ambiente adequadas a forks

Duas variáveis de ambiente permitem que forks e instalações autoalojadas configurem o cliente para utilizar o seu próprio feed em vez
do serviço OmniRoute predefinido — consulte
[Como autoalojar um feed](#how-to-self-host-a-feed) abaixo:

| Variável            | Finalidade                                                                                                                 |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `RADAR_FEED_URL`    | Substitui o URL base do feed (predefinição: `https://radar.omniroute.online`).                                             |
| `RADAR_FEED_PUBKEY` | Substitui a chave pública fixa (SPKI DER codificada em base64 ou PEM), trocando a matriz incorporada por esta única chave. |

### Versão mínima

`syncRadar()` rejeita um feed transferido cuja `version` não seja estritamente mais recente do que a
versão atualmente armazenada em cache (`compareVersions()`, comparação de `YYYY.MM.DD.n` separado por pontos) —
`{ status: "stale" }`. Isto impede que um endpoint de feed comprometido ou mal configurado
reponha num cliente uma versão anterior com um conteúdo assinado de forma diferente.

### Duas datas e por que motivo ambas são mantidas

Um feed em cache contém duas datas distintas, e evitar que sejam confundidas é precisamente o motivo para
manter ambas:

| Campo         | Origem                   | Indica                                   |
| ------------- | ------------------------ | ---------------------------------------- |
| `generatedAt` | corpo assinado do feed   | a antiguidade dos **dados**              |
| `fetchedAt`   | relógio desta instalação | quando esta instalação os **transferiu** |

Um feed obtido há alguns minutos pode conter dados com várias semanas, pelo que `fetchedAt`, por si só, não
permite a um operador saber se a camada de sobreposição é mais recente do que a base sobre a qual assenta. Ambas são
guardadas em `radar_feed_cache`, devolvidas por `getRadarCatalog().meta` e comunicadas
separadamente por `GET /api/radar/status`. Uma linha armazenada em cache antes de a coluna `generated_at`
existir (migração 163) é lida como `null` — o que é desconhecido permanece desconhecido, em vez de
usar a hora de obtenção. `radar_referrals_cache` mantém o seu próprio `generated_at` desde
a migração 142.

A versão mínima acima compara `version`, e não nenhuma das datas.

Permanecem duas lacunas, ambas intencionais: o painel continua a apresentar apenas `Última obtenção`, pelo que mostrar
a data de criação nesse local exige uma nova etiqueta (e as respetivas 41 entradas de idioma); além disso, as caches de ofertas e informações
não guardam qualquer data de criação, apesar de os respetivos esquemas de feed incluírem uma — consequentemente, `GET
/api/radar/status` omite o campo para essas duas caches, em vez de comunicar um valor `null`
que seria interpretado como "desconhecido".

### Validação do esquema

Os bytes transferidos são analisados e validados em relação a `RadarFeedSchema`
(`src/lib/radar/feedSchema.ts`, um esquema Zod) **após** a verificação da assinatura. Uma
incompatibilidade de esquema devolve `{ status: "invalid_schema" }` e a cache permanece
inalterada. Como medida defensiva, o conteúdo armazenado em cache é novamente validado em cada leitura
(`getRadarCatalog()`) — uma linha de cache danificada ou editada manualmente faz com que seja utilizada a
base, em vez de ser fornecida.

### Limite do tamanho da resposta (10 MB)

`syncRadar()` impõe um **limite rígido de 10 MB** ao corpo da resposta do feed — o feed
assinado é um documento JSON com apenas alguns KB, pelo que qualquer valor superior indica um `RADAR_FEED_URL`
mal configurado ou hostil (ou um serviço a montante que está a fornecer dados sem sentido), e não um catálogo legítimo.
A aplicação deste limite ocorre em duas camadas:

1. Uma verificação preliminar de `Content-Length` evita totalmente a leitura do corpo quando o
   cabeçalho já declara um valor superior ao limite.
2. Uma verificação do total acumulado durante a leitura do corpo impõe o limite mesmo quando
   `Content-Length` está ausente ou indica um tamanho inferior ao real — nunca se confia apenas
   no cabeçalho. A concatenação dos fragmentos acumulados preserva os bytes exatos
   necessários para a posterior verificação da assinatura Ed25519.

Exceder o limite devolve `{ status: "too_large" }` e deixa a cache inalterada,
seguindo o mesmo padrão não destrutivo de todas as outras falhas de sincronização
(`invalid_signature`, `invalid_schema`, `stale`).

---

## Níveis: `community` e `live`

O esquema do feed contém um campo `tier: "community" | "live"`, decidido **no lado do servidor**
pelo serviço de feed com base no pedido (presença e validade da chave de apoiante)
— o cliente nunca decide o seu próprio nível.

- **`community`** — o catálogo gratuito, com um atraso de aproximadamente 30 dias em relação aos dados
  mais recentes. É isto que recebe um pedido não autenticado ou com uma chave inválida.
- **`live`** — o catálogo mais recente, fornecido a pedidos que incluam uma chave de apoiante
  válida.

**Uma chave de apoiante inválida ou expirada resulta em `community` — nunca constitui um
erro.** O processo de sincronização apenas distingue falhas de assinatura/esquema/versão (todas
recuperáveis e não fatais para o estado em cache) de um resultado bem-sucedido `{ status:
"updated", version, tier }`. Não existe nenhum fluxo de erro específico de um nível que o cliente
tenha de tratar.

### O nível fornecido vem de um cabeçalho da resposta, não do corpo assinado

O campo `tier` do **corpo** do feed assinado é sempre `"live"` — o serviço de feed distribui
**dois artefactos assinados por versão**: o live inclui campanhas atuais e o community
omite-as. Cada artefacto é assinado com base nos seus próprios bytes exatos. Ainda assim, o corpo não
serve como decisão de acesso; o nível efetivamente selecionado para um pedido é enviado
no **cabeçalho de resposta `x-omniroute-feed-tier`**, decidido no lado do servidor a partir da chave
`Authorization` do pedido.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) é o único local
que determina o nível em que um cliente deve confiar:

1. Analisa `x-omniroute-feed-tier` com `RadarTierSchema` (Zod) — um cabeçalho ausente ou
   um valor que não seja exatamente `"community"` ou `"live"` é tratado como **não
   presente** (nunca é considerado fidedigno e guardado na cache/UI tal como está; isto também abrange servidores de feed
   mais antigos, anteriores à introdução do cabeçalho).
2. Recorre ao campo `tier` do corpo assinado (sempre `"live"`) apenas quando o passo 1
   não produz qualquer resultado.
3. O nível determinado é guardado em cache e devolvido como `{ status: "updated",
version, tier }` — este é o valor apresentado pelo painel, nunca o campo bruto do
   corpo.

---

## Regras de combinação por sobreposição durante a leitura

`applyFeed()` (`src/lib/radar/applyFeed.ts`) combina o feed em cache **sobre** a
base estática durante a **leitura**, dentro de `getRadarCatalog()`. O array de base
(`FREE_MODEL_BUDGETS`) nunca é alterado — é calculado um novo `MergedEntry[]` em cada
chamada.

Quatro regras, por ordem de precedência:

1. **O feed nunca substitui uma definição local.** Por campo: se o operador tiver
   personalizado um campo numa entrada (mapa `localOverrides`, indexado por `provider:modelId`),
   o valor do feed para esse campo específico é ignorado — prevalece o valor do operador.
2. **`enabled: false` desativa a entrada, com indicação da proveniência.** Uma entrada do feed que
   desative uma entrada define `enabled: false` e `disabledBy: "radar"` no resultado combinado,
   para que a UI possa explicar _por que motivo_ uma entrada passou de disponível a desativada.
3. **Uma entrada adicionada pelo utilizador que não esteja presente no feed permanece inalterada.** As entradas que
   existem apenas na base (ou que foram adicionadas localmente) e não têm uma entrada correspondente no feed
   são mantidas sem alterações.
4. **Uma entrada marcada com uma tombstone nunca é restaurada.** Se o operador tiver eliminado explicitamente uma
   entrada (conjunto `tombstones`), o facto de o feed voltar a adicionar esse `provider:modelId` numa versão
   posterior não faz com que esta reapareça.

Os campos editáveis e as tombstones são persistidos em
`radar_local_model_state` (migração `153_radar_local_model_state.sql`). O adaptador público da BD
(`src/lib/db/radar.ts`) converte essas linhas no mapa `localOverrides` e no conjunto
`tombstones` utilizados por `applyFeed()`; em produção, `getRadarCatalog()` carrega esse estado
depois de serem validadas as condições da flag, da cache e do esquema. Apenas `displayName` e `enabled` podem
ser editados pelo operador. A identidade do fornecedor/modelo, a proveniência do feed, a quota, as capacidades, os termos de serviço
e os dados de configuração não podem ser alterados através desta interface.

O painel disponibiliza quatro ações locais:

- **Editar** altera o nome de apresentação local e o estado de ativação.
- **Repor alterações locais** limpa ambos os campos editáveis sem alterar uma tombstone.
- **Ocultar** cria uma tombstone, para que atualizações posteriores do feed não possam recriar a linha.
- **Restaurar** remove a tombstone; qualquer definição guardada separadamente permanece em vigor.

Um `enabled: false` do feed continua a ser a exceção de segurança: prevalece sobre um
`enabled: true` local desatualizado, mantém a entrada combinada desativada e regista `disabledBy: "radar"`.

As publicações do catálogo utilizam `schemaVersion: 2`. `contextWindow` e cada um de `tools`, `vision` e
`thinking` são, de forma independente, `number | null` / `boolean | null`: `null` significa desconhecido, enquanto
`false` significa que uma fonte oficial do fornecedor confirmada segundo D16 declara explicitamente que a capacidade está ausente.
As flags internas do registo/especificação de modelos do OmniRoute nunca são promovidas diretamente a factos do feed. O cliente
continua a aceitar snapshots v1; como o construtor antigo utilizava `false` como marcador de ausência, um `false` de v1 é
normalizado para desconhecido, enquanto um `true` de v1 continua a ser factual. Versões desconhecidas do esquema resultam numa falha segura e a
última cache válida permanece disponível. Todos os modelos v2 com um contexto/capacidade não nulo têm de incluir um
`metadataEvidenceUrls[]` HTTPS sem necessidade de credenciais; caso contrário, a validação do esquema falha e a cache
não é substituída. A tabela do catálogo apresenta os três estados como `✓`, `✕` e `?`.

### Combinações orientadas e acesso MCP

Os valores `familyId` confirmados são preservados durante a sobreposição em tempo de leitura e alimentam o módulo puro
`buildRadarComboSuggestions()` (`src/lib/radar/comboSuggestions.ts`). Uma família é sugerida
apenas quando pelo menos dois fornecedores distintos têm ligações ativas e disponibilizam o ID exato do modelo selecionado.
Modelos desativados, fornecedores inativos, IDs de modelo em falta, famílias com um único elemento e correspondências ambíguas
de aliases/prefixos resultam numa falha segura. As sugestões utilizam a estratégia `priority` existente, ordenando primeiro o
maior orçamento mensal recorrente; a UI cria-as apenas através de `POST /api/combos`.

A interface guiada está disponível em `/dashboard/radar/combos`. Lê apenas os endpoints locais
`GET /api/radar/catalog` e `GET /api/combos/builder/options`. Nunca aciona a sincronização do Radar,
lê credenciais de fornecedores ou escreve diretamente na base de dados de combos.

Os clientes MCP podem ler a mesma projeção local com `omniroute_radar_catalog` (`read:radar`). Os
filtros opcionais `provider`, `familyId` e `enabledOnly` são avaliados após uma leitura local de
`GET /api/radar/catalog`. O respetivo resultado fechado inclui metadados do catálogo, além do fornecedor/modelo,
nome de apresentação, `familyId`, quota, capacidades, estado de ativação, origem e `disabledBy`; URLs de configuração,
passos, ligações, endereços de e-mail, chaves e dados de referência nunca são devolvidos. Esta ferramenta é
só de leitura e nunca invoca `/api/radar/sync`.

### Marcadores de proveniência

Cada entrada combinada contém um campo `origin`, que a interface apresenta como um distintivo:

- `"baseline"` — inalterada em relação ao catálogo estático da versão.
- `"radar"` — um ou mais campos foram atualizados pelo feed.
- `"local"` — o operador tem, pelo menos, uma substituição local nesta entrada (as substituições
  locais prevalecem sempre sobre o feed, de acordo com a regra 1, independentemente do que o feed indique).

---

## Superfícies locais — nunca um proxy do feed

As famílias de rotas locais do Radar abaixo suportam a IU em `src/app/api/radar/`:

| Rota                           | Método | Finalidade                                                                                                                             |
| ------------------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET    | Devolve o catálogo combinado (`getRadarCatalog()`) a partir da cache local.                                                            |
| `/api/radar/sync`              | POST   | Aciona `syncRadar()` no servidor; devolve o estado resultante.                                                                         |
| `/api/radar/settings`          | GET    | Devolve `{ optIn, hasSupporterKey, supporterKeyMasked }` — nunca a chave em bruto.                                                     |
| `/api/radar/settings`          | POST   | Define a adesão e/ou a chave de apoiante (encriptada).                                                                                 |
| `/api/radar/referrals`         | GET    | Devolve `{ fixed, campaigns, tier }` a partir da cache local — consulte [Ligações de referência](#referral-links-free-credits) abaixo. |
| `/api/radar/offers`            | GET    | Devolve ofertas ativas a partir da cache local dinâmica verificada; nunca devolve a chave de apoiante.                                 |
| `/api/radar/offers/sync`       | POST   | Aciona o pipeline `syncRadarOffers()` no servidor, exclusivamente com a chave dinâmica.                                                |
| `/api/radar/intel`             | GET    | Devolve informações Intel dinâmicas locais verificadas e um booleano de reconhecimento de apoiante; nunca uma identidade ou chave.     |
| `/api/radar/intel/sync`        | POST   | Aciona o pipeline `syncRadarIntel()` no servidor, exclusivamente com a chave dinâmica.                                                 |
| `/api/radar/status`            | GET    | Devolve o estado local só de leitura das definições/caches do catálogo, referências, ofertas e Intel, sem segredos.                    |
| `/api/radar/sync-all`          | POST   | Executa os quatro módulos de sincronização no servidor e devolve um estado separado para cada feed.                                    |
| `/api/radar/local-model-state` | GET    | Lista substituições persistidas e marcadores de eliminação para os controlos de edição/restauro.                                       |
| `/api/radar/local-model-state` | PATCH  | Define ou limpa os campos de substituição validados `displayName`/`enabled`.                                                           |
| `/api/radar/local-model-state` | PUT    | Cria ou remove um marcador de eliminação com `{ provider, modelId, tombstoned }`.                                                      |
| `/api/radar/local-model-state` | DELETE | Limpa os campos de substituição editáveis, preservando qualquer marcador de eliminação.                                                |

**Regra estrita: estas rotas nunca funcionam como proxy do serviço de feed.** O browser comunica apenas
com o servidor OmniRoute local. Os quatro módulos que contactam o serviço Radar são
`src/lib/radar/sync.ts` (catálogo), `src/lib/radar/referralsSync.ts` (referências) e
`src/lib/radar/offersSync.ts` (ofertas), além de `src/lib/radar/intelSync.ts` (Intel); todos são executados
no servidor, nunca no cliente. Isto mantém
o URL do feed e qualquer chave de apoiante totalmente fora do tráfego de rede orientado para o cliente.

Todos os endpoints do Radar devolvem `404` quando `RADAR_ENABLED` está desativado (consulte
[Indicador](#flag-radar_enabled-default-off) acima) e encaminham as respostas de erro através de
`buildErrorBody()`/`sanitizeErrorMessage()`, de acordo com a regra de sanitização de erros aplicável a todo o repositório
(`docs/security/ERROR_SANITIZATION.md`).

### Autenticação

Todos os endpoints do Radar exigem autenticação através de `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) — um cookie de sessão do painel ou uma chave de API com âmbito de gestão,
a mesma barreira que protege o resto de `/api/settings/*`. A verificação `404`
do indicador desativado é sempre executada **antes** da verificação de autenticação, pelo que uma instalação com `RADAR_ENABLED`
desativado permanece idêntica ao nível dos bytes (sem pedido de autenticação apenas para saber que a superfície não existe);
assim que o indicador é ativado, um pedido não autenticado recebe `401` antes de qualquer leitura ou
escrita na BD. `GET /api/radar/settings` nunca devolve a chave de apoiante em bruto, independentemente do
estado de autenticação — apenas a forma mascarada e um booleano `hasSupporterKey`.

---

## Ofertas para apoiantes

As ofertas utilizam o seu próprio artefacto assinado, `GET /v1/offers/latest`, e nunca partilham a cache do catálogo ou de referências. O endpoint do servidor requer uma chave Bearer válida de apoiante live; não existe alternativa para a comunidade. Por conseguinte, `syncRadarOffers()` termina antes de aceder à rede quando o feature flag está desativado, o operador não aceitou participar ou não está configurada qualquer chave de apoiante.

Após um GET bem-sucedido, o cliente verifica a assinatura Ed25519 sobre os bytes exatos da resposta, valida `RadarOffersFeedSchema`, exige que tanto o corpo assinado como o cabeçalho `x-omniroute-feed-tier` indiquem `live`, impõe uma versão pontuada estritamente mais recente e, só então, substitui atomicamente `radar_offers_cache` (migração `144_radar_offers_cache.sql`). Aplica-se o mesmo limite de 10 MB, incluindo cabeçalhos e stream, utilizado pelos outros feeds. As falhas de assinatura, esquema, tier, repetição, tamanho, HTTP e rede preservam sempre a última cache verificada.

O formato fechado das ofertas suporta três tipos de benefício comparáveis: percentagem em pontos base, crédito em unidades monetárias menores ou dias de avaliação. Uma oferta de parceiro tem de incluir uma referência pública do mesmo tipo e o seu benefício tem de ser estritamente superior; as ofertas oficiais não têm uma referência de parceiro. Os URLs têm de utilizar HTTPS e não podem conter credenciais. `getRadarOffers()` revalida defensivamente o payload em cache e filtra as entradas expiradas em cada leitura local; `/dashboard/radar/offers` volta a filtrar por expiração antes da apresentação, utiliza texto em português quando disponível, com recurso ao inglês como alternativa, e identifica explicitamente as ofertas de parceiros.

O browser chama apenas rotas locais: lê o snapshot mascarado das definições, solicita a `POST /api/radar/offers/sync` que atualize os dados no servidor e, em seguida, lê `GET /api/radar/offers`. Sem uma chave, apresenta as ligações existentes para contribuidores/apoio, em vez de tentar efetuar um pedido ao feed. As ligações externas das ofertas abrem num novo separador com `noopener noreferrer`. Nesta versão, não é disponibilizada nenhuma ferramenta MCP `radar_offers`.

---

## Radar Intel, distintivo de apoiante e CLI

O Intel é um artefacto assinado disponível em `GET /v1/intel/latest`. O `RadarIntelFeedSchema` fechado aceita apenas classificações ELO pertencentes ao Radar, derivadas pelo curador privado a partir de comparações confirmadas, e diferenças factuais de idade/contagem do catálogo, derivadas de snapshots assinados do catálogo. A metodologia está fixada numa classificação inicial de 1000 e K=32. Uma classificação vazia é válida quando nenhuma comparação tiver sido confirmada; o cliente nunca gera uma artificialmente.

`syncRadarIntel()` aplica o mesmo Bearer no lado do servidor, timeout de 30 segundos, limite de stream de 10 MiB, verificação Ed25519 dos bytes exatos, esquema estrito, requisito de `live` no corpo/cabeçalho, limite mínimo de versão e preservação da última cache válida utilizados nas ofertas. Após a persistência de um snapshot live verificado, o cliente deriva `radar:<sha256(supporter key)>`, armazena apenas essa identidade unidirecional e emite o evento de reconhecimento dedicado `radar_supporter`. O respetivo distintivo `radar-supporter` é idempotente e atribui zero XP; nunca atualiza tabelas classificativas nem reutiliza `token_share`. `/dashboard/radar/intel` apresenta o distintivo apenas com base em metadados verificados da cache local.

A CLI disponibiliza `omniroute radar status` e `omniroute radar sync`. Ambos comunicam apenas com a API local do OmniRoute. `status` efetua um `GET /api/radar/status` só de leitura; `sync` envia um único `POST /api/radar/sync-all` e apresenta um resultado por feed. Nenhum dos comandos lê, aceita ou apresenta a chave de apoiante, nem contacta diretamente o serviço Radar.

---

## Ligações de referência (créditos gratuitos)

As ligações de referência são disponibilizadas através de um feed **autónomo e sempre atualizado** —
`GET /v1/referrals/latest` — separado do feed do catálogo. Isto é intencional: o
feed do catálogo no nível community é um instantâneo que pode ter até 30 dias, pelo que uma
ligação de referência extraída do mesmo costumava ficar desfasada da lista real de ligações do servidor pelo mesmo
período (uma referência recém-adicionada podia demorar até um mês a chegar a um utilizador
free/community). O feed de referências elimina esse atraso ao ser sincronizado segundo
uma cadência própria e muito mais curta.

```ts
// Corpo da resposta de GET /v1/referrals/latest (assinado com Ed25519, mesma chave fixa
// do feed do catálogo):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — determinístico: max(updatedAt) entre as ligações
                                  // de referência, para que dois pedidos idênticos produzam exatamente
                                  // os mesmos bytes assinados/a mesma assinatura
  referrals: {
    fixed: RadarReferral[],      // presente em TODOS os níveis, incluindo no-auth/community
    campaigns: RadarReferral[],  // apenas preenchido para uma chave Bearer live (supporter)
                                  // válida; pedidos no-auth/com chave expirada recebem []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

Ao contrário do feed do catálogo, este corpo não contém qualquer campo `tier` — o servidor decide
o que incluir em cada pedido com base na chave `Authorization`, pelo que o cabeçalho de resposta
`x-omniroute-feed-tier` é a ÚNICA fonte para o nível disponibilizado
(`referralsSync.ts::syncRadarReferrals`); um cabeçalho ausente/não reconhecido é convertido em
`"community"`, a suposição com menos privilégios. `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) valida todo o corpo, reutilizando o mesmo
`RadarReferralSchema` por referência exportado de `feedSchema.ts`, para que ambos os feeds validem
referências individuais de forma idêntica. Cada `RadarReferral.url` tem de usar `https://` — um
URL `http://` falha a validação do schema.

O campo `referrals` ANTIGO incorporado no catálogo em `RadarFeedSchema` (`feedSchema.ts`) é
mantido para retrocompatibilidade com feeds do catálogo já em cache, mas `getRadarReferrals()`
já não o lê — consulte [Acesso](#accessor) abaixo.

### Sincronização

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) é o ÚNICO módulo que
acede à rede para obter referências, replicando exatamente o contrato de `syncRadar()`: funcionalidade desativada
→ `disabled`; adesão desativada → `opt_out`; transfere `${RADAR_FEED_URL}/v1/referrals/latest`
(com as mesmas substituições de fork de `RADAR_FEED_URL`/`RADAR_FEED_PUBKEY` que o catálogo), verifica a
assinatura Ed25519 sobre os bytes exatos da resposta (`verifyFeedBytes`), valida com
`RadarReferralsFeedSchema` e guarda em cache na tabela `radar_referrals_cache`
(migração `142_radar_referrals_cache.sql`) — uma tabela completamente separada de
`radar_feed_cache` do catálogo. Um limite de resposta de 10 MB e um limite mínimo para `generatedAt` rejeitam um
feed recebido que seja mais antigo do que o feed em cache, protegendo contra a repetição de um artefacto
assinado mais antigo. Um carimbo de data/hora igual é aceite: o servidor atribui intencionalmente às
variantes community e live das referências o mesmo `generatedAt` determinístico, para que o payload
assinado e o nível disponibilizado possam mudar após uma alteração da chave supporter sem que o conjunto de ligações
subjacente mude. Nunca lança exceções — devolve sempre um objeto de estado; os erros nunca incluem um stack trace
em `reason`.

Dois mecanismos mantêm a cache de referências atualizada, ambos independentes da cadência de
24h do catálogo:

- **Sincronização durante a leitura** — o próprio `GET /api/radar/referrals` chama `syncRadarReferrals()`
  em linha sempre que a cache está ausente ou é mais antiga do que `REFERRALS_STALE_MS` (1h,
  `shouldSyncReferralsOnRead()`), antes de disponibilizar a resposta. É isto que mantém as ligações fixas
  «sempre atualizadas» para o carregamento seguinte do painel, sem esperar por qualquer
  temporizador em segundo plano.
- **Sincronização paralela do agendador** — `radarSchedulerTick()` (`scheduler.ts`) avalia de forma independente
  a antiguidade das referências no mesmo tick horário usado para o catálogo, chamando
  `syncRadarReferrals()` quando necessário. Isto é executado independentemente de o próprio catálogo
  precisar de ser atualizado nesse tick e nunca afeta a estrutura de `RadarTickResult` (apenas um efeito
  secundário de melhor esforço, ignorado em caso de erro).

### Acesso

`src/lib/radar/index.ts` exporta dois acessos só de leitura, nenhum dos quais lança exceções (o mesmo
contrato defensivo de `getRadarCatalog()` — funcionalidade desativada, ausência de cache ou um payload
em cache corrompido resultam sempre na estrutura vazia, em vez de um erro):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  lê a partir de `radar_referrals_cache` (através de `getRadarReferralsCache()`) e valida
  através de `RadarReferralsFeedSchema` — **não** da cache do catálogo.
- `getDefaultReferralFor(provider)` → a referência `fixed` com `isDefault: true` para
  esse fornecedor, ou `null`. Consulta apenas `fixed` — uma campanha nunca é utilizada como
  ligação «predefinida» de um fornecedor.

A regra efetiva que determina «qual é a referência predefinida para um fornecedor» encontra-se em
`findDefaultReferral()` (`src/lib/radar/referrals.ts`), uma pequena função pura **sem
importação da BD** — pode ser importada em segurança para um componente `"use client"`. `getRadarReferrals`/
`getDefaultReferralFor` (em `index.ts`) importam `@/lib/db/radar` e, por isso, permanecem
exclusivos do servidor; o painel de fornecedores importa diretamente `referrals.ts`, em vez de
`index.ts` (consulte abaixo), para evitar incluir `better-sqlite3` no bundle do browser.

### `GET /api/radar/referrals`

Segue exatamente a mesma ordem de validação de todas as outras rotas do Radar: `RADAR_ENABLED` desativado →
`404` (verificado primeiro, comportamento byte a byte idêntico); não autenticado → `401`; caso contrário,
aciona uma sincronização durante a leitura (ver acima) quando os dados estão desatualizados e, em seguida, devolve `200` com
`{ fixed, campaigns, tier }` — `tier` vem diretamente da linha da cache (possivelmente acabada de atualizar)
e é meramente informativo (determina o texto de upsell subtil da interface abaixo). Nunca
encaminha diretamente para o servidor do feed — o próprio código-fonte da rota não contém nenhuma chamada `fetch(`;
a rede só é utilizada dentro de `syncRadarReferrals()`, seguindo o mesmo princípio de utilização exclusiva
da cache local que `/api/radar/catalog`.

### Interface do dashboard — separador "Créditos gratuitos" em `/dashboard/radar`

Reutiliza a página existente do Radar (`src/app/(dashboard)/dashboard/radar/page.tsx`) como um
segundo separador, em vez de criar uma nova rota — reduzindo a superfície de routing/i18n para uma funcionalidade que é uma
variação dos dados que a página já obtém. Após a adesão, a barra de separadores disponibiliza
**Catálogo** (tabela existente) e **Créditos gratuitos**:

- As ligações fixas são agrupadas por fornecedor, cada uma apresentando `requiredAction` (quando presente)
  e um botão `target="_blank" rel="noopener noreferrer"` para o URL de referência.
- As campanhas apresentam o mesmo, além de `validUntil` quando presente.
- Quando `campaigns` está vazio **e** o nível disponibilizado é `community`, a interface apresenta uma
  breve nota de upsell ("as campanhas por tempo limitado são um extra para apoiantes") — isto **nunca**
  oculta nem restringe a lista de ligações fixas, que permanece totalmente preenchida para todos os níveis. O
  upsell é apenas uma mensagem subtil, nunca um bloqueio.

### Ligação de referência no nome do fornecedor (dashboard de fornecedores)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
já associava o nome do fornecedor a `providerInfo.website` quando presente, com um
precedente para uma ligação monetizada: a nota da ligação de parceiro da Kimi (Moonshot AI)
(chave i18n `providers.kimiPartnerLinkNote`). O D28 reutiliza exatamente o mesmo padrão de nota discreta
para referências predefinidas do Radar, em vez de introduzir uma nova chave.

Acoplamento flexível, por conceção:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  é uma função **pura** — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — sem qualquer dependência de `@/lib/radar` ou `@/lib/db/*`. O ficheiro `providerPageUtils.ts` no
  seu conjunto permanece livre dessas importações (confirmado por
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (um componente `"use client"`) é o único local autorizado
  a obter dados do Radar — através de `fetch("/api/radar/referrals")`, seguindo o mesmo padrão de rota
  local utilizado pela própria página do dashboard do Radar — e calcula a referência predefinida
  do lado do cliente com `findDefaultReferral()` a partir de `src/lib/radar/referrals.ts`, que não depende da BD.
- Com `RADAR_ENABLED` desativado, o pedido devolve 404, `referralUrl` permanece `null` e
  `resolveProviderHeaderLink()` devolve o `website` estático do catálogo sem alterações — a
  página do fornecedor permanece byte a byte idêntica ao que era antes de esta funcionalidade existir. O mesmo acontece quando
  ainda não existe cache ou não existe uma referência predefinida para esse fornecedor específico.
- Quando se aplica uma referência predefinida, `ProviderPageHeader` recebe `isReferralLink`
  e apresenta a mesma nota/descrição discreta que a ligação de parceiro da Kimi (reutilizando a
  chave `providers.kimiPartnerLinkNote`) — nunca um tratamento visual novo e separado.

---

## Como alojar autonomamente um feed

Um fork ou uma instalação autoalojada que pretenda ter controlo total sobre o catálogo pode executar o seu próprio serviço de feed sem alterar o código do cliente:

1. Disponibilize um endpoint `GET /v1/catalog/latest` que devolva um corpo JSON em conformidade com `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) — com `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`, `quirks` e `totals` no nível superior. Respeite `x-omniroute-radar-schema: 2`; um servidor compatível com a transição deve encaminhar, por predefinição, os pedidos que não incluam este cabeçalho para um artefacto v1 assinado separadamente.
2. Assine os bytes exatos da resposta com um par de chaves Ed25519 e devolva a assinatura em base64 no cabeçalho de resposta `x-omniroute-feed-signature`.
3. Defina `RADAR_FEED_URL` como o novo URL base e `RADAR_FEED_PUBKEY` como a chave pública correspondente (SPKI DER em base64 ou PEM) — consulte a [referência das variáveis de ambiente](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Ative `RADAR_ENABLED` e dê o seu consentimento através de `POST /api/radar/settings` (`{ optIn: true }`).

Não são necessárias outras alterações ao código — `verifyFeedBytes()` deteta automaticamente a substituição (`getFeedPublicKeys()` em `src/lib/radar/pinnedKeys.ts`), e a comparação de versões, a validação do esquema e as regras de intercalação aplicam-se de forma idêntica a um feed autoalojado.

As ligações de referência (consulte [Ligações de referência (créditos gratuitos)](#referral-links-free-credits) acima) constituem um artefacto separado e opcional: um fork que disponibilize apenas `/v1/catalog/latest` continua a funcionar plenamente — `syncRadarReferrals()` passa para `{ status: "error" }` ao receber um `404` de `/v1/referrals/latest`, e a cache permanece simplesmente vazia, pelo que `GET /api/radar/referrals` continua a devolver `{ fixed: [], campaigns: [], tier: null }`, em vez de provocar uma falha no resto da página. Para também disponibilizar ligações de referência, disponibilize `GET /v1/referrals/latest` em conformidade com `RadarReferralsFeedSchema` (`src/lib/radar/referralsFeedSchema.ts`) e assine-o com o mesmo par de chaves Ed25519 utilizado para o feed do catálogo.

As ofertas para apoiantes são outro artefacto opcional. Para as disponibilizar, implemente `GET /v1/offers/latest` com o esquema fechado `RadarOffersFeedSchema` (`src/lib/radar/offersFeedSchema.ts`), exija um direito de acesso ativo, devolva `x-omniroute-feed-tier: live` e assine os bytes exatos com a mesma chave. Um fork que omita este endpoint mantém inalterado o comportamento do catálogo e das referências; a atualização das ofertas falha de forma não destrutiva e a última cache local de ofertas verificada permanece disponível.

A informação de inteligência é opcional da mesma forma. Uma instalação autoalojada pode disponibilizar `GET /v1/intel/latest` utilizando `RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`), exigir um direito de acesso ativo, devolver `x-omniroute-feed-tier: live` e assinar os bytes exatos com a chave Ed25519 partilhada. A omissão do endpoint mantém inalterados o catálogo, as referências e as ofertas; a atualização da informação de inteligência preserva qualquer último instantâneo local verificado.

---

## Documentação relacionada

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — o padrão de resposta a erros seguido pelas rotas `/api/radar/*`.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting) — referência de `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY`.
