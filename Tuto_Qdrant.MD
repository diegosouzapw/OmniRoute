# Tutorial Qdrant no OmniRoute (Guia para vídeo)

## 1) O que é o Qdrant no OmniRoute
O Qdrant é o banco vetorial usado para memória semântica.

No OmniRoute, ele ajuda a:
- Encontrar contexto por significado (não só palavra exata).
- Reaproveitar memórias antigas com mais precisão.
- Melhorar respostas com base em histórico relevante.
- Escalar melhor quando a base de memória cresce.

---

## 2) Quando o OmniRoute envia dados para o Qdrant
Com Qdrant habilitado e modelo de embedding configurado, o sistema envia vetores quando:
- Memórias são salvas (upsert de memória).
- Fluxos de chat recuperam contexto semântico/híbrido.
- Testes de busca no painel geram embedding e consultam a coleção.

Resumo prático:
- Sem Qdrant: busca mais limitada (texto/chave).
- Com Qdrant: busca por similaridade semântica (mais inteligente).

---

## 3) Pré-requisitos
Você precisa de:
- Instância Qdrant acessível (porta 6333).
- Coleção criada (ex.: `omniroute_memory`).
- Modelo de embedding válido (ex.: OpenRouter).
- Credencial do provider do embedding configurada no OmniRoute.

Exemplo de modelo OpenRouter:
- `openrouter/nvidia/llama-nemotron-embed-v1-1b-v2:free`

Importante:
- O texto do modelo deve estar em formato `provider/model`.
- Se usar modelo com dimensão diferente da coleção, a busca falha.

---

## 4) Como configurar no painel do OmniRoute
No menu:
- `Admin > Settings > Qdrant (Memória vetorial)`

Preencha:
- `Ativar Qdrant`: ligado.
- `Host`: IP ou URL do servidor Qdrant (sem porta no campo Host).
- `Porta`: `6333`.
- `Collection`: `omniroute_memory` (ou nome que você criou).
- `Modelo de embedding`: selecione da lista ou digite manualmente.
- `API Key`: opcional (preencha se seu Qdrant exigir).

Depois:
1. Clique em `Salvar`.
2. Clique em `Testar conexão`.
3. No `Teste de busca`, digite um texto e clique em `Buscar`.

---

## 5) Como criar a coleção no Dashboard do Qdrant (sem comando)
No Qdrant Dashboard:
1. Clique em `Create collection`.
2. Escolha `Global search`.
3. Em tipo de busca, use `Custom`.
4. Configure vetor:
   - Vector name: `omniao` (padrão esperado pelo OmniRoute atualmente).
   - Size: dimensão do seu modelo de embedding (ex.: 2048 em alguns modelos NVIDIA).
   - Distance: `Cosine`.
5. Salve a coleção com nome `omniroute_memory`.

Se já tinha coleção com dimensão errada:
- Recrie a coleção com dimensão correta.

---

## 6) Como validar se está funcionando
Checklist rápido:
1. `Testar conexão` no OmniRoute retorna OK.
2. Busca no painel retorna resultados (não “Sem resultados”).
3. No Qdrant Dashboard, aparecem pontos na coleção (payload + vector).
4. Resultados de chat passam a recuperar contexto mais relevante.

Sinal clássico de problema:
- Dados entram no Qdrant, mas busca do painel não retorna nada.

Causas comuns:
- Dimensão do vetor incompatível.
- Nome do vetor diferente do esperado (`omniao`).
- Modelo inválido/incompleto no campo de embedding.
- Provider sem credencial ativa.

---

## 7) O que melhorou com esta atualização
Nesta melhoria do OmniRoute:
- Suporte a embeddings de qualquer provider compatível (não só OpenAI fixo).
- Endpoint para carregar modelos de embedding na tela de configurações.
- Campo manual para modelo custom quando não aparecer na lista.
- Ajuda visual (`?`) com passo rápido de configuração Qdrant + OpenRouter.

---

## 8) Roteiro curto para seu vídeo
Sugestão de demo (3-5 minutos):
1. Mostrar problema sem Qdrant (busca simples).
2. Abrir Settings e habilitar Qdrant.
3. Configurar host/porta/collection/modelo.
4. Salvar + testar conexão.
5. Fazer `Teste de busca` no painel.
6. Abrir Qdrant Dashboard e mostrar ponto salvo + vetor.
7. Rodar um chat e mostrar melhoria de recuperação semântica.

Mensagem final para a galera:
- "Qdrant no OmniRoute transforma memória de palavra-chave em memória por significado."

---

## 9) Referências de código (para equipe técnica)
- UI de configuração Qdrant:
  - `src/app/(dashboard)/dashboard/settings/components/MemorySkillsTab.tsx`
- Endpoint de modelos de embedding para Qdrant:
  - `src/app/api/settings/qdrant/embedding-models/route.ts`
- Integração backend com Qdrant (health, upsert, search, cleanup):
  - `src/lib/memory/qdrant.ts`
- Recuperação de memórias no fluxo de chat:
  - `src/lib/memory/retrieval.ts`
  - `open-sse/handlers/chatCore.ts`

---

## 10) Observação importante de segurança
Nunca exponha em vídeo:
- API key completa do OpenRouter.
- Tokens reais de produção.
- Endpoints internos sem proteção.

Use chaves mascaradas e ambiente de demonstração.
