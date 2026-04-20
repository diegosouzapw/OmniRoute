# Easy IA Site

Landing page e area do cliente para o produto Easy IA.

## Desenvolvimento local

```bash
cd site
npm run dev
```

Porta padrao: `http://127.0.0.1:20132`.

Variaveis principais:

```bash
OMNIROUTE_API_URL=http://127.0.0.1:20128
OMNIROUTE_PUBLIC_BASE_URL=https://ai.ramelseg.com.br/v1
OMNIROUTE_DEMO_API_KEY=
```

A area do cliente consome as APIs do OmniRoute, sem acessar SQLite diretamente.
