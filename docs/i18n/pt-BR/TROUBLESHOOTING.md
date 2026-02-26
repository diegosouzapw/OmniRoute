# Solução de problemas

🌐 **Languages:** 🇺🇸 [English](../../TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../pt-BR/TROUBLESHOOTING.md) | 🇪🇸 [Español](../es/TROUBLESHOOTING.md) | 🇫🇷 [Français](../fr/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../it/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../ru/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../zh-CN/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../de/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../in/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../th/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../uk-UA/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../ar/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../ja/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../vi/TROUBLESHOOTING.md) | 🇧🇬 [Български](../bg/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../da/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../fi/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../he/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../hu/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../id/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../ko/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../ms/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../nl/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../no/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../pt/TROUBLESHOOTING.md) | 🇷🇴 [Română](../ro/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../pl/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../sk/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../sv/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../phi/TROUBLESHOOTING.md)

Problemas e soluções comuns para OmniRoute.

---

## Correções rápidas

| Problema                                  | Solução                                                                                |
| ----------------------------------------- | -------------------------------------------------------------------------------------- |
| O primeiro login não funciona             | Verifique `INITIAL_PASSWORD` em `.env` (padrão: `123456`)                              |
| Painel abre na porta errada               | Definir `PORT=20128` e `NEXT_PUBLIC_BASE_URL=http://localhost:20128`                   |
| Nenhum registro de solicitação em `logs/` | Definir `ENABLE_REQUEST_LOGS=true`                                                     |
| EACCES: permissão negada                  | Defina `DATA_DIR=/path/to/writable/dir` para substituir `~/.omniroute`                 |
| Estratégia de roteamento não salva        | Atualização para v1.4.11+ (correção do esquema Zod para persistência de configurações) |

---

## Problemas do provedor

### "O modelo de linguagem não forneceu mensagens"

**Causa:** Cota do provedor esgotada.

**Correção:**

1. Verifique o rastreador de cota do painel
2. Use um combo com níveis alternativos
3. Mude para um nível mais barato/gratuito

### Limitação de taxa

**Causa:** Cota de assinatura esgotada.

**Correção:**

- Adicionar substituto: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Use GLM/MiniMax como backup barato

### Token OAuth expirado

OmniRoute atualiza automaticamente os tokens. Se os problemas persistirem:

1. Painel → Provedor → Reconectar
2. Exclua e adicione novamente a conexão do provedor

---

## Problemas de nuvem

### Erros de sincronização na nuvem

1. Verifique `BASE_URL` aponta para sua instância em execução (por exemplo, `http://localhost:20128`)
2. Verifique os pontos `CLOUD_URL` para seu endpoint de nuvem (por exemplo, `https://omniroute.dev`)
3. Mantenha os valores `NEXT_PUBLIC_*` alinhados com os valores do lado do servidor

### Nuvem `stream=false` Retorna 500

**Sintoma:** `Unexpected token 'd'...` no endpoint da nuvem para chamadas sem streaming.

**Causa:** O upstream retorna a carga SSE enquanto o cliente espera JSON.

**Solução alternativa:** use `stream=true` para chamadas diretas na nuvem. O tempo de execução local inclui substituto SSE→JSON.

### Cloud diz conectado, mas "chave de API inválida"

1. Crie uma nova chave no painel local (`/api/keys`)
2. Execute a sincronização na nuvem: Habilite Nuvem → Sincronizar agora
3. Chaves antigas/não sincronizadas ainda podem retornar `401` na nuvem

---

## Problemas do Docker

### A ferramenta CLI mostra não instalada

1. Verifique os campos de tempo de execução: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Para modo portátil: use o destino de imagem `runner-cli` (CLIs agrupados)
3. Para o modo de montagem do host: defina `CLI_EXTRA_PATHS` e monte o diretório bin do host como somente leitura
4. Se `installed=true` e `runnable=false`: o binário foi encontrado, mas falhou na verificação de integridade

### Validação Rápida de Tempo de Execução

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Problemas de custo

### Custos elevados

1. Verifique as estatísticas de uso em Painel → Uso
2. Mude o modelo primário para GLM/MiniMax
3. Use o nível gratuito (Gemini CLI, iFlow) para tarefas não críticas
4. Defina orçamentos de custos por chave de API: Painel → Chaves de API → Orçamento

---

## Depuração

### Habilitar registros de solicitação

Defina `ENABLE_REQUEST_LOGS=true` em seu arquivo `.env`. Os logs aparecem no diretório `logs/`.

### Verifique a integridade do provedor

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Armazenamento em tempo de execução

- Estado principal: `${DATA_DIR}/db.json` (provedores, combos, aliases, chaves, configurações)
- Uso: `${DATA_DIR}/usage.json`, `${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`
- Registros de solicitação: `<repo>/logs/...` (quando `ENABLE_REQUEST_LOGS=true`)

---

## Problemas com disjuntores

### Provedor preso no estado OPEN

Quando o disjuntor de um provedor está ABERTO, as solicitações são bloqueadas até que o tempo de espera expire.

**Correção:**

1. Vá para **Painel → Configurações → Resiliência**
2. Verifique a placa do disjuntor do provedor afetado
3. Clique em **Redefinir tudo** para limpar todos os disjuntores ou aguarde o tempo de espera expirar
4. Verifique se o provedor está realmente disponível antes de redefinir

### O provedor continua desarmando o disjuntor

Se um provedor entrar repetidamente no estado OPEN:

1. Verifique **Dashboard → Health → Provider Health** para ver o padrão de falha
2. Vá para **Configurações → Resiliência → Perfis do Provedor** e aumente o limite de falha
3. Verifique se o provedor alterou os limites da API ou requer nova autenticação
4. Revise a telemetria de latência – alta latência pode causar falhas baseadas em tempo limite

---

## Problemas de transcrição de áudio

### Erro "Modelo não suportado"

- Certifique-se de usar o prefixo correto: `deepgram/nova-3` ou `assemblyai/best`
- Verifique se o provedor está conectado em **Painel → Provedores**

### A transcrição retorna vazia ou falha

- Verifique os formatos de áudio suportados: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Verifique se o tamanho do arquivo está dentro dos limites do provedor (normalmente <25 MB)
- Verifique a validade da chave API do provedor no cartão do provedor

---

## Depuração do tradutor

Use **Dashboard → Tradutor** para depurar problemas de tradução de formato:

| Modo                      | Quando usar                                                                                                     |
| ------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Parque Infantil**       | Compare os formatos de entrada/saída lado a lado — cole uma solicitação com falha para ver como ela é traduzida |
| **Testador de bate-papo** | Envie mensagens ao vivo e inspecione a carga completa de solicitação/resposta, incluindo cabeçalhos             |
| **Banco de testes**       | Execute testes em lote em combinações de formatos para descobrir quais traduções estão quebradas                |
| **Monitoramento ao vivo** | Observe o fluxo de solicitações em tempo real para detectar problemas intermitentes de tradução                 |

### Problemas comuns de formato

- **Tags de pensamento não aparecem** — Verifique se o provedor alvo apoia o pensamento e a configuração do orçamento de pensamento
- **Queda de chamadas de ferramentas** — Algumas traduções de formato podem remover campos não suportados; verificar no modo Playground
- **Prompt do sistema ausente** — Claude e Gemini lidam com os prompts do sistema de maneira diferente; verifique o resultado da tradução
- **SDK retorna string bruta em vez de objeto** — Corrigido na v1.1.0: o sanitizador de resposta agora remove campos não padrão (`x_groq`, `usage_breakdown`, etc.) que causam falhas de validação do OpenAI SDK Pydantic
- **GLM/ERNIE rejeita função `system`** — Corrigido na v1.1.0: o normalizador de função mescla automaticamente mensagens do sistema em mensagens do usuário para modelos incompatíveis
- Função **`developer` não reconhecida** — Corrigido na v1.1.0: convertido automaticamente para `system` para provedores não-OpenAI
- **`json_schema` não funciona com Gemini** — Corrigido na v1.1.0: `response_format` agora é convertido para `responseMimeType` + `responseSchema` do Gemini

---

## Configurações de resiliência

### Limite de taxa automático não acionado

- O limite automático de taxa se aplica apenas a provedores de chaves de API (não a OAuth/assinatura)
- Verifique se **Configurações → Resiliência → Perfis do Provedor** tem limite de taxa automática ativado
- Verifique se o provedor retorna códigos de status `429` ou cabeçalhos `Retry-After`

### Ajustando a espera exponencial

Os perfis do provedor oferecem suporte a estas configurações:

- **Atraso base** — Tempo de espera inicial após a primeira falha (padrão: 1s)
- **Atraso máximo** — Limite máximo de tempo de espera (padrão: 30s)
- **Multiplicador** — Quanto aumentar o atraso por falha consecutiva (padrão: 2x)

### Rebanho anti-trovão

Quando muitas solicitações simultâneas atingem um provedor com taxa limitada, o OmniRoute usa mutex + limitação automática de taxa para serializar solicitações e evitar falhas em cascata. Isso é automático para provedores de chaves de API.

---

## Ainda preso?

- **Problemas do GitHub**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Arquitetura**: Consulte [**OMNI_TOKEN_55**](ARCHITECTURE.md) para detalhes internos
- **Referência da API**: Consulte [**OMNI_TOKEN_56**](API_REFERENCE.md) para todos os endpoints
- **Painel de saúde**: verifique **Painel → Saúde** para ver o status do sistema em tempo real
- **Tradutor**: Use **Dashboard → Tradutor** para depurar problemas de formato
