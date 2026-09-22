# Radar Free-Model Catalog (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Fonte da verdade:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Última atualização:** 2026-09-01 — v3.8.51
> **Limite das evidências do serviço hospedado:** as regras do lado do servidor descritas aqui foram verificadas em
> 2026-09-01 no servidor Radar intencionalmente privado, na revisão exata
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`. Essa implementação não é distribuída neste
> repositório OSS; a disponibilidade hospedada permanece um estado operacional separado.

O Radar é um **complemento opcional** que sobrepõe um catálogo assinado e recém-selecionado
de modelos gratuitos à linha de base da versão (`FREE_MODEL_BUDGETS` em
`open-sse/config/freeModelCatalog.data.ts`). Ele existe porque o cenário do nível gratuito muda
mais rapidamente do que a cadência de lançamentos — os provedores adicionam, reduzem ou descontinuam
cotas gratuitas entre lançamentos, e o catálogo de linha de base só pode ser atualizado quando uma
nova versão é lançada.

**Nada que seja gratuito hoje deixa de ser gratuito por causa do feed remoto.** O Radar nunca
coloca uma entrada da linha de base atrás de um acesso pago; ele apenas atualiza os campos de limites/status
no momento da leitura e pode adicionar modelos gratuitos recém-descobertos entre lançamentos. Um operador
ainda pode ocultar um modelo localmente e restaurá-lo pelo mesmo painel. O próprio catálogo de linha de base
nunca é modificado no disco — consulte
[Regras de mesclagem da sobreposição no momento da leitura](#read-time-overlay-merge-rules) abaixo.

---

## Status da entrega na v3.8.51

O status a seguir distingue o que esta versão OSS implementa dos fluxos de trabalho posteriores do Radar.
Trata-se de um status no nível do código, não de uma promessa de que uma implantação hospedada específica
ou integração externa esteja disponível no momento.

| Área                                        | Status nesta versão                                                                                                                                                                                                                                                                                      |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cliente do catálogo assinado                | Implementado por trás de `RADAR_ENABLED`, com adesão separada, verificação Ed25519, configurações/cache locais criptografados, substituições persistentes de exibição/ativação, tombstones reversíveis, agendador e painel.                                                                              |
| Ativação de colaboradores                   | O painel inclui um link para o fluxo de reivindicação do GitHub hospedado no servidor e aceita uma chave `omr_…` existente. A elegibilidade do colaborador é determinada pelo serviço privado; o cliente OSS não contém token do GitHub nem lógica de emissão.                                           |
| Ativação por chave de apoiador              | Implementada. A chave bruta é validada, criptografada em repouso, mascarada nas leituras e enviada somente pela sincronização do lado do servidor. Alterar ou remover a chave invalida todos os quatro caches de feed sensíveis a direitos de acesso.                                                    |
| Links de indicação                          | Implementados como um feed assinado separadamente, atualizado a cada hora. Links fixos ficam disponíveis imediatamente para o nível da comunidade; campanhas limitadas permanecem como dados do nível ao vivo.                                                                                           |
| Ofertas para apoiadores                     | Implementadas como um feed separado, assinado e exclusivo do nível ao vivo, além de uma página no painel. O cliente revalida o esquema fechado de benefícios, preserva o último cache válido, filtra entradas expiradas e identifica explicitamente as ofertas de parceiros.                             |
| Inteligência e reconhecimento de apoiadores | Implementados como um feed estrito, assinado e exclusivo do nível ao vivo, com ELO de propriedade do Radar, informações factuais sobre a atualidade e as tendências do catálogo, um selo local verificado de apoiador, uma página no painel e comandos locais de status/sincronização exclusivos da CLI. |
| Pagamentos e e-mails transacionais          | Não implementados no cliente OSS. Compra, doação, análise de recibos, recuperação e entrega de e-mails pertencem ao serviço privado; a disponibilidade hospedada ainda depende da implantação supervisionada e da configuração dos provedores.                                                           |
| Fluxo de trabalho do agente de pesquisa     | Não faz parte desta versão do cliente. O conteúdo selecionado do feed permanece como dados do lado do servidor; nenhum agente de pesquisa autônomo é executado em uma instalação do OmniRoute.                                                                                                           |

---

## Leitor de anúncios públicos

O leitor genérico de anúncios é separado da flag de recurso do Radar. A página inicial do painel e o
visualizador do Changelog buscam o `news.json` público do repositório por meio de um `GET` simples para
`NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). Eles não enviam nenhuma configuração do Radar, prompt, configuração
de provedor, registro de uso ou estado local de dispensa.

O `news.json` usa o esquema v2 fechado implementado por `parseNewsPayload()`:

- `schemaVersion: 2` e uma coleção `items[]` limitada;
- valores de `id` de anúncio estáveis e exclusivos;
- campos explícitos `active` e `publishedAt` no formato ISO;
- texto em inglês obrigatório, com texto localizado opcional;
- links HTTPS opcionais que não exigem credenciais e um ícone incluído na lista de permissões;
- seleção dos anúncios ativos mais recentes primeiro, fallback de localidade para inglês e dispensa local por ID.

O parser aceita temporariamente o formato singular anterior `{ active, title, message, ... }` para que
forks mais antigos possam migrar sem quebrar a visualização do Changelog. Feeds inválidos permanecem inertes. A entrada de lançamento
do Radar é fornecida com `active: false`; alterá-la para `true` é uma ação de lançamento separada, posterior ao merge e ao deploy,
e não altera `RADAR_ENABLED` nem o opt-in independente de sincronização do feed.

---

## Flag: `RADAR_ENABLED` (desativada por padrão)

O Radar é controlado de ponta a ponta pela flag de recurso `RADAR_ENABLED`
(`src/shared/constants/featureFlagDefinitions.ts`, categoria `policies`,
`defaultValue: "false"`).

**Quando a flag está desativada, a funcionalidade não existe:**

- Todos os endpoints `/api/radar/*`, incluindo leituras e gravações locais do estado do modelo,
  retornam `404` antes de acessar qualquer módulo do Radar.
- As telas do painel (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) renderizam
  `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) retorna a linha de base inalterada —
  a mesma quantidade de entradas, os mesmos valores, cada entrada marcada com `origin: "baseline"` — e nunca
  lê o cache do feed.
- Nenhuma chamada de rede do Radar é realizada; cada módulo de sincronização retorna `{ status: "disabled" }`
  antes de acessar `fetch`.

Essa é uma proteção estritamente abrangente: ativar a flag desbloqueia as _telas_ e nada
mais. Isso não envia dados, não inicia uma sincronização em segundo plano e não altera
o roteamento nem a seleção de modelos — consulte o opt-in separado abaixo.

---

## A sincronização de dados é um opt-in SEPARADO — a promessa de privacidade

Ativar `RADAR_ENABLED` apenas desbloqueia a interface. A sincronização do feed exige um segundo
opt-in independente, armazenado em `radar_settings.opt_in` (`src/lib/db/radar.ts`,
migração `136_radar_cache_settings.sql`). `syncRadar()` verifica a flag _e_ o
opt-in antes de realizar qualquer chamada de rede:

```
Flag desativada → { status: "disabled" } — nenhuma chamada de rede
Opt-in falso     → { status: "opt_out" }  — nenhuma chamada de rede
```

Quando ambos estão ativados, o fluxo de sincronização é:

1. `GET <feed base URL>/v1/catalog/latest` com `x-omniroute-radar-schema: 2` e um cabeçalho
   opcional `Authorization: Bearer <supporter key>` (veja abaixo). Quando o cabeçalho do esquema está ausente,
   os servidores usam por padrão o artefato de transição v1 assinado separadamente, para que clientes instalados mais antigos
   continuem recebendo atualizações.
2. Esse é um fluxo do aplicativo somente para download, mas ainda é uma solicitação HTTPS. A infraestrutura
   hospedada recebe metadados comuns de conexão, como o IP de origem. Quando uma chave de apoiador
   está configurada, a sincronização também envia essa chave no cabeçalho Bearer para que o serviço possa determinar
   o direito de acesso. Na revisão exata do servidor privado identificada no limite de evidências acima,
   a contabilização das solicitações do feed usa hashes de chaves, uso agregado e um HMAC truncado do IP
   com rotação diária para análise manual de abusos; essas tabelas não armazenam nem a chave nem o IP em formato bruto.
   Os logs de acesso da infraestrutura e a caixa de saída criptografada de entrega constituem limites operacionais
   separados.
3. O OmniRoute nunca envia prompts, respostas, conversas, credenciais de provedores, tráfego de modelos,
   tempo de atividade, latência ou a configuração local de provedores ao serviço Radar.
4. A resposta é verificada, validada e armazenada em cache localmente (consulte
   [Modelo de segurança](#security-model)). O Radar tem exatamente quatro caminhos de rede no lado do servidor:
   `syncRadar()` para o catálogo, `syncRadarReferrals()` para indicações e
   `syncRadarOffers()` / `syncRadarIntel()` para ofertas e Intel exclusivos para apoiadores.

A **chave de apoiador** é um token Bearer opcional (`radar_settings.supporter_key`)
que permite ao serviço de feed decidir qual nível fornecer (consulte
[Níveis](#tiers-community-and-live)). Ela é:

- Armazenada **criptografada em repouso** com os mesmos helpers AES-256-GCM `encrypt()`/`decrypt()`
  (`src/lib/db/encryption.ts`) usados para as credenciais dos provedores.
- Definida por meio de `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) e
  **nunca retornada integralmente** — a resposta retorna uma forma mascarada (`omr_****abcd`).
- Alterá-la ou removê-la invalida atomicamente os caches do catálogo, das indicações, das ofertas e do Intel. A
  próxima sincronização/leitura determina o novo direito de acesso no lado do servidor; salvar uma chave não
  realiza, por si só, uma solicitação de rede nem consome uma chave de ativação de uso único.
- Enviada ao serviço de feed como um token Bearer no GET de sincronização — nenhuma outra informação sobre a
  chave sai do cliente.

---

## Regras de acesso e segurança exibidas antes da adesão

O painel inativo exibe estas regras de
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **antes** de qualquer uma das ações de ativação.
A escala canônica de acesso é:

| Nível                   | Elegibilidade                                                                                             | Acesso                                                      | Regra de repetição/expiração                                                |
| ----------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------- |
| Comunidade              | Qualquer pessoa; nenhuma chave                                                                            | Catálogo completo com atraso de cerca de 30 dias            | Sempre disponível; sem emissão                                              |
| Estrela + seguir        | O OAuth do GitHub verifica tanto uma estrela no repositório quanto se o usuário segue o proprietário      | Uma leitura do catálogo ao vivo e, depois, Comunidade       | Uma emissão por login; nunca reemitida                                      |
| Colaborador Top 10      | Posições de 1 a 10 na classificação semanal completa mais recente                                         | 365 dias ao vivo                                            | Resgatado sob demanda; sair da classificação não reduz um período concedido |
| Colaborador Top 100     | Posições de 11 a 100 nessa classificação                                                                  | 90 dias ao vivo                                             | Mesma regra de resgate sob demanda/idempotente                              |
| Compra de apoiador      | Compra única de 6 meses, 1 ano ou vitalícia                                                               | Catálogo ao vivo, ofertas ao vivo assinadas e Intel         | Sem renovação automática                                                    |
| Doação/concessão manual | Doação analisada pelo proprietário ou concessão do proprietário por um número explícito de dias/vitalícia | Mesmo direito de acesso ao vivo durante o período concedido | Concessão auditada e idempotente                                            |

PRs mesclados, commits e linhas alteradas são **apenas entradas da classificação**. Um login fora do Top 100
não recebe nenhuma concessão de colaborador, independentemente da quantidade de PRs. Compras com prazo finito, doações, períodos de colaborador e
concessões manuais acumulam-se a partir da expiração atual; o acesso vitalício prevalece. Uma mudança de classificação nunca
revoga nem reduz retroativamente o tempo já concedido.

A licença hospedada é pessoal, e a regra apresentada ao usuário é de uma instalação ativa por vez. Esta
versão **não** alega ter um bloqueio de hardware: a sincronização OSS não cria impressões digitais de hardware nem mantém um
lease criptográfico de dispositivo. Na revisão verificada do servidor privado mencionada acima, a fiscalização implementada
consiste na validação do direito de acesso mais um sinal para análise manual quando a mesma chave ativa é detectada a partir de um quarto
endereço IP distinto em até 24 horas. Esse sinal nunca bloqueia nem revoga uma chave automaticamente. A recuperação
revoga e substitui a chave perdida, preservando a expiração existente; ela não reinicia o
período comprado ou concedido.

As ofertas ao vivo são selecionadas manualmente e podem mudar ou expirar. A tela de adesão também informa o limite exato
de privacidade: os metadados assinados do catálogo/das indicações são baixados; uma chave válida também desbloqueia
ofertas assinadas e o Intel; a chave Bearer e os metadados normais de conexão chegam ao serviço hospedado;
prompts, respostas, conversas, credenciais de provedores, tráfego de modelos, tempo de atividade, latência e configuração
local de provedores não chegam.

---

## Como obter uma chave de apoiador

A tela de ativação (`/dashboard/radar`) contém links para dois fluxos destinados à **obtenção** de uma
chave de apoiador. O próprio repositório OSS nunca emite uma chave, nunca executa código de pagamento e
**nunca informa um preço** — os preços são definidos e exibidos exclusivamente nas
páginas de destino, não neste repositório (decisão de especificação D14).

- **"Sou colaborador"** — abre `RADAR_CONTRIBUTOR_CLAIM_URL` (padrão
  `https://radar.omniroute.online/auth/github`), um fluxo de solicitação via GitHub OAuth hospedado no
  servidor privado do Radar. Ele verifica o ranking semanal completo mais recente: os 10 primeiros recebem 365 dias
  e as posições de 11 a 100 recebem 90 dias. Fora dos 100 primeiros, a quantidade de PRs nunca concede acesso; o fluxo
  verifica, em vez disso, o nível separado de uso único baseado em estrela + seguir.
- **"Apoie o projeto"** — abre `RADAR_SUPPORTER_PLANS_URL` (padrão
  `https://radar.omniroute.online/planos`), a página hospedada com as opções de pagamento único de 6 meses, 1 ano e
  vitalícia. A página OSS continua sem exibir qualquer valor monetário.

Ambas as URLs são resolvidas no lado do servidor (`src/lib/radar/links.ts`, seguindo o mesmo padrão de
sobrescrita por variável de ambiente de `RADAR_FEED_URL`) e retransmitidas ao painel pela resposta existente de
`GET /api/radar/settings` (`contributorClaimUrl`, `supporterPlansUrl`) — o
componente cliente nunca lê `process.env` diretamente.

| Variável                      | Finalidade                                                                                                 |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Sobrescreve a URL de solicitação para colaboradores (padrão `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Sobrescreve a URL dos planos para apoiadores (padrão `https://radar.omniroute.online/planos`).             |

### Como recuperar uma chave de apoiador perdida

O ponto de entrada de recuperação do serviço hospedado é `https://radar.omniroute.online/recover`; ele também
está vinculado à página de planos. A recuperação permanece totalmente fora do cliente OSS porque a
instalação local nunca recebe o e-mail do comprador/colaborador e não consegue reconstruir uma chave bruta a partir
das configurações criptografadas.

1. Envie o e-mail associado à chave. O serviço retorna a mesma página de confirmação independentemente de existir ou
   não uma licença recuperável, para que o formulário não permita enumerar contas.
2. Se houver elegibilidade, o worker de entrega enviará um link de uso único e curta duração. Abri-lo transfere
   imediatamente o token para um cookie criptografado transitório `HttpOnly`/`Secure` e redireciona para a URL limpa
   `/recover`; a página não contém token, e-mail, chave antiga nem chave substituta.
3. Confirme a revogação. O serviço privado revoga a chave anterior, cria a substituta com
   o mesmo plano/prazo de validade e a coloca na fila para envio por e-mail em uma única transação. A chave substituta nunca
   é retornada ao navegador.
4. Cole a chave substituta em `/dashboard/radar`. A chave antiga agora deve ser rebaixada para `community`; a
   substituta deve produzir uma sincronização `live` verificada. Reabrir o mesmo link de recuperação deve falhar com
   uma resposta genérica de link inválido/expirado.

A rota de recuperação hospedada e o worker de e-mail podem estar presentes no código e ainda assim indisponíveis em uma determinada
implantação. Não considere o fluxo pronto para produção até que o servidor tenha sido implantado, o provedor de entrega
tenha sido configurado com um destinatário controlado e o link completo de uso único tenha sido testado.

Quando um visitante tiver uma chave (`omr_` + 40 caracteres hexadecimais), a tela de ativação
(`src/app/(dashboard)/dashboard/radar/page.tsx`) terá um campo para colar a chave como caminho
principal: colar uma chave e enviar faz uma chamada a `POST /api/radar/settings`
(`{ optIn: true, supporterKey }`) — colar uma chave simultaneamente a define e ativa a participação,
desbloqueando a tela. O formato (`omr_` + 40 caracteres hexadecimais) é verificado primeiro no lado do cliente
com o helper compartilhado `isValidSupporterKeyFormat()` (`src/lib/radar/supporterKey.ts`)
como uma conveniência de UX; de qualquer forma, o schema Zod do servidor é a validação definitiva. Depois que uma
chave é definida, a tela de ativação exibe a forma mascarada (`supporterKeyMasked` de
`GET /api/radar/settings`) em vez de um campo vazio, com um controle para "alterar chave" a fim de
colar uma nova — a chave bruta nunca é exibida novamente. Os dois botões de solicitação/planos acima
continuam sendo a maneira de _obter_ uma chave inicialmente; esse campo é onde um operador
que já possui uma chave a ativa.

### Ativação de ponta a ponta e configuração guiada

O serviço privado de feed e este cliente OSS têm uma separação deliberadamente restrita: o serviço
emite e valida a chave de apoiador, enquanto a instalação local do OmniRoute criptografa a chave,
sincroniza artefatos assinados no lado do servidor e orienta a configuração do provedor. A ordem da validação assistida é:

1. Obtenha uma chave recém-emitida ou recuperada por meio da reivindicação de colaborador, de planos/checkout, do
   fluxo de recuperação ou de um operador autorizado de servidor privado. Não cole a chave bruta em logs,
   capturas de tela, comentários de issues ou argumentos de linha de comando.
2. Ative a feature flag `RADAR_ENABLED` na instalação local do OmniRoute. Isso disponibiliza a interface,
   mas ela permanece sem atividade de rede até que a opção de participação separada seja salva.
3. Abra `/dashboard/radar`, cole a chave e ative. O navegador envia uma única solicitação local
   `POST /api/radar/settings` com `{ optIn: true, supporterKey }`; a chave é criptografada localmente, e
   a resposta contém apenas `omr_****<last4>`.
4. Deixe a tela de ativação executar a sincronização do catálogo ou selecione **Sincronizar agora**. Confirme se a página
   informa `live`, uma versão do feed e um horário de busca. Para um diagnóstico local autenticado,
   `GET /api/radar/status` informa a participação/presença da chave e os quatro estados de cache sem retornar
   a chave. `POST /api/radar/sync-all` pode atualizar explicitamente o catálogo, as indicações, as ofertas e o Intel.
5. Abra `/dashboard/radar/setup?provider=<provider>`. Acesse a URL de credenciais mantida pelo provedor,
   selecione **Adicionar chave de API**, salve usando o formulário real do provedor, retorne ao guia e execute
   **Testar conexão**. O guia usa as rotas normais `/api/providers` e
   `/api/providers/<connection-id>/test`; ele não cria uma credencial paralela do Radar.
6. Abra `/dashboard/radar/combos` depois que pelo menos duas conexões de provedores compatíveis estiverem ativas.
   Analise a família sugerida e crie a combinação por meio da API de combinações existente. As ofertas e o
   Intel permanecem caches assinados separados e exclusivos do modo live, podendo ser verificados em suas páginas dedicadas do Radar.
7. Recarregue `/dashboard/radar` e a página de configuração. A opção de participação, o estado da chave mascarada, o cache verificado, a conexão
   de provedor salva e a ação de teste devem persistir após o recarregamento. Capture evidências somente depois que a
   chave bruta e a credencial do provedor não estiverem mais visíveis.

Salvar uma chave não é, por si só, prova de uma autorização live. A prova é a combinação do resultado de
`GET /v1/license/check` do serviço privado, do nível `live` fornecido pelo catálogo OSS, de um cache assinado
verificado e do fluxo real de conexão/teste do provedor. Uma chave inválida, expirada ou revogada rebaixa
com segurança o catálogo para `community`; ela não deve ser informada como uma validação bem-sucedida de chave live.

### Link para o painel administrativo privado

`RADAR_ADMIN_URL` adiciona opcionalmente **Administração do Radar ↗** imediatamente após o item do Radar voltado ao usuário
na seção Custos da barra lateral. Deliberadamente, ela não tem valor padrão: quando a variável não está
definida ou é inválida, a barra lateral estática, a paleta de comandos e a tela de personalização da barra lateral não contêm
nenhum item administrativo nem URL privada.

O valor é resolvido no lado do servidor e retransmitido pela resposta
`GET /api/settings`, autenticada para gerenciamento, somente para uma sessão autenticada do painel ou para o proprietário
confiável via loopback durante uma inicialização local sem login. A autenticação por chave de API de CLI, de serviço interno
e com escopo de gerenciamento não recebe esse valor. O navegador valida novamente a resposta antes de materializar
o link externo, que é aberto com `noopener noreferrer`.

Use uma URL HTTPS de túnel/tailnet sem credenciais. HTTP simples é aceito somente para um encaminhamento SSH via loopback,
como `http://127.0.0.1:9351`; outros esquemas, credenciais incorporadas, URLs malformadas e
destinos HTTP remotos falham de forma segura e deixam a navegação inerte.

---

## Modelo de segurança

### Assinatura Ed25519 sobre os bytes exatos

O payload do feed é assinado com Ed25519. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) verifica a assinatura sobre os **bytes exatos da resposta**
recebidos pela rede — o payload nunca é serializado novamente antes da verificação,
portanto uma recodificação byte a byte não pode invalidar nem contornar silenciosamente
a verificação da assinatura. Uma falha na verificação (`invalid_signature`) interrompe
a sincronização antes que o payload seja analisado ou armazenado em cache.

### Chave pública fixada + rotação

A chave pública de verificação é fixada em `src/lib/radar/pinnedKeys.ts`
(`PINNED_FEED_PUBLIC_KEYS`), um array que permite adicionar uma nova chave no início
antes de uma rotação, enquanto feeds antigos em cache, assinados com uma chave anterior,
permanecem válidos até serem sincronizados novamente.

### Substituições por variáveis de ambiente compatíveis com forks

Duas variáveis de ambiente permitem que forks e instalações auto-hospedadas apontem o
cliente para seu próprio feed em vez do serviço padrão da OmniRoute — consulte
[Como auto-hospedar um feed](#how-to-self-host-a-feed) abaixo:

| Variável            | Finalidade                                                                                                     |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| `RADAR_FEED_URL`    | Substitui a URL base do feed (padrão: `https://radar.omniroute.online`).                                       |
| `RADAR_FEED_PUBKEY` | Substitui a chave pública fixada (SPKI DER em base64 ou PEM), trocando o array integrado por esta única chave. |

### Limite mínimo de versão

`syncRadar()` rejeita um feed baixado cuja `version` não seja estritamente mais recente
que a versão atualmente armazenada em cache (`compareVersions()`, comparação pontuada
no formato `YYYY.MM.DD.n`) — `{ status: "stale" }`. Isso impede que um endpoint de feed
comprometido ou configurado incorretamente faça o cliente retroceder para um payload
mais antigo e assinado de forma diferente.

### Duas datas e por que ambas são mantidas

Um feed em cache contém duas datas distintas, e evitar confundi-las é justamente o motivo
para manter ambas:

| Campo         | Origem                 | O que informa                        |
| ------------- | ---------------------- | ------------------------------------ |
| `generatedAt` | corpo assinado do feed | a idade dos **dados**                |
| `fetchedAt`   | relógio da instalação  | quando esta instalação os **baixou** |

Um feed obtido há poucos minutos pode conter números de semanas atrás, portanto
`fetchedAt` por si só não permite que um operador determine se a sobreposição é mais
recente que a linha de base sobre a qual ela se apoia. Ambas são persistidas em
`radar_feed_cache`, retornadas por `getRadarCatalog().meta` e relatadas separadamente
por `GET /api/radar/status`. Uma linha armazenada em cache antes da existência da coluna
`generated_at` (migração 163) é lida como `null` — o desconhecido permanece desconhecido,
em vez de usar o horário de obtenção. `radar_referrals_cache` mantém seu próprio
`generated_at` desde a migração 142.

O limite mínimo de versão acima compara `version`, e não nenhuma das datas.

Duas lacunas permanecem, ambas intencionais: o painel ainda exibe apenas `Última obtenção`,
portanto mostrar ali a data da compilação exige um novo rótulo (e suas 41 entradas de
localidade); e os caches de ofertas e inteligência não mantêm nenhuma data de compilação,
embora seus esquemas de feed contenham uma — por isso, `GET /api/radar/status` omite o
campo para esses dois, em vez de relatar um `null` que seria interpretado como
"desconhecido".

### Validação de esquema

Os bytes baixados são analisados e validados em relação a `RadarFeedSchema`
(`src/lib/radar/feedSchema.ts`, um esquema Zod) **após** a verificação da assinatura.
Uma incompatibilidade de esquema retorna `{ status: "invalid_schema" }`, e o cache
permanece intacto. Como medida defensiva, o payload em cache é validado novamente a
cada leitura (`getRadarCatalog()`) — uma linha de cache corrompida ou editada
manualmente faz com que o sistema volte à linha de base, em vez de fornecê-la.

### Limite de tamanho da resposta (10 MB)

`syncRadar()` aplica um **limite rígido de 10 MB** ao corpo da resposta do feed — o feed
assinado é um documento JSON da ordem de KB, portanto qualquer tamanho acima disso
indica um `RADAR_FEED_URL` mal configurado ou hostil (ou uma origem fornecendo lixo),
e não um catálogo legítimo. A aplicação ocorre em duas camadas:

1. Uma verificação preliminar de `Content-Length` evita completamente a leitura do corpo
   quando o cabeçalho já declara um valor acima do limite.
2. Uma verificação do total acumulado durante a leitura do corpo aplica o limite mesmo
   quando `Content-Length` está ausente ou informa um tamanho menor que o real — o
   cabeçalho nunca é considerado confiável por si só. A concatenação dos fragmentos
   acumulados preserva os bytes exatos necessários para a verificação posterior da
   assinatura Ed25519.

Exceder o limite retorna `{ status: "too_large" }` e mantém o cache intacto, seguindo o
mesmo padrão não destrutivo de todas as outras falhas de sincronização
(`invalid_signature`, `invalid_schema`, `stale`).

---

## Níveis: `community` e `live`

O esquema do feed contém um campo `tier: "community" | "live"`, definido **no lado do servidor**
pelo serviço de feed com base na solicitação (presença e validade da chave de apoiador)
— o cliente nunca define seu próprio nível.

- **`community`** — o catálogo gratuito, com uma defasagem de aproximadamente 30 dias em relação aos dados
  mais recentes. É o que recebe uma solicitação não autenticada ou com uma chave inválida.
- **`live`** — o catálogo mais recente, fornecido às solicitações que incluem uma chave de apoiador
  válida.

**Uma chave de apoiador inválida ou expirada rebaixa o nível para `community` — isso nunca é um
erro.** O fluxo de sincronização distingue apenas falhas de assinatura/esquema/versão (todas
recuperáveis e não fatais para o estado em cache) de um `{ status:
"updated", version, tier }` bem-sucedido. Não há um fluxo de erro específico de nível que o cliente precise
tratar.

### O nível fornecido vem de um cabeçalho de resposta, não do corpo assinado

O campo `tier` do **corpo** assinado do feed é sempre `"live"` — o serviço de feed distribui
**dois artefatos assinados por versão**: o live inclui campanhas atuais e o community
as omite. Cada artefato é assinado sobre seus próprios bytes exatos. O corpo ainda não
serve como decisão de direito de acesso; o nível efetivamente selecionado para uma solicitação é informado
no **cabeçalho de resposta `x-omniroute-feed-tier`**, definido no lado do servidor a partir da chave
`Authorization` da solicitação.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) é o único lugar
que determina o nível em que o cliente deve confiar:

1. Analisa `x-omniroute-feed-tier` com `RadarTierSchema` (Zod) — um cabeçalho ausente ou
   um valor que não seja exatamente `"community"` ou `"live"` é tratado como **não
   presente** (nunca é usado no cache/UI como está; isso também abrange servidores de feed
   mais antigos que antecedem o cabeçalho).
2. Recorre ao campo `tier` do corpo assinado (sempre `"live"`) somente quando a etapa 1
   não produz nenhum resultado.
3. O nível determinado é o que fica armazenado em cache e é retornado como `{ status: "updated",
version, tier }` — esse é o valor exibido pelo dashboard, nunca o campo bruto do
   corpo.

---

## Regras de mesclagem da sobreposição no momento da leitura

`applyFeed()` (`src/lib/radar/applyFeed.ts`) mescla o feed armazenado em cache **sobre** a
linha de base estática no **momento da leitura**, dentro de `getRadarCatalog()`. O array da linha de base
(`FREE_MODEL_BUDGETS`) nunca sofre mutação — um `MergedEntry[]` é calculado novamente a cada
chamada.

Quatro regras, em ordem de precedência:

1. **O feed nunca sobrescreve uma substituição local.** Por campo: se o operador tiver
   personalizado um campo de uma entrada (mapa `localOverrides`, indexado por `provider:modelId`),
   o valor do feed para esse campo específico é ignorado — o valor do operador prevalece.
2. **`enabled: false` desabilita a entrada, com proveniência.** Uma entrada do feed que
   desativa uma entrada define `enabled: false` e `disabledBy: "radar"` no resultado mesclado,
   para que a UI possa explicar _por que_ uma entrada passou de disponível para desabilitada.
3. **Uma entrada adicionada pelo usuário e ausente do feed permanece intacta.** Entradas que
   existem apenas na linha de base (ou foram adicionadas localmente) e não têm uma entrada correspondente no feed
   são mantidas sem alterações.
4. **Uma entrada com tombstone nunca é restaurada.** Se o operador tiver excluído explicitamente uma
   entrada (conjunto `tombstones`), o feed voltar a adicionar esse `provider:modelId` em uma versão
   posterior não a trará de volta.

Os campos editáveis e os tombstones são persistidos em
`radar_local_model_state` (migração `153_radar_local_model_state.sql`). O adaptador público de banco de dados
(`src/lib/db/radar.ts`) converte essas linhas no mapa `localOverrides` e no conjunto
`tombstones` usados por `applyFeed()`; em produção, `getRadarCatalog()` carrega esse estado
depois que as verificações de flag, cache e esquema são aprovadas. Somente `displayName` e `enabled` são
editáveis pelo operador. A identidade do provedor/modelo, a proveniência do feed, a cota, os recursos, os termos de serviço
e os dados de configuração não podem ser gravados por meio dessa interface.

O dashboard disponibiliza quatro ações locais:

- **Editar** altera o nome de exibição local e o estado habilitado.
- **Redefinir alterações locais** limpa ambos os campos editáveis sem alterar um tombstone.
- **Ocultar** cria um tombstone, para que atualizações posteriores do feed não possam recriar a linha.
- **Restaurar** remove o tombstone; qualquer substituição salva separadamente permanece em vigor.

Um `enabled: false` do feed continua sendo a exceção de segurança: ele prevalece sobre um
`enabled: true` local obsoleto, mantém a entrada mesclada desabilitada e registra `disabledBy: "radar"`.

As publicações do catálogo usam `schemaVersion: 2`. `contextWindow` e cada um de `tools`, `vision` e
`thinking` são, de forma independente, `number | null` / `boolean | null`: `null` significa desconhecido, enquanto
`false` significa que uma fonte oficial do provedor, confirmada pelo D16, declara explicitamente que o recurso está ausente.
Flags internas de registro/especificação de modelo do OmniRoute nunca são promovidas diretamente a fatos do feed. O cliente
ainda aceita snapshots v1; como o builder antigo usava `false` como marcador de ausência, `false` na v1 é
normalizado como desconhecido, enquanto `true` na v1 permanece factual. Versões de esquema desconhecidas falham de forma segura, e o
último cache válido permanece disponível. Todo modelo v2 com contexto/recurso não nulo deve conter
um `metadataEvidenceUrls[]` HTTPS que não exija credenciais; caso contrário, a validação do esquema falha e o cache
não é substituído. A tabela do catálogo renderiza os três estados como `✓`, `✕` e `?`.

### Combos guiados e acesso ao MCP

Valores confirmados de `familyId` permanecem após a sobreposição no momento da leitura e alimentam o módulo puro
`buildRadarComboSuggestions()` (`src/lib/radar/comboSuggestions.ts`). Uma família é sugerida
somente quando pelo menos dois provedores distintos têm conexões ativas e disponibilizam o ID exato do modelo selecionado.
Modelos desabilitados, provedores inativos, IDs de modelo ausentes, famílias com um único elemento e correspondências
ambíguas de alias/prefixo falham de forma segura. As sugestões usam a estratégia `priority` existente, ordenando primeiro o
maior orçamento mensal recorrente; a UI as cria somente por meio de `POST /api/combos`.

A interface guiada está disponível em `/dashboard/radar/combos`. Ela lê apenas os endpoints locais
`GET /api/radar/catalog` e `GET /api/combos/builder/options`. Ela nunca aciona a sincronização do Radar,
lê credenciais de provedores nem grava diretamente no banco de dados de combos.

Os clientes MCP podem ler a mesma projeção local com `omniroute_radar_catalog` (`read:radar`). Os
filtros opcionais `provider`, `familyId` e `enabledOnly` são avaliados após uma leitura local de
`GET /api/radar/catalog`. Sua saída fechada inclui metadados do catálogo, além de provedor/modelo,
nome de exibição, `familyId`, cota, recursos, estado de ativação, origem e `disabledBy`; URLs de configuração,
etapas, conexões, endereços de e-mail, chaves e dados de indicação nunca são retornados. Essa ferramenta é
somente leitura e nunca invoca `/api/radar/sync`.

### Marcadores de proveniência

Cada entrada mesclada contém um campo `origin`, que a interface renderiza como um selo:

- `"baseline"` — inalterada em relação ao catálogo estático da versão.
- `"radar"` — um ou mais campos foram atualizados pelo feed.
- `"local"` — o operador tem pelo menos uma substituição local nesta entrada (as
  substituições locais sempre prevalecem sobre o feed conforme a regra 1, independentemente do que o feed informar).

---

## Superfícies locais — nunca um proxy de feed

As famílias de rotas locais do Radar abaixo dão suporte à interface em `src/app/api/radar/`:

| Rota                           | Método | Finalidade                                                                                                                                  |
| ------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET    | Retorna o catálogo mesclado (`getRadarCatalog()`) do cache local.                                                                           |
| `/api/radar/sync`              | POST   | Aciona `syncRadar()` no servidor; retorna o status resultante.                                                                              |
| `/api/radar/settings`          | GET    | Retorna `{ optIn, hasSupporterKey, supporterKeyMasked }` — nunca a chave bruta.                                                             |
| `/api/radar/settings`          | POST   | Define a adesão e/ou a chave de apoiador (criptografada).                                                                                   |
| `/api/radar/referrals`         | GET    | Retorna `{ fixed, campaigns, tier }` do cache local — consulte [Links de indicação](#referral-links-free-credits) abaixo.                   |
| `/api/radar/offers`            | GET    | Retorna ofertas ativas do cache local dinâmico verificado; nunca retorna a chave de apoiador.                                               |
| `/api/radar/offers/sync`       | POST   | Aciona o pipeline `syncRadarOffers()` no servidor, exclusivo para chaves dinâmicas.                                                         |
| `/api/radar/intel`             | GET    | Retorna informações Intel locais e dinâmicas verificadas, além de um booleano de reconhecimento de apoiador; nunca uma identidade ou chave. |
| `/api/radar/intel/sync`        | POST   | Aciona o pipeline `syncRadarIntel()` no servidor, exclusivo para chaves dinâmicas.                                                          |
| `/api/radar/status`            | GET    | Retorna o status somente leitura das configurações e do cache locais para catálogo, indicações, ofertas e Intel, sem segredos.              |
| `/api/radar/sync-all`          | POST   | Executa os quatro módulos de sincronização no servidor e retorna um status separado para cada feed.                                         |
| `/api/radar/local-model-state` | GET    | Lista substituições persistidas e marcadores de exclusão para os controles de edição/restauração.                                           |
| `/api/radar/local-model-state` | PATCH  | Define ou limpa os campos validados de substituição `displayName`/`enabled`.                                                                |
| `/api/radar/local-model-state` | PUT    | Cria ou remove um marcador de exclusão com `{ provider, modelId, tombstoned }`.                                                             |
| `/api/radar/local-model-state` | DELETE | Limpa os campos editáveis de substituição, preservando qualquer marcador de exclusão.                                                       |

**Regra rígida: essas rotas nunca atuam como proxy do serviço de feed.** O navegador se comunica
exclusivamente com o servidor OmniRoute local. Os quatro módulos que acessam o serviço Radar são
`src/lib/radar/sync.ts` (catálogo), `src/lib/radar/referralsSync.ts` (indicações) e
`src/lib/radar/offersSync.ts` (ofertas), além de `src/lib/radar/intelSync.ts` (Intel); todos são executados
no servidor, nunca no cliente. Isso mantém
a URL do feed e qualquer chave de apoiador completamente fora do tráfego de rede voltado ao cliente.

Todos os endpoints do Radar retornam `404` quando `RADAR_ENABLED` está desativado (consulte
[Flag](#flag-radar_enabled-default-off) acima) e processam as respostas de erro por meio de
`buildErrorBody()`/`sanitizeErrorMessage()`, conforme a regra de sanitização de erros de todo o repositório
(`docs/security/ERROR_SANITIZATION.md`).

### Autenticação

Todos os endpoints do Radar exigem autenticação por meio de `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) — um cookie de sessão do painel ou uma chave de API com escopo de
gerenciamento, a mesma barreira que protege o restante de `/api/settings/*`. A verificação de `404`
com a flag desativada sempre é executada **antes** da verificação de autenticação, portanto uma instalação com `RADAR_ENABLED`
desativado permanece idêntica byte a byte (sem solicitação de autenticação apenas para descobrir que a superfície não existe);
depois que a flag é ativada, uma solicitação não autenticada recebe `401` antes de qualquer leitura ou
gravação no banco de dados. `GET /api/radar/settings` nunca retorna a chave de apoiador bruta, independentemente do
estado de autenticação — apenas a forma mascarada e um booleano `hasSupporterKey`.

---

## Ofertas para apoiadores

As ofertas usam seu próprio artefato assinado, `GET /v1/offers/latest`, e nunca compartilham o cache do catálogo ou de indicações. O endpoint do servidor exige uma chave Bearer válida de apoiador ativo; não há fallback para a comunidade. Portanto, `syncRadarOffers()` é interrompida antes do acesso à rede quando o sinalizador do recurso está desativado, o operador não consentiu ou nenhuma chave de apoiador está configurada.

Após um GET bem-sucedido, o cliente verifica a assinatura Ed25519 sobre os bytes exatos da resposta, valida `RadarOffersFeedSchema`, exige que tanto o corpo assinado quanto o cabeçalho `x-omniroute-feed-tier` indiquem `live`, impõe uma versão pontuada estritamente mais recente e, somente então, substitui atomicamente `radar_offers_cache` (migração `144_radar_offers_cache.sql`). Aplica-se o mesmo limite de 10 MB para cabeçalho mais fluxo usado pelos outros feeds. Falhas de assinatura, esquema, nível, replay, tamanho, HTTP e rede preservam o último cache verificado.

O formato fechado de oferta oferece suporte a três tipos comparáveis de benefício: porcentagem em pontos-base, crédito em unidades monetárias menores ou dias de avaliação. Uma oferta de parceiro deve incluir uma referência pública do mesmo tipo, e seu benefício deve ser estritamente maior; ofertas oficiais não têm referência de parceiro. As URLs devem usar HTTPS e não conter credenciais. `getRadarOffers()` revalida defensivamente o payload em cache e filtra entradas expiradas em cada leitura local; `/dashboard/radar/offers` filtra novamente os itens expirados antes da renderização, usa texto em português quando disponível, com fallback para inglês, e identifica explicitamente as ofertas de parceiros.

O navegador acessa apenas rotas locais: ele lê o snapshot mascarado das configurações, solicita a `POST /api/radar/offers/sync` que atualize os dados no lado do servidor e, em seguida, consulta `GET /api/radar/offers`. Sem uma chave, ele exibe os links existentes de contribuição/apoio em vez de tentar solicitar um feed. Os links externos de ofertas são abertos em uma nova aba com `noopener noreferrer`. Nenhuma ferramenta MCP `radar_offers` é disponibilizada nesta versão.

---

## Radar Intel, distintivo de apoiador e CLI

O Intel é um artefato assinado em `GET /v1/intel/latest`. O `RadarIntelFeedSchema` fechado aceita apenas classificações ELO de propriedade do Radar, derivadas pelo curador privado a partir de comparações confirmadas, e diferenças factuais de idade/contagem do catálogo, derivadas de snapshots assinados do catálogo. A metodologia é fixa, com classificação inicial de 1000 e K=32. Uma classificação vazia é válida quando nenhuma comparação foi confirmada; o cliente nunca sintetiza uma.

`syncRadarIntel()` aplica o mesmo Bearer no lado do servidor, timeout de 30 segundos, limite de fluxo de 10 MiB, verificação Ed25519 dos bytes exatos, esquema estrito, requisito de `live` no corpo/cabeçalho, versão mínima e preservação do último cache válido usados nas ofertas. Após a persistência de um snapshot ativo verificado, o cliente deriva `radar:<sha256(supporter key)>`, armazena apenas essa identidade unidirecional e emite o evento de reconhecimento dedicado `radar_supporter`. Seu distintivo `radar-supporter` é idempotente e concede zero XP; ele nunca atualiza placares de líderes nem reutiliza `token_share`. `/dashboard/radar/intel` renderiza o distintivo somente a partir de metadados verificados do cache local.

A CLI disponibiliza `omniroute radar status` e `omniroute radar sync`. Ambos se comunicam somente com a API local do OmniRoute. `status` realiza um `GET /api/radar/status` somente para leitura; `sync` envia um único `POST /api/radar/sync-all` e exibe um resultado para cada feed. Nenhum dos comandos lê, aceita ou exibe a chave de apoiador, e nenhum deles acessa diretamente o serviço Radar.

---

## Links de indicação (créditos gratuitos)

Os links de indicação são fornecidos por um feed **independente e sempre atualizado** —
`GET /v1/referrals/latest` — separado do feed do catálogo. Isso é intencional: o
feed do catálogo no nível community é um snapshot que pode estar até 30 dias
desatualizado, portanto um link de indicação extraído dele costumava ficar defasado em
relação à lista real de links do servidor pelo mesmo período (uma indicação
recém-adicionada poderia levar até um mês para chegar a um usuário free/community).
O feed de indicações elimina esse atraso ao sincronizar em sua própria cadência, muito
mais curta.

```ts
// Corpo da resposta de GET /v1/referrals/latest (assinado com Ed25519, mesma chave fixada
// usada pelo feed do catálogo):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — determinístico: max(updatedAt) entre os links
                                  // de indicação, portanto duas solicitações idênticas
                                  // produzem exatamente os mesmos bytes/assinatura
  referrals: {
    fixed: RadarReferral[],      // presente em TODOS os níveis, incluindo no-auth/community
    campaigns: RadarReferral[],  // preenchido somente para uma chave Bearer live (supporter)
                                  // válida; solicitações no-auth/com chave expirada recebem []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

Diferentemente do feed do catálogo, esse corpo não contém nenhum campo `tier` — o
servidor decide o que incluir em cada solicitação com base na chave `Authorization`,
portanto o cabeçalho de resposta `x-omniroute-feed-tier` é a ÚNICA fonte para o nível
fornecido (`referralsSync.ts::syncRadarReferrals`); um cabeçalho ausente/não reconhecido
é rebaixado para `"community"`, a suposição com menos privilégios.
`RadarReferralsFeedSchema` (`src/lib/radar/referralsFeedSchema.ts`) valida o corpo
inteiro, reutilizando o mesmo `RadarReferralSchema` por indicação exportado de
`feedSchema.ts`, para que ambos os feeds validem indicações individuais de maneira
idêntica. Todo `RadarReferral.url` deve usar `https://` — uma URL `http://` não passa
na validação do schema.

O ANTIGO campo `referrals` incorporado ao catálogo em `RadarFeedSchema`
(`feedSchema.ts`) é mantido para compatibilidade retroativa com feeds do catálogo já
armazenados em cache, mas `getRadarReferrals()` não o lê mais — consulte
[Acessor](#accessor) abaixo.

### Sincronização

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) é o ÚNICO módulo que
acessa a rede para obter indicações, reproduzindo exatamente o contrato de
`syncRadar()`: flag desativada → `disabled`; opt-in falso → `opt_out`; baixa
`${RADAR_FEED_URL}/v1/referrals/latest` (com as mesmas substituições de fork por
`RADAR_FEED_URL`/`RADAR_FEED_PUBKEY` usadas pelo catálogo), verifica a assinatura
Ed25519 sobre os bytes exatos da resposta (`verifyFeedBytes`), valida usando
`RadarReferralsFeedSchema` e armazena em cache na tabela `radar_referrals_cache`
(migração `142_radar_referrals_cache.sql`) — uma tabela totalmente separada de
`radar_feed_cache`, usada pelo catálogo. Um limite de resposta de 10 MB e um piso para
`generatedAt` rejeitam um feed recebido que seja mais antigo que o armazenado em cache,
protegendo contra a reprodução de um artefato assinado mais antigo. Um timestamp igual
é aceito: o servidor fornece intencionalmente às variantes de indicação community e
live o mesmo `generatedAt` determinístico, para que o payload assinado e o nível
fornecido possam mudar após uma alteração na chave supporter sem que o conjunto de links
subjacente seja alterado. Nunca lança uma exceção — sempre retorna um objeto de status;
os erros nunca incluem um stack trace em `reason`.

Dois gatilhos mantêm o cache de indicações atualizado, ambos independentes da cadência
de 24h do próprio catálogo:

- **Sincronização na leitura** — o próprio `GET /api/radar/referrals` chama
  `syncRadarReferrals()` inline sempre que o cache está ausente ou tem mais de
  `REFERRALS_STALE_MS` (1h, `shouldSyncReferralsOnRead()`), antes de fornecer a
  resposta. É isso que mantém os links fixos "sempre atualizados" já para o próximo
  carregamento do dashboard, sem aguardar nenhum timer em segundo plano.
- **Sincronização paralela do agendador** — `radarSchedulerTick()` (`scheduler.ts`)
  avalia de forma independente a obsolescência das indicações no mesmo tick de hora em
  hora usado pelo catálogo, chamando `syncRadarReferrals()` quando necessário. Isso é
  executado independentemente de o próprio catálogo precisar de atualização naquele
  tick e nunca afeta o formato de `RadarTickResult` (apenas um efeito colateral de
  melhor esforço, ignorado em caso de erro).

### Acessor

`src/lib/radar/index.ts` exporta dois acessores somente leitura, e nenhum deles lança
exceções (o mesmo contrato defensivo de `getRadarCatalog()` — flag desativada, ausência
de cache ou um payload corrompido no cache resultam no formato vazio em vez de um erro):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  lendo de `radar_referrals_cache` (por meio de `getRadarReferralsCache()`) e validando
  com `RadarReferralsFeedSchema` — **não** o cache do catálogo.
- `getDefaultReferralFor(provider)` → a indicação `fixed` com `isDefault: true` para
  esse provedor, ou `null`. Consulta apenas `fixed` — uma campanha nunca é usada como
  link "padrão" de um provedor.

A regra efetiva que determina "qual indicação é a padrão para um provedor" está em
`findDefaultReferral()` (`src/lib/radar/referrals.ts`), uma pequena função pura **sem
importação de DB** — é seguro importá-la em um componente `"use client"`.
`getRadarReferrals`/`getDefaultReferralFor` (em `index.ts`) importam
`@/lib/db/radar` e, portanto, permanecem exclusivos do servidor; o dashboard de
provedores importa `referrals.ts` diretamente em vez de `index.ts` (veja abaixo), para
evitar incluir `better-sqlite3` no bundle do navegador.

### `GET /api/radar/referrals`

Segue exatamente a mesma ordem de verificações de todas as outras rotas do Radar: `RADAR_ENABLED` desativado →
`404` (verificado primeiro, inércia idêntica byte a byte); não autenticado → `401`; caso contrário,
aciona uma sincronização na leitura (veja acima) quando os dados estão desatualizados e, em seguida, retorna `200` com
`{ fixed, campaigns, tier }` — `tier` vem diretamente da linha do cache (possivelmente recém-atualizada)
e é puramente informativo (determina o texto de upsell sutil da UI abaixo). Nunca
atua diretamente como proxy do servidor de feed — o próprio código-fonte da rota não contém nenhuma chamada `fetch(`;
a rede só é acessada dentro de `syncRadarReferrals()`, seguindo o mesmo princípio de usar
apenas o cache local de `/api/radar/catalog`.

### UI do dashboard — aba "Créditos grátis" em `/dashboard/radar`

Reutiliza a página existente do Radar (`src/app/(dashboard)/dashboard/radar/page.tsx`) como uma
segunda aba, em vez de criar uma nova rota — menor superfície de roteamento/i18n para uma funcionalidade que é uma
variação dos dados que a página já busca. Após a adesão, a barra de abas oferece
**Catálogo** (tabela existente) e **Créditos grátis**:

- Os links fixos são agrupados por provedor, cada um exibindo `requiredAction` (quando presente)
  e um botão com `target="_blank" rel="noopener noreferrer"` para a URL de indicação.
- As campanhas exibem as mesmas informações, além de `validUntil` quando presente.
- Quando `campaigns` está vazio **e** o nível fornecido é `community`, a UI exibe uma
  breve observação de upsell ("campanhas por tempo limitado são um extra para apoiadores") — isso **nunca**
  oculta nem restringe a lista de links fixos, que permanece totalmente preenchida para todos os níveis. O
  upsell é apenas uma mensagem sutil, nunca um bloqueio.

### Link de indicação no nome do provedor (dashboard de provedores)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
já vinculava o nome do provedor a `providerInfo.website` quando presente, com um
precedente para um link monetizado: a observação do link de parceiro da Kimi (Moonshot AI)
(chave de i18n `providers.kimiPartnerLinkNote`). O D28 reutiliza exatamente o mesmo padrão de observação discreta
para indicações padrão do Radar, em vez de introduzir uma nova chave.

Baixo acoplamento, por design:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  é uma função **pura** — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — sem dependência de `@/lib/radar` ou `@/lib/db/*`. O arquivo `providerPageUtils.ts` como um
  todo permanece livre dessas importações (garantido por
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (um componente `"use client"`) é o único local autorizado
  a buscar dados do Radar — por meio de `fetch("/api/radar/referrals")`, seguindo o mesmo padrão de rota local
  usado pela própria página do dashboard do Radar — e calcula a indicação padrão
  no cliente com `findDefaultReferral()` do arquivo `src/lib/radar/referrals.ts`, que não depende do banco de dados.
- Com `RADAR_ENABLED` desativado, a busca retorna 404, `referralUrl` permanece `null` e
  `resolveProviderHeaderLink()` retorna o `website` estático do catálogo sem alterações — a
  página do provedor permanece idêntica byte a byte ao que era antes da existência dessa funcionalidade. O mesmo ocorre quando
  ainda não há cache ou não há uma indicação padrão para esse provedor específico.
- Quando uma indicação padrão se aplica, `ProviderPageHeader` recebe `isReferralLink`
  e exibe a mesma observação/tooltip discreta do link de parceiro da Kimi (reutilizando a
  chave `providers.kimiPartnerLinkNote`) — nunca um tratamento visual novo e separado.

---

## Como auto-hospedar um feed

Um fork ou serviço auto-hospedado que queira controle total sobre o catálogo pode executar seu próprio
serviço de feed sem alterar o código do cliente:

1. Disponibilize um endpoint `GET /v1/catalog/latest` que retorne um corpo JSON em conformidade com
   `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) — no nível superior, `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`,
   `quirks` e `totals`. Respeite `x-omniroute-radar-schema: 2`; um servidor compatível com a transição
   deve direcionar, por padrão, as solicitações que não o incluam para um artefato v1 assinado separadamente.
2. Assine os bytes exatos da resposta com um par de chaves Ed25519 e retorne a assinatura
   em base64 no cabeçalho de resposta `x-omniroute-feed-signature`.
3. Defina `RADAR_FEED_URL` como a nova URL base e `RADAR_FEED_PUBKEY` como a chave
   pública correspondente (SPKI DER em base64 ou PEM) — consulte a
   [referência de variáveis de ambiente](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Habilite `RADAR_ENABLED` e faça a adesão por meio de `POST /api/radar/settings`
   (`{ optIn: true }`).

Nenhuma outra alteração de código é necessária — `verifyFeedBytes()` detecta a substituição
automaticamente (`getFeedPublicKeys()` em `src/lib/radar/pinnedKeys.ts`), e a comparação de
versões, a validação de esquema e as regras de mesclagem são aplicadas de forma idêntica a um feed
auto-hospedado.

Links de indicação (consulte [Links de indicação (créditos gratuitos)](#referral-links-free-credits)
acima) são um artefato opcional e separado: um fork que disponibiliza apenas `/v1/catalog/latest`
continua funcionando plenamente — `syncRadarReferrals()` degrada para `{ status: "error" }` ao receber um `404`
de `/v1/referrals/latest`, e o cache simplesmente permanece vazio; assim,
`GET /api/radar/referrals` continua retornando `{ fixed: [], campaigns: [], tier: null }`
em vez de causar falha no restante da página. Para também oferecer links de indicação, disponibilize
`GET /v1/referrals/latest` em conformidade com `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) e assine-o com o mesmo par de chaves Ed25519 usado
no feed do catálogo.

As ofertas para apoiadores são outro artefato opcional. Para disponibilizá-las, implemente
`GET /v1/offers/latest` com o `RadarOffersFeedSchema` fechado
(`src/lib/radar/offersFeedSchema.ts`), exija uma autorização ativa, retorne
`x-omniroute-feed-tier: live` e assine os bytes exatos com a mesma chave. Um fork que omita esse
endpoint mantém inalterado o comportamento do catálogo e das indicações; a atualização das ofertas falha sem causar efeitos destrutivos, e
o último cache local de ofertas verificado permanece disponível.

O Intel é opcional da mesma forma. Um serviço auto-hospedado pode disponibilizar `GET /v1/intel/latest` usando
`RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`), exigir uma autorização ativa, retornar
`x-omniroute-feed-tier: live` e assinar os bytes exatos com a chave Ed25519 compartilhada. Omitir o
endpoint mantém inalterados o catálogo, as indicações e as ofertas; a atualização do Intel preserva qualquer último
snapshot local verificado.

---

## Documentação relacionada

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — o
  padrão de resposta de erro seguido pelas rotas `/api/radar/*`.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — referência de `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY`.
