# ACP registry and registered CLI launchers (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

O OmniRoute separa a **deteção de CLIs**, o **Agent Client Protocol nativo** e os
**adaptadores stdio legados**. Encontrar um binário instalado não comprova a sua
autenticação, compatibilidade com o modelo ou capacidade para processar um prompt.

O painel utiliza `GET /api/acp/agents` e `POST /api/acp/agents` para o inventário
e o registo de agentes personalizados. Estas são rotas de gestão exclusivamente
locais, não uma API pública para iniciar processos ou submeter prompts. O
`AcpManager` interno não se torna automaticamente num fallback de fornecedor HTTP.

## Contratos registados

`config/cli-tools-manifest.json` é a fonte oficial dos binários de arranque,
argumentos e modos de backend incorporados. O registo deriva as respetivas
definições desse manifesto. A deteção é mantida em cache durante 60 segundos.

- `acp`: o contrato Gemini executa `gemini --experimental-acp` e comunica através
  de ACP JSON-RPC delimitado por novas linhas, usando o SDK TypeScript oficial.
- `stdio-adapter`: os restantes contratos registados mantêm o adaptador legado
  com entrada por linhas e saída através de stdout. Um período de inatividade de
  saída de dois segundos termina a resposta. Este adaptador **não** certifica
  suporte ACP nativo para essas CLIs.

O Gemini documenta o sinalizador de arranque na sua [referência da CLI](https://geminicli.com/docs/cli/cli-reference/).
O cliente utiliza o [SDK ACP oficial](https://github.com/agentclientprotocol/typescript-sdk)
para inicialização, criação de sessões, pedidos de prompts, notificações e cancelamento.

As definições de agentes personalizados continuam a ser contratos de arranque
controlados pelo administrador. Registar um binário e argumentos concede a esse
processo os privilégios de execução local do utilizador do servidor; o registo
não constitui uma sandbox. As verificações de versão aceitam apenas o executável
registado e um sinalizador de versão reconhecido.

## API de arranque interna

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Transmita apenas as variáveis do fornecedor deliberadamente atribuídas a este agente.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explique este projeto", 120_000);
  // Consuma a resposta na aplicação que efetuou a chamada.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` resolve o executável e os argumentos a partir da
definição registada. As únicas opções do chamador são `cwd` e `env`; a antiga
assinatura `spawn(agentId, binary, args, env)` e as substituições do executável
são rejeitadas. Este gestor não suporta contratos de arranque HTTP.

O processo filho herda o mesmo sistema operativo, terminal, configuração regional
e lista de certificados permitidos que os iniciadores de CLI. Os segredos do
servidor/fornecedor não são copiados do ambiente do processo pai. As credenciais
necessárias para a CLI escolhida têm de ser transmitidas explicitamente ou
fornecidas através da própria autenticação local dessa CLI. O processo filho
continua a ter as permissões do utilizador local no sistema de ficheiros e pode
ler a sua própria configuração.

## Ciclo de vida nativo e limites

1. Inicie o binário registado, inicialize o ACP e crie uma sessão enraizada no
   diretório de trabalho selecionado. A inicialização tem um limite de dez segundos.
2. Submeta um prompt e recolha notificações de texto apenas para essa sessão.
   A conclusão corresponde à resposta RPC do prompt, não a um período de silêncio
   em stdout.
3. Utilize um único prazo para o prompt, incluindo qualquer inicialização ainda
   não concluída; a predefinição é 120 segundos. Os prompts simultâneos no mesmo
   processo são rejeitados.
4. Em caso de timeout nativo, tente executar `session/cancel` e termine o processo.
   Uma janela limitada de 100 ms permite o envio das notificações pendentes antes
   da terminação.
5. Feche o estado do transporte e remova a sessão quando a inicialização falhar,
   a ligação for fechada, o processo terminar ou o chamador o encerrar.

Os pedidos de permissão para ferramentas são recusados. Não são anunciadas
capacidades de cliente para o sistema de ficheiros ou terminal. Estas restrições
não colocam o binário filho numa sandbox nem substituem as definições de
autorização da própria CLI.

Tanto o texto nativo como o stdout/stderr legado retêm, no máximo, 1 MiB de
carateres, mantendo a saída mais recente com um aviso de truncagem. Cada trama
nativa individual está limitada a 2 MiB de bytes antes do processamento pelo SDK.
Os buffers são repostos para cada prompt.

`kill(sessionId)` envia SIGTERM e, em seguida, SIGKILL após cinco segundos se o
processo ainda não tiver terminado. Os timeouts de prompts legados libertam
listeners e temporizadores, mas mantêm a sessão disponível para outro prompt;
os chamadores continuam responsáveis por executar `kill()` ou `killAll()` quando
terminarem.

## Eventos e inspeção

O gestor emite `stdout`, `stderr` e `exit`, cada um com `sessionId`.
`sessionError` comunica um erro de transporte sanitizado. O evento de
compatibilidade `error` só é emitido quando tem um subscritor, pelo que um binário
em falta não pode causar um erro EventEmitter não tratado.

- `getSession(sessionId)` devolve uma sessão gerida ou `undefined`.
- `getActiveSessions()` exclui sessões paradas ou em processo de paragem.
- `sendInput(sessionId, input)` está disponível apenas para um adaptador legado
  ativo; o ACP nativo rejeita entradas em bruto para proteger o respetivo fluxo
  JSON-RPC.
- `killAll()` termina todas as sessões geridas por essa instância.

## Limites de validação

Fixtures determinísticas abrangem o handshake nativo, a saída de texto, as
permissões recusadas, o cancelamento, os prompts simultâneos, a falha de
inicialização, a saída do processo, os limites de saída e o isolamento de
segredos. As regressões existentes relativas a buffers/listeners legados
continuam abrangidas. Estes testes não demonstram um início de sessão real no
Gemini nem uma inferência bem-sucedida do fornecedor; para tal, é necessário um
teste de fumo com autorização separada no ambiente de destino.

## Documentação relacionada

- [Protocolos de agentes](./AGENT_PROTOCOLS_GUIDE.md)
- [Contratos de arranque de CLIs](../guides/CLI-LAUNCH-CONTRACTS.md)
- [Ferramentas de CLI](../reference/CLI-TOOLS.md)
- [Servidor A2A](./A2A-SERVER.md)
- [Agentes na cloud](./CLOUD_AGENT.md)
