# AgentBridge (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENTBRIDGE.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENTBRIDGE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENTBRIDGE.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENTBRIDGE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENTBRIDGE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENTBRIDGE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENTBRIDGE.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENTBRIDGE.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENTBRIDGE.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENTBRIDGE.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENTBRIDGE.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENTBRIDGE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENTBRIDGE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENTBRIDGE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENTBRIDGE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENTBRIDGE.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENTBRIDGE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENTBRIDGE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENTBRIDGE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENTBRIDGE.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENTBRIDGE.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENTBRIDGE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENTBRIDGE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENTBRIDGE.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENTBRIDGE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENTBRIDGE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENTBRIDGE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENTBRIDGE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENTBRIDGE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENTBRIDGE.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENTBRIDGE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENTBRIDGE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENTBRIDGE.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENTBRIDGE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENTBRIDGE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENTBRIDGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENTBRIDGE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENTBRIDGE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENTBRIDGE.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENTBRIDGE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENTBRIDGE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENTBRIDGE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENTBRIDGE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENTBRIDGE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENTBRIDGE.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENTBRIDGE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENTBRIDGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENTBRIDGE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENTBRIDGE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENTBRIDGE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENTBRIDGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENTBRIDGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENTBRIDGE.md)

---

AgentBridge é o proxy MITM (Man-in-the-Middle) do OmniRoute que interceta o tráfego HTTPS dos agentes de IA de IDE e o reencaminha através do motor de encaminhamento unificado do OmniRoute. Suporta **10 agentes de IDE** — Antigravity, Kiro, GitHub Copilot, GHE Copilot, OpenAI Codex, Cursor, Zed, Claude Code, Open Code e Trae (em investigação) — tornando o OmniRoute no proxy MITM com a mais ampla cobertura do mercado para assistentes de programação com IA.

**Localização no painel:** `/dashboard/tools/agent-bridge`
**Grupo da barra lateral:** Ferramentas (depois de Agentes na Cloud)
**Ver também:** [`TRAFFIC_INSPECTOR.md`](./TRAFFIC_INSPECTOR.md) — monitorize todo o tráfego intercetado em tempo real; `docs/security/MITM-TPROXY-DECRYPT.md` (git; não compilado em `/docs`) — o modo de captura de desencriptação transparente TPROXY para Linux, controlado pela rota `/api/tools/agent-bridge/tproxy`.

---

## §1 Visão geral

### O que é o AgentBridge?

Quando um agente de IDE (por exemplo, GitHub Copilot, Cursor ou Claude Code) efetua uma chamada à API, liga-se diretamente ao fornecedor de IA a montante (OpenAI, Anthropic, etc.). O AgentBridge interceta essa ligação de forma transparente ao nível do TLS — sem exigir qualquer alteração à configuração do agente — e reencaminha o pedido através do OmniRoute.

Isto permite-lhe:

- **Reencaminhar qualquer agente para qualquer fornecedor**: o Copilot está a comunicar com a OpenAI? Redirecione-o para o Anthropic Claude, Gemini ou qualquer um dos 352 fornecedores do OmniRoute.
- **Aplicar mapeamentos de modelos**: `gemini-3-flash` → `claude-sonnet-4.7` de forma transparente ao nível do handler.
- **Observar todo o tráfego dos agentes**: cada pedido intercetado é publicado no [Inspetor de Tráfego](./TRAFFIC_INSPECTOR.md).
- **Aplicar a resiliência do OmniRoute**: o encaminhamento combinado, os circuit breakers, os fallbacks e o acompanhamento de custos também funcionam para o tráfego dos agentes de IDE.

### Posicionamento face ao mercado

| Funcionalidade                     | 9router | anti-api | llm-interceptor | **OmniRoute AgentBridge** |
| ---------------------------------- | :-----: | :------: | :-------------: | :-----------------------: |
| Antigravity                        |    ✓    |    ✓     |        —        |             ✓             |
| GitHub Copilot                     |    ✓    |    ✓     |        —        |             ✓             |
| Kiro (AWS)                         |    ✓    |    ✓     |        —        |             ✓             |
| OpenAI Codex                       |    —    |    ✓     |        —        |             ✓             |
| Cursor IDE                         |    ✓    |    ✓     |        —        |             ✓             |
| Zed Industries                     |    —    |    ✓     |        —        |             ✓             |
| Claude Code                        |    —    |    —     |        ✓        |             ✓             |
| Open Code                          |    —    |    —     |        ✓        |             ✓             |
| Trae                               |    —    |    —     |        —        |    🔍 Em investigação     |
| Interface do painel                |    ✓    |    ✗     |        ✗        |             ✓             |
| Inspetor de Tráfego                |    ✗    |    ✗     |        ✓        |             ✓             |
| Encaminhamento OmniRoute           |    ✗    |    ✗     |        ✗        |             ✓             |
| Interface de mapeamento de modelos |    ✗    |    ✗     |        ✗        |             ✓             |
| Lista de bypass                    |    ✗    |    ✗     |        ✓        |             ✓             |
| Certificado CA a montante          |    ✗    |    ✗     |        ✓        |             ✓             |

---

## §2 Arquitetura

### 2.1 Visão geral dos componentes

```
Agente do IDE (VS Code / Cursor / etc.)
    │  HTTPS (porta 443)
    ▼
/etc/hosts — 127.0.0.1 api.githubcopilot.com   ← redirecionamento de DNS
    │
    ▼
src/mitm/server.cjs  (porta 443, processo subordinado CJS)
    │  resolve o destino através do SNI do cabeçalho Host
    │  gera um certificado TLS por SNI, assinado pela CA do AgentBridge
    ├── Corresponde à lista de exclusão? → passagem TCP direta (sem desencriptação)
    ├── Corresponde ao destino? → fetch → encaminhador OmniRoute (porta 20128)
    │       └── handler.intercept() — TypeScript
    │               ├── maskSecrets() no corpo/cabeçalhos do pedido
    │               ├── TrafficBuffer.push() — publica no Inspetor de Tráfego
    │               └── fetchRouter() → /v1/chat/completions
    └── Sem correspondência? → passagem TCP direta (sem desencriptação)
```

### 2.2 Servidor MITM (`src/mitm/server.cjs`)

O servidor MITM principal é executado como um processo subordinado CJS do Node.js (para evitar reescrever a base de código CJS existente). Este:

- Escuta na porta 443 (requer privilégios ou `authbind`/`setcap`)
- Recebe túneis CONNECT do SO (através do redirecionamento de DNS em `/etc/hosts`)
- Gera certificados TLS por SNI, assinados pela CA do AgentBridge (`DATA_DIR/mitm/ca.crt`)
- Resolve o agente de destino através do cabeçalho Host, usando o registo `targets/index.ts`
- Encaminha para a camada de processadores TypeScript através de HTTP para `http://127.0.0.1:20128`

`TARGET_HOSTS` é carregado a partir de `DATA_DIR/mitm/targets.json` (escrito por `targets/index.ts` no arranque), permitindo atualizações dinâmicas sem reiniciar o servidor CJS.

> **Modelo de CA raiz (#6684).** A descrição acima, de um certificado por SNI assinado por uma CA,
> corresponde ao modelo de CA raiz persistente adicionado em #6684 (`src/mitm/cert/rootCa.ts` +
> `src/mitm/_internal/rootCaShim.cjs`, reutilizando a criptografia de CA/certificado final já
> comprovada para TPROXY em `src/mitm/tproxy/dynamicCert.ts`) — este substitui o
> antigo certificado final autoassinado estático único (`src/mitm/cert/generate.ts`, ainda
> limitado apenas aos anfitriões antigravity) indicado pela presença de um par
> `server.crt`/`server.key` no disco. **Comportamento da migração**: uma instalação nova (sem
> um `server.crt` anterior) recebe automaticamente o modelo de CA raiz; uma instalação que já
> confie no certificado final estático antigo continua a utilizá-lo até que o operador defina
> `MITM_ROOT_CA_ENABLED=true` e reinicie a ponte (`src/mitm/cert/migration.ts`
> é a função de decisão pura — uma CA MITM fidedigna capaz de assinar um certificado final para
> **qualquer** anfitrião é significativamente mais poderosa do que o antigo certificado final com SAN fixo, pelo que a
> mudança nunca ocorre silenciosamente numa instalação que já confie nele). O certificado da CA é instalado
> na mesma entrada `omniroute-mitm.crt` do arquivo de confiança utilizada pelo certificado final antigo
> (`cert/install.ts::installCaCert`) — não é necessária qualquer limpeza de confiança dupla.

### 2.3 Base dos processadores (`src/mitm/handlers/base.ts`)

Todos os processadores de agentes estendem `MitmHandlerBase`:

```ts
export abstract class MitmHandlerBase {
  abstract readonly agentId: AgentId;

  abstract intercept(
    req: IncomingMessage,
    res: ServerResponse,
    body: Buffer,
    mappedModel: string
  ): Promise<void>;

  // Auxiliares protegidos: fetchRouter, pipeSSE, hookBufferStart, hookBufferUpdate
}
```

Cada processador chama `hookBufferStart()` antes de efetuar o proxy e `hookBufferUpdate()` após a conclusão. Estas chamadas introduzem entradas `InterceptedRequest` em `globalTrafficBuffer` (consulte [Inspetor de Tráfego](./TRAFFIC_INSPECTOR.md) §4).

### 2.4 Registo de destinos (`src/mitm/targets/`)

Cada agente tem um ficheiro de destino declarativo:

```ts
// src/mitm/targets/copilot.ts
export const COPILOT_TARGET: MitmTarget = {
  id: "copilot",
  name: "GitHub Copilot",
  hosts: ["api.githubcopilot.com", "copilot-proxy.githubusercontent.com"],
  port: 443,
  endpointPatterns: ["/chat/completions", "/v1/chat/completions"],
  defaultModels: [{ id: "gpt-4o", name: "GPT-4o", alias: "gpt-4o" }],
  handler: () => import("../handlers/copilot"),
  riskNoticeKey: "providers.riskNotice.oauth",
};
```

O registo (`targets/index.ts`) exporta `ALL_TARGETS` e gera `DATA_DIR/mitm/targets.json` no arranque.

### 2.5 Passagem direta e lista de exclusão (`src/mitm/passthrough.ts`)

**Lista de exclusão** (verificada primeiro, com precedência sobre a correspondência de destino):

- Padrões predefinidos: anfitriões bancários, `.gov.`, fornecedores OAuth/SSO (Okta, Auth0), etc.
- Padrões do utilizador: armazenados na tabela `agent_bridge_bypass` da BD
- Os anfitriões excluídos recebem um túnel TCP transparente — o TLS **nunca é desencriptado**

**Passagem direta predefinida** (sem correspondência de destino e não incluído na lista de exclusão):

- Também recebe um túnel TCP — as ligações nunca são interrompidas
- Impede o AgentBridge de perturbar o tráfego HTTPS geral do sistema

Precedência de encaminhamento:

```
lista de exclusão → correspondência de destino → passagem direta
```

### 2.6 Certificado da CA a montante (`src/mitm/upstreamTrust.ts`)

Para ambientes de rede empresariais com uma CA personalizada:

```bash
AGENTBRIDGE_UPSTREAM_CA_CERT=/path/to/corporate-ca.pem
```

Quando definido, configura o dispatcher global do `undici` com o certificado adicional da CA, permitindo que o AgentBridge alcance fornecedores a montante através de proxies empresariais de terminação TLS.

### 2.7 Ocultação de segredos (`src/mitm/maskSecrets.ts`)

O analisador independente de implementação limpa é aplicado aos corpos dos pedidos e aos cabeçalhos de credenciais
**antes** de estes entrarem no buffer do Inspetor de Tráfego ou em qualquer registo. Efetua uma única passagem linear:

- Tokens com os prefixos `sk-` / `ak-` / `pk-` (ao estilo da OpenAI/Anthropic)
- Credenciais RFC 6750 `Authorization: Bearer <token>`, com precedência do token completo
- Tokens genéricos opacos longos (≥40 carateres), incluindo formatos com pontos e preenchimento

`sanitizeHeaders()` converte os nomes mantidos para minúsculas, concatena os valores de matrizes de forma determinística, remove a
lista de exclusão partilhada de cabeçalhos hop-by-hop/enquadramento (incluindo autenticação de proxy), oculta totalmente `cookie` e
`set-cookie` e delega os valores das credenciais ao analisador.

---

## §3 Configuração

### 3.1 Iniciar/parar o servidor MITM

Utilize o cartão do servidor AgentBridge em `/dashboard/tools/agent-bridge`:

| Ação                   | Descrição                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| Iniciar servidor       | Inicia `src/mitm/server.cjs` na porta 443                                                      |
| Parar servidor         | Encerra corretamente o processo subordinado                                                    |
| Reiniciar servidor     | Para + inicia (aplica as alterações aos destinos)                                              |
| Confiar no certificado | Instala `DATA_DIR/mitm/ca.crt` no repositório de confiança do sistema operativo                |
| Transferir certificado | Transfere `ca.crt` para instalação manual                                                      |
| Regenerar certificado  | Cria um novo par de chaves da AC (todos os certificados existentes por agente são invalidados) |

### 3.2 Confiar no certificado

O certificado da AC do AgentBridge tem de ser considerado fidedigno pelo sistema operativo antes de os IDEs aceitarem a ligação MITM.

**Linux (NSS — Chrome/Firefox):**

```bash
certutil -A -d sql:$HOME/.pki/nssdb -n "OmniRoute AgentBridge" -t CT,, -i ~/.omniroute/mitm/ca.crt
```

**macOS (Porta-chaves):**

```bash
sudo security add-trusted-cert -d -r trustRoot \
  -k /Library/Keychains/System.keychain ~/.omniroute/mitm/ca.crt
```

**Windows (certmgr):**

```powershell
certutil -addstore -f Root $env:USERPROFILE\.omniroute\mitm\ca.crt
```

Em alternativa, utilize o botão "Confiar no certificado" no painel (executa o comando adequado ao seu sistema operativo, solicitando sudo, se necessário).

#### Os IDEs baseados em Electron ignoram o repositório de confiança do sistema operativo (`NODE_EXTRA_CA_CERTS`)

Alguns IDEs — nomeadamente o **Antigravity IDE** e outras aplicações derivadas do Electron / VS Code — incluem
o seu próprio runtime do Node.js, que **não consulta o repositório de confiança do sistema operativo** para pedidos
`fetch`/HTTPS de saída. Confiar na AC ao nível do sistema operativo/NSS é suficiente para o **backend** nativo
do IDE (por exemplo, um servidor de linguagem em Go, que utiliza o conjunto de AC do sistema operativo), mas o
**frontend do Electron** continuará a apresentar uma falha de TLS — isto manifesta-se como uma _sessão terminada_
na aplicação ou como um _"erro de ligação"_, apesar de o registo MITM mostrar que as chamadas de inicialização do
backend devolvem `200`. São necessários dois passos, e ambos são importantes:

1. Aponte explicitamente o runtime para a AC:
   ```bash
   export NODE_EXTRA_CA_CERTS=/path/to/omniroute-agentbridge-ca.crt
   ```
2. **Inicie o IDE a partir dessa shell.** Iniciá-lo através do ícone no ambiente de trabalho / Dock / menu Iniciar
   **não** herda as exportações da shell, e `~/.config/environment.d/*.conf` só é aplicado após um novo
   início de sessão gráfico. Encerre primeiro o IDE por completo — o bloqueio de instância única do Electron faz com
   que um segundo arranque apenas coloque em primeiro plano o processo existente, ignorando o novo ambiente.

O passo acima relativo à confiança do sistema operativo + NSS continua a ser necessário (a pilha de rede do Chromium
utilizada por alguns fluxos de autenticação lê o repositório NSS por utilizador e tem as suas próprias associações
estáticas para `*.googleapis.com`, que são substituídas por uma AC considerada fidedigna localmente).
`NODE_EXTRA_CA_CERTS` abrange, adicionalmente, o caminho de `fetch` do Node.

### 3.3 Encaminhamento DNS

Para cada agente que pretenda intercetar, os respetivos anfitriões de API têm de ser resolvidos para `127.0.0.1`. O AgentBridge gere automaticamente as entradas de `/etc/hosts` quando ativa ou desativa o DNS de um agente no Assistente de Configuração.

Exemplo de entradas de `/etc/hosts` para o GitHub Copilot:

```
127.0.0.1 api.githubcopilot.com
127.0.0.1 copilot-proxy.githubusercontent.com
```

### 3.4 Mapeamento de modelos

Utilize a Tabela de Mapeamento de Modelos no cartão de cada agente para definir mapeamentos de origem → destino:

| Modelo de origem (nativo do agente) | Modelo de destino (OmniRoute) |
| ----------------------------------- | ----------------------------- |
| `gpt-4o`                            | `claude-sonnet-4.7`           |
| `*` (caráter universal)             | `claude-haiku-4.7`            |

O caráter universal `*` mapeia qualquer modelo não reconhecido para o destino especificado. É guardado na tabela `agent_bridge_mappings`.

> **Sugestão — descubra os IDs de modelo reais do agente.** Um IDE pode enviar nomes de modelos diferentes
> dos respetivos rótulos na interface e que mudam entre versões principais. Por exemplo, o **Antigravity 2** envia
> `gemini-3.1-pro-low`, `gemini-pro-agent` e `gemini-3.1-flash-lite` através da rede — e não o
> `gemini-2.5-pro` apresentado em documentação mais antiga. Envie uma mensagem de chat sem qualquer mapeamento
> correspondente configurado: o MITM regista o `model:` recebido exato e deixa o pedido prosseguir. Mapeie esse
> valor literal e, em seguida, o pedido seguinte será intercetado e encaminhado para o seu destino.

### 3.5 Aviso de risco

O AgentBridge interceta credenciais (tokens OAuth, chaves de API) que o IDE utiliza para se autenticar junto dos fornecedores a montante. Estas são **ocultadas antes do registo** (consulte §2.7), mas ficam visíveis para a camada MITM do OmniRoute. A primeira ativação de cada agente apresenta uma janela modal descartável com um aviso de risco.

### 3.6 Manutenção e Diagnóstico

O painel disponibiliza um cartão de **Manutenção e Diagnóstico** (`AgentBridgeMaintenanceCard`, em `src/app/(dashboard)/dashboard/tools/agent-bridge/components/`) que apresenta rotas MITM operacionais que anteriormente não tinham interface de utilizador. O respetivo subtítulo: _"Teste automaticamente o pipeline de captura, reverta o estado residual do sistema e transfira a sua configuração entre máquinas."_ As funções auxiliares do cliente para o cartão encontram-se em `src/lib/inspector/agentBridgeMaintenanceApi.ts`.

| Botão                     | Rota                                   | O que faz                                                                                                                                                                                                                |
| ------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Diagnosticar**          | `GET /api/tools/agent-bridge/diagnose` | Executa o autoteste do pipeline de captura e apresenta um relatório por verificação (✓/✗ + sugestão de correção).                                                                                                        |
| **Reparar**               | `POST /api/tools/agent-bridge/repair`  | Reverte o estado de sistema MITM órfão (entradas de falsificação de DNS, CA raiz, proxy do sistema) deixado por uma falha ou SIGKILL. Idempotente — comunica "Nada a reparar" quando o estado está limpo.                |
| **Remover CA**            | `DELETE /api/tools/agent-bridge/cert`  | Revoga a confiança e remove a CA raiz MITM do repositório de confiança do SO (explícito, idempotente). Apresentado apenas quando a CA é atualmente considerada fidedigna; requer uma confirmação em linha "Remover CA?". |
| **Exportar configuração** | `GET /api/tools/agent-bridge/config`   | Transfere a configuração JSON portável (consulte §3.7).                                                                                                                                                                  |
| **Importar configuração** | `POST /api/tools/agent-bridge/config`  | Carrega uma configuração JSON exportada anteriormente (consulte §3.7).                                                                                                                                                   |

**Verificações de diagnóstico** (`summarizeDiagnostics()` em `src/mitm/inspector/diagnostics.ts`). A rota executa a sondagem com efeitos para cada uma e fornece os valores booleanos ao resumidor puro; é devolvido um único veredito `healthy`, juntamente com uma sugestão para cada falha:

| Nome da verificação | O que verifica                                                    | Sugestão em caso de falha                                                                                                                                              |
| ------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `server-running`    | O processo do servidor MITM está ativo                            | "O servidor MITM não está em execução. Inicie-o no separador AgentBridge."                                                                                             |
| `server-reachable`  | O servidor MITM aceita ligações na respetiva porta (sondagem TCP) | "O servidor MITM não está a aceitar ligações na respetiva porta. Verifique se a porta está livre e se tem privilégios para a associar."                                |
| `cert-exists`       | O certificado MITM foi gerado no disco                            | "Ainda não foi gerado nenhum certificado MITM. Gere um no separador AgentBridge."                                                                                      |
| `cert-trusted`      | A CA raiz MITM está no repositório de confiança do SO             | "A CA raiz MITM não é considerada fidedigna pelo repositório do SO, pelo que a interceção TLS irá falhar. Confie no certificado a partir do separador AgentBridge."    |
| `dns-configured`    | Os nomes de anfitrião de destino são falsificados em `/etc/hosts` | "Os nomes de anfitrião de destino não são falsificados em /etc/hosts, pelo que o tráfego nunca chega ao proxy. Ative o DNS para o(s) agente(s) que pretende capturar." |

**Faixa de estado órfão:** quando a página deteta um estado deixado por uma falha (falsificação de DNS / CA / proxy do sistema), o cartão apresenta uma faixa âmbar — _"Uma sessão anterior deixou estado de sistema para trás (falsificação de DNS, CA ou proxy do sistema). Execute Reparar para o limpar."_ — e realça o botão **Reparar**. `Repair` é o equivalente, na camada da aplicação, à opção `--cleanup` do ProxyBridge (delega para `repairMitm()` em `src/mitm/manager.ts`).

> A CA raiz MITM permanece instalada entre paragens e arranques para evitar pedidos
> repetidos de sudo (o mesmo comportamento que mitmproxy/Charles), pelo que a sua remoção é uma ação
> explícita **Remover CA**, em vez de ocorrer automaticamente ao parar.

### 3.7 Importação/exportação de configuração portável

O AgentBridge pode serializar o estado **ajustável pelo operador** num objeto JSON com controlo de versão, para que uma configuração possa ser replicada entre máquinas. O serializador é `src/lib/inspector/configPortability.ts` (`exportConfig()` / `importConfig()`), validado por `AgentBridgeConfigSchema`.

A exportação inclui exatamente três elementos (as predefinições incorporadas **NÃO** são intencionalmente exportadas, para que a importação nunca as duplique nem entre em conflito com elas):

| Campo            | Origem                                                                    | Notas                                                                        |
| ---------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `bypassPatterns` | padrões de desvio definidos pelo utilizador (`agent_bridge_bypass`)       | os padrões predefinidos de bancos/administração pública/okta são excluídos   |
| `customHosts`    | anfitriões personalizados do Traffic Inspector (`inspector_custom_hosts`) | cada um: `{ host, kind: "llm"\|"app"\|"custom", label? }`                    |
| `agentMappings`  | mapeamentos de modelos por agente (`agent_bridge_mappings`)               | `{ [agentId]: [{ source, target }] }` para cada agente que tenha mapeamentos |

```jsonc
// GET /api/tools/agent-bridge/config
{
  "version": 1,
  "bypassPatterns": ["*.internal.example.com"],
  "customHosts": [{ "host": "api.example.com", "kind": "llm", "label": null }],
  "agentMappings": {
    "copilot": [{ "source": "gpt-4o", "target": "claude-sonnet-4.7" }],
  },
}
```

**Comportamento da importação** (`POST /api/tools/agent-bridge/config`): os padrões de desvio e os mapeamentos por agente são **integralmente substituídos**; os anfitriões personalizados são adicionados de forma **idempotente** (`INSERT OR IGNORE`). A resposta comunica quantos elementos de cada tipo foram aplicados:

```jsonc
{ "ok": true, "bypassPatterns": 1, "customHosts": 1, "agents": 1 }
```

O que **NÃO** está na configuração: estado de execução do servidor, caminhos dos certificados, estado do DNS por agente, caminho da CA a montante e definições de TPROXY — estes são estados do anfitrião/tempo de execução, não preferências portáteis.

---

## §4 Referência por agente

| #   | Agente             | Estado             | Hosts intercetados                                                 | Tipo de autenticação |
| --- | ------------------ | ------------------ | ------------------------------------------------------------------ | -------------------- |
| 1   | **Antigravity**    | ✅ Suportado       | `daily-cloudcode-pa.googleapis.com`, `cloudcode-pa.googleapis.com` | Firebase OAuth       |
| 2   | **Kiro (AWS)**     | ✅ Suportado       | `prod.kiro.aws`, `dev.kiro.aws`                                    | AWS SigV4            |
| 3   | **GitHub Copilot** | ✅ Suportado       | `api.githubcopilot.com`, `copilot-proxy.githubusercontent.com`     | GitHub OAuth         |
| 4   | **OpenAI Codex**   | ✅ Suportado       | `api.openai.com` (caminhos do Codex), `chatgpt.com`                | Chave OpenAI         |
| 5   | **Cursor IDE**     | ✅ Suportado       | `api2.cursor.sh`, `api.cursor.sh`                                  | Cursor OAuth         |
| 6   | **Zed Industries** | ✅ Suportado       | `api.zed.dev`, `llm.zed.dev`                                       | Zed OAuth            |
| 7   | **Claude Code**    | ✅ Suportado       | `api.anthropic.com` (opcional)                                     | Chave Anthropic      |
| 8   | **Open Code**      | ✅ Suportado       | `openrouter.ai`, `api.openai.com` (caminhos zen)                   | Chave de API         |
| 9   | **Trae**           | 🔍 Em investigação | A determinar — consulte §8                                         | A determinar         |

### Passos do assistente de configuração (por agente)

Cada cartão de agente tem um assistente de configuração de 3 passos:

1. **Verificar pré-requisitos** — O servidor está em execução? O certificado é considerado fidedigno? O IDE está instalado (detetado automaticamente)?
2. **Ativar DNS** — Adiciona entradas a `/etc/hosts` (requer sudo). Mostra exatamente que linhas serão adicionadas.
3. **Mapear modelos** — Tabela opcional de mapeamento de modelos. São aceites carateres universais.

### Deteção de agentes

Para os agentes 1–8, o AgentBridge tenta detetar automaticamente a instalação do IDE:

```ts
export async function detectAgent(agentId: AgentId): Promise<DetectionResult>;
// Devolve: { installed: boolean, version?: string, path?: string }
```

A deteção utiliza caminhos específicos do sistema operativo e verificações de binários (por exemplo, `code --list-extensions | grep github.copilot` para o Copilot, `~/.config/antigravity/` para o Antigravity).

---

## §5 Segurança

### Regras rígidas aplicadas

| Regra                                | Aplicação                                                                                                   |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| **#12** `sanitizeErrorMessage`       | Todos os erros dos processadores são sanitizados antes da resposta ou da entrada no buffer                  |
| **#13** Passagem de ambiente à shell | As edições de `/etc/hosts` utilizam a opção `env` — sem interpolação de caminhos em strings                 |
| **#15 + #17** `isLocalOnlyPath()`    | `/api/tools/agent-bridge/` é LOCAL_ONLY + SPAWN_CAPABLE — acesso via loopback imposto antes da autenticação |

### Lista de exclusão para hosts sensíveis

A lista de exclusão garante que instituições financeiras, fornecedores de OAuth/SSO e outros hosts sensíveis **nunca são desencriptados**. O respetivo tráfego TLS passa através de um túnel TCP transparente — o OmniRoute nunca vê o texto simples.

Os padrões de exclusão predefinidos incluem:

- `*.bank.*`, `*.gov.*` (serviços financeiros/governamentais)
- `*.okta.com`, `*.auth0.com`, `*.microsoft.com` (SSO/identidade)
- `*.apple.com`, `*.icloud.com` (serviços de sistema da Apple)

Os padrões de exclusão adicionados pelo utilizador são armazenados na tabela `agent_bridge_bypass` e têm precedência sobre tudo o resto.

### Mascaramento de segredos

É aplicado `maskSecrets()` de `src/mitm/maskSecrets.ts`:

- A cada corpo de pedido antes de `TrafficBuffer.push()`
- A cada cabeçalho antes do registo ou da difusão

Padrões: tokens com os prefixos `sk-`/`ak-`/`pk-`, tokens `Bearer` e tokens genéricos com ≥40 carateres.

### Certificado CA do upstream

Quando `AGENTBRIDGE_UPSTREAM_CA_CERT` está definido, o ficheiro é lido durante o arranque. Se o caminho existir, mas não for possível ler o ficheiro, o AgentBridge regista um erro claro e recusa-se a iniciar (evitando falhas TLS silenciosas em ambientes empresariais).

### Limitações conhecidas

- **A porta 443 requer privilégios**: No Linux, o AgentBridge necessita de `setcap 'cap_net_bind_service=+ep'` no binário do Node ou de ser executado através de `authbind`. O Assistente de Configuração apresenta instruções específicas do sistema operativo.
- **É necessário reiniciar o IDE**: Após o redirecionamento de DNS, o IDE tem de ser reiniciado para que a nova resolução do host produza efeitos.
- **Tokens OAuth codificados de forma rígida**: Alguns agentes (Kiro, Antigravity) armazenam localmente tokens de atualização OAuth. Estes são transparentes para o AgentBridge — este vê o token Bearer em cada pedido, o qual é mascarado antes do registo.
- **Os frontends Electron necessitam de `NODE_EXTRA_CA_CERTS`**: Os IDEs cujo frontend é executado num runtime Node/Electron integrado ignoram o arquivo de confiança do SO/NSS e têm de ser iniciados a partir de uma shell com `NODE_EXTRA_CA_CERTS` definido (consulte §3.2). Sintoma quando está em falta: o backend do IDE autentica-se (o MITM mostra códigos `200`), mas a IU continua com a sessão terminada.
- **Várias instalações do mesmo IDE são independentes**: uma instalação de sistema (por exemplo, `/usr/share/antigravity/antigravity`) e uma instalação «Full» local do utilizador (por exemplo, `~/AntigravityIDE_Full/antigravity-ide`) são processos separados com os seus próprios runtimes — cada um tem de ser reiniciado com a CA injetada. Antes de reiniciar, identifique qual está em execução através do respetivo caminho do binário.
- **A identidade é definida pelo prompt de sistema do agente, não pelo modelo encaminhado**: quando remapeia o modelo de um agente para um fornecedor diferente, a resposta continua a alegar a identidade nativa do agente (por exemplo, o Antigravity responde «Sou alimentado pelo Gemini»), porque o IDE injeta essa informação no prompt de sistema. Confirme o backend real em `call_logs` / `proxy_logs` (`provider`, `model`, `target_format`), não perguntando ao modelo quem ele é.

---

## §6 Resolução de problemas

### Conflito na porta 443

Se outro processo já estiver a escutar na porta 443 (servidor Web, VPN, etc.):

```bash
lsof -i :443          # localizar o processo
sudo fuser -k 443/tcp  # terminar à força (utilizar com cuidado)
```

Em alternativa, configure uma porta não privilegiada nas definições do AgentBridge e crie regras de redirecionamento com `iptables` / `pf`.

### Certificado não considerado fidedigno

Se o IDE apresentar erros de TLS depois de iniciar o AgentBridge:

1. Verifique se o certificado foi instalado: `security find-certificate -c "OmniRoute AgentBridge"` (macOS) ou `certutil -L -d sql:$HOME/.pki/nssdb` (Linux/NSS)
2. Algumas aplicações mantêm o seu próprio repositório de confiança (Firefox, Chrome no Linux). Execute novamente "Confiar no certificado" e verifique o repositório de certificados específico do NSS/Firefox.
3. Reinicie o IDE depois de confiar no certificado — as sessões TLS em curso utilizam o estado de confiança anterior.

### Sessão terminada no IDE / "erro de ligação" apesar de uma AC fidedigna

Sintoma: depois de redirecionar o DNS e confiar na AC, um IDE baseado em Electron (por exemplo, o Antigravity)
abre com a **sessão terminada** ou apresenta um erro de autenticação/ligação, apesar de o registo do MITM mostrar que as
chamadas de inicialização (`loadCodeAssist`, `fetchAvailableModels`, …) devolvem `200`.

Causa: o **runtime Node/Electron incluído no IDE ignora o repositório de confiança do sistema operativo**. O backend
nativo (um servidor de linguagem em Go) confia na AC do sistema operativo e autentica-se, mas o frontend Electron
não o faz — por isso, a IU considera que está offline.

Correção (ambos os passos): exporte `NODE_EXTRA_CA_CERTS=<ca.crt>` **e volte a iniciar o IDE a partir dessa
shell**, não através do ícone no ambiente de trabalho. Primeiro, encerre completamente o IDE — o bloqueio de instância única do Electron significa
que um segundo arranque apenas foca o processo existente e o novo ambiente é ignorado. Consulte a §3.2.
Isto corresponde a um relatório upstream em aberto, no qual um agente autónomo funciona através de um MITM, mas a variante
do IDE falha com a mesma configuração.

### DNS não propagado

Verifique se `/etc/hosts` foi atualizado:

```bash
grep "omniroute\|127.0.0.1.*github\|127.0.0.1.*cursor" /etc/hosts
```

Limpe a cache de DNS:

```bash
# macOS
sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
# Linux (systemd-resolved)
sudo systemctl restart systemd-resolved
# Windows
ipconfig /flushdns
```

### IDE não detetado

A deteção automática utiliza caminhos de instalação comuns. Se a deteção falhar, mas o IDE estiver instalado:

- Verifique se o binário do IDE está numa localização não padrão
- O Assistente de Configuração continua a funcionar — a falha de deteção significa apenas que o distintivo não apresentará o caminho de instalação

### Erros do manipulador (falha na obtenção upstream)

Se o AgentBridge intercetar os pedidos, mas todos falharem:

1. Verifique se pelo menos um fornecedor está ligado em `/dashboard/providers`
2. Consulte os registos do servidor OmniRoute: `APP_LOG_LEVEL=debug` em `.env`
3. Verifique se `OMNIROUTE_BASE_URL` aponta para o endpoint correto do router (predefinição: `http://127.0.0.1:20128`)

---

## §7 Referência da API

Todas as rotas são `LOCAL_ONLY` (apenas loopback, imposto antes da autenticação) e `SPAWN_CAPABLE`. Consulte `src/server/authz/routeGuard.ts`.

Caminho base: `/api/tools/agent-bridge/`

| Método              | Caminho                                        | Descrição                                                                                                                           |
| ------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| GET                 | `/api/tools/agent-bridge/state`                | Estado global do servidor + deteção/estado por agente                                                                               |
| GET                 | `/api/tools/agent-bridge/agents`               | Lista os agentes registados (id, nome, hosts, viabilidade, estado)                                                                  |
| GET                 | `/api/tools/agent-bridge/agents/{id}`          | Estado de um agente (configuração de destino + deteção + estado armazenado)                                                         |
| PATCH               | `/api/tools/agent-bridge/agents/{id}`          | Atualiza `setup_completed` para o agente                                                                                            |
| GET                 | `/api/tools/agent-bridge/agents/{id}/detect`   | Executa a sondagem de deteção para o agente (`installed`, `version?`, `path?`)                                                      |
| POST                | `/api/tools/agent-bridge/agents/{id}/dns`      | Ativa/desativa o DNS para o agente (`{enabled: boolean}`)                                                                           |
| GET                 | `/api/tools/agent-bridge/agents/{id}/mappings` | Mapeamentos de modelos para o agente                                                                                                |
| PUT                 | `/api/tools/agent-bridge/agents/{id}/mappings` | Substitui os mapeamentos de modelos                                                                                                 |
| POST                | `/api/tools/agent-bridge/server`               | Inicia/para/reinicia o servidor (`action: "start"\|"stop"\|"restart"\|"trust-cert"\|"regenerate-cert"`)                             |
| GET                 | `/api/tools/agent-bridge/cert`                 | Estado do certificado (`exists`, `trusted`, `path`)                                                                                 |
| POST                | `/api/tools/agent-bridge/cert`                 | Confia na AC raiz MITM (instala-a)                                                                                                  |
| DELETE              | `/api/tools/agent-bridge/cert`                 | Deixa de confiar na AC raiz MITM (remove-a) — idempotente (ver §3.6)                                                                |
| POST                | `/api/tools/agent-bridge/cert/regenerate`      | Regenera o certificado MITM autoassinado                                                                                            |
| GET                 | `/api/tools/agent-bridge/cert/download`        | Transmite o certificado PEM para transferência                                                                                      |
| GET                 | `/api/tools/agent-bridge/bypass`               | Lista os padrões de exclusão (`default` + `user`)                                                                                   |
| POST                | `/api/tools/agent-bridge/bypass`               | Substitui integralmente os padrões de exclusão definidos pelo utilizador                                                            |
| DELETE              | `/api/tools/agent-bridge/bypass?pattern=...`   | Remove um único padrão de exclusão definido pelo utilizador                                                                         |
| GET                 | `/api/tools/agent-bridge/diagnose`             | Autoteste do pipeline de captura (ver §3.6)                                                                                         |
| POST                | `/api/tools/agent-bridge/repair`               | Reverte o estado MITM órfão do sistema (ver §3.6)                                                                                   |
| GET                 | `/api/tools/agent-bridge/config`               | Exporta a configuração JSON portátil (ver §3.7)                                                                                     |
| POST                | `/api/tools/agent-bridge/config`               | Importa a configuração JSON portátil (ver §3.7)                                                                                     |
| GET                 | `/api/tools/agent-bridge/upstream-ca`          | Obtém o caminho configurado da AC a montante                                                                                        |
| POST                | `/api/tools/agent-bridge/upstream-ca`          | Valida + guarda persistentemente o caminho da AC a montante                                                                         |
| POST                | `/api/tools/agent-bridge/upstream-ca/test`     | Valida apenas (simulação) um caminho da AC a montante — não o guarda persistentemente                                               |
| GET / POST / DELETE | `/api/tools/agent-bridge/tproxy`               | Modo de captura TPROXY com desencriptação transparente — ver `docs/security/MITM-TPROXY-DECRYPT.md` (git; não compilado em `/docs`) |

Esquemas OpenAPI completos: `docs/openapi.yaml` → etiqueta `AgentBridge`.

---

## §8 Roteiro

### Investigação do Trae

O Trae é um assistente de programação com IA relativamente recente. Antes de implementar um handler:

1. Identificar o binário/extensão nos marketplaces do VS Code / JetBrains ou como aplicação autónoma
2. Capturar o tráfego com o mitmproxy para descobrir os anfitriões da API e os formatos dos endpoints
3. Determinar o mecanismo de autenticação
4. Avaliar a decisão de avançar/não avançar com base nos termos de serviço e na capacidade de descoberta da API

Até a investigação estar concluída, o cartão do Trae no painel apresenta um emblema "Em investigação" com uma ligação "Comunicar viabilidade". O esqueleto do handler em `src/mitm/handlers/trae.ts` lança um erro estruturado `Ainda não implementado`.

### Agentes pendentes (MITM obrigatório — sem suporte para URL base personalizado)

As seguintes ferramentas não suportam URLs base personalizados nas respetivas versões atuais, pelo que o MITM é a única via de interceção. A avaliação da viabilidade está pendente:

- **Windsurf** (Codeium/Cognition)
- **Amp** (Sourcegraph)
- **Amazon Q / Kiro CLI** (AWS Bedrock — distinto do Kiro IDE)
- **Cowork** (aplicação de ambiente de trabalho da Anthropic)

Nota: o GitHub Copilot CLI ≥v1.0.19 suporta `COPILOT_PROVIDER_BASE_URL` — utilize a configuração direta em vez do MITM para esta ferramenta.
