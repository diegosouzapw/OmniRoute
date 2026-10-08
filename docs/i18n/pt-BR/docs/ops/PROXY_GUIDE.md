# 🌐 OmniRoute Proxy Guide (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Contorne bloqueios geográficos, proteja sua identidade e roteie o tráfego de IA por qualquer proxy — sem nenhuma complexidade de configuração.**

O OmniRoute inclui um sistema completo de gerenciamento de proxies que permite rotear o tráfego dos provedores de IA upstream por proxies HTTP, HTTPS ou SOCKS5. Esteja você em uma região bloqueada, precise de rotação de IP ou queira ocultar sua impressão digital — este guia aborda tudo.

---

## Sumário

- [Por que usar proxies?](#por-que-usar-proxies)
- [Visão geral da arquitetura](#visão-geral-da-arquitetura)
- [Sistema de proxies em 4 níveis](#sistema-de-proxies-em-4-níveis)
- [Registro de proxies (CRUD)](#registro-de-proxies-crud)
- [Marketplace gratuito 1proxy](#marketplace-gratuito-1proxy)
- [Rotação de proxies](#rotação-de-proxies)
- [Antidetecção e modo furtivo](#antidetecção-e-modo-furtivo)
- [Modos de proxy upstream](#modos-de-proxy-upstream)
- [Interface do painel](#interface-do-painel)
- [Referência da API](#referência-da-api)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Solução de problemas](#solução-de-problemas)

---

## Por que usar proxies?

Muitos provedores de IA restringem o acesso por região geográfica. Desenvolvedores na **Rússia, China, Irã, Cuba, Turquia** e em outros países encontram erros como:

```
unsupported_country_region_territory
```

Mesmo fora das regiões bloqueadas, os proxies são úteis para:

| Caso de uso             | Descrição                                                            |
| ----------------------- | -------------------------------------------------------------------- |
| **Contorno geográfico** | Acessar OpenAI, Anthropic, Codex e Copilot em países bloqueados      |
| **Rotação de IP**       | Distribuir solicitações entre vários IPs para evitar limites de taxa |
| **Privacidade**         | Ocultar seu IP real dos provedores upstream                          |
| **Conformidade**        | Rotear o tráfego por jurisdições específicas                         |
| **Testes**              | Simular solicitações de diferentes regiões                           |

---

## Visão geral da arquitetura

```
┌───────────────────────────────────────────────────────────────┐
│                       Servidor OmniRoute                      │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Registro de │    │ Despachante  │    │ Fetch (undici)   │  │
│  │ proxies     │───▶│ de proxies   │───▶│                  │  │
│  │ (SQLite)    │    │ (em cache)   │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ Sincroniz.  │                        │ API do provedor  │  │
│  │ 1proxy      │                        │ upstream         │  │
│  │ (pool grát.)│                        │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Componentes principais

| Componente                 | Arquivo                                      | Função                                                      |
| -------------------------- | -------------------------------------------- | ----------------------------------------------------------- |
| **Registro de proxies**    | `src/lib/db/proxies.ts`                      | CRUD de entradas de proxy + atribuições de escopo           |
| **Despachante de proxies** | `open-sse/utils/proxyDispatcher.ts`          | Cria dispatchers ProxyAgent/SOCKS do `undici` com cache     |
| **Fetch via proxy**        | `open-sse/utils/proxyFetch.ts`               | Encapsula `fetch()` com a injeção de um dispatcher de proxy |
| **Rota de configurações**  | `src/app/api/settings/proxy/route.ts`        | API legada de configuração de proxy (GET/PUT/DELETE)        |
| **Rota de gerenciamento**  | `src/app/api/v1/management/proxies/route.ts` | API CRUD do registro (GET/POST/PATCH/DELETE)                |
| **Banco de dados 1proxy**  | `src/lib/db/oneproxy.ts`                     | Persistência do marketplace de proxies gratuitos            |

---

## Sistema de Proxy em 4 Níveis

O OmniRoute oferece suporte à configuração de proxy em **quatro escopos independentes**, resolvidos em ordem de prioridade:

```
Ordem de resolução de prioridade (mais alta → mais baixa):

  1. 🔵 Proxy de conta/conexão    →  por chave de API / conexão OAuth
  2. 🟡 Proxy de provedor         →  por provedor (por exemplo, todo o tráfego da OpenAI)
  3. 🟠 Proxy de combinação       →  por configuração de combinação/roteamento
  4. 🟢 Proxy global              →  todo o tráfego, todos os provedores
```

### Como a resolução funciona

Quando o OmniRoute envia uma solicitação para um provedor upstream, ele chama `resolveProxyForConnectionFromRegistry()`, que verifica cada nível na ordem:

1. **Nível da conta** — Há um proxy atribuído a este ID de conexão específico?
2. **Nível do provedor** — Há um proxy atribuído a este provedor (por exemplo, `openai`)?
3. **Nível global** — Há um proxy global configurado?
4. **Sem proxy** — Conexão direta com o provedor.

A primeira correspondência prevalece. Isso significa que você pode definir um proxy global como fallback, mas substituí-lo para provedores ou conexões específicos.

### O que passa pelo proxy

| Tipo de tráfego          | Usa proxy? | Observações                                    |
| ------------------------ | ---------- | ---------------------------------------------- |
| Conclusões de chat       | ✅         | Todas as solicitações `/v1/chat/completions`   |
| Embeddings               | ✅         | `/v1/embeddings`                               |
| Geração de imagens       | ✅         | `/v1/images/generations`                       |
| Áudio (TTS/STT)          | ✅         | `/v1/audio/*`                                  |
| Troca de token OAuth     | ✅         | Resolve `unsupported_country_region_territory` |
| Testes de conexão        | ✅         | O botão "Test Connection" usa o proxy          |
| Renovação de token       | ✅         | Renovação de OAuth em segundo plano            |
| Sincronização de modelos | ✅         | Listagem e descoberta de modelos               |

---

## Registro de Proxies (CRUD)

O registro de proxies é uma tabela SQLite (`proxy_registry`) que armazena todos os seus proxies. Cada proxy possui:

| Campo      | Tipo    | Descrição                                                  |
| ---------- | ------- | ---------------------------------------------------------- |
| `id`       | UUID    | Identificador exclusivo                                    |
| `name`     | String  | Rótulo legível por humanos                                 |
| `type`     | String  | Protocolo: `http`, `https`, `socks5`                       |
| `host`     | String  | Nome de host ou IP do proxy                                |
| `port`     | Integer | Número da porta                                            |
| `username` | String  | Nome de usuário de autenticação (criptografado em repouso) |
| `password` | String  | Senha de autenticação (criptografada em repouso)           |
| `region`   | String  | Rótulo da região geográfica                                |
| `notes`    | String  | Observações em texto livre                                 |
| `status`   | String  | `active` ou `inactive`                                     |
| `source`   | String  | `manual` ou `oneproxy`                                     |

### Criando um proxy

**Pelo Dashboard:**

1. Acesse **Settings → Proxy**
2. Clique em **Add Proxy**
3. Preencha o tipo, host, porta e as credenciais de autenticação opcionais
4. Salve

**Pela API:**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### Atualizando um proxy

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Observação:** As credenciais são preservadas, a menos que você envie explicitamente substituições não vazias. O envio de strings vazias para `username`/`password` manterá os valores armazenados.

### Excluindo um proxy

```bash
# Falha se o proxy estiver atribuído a qualquer escopo
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Força a exclusão (também remove as atribuições)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Listando proxies

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Atribuindo proxies a escopos

```bash
# Atribui ao escopo global
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Atribui a um provedor específico
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Atribui a uma conexão/chave específica
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Resolvendo o proxy efetivo

Verifique qual proxy seria usado para uma determinada conexão:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Retorna o proxy resolvido com seu nível (`account`, `provider` ou `global`) e sua origem.

### Atribuição em massa

Atribua um proxy a vários provedores ou conexões de uma só vez:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Importação/Exportação

Os proxies estão incluídos no sistema de **Backup/Restore**. Ao exportar sua configuração do OmniRoute:

1. Acesse **Dashboard → Settings → Backup**
2. Clique em **Export** — o registro de proxies e as atribuições estão incluídos
3. Para restaurar, clique em **Import** e envie o arquivo de backup

O registro de proxies também oferece suporte a **upsert por host+port** — se você importar um proxy que já existe (mesmo host e mesma porta), ele será atualizado em vez de criar uma duplicata.

### Migração legada

Se você configurou proxies em uma versão mais antiga (anterior ao registro), o OmniRoute os migra automaticamente:

```
Armazenamento key_value legado → proxy_registry + proxy_assignments
```

Isso ocorre uma única vez na primeira inicialização após a atualização. Use `migrateLegacyProxyConfigToRegistry({ force: true })` para executar novamente.

---

## Marketplace de Proxies Gratuitos 1proxy

> 🆕 **Contribuição de [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (Issue [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

O OmniRoute integra-se à plataforma da comunidade **[1proxy](https://1proxy-api.aitradepulse.com)** para fornecer acesso a **centenas de proxies gratuitos e validados** de todo o mundo. Isso é ideal para usuários que não possuem sua própria infraestrutura de proxies.

### Como Funciona

```
┌─────────────┐  Sincronizar  ┌─────────────────┐  Rotacionar   ┌──────────┐
│ API 1proxy  │ ────────────▶ │  proxy_registry  │ ────────────▶ │Provedor  │
│  (externa)  │   até 500     │  source=oneproxy │ por qualidade │   API    │
└─────────────┘    proxies    └─────────────────┘               └──────────┘
```

1. **Sincronização** — O OmniRoute busca proxies validados na API do 1proxy
2. **Armazenamento** — Os proxies são salvos na mesma tabela `proxy_registry` com `source = 'oneproxy'`
3. **Filtragem** — Filtre por protocolo, país e pontuação de qualidade
4. **Rotação** — Selecione o melhor proxy usando estratégias por qualidade, aleatória ou sequencial
5. **Degradação automática** — Proxies que falham têm sua pontuação de qualidade reduzida; abaixo do limite → são marcados como inativos

### Sincronizando Proxies

**Pelo Painel:**

1. Acesse a aba **Configurações → 1proxy**
2. Clique em **"Sincronizar Agora"**
3. Veja as estatísticas: total de proxies, quantidade de ativos, qualidade média e distribuição por país

**Pela API:**

```bash
# Acionar sincronização
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Resposta:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Filtrando Proxies

```bash
# Filtrar por protocolo
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Filtrar por país
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Filtrar pela pontuação mínima de qualidade
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Combinar filtros
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Pontuações de Qualidade dos Proxies

Cada proxy do 1proxy inclui metadados:

| Campo           | Descrição                                            |
| --------------- | ---------------------------------------------------- |
| `qualityScore`  | Classificação de 0 a 100 da validação do 1proxy      |
| `latencyMs`     | Latência de rede medida                              |
| `anonymity`     | `transparent`, `anonymous` ou `elite`                |
| `googleAccess`  | Indica se o proxy pode acessar os serviços do Google |
| `countryCode`   | Código ISO do país com duas letras                   |
| `lastValidated` | Data e hora da última validação                      |

As pontuações de qualidade são ajustadas dinamicamente:

- **Solicitações com falha** reduzem a pontuação em 10 pontos
- **A pontuação cai para ≤10** → o proxy é marcado como `inactive`
- Proxies inativos são excluídos da rotação

### Estratégias de Rotação

```bash
# Rotacionar por qualidade (melhor proxy primeiro) — padrão
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Rotação aleatória
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Sequencial (o validado há mais tempo primeiro)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Disjuntor

A sincronização do 1proxy possui um disjuntor integrado:

- Após **5 falhas consecutivas de sincronização**, novas tentativas de sincronização são bloqueadas
- Redefina com: `resetOneproxyCircuitBreaker()` ou reinicie o servidor
- O status da sincronização está disponível em `GET /api/settings/oneproxy?action=status`

### Limpando os Proxies do 1proxy

```bash
# Excluir um único proxy do 1proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Limpar TODOS os proxies do 1proxy (os proxies manuais não são afetados)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Antideteção e Furtividade

O OmniRoute não apenas direciona o tráfego por meio de um proxy — ele faz com que o tráfego pareça legítimo:

### Falsificação de Impressão Digital TLS

Usa `wreq-js` para gerar impressões digitais TLS semelhantes às de navegadores, contornando sistemas de detecção de bots que sinalizam handshakes TLS não provenientes de navegadores.

### Correspondência de Impressão Digital da CLI

O **Seletor de Impressão Digital da CLI** (`Configurações → Segurança`) reordena os cabeçalhos HTTP e os campos do corpo JSON para corresponder à assinatura exata dos binários nativos de CLI (Claude Code, Codex etc.). Isso funciona **em conjunto com** o proxy:

```
Seu IP (bloqueado) → IP do proxy (EUA) → API do provedor
                     + falsificação de TLS
                     + impressão digital da CLI
```

Você obtém simultaneamente **mascaramento de IP** e **autenticidade das requisições**.

### Preservação do IP do Proxy

Selos codificados por cores no painel mostram qual nível de proxy está ativo:

| Selo | Nível    | Significado                                      |
| ---- | -------- | ------------------------------------------------ |
| 🟢   | Global   | Todo o tráfego passa por este proxy              |
| 🟡   | Provedor | Apenas o tráfego deste provedor passa pelo proxy |
| 🔵   | Conexão  | Esta chave/conta específica usa este proxy       |

O selo também mostra o IP resolvido do proxy para verificação.

---

## Modos de Proxy Upstream

Para provedores que usam o padrão CLIProxyAPI, o OmniRoute oferece suporte a três modos de proxy upstream:

| Modo          | Descrição                                                         |
| ------------- | ----------------------------------------------------------------- |
| `native`      | O OmniRoute gerencia diretamente o roteamento do proxy (padrão)   |
| `cliproxyapi` | Delega a uma instância externa do CLIProxyAPI                     |
| `fallback`    | Tenta o modo nativo primeiro e, em caso de falha, usa CLIProxyAPI |

Configure por provedor:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Interface do Painel

### Configurações → Aba Proxy

- Configuração de **proxy global** (definida uma vez para todo o tráfego)
- Substituições de proxy **por provedor**
- Atribuições de proxy **por conexão**
- **Teste de conexão** por meio do proxy configurado
- **Selos codificados por cores** mostrando o nível de proxy ativo

### Configurações → Aba 1proxy

- Botão **Sincronizar Agora** para obter proxies gratuitos
- **Cartões de estatísticas**: Total, Ativos, Qualidade Média, Última Sincronização
- **Filtros**: Protocolo, Código do País, Qualidade Mínima
- **Tabela de proxies** com host, protocolo, país, pontuação de qualidade, latência, anonimato e acesso ao Google
- Painel de **status da sincronização** com rastreamento de sucessos/falhas e contagem de falhas consecutivas
- **Limpar Tudo** para remover todas as entradas do 1proxy

---

## Referência da API

### API de Configurações de Proxy

| Método   | Endpoint                                       | Descrição                              |
| -------- | ---------------------------------------------- | -------------------------------------- |
| `GET`    | `/api/settings/proxy`                          | Obtém a configuração completa do proxy |
| `GET`    | `/api/settings/proxy?level=global`             | Obtém o proxy global                   |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Obtém o proxy do provedor              |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Resolve o proxy efetivo                |
| `PUT`    | `/api/settings/proxy`                          | Atualiza a configuração do proxy       |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Remove o proxy no nível especificado   |

### API do Registro de Proxies

| Método   | Endpoint                                          | Descrição                         |
| -------- | ------------------------------------------------- | --------------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Lista todos os proxies            |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Obtém o proxy pelo ID             |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Obtém as atribuições do proxy     |
| `POST`   | `/api/v1/management/proxies`                      | Cria um proxy                     |
| `PATCH`  | `/api/v1/management/proxies`                      | Atualiza o proxy                  |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Exclui o proxy                    |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Força a exclusão                  |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Faz atribuições em massa          |
| `GET`    | `/api/v1/management/proxies/assignments`          | Lista as atribuições              |
| `GET`    | `/api/v1/management/proxies/health`               | Obtém estatísticas de integridade |

### API de Túneis

Para expor sua instância do OmniRoute à internet pública (Cloudflare/ngrok/Tailscale), em vez de direcionar o tráfego de saída por meio de um proxy, consulte [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). A API REST de túneis fica em `/api/tunnels/{cloudflared,ngrok,tailscale}/*` e é independente da cadeia de proxies de saída documentada acima.

### API do 1proxy

| Método   | Endpoint                               | Descrição                                    |
| -------- | -------------------------------------- | -------------------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | Lista os proxies do 1proxy                   |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Obtém estatísticas + status da sincronização |
| `GET`    | `/api/settings/oneproxy?action=status` | Obtém apenas o status da sincronização       |
| `POST`   | `/api/settings/oneproxy`               | Aciona a sincronização                       |
| `POST`   | `/api/settings/oneproxy/rotate`        | Alterna para o próximo proxy                 |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Exclui um proxy                              |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Limpa todos                                  |

### API de Proxy Upstream

| Método   | Endpoint                          | Descrição                               |
| -------- | --------------------------------- | --------------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Obtém a configuração do proxy upstream  |
| `PUT`    | `/api/upstream-proxy/:providerId` | Define o modo de proxy upstream         |
| `DELETE` | `/api/upstream-proxy/:providerId` | Remove a configuração do proxy upstream |

---

## Variáveis de Ambiente

| Variável              | Padrão | Descrição                                                           |
| --------------------- | ------ | ------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true` | Habilita o suporte a proxy SOCKS5 (padrão `true` em `.env.example`) |

---

## Solução de Problemas

### "O proxy SOCKS5 está desabilitado"

Defina `ENABLE_SOCKS5_PROXY=true` no seu arquivo `.env` e reinicie.

### Erros de "socket hang up" por meio do proxy

Isso é normal com proxies baratos que encerram conexões ociosas. O OmniRoute já lida com isso das seguintes maneiras:

- Desabilitando keep-alive nas conexões de proxy (`keepAliveTimeout: 1`)
- Desabilitando pipelining (`pipelining: 0`)
- Armazenando dispatchers em cache para evitar handshakes repetidos

Se o problema persistir, tente um proxy diferente ou use o recurso de rotação do 1proxy.

### "unsupported_country_region_territory" durante o OAuth

Certifique-se de que o proxy esteja configurado **antes** de iniciar o fluxo OAuth. O OmniRoute encaminha a troca de tokens OAuth pelo proxy configurado. Primeiro, defina um proxy global ou no nível do provedor e, em seguida, conecte-se.

### O proxy não está sendo usado

Verifique a ordem de resolução:

1. Verifique com `GET /api/settings/proxy?resolve=your-connection-id`
2. Confira se o `status` do proxy é `active` (e não `inactive`)
3. Certifique-se de que o escopo da atribuição do proxy corresponda à sua conexão

### Falha na sincronização do 1proxy

Verifique o status da sincronização:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Se `consecutiveFailures >= 5`, o circuit breaker foi acionado. Reinicie o servidor para redefini-lo ou aguarde uma redefinição manual.

---

## Esquema do Banco de Dados

### Tabela `proxy_registry`

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' ou 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (somente 1proxy)
  latency_ms INTEGER,                        -- milissegundos (somente 1proxy)
  anonymity TEXT,                            -- transparente/anônimo/elite
  google_access INTEGER DEFAULT 0,           -- pode acessar o Google? (1proxy)
  last_validated TEXT,                       -- timestamp ISO (1proxy)
  country_code TEXT,                         -- código ISO de 2 letras (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Tabela `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- ID do provedor, ID da conexão ou ID do combo
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Verificação da Integridade do Proxy (v3.8.16+)

O mecanismo de **falha rápida de proxy** do OmniRoute (`src/lib/proxyHealth.ts`) detecta proxies inativos em <2s por meio de uma verificação rápida de conexão TCP e, em seguida, **armazena o resultado em cache** para evitar sobrecarga a cada solicitação.

### Como Funciona

```
Solicitação ──▶ ProxyHealthCache.get(url)
                  │
                  ├─ Cache encontrado + recente?  ──▶ retorna o status armazenado em cache
                  │
                  └─ Cache ausente / obsoleto?  ──▶ conexão TCP com host:port
                                                    (tempo limite: FAST_FAIL_TIMEOUT_MS)
                                                    ──▶ armazena em cache por HEALTH_CACHE_TTL_MS
                                                    ──▶ retorna o resultado
```

Sem isso, um proxy inativo bloquearia todas as solicitações pelo período completo de `PROXY_TIMEOUT_MS` (padrão de 30s) antes de falhar.

### Variáveis de Ambiente Ajustáveis

| Variável                     | Padrão  | Finalidade                                            |
| ---------------------------- | ------- | ----------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`  | Tempo limite da conexão TCP por verificação de saúde  |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000` | Tempo de armazenamento em cache do resultado de saúde |

**Valores recomendados:**

| Cenário                          | Tempo limite de falha rápida | TTL do cache | Justificativa                                                              |
| -------------------------------- | ---------------------------- | ------------ | -------------------------------------------------------------------------- |
| Gateway de API de alto tráfego   | 1500ms                       | 60000ms      | Falha rápida agressiva e cache mais longo para reduzir as verificações     |
| Nós geograficamente distribuídos | 3000ms                       | 15000ms      | Redes mais lentas precisam de mais tempo; cache menor para failover rápido |
| Desenvolvimento / testes         | 1000ms                       | 10000ms      | Iteração rápida em proxies locais                                          |
| Modo furtivo / antidetecção      | 2500ms                       | 45000ms      | Evita sondagens rápidas que poderiam acionar limites de taxa               |

### Inspeção da Integridade do Proxy

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Força uma nova verificação de um proxy específico
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

O sinalizador `stale` é `true` quando a entrada do cache excede `HEALTH_CACHE_TTL_MS`, e a próxima solicitação acionará uma nova verificação.

### Padrões por Tipo de Proxy

A verificação de integridade usa padrões adequados com base no esquema da URL:

| Esquema                    | Porta padrão |
| -------------------------- | ------------ |
| `http://`                  | 8080         |
| `https://`                 | 443          |
| `socks5://` / `socks5h://` | 1080         |

As portas personalizadas na URL (`http://host:9999`) sempre têm precedência sobre o padrão do esquema.

---

## Análises e observabilidade de proxies

O OmniRoute monitora o uso por proxy para ajudar os operadores a diagnosticar padrões de roteamento, picos de latência e falhas recorrentes.

### O que é monitorado

Para cada solicitação realizada por meio de um proxy configurado, o OmniRoute registra:

| Métrica      | Descrição                                                             |
| ------------ | --------------------------------------------------------------------- |
| `proxy_url`  | URL completa do proxy (com as credenciais de autenticação mascaradas) |
| `provider`   | ID do provedor upstream (openai, anthropic etc.)                      |
| `latency_ms` | Tempo total de ida e volta, incluindo o handshake do proxy            |
| `connect_ms` | Somente o tempo de conexão TCP                                        |
| `status`     | Código de status HTTP retornado pelo upstream                         |
| `error`      | Classe do erro se a solicitação falhar                                |
| `timestamp`  | ISO 8601 UTC                                                          |

### Como acessar os dados

```bash
# Eventos recentes de proxy
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

O endpoint real é `/api/usage/proxy-logs` (consulte `src/app/api/usage/proxy-logs/route.ts`). Esse endpoint oferece suporte a:

- `GET /api/usage/proxy-logs` — recuperar logs de proxy
- `DELETE /api/usage/proxy-logs` — limpar todos os logs de proxy

Se necessário, as estatísticas agregadas podem ser consultadas diretamente na tabela `proxy_logs` via SQL. A interface do painel pode oferecer visualizações agregadas.

### Padrões comuns

**Detectar um proxy instável** (alterna entre sucesso e falha):

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**Encontrar proxies lentos** (latência p95 > 2s):

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## Árvore de decisão da estratégia de rotação

Quando vários proxies são atribuídos a um escopo, o OmniRoute usa uma **estratégia de rotação** para escolher qual deles utilizar em cada solicitação. A estratégia é configurada no nível do escopo (global, por provedor, por conta, por combinação).

### Estratégias disponíveis

| Estratégia         | Quando usar                                   | Desvantagem                                                               |
| ------------------ | --------------------------------------------- | ------------------------------------------------------------------------- |
| `quality` (padrão) | Produção com proxies de diferentes qualidades | Favorece proxies bem avaliados; pode deixar os de baixa avaliação sem uso |
| `random`           | Distribuição de carga, privacidade            | Distribuição uniforme; ignora os indicadores de qualidade                 |
| `sequential`       | Depuração, testes determinísticos             | Percorre os proxies em ordem; fácil de compreender                        |

### Árvore de decisão

```
                    Você tem pontuações de qualidade para seus proxies?
                    │
        ┌───────────┴───────────┐
        │                       │
       SIM                     NÃO
        │                       │
   Todos os proxies            │
   têm qualidade               │
   semelhante?                 │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  SIM       NÃO               Use
   │         │              `random`
   │         │              (a distribuição
   │         │              uniforme gera dados
   │         │              de qualidade ao longo
   │         │              do tempo)
   │         │
   │    Use `quality`
   │    (ideal para
   │    qualidade variada)
   │
Use `random`
(distribua a carga
uniformemente)
```

## Exclusão Automática de Falhas para Seus Próprios Proxies

O pool do marketplace 1proxy já reduz automaticamente a classificação de proxies com falha (consulte
[Pontuações de Qualidade dos Proxies](#proxy-quality-scores)). Para os
proxies que **você** adicionou ao registro, o agendador de integridade em segundo plano
(`src/lib/proxyHealth/scheduler.ts`) oferece o mesmo comportamento de “excluir automaticamente
um membro inativo da cadeia”, sem excluir nada:

```bash
# .env — desabilita temporariamente um proxy após 3 sondagens consecutivas com falha e o reabilita
# automaticamente assim que ele volta a responder às sondagens.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Como isso funciona em uma cadeia com vários proxies:

1. O agendador verifica cada proxy registrado a cada `PROXY_HEALTH_INTERVAL_MS`
   (padrão: 10 min; mínimo: 1 min).
2. Após `PROXY_AUTO_REMOVE_AFTER` falhas **conclusivas** consecutivas (uma falha
   real de conexão — um tempo limite ou um erro 5xx do próprio destino da sondagem nunca é contabilizado; consulte
   [Verificação da Integridade dos Proxies](#proxy-health-checking-v3816)), o `status` do proxy é
   definido como `dead`.
3. `dead` é um dos status excluídos pelo filtro de status ativo usado na resolução
   de pool/rotação, portanto, a rotação de um escopo (round-robin / aleatória / fixa /
   latência — consulte [Árvore de Decisão da Estratégia de Rotação](#rotation-strategy-decision-tree))
   deixa imediatamente de encaminhar novas solicitações para esse proxy. Nenhum outro proxy do
   pool é afetado, e o pool inteiro nunca recorre silenciosamente a uma conexão
   direta — consulte a proteção de falha segura do [Sistema de Proxies em 4 Níveis](#4-level-proxy-system).
4. O agendador continua verificando os proxies `dead` no mesmo intervalo. A próxima
   sondagem bem-sucedida altera o `status` novamente para `active`, e o proxy retorna à rotação —
   sem necessidade de readicioná-lo manualmente.

Esse recurso é propositalmente **opcional e não destrutivo**: por padrão, o agendador apenas
contabiliza e registra as falhas (consulte a política C em `decision.ts`), e `PROXY_AUTO_DISABLE`
nunca exclui uma linha — essa é a finalidade da opção separada e mais agressiva
`PROXY_AUTO_REMOVE`. Se ambas estiverem definidas como `true`, `PROXY_AUTO_REMOVE`
terá precedência (um proxy prestes a ser excluído não precisa ser temporariamente desabilitado antes disso). Consulte
a referência de [Configuração do Ambiente](../reference/ENVIRONMENT.md) para ver a lista completa
de variáveis.

---

> 📖 **Documentação relacionada:**
>
> - [Guia do Usuário](../guides/USER_GUIDE.md) — Configuração geral
> - [Referência da API](../reference/API_REFERENCE.md) — Documentação completa da API
> - [Configuração do Ambiente](../reference/ENVIRONMENT.md) — Todas as variáveis de ambiente
