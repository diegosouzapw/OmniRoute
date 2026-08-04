// Cookie confirmado em src/app/api/auth/login/route.ts (cookieStore.set("auth_token", ...))
// e em src/shared/utils/apiAuth.ts (isDashboardSessionAuthenticated lê "auth_token").
const TOKEN_COOKIE = "auth_token";

export function extractJwtCookie(setCookies) {
  for (const c of setCookies || []) {
    const m = c.match(new RegExp(`^(${TOKEN_COOKIE}=[^;]+)`));
    if (m) return m[1];
  }
  return null;
}

export function extractApiKey(body) {
  if (!body?.key || !body?.id) throw new Error("POST /api/keys sem key/id no corpo");
  return { key: body.key, id: body.id };
}

// fetch com 1 retry para erros de socket (keep-alive reciclado pelo servidor
// entre requests espaçados derruba o 1º write com EPIPE/other side closed).
async function fetchRetry(url, init, retries = 1) {
  try {
    return await fetch(url, init);
  } catch (err) {
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, 1_000));
      return fetchRetry(url, init, retries - 1);
    }
    throw err;
  }
}

/** Login admin → cria API key efêmera. Retorna {key, id, cookie, revoke()}. */
export async function createEphemeralKey(baseUrl, password) {
  const login = await fetchRetry(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  if (!login.ok) throw new Error(`login falhou: HTTP ${login.status}`);
  const cookie = extractJwtCookie(login.headers.getSetCookie());
  if (!cookie) throw new Error("login sem cookie de sessão");

  // sufixo único por run: dois runs paralelos (ou um cleanup por nome) nunca colidem
  const name = `homolog-${new Date().toISOString().slice(0, 10)}-${Math.random().toString(36).slice(2, 8)}`;
  const create = await fetchRetry(`${baseUrl}/api/keys`, {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie },
    body: JSON.stringify({ name }),
  });
  if (!create.ok) throw new Error(`criação de key falhou: HTTP ${create.status}`);
  const { key, id } = extractApiKey(await create.json());

  return {
    key,
    id,
    cookie,
    async revoke() {
      const del = await fetchRetry(`${baseUrl}/api/keys/${id}`, {
        method: "DELETE",
        headers: { cookie },
      });
      if (!del.ok) throw new Error(`revogação da key ${id} falhou: HTTP ${del.status}`);
    },
  };
}
