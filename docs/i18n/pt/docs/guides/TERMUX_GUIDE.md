# Termux Headless Setup (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

O OmniRoute pode ser executado como um servidor sem interface gráfica no Android através do Termux. A aplicação de ambiente de trabalho Electron não é suportada no Termux, mas o painel Web e a API compatível com OpenAI funcionam a partir do navegador local ou de outros dispositivos na mesma rede.

## Pré-requisitos

Instale o Termux a partir do F-Droid ou das versões publicadas no GitHub e, em seguida, atualize os pacotes e instale as ferramentas de compilação exigidas por dependências nativas, como `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Versão do Node.js:** o OmniRoute requer Node `>=22.22.2 <23 || >=24.0.0 <27` (corresponde a `engines` em `package.json` / `SUPPORTED_NODE_RANGE`). Normalmente, o `nodejs-lts` do Termux inclui o Node 20 LTS, que **já não é suportado** — instale antes `pkg install nodejs` (versão atual) e confirme que `node --version` indica uma versão da linha 22.x/24.x+.

Se a compilação de pacotes nativos falhar, execute novamente o comando `pkg install` acima e volte a tentar instalar o OmniRoute.

## Instalação

Execute diretamente o pacote publicado mais recente:

```bash
npx -y omniroute@latest
```

Também pode instalá-lo globalmente:

```bash
npm install -g omniroute
omniroute
```

## Execução

Inicie o OmniRoute no modo de servidor sem interface gráfica:

```bash
omniroute
```

ou:

```bash
npx omniroute
```

O painel fica disponível em:

```text
http://localhost:20128
```

Abra esse URL no navegador do Android. Se executar clientes dentro do Termux, utilize o mesmo anfitrião e porta como URL base compatível com OpenAI.

## Execução em Segundo Plano

Para um processo simples em segundo plano:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Para o parar:

```bash
pkill -f omniroute
```

Para iniciar automaticamente após o arranque do dispositivo, instale o complemento Termux:Boot e crie um script de arranque:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

A otimização da bateria do Android pode terminar processos em segundo plano de longa duração. Desative a otimização da bateria para o Termux se pretender que o servidor permaneça online.

## Acesso a Partir de Outros Dispositivos

Encontre o endereço IP do telemóvel na rede WiFi:

```bash
ip addr show wlan0
```

Em seguida, abra o painel noutro dispositivo:

```text
http://PHONE_IP:20128
```

Por exemplo:

```text
http://192.168.1.50:20128
```

Mantenha o telemóvel e o cliente na mesma rede fidedigna. Se expuser o OmniRoute para fora do telemóvel, ative chaves de API e a autenticação do painel.

## Diretório de Dados

Por predefinição, o OmniRoute armazena os dados no diretório pessoal do Termux, seguindo o mesmo comportamento de caminhos de dados do lado do servidor utilizado no Linux. Para colocar a base de dados numa localização explícita:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Limitações

- O Electron não funciona no Termux.
- Não existe integração com a área de notificação do sistema nem com o ambiente de trabalho.
- Esta configuração destina-se apenas ao servidor: utilize o painel no navegador.
- As dependências nativas poderão ter de ser compiladas localmente.
- Os dispositivos Android com pouca memória poderão exigir menos pedidos simultâneos.
- As funcionalidades de certificados MITM/do sistema poderão exigir alterações ao repositório de confiança ao nível do Android, fora do Termux.

## Resolução de Problemas

### Plataforma não suportada: android (todos os pedidos devolvem HTTP 500)

**Sintoma:** `omniroute` / `omniroute serve` apresenta `✔ OmniRoute is running!`, mas todos os pedidos ao painel ou à API devolvem simplesmente `500 Internal Server Error`. `~/.omniroute/logs/application/app.log` permanece vazio, `APP_LOG_LEVEL=debug` não apresenta nada de útil e o corpo da resposta é texto simples (`Internal Server Error`), sem detalhes em JSON.

**Causa:** Algumas versões do Termux/Node indicam `process.platform === "android"`. A função `getCacheDirectory()` do Next.js não processa essa plataforma: exige que `~/.cache` (ou um diretório temporário genérico) _já_ exista; caso contrário, falha ao carregar o hook de instrumentação com:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Como o hook nunca é carregado, o registo de eventos nunca é iniciado — o erro 500 parece completamente impossível de diagnosticar. O OmniRoute cria `~/.cache` (e define `XDG_CACHE_HOME` quando não está definido) no ponto de entrada da CLI, antes de o Next.js iniciar, para que esta verificação seja bem-sucedida no Android/Termux.

**Resolução suportada (sem modificar o pacote):**

```bash
mkdir -p ~/.cache
omniroute serve
```

Nas versões atuais do OmniRoute, a CLI faz isto automaticamente no Android/Termux — uma nova instalação através de `npx -y omniroute@latest` / instalação global não deverá exigir o passo manual. Se continuar a ver o erro após atualizar, crie `~/.cache` uma vez, conforme indicado acima, e reinicie.

**Não** modifique `dist/server.js` para forçar `process.platform = "linux"`. Esse tipo de modificação do pacote é substituído em cada reinstalação/atualização e é desnecessário quando o diretório de cache existe.

### Erros de Compilação do better-sqlite3

Instale a cadeia de ferramentas de compilação do Termux:

```bash
pkg install nodejs python build-essential
```

Em seguida, execute novamente:

```bash
npx -y omniroute@latest
```

### Porta Já em Utilização

Verifique o que está a escutar na porta predefinida:

```bash
ss -ltnp | grep 20128
```

Pare o processo antigo:

```bash
pkill -f omniroute
```

### Painel Inacessível a Partir de Outro Dispositivo

Confirme que ambos os dispositivos estão na mesma rede WiFi e, em seguida, teste a partir do Termux:

```bash
curl http://localhost:20128
```

Se o acesso local funcionar, mas o acesso pela LAN não, verifique o isolamento do hotspot/WiFi do Android e quaisquer perfis de firewall ou VPN no telemóvel.
