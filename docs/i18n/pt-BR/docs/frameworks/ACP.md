# ACP registry and registered CLI launchers (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

O OmniRoute separa a **descoberta de CLIs**, o **Agent Client Protocol nativo** e os
**adaptadores stdio legados**. Encontrar um binário instalado não comprova sua
autenticação, compatibilidade de modelo ou prontidão para processar um prompt.

O painel usa `GET /api/acp/agents` e `POST /api/acp/agents` para inventário
e registro de agentes personalizados. Essas são rotas de gerenciamento apenas
locais, não uma API pública para iniciar processos ou enviar prompts. O
`AcpManager` interno não se torna automaticamente um fallback de provedor HTTP.

## Contratos registrados

`config/cli-tools-manifest.json` é a fonte oficial para binários de inicialização
integrados, argumentos e modos de backend. O registro deriva suas definições
desse manifesto. A detecção é armazenada em cache por 60 segundos.

- `acp`: o contrato do Gemini inicia `gemini --experimental-acp` e se comunica
  por ACP JSON-RPC delimitado por novas linhas por meio do SDK oficial para TypeScript.
- `stdio-adapter`: outros contratos registrados mantêm o adaptador legado com
  entrada delimitada por novas linhas e saída em stdout. Um período de
  inatividade de saída de dois segundos encerra sua resposta. Esse adaptador
  **não** certifica suporte nativo a ACP para essas CLIs.

O Gemini documenta a flag de inicialização em sua [referência da CLI](https://geminicli.com/docs/cli/cli-reference/).
O cliente usa o [SDK oficial do ACP](https://github.com/agentclientprotocol/typescript-sdk)
para inicialização, criação de sessões, solicitações de prompts, notificações e cancelamento.

As definições de agentes personalizados continuam sendo contratos de
inicialização controlados pelo administrador. Registrar um binário e argumentos
concede a esse processo os privilégios de execução local do usuário do servidor;
o registro não é um sandbox. As sondagens de versão aceitam apenas o executável
registrado e uma flag de versão reconhecida.

## API interna de inicialização

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Passe somente as variáveis do provedor atribuídas deliberadamente a este agente.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // Consuma a resposta no aplicativo chamador.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` resolve o executável e os argumentos com base na
definição registrada. As únicas opções do chamador são `cwd` e `env`; a
assinatura antiga `spawn(agentId, binary, args, env)` e as substituições de
executável são rejeitadas. Contratos de inicialização HTTP não são compatíveis
com esse gerenciador.

O processo filho herda o mesmo sistema operacional, terminal, localidade e lista
de certificados permitidos dos inicializadores de CLI. Os segredos do
servidor/provedor não são copiados do ambiente do processo pai. As credenciais
necessárias para a CLI escolhida devem ser passadas explicitamente ou fornecidas
por meio da autenticação local da própria CLI. O processo filho ainda tem as
permissões de sistema de arquivos do usuário local e pode ler sua própria
configuração.

## Ciclo de vida nativo e limites

1. Inicie o binário registrado, inicialize o ACP e crie uma sessão com raiz no
   diretório de trabalho selecionado. A inicialização tem um limite de dez segundos.
2. Envie um prompt e colete notificações de texto apenas para essa sessão.
   A conclusão é a resposta RPC do prompt, não um período de silêncio em stdout.
3. Use um único prazo para o prompt, incluindo qualquer inicialização inacabada;
   o padrão é 120 segundos. Prompts simultâneos no mesmo processo são rejeitados.
4. Em caso de timeout nativo, tente `session/cancel` e encerre o processo. Uma
   janela limitada de 100 ms permite que a notificação seja descarregada antes
   do encerramento.
5. Feche o estado do transporte e remova a sessão quando a inicialização falhar,
   a conexão for fechada, o processo for encerrado ou o chamador o finalizar.

As solicitações de permissão de ferramentas são negadas. Nenhum recurso de
cliente de sistema de arquivos ou terminal é anunciado. Essas restrições não
colocam o binário filho em um sandbox nem substituem as configurações de
autorização da própria CLI.

Tanto o texto nativo quanto stdout/stderr legados retêm no máximo 1 MiB de
caracteres, mantendo a saída mais recente com um aviso de truncamento. Um quadro
de transmissão nativo individual é limitado a 2 MiB de bytes antes da análise
pelo SDK. Os buffers são redefinidos a cada prompt.

`kill(sessionId)` envia SIGTERM e, depois, SIGKILL após cinco segundos se o
processo ainda não tiver sido encerrado. Timeouts de prompts legados liberam
listeners e timers, mas deixam a sessão disponível para outro prompt; os
chamadores continuam responsáveis por `kill()` ou `killAll()` ao terminar.

## Eventos e inspeção

O gerenciador emite `stdout`, `stderr` e `exit`, cada um com `sessionId`.
`sessionError` relata um erro de transporte sanitizado. O evento de
compatibilidade `error` é emitido apenas quando há um assinante, de modo que a
ausência de um binário não possa causar um erro não tratado do EventEmitter.

- `getSession(sessionId)` retorna uma sessão gerenciada ou `undefined`.
- `getActiveSessions()` exclui sessões interrompidas ou em processo de interrupção.
- `sendInput(sessionId, input)` está disponível apenas para um adaptador legado
  ativo; o ACP nativo rejeita a entrada bruta para proteger seu fluxo JSON-RPC.
- `killAll()` encerra todas as sessões gerenciadas por essa instância.

## Limites de validação

Fixtures determinísticas abrangem o handshake nativo, saída de texto, permissões
negadas, cancelamento, prompts simultâneos, falha de inicialização, encerramento
de processo, limites de saída e isolamento de segredos. As regressões existentes
de buffers/listeners legados continuam abrangidas. Esses testes não demonstram
um login ativo no Gemini nem uma inferência bem-sucedida do provedor; isso exige
um teste de fumaça autorizado separadamente no ambiente de destino.

## Documentação relacionada

- [Protocolos de agentes](./AGENT_PROTOCOLS_GUIDE.md)
- [Contratos de inicialização de CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [Ferramentas de CLI](../reference/CLI-TOOLS.md)
- [Servidor A2A](./A2A-SERVER.md)
- [Agentes de nuvem](./CLOUD_AGENT.md)
