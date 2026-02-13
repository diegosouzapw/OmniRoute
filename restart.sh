#!/bin/bash

PORT=20128
MAX_ATTEMPTS=3
echo "🔄 Reiniciando aplicação na porta $PORT..."

# Função para matar processos pela porta
kill_by_port() {
  local attempt=1
  
  while [ $attempt -le $MAX_ATTEMPTS ]; do
    echo "Tentativa $attempt de $MAX_ATTEMPTS..."
    
    # Tenta encontrar processos usando lsof
    PIDS=$(lsof -ti:$PORT 2>/dev/null)
    
    if [ -z "$PIDS" ]; then
      echo "✓ Porta $PORT está livre"
      return 0
    fi
    
    echo "🔴 Matando processos na porta $PORT: $PIDS"
    
    # Tenta SIGTERM primeiro (mais gentil)
    if [ $attempt -eq 1 ]; then
      for PID in $PIDS; do
        kill $PID 2>/dev/null && echo "  - SIGTERM enviado para PID $PID"
      done
      sleep 2
    else
      # Se não funcionou, usa SIGKILL (força)
      for PID in $PIDS; do
        kill -9 $PID 2>/dev/null && echo "  - SIGKILL enviado para PID $PID"
      done
      sleep 1
    fi
    
    # Fallback: tenta fuser se lsof não funcionou
    if command -v fuser >/dev/null 2>&1; then
      fuser -k -9 $PORT/tcp 2>/dev/null && echo "  - fuser utilizado como fallback"
      sleep 1
    fi
    
    attempt=$((attempt + 1))
  done
  
  # Última verificação
  if lsof -ti:$PORT >/dev/null 2>&1; then
    echo "❌ Erro: Não foi possível liberar a porta $PORT após $MAX_ATTEMPTS tentativas"
    echo "Processos ainda ativos:"
    lsof -i:$PORT 2>/dev/null
    return 1
  fi
  
  return 0
}

# Executa a função de kill
if ! kill_by_port; then
  echo ""
  echo "💡 Sugestão: Execute manualmente:"
  echo "   sudo lsof -ti:$PORT | xargs kill -9"
  exit 1
fi

echo ""
echo "🧹 Limpando build anterior (.next)..."
rm -rf .next

echo "🔨 Fazendo build limpo..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build falhou!"
  exit 1
fi

echo ""
echo "🚀 Iniciando servidor na porta $PORT..."
LOG_FILE="/tmp/omniroute.log"
> "$LOG_FILE"

npx next start --port $PORT >> "$LOG_FILE" 2>&1 &
SERVER_PID=$!

# Ao fechar (Ctrl+C), mata o servidor e libera a porta
cleanup() {
  echo ""
  echo "🛑 Parando servidor (PID: $SERVER_PID)..."
  kill $SERVER_PID 2>/dev/null
  wait $SERVER_PID 2>/dev/null
  fuser -k $PORT/tcp 2>/dev/null
  echo "✅ Servidor parado. Porta $PORT liberada."
  exit 0
}
trap cleanup SIGINT SIGTERM

# Aguarda o servidor ficar pronto
echo "⏳ Aguardando servidor iniciar (PID: $SERVER_PID)..."
for i in $(seq 1 15); do
  sleep 1
  if curl -s -o /dev/null -w "" http://localhost:$PORT > /dev/null 2>&1; then
    echo ""
    echo "✅ Servidor rodando em http://localhost:$PORT (PID: $SERVER_PID)"
    echo "📄 Pressione Ctrl+C para parar"
    echo "────────────────────────────────────────"
    break
  fi
  printf "."
done

# Fica mostrando os logs na tela até Ctrl+C
tail -f "$LOG_FILE" &
TAIL_PID=$!
wait $SERVER_PID 2>/dev/null
kill $TAIL_PID 2>/dev/null
