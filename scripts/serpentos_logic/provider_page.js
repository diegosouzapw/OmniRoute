(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [72134],
  {
    56411: (e, t, a) => {
      Promise.resolve().then(a.bind(a, 89792));
    },
    72934: (e, t, a) => {
      "use strict";
      a.d(t, { A: () => o });
      var r = a(95155),
        l = a(96914),
        i = a(50910);
      function o({ size: e = "sm" }) {
        let { emailsVisible: t, toggleEmailVisibility: a } = (0, l.A)(),
          s = (0, i.c)("providers")(t ? "hideEmails" : "showEmails");
        return (0, r.jsx)("button", {
          type: "button",
          onClick: a,
          className: `inline-flex ${"md" === e ? "h-10 w-10" : "h-8 w-8"} items-center justify-center rounded transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${t ? "bg-primary/15 text-primary hover:bg-primary/25" : "text-text-muted hover:bg-sidebar hover:text-primary"}`,
          title: s,
          "aria-label": s,
          "aria-pressed": t,
          children: (0, r.jsx)("span", {
            className: `material-symbols-outlined ${"md" === e ? "text-[20px]" : "text-[16px]"} leading-none`,
            children: t ? "visibility" : "visibility_off",
          }),
        });
      }
    },
    89792: (e, t, a) => {
      "use strict";
      (a.r(t), a.d(t, { default: () => ef }));
      var r = a(95155),
        l = a(12115),
        i = a(47650),
        o = a(20456),
        s = a(50910),
        n = a(67040);
      let d = {
        llm: "chat",
        embedding: "data_object",
        image: "image",
        imageToText: "image_search",
        tts: "record_voice_over",
        stt: "mic",
        webSearch: "search",
        webFetch: "language",
        video: "videocam",
        music: "music_note",
      };
      function c({ kinds: e, activeKind: t, onSelect: a, className: l }) {
        let i = (0, s.c)("media");
        return e.length <= 1
          ? null
          : (0, r.jsx)("div", {
              className: (0, n.cn)("flex flex-wrap gap-2", l),
              children: e.map((e) => {
                let l = e === t,
                  o = i(`kinds.${e}`),
                  s = d[e] ?? "category";
                return (0, r.jsxs)(
                  "button",
                  {
                    type: "button",
                    onClick: () => a(e),
                    "aria-current": l ? "page" : void 0,
                    className: (0, n.cn)(
                      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors",
                      l
                        ? "bg-primary text-white border-primary"
                        : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/30"
                    ),
                    children: [
                      (0, r.jsx)("span", {
                        className: "material-symbols-outlined text-[13px] leading-none",
                        children: s,
                      }),
                      o,
                    ],
                  },
                  e
                );
              }),
            });
      }
      var p = a(71854),
        m = a(64942),
        u = a(75502),
        x = a(87398),
        h = a(93365),
        f = a(13415),
        g = a(70348),
        b = a(86380),
        y = a(67671),
        v = a(73321),
        j = a(98500),
        k = a.n(j),
        C = a(40993),
        N = a(20909);
      let w = [
          { value: "ide", labelKey: "antigravityClientProfileIde" },
          { value: "harness", labelKey: "antigravityClientProfileHarness" },
        ],
        S = function (e) {
          let t = ("string" == typeof e && e.trim().length > 0 ? e.trim() : null)?.toLowerCase();
          return "harness" === t || "cli" === t || "sdk" === t ? "harness" : "ide";
        };
      var A = a(81135),
        I = a(54674),
        T = a(97305),
        M = a(30949);
      let P = ["openai", "openai-responses", "claude"];
      var E = a(37167),
        O = a(96914),
        $ = a(72934),
        D = a(29862),
        L = a(48687),
        F = a(28817);
      function U(e, t) {
        return (
          "claude" === e &&
          !1 !== (t && "object" == typeof t && !Array.isArray(t) ? t : {}).blockExtraUsage
        );
      }
      let _ = "omniroute-risk-acknowledged";
      function R() {
        try {
          if (void 0 === globalThis.localStorage) return null;
          return globalThis.localStorage;
        } catch {
          return null;
        }
      }
      function H() {
        let e = R();
        if (!e) return {};
        try {
          let t = e.getItem(_);
          if (!t) return {};
          let a = JSON.parse(t);
          if (!a || "object" != typeof a || Array.isArray(a)) return {};
          let r = {};
          for (let [e, t] of Object.entries(a)) !0 === t && (r[e] = !0);
          return r;
        } catch {
          return {};
        }
      }
      function z(e) {
        return !0 === H()[e];
      }
      function B(e) {
        let [t, a] = (0, l.useState)(() => z(e));
        return (
          (0, l.useEffect)(() => {
            a(z(e));
          }, [e]),
          {
            acknowledged: t,
            acknowledge: (0, l.useCallback)(() => {
              let t = H();
              t[e] = !0;
              let r = R();
              if (r)
                try {
                  r.setItem(_, JSON.stringify(t));
                } catch {}
              a(!0);
            }, [e]),
          }
        );
      }
      function K({ variant: e, providerId: t, providerName: a, onConfirm: i, onCancel: o }) {
        let n = (0, s.c)("providers.riskNotice"),
          d = (0, l.useId)(),
          [c, p] = (0, l.useState)(!1),
          { acknowledge: m } = B(t);
        return (0, r.jsx)(C.aF, {
          isOpen: !0,
          onClose: o,
          title: n("title"),
          size: "md",
          children: (0, r.jsxs)("div", {
            className: "flex flex-col gap-5",
            children: [
              (0, r.jsxs)("div", {
                className:
                  "flex items-start gap-3 rounded-lg border border-amber-500/25 bg-amber-500/10 p-4",
                children: [
                  (0, r.jsx)("span", {
                    className:
                      "material-symbols-outlined mt-0.5 text-[28px] leading-none text-amber-500",
                    "aria-hidden": "true",
                    children: "info",
                  }),
                  (0, r.jsxs)("div", {
                    className: "min-w-0 text-text-main",
                    children: [
                      (0, r.jsx)("p", { className: "mb-2 text-sm font-semibold", children: a }),
                      (0, r.jsx)("p", {
                        className: "whitespace-pre-line text-sm leading-6 text-text-muted",
                        children: n(e),
                      }),
                    ],
                  }),
                ],
              }),
              (0, r.jsxs)("label", {
                htmlFor: d,
                className: "flex cursor-pointer items-center gap-2 text-xs text-text-muted",
                children: [
                  (0, r.jsx)("input", {
                    id: d,
                    type: "checkbox",
                    checked: c,
                    onChange: (e) => {
                      let t = e.target.checked;
                      (p(t), t && m());
                    },
                    className: "size-4 rounded border-border text-primary focus:ring-primary/30",
                  }),
                  n("dontShowAgain"),
                ],
              }),
              (0, r.jsxs)("div", {
                className: "flex justify-end gap-2",
                children: [
                  (0, r.jsx)(C.$n, { variant: "ghost", onClick: o, children: n("cancel") }),
                  (0, r.jsx)(C.$n, { variant: "primary", onClick: i, children: n("understand") }),
                ],
              }),
            ],
          }),
        });
      }
      var J = a(81176);
      let G = {
        "chatgpt-web": {
          kind: "cookie",
          credentialName: "__Secure-next-auth.session-token",
          placeholder: "__Secure-next-auth.session-token=...",
          acceptsFullCookieHeader: !0,
        },
        "grok-web": {
          kind: "cookie",
          credentialName: "sso",
          placeholder: "sso=...",
          acceptsFullCookieHeader: !0,
        },
        "gemini-web": {
          kind: "cookie",
          credentialName: "__Secure-1PSID (optional: __Secure-1PSIDTS)",
          placeholder: "__Secure-1PSID=...; __Secure-1PSIDTS=...",
          acceptsFullCookieHeader: !0,
        },
        "perplexity-web": {
          kind: "cookie",
          credentialName: "__Secure-next-auth.session-token",
          placeholder: "__Secure-next-auth.session-token=...",
          acceptsFullCookieHeader: !0,
        },
        "blackbox-web": {
          kind: "cookie",
          credentialName: "__Secure-authjs.session-token",
          placeholder: "__Secure-authjs.session-token=...; other=value",
          acceptsFullCookieHeader: !0,
        },
        "muse-spark-web": {
          kind: "cookie",
          credentialName: "abra_sess",
          placeholder: "abra_sess=...; other=value",
          acceptsFullCookieHeader: !0,
        },
        "claude-web": {
          kind: "cookie",
          credentialName: "sessionKey",
          placeholder: "sessionKey=... or full Cookie header from claude.ai",
          acceptsFullCookieHeader: !0,
        },
        "deepseek-web": {
          kind: "token",
          credentialName: "userToken",
          placeholder: "userToken=... or paste raw userToken",
          acceptsFullCookieHeader: !1,
        },
        "copilot-web": {
          kind: "token",
          credentialName: "access_token",
          placeholder: "access_token=... or a DevTools HAR export",
          acceptsFullCookieHeader: !1,
        },
        "veoaifree-web": {
          kind: "none",
          credentialName: "",
          placeholder: "",
          acceptsFullCookieHeader: !1,
        },
        "t3-web": {
          kind: "cookie",
          credentialName: "convex-session-id + Cookie header",
          placeholder: "convex-session-id=abc123...; Cookie: ...",
          acceptsFullCookieHeader: !0,
        },
        "adapta-web": {
          kind: "cookie",
          credentialName: "__client",
          placeholder: "__client=... or full Cookie header from agent.adapta.one",
          acceptsFullCookieHeader: !0,
        },
        "inner-ai": {
          kind: "cookie",
          credentialName: "token + email",
          placeholder: "token_value user@example.com",
          acceptsFullCookieHeader: !1,
        },
      };
      function Z(e) {
        return "string" != typeof e ? null : (G[e] ?? null);
      }
      var W = a(49304).hp;
      function q(e) {
        let t = new Map();
        for (let a of e) a.id && t.set(a.id, a);
        return t;
      }
      function V(e, t, a) {
        return e?.compatByProtocol?.[a] ?? t?.compatByProtocol?.[a];
      }
      function Q(e, t, a, r) {
        return "function" == typeof e.has && e.has(t)
          ? e(t, r)
          : r
            ? Object.entries(r).reduce((e, [t, a]) => e.replaceAll(`{${t}}`, String(a)), a)
            : a;
      }
      function X(e, t, a) {
        if ("none" === t.kind) return Q(e, "webNoAuthCredentialLabel", "No credential required");
        let r =
          "token" === t.kind
            ? Q(e, "webTokenCredentialLabel", "Web session token")
            : e("sessionCookieLabel");
        return a ? `${r} (${e("optional").toLowerCase()})` : r;
      }
      function Y(e, t, a, r) {
        if ("none" === t.kind) return;
        let l = { provider: a, credential: t.credentialName };
        return r
          ? "token" === t.kind
            ? Q(
                e,
                "webTokenEditHint",
                "Leave blank to keep the current web session token. Credential: {credential}.",
                l
              )
            : Q(
                e,
                "webCookieEditHint",
                "Leave blank to keep the current session cookie. Required cookie: {credential}.",
                l
              )
          : "token" === t.kind
            ? Q(
                e,
                "webTokenCredentialHint",
                "Credential: {credential}. Paste the token value from your own signed-in {provider} web session, or a DevTools HAR export if the provider supports it.",
                l
              )
            : Q(
                e,
                "webCookieCredentialHint",
                "Required cookie: {credential}. Paste the Cookie header value from your own signed-in {provider} web session. Do not include the Cookie: prefix.",
                l
              );
      }
      function ee(e, t) {
        return "token" === t.kind
          ? Q(e, "checkWebToken", "Check token")
          : Q(e, "checkCookie", "Check cookie");
      }
      function et({ requirement: e, providerName: t, t: a }) {
        if ("none" === e.kind)
          return (0, r.jsx)("div", {
            className:
              "rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-3 py-3 text-sm text-text-muted",
            children: (0, r.jsxs)("div", {
              className: "flex items-start gap-2",
              children: [
                (0, r.jsx)("span", {
                  className: "material-symbols-outlined mt-0.5 text-[18px] text-emerald-500",
                  children: "check_circle",
                }),
                (0, r.jsxs)("div", {
                  children: [
                    (0, r.jsx)("p", {
                      className: "font-medium text-text-main",
                      children: Q(a, "webNoAuthGuideTitle", "No credential required"),
                    }),
                    (0, r.jsx)("p", {
                      className: "mt-1",
                      children: Q(
                        a,
                        "webNoAuthGuideBody",
                        "{provider} does not need an API key or cookie. Save the connection to use its free web endpoint.",
                        { provider: t }
                      ),
                    }),
                  ],
                }),
              ],
            }),
          });
        let l = "token" === e.kind ? "webTokenRequiredCredential" : "webCookieRequiredCredential",
          i = "token" === e.kind ? "Required token: {credential}" : "Required cookie: {credential}";
        return (0, r.jsx)("div", {
          className:
            "rounded-lg border border-purple-500/25 bg-purple-500/10 px-3 py-3 text-sm text-text-muted",
          children: (0, r.jsxs)("div", {
            className: "flex items-start gap-2",
            children: [
              (0, r.jsx)("span", {
                className: "material-symbols-outlined mt-0.5 text-[18px] text-purple-500",
                children: "cookie",
              }),
              (0, r.jsxs)("div", {
                className: "space-y-2",
                children: [
                  (0, r.jsxs)("div", {
                    children: [
                      (0, r.jsx)("p", {
                        className: "font-medium text-text-main",
                        children: Q(a, "webSessionGuideTitle", "How to get the session credential"),
                      }),
                      (0, r.jsx)("p", {
                        className: "mt-1",
                        children: Q(
                          a,
                          "webSessionGuideIntro",
                          "{provider} uses a browser web session instead of an API key.",
                          { provider: t }
                        ),
                      }),
                    ],
                  }),
                  (0, r.jsx)("p", {
                    className: "font-medium text-text-main",
                    children: Q(a, l, i, { credential: e.credentialName }),
                  }),
                  (0, r.jsxs)("ol", {
                    className: "list-decimal space-y-1 pl-5",
                    children: [
                      (0, r.jsx)("li", {
                        children: Q(
                          a,
                          "webSessionGuideStep1",
                          "Sign in to {provider} in your browser.",
                          { provider: t }
                        ),
                      }),
                      (0, r.jsx)("li", {
                        children: Q(
                          a,
                          "webSessionGuideStep2",
                          "Open the browser developer tools and inspect a request made by the web app."
                        ),
                      }),
                      (0, r.jsx)("li", {
                        children: Q(
                          a,
                          "webSessionGuideStep3",
                          "Copy the required credential from the provider's own domain. For cookies, copy only the Cookie header value and omit Cookie:.",
                          { credential: e.credentialName }
                        ),
                      }),
                      (0, r.jsx)("li", {
                        children: Q(
                          a,
                          "webSessionGuideStep4",
                          "Paste it here and check the connection. If it stops working, sign in again and replace it with a fresh value."
                        ),
                      }),
                    ],
                  }),
                  (0, r.jsx)("p", {
                    className: "text-xs text-amber-700 dark:text-amber-300",
                    children: Q(
                      a,
                      "webSessionSecurityHint",
                      "Treat this like a password: it may access your signed-in web account until it expires or is revoked."
                    ),
                  }),
                ],
              }),
            ],
          }),
        });
      }
      function ea(e, t, a, r) {
        let l = a.get(e),
          i = r.get(e),
          o = V(l, i, t);
        return o && Object.prototype.hasOwnProperty.call(o, "normalizeToolCallId")
          ? !!o.normalizeToolCallId
          : !!l?.normalizeToolCallId || !!i?.normalizeToolCallId;
      }
      function er(e, t, a, r) {
        let l = a.get(e),
          i = r.get(e),
          o = V(l, i, t);
        return o && Object.prototype.hasOwnProperty.call(o, "preserveOpenAIDeveloperRole")
          ? !!o.preserveOpenAIDeveloperRole
          : l && Object.prototype.hasOwnProperty.call(l, "preserveOpenAIDeveloperRole")
            ? !!l.preserveOpenAIDeveloperRole
            : !(i && Object.prototype.hasOwnProperty.call(i, "preserveOpenAIDeveloperRole")) ||
              !!i.preserveOpenAIDeveloperRole;
      }
      async function el(e) {
        try {
          let t = await e.json(),
            a = t?.error;
          if (Array.isArray(a?.details) && a.details.length > 0)
            return a.details
              .map((e) => {
                let t = "string" == typeof e.field && e.field ? e.field : "?",
                  a = "string" == typeof e.message ? e.message : "";
                return a ? `${t}: ${a}` : t;
              })
              .join("; ");
          if ("string" == typeof a?.message && a.message.trim()) return a.message.trim();
        } catch {}
        return e.statusText?.trim() || `HTTP ${e.status}`;
      }
      function ei(e, t, a, r) {
        let l = a.get(e),
          i = r.get(e),
          o = {};
        l?.upstreamHeaders && "object" == typeof l.upstreamHeaders
          ? Object.assign(o, l.upstreamHeaders)
          : i?.upstreamHeaders &&
            "object" == typeof i.upstreamHeaders &&
            Object.assign(o, i.upstreamHeaders);
        let s = V(l, i, t);
        return (
          s?.upstreamHeaders &&
            "object" == typeof s.upstreamHeaders &&
            Object.assign(o, s.upstreamHeaders),
          o
        );
      }
      function eo({ source: e }) {
        return (0, r.jsx)("span", {
          className: `rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${(function (
            e
          ) {
            switch ((0, T.J4)(e)) {
              case "imported":
                return "border-sky-500/30 bg-sky-500/10 text-sky-300";
              case "custom":
                return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
              case "fallback":
                return "border-amber-500/30 bg-amber-500/10 text-amber-300";
              case "alias":
                return "border-violet-500/30 bg-violet-500/10 text-violet-300";
              default:
                return "border-border bg-sidebar/70 text-text-muted";
            }
          })(e)}`,
          children: (0, T.En)(e),
        });
      }
      let es = (e) => {
          let t = Date.now() - new Date(e).getTime();
          if (t < 0) return "just now";
          let a = Math.floor(t / 6e4);
          if (a < 1) return "just now";
          if (a < 60) return `${a}m ago`;
          let r = Math.floor(a / 60);
          if (r < 24) return `${r}h ago`;
          let l = Math.floor(r / 24);
          return l < 30 ? `${l}d ago` : new Date(e).toLocaleDateString();
        },
        en = "/v1/messages?beta=true",
        ed = [
          { value: "none", label: "None" },
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
          { value: "xhigh", label: "XHigh" },
        ],
        ec = ["default", "priority", "flex"],
        ep = ["none", ...ec];
      function em(e, t) {
        return "none" === t
          ? Q(e, "codexServiceModeNone", "No global setting")
          : "default" === t
            ? Q(e, "codexServiceTierDefault", "Default")
            : "priority" === t
              ? Q(e, "codexServiceTierPriority", "Priority")
              : Q(e, "codexServiceTierFlex", "Flex");
      }
      function eu(e) {
        let t = e && "object" == typeof e && !Array.isArray(e) ? e : {};
        return {
          use5h: "boolean" != typeof t.use5h || t.use5h,
          useWeekly: "boolean" != typeof t.useWeekly || t.useWeekly,
        };
      }
      function ex({
        t: e,
        effectiveModelNormalize: t,
        effectiveModelPreserveDeveloper: a,
        getUpstreamHeadersRecord: o,
        onCompatPatch: s,
        showDeveloperToggle: n = !0,
        disabled: d,
      }) {
        let [c, p] = (0, l.useState)(!1),
          [m, u] = (0, l.useState)(P[0]),
          [x, h] = (0, l.useState)([]),
          [f, g] = (0, l.useState)(null),
          [b, y] = (0, l.useState)(null),
          v = (0, l.useRef)(null),
          j = (0, l.useRef)(null),
          [k, N] = (0, l.useState)(null),
          w = (0, l.useRef)(0),
          S = (0, l.useRef)([]);
        S.current = x;
        let A = () => ((w.current += 1), `uh-${w.current}`),
          I = t(m),
          T = a(m),
          M = n && "claude" !== m,
          E = (0, l.useCallback)(
            (e) => {
              let t,
                a,
                r = (function (e) {
                  let t = {};
                  for (let a of e) {
                    let e = a.name.trim();
                    e && (t[e] = a.value);
                  }
                  return t;
                })(e),
                l = o(m);
              ((t = Object.keys(r).sort()),
                (a = Object.keys(l).sort()),
                (t.length === a.length && t.every((e, t) => e === a[t] && r[e] === l[e])) ||
                  s(m, { upstreamHeaders: r }));
            },
            [o, s, m]
          ),
          O = (0, l.useCallback)(() => {
            queueMicrotask(() => E(S.current));
          }, [E]);
        ((0, l.useEffect)(() => {
          if (c)
            return () => {
              E(S.current);
            };
        }, [c, E]),
          (0, l.useEffect)(() => {
            var e;
            let t;
            c &&
              h(
                ((e = o(m)),
                0 === (t = Object.entries(e).filter(([e]) => e.trim())).length
                  ? [{ id: A(), name: "", value: "" }]
                  : t.map(([e, t]) => ({ id: A(), name: e, value: t })))
              );
          }, [c, m]),
          (0, l.useEffect)(() => {
            (g(null), y(null));
          }, [c, m]));
        let $ = x.filter((e) => e.name.trim()).length < 16,
          D = (e, t) => {
            h((a) => a.map((a) => (a.id === e ? { ...a, ...t } : a)));
          };
        (0, l.useEffect)(() => {
          if (!c) return;
          let e = (e) => {
            let t = e.target,
              a = v.current?.contains(t),
              r = j.current?.contains(t);
            a || r || p(!1);
          };
          return (
            document.addEventListener("mousedown", e),
            () => document.removeEventListener("mousedown", e)
          );
        }, [c]);
        let L = (0, l.useCallback)(() => {
          if (!c || !v.current) return;
          let e = v.current.getBoundingClientRect(),
            t = Math.min(window.innerWidth - 20, 384),
            a = e.right - t;
          a = Math.max(10, Math.min(a, window.innerWidth - t - 10));
          let r = Math.min(0.82 * window.innerHeight, 672),
            l = window.innerHeight - e.bottom - 10,
            i = e.top - 10;
          l < r && i > l
            ? N({ bottom: window.innerHeight - e.top + 8, left: a, width: t })
            : N({ top: e.bottom + 8, left: a, width: t });
        }, [c]);
        return (
          (0, l.useLayoutEffect)(
            () =>
              c
                ? (L(),
                  window.addEventListener("resize", L),
                  window.addEventListener("scroll", L, !0),
                  () => {
                    (window.removeEventListener("resize", L),
                      window.removeEventListener("scroll", L, !0));
                  })
                : void N(null),
            [c, L]
          ),
          (0, r.jsxs)("div", {
            className: "relative inline-flex",
            ref: v,
            children: [
              (0, r.jsxs)("button", {
                type: "button",
                onClick: () => p((e) => !e),
                disabled: d,
                className:
                  "inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-border bg-background text-text-muted hover:bg-muted hover:text-text-main disabled:opacity-50 transition-colors",
                title: e("compatAdjustmentsTitle"),
                children: [
                  (0, r.jsx)("span", {
                    className: "material-symbols-outlined text-base leading-none",
                    children: "tune",
                  }),
                  e("compatButtonLabel"),
                ],
              }),
              c &&
                "u" > typeof document &&
                k &&
                (0, i.createPortal)(
                  (0, r.jsxs)("div", {
                    ref: j,
                    className:
                      "flex max-h-[min(82vh,42rem)] flex-col overflow-hidden rounded-xl border-2 border-zinc-200 bg-white shadow-2xl dark:border-zinc-600 dark:bg-zinc-950",
                    style: {
                      position: "fixed",
                      ...(void 0 !== k.top ? { top: k.top } : { bottom: k.bottom }),
                      left: k.left,
                      width: k.width,
                      zIndex: 10040,
                    },
                    children: [
                      (0, r.jsxs)("div", {
                        className:
                          "shrink-0 border-b-2 border-zinc-200 bg-zinc-100 px-3 py-2.5 dark:border-zinc-600 dark:bg-zinc-900",
                        children: [
                          (0, r.jsx)("p", {
                            className: "text-xs font-semibold text-text-main",
                            children: e("compatAdjustmentsTitle"),
                          }),
                          (0, r.jsx)("p", {
                            className: "text-[11px] text-text-muted mt-1 leading-relaxed",
                            children: e("compatProtocolHint"),
                          }),
                        ],
                      }),
                      (0, r.jsxs)("div", {
                        className:
                          "min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-white p-3 [scrollbar-gutter:stable] [scrollbar-width:thin] dark:bg-zinc-950",
                        children: [
                          (0, r.jsx)("label", {
                            className: "block text-[11px] font-medium text-text-muted mb-1.5",
                            children: e("compatProtocolLabel"),
                          }),
                          (0, r.jsx)("select", {
                            value: m,
                            onChange: (e) => u(e.target.value),
                            disabled: d,
                            className:
                              "mb-4 w-full rounded-lg border border-zinc-200 bg-white px-2.5 py-2 text-xs text-text-main focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-zinc-600 dark:bg-zinc-900",
                            children: P.map((t) =>
                              (0, r.jsx)(
                                "option",
                                {
                                  value: t,
                                  children: e(
                                    "openai" === t
                                      ? "compatProtocolOpenAI"
                                      : "openai-responses" === t
                                        ? "compatProtocolOpenAIResponses"
                                        : "claude" === t
                                          ? "compatProtocolClaude"
                                          : "compatProtocolOpenAI"
                                  ),
                                },
                                t
                              )
                            ),
                          }),
                          (0, r.jsxs)("div", {
                            className: "flex flex-col gap-3.5",
                            children: [
                              (0, r.jsx)(C.lM, {
                                size: "sm",
                                label: e("compatToolIdShort"),
                                title: e("normalizeToolCallIdLabel"),
                                checked: I,
                                onChange: (e) => s(m, { normalizeToolCallId: e }),
                                disabled: d,
                              }),
                              M &&
                                (0, r.jsx)(C.lM, {
                                  size: "sm",
                                  label: e("compatDoNotPreserveDeveloper"),
                                  title: e("preserveDeveloperRoleLabel"),
                                  checked: !1 === T,
                                  onChange: (e) => s(m, { preserveOpenAIDeveloperRole: !e }),
                                  disabled: d,
                                }),
                            ],
                          }),
                          (0, r.jsxs)("div", {
                            className:
                              "mt-4 rounded-lg border-2 border-zinc-200 bg-zinc-100 p-3 dark:border-zinc-600 dark:bg-zinc-900",
                            children: [
                              (0, r.jsx)("label", {
                                className: "block text-[11px] font-semibold text-text-main mb-1",
                                children: e("compatUpstreamHeadersLabel"),
                              }),
                              (0, r.jsx)("p", {
                                className: "text-[11px] text-text-muted mb-3 leading-relaxed",
                                children: e("compatUpstreamHeadersHint"),
                              }),
                              (0, r.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                  (0, r.jsxs)("div", {
                                    className:
                                      "grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-1.5 items-end text-[10px] font-medium uppercase tracking-wide text-text-muted px-0.5",
                                    children: [
                                      (0, r.jsx)("span", {
                                        children: e("compatUpstreamHeaderName"),
                                      }),
                                      (0, r.jsx)("span", {
                                        className: "col-span-1",
                                        children: e("compatUpstreamHeaderValue"),
                                      }),
                                      (0, r.jsx)("span", {
                                        className: "w-8 shrink-0",
                                        "aria-hidden": !0,
                                      }),
                                    ],
                                  }),
                                  x.map((t) =>
                                    (0, r.jsxs)(
                                      "div",
                                      {
                                        className:
                                          "grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-1.5 items-center",
                                        children: [
                                          (0, r.jsx)(C.pd, {
                                            value: t.name,
                                            onChange: (e) => D(t.id, { name: e.target.value }),
                                            onBlur: O,
                                            disabled: d,
                                            placeholder: e("compatUpstreamHeaderNamePlaceholder"),
                                            className: "gap-0 min-w-0",
                                            inputClassName:
                                              "h-9 bg-white py-1.5 px-2 text-xs font-mono dark:bg-zinc-900",
                                            autoComplete: "off",
                                          }),
                                          (0, r.jsx)("div", {
                                            className: "min-w-0",
                                            onMouseEnter: () => g(t.id),
                                            onMouseLeave: () => g((e) => (e === t.id ? null : e)),
                                            children: (0, r.jsx)(C.pd, {
                                              type: f === t.id || b === t.id ? "text" : "password",
                                              value: t.value,
                                              onChange: (e) => D(t.id, { value: e.target.value }),
                                              onFocus: () => y(t.id),
                                              onBlur: () => {
                                                (y((e) => (e === t.id ? null : e)), O());
                                              },
                                              disabled: d,
                                              placeholder: e(
                                                "compatUpstreamHeaderValuePlaceholder"
                                              ),
                                              className: "gap-0 min-w-0",
                                              inputClassName:
                                                "h-9 bg-white py-1.5 px-2 text-xs dark:bg-zinc-900",
                                              autoComplete: "off",
                                              spellCheck: !1,
                                            }),
                                          }),
                                          (0, r.jsx)("button", {
                                            type: "button",
                                            disabled: d || x.length <= 1,
                                            onClick: () => {
                                              var e;
                                              return (
                                                (e = t.id),
                                                void h((t) => {
                                                  let a = t.filter((t) => t.id !== e),
                                                    r =
                                                      0 === a.length
                                                        ? [{ id: A(), name: "", value: "" }]
                                                        : a;
                                                  return (queueMicrotask(() => E(r)), r);
                                                })
                                              );
                                            },
                                            title: e("compatUpstreamRemoveRow"),
                                            className:
                                              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/80 text-text-muted hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text-muted transition-colors",
                                            children: (0, r.jsx)("span", {
                                              className:
                                                "material-symbols-outlined text-lg leading-none",
                                              children: "close",
                                            }),
                                          }),
                                        ],
                                      },
                                      t.id
                                    )
                                  ),
                                ],
                              }),
                              (0, r.jsxs)("button", {
                                type: "button",
                                disabled: d || !$,
                                onClick: () => {
                                  $ && h((e) => [...e, { id: A(), name: "", value: "" }]);
                                },
                                className:
                                  "mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2 text-xs font-medium text-primary hover:bg-primary/5 disabled:opacity-40 disabled:hover:bg-transparent transition-colors",
                                children: [
                                  (0, r.jsx)("span", {
                                    className: "material-symbols-outlined text-base leading-none",
                                    children: "add",
                                  }),
                                  e("compatUpstreamAddRow"),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  document.body
                ),
            ],
          })
        );
      }
      function eh({ providerId: e }) {
        let t = N.Q2[e],
          a = t?.serviceKinds ?? [],
          i = [
            "llm",
            "embedding",
            "image",
            "imageToText",
            "tts",
            "stt",
            "webSearch",
            "webFetch",
            "video",
            "music",
          ],
          s = (a.length > 0 ? a.filter((e) => i.includes(e)) : ["llm"]).filter(
            (e) => "imageToText" !== e
          ),
          [n, d] = (0, l.useState)(s[0] ?? "llm");
        return 0 === s.length
          ? null
          : (0, r.jsxs)("div", {
              className: "flex flex-col gap-3",
              children: [
                (0, r.jsx)("h2", { className: "text-lg font-semibold", children: "Playground" }),
                (0, r.jsx)(c, { kinds: s, activeKind: n, onSelect: d }),
                (function (e, t) {
                  switch (e) {
                    case "llm":
                      return (0, r.jsx)(o.e, { providerId: t });
                    case "embedding":
                      return (0, r.jsx)(p.W, { providerId: t });
                    case "image":
                      return (0, r.jsx)(m.G, { providerId: t });
                    case "tts":
                      return (0, r.jsx)(u.i, { providerId: t });
                    case "stt":
                      return (0, r.jsx)(x.Y, { providerId: t });
                    case "webSearch":
                      return (0, r.jsx)(h.X, { providerId: t });
                    case "webFetch":
                      return (0, r.jsx)(f.l, { providerId: t });
                    case "video":
                      return (0, r.jsx)(g.U, { providerId: t });
                    case "music":
                      return (0, r.jsx)(b.M, { providerId: t });
                    default:
                      return null;
                  }
                })(n, e),
              ],
            });
      }
      function ef() {
        let e,
          t = (0, v.useParams)(),
          a = (0, v.useRouter)(),
          i = t.id,
          [o, n] = (0, l.useState)([]),
          [d, c] = (0, l.useState)(!0),
          [p, m] = (0, l.useState)(null),
          [u, x] = (0, l.useState)(!1),
          [h, f] = (0, l.useState)(null),
          [g, b] = (0, l.useState)(!1),
          [j, w] = (0, l.useState)(!1),
          [S, L] = (0, l.useState)({
            phase: "idle",
            state: "",
            authUrl: "",
            callbackUrl: "",
            expiresAt: null,
            message: "",
          }),
          [U, _] = (0, l.useState)(!1),
          [R, H] = (0, l.useState)(!1),
          [G, Z] = (0, l.useState)(!1),
          [W, V] = (0, l.useState)(null),
          [X, Y] = (0, l.useState)(null),
          [ee, et] = (0, l.useState)(!1),
          [eo, es] = (0, l.useState)(null),
          [ed, ec] = (0, l.useState)({}),
          { copied: ex, copy: ef } = (0, M.C)(),
          ev = (0, s.c)("providers"),
          eC = (0, O.A)((e) => e.emailsVisible),
          eN = (0, y.i)(),
          [eS, eA] = (0, l.useState)(null),
          [eI, eT] = (0, l.useState)(null),
          [eM, eP] = (0, l.useState)({}),
          [eE, eO] = (0, l.useState)(!1),
          [e$, eD] = (0, l.useState)(!1),
          [eL, eU] = (0, l.useState)(!1),
          [eH, eK] = (0, l.useState)("openai"),
          [eZ, eV] = (0, l.useState)(""),
          [eQ, eX] = (0, l.useState)(!1),
          [eY, e0] = (0, l.useState)(!1),
          [e1, e5] = (0, l.useState)({
            current: 0,
            total: 0,
            phase: "idle",
            status: "",
            logs: [],
            error: "",
            importedCount: 0,
          }),
          [e2, e3] = (0, l.useState)({ customModels: [], modelCompatOverrides: [] }),
          [e4, e6] = (0, l.useState)([]),
          [e8, e9] = (0, l.useState)(null),
          [e7, te] = (0, l.useState)(""),
          [tt, ta] = (0, l.useState)(null),
          [tr, tl] = (0, l.useState)(null),
          [ti, to] = (0, l.useState)({}),
          [ts, tn] = (0, l.useState)(null),
          [td, tc] = (0, l.useState)(null),
          [tp, tm] = (0, l.useState)(null),
          [tu, tx] = (0, l.useState)(null),
          [th, tf] = (0, l.useState)(!1),
          [tg, tb] = (0, l.useState)(null),
          [ty, tv] = (0, l.useState)(null),
          [tj, tk] = (0, l.useState)(null),
          [tC, tN] = (0, l.useState)(!1),
          [tw, tS] = (0, l.useState)(null),
          [tA, tI] = (0, l.useState)(null),
          [tT, tM] = (0, l.useState)(null),
          [tP, tE] = (0, l.useState)(!1),
          [tO, t$] = (0, l.useState)("none"),
          [tD, tL] = (0, l.useState)([...F.Ak]),
          [tF, tU] = (0, l.useState)(!1),
          [t_, tR] = (0, l.useState)(null),
          [tH, tz] = (0, l.useState)(!1),
          [tB, tK] = (0, l.useState)(new Set()),
          [tJ, tG] = (0, l.useState)(!1),
          tZ = (0, l.useRef)(null),
          tW = (0, l.useRef)(null),
          tq = (0, l.useRef)(null),
          { acknowledged: tV, acknowledge: tQ } = B(i),
          tX = (0, l.useRef)(0),
          tY = (0, N.mq)(i),
          t0 = (0, N.Xv)(i),
          t1 = "command-code" === i,
          t5 = (0, N.gb)(i) && !(0, N.Xv)(i),
          t2 = tY || t5 || t0,
          t3 = t5 || t0,
          t4 = (e, t) => {
            (x(e), f(e && t ? t : null));
          },
          t6 = (0, l.useMemo)(() => ep.map((e) => ({ value: e, label: em(ev, e) })), [ev]),
          t8 = (0, J.S6)(i, {
            providerNode: p,
            compatibleLabels: {
              ccCompatibleName: ev("ccCompatibleLabel"),
              anthropicCompatibleName: ev("anthropicCompatibleName"),
              openAiCompatibleName: ev("openaiCompatibleName"),
            },
          }),
          t9 = t8?.toggleAuthType === "oauth" || t8?.toggleAuthType === "free",
          t7 = t8?.subscriptionRisk === !0,
          ae = (0, N.G8)(i),
          at = t9 && !ae,
          aa = N.vh[i]?.noAuth === !0,
          ar = (0, A.KC)(i),
          al = (0, l.useMemo)(() => {
            if ("gemini" === i) return e4.map((e) => ({ ...e, source: "imported" }));
            let e = ar.map((e) => ({ ...e, source: "system" })),
              t = new Set(e.map((e) => e.id)),
              a = e4
                .filter((e) => e?.id && !t.has(e.id))
                .map((e) => ({ id: e.id, name: e.name || e.id, source: "imported" })),
              r = new Set([...t, ...a.map((e) => e.id)]);
            return [
              ...e,
              ...a,
              ...e2.customModels
                .filter((e) => e.id && !r.has(e.id))
                .map((e) => ({
                  id: e.id,
                  name: e.name || e.id,
                  source: "imported" === (0, T.J4)(e.source) ? "imported" : "custom",
                })),
            ];
          }, [i, ar, e4, e2.customModels]),
          ai = (0, N.wG)(i),
          ao = t2 || "openrouter" === i,
          as = i.endsWith("-search"),
          an = t8?.category === "upstream-proxy",
          ad = (0, I.K)(i),
          ac = t2 ? i : ai,
          ap = t2 ? p?.prefix || i : ai,
          am = (0, l.useCallback)(async () => {
            try {
              let e = await fetch("/api/models/alias"),
                t = await e.json();
              e.ok && ec(t.aliases || {});
            } catch (e) {
              console.log("Error fetching aliases:", e);
            }
          }, []),
          au = (0, l.useCallback)(async () => {
            if (!as)
              try {
                let e = await fetch(`/api/provider-models?provider=${encodeURIComponent(i)}`, {
                  cache: "no-store",
                });
                if (!e.ok) return;
                let t = await e.json();
                e3({
                  customModels: t.models || [],
                  modelCompatOverrides: t.modelCompatOverrides || [],
                });
                try {
                  let e = await fetch(
                    `/api/synced-available-models?provider=${encodeURIComponent(i)}`,
                    { cache: "no-store" }
                  );
                  if (e.ok) {
                    let t = await e.json();
                    e6(t.models || []);
                  } else e6([]);
                } catch {
                  e6([]);
                }
              } catch (e) {
                console.error("fetchProviderModelMeta", e);
              }
          }, [i, as]),
          ax = (0, l.useCallback)(async () => {
            try {
              let [e, t] = await Promise.all([
                  fetch("/api/providers", { cache: "no-store" }),
                  fetch("/api/provider-nodes", { cache: "no-store" }),
                ]),
                a = await e.json(),
                r = await t.json();
              if (e.ok) {
                let e = (a.connections || []).filter((e) => e.provider === i);
                n(e);
              }
              if (t.ok) {
                let e = (r.nodes || []).find((e) => e.id === i) || null;
                if (!e && t2)
                  for (let t = 0; t < 3; t += 1) {
                    await new Promise((e) => setTimeout(e, 150));
                    let t = await fetch("/api/provider-nodes", { cache: "no-store" });
                    if (
                      t.ok &&
                      (e = ((await t.json()).nodes || []).find((e) => e.id === i) || null)
                    )
                      break;
                  }
                m(e);
              }
            } catch (e) {
              console.log("Error fetching connections:", e);
            } finally {
              c(!1);
            }
          }, [i, t2]),
          ah = async (e) => {
            try {
              let t = await fetch(`/api/provider-nodes/${i}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(e),
                }),
                a = await t.json();
              t.ok && (m(a.node), await ax(), H(!1));
            } catch (e) {
              console.log("Error updating provider node:", e);
            }
          };
        (0, l.useEffect)(() => {
          (ax(),
            am(),
            fetch("/api/settings/proxy")
              .then((e) => (e.ok ? e.json() : null))
              .then((e) => eT(e))
              .catch(() => {}));
        }, [ax, am]);
        let af = (0, l.useCallback)(async () => {
            if (!e$) {
              eD(!0);
              try {
                let e = await fetch("/api/providers/zed/import", { method: "POST" }),
                  t = await e.json();
                if (e.ok && t.success)
                  if (t.count)
                    (eN.success(
                      `Imported ${t.count} credential(s) from Zed for ${t.providers?.length ?? 0} provider(s)`
                    ),
                      await ax());
                  else {
                    let e = t.credentials?.length ?? 0;
                    0 === e
                      ? eN.info("No Zed credentials found in keychain")
                      : eN.info(
                          `Found ${e} keychain credential(s), but none matched supported providers`
                        );
                  }
                else (t.zedDockerEnvironment && eU(!0), eN.error(t.error || "Zed import failed"));
              } catch (e) {
                eN.error(e?.message || "Zed import failed");
              } finally {
                eD(!1);
              }
            }
          }, [e$, eN, ax]),
          ag = (0, l.useCallback)(async () => {
            if (!eQ && eZ.trim()) {
              eX(!0);
              try {
                let e = await fetch("/api/providers/zed/manual-import", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ provider: eH, token: eZ.trim() }),
                  }),
                  t = await e.json();
                e.ok && t.success
                  ? (eN.success(`Imported ${eH} token from Zed`), eV(""), await ax())
                  : eN.error(t.error?.message ?? t.error ?? "Manual import failed");
              } catch (e) {
                eN.error(e?.message || "Manual import failed");
              } finally {
                eX(!1);
              }
            }
          }, [eQ, eH, eZ, eN, ax]),
          ab = (0, l.useCallback)(async () => {
            let e = tX.current + 1;
            if (((tX.current = e), "codex" !== i)) {
              (tU(!1), tR(null));
              return;
            }
            (tU(!1), tR(null));
            try {
              let t = await fetch("/api/settings", { cache: "no-store" });
              if (!t.ok) throw Error(`Settings request failed with HTTP ${t.status}`);
              let a = await t.json();
              if (!a || "object" != typeof a) throw Error("Settings response was empty");
              if (tX.current !== e) return;
              let r = (0, F.ku)(a);
              (t$((0, F.xv)(a)), tL([...r.supportedModels]), tU(!0));
            } catch (t) {
              if (tX.current !== e) return;
              (tU(!1), tR(t instanceof Error ? t.message : "Failed to load settings"));
            }
          }, [i]);
        (0, l.useEffect)(() => {
          ab();
        }, [ab]);
        let ay = (0, l.useCallback)(async (e) => {
          if (e.length)
            try {
              let t = await Promise.all(
                  e
                    .filter((e) => e.id)
                    .map((e) =>
                      fetch(`/api/settings/proxy?resolve=${encodeURIComponent(e.id)}`, {
                        cache: "no-store",
                      })
                        .then((e) => (e.ok ? e.json() : null))
                        .then((t) => [e.id, t])
                        .catch(() => [e.id, null])
                    )
                ),
                a = {};
              for (let [e, r] of t) a[e] = r?.proxy ? r : null;
              eP(a);
            } catch {}
        }, []);
        ((0, l.useEffect)(() => {
          d || as || au();
        }, [d, as, au]),
          (0, l.useEffect)(() => {
            !d && o.length > 0 && ay(o);
          }, [d, o, ay]));
        let av = async (e, t) => {
            (tl(e), to((t) => ({ ...t, [e]: void 0 })));
            try {
              let a = await fetch("/api/models/test", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ providerId: W?.provider || p?.id || i, modelId: t }),
                }),
                r = await a.json();
              a.ok && "ok" === r.status
                ? (eN.success(
                    Q(ev, "testModelSuccess", `Model ${e} is working. Latency: ${r.latencyMs}ms`, {
                      modelId: e,
                      latencyMs: r.latencyMs,
                    })
                  ),
                  to((t) => ({ ...t, [e]: "ok" })))
                : (eN.error(r.error || "Model test failed"), to((t) => ({ ...t, [e]: "error" })));
            } catch (t) {
              (eN.error("Network error testing model"), to((t) => ({ ...t, [e]: "error" })));
            } finally {
              tl(null);
            }
          },
          aj = async (e, t, a = ai) => {
            let r = `${a}/${e}`;
            try {
              let e = await fetch("/api/models/alias", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ model: r, alias: t }),
              });
              if (e.ok) await am();
              else {
                let t = await e.json();
                alert(t.error || ev("failedSetAlias"));
              }
            } catch (e) {
              console.log("Error setting alias:", e);
            }
          },
          ak = async (e) => {
            try {
              (
                await fetch(`/api/models/alias?alias=${encodeURIComponent(e)}`, {
                  method: "DELETE",
                })
              ).ok && (await am());
            } catch (e) {
              console.log("Error deleting alias:", e);
            }
          },
          aC = async (e) => {
            if (confirm(ev("deleteConnectionConfirm")))
              try {
                (await fetch(`/api/providers/${e}`, { method: "DELETE" })).ok &&
                  (n(o.filter((t) => t.id !== e)), "gemini" === i && (await au()));
              } catch (e) {
                console.log("Error deleting connection:", e);
              }
          },
          aN = (0, l.useCallback)(() => {
            tK((e) => (e.size === o.length ? new Set() : new Set(o.map((e) => e.id))));
          }, [o]),
          aw = (0, l.useCallback)((e) => {
            tK((t) => {
              let a = new Set(t);
              return (a.has(e) ? a.delete(e) : a.add(e), a);
            });
          }, []),
          aS = async () => {
            if (0 !== tB.size && confirm(ev("batchDeleteConfirm", { count: tB.size }))) {
              tG(!0);
              try {
                let e = await fetch("/api/providers", {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ ids: Array.from(tB) }),
                });
                if (e.ok)
                  (tK(new Set()),
                    await ax(),
                    eN.success(ev("batchDeleteSuccess", { count: tB.size })),
                    "gemini" === i && (await au()));
                else {
                  let t = await e.json();
                  eN.error(t.error || "Batch delete failed");
                }
              } catch {
                eN.error("Network error during batch delete");
              } finally {
                tG(!1);
              }
            }
          },
          aA = (0, l.useCallback)(() => {
            (ax(), t4(!1));
          }, [ax]),
          aI = (0, l.useCallback)(() => {
            at ? t4(!0) : b(!0);
          }, [at]),
          aT = (0, l.useCallback)(
            (e) => {
              if (t7 && !tV && !z(i)) {
                ((tq.current = e), w(!0));
                return;
              }
              e();
            },
            [i, tV, t7]
          ),
          aM = (0, l.useCallback)(() => {
            (tQ(), w(!1));
            let e = tq.current;
            ((tq.current = null), e?.());
          }, [tQ]),
          aP = (0, l.useCallback)(() => {
            ((tq.current = null), w(!1));
          }, []),
          aE = (0, l.useCallback)(() => {
            null !== tW.current && (window.clearTimeout(tW.current), (tW.current = null));
          }, []);
        (0, l.useEffect)(
          () => () => {
            (aE(), tZ.current?.close?.());
          },
          [aE]
        );
        let aO = (0, l.useCallback)(() => {
            (aE(),
              tZ.current?.close?.(),
              (tZ.current = null),
              L({
                phase: "idle",
                state: "",
                authUrl: "",
                callbackUrl: "",
                expiresAt: null,
                message: "",
              }),
              b(!1));
          }, [aE]),
          a$ = (0, l.useCallback)(
            async (e, t, a, r) => {
              L((e) => ({ ...e, phase: "applying", message: "Applying browser-approved key…" }));
              try {
                let l = await fetch("/api/providers/command-code/auth/apply", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ state: e, connectionId: t, name: a, setDefault: r }),
                  }),
                  i = await l.json().catch(() => ({}));
                if (!l.ok) {
                  let e = i.error || "Failed to apply Command Code auth";
                  return (L((t) => ({ ...t, phase: "error", message: e })), eN.error(e), !1);
                }
                return (
                  L((e) => ({ ...e, phase: "applied", message: "Command Code connected" })),
                  tZ.current?.close?.(),
                  (tZ.current = null),
                  await ax(),
                  aO(),
                  eN.success("Command Code connection added"),
                  !0
                );
              } catch (e) {
                return (
                  console.error("Error applying Command Code auth:", e),
                  L((e) => ({
                    ...e,
                    phase: "error",
                    message: "Failed to apply Command Code auth",
                  })),
                  eN.error("Failed to apply Command Code auth"),
                  !1
                );
              }
            },
            [ax, aO, eN]
          ),
          aD = (0, l.useCallback)(async () => {
            if ("starting" === S.phase || "polling" === S.phase) return;
            (aE(), tZ.current?.close?.());
            let e = window.open("about:blank", "_blank");
            L({
              phase: "starting",
              state: "",
              authUrl: "",
              callbackUrl: "",
              expiresAt: null,
              message: "Opening Command Code Studio…",
            });
            try {
              let t = await fetch("/api/providers/command-code/auth/start", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                }),
                a = await t.json().catch(() => ({}));
              if (!t.ok || !a.state || !a.authUrl) {
                let t = a.error || "Failed to start Command Code auth";
                (L((e) => ({ ...e, phase: "error", message: t })), eN.error(t), e?.close?.());
                return;
              }
              if (
                (L({
                  phase: "polling",
                  state: a.state,
                  authUrl: a.authUrl,
                  callbackUrl: a.callbackUrl || "",
                  expiresAt: a.expiresAt || null,
                  message:
                    "Open the auth URL, approve access, then paste the returned key/JSON/URL below…",
                }),
                e)
              ) {
                try {
                  e.opener = null;
                } catch {}
                ((e.location.href = a.authUrl), (tZ.current = e));
              } else {
                let e = window.open(a.authUrl, "_blank", "noopener,noreferrer");
                if (!e) {
                  (L((e) => ({
                    ...e,
                    phase: "error",
                    message:
                      "Popup blocked. Please allow popups and try Command Code Connect again.",
                  })),
                    eN.error(
                      "Popup blocked. Please allow popups and try Command Code Connect again."
                    ));
                  return;
                }
                tZ.current = e;
              }
              let r = a.expiresAt ? new Date(a.expiresAt).getTime() : Date.now() + 18e4,
                l = async () => {
                  if (Date.now() >= r) {
                    (L((e) => ({ ...e, phase: "expired", message: "Command Code link expired" })),
                      tZ.current?.close?.(),
                      (tZ.current = null),
                      eN.error("Command Code auth expired"),
                      aE());
                    return;
                  }
                  try {
                    let e = await fetch(
                        `/api/providers/command-code/auth/status?state=${encodeURIComponent(a.state)}`,
                        { method: "GET", cache: "no-store" }
                      ),
                      t = await e.json().catch(() => ({})),
                      r = String(t.status || t.state || t.phase || "")
                        .toLowerCase()
                        .trim();
                    if ("expired" === r) {
                      (L((e) => ({ ...e, phase: "expired", message: "Command Code link expired" })),
                        tZ.current?.close?.(),
                        (tZ.current = null),
                        eN.error("Command Code auth expired"),
                        aE());
                      return;
                    }
                    if ("applied" === r) {
                      (L((e) => ({ ...e, phase: "applied", message: "Command Code connected" })),
                        tZ.current?.close?.(),
                        (tZ.current = null),
                        await ax(),
                        aO(),
                        eN.success("Command Code connection added"),
                        aE());
                      return;
                    }
                    if ("received" === r) {
                      (L((e) => ({
                        ...e,
                        phase: "received",
                        message: "Browser approved, applying…",
                      })),
                        aE(),
                        await a$(a.state, t.connectionId, t.name, t.setDefault));
                      return;
                    }
                  } catch {}
                  tW.current = window.setTimeout(l, 2e3);
                };
              tW.current = window.setTimeout(l, 1e3);
            } catch (t) {
              (console.error("Error starting Command Code auth:", t),
                L((e) => ({ ...e, phase: "error", message: "Failed to start Command Code auth" })),
                eN.error("Failed to start Command Code auth"),
                e?.close?.(),
                (tZ.current = null),
                aE());
            }
          }, [aE, aO, S.phase, ax, a$, eN]),
          aL = (0, l.useCallback)(() => {
            (b(!0), aD());
          }, [aD]),
          aF = async (e) => {
            try {
              let t = await fetch("/api/providers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ provider: i, ...e }),
              });
              if (t.ok) {
                let e = await t.json(),
                  a = e?.connection;
                if ((await ax(), b(!1), "gemini" === i && a?.id)) {
                  (e0(!0),
                    e5({
                      current: 0,
                      total: 0,
                      phase: "fetching",
                      status: ev("fetchingModels"),
                      logs: [],
                      error: "",
                      importedCount: 0,
                    }));
                  try {
                    let e = await fetch(`/api/providers/${a.id}/sync-models`, {
                        method: "POST",
                        signal: AbortSignal.timeout(3e4),
                      }),
                      t = await e.json();
                    if (!e.ok || t.error)
                      return (
                        e5((e) => ({
                          ...e,
                          phase: "error",
                          status: ev("failedFetchModels"),
                          error: t.error?.message || t.error || ev("failedImportModels"),
                        })),
                        null
                      );
                    let r = t.syncedModels || 0,
                      l =
                        "number" == typeof t.availableModelsCount
                          ? t.availableModelsCount
                          : Array.isArray(t.models)
                            ? t.models.length
                            : r,
                      i = t.models || [],
                      o = [];
                    if (i.length > 0)
                      for (let e of (o.push(`✓ ${l} models available`), o.push(""), i))
                        o.push(`  ${e.name || e.id}`);
                    (e5((e) => ({
                      ...e,
                      phase: "done",
                      status: ev("modelsImported", { count: l }),
                      total: l,
                      current: l,
                      importedCount: l,
                      logs: o,
                    })),
                      await au());
                  } catch (e) {
                    e5((t) => ({
                      ...t,
                      phase: "error",
                      status: ev("failedFetchModels"),
                      error: String(e),
                    }));
                  }
                }
                return null;
              }
              let a = await t.json().catch(() => ({}));
              return a.error?.message || a.error || ev("failedSaveConnection");
            } catch (e) {
              return (console.log("Error saving connection:", e), ev("failedSaveConnectionRetry"));
            }
          },
          aU = async (e) => {
            try {
              let t = await fetch(`/api/providers/${W.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(e),
              });
              if (t.ok) return (await ax(), _(!1), null);
              let a = await t.json().catch(() => ({}));
              return a.error?.message || a.error || ev("failedSaveConnection");
            } catch (e) {
              return (
                console.log("Error updating connection:", e),
                ev("failedSaveConnectionRetry")
              );
            }
          },
          a_ = async (e, t) => {
            try {
              (
                await fetch(`/api/providers/${e}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ isActive: t }),
                })
              ).ok && n((a) => a.map((a) => (a.id === e ? { ...a, isActive: t } : a)));
            } catch (e) {
              console.log("Error updating connection status:", e);
            }
          },
          aR = async (e, t) => {
            try {
              (
                await fetch("/api/rate-limits", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ connectionId: e, enabled: t }),
                })
              ).ok && n((a) => a.map((a) => (a.id === e ? { ...a, rateLimitProtection: t } : a)));
            } catch (e) {
              console.error("Error toggling rate limit:", e);
            }
          },
          aH = async (e, t) => {
            try {
              let a = o.find((t) => t.id === e);
              if (!a) return;
              let r =
                  a.providerSpecificData && "object" == typeof a.providerSpecificData
                    ? a.providerSpecificData
                    : {},
                l = await fetch(`/api/providers/${e}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ providerSpecificData: { ...r, blockExtraUsage: t } }),
                });
              if (!l.ok) {
                let e = await l.json().catch(() => ({}));
                eN.error(e.error || "Failed to update Claude extra-usage policy");
                return;
              }
              (n((a) =>
                a.map((a) =>
                  a.id === e
                    ? {
                        ...a,
                        providerSpecificData: {
                          ...(a.providerSpecificData || {}),
                          blockExtraUsage: t,
                        },
                        ...(!t && "extra_usage" === a.lastErrorSource
                          ? {
                              testStatus: "active",
                              lastError: null,
                              lastErrorAt: null,
                              lastErrorType: null,
                              lastErrorSource: null,
                              errorCode: null,
                              rateLimitedUntil: null,
                            }
                          : {}),
                      }
                    : a
                )
              ),
                eN.success(
                  t
                    ? "Claude extra-usage blocking enabled (extra usage will be blocked)"
                    : "Claude extra-usage blocking disabled (extra usage is allowed)"
                ));
            } catch (e) {
              (console.error("Error toggling Claude extra-usage policy:", e),
                eN.error("Failed to update Claude extra-usage policy"));
            }
          },
          [az, aB] = (0, l.useState)(!1);
        (0, l.useEffect)(() => {
          t0 &&
            (fetch("/api/settings")
              .then((e) => e.json())
              .then((e) => {})
              .catch(() => {}),
            fetch(`/api/upstream-proxy/${i}`)
              .then((e) => (e.ok ? e.json() : null))
              .then((e) => {
                e?.enabled && ("cliproxyapi" === e.mode || "fallback" === e.mode) && aB(!0);
              })
              .catch(() => {}));
        }, [t0, i]);
        let aK = async (e, t) => {
            try {
              let e = await fetch(`/api/upstream-proxy/${i}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mode: t ? "cliproxyapi" : "native", enabled: t }),
              });
              if (!e.ok) {
                let t = await e.json().catch(() => ({}));
                eN.error(t.error || "Failed to update CLIProxyAPI routing");
                return;
              }
              (aB(t),
                eN.success(
                  t
                    ? "Requests now route through CLIProxyAPI (deeper emulation)"
                    : "Requests now use native OmniRoute (direct)"
                ));
            } catch {
              eN.error("Failed to update CLIProxyAPI routing");
            }
          },
          aJ = async (e, t, a) => {
            try {
              let r = o.find((t) => t.id === e);
              if (!r) return;
              let l =
                  r.providerSpecificData && "object" == typeof r.providerSpecificData
                    ? r.providerSpecificData
                    : {},
                i =
                  l.codexLimitPolicy && "object" == typeof l.codexLimitPolicy
                    ? l.codexLimitPolicy
                    : {},
                s = { ...eu(i), [t]: a },
                d = await fetch(`/api/providers/${e}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ providerSpecificData: { ...l, codexLimitPolicy: s } }),
                });
              if (!d.ok) {
                let e = await d.json().catch(() => ({}));
                eN.error(e.error || "Failed to update Codex limit policy");
                return;
              }
              (n((t) =>
                t.map((t) =>
                  t.id === e
                    ? {
                        ...t,
                        providerSpecificData: {
                          ...(t.providerSpecificData || {}),
                          codexLimitPolicy: s,
                        },
                      }
                    : t
                )
              ),
                eN.success("Codex limit policy updated"));
            } catch (e) {
              (console.error("Error toggling Codex quota policy:", e),
                eN.error("Failed to update Codex limit policy"));
            }
          },
          aG = async (e) => {
            if (!tH && tF) {
              (tz(!0), t$(e));
              try {
                let t = "none" === e ? ("none" !== tO ? tO : void 0) : e,
                  a = await fetch("/api/settings", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      codexServiceTier: {
                        enabled: "none" !== e,
                        ...(t ? { tier: t } : {}),
                        supportedModels: tD,
                      },
                    }),
                  });
                if (!a.ok) {
                  let e = await a.json().catch(() => ({}));
                  (t$(tO), eN.error(e.error || "Failed to update Codex service mode"));
                  return;
                }
                eN.success("Codex service mode updated");
              } catch (e) {
                (t$(tO),
                  console.error("Error updating Codex service mode:", e),
                  eN.error("Failed to update Codex service mode"));
              } finally {
                tz(!1);
              }
            }
          },
          aZ = async (e) => {
            if (e && !X) {
              Y(e);
              try {
                let t = await fetch(`/api/providers/${e}/test`, { method: "POST" });
                if (!t.ok) {
                  let e = await t.json().catch(() => ({}));
                  alert(e.error || ev("failedRetestConnection"));
                  return;
                }
                await ax();
              } catch (e) {
                console.error("Error retesting connection:", e);
              } finally {
                Y(null);
              }
            }
          },
          aW = async () => {
            if (ee || 0 === o.length) return;
            (et(!0), es(null));
            let e = new AbortController(),
              t = setTimeout(() => e.abort(), 12e4);
            try {
              let t,
                a = await fetch("/api/providers/test-batch", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ mode: "provider", providerId: i }),
                  signal: e.signal,
                });
              try {
                t = await a.json();
              } catch {
                t = { error: ev("providerTestFailed"), results: [], summary: null };
              }
              if (
                (es({
                  ...t,
                  error: t.error
                    ? "object" == typeof t.error
                      ? t.error.message || t.error.error || JSON.stringify(t.error)
                      : String(t.error)
                    : null,
                }),
                t?.summary)
              ) {
                let { passed: e, failed: a, total: r } = t.summary;
                0 === a
                  ? eN.success(ev("allTestsPassed", { total: r }))
                  : eN.warning(ev("testSummary", { passed: e, failed: a, total: r }));
              }
              await ax();
            } catch (t) {
              let e =
                t?.name === "AbortError" ? ev("providerTestTimeout") : ev("providerTestFailed");
              (es({ error: e, results: [], summary: null }), eN.error(e));
            } finally {
              (clearTimeout(t), et(!1));
            }
          },
          [aq, aV] = (0, l.useState)(null),
          aQ = async (e, t) => {
            if ((e.headers.get("content-type") || "").includes("application/json")) {
              let t = await e.json().catch(() => ({}));
              if ("string" == typeof t?.error && t.error.trim()) return t.error;
              if (t?.error?.message) return t.error.message;
            }
            return (await e.text().catch(() => "")).trim() || t;
          },
          aX = (e, t) => {
            let a = e.headers.get("content-disposition") || "",
              r = a.match(/filename\*=UTF-8''([^;]+)/i);
            if (r?.[1]) return decodeURIComponent(r[1]);
            let l = a.match(/filename="([^"]+)"/i);
            return l?.[1] ? l[1] : t;
          },
          aY = async (e) => {
            if (!aq) {
              aV(e);
              try {
                let t = await fetch(`/api/providers/${e}/refresh`, { method: "POST" }),
                  a = await t.json().catch(() => ({}));
                t.ok && a.success
                  ? (eN.success(ev("tokenRefreshed")), await ax())
                  : eN.error(a.error || ev("tokenRefreshFailed"));
              } catch (e) {
                (console.error("Error refreshing token:", e), eN.error(ev("tokenRefreshFailed")));
              } finally {
                aV(null);
              }
            }
          },
          a0 = async (e) => {
            if (td) return;
            tc(e);
            let t =
                "function" == typeof ev.has && ev.has("codexAuthAppliedLocal")
                  ? ev("codexAuthAppliedLocal")
                  : "Codex auth.json applied locally",
              a =
                "function" == typeof ev.has && ev.has("codexAuthApplyFailed")
                  ? ev("codexAuthApplyFailed")
                  : "Failed to apply Codex auth.json locally";
            try {
              let r = await fetch(`/api/providers/${e}/codex-auth/apply-local`, { method: "POST" });
              if (!r.ok) return void eN.error(await aQ(r, a));
              (eN.success(t), tm(null));
            } catch (e) {
              (console.error("Error applying Codex auth locally:", e), eN.error(a));
            } finally {
              tc(null);
            }
          },
          a1 = async (e) => {
            if (tu) return;
            tx(e);
            let t =
                "function" == typeof ev.has && ev.has("codexAuthExported")
                  ? ev("codexAuthExported")
                  : "Codex auth.json exported",
              a =
                "function" == typeof ev.has && ev.has("codexAuthExportFailed")
                  ? ev("codexAuthExportFailed")
                  : "Failed to export Codex auth.json";
            try {
              let r = await fetch(`/api/providers/${e}/codex-auth/export`, { method: "POST" });
              if (!r.ok) return void eN.error(await aQ(r, a));
              let l = await r.blob(),
                i = aX(r, "codex-auth.json"),
                o = window.URL.createObjectURL(l),
                s = document.createElement("a");
              ((s.href = o),
                (s.download = i),
                document.body.appendChild(s),
                s.click(),
                document.body.removeChild(s),
                window.setTimeout(() => window.URL.revokeObjectURL(o), 1e3),
                eN.success(t));
            } catch (e) {
              (console.error("Error exporting Codex auth file:", e), eN.error(a));
            } finally {
              tx(null);
            }
          },
          a5 = async (e) => {
            if (tg) return;
            tb(e);
            let t =
                "function" == typeof ev.has && ev.has("claudeAuthAppliedLocal")
                  ? ev("claudeAuthAppliedLocal")
                  : "Claude auth applied locally",
              a =
                "function" == typeof ev.has && ev.has("claudeAuthApplyFailed")
                  ? ev("claudeAuthApplyFailed")
                  : "Failed to apply Claude auth locally";
            try {
              let r = await fetch(`/api/providers/${e}/claude-auth/apply-local`, {
                method: "POST",
              });
              if (!r.ok) return void eN.error(await aQ(r, a));
              (eN.success(t), tv(null));
            } catch (e) {
              (console.error("Error applying Claude auth locally:", e), eN.error(a));
            } finally {
              tb(null);
            }
          },
          a2 = async (e) => {
            if (tj) return;
            tk(e);
            let t =
                "function" == typeof ev.has && ev.has("claudeAuthExported")
                  ? ev("claudeAuthExported")
                  : "Claude auth file exported",
              a =
                "function" == typeof ev.has && ev.has("claudeAuthExportFailed")
                  ? ev("claudeAuthExportFailed")
                  : "Failed to export Claude auth file";
            try {
              let r = await fetch(`/api/providers/${e}/claude-auth/export`, { method: "POST" });
              if (!r.ok) return void eN.error(await aQ(r, a));
              let l = await r.blob(),
                i = aX(r, "claude-auth.json"),
                o = window.URL.createObjectURL(l),
                s = document.createElement("a");
              ((s.href = o),
                (s.download = i),
                document.body.appendChild(s),
                s.click(),
                document.body.removeChild(s),
                window.setTimeout(() => window.URL.revokeObjectURL(o), 1e3),
                eN.success(t));
            } catch (e) {
              (console.error("Error exporting Claude auth file:", e), eN.error(a));
            } finally {
              tk(null);
            }
          },
          a3 = async (e) => {
            if (tw) return;
            tS(e);
            let t =
                "function" == typeof ev.has && ev.has("geminiAuthAppliedLocal")
                  ? ev("geminiAuthAppliedLocal")
                  : "Gemini auth applied locally",
              a =
                "function" == typeof ev.has && ev.has("geminiAuthApplyFailed")
                  ? ev("geminiAuthApplyFailed")
                  : "Failed to apply Gemini auth locally";
            try {
              let r = await fetch(`/api/providers/${e}/gemini-cli-auth/apply-local`, {
                method: "POST",
              });
              if (!r.ok) return void eN.error(await aQ(r, a));
              (eN.success(t), tI(null));
            } catch (e) {
              (console.error("Error applying Gemini auth locally:", e), eN.error(a));
            } finally {
              tS(null);
            }
          },
          a4 = async (e) => {
            if (tT) return;
            tM(e);
            let t =
                "function" == typeof ev.has && ev.has("geminiAuthExported")
                  ? ev("geminiAuthExported")
                  : "Gemini auth file exported",
              a =
                "function" == typeof ev.has && ev.has("geminiAuthExportFailed")
                  ? ev("geminiAuthExportFailed")
                  : "Failed to export Gemini auth file";
            try {
              let r = await fetch(`/api/providers/${e}/gemini-cli-auth/export`, { method: "POST" });
              if (!r.ok) return void eN.error(await aQ(r, a));
              let l = await r.blob(),
                i = aX(r, "gemini-auth.json"),
                o = window.URL.createObjectURL(l),
                s = document.createElement("a");
              ((s.href = o),
                (s.download = i),
                document.body.appendChild(s),
                s.click(),
                document.body.removeChild(s),
                window.setTimeout(() => window.URL.revokeObjectURL(o), 1e3),
                eN.success(t));
            } catch (e) {
              (console.error("Error exporting Gemini auth file:", e), eN.error(a));
            } finally {
              tM(null);
            }
          },
          a6 = async (e, t) => {
            if (e && t)
              try {
                let a = t.priority,
                  r = e.priority;
                (a === r && (a = o.indexOf(e) > o.indexOf(t) ? t.priority - 0.5 : t.priority + 0.5),
                  await Promise.all([
                    fetch(`/api/providers/${e.id}`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ priority: a }),
                    }),
                    fetch(`/api/providers/${t.id}`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ priority: r }),
                    }),
                  ]),
                  await ax());
              } catch (e) {
                console.log("Error swapping priority:", e);
              }
          },
          a8 = async () => {
            if (eE) return;
            let e = o.find((e) => !1 !== e.isActive);
            if (e) {
              (eO(!0),
                e0(!0),
                e5({
                  current: 0,
                  total: 0,
                  phase: "fetching",
                  status: ev("fetchingModels"),
                  logs: [],
                  error: "",
                  importedCount: 0,
                }));
              try {
                let t = await fetch(`/api/providers/${e.id}/models?refresh=true`),
                  a = await t.json();
                if (!t.ok)
                  return void e5((e) => ({
                    ...e,
                    phase: "error",
                    status: ev("failedFetchModels"),
                    error: a.error || ev("failedImportModels"),
                  }));
                let r = a.models || [];
                if (0 === r.length)
                  return void e5((e) => ({
                    ...e,
                    phase: "done",
                    status: ev("noModelsFound"),
                    logs: [ev("noModelsReturnedFromEndpoint")],
                  }));
                let l = new Set([
                    ...(e2.customModels || []).map((e) => e.id),
                    ...al.map((e) => e.id),
                  ]),
                  o = r.filter((e) => !l.has(e.id || e.name || e.model));
                if (0 === o.length)
                  return void e5((e) => ({
                    ...e,
                    phase: "done",
                    status: ev("allModelsAlreadyImported") || "All models already imported",
                    logs: [ev("noNewModelsToImport") || "No new models to import"],
                    importedCount: 0,
                    total: 0,
                    current: 0,
                  }));
                e5((e) => ({
                  ...e,
                  phase: "importing",
                  total: o.length,
                  current: 0,
                  status: ev("importingModelsProgress", { current: 0, total: o.length }),
                  logs: [
                    ev("foundModelsStartingImport", { count: o.length }),
                    ...(o.length < r.length
                      ? [
                          ev("skippingExistingModels", { count: r.length - o.length }) ||
                            `Skipping ${r.length - o.length} existing models`,
                        ]
                      : []),
                  ],
                }));
                let s = 0;
                for (let e = 0; e < o.length; e++) {
                  let t = o[e],
                    a = t.id || t.name || t.model;
                  if (!a) continue;
                  let r = a.split("/"),
                    l = r[r.length - 1];
                  (e5((t) => ({
                    ...t,
                    current: e + 1,
                    status: ev("importingModelsProgress", { current: e + 1, total: o.length }),
                    logs: [...t.logs, ev("importingModelById", { modelId: a })],
                  })),
                    await fetch("/api/provider-models", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        provider: i,
                        modelId: a,
                        modelName: t.name || a,
                        source: "imported",
                        ...("string" == typeof t.apiFormat ? { apiFormat: t.apiFormat } : {}),
                        ...(Array.isArray(t.supportedEndpoints)
                          ? { supportedEndpoints: t.supportedEndpoints }
                          : {}),
                      }),
                    }),
                    ed[l] || (await aj(a, l, ac)),
                    (s += 1));
                }
                (await am(),
                  e5((e) => ({
                    ...e,
                    phase: "done",
                    current: o.length,
                    status:
                      s > 0
                        ? ev("importSuccessCount", { count: s })
                        : ev("noNewModelsAddedExisting"),
                    logs: [
                      ...e.logs,
                      s > 0 ? ev("importDoneCount", { count: s }) : ev("noNewModelsAdded"),
                    ],
                    importedCount: s,
                  })),
                  s > 0 &&
                    setTimeout(() => {
                      window.location.reload();
                    }, 2e3));
              } catch (e) {
                (console.log("Error importing models:", e),
                  e5((t) => ({
                    ...t,
                    phase: "error",
                    status: ev("importFailed"),
                    error: e instanceof Error ? e.message : ev("unexpectedErrorOccurred"),
                  })));
              } finally {
                eO(!1);
              }
            }
          },
          a9 = async (e) => {
            (e0(!0),
              e5({
                current: 0,
                total: 0,
                phase: "fetching",
                status: ev("fetchingModels"),
                logs: [],
                error: "",
                importedCount: 0,
              }));
            try {
              let t = await fetch(`/api/providers/${e}/sync-models?mode=import`, {
                  method: "POST",
                  signal: AbortSignal.timeout(6e4),
                }),
                a = await t.json();
              if (!t.ok) throw Error(a.error || ev("failedImportModels"));
              let r = Array.isArray(a.importedModels) ? a.importedModels : [],
                l = "number" == typeof a.importedCount ? a.importedCount : r.length,
                i =
                  ("number" == typeof a.importedChanges?.total ? a.importedChanges.total : l) +
                  ("number" == typeof a.customModelChanges?.total ? a.customModelChanges.total : 0);
              if (0 === r.length) {
                (e5((e) => ({
                  ...e,
                  phase: "done",
                  status: l > 0 ? ev("importSuccessCount", { count: l }) : ev("noNewModelsAdded"),
                  logs: [l > 0 ? ev("importDoneCount", { count: l }) : ev("noNewModelsAdded")],
                  importedCount: l,
                })),
                  i > 0 &&
                    setTimeout(() => {
                      window.location.reload();
                    }, 2e3));
                return;
              }
              (e5((e) => ({
                ...e,
                phase: "done",
                total: r.length,
                current: r.length,
                status: l > 0 ? ev("importSuccessCount", { count: l }) : ev("noNewModelsAdded"),
                logs: [
                  ev("foundModelsStartingImport", { count: r.length }),
                  ...r.map((e) => ev("importingModelById", { modelId: e.id || e.name || e.model })),
                  l > 0 ? ev("importDoneCount", { count: l }) : ev("noNewModelsAdded"),
                ],
                importedCount: l,
              })),
                i > 0 &&
                  setTimeout(() => {
                    window.location.reload();
                  }, 2e3));
            } catch (e) {
              (console.log("Error importing models:", e),
                e5((t) => ({
                  ...t,
                  phase: "error",
                  status: ev("importFailed"),
                  error: e instanceof Error ? e.message : ev("unexpectedErrorOccurred"),
                })));
            }
          },
          a7 = aa || o.some((e) => !1 !== e.isActive),
          re = o.find((e) => !1 !== e.isActive),
          rt = !!re?.providerSpecificData?.autoSync,
          [ra, rr] = (0, l.useState)(!1),
          rl = async () => {
            if (re && !ra) {
              rr(!0);
              try {
                let e = !rt;
                (await fetch(`/api/providers/${re.id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ providerSpecificData: { autoSync: e } }),
                }),
                  await ax(),
                  eN[e ? "success" : "info"](e ? ev("autoSyncEnabled") : ev("autoSyncDisabled")));
              } catch (e) {
                (console.log("Error toggling auto-sync:", e), eN.error(ev("autoSyncToggleFailed")));
              } finally {
                rr(!1);
              }
            }
          },
          [ri, ro] = (0, l.useState)(!1),
          rs = (0, l.useMemo)(
            () => Object.entries(ed).filter(([, e]) => e.startsWith(`${ac}/`)),
            [ed, ac]
          ),
          rn = async () => {
            if (!ri && confirm(ev("clearAllModelsConfirm"))) {
              ro(!0);
              try {
                (
                  await fetch(`/api/provider-models?provider=${encodeURIComponent(ac)}&all=true`, {
                    method: "DELETE",
                  })
                ).ok
                  ? (await Promise.all(
                      rs.map(([e]) =>
                        fetch(`/api/models/alias?alias=${encodeURIComponent(e)}`, {
                          method: "DELETE",
                        }).catch(() => {})
                      )
                    ),
                    await au(),
                    await am(),
                    eN.success(ev("clearAllModelsSuccess")))
                  : eN.error(ev("clearAllModelsFailed"));
              } catch {
                eN.error(ev("clearAllModelsFailed"));
              } finally {
                ro(!1);
              }
            }
          },
          rd = (0, l.useMemo)(() => q(e2.customModels), [e2.customModels]),
          rc = (0, l.useMemo)(() => q(e2.modelCompatOverrides), [e2.modelCompatOverrides]),
          rp = (0, l.useMemo)(() => (0, I.L)(i, e2.customModels), [i, e2.customModels]),
          rm = (e, t = P[0]) => ea(e, t, rd, rc),
          ru = (e, t = P[0]) => er(e, t, rd, rc),
          rx = (0, l.useCallback)(
            (e) =>
              (function (e, t, a) {
                let r = t.get(e);
                if (r && Object.prototype.hasOwnProperty.call(r, "isHidden")) return !!r.isHidden;
                let l = a.get(e);
                return !!(l && Object.prototype.hasOwnProperty.call(l, "isHidden")) && !!l.isHidden;
              })(e, rd, rc),
            [rd, rc]
          ),
          rh = (0, l.useCallback)((e, t) => ei(e, t, rd, rc), [rd, rc]),
          rf = async (e, t) => {
            e9(e);
            try {
              let a,
                r = rd.get(e),
                l =
                  t.compatByProtocol &&
                  void 0 === t.normalizeToolCallId &&
                  void 0 === t.preserveOpenAIDeveloperRole &&
                  !("upstreamHeaders" in t);
              r
                ? l
                  ? (a = { provider: i, modelId: e, compatByProtocol: t.compatByProtocol })
                  : ((a = {
                      provider: i,
                      modelId: e,
                      modelName: r.name || e,
                      source: r.source || "manual",
                      apiFormat: r.apiFormat || "chat-completions",
                      supportedEndpoints:
                        Array.isArray(r.supportedEndpoints) && r.supportedEndpoints.length
                          ? r.supportedEndpoints
                          : ["chat"],
                      normalizeToolCallId:
                        void 0 !== t.normalizeToolCallId
                          ? t.normalizeToolCallId
                          : !!r.normalizeToolCallId,
                      preserveOpenAIDeveloperRole:
                        void 0 !== t.preserveOpenAIDeveloperRole
                          ? t.preserveOpenAIDeveloperRole
                          : !Object.prototype.hasOwnProperty.call(
                              r,
                              "preserveOpenAIDeveloperRole"
                            ) || !!r.preserveOpenAIDeveloperRole,
                    }),
                    t.compatByProtocol && (a.compatByProtocol = t.compatByProtocol))
                : (a = { provider: i, modelId: e, ...t });
              let o = await fetch("/api/provider-models", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(a),
              });
              if (!o.ok) {
                let e = await el(o);
                eN.error(e ? `${ev("failedSaveCustomModel")} — ${e}` : ev("failedSaveCustomModel"));
                return;
              }
            } catch {
              eN.error(ev("failedSaveCustomModel"));
              return;
            } finally {
              e9(null);
            }
            try {
              await au();
            } catch {}
          },
          rg = async (e, t, a) => {
            ta(t);
            try {
              let r = await fetch(
                `/api/provider-models?provider=${encodeURIComponent(e)}&modelId=${encodeURIComponent(t)}`,
                {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ isHidden: a }),
                }
              );
              if (!r.ok) {
                let e = await r.text().catch(() => "");
                eN.error(e || ev("failedSaveCustomModel"));
                return;
              }
              await Promise.all([au().catch(() => {}), am().catch(() => {})]);
            } catch {
              eN.error(ev("failedSaveCustomModel"));
            } finally {
              ta(null);
            }
          },
          rb = async (e, t, a) => {
            if (0 !== t.length) {
              tn(a ? "deselect" : "select");
              try {
                let r = await fetch(`/api/provider-models?provider=${encodeURIComponent(e)}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ isHidden: a, modelIds: t }),
                });
                if (!r.ok) {
                  let e = await r.text().catch(() => "");
                  eN.error(e || ev("failedSaveCustomModel"));
                  return;
                }
                await Promise.all([au().catch(() => {}), am().catch(() => {})]);
              } catch {
                eN.error(ev("failedSaveCustomModel"));
              } finally {
                tn(null);
              }
            }
          };
        return d
          ? (0, r.jsxs)("div", {
              className: "flex flex-col gap-8",
              children: [(0, r.jsx)(C.Qv, {}), (0, r.jsx)(C.Qv, {})],
            })
          : t8
            ? (0, r.jsxs)("div", {
                className: "flex flex-col gap-8",
                children: [
                  (0, r.jsxs)("div", {
                    children: [
                      (0, r.jsxs)(k(), {
                        href: "/dashboard/providers",
                        className:
                          "inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary transition-colors mb-4",
                        children: [
                          (0, r.jsx)("span", {
                            className: "material-symbols-outlined text-lg",
                            children: "arrow_back",
                          }),
                          ev("backToProviders"),
                        ],
                      }),
                      (0, r.jsxs)("div", {
                        className: "flex items-center gap-4",
                        children: [
                          (0, r.jsx)("div", {
                            className: "rounded-lg flex items-center justify-center",
                            style: { backgroundColor: `${t8.color}15` },
                            children: (0, r.jsx)(D.default, {
                              providerId:
                                tY && t8.apiType
                                  ? "responses" === t8.apiType
                                    ? "oai-r"
                                    : "oai-cc"
                                  : t3
                                    ? "anthropic-m"
                                    : t8.id,
                              size: 48,
                              type: "color",
                            }),
                          }),
                          (0, r.jsxs)("div", {
                            children: [
                              t8.website
                                ? (0, r.jsxs)("a", {
                                    href: t8.website,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className:
                                      "text-3xl font-semibold tracking-tight hover:underline inline-flex items-center gap-2",
                                    style: { color: t8.color },
                                    children: [
                                      t8.name,
                                      (0, r.jsx)("span", {
                                        className: "material-symbols-outlined text-lg opacity-60",
                                        children: "open_in_new",
                                      }),
                                    ],
                                  })
                                : (0, r.jsx)("h1", {
                                    className: "text-3xl font-semibold tracking-tight",
                                    children: t8.name,
                                  }),
                              (0, r.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  (0, r.jsx)("p", {
                                    className: "text-text-muted",
                                    children: ev("connectionCountLabel", { count: o.length }),
                                  }),
                                  (0, r.jsx)($.A, { size: "md" }),
                                  "adapta-web" === i &&
                                    (0, r.jsx)("button", {
                                      onClick: () => Z(!0),
                                      className:
                                        "text-sm font-medium underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity",
                                      style: { color: t8.color },
                                      children: "Tutorial",
                                    }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  "zed" === i &&
                    (0, r.jsxs)(r.Fragment, {
                      children: [
                        (0, r.jsx)(C.Zp, {
                          children: (0, r.jsxs)("div", {
                            className:
                              "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
                            children: [
                              (0, r.jsxs)("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                  (0, r.jsxs)("h2", {
                                    className: "text-lg font-semibold flex items-center gap-2",
                                    children: [
                                      (0, r.jsx)("span", {
                                        className: "material-symbols-outlined text-[20px]",
                                        children: "download",
                                      }),
                                      "Import from Zed Keychain",
                                    ],
                                  }),
                                  (0, r.jsx)("p", {
                                    className: "text-sm text-text-muted mt-1",
                                    children:
                                      "Discover AI provider credentials (OpenAI, Anthropic, Google, Mistral, xAI) that Zed IDE stored in the OS keychain and import them as connections. Requires Zed IDE installed on this machine.",
                                  }),
                                ],
                              }),
                              (0, r.jsx)(C.$n, {
                                size: "sm",
                                variant: "secondary",
                                icon: e$ ? "sync" : "download",
                                onClick: af,
                                disabled: e$,
                                children: e$ ? "Importing…" : "Import from Zed",
                              }),
                            ],
                          }),
                        }),
                        (0, r.jsx)(C.Zp, {
                          children: (0, r.jsxs)("div", {
                            className: "flex flex-col gap-3",
                            children: [
                              (0, r.jsxs)("button", {
                                className: "flex items-center justify-between w-full text-left",
                                onClick: () => eU((e) => !e),
                                children: [
                                  (0, r.jsxs)("h2", {
                                    className: "text-lg font-semibold flex items-center gap-2",
                                    children: [
                                      (0, r.jsx)("span", {
                                        className: "material-symbols-outlined text-[20px]",
                                        children: "edit",
                                      }),
                                      "Manual Token Import",
                                    ],
                                  }),
                                  (0, r.jsx)("span", {
                                    className:
                                      "material-symbols-outlined text-[18px] text-text-muted",
                                    children: eL ? "expand_less" : "expand_more",
                                  }),
                                ],
                              }),
                              eL &&
                                (0, r.jsxs)("div", {
                                  className: "flex flex-col gap-3 mt-1",
                                  children: [
                                    (0, r.jsxs)("p", {
                                      className: "text-sm text-text-muted",
                                      children: [
                                        "Use this when OmniRoute runs in Docker or the keychain is unavailable. Paste the API key that Zed stored under",
                                        " ",
                                        (0, r.jsx)("code", {
                                          className: "font-mono text-xs",
                                          children: "~/.config/zed/settings.json",
                                        }),
                                        " or copy it from the Zed AI settings panel.",
                                      ],
                                    }),
                                    (0, r.jsxs)("div", {
                                      className: "flex gap-2 flex-col sm:flex-row",
                                      children: [
                                        (0, r.jsxs)("select", {
                                          className: "input input-sm",
                                          value: eH,
                                          onChange: (e) => eK(e.target.value),
                                          children: [
                                            (0, r.jsx)("option", {
                                              value: "openai",
                                              children: "OpenAI",
                                            }),
                                            (0, r.jsx)("option", {
                                              value: "anthropic",
                                              children: "Anthropic",
                                            }),
                                            (0, r.jsx)("option", {
                                              value: "google",
                                              children: "Google",
                                            }),
                                            (0, r.jsx)("option", {
                                              value: "mistral",
                                              children: "Mistral",
                                            }),
                                            (0, r.jsx)("option", { value: "xai", children: "xAI" }),
                                            (0, r.jsx)("option", {
                                              value: "openrouter",
                                              children: "OpenRouter",
                                            }),
                                            (0, r.jsx)("option", {
                                              value: "deepseek",
                                              children: "DeepSeek",
                                            }),
                                          ],
                                        }),
                                        (0, r.jsx)("input", {
                                          type: "password",
                                          className: "input input-sm flex-1",
                                          placeholder: "Paste API key…",
                                          value: eZ,
                                          onChange: (e) => eV(e.target.value),
                                        }),
                                        (0, r.jsx)(C.$n, {
                                          size: "sm",
                                          variant: "secondary",
                                          icon: eQ ? "sync" : "upload",
                                          onClick: ag,
                                          disabled: eQ || !eZ.trim(),
                                          children: eQ ? "Saving…" : "Import",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  t2 &&
                    p &&
                    (0, r.jsxs)(C.Zp, {
                      children: [
                        (0, r.jsxs)("div", {
                          className:
                            "mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
                          children: [
                            (0, r.jsxs)("div", {
                              children: [
                                (0, r.jsx)("h2", {
                                  className: "text-lg font-semibold",
                                  children: t0
                                    ? ev("ccCompatibleDetailsTitle")
                                    : t5
                                      ? ev("anthropicCompatibleDetails")
                                      : ev("openaiCompatibleDetails"),
                                }),
                                (0, r.jsxs)("p", {
                                  className: "text-sm text-text-muted",
                                  children: [
                                    (() => {
                                      if (t3) return ev("messagesApi");
                                      switch (p?.apiType) {
                                        case "responses":
                                          return ev("responsesApi");
                                        case "embeddings":
                                          return ev("embeddings");
                                        case "audio-transcriptions":
                                          return ev("audioTranscriptions");
                                        case "audio-speech":
                                          return ev("audioSpeech");
                                        case "images-generations":
                                          return ev("imagesGenerations");
                                        default:
                                          return ev("chatCompletions");
                                      }
                                    })(),
                                    " \xb7 ",
                                    (p.baseUrl || "").replace(/\/$/, ""),
                                    "/",
                                    ((e = (() => {
                                      if (t0) return en;
                                      if (t5) return "/messages";
                                      switch (p?.apiType) {
                                        case "responses":
                                          return "/responses";
                                        case "embeddings":
                                          return "/embeddings";
                                        case "audio-transcriptions":
                                          return "/audio/transcriptions";
                                        case "audio-speech":
                                          return "/audio/speech";
                                        case "images-generations":
                                          return "/images/generations";
                                        default:
                                          return "/chat/completions";
                                      }
                                    })()),
                                    (p?.chatPath || e).replace(/^\//, "")),
                                  ],
                                }),
                              ],
                            }),
                            (0, r.jsxs)("div", {
                              className: "flex flex-wrap items-center gap-2",
                              children: [
                                (0, r.jsx)(C.$n, {
                                  size: "sm",
                                  icon: "add",
                                  onClick: () => aT(() => b(!0)),
                                  children: ev("add"),
                                }),
                                (0, r.jsx)(C.$n, {
                                  size: "sm",
                                  variant: "secondary",
                                  icon: "edit",
                                  onClick: () => H(!0),
                                  children: ev("edit"),
                                }),
                                (0, r.jsx)(C.$n, {
                                  size: "sm",
                                  variant: "secondary",
                                  icon: "delete",
                                  onClick: async () => {
                                    if (
                                      confirm(
                                        ev("deleteCompatibleNodeConfirm", {
                                          type: t0
                                            ? ev("ccCompatibleLabel")
                                            : t5
                                              ? ev("anthropic")
                                              : ev("openai"),
                                        })
                                      )
                                    )
                                      try {
                                        (
                                          await fetch(`/api/provider-nodes/${i}`, {
                                            method: "DELETE",
                                          })
                                        ).ok && a.push("/dashboard/providers");
                                      } catch (e) {
                                        console.log("Error deleting provider node:", e);
                                      }
                                  },
                                  children: ev("delete"),
                                }),
                              ],
                            }),
                          ],
                        }),
                        t0 &&
                          (0, r.jsx)("div", {
                            className:
                              "mb-4 rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-sm text-text-muted",
                            children: (0, r.jsxs)("div", {
                              className: "flex items-start gap-2",
                              children: [
                                (0, r.jsx)("span", {
                                  className:
                                    "material-symbols-outlined mt-0.5 text-[18px] text-amber-500",
                                  children: "warning",
                                }),
                                (0, r.jsx)("p", { children: ev("ccCompatibleValidationHint") }),
                              ],
                            }),
                          }),
                      ],
                    }),
                  !an && aa && (0, r.jsx)(C.fy, {}),
                  !an &&
                    !aa &&
                    (0, r.jsxs)(C.Zp, {
                      children: [
                        (0, r.jsxs)("div", {
                          className:
                            "mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
                          children: [
                            (0, r.jsxs)("div", {
                              className: "flex min-w-0 flex-wrap items-center gap-2",
                              children: [
                                (0, r.jsx)("h2", {
                                  className: "text-lg font-semibold",
                                  children: ev("connections"),
                                }),
                                "codex" === i &&
                                  (0, r.jsxs)("div", {
                                    className:
                                      "inline-flex items-center gap-2 rounded-lg border border-sky-500/20 bg-sky-500/5 px-2 py-1 text-xs font-medium text-text-muted",
                                    title: Q(
                                      ev,
                                      "providerDetailServiceModeTooltip",
                                      "Set a global Codex service mode, or leave accounts on their individual service-tier setting."
                                    ),
                                    children: [
                                      (0, r.jsx)("span", {
                                        children: Q(
                                          ev,
                                          "providerDetailServiceModeLabel",
                                          "Global service mode:"
                                        ),
                                      }),
                                      (0, r.jsx)("select", {
                                        value: tO,
                                        onChange: (e) => aG(e.target.value),
                                        disabled: tH || !tF,
                                        "aria-label": "Global Codex service mode",
                                        className:
                                          "rounded-md border border-border bg-bg px-2 py-1 text-xs text-text-main outline-none transition-colors focus:border-primary disabled:opacity-60",
                                        children: t6.map((e) =>
                                          (0, r.jsx)(
                                            "option",
                                            { value: e.value, children: e.label },
                                            e.value
                                          )
                                        ),
                                      }),
                                      t_
                                        ? (0, r.jsx)("button", {
                                            type: "button",
                                            onClick: () => void ab(),
                                            className:
                                              "rounded border border-sky-500/30 px-2 py-0.5 text-[11px] font-medium text-sky-600 hover:bg-sky-500/10 dark:text-sky-300",
                                            title: t_,
                                            children: Q(ev, "retry", "Retry"),
                                          })
                                        : null,
                                    ],
                                  }),
                                (0, r.jsxs)("button", {
                                  onClick: () =>
                                    eA({ level: "provider", id: i, label: t8?.name || i }),
                                  className: `inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all ${eI?.providers?.[i] ? "bg-amber-500/15 text-amber-500 hover:bg-amber-500/25" : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"}`,
                                  title: eI?.providers?.[i]
                                    ? ev("providerProxyTitleConfigured", {
                                        host: eI.providers[i].host || ev("configured"),
                                      })
                                    : ev("providerProxyConfigureHint"),
                                  children: [
                                    (0, r.jsx)("span", {
                                      className: "material-symbols-outlined text-[14px]",
                                      children: "vpn_lock",
                                    }),
                                    (eI?.providers?.[i] && eI.providers[i].host) ||
                                      ev("providerProxy"),
                                  ],
                                }),
                              ],
                            }),
                            (0, r.jsxs)("div", {
                              className: "flex shrink-0 flex-wrap items-center justify-end gap-2",
                              children: [
                                o.length > 1 &&
                                  (0, r.jsxs)("button", {
                                    onClick: aW,
                                    disabled: ee || !!X,
                                    className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${ee ? "bg-primary/20 border-primary/40 text-primary animate-pulse" : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"}`,
                                    title: ev("testAll"),
                                    "aria-label": ev("testAll"),
                                    children: [
                                      (0, r.jsx)("span", {
                                        className: "material-symbols-outlined text-[14px]",
                                        children: ee ? "sync" : "play_arrow",
                                      }),
                                      ee ? ev("testing") : ev("testAll"),
                                    ],
                                  }),
                                t2
                                  ? 0 === o.length &&
                                    (0, r.jsx)(C.$n, {
                                      size: "sm",
                                      icon: "add",
                                      onClick: () => aT(() => b(!0)),
                                      children: ev("add"),
                                    })
                                  : (0, r.jsx)(r.Fragment, {
                                      children: t1
                                        ? (0, r.jsxs)(r.Fragment, {
                                            children: [
                                              (0, r.jsx)(C.$n, {
                                                size: "sm",
                                                icon: "open_in_new",
                                                loading:
                                                  "starting" === S.phase ||
                                                  "polling" === S.phase ||
                                                  "applying" === S.phase,
                                                onClick: () => aT(aL),
                                                children: "Connect",
                                              }),
                                              (0, r.jsx)(C.$n, {
                                                size: "sm",
                                                variant: "secondary",
                                                icon: "add",
                                                onClick: () => aT(() => b(!0)),
                                                children: "Manual API key",
                                              }),
                                            ],
                                          })
                                        : (0, r.jsxs)(r.Fragment, {
                                            children: [
                                              (0, r.jsx)(C.$n, {
                                                size: "sm",
                                                icon: "add",
                                                onClick: () => aT(aI),
                                                children: ae ? "Add PAT" : ev("add"),
                                              }),
                                              "qoder" === i &&
                                                (0, r.jsx)(C.$n, {
                                                  size: "sm",
                                                  variant: "secondary",
                                                  onClick: () => aT(() => t4(!0)),
                                                  children: "Experimental OAuth",
                                                }),
                                              "claude" === i &&
                                                (0, r.jsx)(C.$n, {
                                                  size: "sm",
                                                  variant: "secondary",
                                                  icon: "upload_file",
                                                  onClick: () => aT(() => tN(!0)),
                                                  children:
                                                    "function" == typeof ev.has &&
                                                    ev.has("importClaudeAuth")
                                                      ? ev("importClaudeAuth")
                                                      : "Import auth",
                                                }),
                                              "gemini-cli" === i &&
                                                (0, r.jsx)(C.$n, {
                                                  size: "sm",
                                                  variant: "secondary",
                                                  icon: "upload_file",
                                                  onClick: () => aT(() => tE(!0)),
                                                  children:
                                                    "function" == typeof ev.has &&
                                                    ev.has("importGeminiAuth")
                                                      ? ev("importGeminiAuth")
                                                      : "Import auth",
                                                }),
                                            ],
                                          }),
                                    }),
                              ],
                            }),
                          ],
                        }),
                        0 === o.length
                          ? (0, r.jsxs)("div", {
                              className: "text-center py-12",
                              children: [
                                (0, r.jsx)("div", {
                                  className:
                                    "inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4",
                                  children: (0, r.jsx)("span", {
                                    className: "material-symbols-outlined text-[32px]",
                                    children: at ? "lock" : "key",
                                  }),
                                }),
                                (0, r.jsx)("p", {
                                  className: "text-text-main font-medium mb-1",
                                  children: ev("noConnectionsYet"),
                                }),
                                (0, r.jsx)("p", {
                                  className: "text-sm text-text-muted mb-4",
                                  children: ev("addFirstConnectionHint"),
                                }),
                                !t2 &&
                                  (0, r.jsx)("div", {
                                    className: "flex items-center justify-center gap-2",
                                    children: t1
                                      ? (0, r.jsxs)(r.Fragment, {
                                          children: [
                                            (0, r.jsx)(C.$n, {
                                              icon: "open_in_new",
                                              loading:
                                                "starting" === S.phase ||
                                                "polling" === S.phase ||
                                                "applying" === S.phase,
                                              onClick: () => aT(aL),
                                              children: "Connect",
                                            }),
                                            (0, r.jsx)(C.$n, {
                                              variant: "secondary",
                                              icon: "add",
                                              onClick: () => aT(() => b(!0)),
                                              children: "Manual API key",
                                            }),
                                          ],
                                        })
                                      : (0, r.jsxs)(r.Fragment, {
                                          children: [
                                            (0, r.jsx)(C.$n, {
                                              icon: "add",
                                              onClick: () => aT(aI),
                                              children: ae ? "Add PAT" : ev("addConnection"),
                                            }),
                                            "qoder" === i &&
                                              (0, r.jsx)(C.$n, {
                                                variant: "secondary",
                                                onClick: () => aT(() => t4(!0)),
                                                children: "Experimental OAuth",
                                              }),
                                            "codex" === i &&
                                              (0, r.jsx)(C.$n, {
                                                variant: "secondary",
                                                icon: "upload_file",
                                                onClick: () => aT(() => tf(!0)),
                                                children:
                                                  "function" == typeof ev.has &&
                                                  ev.has("importCodexAuth")
                                                    ? ev("importCodexAuth")
                                                    : "Import auth",
                                              }),
                                            "claude" === i &&
                                              (0, r.jsx)(C.$n, {
                                                variant: "secondary",
                                                icon: "upload_file",
                                                onClick: () => aT(() => tN(!0)),
                                                children:
                                                  "function" == typeof ev.has &&
                                                  ev.has("importClaudeAuth")
                                                    ? ev("importClaudeAuth")
                                                    : "Import auth",
                                              }),
                                            "gemini-cli" === i &&
                                              (0, r.jsx)(C.$n, {
                                                variant: "secondary",
                                                icon: "upload_file",
                                                onClick: () => aT(() => tE(!0)),
                                                children:
                                                  "function" == typeof ev.has &&
                                                  ev.has("importGeminiAuth")
                                                    ? ev("importGeminiAuth")
                                                    : "Import auth",
                                              }),
                                          ],
                                        }),
                                  }),
                              ],
                            })
                          : (() => {
                              let e = [...o].sort((e, t) => (e.priority || 0) - (t.priority || 0)),
                                t = e.some((e) => e.providerSpecificData?.tag),
                                a = tB.size === o.length && o.length > 0,
                                l = tB.size > 0 && tB.size < o.length;
                              if (!t)
                                return (0, r.jsxs)(r.Fragment, {
                                  children: [
                                    (0, r.jsxs)("div", {
                                      className:
                                        "flex items-center justify-between px-3 py-2 bg-muted/50 rounded-t-lg border border-b-0 border-border",
                                      children: [
                                        (0, r.jsxs)("label", {
                                          className:
                                            "flex items-center gap-2 cursor-pointer select-none",
                                          children: [
                                            (0, r.jsx)("input", {
                                              type: "checkbox",
                                              checked: a,
                                              ref: (e) => {
                                                e && (e.indeterminate = l);
                                              },
                                              onChange: aN,
                                              className:
                                                "w-4 h-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer",
                                            }),
                                            (0, r.jsx)("span", {
                                              className: "text-sm font-medium text-text-muted",
                                              children:
                                                tB.size > 0
                                                  ? `${tB.size} selected`
                                                  : `${o.length} accounts`,
                                            }),
                                          ],
                                        }),
                                        tB.size > 0 &&
                                          (0, r.jsx)(C.$n, {
                                            variant: "danger",
                                            size: "sm",
                                            icon: "delete",
                                            loading: tJ,
                                            onClick: aS,
                                            children: ev("batchDeleteSelected", { count: tB.size }),
                                          }),
                                      ],
                                    }),
                                    (0, r.jsx)("div", {
                                      className:
                                        "flex flex-col divide-y divide-black/[0.03] dark:divide-white/[0.03] border border-t-0 border-border rounded-b-lg overflow-hidden",
                                      children: e.map((t, a) =>
                                        (0, r.jsx)(
                                          ew,
                                          {
                                            connection: t,
                                            isOAuth: "oauth" === t.authType,
                                            isClaude: "claude" === i,
                                            codexGlobalServiceMode: tO,
                                            isFirst: 0 === a,
                                            isLast: a === e.length - 1,
                                            isSelected: tB.has(t.id),
                                            onToggleSelect: () => aw(t.id),
                                            onMoveUp: () => a6(t, e[a - 1]),
                                            onMoveDown: () => a6(t, e[a + 1]),
                                            onToggleActive: (e) => a_(t.id, e),
                                            onToggleRateLimit: (e) => aR(t.id, e),
                                            onToggleClaudeExtraUsage: (e) => aH(t.id, e),
                                            isCodex: "codex" === i,
                                            isGeminiCli: "gemini-cli" === i,
                                            isCcCompatible: t0,
                                            cliproxyapiEnabled: az,
                                            onToggleCliproxyapiMode: (e) => aK(t.id, e),
                                            onToggleCodex5h: (e) => aJ(t.id, "use5h", e),
                                            onToggleCodexWeekly: (e) => aJ(t.id, "useWeekly", e),
                                            onRetest: () => aZ(t.id),
                                            isRetesting: X === t.id,
                                            onEdit: () => {
                                              (V(t), _(!0));
                                            },
                                            onDelete: () => aC(t.id),
                                            onReauth:
                                              "oauth" === t.authType
                                                ? () => aT(() => t4(!0, t))
                                                : void 0,
                                            onRefreshToken:
                                              "oauth" === t.authType ? () => aY(t.id) : void 0,
                                            isRefreshing: aq === t.id,
                                            onApplyCodexAuthLocal:
                                              "codex" === i ? () => tm(t.id) : void 0,
                                            isApplyingCodexAuthLocal: td === t.id,
                                            onExportCodexAuthFile:
                                              "codex" === i ? () => a1(t.id) : void 0,
                                            isExportingCodexAuthFile: tu === t.id,
                                            onApplyClaudeAuthLocal:
                                              "claude" === i ? () => tv(t.id) : void 0,
                                            isApplyingClaudeAuthLocal: tg === t.id,
                                            onExportClaudeAuthFile:
                                              "claude" === i ? () => a2(t.id) : void 0,
                                            isExportingClaudeAuthFile: tj === t.id,
                                            onApplyGeminiAuthLocal:
                                              "gemini-cli" === i ? () => tI(t.id) : void 0,
                                            isApplyingGeminiAuthLocal: tw === t.id,
                                            onExportGeminiAuthFile:
                                              "gemini-cli" === i ? () => a4(t.id) : void 0,
                                            isExportingGeminiAuthFile: tT === t.id,
                                            onProxy: () =>
                                              eA({
                                                level: "key",
                                                id: t.id,
                                                label: (0, E.ZZ)([t.name, t.email], eC, t.id),
                                              }),
                                            hasProxy: !!eM[t.id]?.proxy,
                                            proxySource: eM[t.id]?.level || null,
                                            proxyHost: eM[t.id]?.proxy?.host || null,
                                          },
                                          t.id
                                        )
                                      ),
                                    }),
                                  ],
                                });
                              let s = new Map();
                              for (let t of e) {
                                let e = t.providerSpecificData?.tag?.trim() || "";
                                (s.has(e) || s.set(e, []), s.get(e).push(t));
                              }
                              let n = Array.from(s.keys()).sort((e, t) =>
                                "" === e ? -1 : "" === t ? 1 : e.localeCompare(t)
                              );
                              return (0, r.jsxs)(r.Fragment, {
                                children: [
                                  tB.size > 0 || o.length > 0
                                    ? (0, r.jsxs)("div", {
                                        className:
                                          "flex items-center justify-between px-3 py-2 bg-muted/50 rounded-t-lg border border-b-0 border-border",
                                        children: [
                                          (0, r.jsxs)("label", {
                                            className:
                                              "flex items-center gap-2 cursor-pointer select-none",
                                            children: [
                                              (0, r.jsx)("input", {
                                                type: "checkbox",
                                                checked: a,
                                                ref: (e) => {
                                                  e && (e.indeterminate = l);
                                                },
                                                onChange: aN,
                                                className:
                                                  "w-4 h-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer",
                                              }),
                                              (0, r.jsx)("span", {
                                                className: "text-sm font-medium text-text-muted",
                                                children:
                                                  tB.size > 0
                                                    ? `${tB.size} selected`
                                                    : `${o.length} accounts`,
                                              }),
                                            ],
                                          }),
                                          tB.size > 0 &&
                                            (0, r.jsx)(C.$n, {
                                              variant: "danger",
                                              size: "sm",
                                              icon: "delete",
                                              loading: tJ,
                                              onClick: aS,
                                              children: ev("batchDeleteSelected", {
                                                count: tB.size,
                                              }),
                                            }),
                                        ],
                                      })
                                    : null,
                                  (0, r.jsx)("div", {
                                    className:
                                      "flex flex-col gap-0 border border-t-0 border-border rounded-b-lg overflow-hidden",
                                    children: n.map((t, a) => {
                                      let l = s.get(t);
                                      return (0, r.jsxs)(
                                        "div",
                                        {
                                          className:
                                            a > 0
                                              ? "border-t border-black/[0.06] dark:border-white/[0.06] mt-1 pt-1"
                                              : "",
                                          children: [
                                            t &&
                                              (0, r.jsxs)("div", {
                                                className: "flex items-center gap-2 px-3 pt-2 pb-1",
                                                children: [
                                                  (0, r.jsx)("span", {
                                                    className:
                                                      "material-symbols-outlined text-[13px] text-text-muted/50",
                                                    children: "label",
                                                  }),
                                                  (0, r.jsx)("span", {
                                                    className:
                                                      "text-[11px] font-semibold uppercase tracking-widest text-text-muted/60 select-none",
                                                    children: t,
                                                  }),
                                                  (0, r.jsx)("div", {
                                                    className:
                                                      "flex-1 h-px bg-black/[0.04] dark:bg-white/[0.04]",
                                                  }),
                                                  (0, r.jsx)("span", {
                                                    className: "text-[10px] text-text-muted/40",
                                                    children: l.length,
                                                  }),
                                                ],
                                              }),
                                            (0, r.jsx)("div", {
                                              className:
                                                "flex flex-col divide-y divide-black/[0.03] dark:divide-white/[0.03]",
                                              children: l.map((t, o) =>
                                                (0, r.jsx)(
                                                  ew,
                                                  {
                                                    connection: t,
                                                    isOAuth: "oauth" === t.authType,
                                                    isClaude: "claude" === i,
                                                    codexGlobalServiceMode: tO,
                                                    isFirst: 0 === a && 0 === o,
                                                    isLast:
                                                      a === n.length - 1 && o === l.length - 1,
                                                    isSelected: tB.has(t.id),
                                                    onToggleSelect: () => aw(t.id),
                                                    onMoveUp: () => a6(t, e[e.indexOf(t) - 1]),
                                                    onMoveDown: () => a6(t, e[e.indexOf(t) + 1]),
                                                    onToggleActive: (e) => a_(t.id, e),
                                                    onToggleRateLimit: (e) => aR(t.id, e),
                                                    onToggleClaudeExtraUsage: (e) => aH(t.id, e),
                                                    isCodex: "codex" === i,
                                                    isGeminiCli: "gemini-cli" === i,
                                                    isCcCompatible: t0,
                                                    cliproxyapiEnabled: az,
                                                    onToggleCodex5h: (e) => aJ(t.id, "use5h", e),
                                                    onToggleCodexWeekly: (e) =>
                                                      aJ(t.id, "useWeekly", e),
                                                    onRetest: () => aZ(t.id),
                                                    isRetesting: X === t.id,
                                                    onEdit: () => {
                                                      (V(t), _(!0));
                                                    },
                                                    onDelete: () => aC(t.id),
                                                    onReauth:
                                                      "oauth" === t.authType
                                                        ? () => aT(() => t4(!0, t))
                                                        : void 0,
                                                    onRefreshToken:
                                                      "oauth" === t.authType
                                                        ? () => aY(t.id)
                                                        : void 0,
                                                    isRefreshing: aq === t.id,
                                                    onApplyCodexAuthLocal:
                                                      "codex" === i ? () => tm(t.id) : void 0,
                                                    isApplyingCodexAuthLocal: td === t.id,
                                                    onExportCodexAuthFile:
                                                      "codex" === i ? () => a1(t.id) : void 0,
                                                    isExportingCodexAuthFile: tu === t.id,
                                                    onApplyClaudeAuthLocal:
                                                      "claude" === i ? () => tv(t.id) : void 0,
                                                    isApplyingClaudeAuthLocal: tg === t.id,
                                                    onExportClaudeAuthFile:
                                                      "claude" === i ? () => a2(t.id) : void 0,
                                                    isExportingClaudeAuthFile: tj === t.id,
                                                    onApplyGeminiAuthLocal:
                                                      "gemini-cli" === i ? () => tI(t.id) : void 0,
                                                    isApplyingGeminiAuthLocal: tw === t.id,
                                                    onExportGeminiAuthFile:
                                                      "gemini-cli" === i ? () => a4(t.id) : void 0,
                                                    isExportingGeminiAuthFile: tT === t.id,
                                                    onProxy: () =>
                                                      eA({
                                                        level: "key",
                                                        id: t.id,
                                                        label: (0, E.ZZ)(
                                                          [t.name, t.email],
                                                          eC,
                                                          t.id
                                                        ),
                                                      }),
                                                    hasProxy: !!eM[t.id]?.proxy,
                                                    proxySource: eM[t.id]?.level || null,
                                                    proxyHost: eM[t.id]?.proxy?.host || null,
                                                  },
                                                  t.id
                                                )
                                              ),
                                            }),
                                          ],
                                        },
                                        t || "__untagged__"
                                      );
                                    }),
                                  }),
                                ],
                              });
                            })(),
                      ],
                    }),
                  an &&
                    (0, r.jsx)(C.Zp, {
                      children: (0, r.jsxs)("div", {
                        className: "flex flex-col gap-3",
                        children: [
                          (0, r.jsxs)("div", {
                            children: [
                              (0, r.jsx)("h2", {
                                className: "text-lg font-semibold",
                                children: Q(
                                  ev,
                                  "upstreamProxyManagedTitle",
                                  "Managed via Upstream Proxy Settings"
                                ),
                              }),
                              (0, r.jsx)("p", {
                                className: "text-sm text-text-muted mt-1",
                                children: Q(
                                  ev,
                                  "upstreamProxyManagedDescription",
                                  "CLIProxyAPI is configured as an upstream proxy layer, not as a direct provider connection. Manage the binary/runtime in CLI Tools and enable proxy routing on each provider via the provider proxy controls."
                                ),
                              }),
                            ],
                          }),
                          (0, r.jsxs)("div", {
                            className: "flex flex-wrap gap-2",
                            children: [
                              (0, r.jsxs)(k(), {
                                href: "/dashboard/cli-tools",
                                className:
                                  "inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-text-main hover:border-primary/40 hover:text-text-primary transition-colors",
                                children: [
                                  (0, r.jsx)("span", {
                                    className: "material-symbols-outlined text-base",
                                    children: "terminal",
                                  }),
                                  ev("openCliTools"),
                                ],
                              }),
                              (0, r.jsxs)(k(), {
                                href: "/dashboard/settings",
                                className:
                                  "inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-text-main hover:border-primary/40 hover:text-text-primary transition-colors",
                                children: [
                                  (0, r.jsx)("span", {
                                    className: "material-symbols-outlined text-base",
                                    children: "settings",
                                  }),
                                  ev("openSettings"),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  !as &&
                    !an &&
                    (0, r.jsxs)(C.Zp, {
                      children: [
                        (0, r.jsx)("h2", {
                          className: "text-lg font-semibold mb-4",
                          children: ev("availableModels"),
                        }),
                        (() => {
                          let e =
                              ad &&
                              a7 &&
                              (0, r.jsxs)("button", {
                                onClick: rl,
                                disabled: ra,
                                className:
                                  "flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-transparent cursor-pointer text-[12px] disabled:opacity-50 disabled:cursor-not-allowed",
                                title: ev("autoSyncTooltip"),
                                children: [
                                  (0, r.jsx)("span", {
                                    className: "material-symbols-outlined text-[16px]",
                                    style: { color: rt ? "#22c55e" : "var(--color-text-muted)" },
                                    children: rt ? "toggle_on" : "toggle_off",
                                  }),
                                  (0, r.jsx)("span", {
                                    className: "text-text-main",
                                    children: ev("autoSync"),
                                  }),
                                ],
                              }),
                            t =
                              (e2.customModels.length > 0 || rs.length > 0) &&
                              (0, r.jsxs)("button", {
                                onClick: rn,
                                disabled: ri,
                                className:
                                  "flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-red-300 dark:border-red-800 bg-transparent cursor-pointer text-[12px] text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed",
                                title: ev("clearAllModels"),
                                children: [
                                  (0, r.jsx)("span", {
                                    className: "material-symbols-outlined text-[16px]",
                                    children: "delete_sweep",
                                  }),
                                  (0, r.jsx)("span", { children: ev("clearAllModels") }),
                                ],
                              });
                          if (ao) {
                            let a =
                                "openrouter" === i
                                  ? ev("openRouterAnyModelHint")
                                  : t0
                                    ? ev("ccCompatibleModelsDescription")
                                    : ev("compatibleModelsDescription", {
                                        type: t5 ? ev("anthropic") : ev("openai"),
                                      }),
                              l = "openrouter" === i ? ev("modelIdFromOpenRouter") : ev("modelId"),
                              s =
                                "openrouter" === i
                                  ? ev("openRouterModelPlaceholder")
                                  : t0
                                    ? "claude-sonnet-4-6"
                                    : t5
                                      ? ev("anthropicCompatibleModelPlaceholder")
                                      : ev("openaiCompatibleModelPlaceholder");
                            return (0, r.jsxs)("div", {
                              children: [
                                (0, r.jsxs)("div", {
                                  className: "flex items-center gap-2 mb-4",
                                  children: [e, t],
                                }),
                                (0, r.jsx)(ek, {
                                  providerStorageAlias: ac,
                                  providerDisplayAlias: ap,
                                  modelAliases: ed,
                                  availableModels: e4,
                                  customModels: e2.customModels,
                                  fallbackModels: rp,
                                  description: a,
                                  inputLabel: l,
                                  inputPlaceholder: s,
                                  copied: ex,
                                  onCopy: ef,
                                  onSetAlias: aj,
                                  onDeleteAlias: ak,
                                  connections: o,
                                  isAnthropic: t3,
                                  onImportWithProgress: a9,
                                  t: ev,
                                  effectiveModelNormalize: rm,
                                  effectiveModelPreserveDeveloper: ru,
                                  getUpstreamHeadersRecord: rh,
                                  saveModelCompatFlags: rf,
                                  compatSavingModelId: e8,
                                  onModelsChanged: au,
                                  allowImport: ad,
                                  isModelHidden: rx,
                                  onToggleHidden: (e, t) => rg(ac, e, t),
                                  onBulkToggleHidden: (e, t) => rb(ac, e, t),
                                  bulkTogglePending: null !== ts,
                                  togglingModelId: tt,
                                  onTestModel: av,
                                  modelTestStatus: ti,
                                  testingModelId: tr,
                                }),
                              ],
                            });
                          }
                          if (t8.passthroughModels) {
                            let a =
                                "openrouter" === i
                                  ? ev("openRouterAnyModelHint")
                                  : "bedrock" === i
                                    ? ev("bedrockModelsDescription")
                                    : ev("passthroughModelsDescription", {
                                        provider: t8?.name || i,
                                      }),
                              l = "openrouter" === i ? ev("modelIdFromOpenRouter") : ev("modelId"),
                              o =
                                "openrouter" === i
                                  ? ev("openRouterModelPlaceholder")
                                  : "bedrock" === i
                                    ? ev("bedrockModelPlaceholder")
                                    : ev("openaiCompatibleModelPlaceholder");
                            return (0, r.jsxs)("div", {
                              children: [
                                (0, r.jsxs)("div", {
                                  className: "flex items-center gap-2 mb-4",
                                  children: [
                                    (0, r.jsx)(C.$n, {
                                      size: "sm",
                                      variant: "secondary",
                                      icon: "download",
                                      onClick: a8,
                                      disabled: !a7 || eE,
                                      children: eE ? ev("importingModels") : ev("importFromModels"),
                                    }),
                                    e,
                                    t,
                                    !a7 &&
                                      (0, r.jsx)("span", {
                                        className: "text-xs text-text-muted",
                                        children: ev("addConnectionToImport"),
                                      }),
                                  ],
                                }),
                                (0, r.jsx)(ey, {
                                  providerAlias: ai,
                                  modelAliases: ed,
                                  availableModels: e4,
                                  customModels: e2.customModels,
                                  description: a,
                                  inputLabel: l,
                                  inputPlaceholder: o,
                                  copied: ex,
                                  onCopy: ef,
                                  onSetAlias: aj,
                                  onDeleteAlias: ak,
                                  t: ev,
                                  effectiveModelNormalize: rm,
                                  effectiveModelPreserveDeveloper: ru,
                                  getUpstreamHeadersRecord: rh,
                                  saveModelCompatFlags: rf,
                                  compatSavingModelId: e8,
                                  isModelHidden: rx,
                                  onToggleHidden: (e, t) => rg(ac, e, t),
                                  onBulkToggleHidden: (e, t) => rb(ac, e, t),
                                  bulkTogglePending: null !== ts,
                                  togglingModelId: tt,
                                  onTestModel: av,
                                  modelTestStatus: ti,
                                  testingModelId: tr,
                                }),
                              ],
                            });
                          }
                          let a =
                            "gemini" === i
                              ? null
                              : (0, r.jsxs)("div", {
                                  className: "flex items-center gap-2 mb-4",
                                  children: [
                                    (0, r.jsx)(C.$n, {
                                      size: "sm",
                                      variant: "secondary",
                                      icon: "download",
                                      onClick: a8,
                                      disabled: !a7 || eE,
                                      children: eE ? ev("importingModels") : ev("importFromModels"),
                                    }),
                                    e,
                                    !a7 &&
                                      (0, r.jsx)("span", {
                                        className: "text-xs text-text-muted",
                                        children: ev("addConnectionToImport"),
                                      }),
                                  ],
                                });
                          if (0 === al.length)
                            return (0, r.jsxs)("div", {
                              children: [
                                a,
                                (0, r.jsx)("p", {
                                  className: "text-sm text-text-muted",
                                  children: ev("noModelsConfigured"),
                                }),
                              ],
                            });
                          let l = al.map((e) => ({ ...e, isHidden: rx(e.id) })),
                            s = l.filter((e) =>
                              (0, T.ir)(e7, { modelId: e.id, modelName: e.name, source: e.source })
                            ),
                            n = l.filter((e) => !e.isHidden).length,
                            d = s.filter((e) => e.isHidden).length,
                            c = s.length - d;
                          return (0, r.jsxs)("div", {
                            children: [
                              a,
                              l.length > 0 &&
                                (0, r.jsx)(eb, {
                                  t: ev,
                                  filterValue: e7,
                                  onFilterChange: te,
                                  activeCount: n,
                                  totalCount: l.length,
                                  onSelectAll: () =>
                                    rb(
                                      i,
                                      s.map((e) => e.id),
                                      !1
                                    ),
                                  onDeselectAll: () =>
                                    rb(
                                      i,
                                      s.map((e) => e.id),
                                      !0
                                    ),
                                  selectAllDisabled: 0 === d || null !== ts,
                                  deselectAllDisabled: 0 === c || null !== ts,
                                }),
                              (0, r.jsxs)("div", {
                                className: "flex flex-wrap gap-3",
                                children: [
                                  s.map((e) =>
                                    (0, r.jsx)(
                                      eg,
                                      {
                                        model: e,
                                        fullModel: `${ap}/${e.id}`,
                                        provider: i,
                                        copied: ex,
                                        onCopy: ef,
                                        t: ev,
                                        showDeveloperToggle: !0,
                                        effectiveModelNormalize: rm,
                                        effectiveModelPreserveDeveloper: ru,
                                        getUpstreamHeadersRecord: (t) => rh(e.id, t),
                                        saveModelCompatFlags: rf,
                                        compatDisabled: e8 === e.id,
                                        onToggleHidden: (e, t) => rg(i, e, t),
                                        togglingHidden: tt === e.id,
                                        onTestModel: av,
                                        testStatus: ti[e.id] || null,
                                        testingModel: tr === e.id,
                                      },
                                      e.id
                                    )
                                  ),
                                  0 === s.length &&
                                    e7 &&
                                    (0, r.jsx)("p", {
                                      className: "text-sm text-text-muted py-2",
                                      children: Q(ev, "noModelsMatch", `No models match "${e7}"`, {
                                        filter: e7,
                                      }),
                                    }),
                                ],
                              }),
                            ],
                          });
                        })(),
                        (0, r.jsx)(ej, {
                          providerId: i,
                          providerAlias: ap,
                          copied: ex,
                          onCopy: ef,
                          onModelsChanged: au,
                        }),
                      ],
                    }),
                  as &&
                    (0, r.jsxs)(C.Zp, {
                      children: [
                        (0, r.jsx)("h2", {
                          className: "text-lg font-semibold mb-4",
                          children: ev("searchProvider"),
                        }),
                        (0, r.jsx)("p", {
                          className: "text-sm text-text-muted",
                          children: ev("searchProviderDesc"),
                        }),
                        "perplexity-search" === i &&
                          (0, r.jsxs)("div", {
                            className:
                              "mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20",
                            children: [
                              (0, r.jsx)("span", {
                                className: "material-symbols-outlined text-sm text-blue-400",
                                children: "link",
                              }),
                              (0, r.jsx)("p", {
                                className: "text-xs text-blue-300",
                                children: ev("perplexitySearchSharedKeyInfo"),
                              }),
                            ],
                          }),
                        "google-pse-search" === i &&
                          (0, r.jsxs)("div", {
                            className:
                              "mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20",
                            children: [
                              (0, r.jsx)("span", {
                                className: "material-symbols-outlined text-sm text-amber-300",
                                children: "tune",
                              }),
                              (0, r.jsx)("p", {
                                className: "text-xs text-amber-200",
                                children: ev("googlePseInfo"),
                              }),
                            ],
                          }),
                        "searxng-search" === i &&
                          (0, r.jsxs)("div", {
                            className:
                              "mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20",
                            children: [
                              (0, r.jsx)("span", {
                                className: "material-symbols-outlined text-sm text-emerald-300",
                                children: "dns",
                              }),
                              (0, r.jsx)("p", {
                                className: "text-xs text-emerald-200",
                                children: ev("searxngInfo"),
                              }),
                            ],
                          }),
                      ],
                    }),
                  (0, r.jsx)(eh, { providerId: i }),
                  j &&
                    t7 &&
                    (0, r.jsx)(K, {
                      variant: t8.riskNoticeVariant ?? "oauth",
                      providerId: i,
                      providerName: t8.name,
                      onConfirm: aM,
                      onCancel: aP,
                    }),
                  !an &&
                    ("kiro" === i || "amazon-q" === i
                      ? (0, r.jsx)(C.Mh, {
                          isOpen: u,
                          reauthConnection: h,
                          providerInfo: { ...t8, id: i },
                          onSuccess: aA,
                          onClose: () => {
                            t4(!1);
                          },
                        })
                      : "cursor" === i
                        ? (0, r.jsx)(C.G9, {
                            isOpen: u,
                            reauthConnection: h,
                            onSuccess: aA,
                            onClose: () => {
                              t4(!1);
                            },
                          })
                        : (0, r.jsx)(C.LF, {
                            isOpen: u,
                            reauthConnection: h,
                            provider: i,
                            providerInfo: t8,
                            onSuccess: aA,
                            onClose: () => {
                              t4(!1);
                            },
                          })),
                  !an &&
                    (0, r.jsx)(eF, {
                      isOpen: g,
                      provider: i,
                      providerName: t8.name,
                      isCompatible: t2,
                      isAnthropic: t3,
                      isCcCompatible: t0,
                      isCommandCode: t1,
                      commandCodeAuthState: S,
                      onStartCommandCodeAuth: aD,
                      onSave: aF,
                      onClose: aO,
                    }),
                  "codex" === i &&
                    tp &&
                    (0, r.jsx)(
                      eR,
                      {
                        connectionId: tp,
                        inProgress: !!td,
                        onConfirm: a0,
                        onClose: () => tm(null),
                      },
                      tp
                    ),
                  !an &&
                    (0, r.jsx)(eJ, { isOpen: U, connection: W, onSave: aU, onClose: () => _(!1) }),
                  !an &&
                    t2 &&
                    (0, r.jsx)(eG, {
                      isOpen: R,
                      node: p,
                      onSave: ah,
                      onClose: () => H(!1),
                      isAnthropic: t3,
                      isCcCompatible: t0,
                    }),
                  "codex" === i &&
                    th &&
                    (0, r.jsx)(
                      e_,
                      {
                        onClose: () => tf(!1),
                        onSuccess: () => {
                          (tf(!1), fetchData());
                        },
                      },
                      "import-codex-modal"
                    ),
                  "claude" === i &&
                    ty &&
                    (0, r.jsx)(
                      eB,
                      {
                        connectionId: ty,
                        inProgress: !!tg,
                        onConfirm: a5,
                        onClose: () => tv(null),
                      },
                      ty
                    ),
                  "claude" === i &&
                    tC &&
                    (0, r.jsx)(
                      ez,
                      {
                        onClose: () => tN(!1),
                        onSuccess: () => {
                          (tN(!1), fetchData());
                        },
                      },
                      "import-claude-modal"
                    ),
                  "gemini-cli" === i &&
                    tA &&
                    (0, r.jsx)(
                      eq,
                      {
                        connectionId: tA,
                        inProgress: !!tw,
                        onConfirm: a3,
                        onClose: () => tI(null),
                      },
                      tA
                    ),
                  "gemini-cli" === i &&
                    tP &&
                    (0, r.jsx)(
                      eW,
                      {
                        onClose: () => tE(!1),
                        onSuccess: () => {
                          (tE(!1), fetchData());
                        },
                      },
                      "import-gemini-modal"
                    ),
                  eo &&
                    (0, r.jsxs)("div", {
                      className: "fixed inset-0 z-50 flex items-start justify-center pt-[10vh]",
                      onClick: () => es(null),
                      children: [
                        (0, r.jsx)("div", {
                          className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
                        }),
                        (0, r.jsxs)("div", {
                          className:
                            "relative bg-bg-primary border border-border rounded-xl w-full max-w-[600px] max-h-[80vh] overflow-y-auto shadow-2xl",
                          onClick: (e) => e.stopPropagation(),
                          children: [
                            (0, r.jsxs)("div", {
                              className:
                                "sticky top-0 z-10 flex items-center justify-between px-5 py-3 border-b border-border bg-bg-primary/95 backdrop-blur-sm rounded-t-xl",
                              children: [
                                (0, r.jsx)("h3", {
                                  className: "font-semibold",
                                  children: ev("testResults"),
                                }),
                                (0, r.jsx)("button", {
                                  onClick: () => es(null),
                                  className:
                                    "p-1 rounded-lg hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors",
                                  "aria-label": ev("close"),
                                  children: (0, r.jsx)("span", {
                                    className: "material-symbols-outlined text-lg",
                                    children: "close",
                                  }),
                                }),
                              ],
                            }),
                            (0, r.jsx)("div", {
                              className: "p-5",
                              children:
                                eo.error && (!eo.results || 0 === eo.results.length)
                                  ? (0, r.jsxs)("div", {
                                      className: "text-center py-6",
                                      children: [
                                        (0, r.jsx)("span", {
                                          className:
                                            "material-symbols-outlined text-red-500 text-[32px] mb-2 block",
                                          children: "error",
                                        }),
                                        (0, r.jsx)("p", {
                                          className: "text-sm text-red-400",
                                          children: String(eo.error),
                                        }),
                                      ],
                                    })
                                  : (0, r.jsxs)("div", {
                                      className: "flex flex-col gap-3",
                                      children: [
                                        eo.summary &&
                                          (0, r.jsxs)("div", {
                                            className: "flex items-center gap-3 text-xs mb-1",
                                            children: [
                                              (0, r.jsx)("span", {
                                                className: "text-text-muted",
                                                children: t8?.name || i,
                                              }),
                                              (0, r.jsx)("span", {
                                                className:
                                                  "px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-medium",
                                                children: ev("passedCount", {
                                                  count: eo.summary.passed,
                                                }),
                                              }),
                                              eo.summary.failed > 0 &&
                                                (0, r.jsx)("span", {
                                                  className:
                                                    "px-2 py-0.5 rounded bg-red-500/15 text-red-400 font-medium",
                                                  children: ev("failedCount", {
                                                    count: eo.summary.failed,
                                                  }),
                                                }),
                                              (0, r.jsx)("span", {
                                                className: "text-text-muted ml-auto",
                                                children: ev("testedCount", {
                                                  count: eo.summary.total,
                                                }),
                                              }),
                                            ],
                                          }),
                                        (eo.results || []).map((e, t) =>
                                          (0, r.jsxs)(
                                            "div",
                                            {
                                              className:
                                                "flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.03]",
                                              children: [
                                                (0, r.jsx)("span", {
                                                  className: `material-symbols-outlined text-[16px] ${e.valid ? "text-emerald-500" : "text-red-500"}`,
                                                  children: e.valid ? "check_circle" : "error",
                                                }),
                                                (0, r.jsx)("div", {
                                                  className: "flex-1 min-w-0",
                                                  children: (0, r.jsx)("span", {
                                                    className: "font-medium",
                                                    children: (0, E.ZZ)(
                                                      [e.connectionName],
                                                      eC,
                                                      e.connectionName
                                                    ),
                                                  }),
                                                }),
                                                void 0 !== e.latencyMs &&
                                                  (0, r.jsx)("span", {
                                                    className:
                                                      "text-text-muted font-mono tabular-nums",
                                                    children: ev("millisecondsAbbr", {
                                                      value: e.latencyMs,
                                                    }),
                                                  }),
                                                (0, r.jsx)("span", {
                                                  className: `text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${e.valid ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`,
                                                  children: e.valid
                                                    ? ev("okShort")
                                                    : e.diagnosis?.type || ev("errorShort"),
                                                }),
                                              ],
                                            },
                                            e.connectionId || t
                                          )
                                        ),
                                        (!eo.results || 0 === eo.results.length) &&
                                          (0, r.jsx)("div", {
                                            className: "text-center py-4 text-text-muted text-sm",
                                            children: ev("noActiveConnectionsInGroup"),
                                          }),
                                      ],
                                    }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  eS &&
                    (0, r.jsx)(C.KN, {
                      isOpen: !!eS,
                      onClose: () => eA(null),
                      level: eS.level,
                      levelId: eS.id,
                      levelLabel: eS.label,
                      onSaved: () => void ay(o),
                    }),
                  (0, r.jsx)(C.aF, {
                    isOpen: eY,
                    onClose: () => {
                      ("done" === e1.phase || "error" === e1.phase) && e0(!1);
                    },
                    title: ev("importingModelsTitle"),
                    size: "md",
                    closeOnOverlay: !1,
                    showCloseButton: "done" === e1.phase || "error" === e1.phase,
                    children: (0, r.jsxs)("div", {
                      className: "flex flex-col gap-4",
                      children: [
                        (0, r.jsxs)("div", {
                          className: "flex items-center gap-3",
                          children: [
                            "fetching" === e1.phase &&
                              (0, r.jsx)("span", {
                                className: "material-symbols-outlined text-primary animate-spin",
                                children: "progress_activity",
                              }),
                            "importing" === e1.phase &&
                              (0, r.jsx)("span", {
                                className: "material-symbols-outlined text-primary animate-spin",
                                children: "progress_activity",
                              }),
                            "done" === e1.phase &&
                              (0, r.jsx)("span", {
                                className: "material-symbols-outlined text-green-500",
                                children: "check_circle",
                              }),
                            "error" === e1.phase &&
                              (0, r.jsx)("span", {
                                className: "material-symbols-outlined text-red-500",
                                children: "error",
                              }),
                            (0, r.jsx)("span", {
                              className: "text-sm font-medium text-text-main",
                              children: e1.status,
                            }),
                          ],
                        }),
                        ("importing" === e1.phase || "done" === e1.phase) &&
                          e1.total > 0 &&
                          (0, r.jsxs)("div", {
                            className: "w-full",
                            children: [
                              (0, r.jsxs)("div", {
                                className: "flex items-center justify-between mb-1",
                                children: [
                                  (0, r.jsxs)("span", {
                                    className: "text-xs text-text-muted",
                                    children: [e1.current, " / ", e1.total],
                                  }),
                                  (0, r.jsxs)("span", {
                                    className: "text-xs text-text-muted",
                                    children: [Math.round((e1.current / e1.total) * 100), "%"],
                                  }),
                                ],
                              }),
                              (0, r.jsx)("div", {
                                className:
                                  "w-full h-2.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden",
                                children: (0, r.jsx)("div", {
                                  className:
                                    "h-full rounded-full transition-all duration-300 ease-out",
                                  style: {
                                    width: `${(e1.current / e1.total) * 100}%`,
                                    background:
                                      "done" === e1.phase
                                        ? "linear-gradient(90deg, #22c55e, #16a34a)"
                                        : "linear-gradient(90deg, var(--color-primary), var(--color-primary-hover, var(--color-primary)))",
                                  },
                                }),
                              }),
                            ],
                          }),
                        "fetching" === e1.phase &&
                          (0, r.jsx)("div", {
                            className:
                              "w-full h-2.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden",
                            children: (0, r.jsx)("div", {
                              className: "h-full rounded-full animate-pulse",
                              style: {
                                width: "60%",
                                background:
                                  "linear-gradient(90deg, var(--color-primary), var(--color-primary-hover, var(--color-primary)))",
                              },
                            }),
                          }),
                        "error" === e1.phase &&
                          e1.error &&
                          (0, r.jsx)("div", {
                            className: "p-3 rounded-lg bg-red-500/10 border border-red-500/20",
                            children: (0, r.jsx)("p", {
                              className: "text-sm text-red-400",
                              children: e1.error,
                            }),
                          }),
                        e1.logs.length > 0 &&
                          (0, r.jsx)("div", {
                            className:
                              "max-h-48 overflow-y-auto rounded-lg bg-black/5 dark:bg-white/5 p-3 border border-black/5 dark:border-white/5",
                            children: (0, r.jsx)("div", {
                              className: "flex flex-col gap-1",
                              children: e1.logs.map((e, t) =>
                                (0, r.jsx)(
                                  "p",
                                  {
                                    className: `text-xs font-mono ${e.startsWith("✓") ? "text-green-500 font-semibold" : "text-text-muted"}`,
                                    children: e,
                                  },
                                  t
                                )
                              ),
                            }),
                          }),
                        "done" === e1.phase &&
                          (0, r.jsx)("div", {
                            className: "flex justify-center",
                            children: (0, r.jsx)("button", {
                              onClick: () => e0(!1),
                              className:
                                "px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:opacity-90 transition-opacity",
                              children: ev("close"),
                            }),
                          }),
                      ],
                    }),
                  }),
                  "adapta-web" === i &&
                    (0, r.jsx)(C.aF, {
                      isOpen: G,
                      onClose: () => Z(!1),
                      title: "Como conectar o Adapta Web",
                      size: "md",
                      children: (0, r.jsxs)("div", {
                        className: "flex flex-col gap-5 text-sm",
                        children: [
                          (0, r.jsxs)("p", {
                            className: "text-text-muted",
                            children: [
                              "O Adapta usa autentica\xe7\xe3o via Clerk. O token",
                              " ",
                              (0, r.jsx)("code", {
                                className: "bg-surface-2 px-1 rounded font-mono text-xs",
                                children: "__client",
                              }),
                              " \xe9 um JWT de longa dura\xe7\xe3o que permite renovar sess\xf5es automaticamente.",
                            ],
                          }),
                          (0, r.jsxs)("ol", {
                            className: "flex flex-col gap-4 list-none",
                            children: [
                              (0, r.jsxs)("li", {
                                className: "flex gap-3",
                                children: [
                                  (0, r.jsx)("span", {
                                    className:
                                      "flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center",
                                    children: "1",
                                  }),
                                  (0, r.jsxs)("div", {
                                    children: [
                                      (0, r.jsx)("p", {
                                        className: "font-medium",
                                        children: "Acesse o chat do Adapta",
                                      }),
                                      (0, r.jsxs)("p", {
                                        className: "text-text-muted mt-0.5",
                                        children: [
                                          "Abra",
                                          " ",
                                          (0, r.jsx)("a", {
                                            href: "https://agent.adapta.one/agentic-chat",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "underline text-primary",
                                            children: "agent.adapta.one/agentic-chat",
                                          }),
                                          " ",
                                          "e fa\xe7a login com sua conta Gold ou Business.",
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, r.jsxs)("li", {
                                className: "flex gap-3",
                                children: [
                                  (0, r.jsx)("span", {
                                    className:
                                      "flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center",
                                    children: "2",
                                  }),
                                  (0, r.jsxs)("div", {
                                    children: [
                                      (0, r.jsx)("p", {
                                        className: "font-medium",
                                        children: "Abra o DevTools",
                                      }),
                                      (0, r.jsxs)("p", {
                                        className: "text-text-muted mt-0.5",
                                        children: [
                                          "Pressione",
                                          " ",
                                          (0, r.jsx)("kbd", {
                                            className:
                                              "bg-surface-2 px-1.5 py-0.5 rounded text-xs font-mono",
                                            children: "F12",
                                          }),
                                          " ",
                                          "ou",
                                          " ",
                                          (0, r.jsx)("kbd", {
                                            className:
                                              "bg-surface-2 px-1.5 py-0.5 rounded text-xs font-mono",
                                            children: "Cmd+Option+I",
                                          }),
                                          " ",
                                          "para abrir as Ferramentas do Desenvolvedor.",
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, r.jsxs)("li", {
                                className: "flex gap-3",
                                children: [
                                  (0, r.jsx)("span", {
                                    className:
                                      "flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center",
                                    children: "3",
                                  }),
                                  (0, r.jsxs)("div", {
                                    children: [
                                      (0, r.jsx)("p", {
                                        className: "font-medium",
                                        children: "V\xe1 em Application → Cookies",
                                      }),
                                      (0, r.jsxs)("p", {
                                        className: "text-text-muted mt-0.5",
                                        children: [
                                          "Na aba ",
                                          (0, r.jsx)("strong", { children: "Application" }),
                                          " (Chrome/Edge) ou ",
                                          (0, r.jsx)("strong", { children: "Storage" }),
                                          " ",
                                          "(Firefox), expanda ",
                                          (0, r.jsx)("strong", { children: "Cookies" }),
                                          " e clique em",
                                          " ",
                                          (0, r.jsx)("code", {
                                            className:
                                              "bg-surface-2 px-1 rounded font-mono text-xs",
                                            children: ".clerk.agent.adapta.one",
                                          }),
                                          ".",
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, r.jsxs)("li", {
                                className: "flex gap-3",
                                children: [
                                  (0, r.jsx)("span", {
                                    className:
                                      "flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center",
                                    children: "4",
                                  }),
                                  (0, r.jsxs)("div", {
                                    children: [
                                      (0, r.jsxs)("p", {
                                        className: "font-medium",
                                        children: [
                                          "Copie o valor do cookie",
                                          " ",
                                          (0, r.jsx)("code", {
                                            className:
                                              "bg-surface-2 px-1 rounded font-mono text-xs",
                                            children: "__client",
                                          }),
                                        ],
                                      }),
                                      (0, r.jsxs)("p", {
                                        className: "text-text-muted mt-0.5",
                                        children: [
                                          "Localize o cookie chamado",
                                          " ",
                                          (0, r.jsx)("code", {
                                            className:
                                              "bg-surface-2 px-1 rounded font-mono text-xs",
                                            children: "__client",
                                          }),
                                          " na lista. Clique nele e copie o conte\xfado da coluna ",
                                          (0, r.jsx)("strong", { children: "Value" }),
                                          " — come\xe7a com ",
                                          (0, r.jsx)("code", {
                                            className:
                                              "bg-surface-2 px-1 rounded font-mono text-xs",
                                            children: "eyJ…",
                                          }),
                                          ".",
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, r.jsxs)("li", {
                                className: "flex gap-3",
                                children: [
                                  (0, r.jsx)("span", {
                                    className:
                                      "flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center",
                                    children: "5",
                                  }),
                                  (0, r.jsxs)("div", {
                                    children: [
                                      (0, r.jsx)("p", {
                                        className: "font-medium",
                                        children: "Cole aqui e salve",
                                      }),
                                      (0, r.jsxs)("p", {
                                        className: "text-text-muted mt-0.5",
                                        children: [
                                          "Clique em ",
                                          (0, r.jsx)("strong", { children: "Add Connection" }),
                                          ", cole o valor do",
                                          " ",
                                          (0, r.jsx)("code", {
                                            className:
                                              "bg-surface-2 px-1 rounded font-mono text-xs",
                                            children: "__client",
                                          }),
                                          " no campo de API Key e salve. O OmniRoute renovar\xe1 a sess\xe3o automaticamente.",
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, r.jsxs)("div", {
                            className: "rounded-lg p-3 text-xs text-text-muted",
                            style: {
                              backgroundColor: "rgba(110,58,211,0.08)",
                              borderLeft: "3px solid #6E3AD3",
                            },
                            children: [
                              (0, r.jsx)("strong", { children: "Dica:" }),
                              " O cookie ",
                              (0, r.jsx)("code", { className: "font-mono", children: "__client" }),
                              " tem validade longa (meses). S\xf3 ser\xe1 necess\xe1rio renov\xe1-lo se voc\xea sair da conta ou o Adapta invalidar a sess\xe3o.",
                            ],
                          }),
                        ],
                      }),
                    }),
                ],
              })
            : (0, r.jsxs)("div", {
                className: "text-center py-20",
                children: [
                  (0, r.jsx)("p", {
                    className: "text-text-muted",
                    children: ev("providerNotFound"),
                  }),
                  (0, r.jsx)(k(), {
                    href: "/dashboard/providers",
                    className: "text-primary mt-4 inline-block",
                    children: ev("backToProviders"),
                  }),
                ],
              });
      }
      function eg({
        model: e,
        fullModel: t,
        provider: a,
        copied: l,
        onCopy: i,
        t: o,
        showDeveloperToggle: s = !0,
        effectiveModelNormalize: n,
        effectiveModelPreserveDeveloper: d,
        getUpstreamHeadersRecord: c,
        saveModelCompatFlags: p,
        compatDisabled: m,
        onToggleHidden: u,
        togglingHidden: x,
        onTestModel: h,
        testStatus: f,
        testingModel: g,
      }) {
        let b = !!e.isHidden;
        return (0, r.jsxs)("div", {
          className: `flex min-w-[220px] max-w-md items-center gap-2 rounded-lg border border-border px-3 py-2 hover:bg-sidebar/50 transition-opacity ${b ? "opacity-50" : ""}`,
          children: [
            (0, r.jsxs)("div", {
              className: "flex min-w-0 flex-1 flex-wrap items-center gap-2",
              children: [
                (0, r.jsx)("span", {
                  className: "material-symbols-outlined shrink-0 text-base",
                  style: { color: b ? "var(--color-text-muted)" : void 0 },
                  children: "smart_toy",
                }),
                (0, r.jsx)("code", {
                  className: "rounded bg-sidebar px-1.5 py-0.5 font-mono text-xs text-text-muted",
                  children: t,
                }),
                (0, r.jsx)(eo, { source: e.source }),
                (0, r.jsx)("button", {
                  onClick: () => i(t, `model-${e.id}`),
                  className: "rounded p-0.5 text-text-muted hover:bg-sidebar hover:text-primary",
                  title: o("copyModel"),
                  children: (0, r.jsx)("span", {
                    className: "material-symbols-outlined text-sm",
                    children: l === `model-${e.id}` ? "check" : "content_copy",
                  }),
                }),
              ],
            }),
            (0, r.jsxs)("div", {
              className: "flex shrink-0 items-center gap-1",
              children: [
                h &&
                  (0, r.jsx)("button", {
                    onClick: () => h(e.id, t),
                    disabled: g,
                    className: `rounded p-0.5 hover:bg-sidebar transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${"ok" === f ? "text-green-500" : "error" === f ? "text-red-500" : "text-text-muted hover:text-primary"}`,
                    title: g
                      ? o("testingModel")
                      : "ok" === f
                        ? "OK"
                        : "error" === f
                          ? "Error"
                          : o("testModel"),
                    children: g
                      ? (0, r.jsx)("span", {
                          className: "material-symbols-outlined text-sm animate-spin",
                          children: "progress_activity",
                        })
                      : "ok" === f
                        ? (0, r.jsx)("span", {
                            className: "material-symbols-outlined text-sm",
                            children: "check_circle",
                          })
                        : "error" === f
                          ? (0, r.jsx)("span", {
                              className: "material-symbols-outlined text-sm",
                              children: "error",
                            })
                          : (0, r.jsx)("span", {
                              className: "material-symbols-outlined text-sm",
                              children: "play_circle",
                            }),
                  }),
                u &&
                  (0, r.jsx)("button", {
                    onClick: () => u(e.id, !b),
                    disabled: x,
                    className:
                      "rounded p-0.5 text-text-muted hover:bg-sidebar hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed",
                    title: b ? Q(o, "showModel", "Show model") : Q(o, "hideModel", "Hide model"),
                    children: (0, r.jsx)("span", {
                      className: "material-symbols-outlined text-sm",
                      children: b ? "visibility_off" : "visibility",
                    }),
                  }),
                (0, r.jsx)(ex, {
                  t: o,
                  effectiveModelNormalize: (t) => n(e.id, t),
                  effectiveModelPreserveDeveloper: (t) => d(e.id, t),
                  getUpstreamHeadersRecord: c,
                  onCompatPatch: (t, a) => p(e.id, { compatByProtocol: { [t]: a } }),
                  showDeveloperToggle: s,
                  disabled: m,
                }),
              ],
            }),
          ],
        });
      }
      function eb({
        t: e,
        filterValue: t,
        onFilterChange: a,
        activeCount: l,
        totalCount: i,
        onSelectAll: o,
        onDeselectAll: s,
        selectAllDisabled: n,
        deselectAllDisabled: d,
      }) {
        return (0, r.jsxs)("div", {
          className: "mb-3 flex flex-wrap items-center gap-2",
          children: [
            (0, r.jsxs)("div", {
              className: "relative min-w-[220px] flex-1",
              children: [
                (0, r.jsx)("span", {
                  className:
                    "material-symbols-outlined pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-[15px] text-text-muted",
                  children: "search",
                }),
                (0, r.jsx)("input", {
                  type: "text",
                  value: t,
                  onChange: (e) => a(e.target.value),
                  placeholder: Q(e, "filterModels", "Filter models…"),
                  className:
                    "w-full rounded-lg border border-border bg-sidebar/50 py-1.5 pl-7 pr-3 text-xs text-text-main placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary",
                }),
              ],
            }),
            (0, r.jsxs)("button", {
              onClick: o,
              disabled: n,
              className:
                "flex items-center gap-1.5 rounded-lg border border-border bg-transparent px-2.5 py-1 text-[12px] text-text-main disabled:cursor-not-allowed disabled:opacity-50",
              title: Q(e, "selectAllModels", "Select all"),
              children: [
                (0, r.jsx)("span", {
                  className: "material-symbols-outlined text-[16px]",
                  children: "done_all",
                }),
                (0, r.jsx)("span", { children: Q(e, "selectAllModels", "Select all") }),
              ],
            }),
            (0, r.jsxs)("button", {
              onClick: s,
              disabled: d,
              className:
                "flex items-center gap-1.5 rounded-lg border border-border bg-transparent px-2.5 py-1 text-[12px] text-text-main disabled:cursor-not-allowed disabled:opacity-50",
              title: Q(e, "deselectAllModels", "Deselect all"),
              children: [
                (0, r.jsx)("span", {
                  className: "material-symbols-outlined text-[16px]",
                  children: "remove_done",
                }),
                (0, r.jsx)("span", { children: Q(e, "deselectAllModels", "Deselect all") }),
              ],
            }),
            (0, r.jsx)("span", {
              className: "whitespace-nowrap text-xs text-text-muted",
              children: Q(e, "modelsActiveCount", "{active}/{total} active", {
                active: l,
                total: i,
              }),
            }),
          ],
        });
      }
      function ey({
        providerAlias: e,
        modelAliases: t,
        availableModels: a = [],
        customModels: i = [],
        description: o,
        inputLabel: s,
        inputPlaceholder: n,
        copied: d,
        onCopy: c,
        onSetAlias: p,
        onDeleteAlias: m,
        t: u,
        effectiveModelNormalize: x,
        effectiveModelPreserveDeveloper: h,
        getUpstreamHeadersRecord: f,
        saveModelCompatFlags: g,
        compatSavingModelId: b,
        isModelHidden: y,
        onToggleHidden: v,
        onBulkToggleHidden: j,
        bulkTogglePending: k,
        togglingModelId: N,
        onTestModel: w,
        modelTestStatus: S,
        testingModelId: A,
      }) {
        let [I, M] = (0, l.useState)(""),
          [P, E] = (0, l.useState)(!1),
          [O, $] = (0, l.useState)(""),
          D = (0, l.useMemo)(() => q(i), [i]),
          L = (0, l.useMemo)(
            () => Object.entries(t).filter(([, t]) => t.startsWith(`${e}/`)),
            [t, e]
          ),
          F = (0, l.useMemo)(() => {
            let t = `${e}/`,
              r = new Map(),
              l = new Map(),
              o = [],
              s = new Set();
            for (let [e, a] of L) {
              let i = a.startsWith(t) ? a.slice(t.length) : a;
              (r.set(i, e), l.set(i, a));
            }
            let n = (t, a) => {
              if (!t?.id || s.has(t.id)) return;
              let i = l.get(t.id) || `${e}/${t.id}`;
              (o.push({
                modelId: t.id,
                fullModel: i,
                alias: r.get(t.id) || null,
                displayName: t.name || t.id,
                source: a,
                isHidden: y(t.id),
              }),
                s.add(t.id));
            };
            for (let e of a) n(e, "imported");
            for (let e of i) n(e, "imported" === (0, T.J4)(e.source) ? "imported" : "custom");
            for (let [e, a] of L) {
              let r = a.startsWith(t) ? a.slice(t.length) : a;
              if (!r || s.has(r)) continue;
              let l = D.get(r);
              (o.push({
                modelId: r,
                fullModel: a,
                alias: e,
                displayName: e,
                source: l ? l.source || "custom" : "alias",
                isHidden: y(r),
              }),
                s.add(r));
            }
            return o;
          }, [a, D, i, y, e, L]),
          U = F.filter((e) =>
            (0, T.ir)(O, {
              modelId: e.modelId,
              modelName: e.displayName,
              alias: e.alias,
              source: e.source,
            })
          ),
          _ = F.filter((e) => !e.isHidden).length,
          R = U.filter((e) => e.isHidden).length,
          H = U.length - R,
          z = async () => {
            let e;
            if (!I.trim() || P) return;
            let a = I.trim(),
              r = (e = a.split("/"))[e.length - 1];
            if (t[r]) return void alert(u("aliasExistsAlert", { alias: r }));
            E(!0);
            try {
              (await p(a, r), M(""));
            } catch (e) {
              console.log("Error adding model:", e);
            } finally {
              E(!1);
            }
          };
        return (0, r.jsxs)("div", {
          className: "flex flex-col gap-4",
          children: [
            (0, r.jsx)("p", { className: "text-sm text-text-muted", children: o }),
            (0, r.jsxs)("div", {
              className: "flex items-end gap-2",
              children: [
                (0, r.jsxs)("div", {
                  className: "flex-1",
                  children: [
                    (0, r.jsx)("label", {
                      htmlFor: "new-model-input",
                      className: "text-xs text-text-muted mb-1 block",
                      children: s,
                    }),
                    (0, r.jsx)("input", {
                      id: "new-model-input",
                      type: "text",
                      value: I,
                      onChange: (e) => M(e.target.value),
                      onKeyDown: (e) => "Enter" === e.key && z(),
                      placeholder: n,
                      className:
                        "w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary",
                    }),
                  ],
                }),
                (0, r.jsx)(C.$n, {
                  size: "sm",
                  icon: "add",
                  onClick: z,
                  disabled: !I.trim() || P,
                  children: P ? u("adding") : u("add"),
                }),
              ],
            }),
            F.length > 0 &&
              (0, r.jsxs)("div", {
                className: "flex flex-col gap-3",
                children: [
                  (0, r.jsx)(eb, {
                    t: u,
                    filterValue: O,
                    onFilterChange: $,
                    activeCount: _,
                    totalCount: F.length,
                    onSelectAll: () =>
                      j(
                        U.map((e) => e.modelId),
                        !1
                      ),
                    onDeselectAll: () =>
                      j(
                        U.map((e) => e.modelId),
                        !0
                      ),
                    selectAllDisabled: 0 === R || k,
                    deselectAllDisabled: 0 === H || k,
                  }),
                  U.map(({ modelId: e, fullModel: t, alias: a, isHidden: l, source: i }) =>
                    (0, r.jsx)(
                      ev,
                      {
                        modelId: e,
                        fullModel: t,
                        source: i,
                        isHidden: l,
                        copied: d,
                        onCopy: c,
                        onDeleteAlias: "alias" === i && a ? () => m(a) : void 0,
                        t: u,
                        showDeveloperToggle: !0,
                        effectiveModelNormalize: x,
                        effectiveModelPreserveDeveloper: h,
                        getUpstreamHeadersRecord: (t) => f(e, t),
                        saveModelCompatFlags: g,
                        compatDisabled: b === e,
                        onToggleHidden: v,
                        togglingHidden: N === e,
                      },
                      t
                    )
                  ),
                  0 === U.length &&
                    O &&
                    (0, r.jsx)("p", {
                      className: "py-2 text-sm text-text-muted",
                      children: Q(u, "noModelsMatch", `No models match "${O}"`, { filter: O }),
                    }),
                ],
              }),
          ],
        });
      }
      function ev({
        modelId: e,
        fullModel: t,
        source: a,
        isHidden: l,
        copied: i,
        onCopy: o,
        onDeleteAlias: s,
        t: n,
        showDeveloperToggle: d = !0,
        effectiveModelNormalize: c,
        effectiveModelPreserveDeveloper: p,
        getUpstreamHeadersRecord: m,
        saveModelCompatFlags: u,
        compatDisabled: x,
        onToggleHidden: h,
        togglingHidden: f,
        onTestModel: g,
        testStatus: b,
        testingModel: y,
      }) {
        return (0, r.jsxs)("div", {
          className: `flex gap-0 rounded-lg border border-border p-3 transition-opacity hover:bg-sidebar/50 ${l ? "opacity-50" : ""}`,
          children: [
            (0, r.jsxs)("div", {
              className: "flex min-w-0 flex-1 items-start gap-3",
              children: [
                (0, r.jsx)("span", {
                  className: "material-symbols-outlined shrink-0 text-base text-text-muted",
                  style: { color: l ? "var(--color-text-muted)" : void 0 },
                  children: "smart_toy",
                }),
                (0, r.jsxs)("div", {
                  className: "min-w-0 flex-1",
                  children: [
                    (0, r.jsx)("p", { className: "truncate text-sm font-medium", children: e }),
                    (0, r.jsxs)("div", {
                      className: "mt-1 flex flex-wrap items-center gap-1",
                      children: [
                        (0, r.jsx)("code", {
                          className:
                            "rounded bg-sidebar px-1.5 py-0.5 font-mono text-xs text-text-muted",
                          children: t,
                        }),
                        (0, r.jsx)(eo, { source: a }),
                        (0, r.jsx)("button", {
                          onClick: () => o(t, `model-${e}`),
                          className:
                            "rounded p-0.5 text-text-muted hover:bg-sidebar hover:text-primary",
                          title: n("copyModel"),
                          children: (0, r.jsx)("span", {
                            className: "material-symbols-outlined text-sm",
                            children: i === `model-${e}` ? "check" : "content_copy",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, r.jsxs)("div", {
              className: "flex shrink-0 items-center gap-1 self-start",
              children: [
                g &&
                  (0, r.jsx)("button", {
                    onClick: () => g(e, t),
                    disabled: y,
                    className: `rounded p-0.5 hover:bg-sidebar transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${"ok" === b ? "text-green-500" : "error" === b ? "text-red-500" : "text-text-muted hover:text-primary"}`,
                    title: y
                      ? n("testingModel")
                      : "ok" === b
                        ? "OK"
                        : "error" === b
                          ? "Error"
                          : n("testModel"),
                    children: y
                      ? (0, r.jsx)("span", {
                          className: "material-symbols-outlined text-sm animate-spin",
                          children: "progress_activity",
                        })
                      : "ok" === b
                        ? (0, r.jsx)("span", {
                            className: "material-symbols-outlined text-sm",
                            children: "check_circle",
                          })
                        : "error" === b
                          ? (0, r.jsx)("span", {
                              className: "material-symbols-outlined text-sm",
                              children: "error",
                            })
                          : (0, r.jsx)("span", {
                              className: "material-symbols-outlined text-sm",
                              children: "play_circle",
                            }),
                  }),
                h &&
                  (0, r.jsx)("button", {
                    onClick: () => h(e, !l),
                    disabled: f,
                    className:
                      "rounded p-0.5 text-text-muted hover:bg-sidebar hover:text-primary disabled:cursor-not-allowed disabled:opacity-40",
                    title: l ? Q(n, "showModel", "Show model") : Q(n, "hideModel", "Hide model"),
                    children: (0, r.jsx)("span", {
                      className: "material-symbols-outlined text-sm",
                      children: l ? "visibility_off" : "visibility",
                    }),
                  }),
                (0, r.jsx)(ex, {
                  t: n,
                  effectiveModelNormalize: (t) => c(e, t),
                  effectiveModelPreserveDeveloper: (t) => p(e, t),
                  getUpstreamHeadersRecord: m,
                  onCompatPatch: (t, a) => u(e, { compatByProtocol: { [t]: a } }),
                  showDeveloperToggle: d,
                  disabled: x,
                }),
                s &&
                  (0, r.jsx)("button", {
                    onClick: s,
                    className: "rounded p-1 text-red-500 hover:bg-red-50",
                    title: n("removeModel"),
                    children: (0, r.jsx)("span", {
                      className: "material-symbols-outlined text-sm",
                      children: "delete",
                    }),
                  }),
              ],
            }),
          ],
        });
      }
      function ej({ providerId: e, providerAlias: t, copied: a, onCopy: i, onModelsChanged: o }) {
        let n = (0, s.c)("providers"),
          d = (0, y.i)(),
          [c, p] = (0, l.useState)([]),
          [m, u] = (0, l.useState)([]),
          [x, h] = (0, l.useState)(""),
          [f, g] = (0, l.useState)(""),
          [b, v] = (0, l.useState)("chat-completions"),
          [j, k] = (0, l.useState)(["chat"]),
          [N, w] = (0, l.useState)(!1),
          [S, A] = (0, l.useState)(!0),
          [I, T] = (0, l.useState)(null),
          [M, E] = (0, l.useState)("chat-completions"),
          [O, $] = (0, l.useState)(["chat"]),
          [D, L] = (0, l.useState)(null),
          [F, U] = (0, l.useState)(null),
          _ = (0, l.useMemo)(() => q(c), [c]),
          R = (0, l.useMemo)(() => q(m), [m]),
          H = (0, l.useCallback)(async () => {
            try {
              let t = await fetch(`/api/provider-models?provider=${encodeURIComponent(e)}`);
              if (t.ok) {
                let e = await t.json();
                (p(e.models || []), u(e.modelCompatOverrides || []));
              }
            } catch (e) {
              console.error("Failed to fetch custom models:", e);
            } finally {
              A(!1);
            }
          }, [e]);
        (0, l.useEffect)(() => {
          H();
        }, [H]);
        let z = async () => {
            if (x.trim() && !N) {
              w(!0);
              try {
                (
                  await fetch("/api/provider-models", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      provider: e,
                      modelId: x.trim(),
                      modelName: f.trim() || void 0,
                      apiFormat: b,
                      supportedEndpoints: j,
                    }),
                  })
                ).ok && (h(""), g(""), v("chat-completions"), k(["chat"]), await H(), o?.());
              } catch (e) {
                console.error("Failed to add custom model:", e);
              } finally {
                w(!1);
              }
            }
          },
          B = async (t) => {
            try {
              (await fetch(
                `/api/provider-models?provider=${encodeURIComponent(e)}&model=${encodeURIComponent(t)}`,
                { method: "DELETE" }
              ),
                await H(),
                o?.());
            } catch (e) {
              console.error("Failed to remove custom model:", e);
            }
          },
          K = async (t, a) => {
            U(t);
            try {
              (
                await fetch(
                  `/api/provider-models?provider=${encodeURIComponent(e)}&modelId=${encodeURIComponent(t)}`,
                  {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ isHidden: a }),
                  }
                )
              ).ok && (await H(), o?.());
            } catch (e) {
              console.error("Failed to toggle model visibility:", e);
            } finally {
              U(null);
            }
          },
          J = () => {
            (T(null), E("chat-completions"), $(["chat"]), L(null));
          },
          G = async (t, a) => {
            L(t);
            try {
              let r = await fetch("/api/provider-models", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ provider: e, modelId: t, ...a }),
              });
              if (!r.ok) {
                let e = await el(r);
                d.error(e ? `${n("failedSaveCustomModel")} — ${e}` : n("failedSaveCustomModel"));
                return;
              }
            } catch {
              d.error(n("failedSaveCustomModel"));
              return;
            } finally {
              L(null);
            }
            try {
              (await H(), o?.());
            } catch {}
          },
          Z = async (t) => {
            if (I && I === t) {
              if (!O.length) return void d.error("Select at least one supported endpoint");
              L(t);
              try {
                let a = c.find((e) => e.id === t),
                  r = await fetch("/api/provider-models", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      provider: e,
                      modelId: t,
                      modelName: a?.name || t,
                      source: a?.source || "manual",
                      apiFormat: M,
                      supportedEndpoints: O,
                    }),
                  });
                if (!r.ok) {
                  let e = await el(r);
                  throw Error(e || "Failed to save model endpoint settings");
                }
                (await H(), o?.(), d.success("Saved model endpoint settings"), J());
              } catch (e) {
                (console.error("Failed to save custom model:", e),
                  d.error(
                    e instanceof Error && e.message
                      ? e.message
                      : "Failed to save model endpoint settings"
                  ));
              } finally {
                L(null);
              }
            }
          };
        return (0, r.jsxs)("div", {
          className: "mt-6 pt-6 border-t border-border",
          children: [
            (0, r.jsxs)("h3", {
              className: "text-sm font-semibold mb-3 flex items-center gap-2",
              children: [
                (0, r.jsx)("span", {
                  className: "material-symbols-outlined text-base text-primary",
                  children: "tune",
                }),
                n("customModels"),
              ],
            }),
            (0, r.jsx)("p", {
              className: "text-xs text-text-muted mb-3",
              children: n("customModelsHint"),
            }),
            (0, r.jsxs)("div", {
              className: "flex flex-col gap-3 mb-3",
              children: [
                (0, r.jsxs)("div", {
                  className: "flex items-end gap-2",
                  children: [
                    (0, r.jsxs)("div", {
                      className: "flex-1",
                      children: [
                        (0, r.jsx)("label", {
                          htmlFor: "custom-model-id",
                          className: "text-xs text-text-muted mb-1 block",
                          children: n("modelId"),
                        }),
                        (0, r.jsx)("input", {
                          id: "custom-model-id",
                          type: "text",
                          value: x,
                          onChange: (e) => h(e.target.value),
                          onKeyDown: (e) => "Enter" === e.key && z(),
                          placeholder: n("customModelPlaceholder"),
                          className:
                            "w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary",
                        }),
                      ],
                    }),
                    (0, r.jsxs)("div", {
                      className: "w-40",
                      children: [
                        (0, r.jsx)("label", {
                          htmlFor: "custom-model-name",
                          className: "text-xs text-text-muted mb-1 block",
                          children: n("displayName"),
                        }),
                        (0, r.jsx)("input", {
                          id: "custom-model-name",
                          type: "text",
                          value: f,
                          onChange: (e) => g(e.target.value),
                          onKeyDown: (e) => "Enter" === e.key && z(),
                          placeholder: n("optional"),
                          className:
                            "w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary",
                        }),
                      ],
                    }),
                    (0, r.jsx)(C.$n, {
                      size: "sm",
                      icon: "add",
                      onClick: z,
                      disabled: !x.trim() || N,
                      children: N ? n("adding") : n("add"),
                    }),
                  ],
                }),
                (0, r.jsxs)("div", {
                  className: "flex items-end gap-4 flex-wrap",
                  children: [
                    (0, r.jsxs)("div", {
                      className: "w-48",
                      children: [
                        (0, r.jsx)("label", {
                          htmlFor: "custom-api-format",
                          className: "text-xs text-text-muted mb-1 block",
                          children: "API Format",
                        }),
                        (0, r.jsxs)("select", {
                          id: "custom-api-format",
                          value: b,
                          onChange: (e) => v(e.target.value),
                          className:
                            "w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary",
                          children: [
                            (0, r.jsx)("option", {
                              value: "chat-completions",
                              children: n("chatCompletions"),
                            }),
                            (0, r.jsx)("option", {
                              value: "responses",
                              children: n("responsesApi"),
                            }),
                            (0, r.jsx)("option", {
                              value: "embeddings",
                              children: n("embeddings"),
                            }),
                            (0, r.jsx)("option", { value: "rerank", children: "Rerank" }),
                            (0, r.jsx)("option", {
                              value: "audio-transcriptions",
                              children: n("audioTranscriptions"),
                            }),
                            (0, r.jsx)("option", {
                              value: "audio-speech",
                              children: n("audioSpeech"),
                            }),
                            (0, r.jsx)("option", {
                              value: "images-generations",
                              children: n("imagesGenerations"),
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, r.jsxs)("div", {
                      className: "flex-1",
                      children: [
                        (0, r.jsx)("span", {
                          className: "text-xs text-text-muted mb-1 block",
                          children: n("supportedEndpointsLabel"),
                        }),
                        (0, r.jsx)("div", {
                          className: "flex items-center gap-3",
                          children: ["chat", "embeddings", "rerank", "images", "audio"].map((e) =>
                            (0, r.jsxs)(
                              "label",
                              {
                                className:
                                  "flex items-center gap-1.5 text-xs text-text-main cursor-pointer",
                                children: [
                                  (0, r.jsx)("input", {
                                    type: "checkbox",
                                    checked: j.includes(e),
                                    onChange: (t) => {
                                      t.target.checked
                                        ? k((t) => [...t, e])
                                        : k((t) => t.filter((t) => t !== e));
                                    },
                                    className: "rounded border-border",
                                  }),
                                  "chat" === e
                                    ? `💬 ${n("supportedEndpointChat")}`
                                    : "embeddings" === e
                                      ? `📐 ${n("supportedEndpointEmbeddings")}`
                                      : "rerank" === e
                                        ? "Rerank"
                                        : "images" === e
                                          ? `🖼️ ${n("supportedEndpointImages")}`
                                          : `🔊 ${n("supportedEndpointAudio")}`,
                                ],
                              },
                              e
                            )
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            S
              ? (0, r.jsx)("p", { className: "text-xs text-text-muted", children: n("loading") })
              : c.length > 0
                ? (0, r.jsx)("div", {
                    className: "flex flex-col gap-2",
                    children: c.map((e) => {
                      let l = `${t}/${e.id}`,
                        o = `custom-${e.id}`;
                      return (0, r.jsxs)(
                        "div",
                        {
                          className:
                            "flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-sidebar/50",
                          children: [
                            I !== e.id &&
                              (0, r.jsx)("span", {
                                className:
                                  "material-symbols-outlined text-base text-primary shrink-0",
                                children: "tune",
                              }),
                            (0, r.jsxs)("div", {
                              className: "min-w-0 flex-1",
                              children: [
                                (0, r.jsx)("p", {
                                  className: "text-sm font-medium truncate",
                                  children: e.name || e.id,
                                }),
                                (0, r.jsxs)("div", {
                                  className: "flex items-center gap-1 mt-1 flex-wrap",
                                  children: [
                                    (0, r.jsx)("code", {
                                      className:
                                        "text-xs text-text-muted font-mono bg-sidebar px-1.5 py-0.5 rounded",
                                      children: l,
                                    }),
                                    (0, r.jsx)("button", {
                                      onClick: () => i(l, o),
                                      className:
                                        "p-0.5 hover:bg-sidebar rounded text-text-muted hover:text-primary",
                                      title: n("copyModel"),
                                      children: (0, r.jsx)("span", {
                                        className: "material-symbols-outlined text-sm",
                                        children: a === o ? "check" : "content_copy",
                                      }),
                                    }),
                                    "responses" === e.apiFormat &&
                                      (0, r.jsx)("span", {
                                        className:
                                          "text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 font-medium",
                                        children: n("responses"),
                                      }),
                                    e.supportedEndpoints?.includes("embeddings") &&
                                      (0, r.jsx)("span", {
                                        className:
                                          "text-[10px] px-1.5 py-0.5 rounded-full bg-purple-500/15 text-purple-400 font-medium",
                                        children: `📐 ${n("supportedEndpointEmbeddings")}`,
                                      }),
                                    e.supportedEndpoints?.includes("images") &&
                                      (0, r.jsx)("span", {
                                        className:
                                          "text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-medium",
                                        children: `🖼️ ${n("imagesShortLabel")}`,
                                      }),
                                    e.supportedEndpoints?.includes("audio") &&
                                      (0, r.jsx)("span", {
                                        className:
                                          "text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400 font-medium",
                                        children: `🔊 ${n("audioShortLabel")}`,
                                      }),
                                    (function (e, t, a) {
                                      let r = t.get(e),
                                        l = a.get(e);
                                      if (r?.normalizeToolCallId || l?.normalizeToolCallId)
                                        return !0;
                                      for (let e of P) {
                                        let t = V(r, l, e);
                                        if (t?.normalizeToolCallId) return !0;
                                      }
                                      return !1;
                                    })(e.id, _, R) &&
                                      (0, r.jsx)("span", {
                                        className:
                                          "text-[10px] px-1.5 py-0.5 rounded-full bg-slate-500/15 text-slate-400 font-medium",
                                        title: n("normalizeToolCallIdLabel"),
                                        children: "ID\xd79",
                                      }),
                                    (function (e, t, a) {
                                      let r = t.get(e),
                                        l = a.get(e);
                                      if (
                                        (r &&
                                          Object.prototype.hasOwnProperty.call(
                                            r,
                                            "preserveOpenAIDeveloperRole"
                                          ) &&
                                          !1 === r.preserveOpenAIDeveloperRole) ||
                                        (l &&
                                          Object.prototype.hasOwnProperty.call(
                                            l,
                                            "preserveOpenAIDeveloperRole"
                                          ) &&
                                          !1 === l.preserveOpenAIDeveloperRole)
                                      )
                                        return !0;
                                      for (let e of P) {
                                        let t = V(r, l, e);
                                        if (
                                          t &&
                                          Object.prototype.hasOwnProperty.call(
                                            t,
                                            "preserveOpenAIDeveloperRole"
                                          ) &&
                                          !1 === t.preserveOpenAIDeveloperRole
                                        )
                                          return !0;
                                      }
                                      return !1;
                                    })(e.id, _, R) &&
                                      (0, r.jsx)("span", {
                                        className:
                                          "text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 font-medium",
                                        title: n("compatDoNotPreserveDeveloper"),
                                        children: n("compatBadgeNoPreserve"),
                                      }),
                                    (function (e, t, a) {
                                      let r = t.get(e),
                                        l = a.get(e),
                                        i = (e) =>
                                          e &&
                                          "object" == typeof e &&
                                          !Array.isArray(e) &&
                                          Object.keys(e).length > 0;
                                      if (i(r?.upstreamHeaders) || i(l?.upstreamHeaders)) return !0;
                                      for (let e of P) {
                                        let t = V(r, l, e);
                                        if (i(t?.upstreamHeaders)) return !0;
                                      }
                                      return !1;
                                    })(e.id, _, R) &&
                                      (0, r.jsx)("span", {
                                        className:
                                          "text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/15 text-violet-400 font-medium",
                                        title: n("compatUpstreamHeadersLabel"),
                                        children: n("compatBadgeUpstreamHeaders"),
                                      }),
                                  ],
                                }),
                                I === e.id &&
                                  (0, r.jsx)("div", {
                                    className:
                                      "mt-3 min-w-0 max-w-full rounded-lg border border-border bg-muted p-3 dark:bg-zinc-900",
                                    children: (0, r.jsxs)("div", {
                                      className: "flex min-w-0 flex-wrap items-end gap-x-3 gap-y-2",
                                      children: [
                                        (0, r.jsxs)("div", {
                                          className: "w-[11rem] shrink-0 min-w-0",
                                          children: [
                                            (0, r.jsx)("label", {
                                              className: "text-xs text-text-muted mb-1 block",
                                              children: n("apiFormatLabel"),
                                            }),
                                            (0, r.jsxs)("select", {
                                              value: M,
                                              onChange: (e) => E(e.target.value),
                                              className:
                                                "w-full px-2.5 py-2 text-xs border border-border rounded-lg bg-background text-text-main focus:outline-none focus:border-primary",
                                              children: [
                                                (0, r.jsx)("option", {
                                                  value: "chat-completions",
                                                  children: n("chatCompletions"),
                                                }),
                                                (0, r.jsx)("option", {
                                                  value: "responses",
                                                  children: n("responsesApi"),
                                                }),
                                                (0, r.jsx)("option", {
                                                  value: "embeddings",
                                                  children: n("embeddings"),
                                                }),
                                                (0, r.jsx)("option", {
                                                  value: "rerank",
                                                  children: "Rerank",
                                                }),
                                                (0, r.jsx)("option", {
                                                  value: "audio-transcriptions",
                                                  children: n("audioTranscriptions"),
                                                }),
                                                (0, r.jsx)("option", {
                                                  value: "audio-speech",
                                                  children: n("audioSpeech"),
                                                }),
                                                (0, r.jsx)("option", {
                                                  value: "images-generations",
                                                  children: n("imagesGenerations"),
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, r.jsxs)("div", {
                                          className:
                                            "flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1 overflow-x-auto overflow-y-visible [scrollbar-width:thin]",
                                          children: [
                                            (0, r.jsx)("span", {
                                              className: "text-xs text-text-muted shrink-0",
                                              children: n("supportedEndpointsLabel"),
                                            }),
                                            (0, r.jsx)("div", {
                                              className:
                                                "flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 min-w-0",
                                              children: [
                                                "chat",
                                                "embeddings",
                                                "rerank",
                                                "images",
                                                "audio",
                                              ].map((e) =>
                                                (0, r.jsxs)(
                                                  "label",
                                                  {
                                                    className:
                                                      "flex items-center gap-1.5 text-xs text-text-main cursor-pointer whitespace-nowrap",
                                                    children: [
                                                      (0, r.jsx)("input", {
                                                        type: "checkbox",
                                                        checked: O.includes(e),
                                                        onChange: (t) => {
                                                          t.target.checked
                                                            ? $((t) =>
                                                                t.includes(e) ? t : [...t, e]
                                                              )
                                                            : $((t) => t.filter((t) => t !== e));
                                                        },
                                                        className: "rounded border-border",
                                                      }),
                                                      "chat" === e
                                                        ? `💬 ${n("supportedEndpointChat")}`
                                                        : "embeddings" === e
                                                          ? `📐 ${n("supportedEndpointEmbeddings")}`
                                                          : "rerank" === e
                                                            ? "Rerank"
                                                            : "images" === e
                                                              ? `🖼️ ${n("supportedEndpointImages")}`
                                                              : `🔊 ${n("supportedEndpointAudio")}`,
                                                    ],
                                                  },
                                                  e
                                                )
                                              ),
                                            }),
                                          ],
                                        }),
                                        (0, r.jsxs)("div", {
                                          className:
                                            "flex shrink-0 flex-wrap items-center gap-2 pb-0.5",
                                          children: [
                                            (0, r.jsx)(C.$n, {
                                              size: "sm",
                                              onClick: () => Z(e.id),
                                              disabled: D === e.id,
                                              children: D === e.id ? n("saving") : n("save"),
                                            }),
                                            (0, r.jsx)(C.$n, {
                                              size: "sm",
                                              variant: "ghost",
                                              onClick: J,
                                              children: n("cancel"),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  }),
                              ],
                            }),
                            (0, r.jsxs)("div", {
                              className: "flex shrink-0 items-center gap-1",
                              children: [
                                (0, r.jsx)("button", {
                                  onClick: () => {
                                    (T(e.id),
                                      E(e.apiFormat || "chat-completions"),
                                      $(
                                        Array.isArray(e.supportedEndpoints) &&
                                          e.supportedEndpoints.length
                                          ? e.supportedEndpoints
                                          : ["chat"]
                                      ));
                                  },
                                  className:
                                    "rounded p-1 text-text-muted hover:bg-sidebar hover:text-primary",
                                  title: n("edit"),
                                  children: (0, r.jsx)("span", {
                                    className: "material-symbols-outlined text-sm",
                                    children: "edit",
                                  }),
                                }),
                                (0, r.jsx)(ex, {
                                  t: n,
                                  effectiveModelNormalize: (t) => ea(e.id, t, _, R),
                                  effectiveModelPreserveDeveloper: (t) => er(e.id, t, _, R),
                                  getUpstreamHeadersRecord: (t) => ei(e.id, t, _, R),
                                  onCompatPatch: (t, a) =>
                                    G(e.id, { compatByProtocol: { [t]: a } }),
                                  showDeveloperToggle: !0,
                                  disabled: D === e.id,
                                }),
                                (0, r.jsx)("button", {
                                  onClick: () => K(e.id, !e.isHidden),
                                  disabled: F === e.id,
                                  className:
                                    "rounded p-1 text-text-muted hover:bg-sidebar hover:text-primary disabled:opacity-50",
                                  title: e.isHidden ? n("unhideModel") : n("hideModel"),
                                  children: (0, r.jsx)("span", {
                                    className: "material-symbols-outlined text-sm",
                                    children: e.isHidden ? "visibility_off" : "visibility",
                                  }),
                                }),
                                (0, r.jsx)("button", {
                                  onClick: () => B(e.id),
                                  className: "rounded p-1 text-red-500 hover:bg-red-50",
                                  title: n("removeCustomModel"),
                                  children: (0, r.jsx)("span", {
                                    className: "material-symbols-outlined text-sm",
                                    children: "delete",
                                  }),
                                }),
                              ],
                            }),
                          ],
                        },
                        e.id
                      );
                    }),
                  })
                : (0, r.jsx)("p", {
                    className: "text-xs text-text-muted",
                    children: n("noCustomModels"),
                  }),
          ],
        });
      }
      function ek({
        providerStorageAlias: e,
        providerDisplayAlias: t,
        modelAliases: a,
        availableModels: i = [],
        customModels: o = [],
        fallbackModels: s = [],
        description: n,
        inputLabel: d,
        inputPlaceholder: c,
        copied: p,
        onCopy: m,
        onSetAlias: u,
        onDeleteAlias: x,
        connections: h,
        isAnthropic: f,
        onImportWithProgress: g,
        t: b,
        effectiveModelNormalize: v,
        effectiveModelPreserveDeveloper: j,
        getUpstreamHeadersRecord: k,
        saveModelCompatFlags: N,
        compatSavingModelId: w,
        onModelsChanged: S,
        allowImport: A,
        isModelHidden: I,
        onToggleHidden: M,
        onBulkToggleHidden: P,
        bulkTogglePending: E,
        togglingModelId: O,
        onTestModel: $,
        modelTestStatus: D,
        testingModelId: L,
      }) {
        let [F, U] = (0, l.useState)(""),
          [_, R] = (0, l.useState)(!1),
          [H, z] = (0, l.useState)(!1),
          [B, K] = (0, l.useState)(""),
          J = (0, y.i)(),
          G = (0, l.useMemo)(() => q(o), [o]),
          Z = (0, l.useMemo)(
            () => Object.entries(a).filter(([, t]) => t.startsWith(`${e}/`)),
            [a, e]
          ),
          W = (0, l.useMemo)(() => {
            let t = `${e}/`,
              a = new Map(),
              r = [],
              l = new Set();
            for (let [e, r] of Z) {
              let l = r.startsWith(t) ? r.slice(t.length) : r;
              a.set(l, e);
            }
            let n = (e, t) => {
              !e?.id ||
                l.has(e.id) ||
                (r.push({
                  modelId: e.id,
                  alias: a.get(e.id) || null,
                  displayName: e.name || e.id,
                  source: t,
                  isHidden: I(e.id),
                }),
                l.add(e.id));
            };
            for (let e of i) n(e, "imported");
            for (let e of o) n(e, "imported" === (0, T.J4)(e.source) ? "imported" : "custom");
            for (let e of s) n(e, "fallback");
            for (let [e, a] of Z) {
              let i = a.startsWith(t) ? a.slice(t.length) : a;
              if (!i || l.has(i)) continue;
              let o = G.get(i);
              (r.push({
                modelId: i,
                alias: e,
                displayName: e,
                source: o ? o.source || "custom" : "alias",
                isHidden: I(i),
              }),
                l.add(i));
            }
            return r;
          }, [i, G, o, s, I, Z, e]),
          V = W.filter((e) =>
            (0, T.ir)(B, {
              modelId: e.modelId,
              modelName: e.displayName,
              alias: e.alias,
              source: e.source,
            })
          ),
          X = W.filter((e) => !e.isHidden).length,
          Y = V.filter((e) => e.isHidden).length,
          ee = V.length - Y,
          et = (0, l.useCallback)(
            (a, r) =>
              (function ({
                modelId: e,
                fullModel: t,
                providerDisplayAlias: a,
                existingAliases: r,
              }) {
                let l = (function (e) {
                  let t = e.trim();
                  if (!t) return "";
                  let a = t
                    .split("/")
                    .map((e) => e.trim())
                    .filter(Boolean);
                  return a[a.length - 1] || t;
                })(e);
                if (!l) return null;
                for (let [e, a] of Object.entries(r)) if (a === t) return e;
                let i = a.trim(),
                  o = [],
                  s = new Set(),
                  n = (e) => {
                    let t = e.trim();
                    !t || s.has(t) || (s.add(t), o.push(t));
                  };
                for (let e of (n(l), i && n(`${i}-${l}`), o)) if (!(e in r) || r[e] === t) return e;
                for (let e = 2; e <= 5e3; e += 1) {
                  if (i) {
                    let a = `${i}-${l}-${e}`;
                    if (!(a in r) || r[a] === t) return a;
                  }
                  let a = `${l}-${e}`;
                  if (!(a in r) || r[a] === t) return a;
                }
                return null;
              })({
                modelId: a,
                fullModel: `${e}/${a}`,
                providerDisplayAlias: t,
                existingAliases: r,
              }),
            [t, e]
          ),
          ea = async () => {
            if (!F.trim() || _) return;
            let t = F.trim(),
              r = et(t, a);
            if (!r) return void J.error(b("allSuggestedAliasesExist"));
            R(!0);
            try {
              let a = await fetch("/api/provider-models", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ provider: e, modelId: t, modelName: t, source: "manual" }),
              });
              if (!a.ok) {
                let e = {};
                try {
                  e = await a.json();
                } catch (e) {
                  console.error("Failed to parse error response from custom model API:", e);
                }
                throw Error(e.error?.message || b("failedSaveCustomModel"));
              }
              (await u(t, r, e), U(""), J.success(b("modelAddedSuccess", { modelId: t })), S?.());
            } catch (e) {
              (console.error("Error adding model:", e),
                J.error(e instanceof Error ? e.message : b("failedAddModelTryAgain")));
            } finally {
              R(!1);
            }
          },
          er = async () => {
            if (!A || H) return;
            let e = h.find((e) => !1 !== e.isActive);
            if (e?.id) {
              z(!0);
              try {
                await g(e.id);
              } catch (e) {
                (console.error("Error importing models:", e),
                  J.error(b("failedImportModelsTryAgain")));
              } finally {
                z(!1);
              }
            }
          },
          el = h.some((e) => !1 !== e.isActive),
          ei = async (t, a) => {
            try {
              if (
                !(
                  await fetch(
                    `/api/provider-models?provider=${encodeURIComponent(e)}&model=${encodeURIComponent(t)}`,
                    { method: "DELETE" }
                  )
                ).ok
              )
                throw Error(b("failedRemoveModelFromDatabase"));
              (a && (await x(a)), J.success(b("modelRemovedSuccess")), S?.());
            } catch (e) {
              (console.error("Error deleting model:", e),
                J.error(e instanceof Error ? e.message : b("failedDeleteModelTryAgain")));
            }
          };
        return (0, r.jsxs)("div", {
          className: "flex flex-col gap-4",
          children: [
            (0, r.jsx)("p", { className: "text-sm text-text-muted", children: n }),
            (0, r.jsxs)("div", {
              className: "flex items-end gap-2 flex-wrap",
              children: [
                (0, r.jsxs)("div", {
                  className: "flex-1 min-w-[240px]",
                  children: [
                    (0, r.jsx)("label", {
                      htmlFor: "new-compatible-model-input",
                      className: "text-xs text-text-muted mb-1 block",
                      children: d,
                    }),
                    (0, r.jsx)("input", {
                      id: "new-compatible-model-input",
                      type: "text",
                      value: F,
                      onChange: (e) => U(e.target.value),
                      onKeyDown: (e) => "Enter" === e.key && ea(),
                      placeholder: c,
                      className:
                        "w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary",
                    }),
                  ],
                }),
                (0, r.jsx)(C.$n, {
                  size: "sm",
                  icon: "add",
                  onClick: ea,
                  disabled: !F.trim() || _,
                  children: _ ? b("adding") : b("add"),
                }),
                A &&
                  (0, r.jsx)(C.$n, {
                    size: "sm",
                    variant: "secondary",
                    icon: "download",
                    onClick: er,
                    disabled: !el || H,
                    children: H ? b("importingModels") : b("importFromModels"),
                  }),
              ],
            }),
            A &&
              !el &&
              (0, r.jsx)("p", {
                className: "text-xs text-text-muted",
                children: b("addConnectionToImport"),
              }),
            W.length > 0 &&
              (0, r.jsxs)("div", {
                className: "flex flex-col gap-3",
                children: [
                  (0, r.jsx)(eb, {
                    t: b,
                    filterValue: B,
                    onFilterChange: K,
                    activeCount: X,
                    totalCount: W.length,
                    onSelectAll: () =>
                      P(
                        V.map((e) => e.modelId),
                        !1
                      ),
                    onDeselectAll: () =>
                      P(
                        V.map((e) => e.modelId),
                        !0
                      ),
                    selectAllDisabled: 0 === Y || E,
                    deselectAllDisabled: 0 === ee || E,
                  }),
                  V.map(({ modelId: a, alias: l, isHidden: i, source: o }) =>
                    (0, r.jsx)(
                      ev,
                      {
                        modelId: a,
                        fullModel: `${t}/${a}`,
                        source: o,
                        isHidden: i,
                        copied: p,
                        onCopy: m,
                        onDeleteAlias:
                          "custom" === o || "manual" === o
                            ? () => ei(a, l)
                            : "alias" === o && l
                              ? () => x(l)
                              : void 0,
                        t: b,
                        showDeveloperToggle: !f,
                        effectiveModelNormalize: v,
                        effectiveModelPreserveDeveloper: j,
                        getUpstreamHeadersRecord: (e) => k(a, e),
                        saveModelCompatFlags: N,
                        compatDisabled: w === a,
                        onToggleHidden: M,
                        togglingHidden: O === a,
                      },
                      `${e}:${a}`
                    )
                  ),
                  0 === V.length &&
                    B &&
                    (0, r.jsx)("p", {
                      className: "py-2 text-sm text-text-muted",
                      children: Q(b, "noModelsMatch", `No models match "${B}"`, { filter: B }),
                    }),
                ],
              }),
          ],
        });
      }
      function eC({ until: e }) {
        let [t, a] = (0, l.useState)("");
        return ((0, l.useEffect)(() => {
          let t = () => {
            let t = new Date(e).getTime() - Date.now();
            if (t <= 0) return void a("");
            let r = Math.floor(t / 1e3);
            if (r < 60) a(`${r}s`);
            else if (r < 3600) a(`${Math.floor(r / 60)}m ${r % 60}s`);
            else {
              let e = Math.floor(r / 3600),
                t = Math.floor((r % 3600) / 60);
              a(`${e}h ${t}m`);
            }
          };
          t();
          let r = setInterval(t, 1e3);
          return () => clearInterval(r);
        }, [e]),
        t)
          ? (0, r.jsxs)("span", {
              className: "text-xs text-orange-500 font-mono",
              children: ["⏱ ", t],
            })
          : null;
      }
      let eN = {
        runtime_error: { labelKey: "errorTypeRuntime", variant: "warning" },
        upstream_auth_error: { labelKey: "errorTypeUpstreamAuth", variant: "error" },
        account_deactivated: { labelKey: "Account Deactivated", variant: "error" },
        auth_missing: { labelKey: "errorTypeMissingCredential", variant: "warning" },
        token_refresh_failed: { labelKey: "errorTypeRefreshFailed", variant: "warning" },
        token_expired: { labelKey: "errorTypeTokenExpired", variant: "warning" },
        upstream_rate_limited: { labelKey: "errorTypeRateLimited", variant: "warning" },
        upstream_unavailable: { labelKey: "errorTypeUpstreamUnavailable", variant: "error" },
        network_error: { labelKey: "errorTypeNetworkError", variant: "warning" },
        unsupported: { labelKey: "errorTypeTestUnsupported", variant: "default" },
        upstream_error: { labelKey: "errorTypeUpstreamError", variant: "error" },
        banned: { labelKey: "403 Banned", variant: "error" },
        credits_exhausted: { labelKey: "No Credits", variant: "warning" },
      };
      function ew({
        connection: e,
        isOAuth: t,
        isClaude: a,
        isCodex: i,
        isGeminiCli: o,
        codexGlobalServiceMode: n,
        isCcCompatible: d,
        cliproxyapiEnabled: c,
        isFirst: p,
        isLast: m,
        isSelected: u,
        onToggleSelect: x,
        onMoveUp: h,
        onMoveDown: f,
        onToggleActive: g,
        onToggleRateLimit: b,
        onToggleClaudeExtraUsage: y,
        onToggleCodex5h: v,
        onToggleCodexWeekly: j,
        onToggleCliproxyapiMode: k,
        onRetest: N,
        isRetesting: w,
        onEdit: S,
        onDelete: A,
        onReauth: I,
        onProxy: T,
        hasProxy: M,
        proxySource: P,
        proxyHost: $,
        onRefreshToken: D,
        isRefreshing: L,
        onApplyCodexAuthLocal: _,
        isApplyingCodexAuthLocal: R,
        onExportCodexAuthFile: H,
        isExportingCodexAuthFile: z,
        onApplyClaudeAuthLocal: B,
        isApplyingClaudeAuthLocal: K,
        onExportClaudeAuthFile: J,
        isExportingClaudeAuthFile: G,
        onApplyGeminiAuthLocal: Z,
        isApplyingGeminiAuthLocal: W,
        onExportGeminiAuthFile: q,
        isExportingGeminiAuthFile: V,
      }) {
        let X,
          Y = (0, s.c)("providers"),
          ee = (0, O.A)((e) => e.emailsVisible),
          et = t ? (0, E.ZZ)([e.name, e.email, e.displayName], ee, Y("oauthAccount")) : e.name,
          ea =
            "function" == typeof Y.has && Y.has("applyCodexAuthLocal")
              ? Y("applyCodexAuthLocal")
              : "Apply auth",
          er =
            "function" == typeof Y.has && Y.has("exportCodexAuthFile")
              ? Y("exportCodexAuthFile")
              : "Export auth",
          el =
            "function" == typeof Y.has && Y.has("applyClaudeAuthLocal")
              ? Y("applyClaudeAuthLocal")
              : "Apply auth",
          ei =
            "function" == typeof Y.has && Y.has("exportClaudeAuthFile")
              ? Y("exportClaudeAuthFile")
              : "Export auth",
          eo =
            "function" == typeof Y.has && Y.has("applyGeminiAuthLocal")
              ? Y("applyGeminiAuthLocal")
              : "Apply auth",
          es =
            "function" == typeof Y.has && Y.has("exportGeminiAuthFile")
              ? Y("exportGeminiAuthFile")
              : "Export auth",
          [en, ed] = (0, l.useState)(!1),
          ec = e.tokenExpiresAt || e.expiresAt,
          [ep, em] = (0, l.useState)(() =>
            t && ec ? Math.floor((new Date(ec).getTime() - Date.now()) / 6e4) : null
          );
        ((0, l.useEffect)(() => {
          if (!t || !ec) return;
          let e = () => {
            em(Math.floor((new Date(ec).getTime() - Date.now()) / 6e4));
          };
          e();
          let a = setInterval(e, 3e4);
          return () => clearInterval(a);
        }, [t, ec]),
          (0, l.useEffect)(() => {
            let t = () => {
              ed(e.rateLimitedUntil && new Date(e.rateLimitedUntil).getTime() > Date.now());
            };
            t();
            let a = e.rateLimitedUntil ? setInterval(t, 1e3) : null;
            return () => {
              a && clearInterval(a);
            };
          }, [e.rateLimitedUntil]));
        let ex = "unavailable" !== e.testStatus || en ? e.testStatus : "active",
          eh = (function (e, t, a, r) {
            if (!1 === e.isActive)
              return {
                statusVariant: "default",
                statusLabel: r("statusDisabled"),
                errorType: null,
                errorBadge: null,
                errorTextClass: "text-text-muted",
              };
            if ("active" === t || "success" === t)
              return {
                statusVariant: "success",
                statusLabel: r("statusConnected"),
                errorType: null,
                errorBadge: null,
                errorTextClass: "text-text-muted",
              };
            let l = (function (e, t) {
                if (t) return "upstream_rate_limited";
                if ("banned" === e.testStatus) return "banned";
                if ("credits_exhausted" === e.testStatus) return "credits_exhausted";
                if (e.lastErrorType) return e.lastErrorType;
                let a = Number(e.errorCode);
                if (401 === a || 403 === a) return "upstream_auth_error";
                if (429 === a) return "upstream_rate_limited";
                if (a >= 500) return "upstream_unavailable";
                let r = (e.lastError || "").toLowerCase();
                return r
                  ? r.includes("runtime") ||
                    r.includes("not runnable") ||
                    r.includes("not installed") ||
                    r.includes("healthcheck")
                    ? "runtime_error"
                    : r.includes("refresh failed")
                      ? "token_refresh_failed"
                      : r.includes("token expired") || r.includes("expired")
                        ? "token_expired"
                        : r.includes("invalid api key") ||
                            r.includes("token invalid") ||
                            r.includes("revoked") ||
                            r.includes("access denied") ||
                            r.includes("unauthorized")
                          ? "upstream_auth_error"
                          : r.includes("rate limit") ||
                              r.includes("quota") ||
                              r.includes("too many requests") ||
                              r.includes("429")
                            ? "upstream_rate_limited"
                            : r.includes("fetch failed") ||
                                r.includes("network") ||
                                r.includes("timeout") ||
                                r.includes("econn") ||
                                r.includes("enotfound")
                              ? "network_error"
                              : r.includes("not supported")
                                ? "unsupported"
                                : "upstream_error"
                  : null;
              })(e, a),
              i = (l && eN[l]) || null;
            return "runtime_error" === l
              ? {
                  statusVariant: "warning",
                  statusLabel: r("statusRuntimeIssue"),
                  errorType: l,
                  errorBadge: i,
                  errorTextClass: "text-yellow-600 dark:text-yellow-400",
                }
              : "account_deactivated" === l
                ? {
                    statusVariant: "error",
                    statusLabel: r("statusDeactivated", "Deactivated"),
                    errorType: l,
                    errorBadge: i,
                    errorTextClass: "text-red-600 font-bold",
                  }
                : "upstream_auth_error" === l ||
                    "auth_missing" === l ||
                    "token_refresh_failed" === l ||
                    "token_expired" === l
                  ? {
                      statusVariant: "error",
                      statusLabel: r("statusAuthFailed"),
                      errorType: l,
                      errorBadge: i,
                      errorTextClass: "text-red-500",
                    }
                  : "upstream_rate_limited" === l
                    ? {
                        statusVariant: "warning",
                        statusLabel: r("statusRateLimited"),
                        errorType: l,
                        errorBadge: i,
                        errorTextClass: "text-yellow-600 dark:text-yellow-400",
                      }
                    : "network_error" === l
                      ? {
                          statusVariant: "warning",
                          statusLabel: r("statusNetworkIssue"),
                          errorType: l,
                          errorBadge: i,
                          errorTextClass: "text-yellow-600 dark:text-yellow-400",
                        }
                      : "unsupported" === l
                        ? {
                            statusVariant: "default",
                            statusLabel: r("statusTestUnsupported"),
                            errorType: l,
                            errorBadge: i,
                            errorTextClass: "text-text-muted",
                          }
                        : "banned" === l
                          ? {
                              statusVariant: "error",
                              statusLabel: r("statusBanned", "Banned (403)"),
                              errorType: l,
                              errorBadge: i,
                              errorTextClass: "text-red-600 font-bold",
                            }
                          : "credits_exhausted" === l
                            ? {
                                statusVariant: "warning",
                                statusLabel: r("statusCreditsExhausted", "Out of Credits"),
                                errorType: l,
                                errorBadge: i,
                                errorTextClass: "text-amber-500",
                              }
                            : {
                                statusVariant: "error",
                                statusLabel:
                                  {
                                    unavailable: r("statusUnavailable"),
                                    failed: r("statusFailed"),
                                    error: r("statusError"),
                                  }[t] ||
                                  t ||
                                  r("statusError"),
                                errorType: l,
                                errorBadge: i,
                                errorTextClass: "text-red-500",
                              };
          })(e, ex, en, Y),
          ef = !!e.rateLimitProtection,
          eg = eu(
            e.providerSpecificData &&
              "object" == typeof e.providerSpecificData &&
              e.providerSpecificData.codexLimitPolicy &&
              "object" == typeof e.providerSpecificData.codexLimitPolicy
              ? e.providerSpecificData.codexLimitPolicy
              : {}
          ),
          eb = eg.use5h,
          ey = eg.useWeekly,
          ev = i ? (0, F.CD)(e.providerSpecificData, n ?? "none") : "default",
          ej = i && void 0 !== n && "none" !== n,
          ek =
            "priority" === ev
              ? {
                  label: Q(Y, "codexTierFastLabel", "Fast"),
                  icon: "bolt",
                  className: "bg-sky-500/15 text-sky-500",
                  title: ej
                    ? Q(
                        Y,
                        "providerDetailGlobalPriorityActive",
                        "Global Codex priority service tier is active"
                      )
                    : Q(
                        Y,
                        "providerDetailConnectionPriorityActive",
                        "Codex priority service tier is active for this connection"
                      ),
                }
              : "flex" === ev
                ? {
                    label: Q(Y, "codexTierFlexLabel", "Flex"),
                    icon: "speed",
                    className: "bg-cyan-500/15 text-cyan-500",
                    title: ej
                      ? Q(
                          Y,
                          "providerDetailGlobalFlexActive",
                          "Global Codex flex service tier is active"
                        )
                      : Q(
                          Y,
                          "providerDetailConnectionFlexActive",
                          "Codex flex service tier is active for this connection"
                        ),
                  }
                : null,
          eS = !!a && U("claude", e.providerSpecificData),
          eA = !!c;
        return (0, r.jsxs)("div", {
          className: `group flex items-center justify-between p-3 rounded-lg hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors ${!1 === e.isActive ? "opacity-60" : ""}`,
          children: [
            (0, r.jsxs)("div", {
              className: "flex items-center gap-3 flex-1 min-w-0",
              children: [
                x &&
                  (0, r.jsx)("input", {
                    type: "checkbox",
                    checked: u,
                    onChange: x,
                    className:
                      "w-4 h-4 shrink-0 rounded border-border text-primary focus:ring-primary/30 cursor-pointer",
                  }),
                (0, r.jsxs)("div", {
                  className: "flex flex-col",
                  children: [
                    (0, r.jsx)("button", {
                      onClick: h,
                      disabled: p,
                      className: `p-0.5 rounded ${p ? "text-text-muted/30 cursor-not-allowed" : "hover:bg-sidebar text-text-muted hover:text-primary"}`,
                      children: (0, r.jsx)("span", {
                        className: "material-symbols-outlined text-sm",
                        children: "keyboard_arrow_up",
                      }),
                    }),
                    (0, r.jsx)("button", {
                      onClick: f,
                      disabled: m,
                      className: `p-0.5 rounded ${m ? "text-text-muted/30 cursor-not-allowed" : "hover:bg-sidebar text-text-muted hover:text-primary"}`,
                      children: (0, r.jsx)("span", {
                        className: "material-symbols-outlined text-sm",
                        children: "keyboard_arrow_down",
                      }),
                    }),
                  ],
                }),
                (0, r.jsx)("span", {
                  className: "material-symbols-outlined text-base text-text-muted",
                  children: t ? "lock" : "key",
                }),
                (0, r.jsxs)("div", {
                  className: "flex-1 min-w-0",
                  children: [
                    (0, r.jsx)("p", { className: "text-sm font-medium truncate", children: et }),
                    (0, r.jsxs)("div", {
                      className: "flex items-center gap-2 mt-1 flex-wrap",
                      children: [
                        (0, r.jsx)(C.Ex, {
                          variant: eh.statusVariant,
                          size: "sm",
                          dot: !0,
                          children: eh.statusLabel,
                        }),
                        null !== ep &&
                          (ep < 0
                            ? (0, r.jsxs)("span", {
                                className:
                                  "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium bg-red-500/15 text-red-500",
                                title: Y("tokenExpiredTitle", { date: ec }),
                                children: [
                                  (0, r.jsx)("span", {
                                    className: "material-symbols-outlined text-[11px]",
                                    children: "error",
                                  }),
                                  Y("tokenExpiredBadge"),
                                ],
                              })
                            : ep < 30
                              ? (0, r.jsxs)("span", {
                                  className:
                                    "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium bg-amber-500/15 text-amber-500",
                                  title: Y("tokenExpiresSoonTitle", { minutes: ep }),
                                  children: [
                                    (0, r.jsx)("span", {
                                      className: "material-symbols-outlined text-[11px]",
                                      children: "warning",
                                    }),
                                    `~${ep}m`,
                                  ],
                                })
                              : null),
                        en && !1 !== e.isActive && (0, r.jsx)(eC, { until: e.rateLimitedUntil }),
                        eh.errorBadge &&
                          !1 !== e.isActive &&
                          (0, r.jsx)(C.Ex, {
                            variant: eh.errorBadge.variant,
                            size: "sm",
                            children: Y(eh.errorBadge.labelKey),
                          }),
                        e.lastError &&
                          !1 !== e.isActive &&
                          (0, r.jsx)("span", {
                            className: `text-xs truncate max-w-[300px] ${eh.errorTextClass}`,
                            title: e.lastError,
                            children: e.lastError,
                          }),
                        (0, r.jsxs)("span", {
                          className: "text-xs text-text-muted",
                          children: ["#", e.priority],
                        }),
                        e.globalPriority &&
                          (0, r.jsx)("span", {
                            className: "text-xs text-text-muted",
                            children: Y("autoPriority", { priority: e.globalPriority }),
                          }),
                        null != e.maxConcurrent &&
                          e.maxConcurrent > 0 &&
                          (0, r.jsxs)("span", {
                            className:
                              "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium bg-zinc-500/15 text-zinc-500 dark:bg-zinc-400/15 dark:text-zinc-400",
                            title: Y("accountConcurrencyCapLabel"),
                            children: [
                              (0, r.jsx)("span", {
                                className: "material-symbols-outlined text-[11px]",
                                children: "dynamic_feed",
                              }),
                              e.maxConcurrent,
                            ],
                          }),
                        (0, r.jsx)("span", {
                          className: "text-text-muted/30 select-none",
                          children: "|",
                        }),
                        (0, r.jsxs)("button", {
                          onClick: () => b(!ef),
                          className: `inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all cursor-pointer ${ef ? "bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25" : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"}`,
                          title: Y(ef ? "disableRateLimitProtection" : "enableRateLimitProtection"),
                          children: [
                            (0, r.jsx)("span", {
                              className: "material-symbols-outlined text-[13px]",
                              children: "shield",
                            }),
                            Y(ef ? "rateLimitProtected" : "rateLimitUnprotected"),
                          ],
                        }),
                        a &&
                          (0, r.jsxs)(r.Fragment, {
                            children: [
                              (0, r.jsx)("span", {
                                className: "text-text-muted/30 select-none",
                                children: "|",
                              }),
                              (0, r.jsxs)("button", {
                                onClick: () => y?.(!eS),
                                className: `inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all cursor-pointer ${!eS ? "bg-amber-500/15 text-amber-500 hover:bg-amber-500/25" : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"}`,
                                title: Y("claudeExtraUsageToggleTitle"),
                                children: [
                                  (0, r.jsx)("span", {
                                    className: "material-symbols-outlined text-[13px]",
                                    children: "payments",
                                  }),
                                  Y("claudeExtraUsageShort"),
                                  " ",
                                  Y(eS ? "toggleOffShort" : "toggleOnShort"),
                                ],
                              }),
                            ],
                          }),
                        d &&
                          (0, r.jsxs)(r.Fragment, {
                            children: [
                              (0, r.jsx)("span", {
                                className: "text-text-muted/30 select-none",
                                children: "|",
                              }),
                              (0, r.jsxs)("button", {
                                onClick: () => k?.(!eA),
                                className: `inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all cursor-pointer ${eA ? "bg-indigo-500/15 text-indigo-500 hover:bg-indigo-500/25" : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"}`,
                                title: Y(eA ? "cpaModeEnabledTitle" : "cpaModeDisabledTitle"),
                                children: [
                                  (0, r.jsx)("span", {
                                    className: "material-symbols-outlined text-[13px]",
                                    children: "swap_horiz",
                                  }),
                                  "CPA ",
                                  Y(eA ? "toggleOnShort" : "toggleOffShort"),
                                ],
                              }),
                            ],
                          }),
                        i &&
                          (0, r.jsxs)(r.Fragment, {
                            children: [
                              (0, r.jsx)("span", {
                                className: "text-text-muted/30 select-none",
                                children: "|",
                              }),
                              ek &&
                                (0, r.jsxs)("span", {
                                  className: `inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium ${ek.className}`,
                                  title: ek.title,
                                  children: [
                                    (0, r.jsx)("span", {
                                      className: "material-symbols-outlined text-[13px]",
                                      children: ek.icon,
                                    }),
                                    ek.label,
                                  ],
                                }),
                              (0, r.jsxs)("button", {
                                onClick: () => v?.(!eb),
                                className: `inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all cursor-pointer ${eb ? "bg-blue-500/15 text-blue-500 hover:bg-blue-500/25" : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"}`,
                                title: Y("codex5hToggleTitle"),
                                children: [
                                  (0, r.jsx)("span", {
                                    className: "material-symbols-outlined text-[13px]",
                                    children: "timer",
                                  }),
                                  "5h ",
                                  Y(eb ? "toggleOnShort" : "toggleOffShort"),
                                ],
                              }),
                              (0, r.jsxs)("button", {
                                onClick: () => j?.(!ey),
                                className: `inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all cursor-pointer ${ey ? "bg-violet-500/15 text-violet-500 hover:bg-violet-500/25" : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"}`,
                                title: Y("codexWeeklyToggleTitle"),
                                children: [
                                  (0, r.jsx)("span", {
                                    className: "material-symbols-outlined text-[13px]",
                                    children: "date_range",
                                  }),
                                  Y("weeklyShort"),
                                  " ",
                                  Y(ey ? "toggleOnShort" : "toggleOffShort"),
                                ],
                              }),
                            ],
                          }),
                        M &&
                          ((X = Y(
                            "global" === P
                              ? "proxySourceGlobal"
                              : "provider" === P
                                ? "proxySourceProvider"
                                : "proxySourceKey"
                          )),
                          (0, r.jsxs)(r.Fragment, {
                            children: [
                              (0, r.jsx)("span", {
                                className: "text-text-muted/30 select-none",
                                children: "|",
                              }),
                              (0, r.jsxs)("span", {
                                className: `inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium ${"global" === P ? "bg-emerald-500/15 text-emerald-500" : "provider" === P ? "bg-amber-500/15 text-amber-500" : "bg-blue-500/15 text-blue-500"}`,
                                title: Y("proxyConfiguredBySource", {
                                  source: X,
                                  host: $ || Y("configured"),
                                }),
                                children: [
                                  (0, r.jsx)("span", {
                                    className: "material-symbols-outlined text-[13px]",
                                    children: "vpn_lock",
                                  }),
                                  $ || Y("proxy"),
                                ],
                              }),
                            ],
                          })),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, r.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [
                (0, r.jsx)(C.$n, {
                  size: "sm",
                  variant: "ghost",
                  icon: "refresh",
                  loading: w,
                  disabled: !1 === e.isActive,
                  onClick: N,
                  className: "!h-7 !px-2 text-xs",
                  title: Y("retestAuthentication"),
                  children: Y("retest"),
                }),
                D &&
                  (0, r.jsx)(C.$n, {
                    size: "sm",
                    variant: "ghost",
                    icon: "token",
                    loading: L,
                    disabled: !1 === e.isActive || L,
                    onClick: D,
                    className: "!h-7 !px-2 text-xs text-amber-500 hover:text-amber-400",
                    title: Y("refreshOauthTokenTitle"),
                    children: Y("tokenShort"),
                  }),
                i &&
                  _ &&
                  (0, r.jsx)(C.$n, {
                    size: "sm",
                    variant: "ghost",
                    icon: "download_done",
                    loading: R,
                    disabled: R,
                    onClick: _,
                    className: "!h-7 !px-2 text-xs text-emerald-500 hover:text-emerald-400",
                    title: ea,
                    children: ea,
                  }),
                i &&
                  H &&
                  (0, r.jsx)(C.$n, {
                    size: "sm",
                    variant: "ghost",
                    icon: "download",
                    loading: z,
                    disabled: z,
                    onClick: H,
                    className: "!h-7 !px-2 text-xs text-sky-500 hover:text-sky-400",
                    title: er,
                    children: er,
                  }),
                a &&
                  B &&
                  (0, r.jsx)(C.$n, {
                    size: "sm",
                    variant: "ghost",
                    icon: "install_desktop",
                    loading: K,
                    disabled: K,
                    onClick: B,
                    className: "!h-7 !px-2 text-xs text-emerald-500 hover:text-emerald-400",
                    title: el,
                    children: el,
                  }),
                a &&
                  J &&
                  (0, r.jsx)(C.$n, {
                    size: "sm",
                    variant: "ghost",
                    icon: "download",
                    loading: G,
                    disabled: G,
                    onClick: J,
                    className: "!h-7 !px-2 text-xs text-sky-500 hover:text-sky-400",
                    title: ei,
                    children: ei,
                  }),
                o &&
                  Z &&
                  (0, r.jsx)(C.$n, {
                    size: "sm",
                    variant: "ghost",
                    icon: "install_desktop",
                    loading: W,
                    disabled: W,
                    onClick: Z,
                    className: "!h-7 !px-2 text-xs text-emerald-500 hover:text-emerald-400",
                    title: eo,
                    children: eo,
                  }),
                o &&
                  q &&
                  (0, r.jsx)(C.$n, {
                    size: "sm",
                    variant: "ghost",
                    icon: "download",
                    loading: V,
                    disabled: V,
                    onClick: q,
                    className: "!h-7 !px-2 text-xs text-sky-500 hover:text-sky-400",
                    title: es,
                    children: es,
                  }),
                (0, r.jsx)(C.lM, {
                  size: "sm",
                  checked: e.isActive ?? !0,
                  onChange: g,
                  title: Y((e.isActive ?? !0) ? "disableConnection" : "enableConnection"),
                }),
                (0, r.jsxs)("div", {
                  className: "flex gap-1 ml-1 transition-opacity",
                  children: [
                    I &&
                      (0, r.jsx)("button", {
                        onClick: I,
                        className:
                          "p-2 hover:bg-amber-500/10 rounded text-amber-600 hover:text-amber-500",
                        title: Y("reauthenticateConnection"),
                        children: (0, r.jsx)("span", {
                          className: "material-symbols-outlined text-[18px]",
                          children: "passkey",
                        }),
                      }),
                    (0, r.jsx)("button", {
                      onClick: S,
                      className:
                        "p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded text-text-muted hover:text-primary",
                      title: Y("edit"),
                      children: (0, r.jsx)("span", {
                        className: "material-symbols-outlined text-[18px]",
                        children: "edit",
                      }),
                    }),
                    (0, r.jsx)("button", {
                      onClick: T,
                      className:
                        "p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded text-text-muted hover:text-primary",
                      title: Y("proxyConfig"),
                      children: (0, r.jsx)("span", {
                        className: "material-symbols-outlined text-[18px]",
                        children: "vpn_lock",
                      }),
                    }),
                    (0, r.jsx)("button", {
                      onClick: A,
                      className: "p-2 hover:bg-red-500/10 rounded text-red-500",
                      title: Y("delete"),
                      children: (0, r.jsx)("span", {
                        className: "material-symbols-outlined text-[18px]",
                        children: "delete",
                      }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
      let eS = new Set([
          "azure-openai",
          "azure-ai",
          "bailian-coding-plan",
          "xiaomi-mimo",
          "heroku",
          "databricks",
          "snowflake",
          "searxng-search",
          "petals",
        ]),
        eA = {
          "azure-openai": "https://example-resource.openai.azure.com",
          "azure-ai": "https://example-resource.services.ai.azure.com/openai/v1",
          "bailian-coding-plan": "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1",
          "xiaomi-mimo": "https://token-plan-sgp.xiaomimimo.com/v1",
          "searxng-search": "http://localhost:8888/search",
          petals: "https://chat.petals.dev/api/v1/generate",
        };
      function eI(e) {
        return (e && (0, N.V7)(e) && N.HP[e]) || null;
      }
      function eT(e) {
        return !!(e && (eS.has(e) || (0, N.V7)(e)));
      }
      function eM(e) {
        let t = eI(e);
        return "string" == typeof t?.localDefault && t.localDefault.trim()
          ? t.localDefault
          : (e && eA[e]) || "";
      }
      function eP(e, t) {
        let a = eI(e);
        if (a && t) return t("localProviderBaseUrlHint", { provider: a.name || e, baseUrl: eM(e) });
        switch (e) {
          case "azure-openai":
            return t ? t("azureOpenAiBaseUrlHint") : void 0;
          case "bailian-coding-plan":
            return t ? t("bailianBaseUrlHint") : void 0;
          case "xiaomi-mimo":
            return t ? t("xiaomiMimoBaseUrlHint") : void 0;
          case "heroku":
            return t ? t("herokuBaseUrlHint") : void 0;
          case "databricks":
            return t ? t("databricksBaseUrlHint") : void 0;
          case "snowflake":
            return t ? t("snowflakeBaseUrlHint") : void 0;
          case "searxng-search":
            return t ? t("searxngBaseUrlHint") : void 0;
          default:
            return;
        }
      }
      function eE(e) {
        if ((0, N.V7)(e || "")) return eM(e);
        switch (e) {
          case "azure-openai":
            return "https://my-resource.openai.azure.com";
          case "bailian-coding-plan":
          case "xiaomi-mimo":
            return eM(e);
          case "heroku":
            return "https://us.inference.heroku.com";
          case "databricks":
            return "https://adb-1234567890123456.7.azuredatabricks.net/serving-endpoints";
          case "snowflake":
            return "https://example-account.snowflakecomputing.com";
          case "searxng-search":
            return "http://localhost:8888/search";
          default:
            return "";
        }
      }
      function eO(e) {
        return "glm" === e || "glm-cn" === e || "glmt" === e;
      }
      function e$(e) {
        let t = Array.from(
          new Set(
            e
              .split(",")
              .map((e) => e.trim().toLowerCase())
              .filter(Boolean)
          )
        );
        return t.length > 0 ? t : void 0;
      }
      function eD(e) {
        let t = Array.from(
          new Set(
            e
              .split(",")
              .map((e) => e.trim())
              .filter(Boolean)
          )
        );
        return t.length > 0 ? t : void 0;
      }
      function eL(e) {
        let t = e.trim();
        if (!t) return "";
        try {
          let e = JSON.parse(t);
          if (e && "object" == typeof e) {
            let t = e.apiKey || e.api_key || e.key || e.token;
            if ("string" == typeof t && t.trim()) return t.trim();
            let a = e.data;
            if (a && "object" == typeof a) {
              let e = a.apiKey || a.api_key || a.key;
              if ("string" == typeof e && e.trim()) return e.trim();
            }
          }
        } catch {}
        try {
          let e = new URL(t),
            a =
              e.searchParams.get("apiKey") ||
              e.searchParams.get("api_key") ||
              e.searchParams.get("key") ||
              e.searchParams.get("token");
          if (a?.trim()) return a.trim();
          let r = e.hash.replace(/^#/, "");
          if (r) {
            let e = new URLSearchParams(r),
              t = e.get("apiKey") || e.get("api_key") || e.get("key") || e.get("token");
            if (t?.trim()) return t.trim();
          }
        } catch {}
        return t;
      }
      function eF({
        isOpen: e,
        provider: t,
        providerName: a,
        isCompatible: i,
        isAnthropic: o,
        isCcCompatible: n,
        isCommandCode: d,
        commandCodeAuthState: c,
        onStartCommandCodeAuth: p,
        onSave: m,
        onClose: u,
      }) {
        let x = (0, s.c)("providers"),
          h = eT(t),
          f = eM(t),
          g = "vertex" === t || "vertex-partner" === t,
          b = "bedrock" === t,
          y = g || b,
          v = b ? "eu-west-2" : "us-central1",
          j = eO(t),
          k = "qoder" === t,
          w = "cloudflare-ai" === t,
          S = eI(t),
          A = !!S,
          I = "google-pse-search" === t,
          T = Z(t),
          M = T?.kind === "none",
          P = !!T && "none" !== T.kind,
          E = a || t || "",
          O = (0, N.fR)(t) || !!M,
          $ = c
            ? {
                idle: "Ready",
                starting: "Starting…",
                polling: "Waiting for browser…",
                received: "Browser approved",
                applying: "Applying key…",
                applied: "Connected",
                expired: "Link expired",
                error: "Connection failed",
              }[c.phase]
            : null,
          [D, L] = (0, l.useState)({
            name: "",
            apiKey: "",
            priority: 1,
            baseUrl: f,
            cx: "",
            region: y ? v : "",
            apiRegion: "international",
            validationModelId: "",
            routingTags: "",
            excludedModels: "",
            customUserAgent: "",
            accountId: "",
            consoleApiKey: "",
            ccCompatibleContext1m: !1,
            passthroughModels: !1,
          }),
          [F, U] = (0, l.useState)(!1),
          [_, R] = (0, l.useState)(null),
          [H, z] = (0, l.useState)(!1),
          [B, K] = (0, l.useState)(null),
          [J, G] = (0, l.useState)(!1),
          [W, q] = (0, l.useState)(null),
          V = (0, N.oy)(t),
          [ea, er] = (0, l.useState)("single"),
          [el, ei] = (0, l.useState)(""),
          [eo, es] = (0, l.useState)(!1),
          [en, ed] = (0, l.useState)(null),
          [ec, ep] = (0, l.useState)([]),
          em = k
            ? x("personalAccessTokenLabel")
            : T
              ? X(x, T, O)
              : O
                ? `${x("apiKeyLabel")} (${x("optional").toLowerCase()})`
                : x("apiKeyLabel"),
          eu = g
            ? x("vertexServiceAccountPlaceholder")
            : P
              ? T.placeholder
              : k
                ? x("qoderPatPlaceholder")
                : O
                  ? x("optional")
                  : void 0,
          ex = k
            ? x("qoderPatHint")
            : P
              ? Y(x, T, E, !1)
              : A
                ? x("localProviderApiKeyOptionalHint", { provider: S?.name || a || t || "" })
                : O
                  ? x("apiKeyOptionalHint")
                  : void 0,
          eh = P
            ? Q(
                x,
                "webSessionCredentialValidationFailed",
                "Session credential validation failed. Sign in again, copy a fresh credential, and try again."
              )
            : x("apiKeyValidationFailed"),
          ef = async () => {
            (U(!0), K(null));
            try {
              let e = d ? eL(D.apiKey) : D.apiKey,
                a = await fetch("/api/providers/validate", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    provider: t,
                    apiKey: e,
                    validationModelId: D.validationModelId || void 0,
                    customUserAgent: D.customUserAgent.trim() || void 0,
                    baseUrl: D.baseUrl.trim() || void 0,
                    region: y ? D.region.trim() || v : void 0,
                    cx: D.cx.trim() || void 0,
                  }),
                }),
                r = await a.json();
              R(r.valid ? "success" : "failed");
            } catch {
              R("failed");
            } finally {
              U(!1);
            }
          },
          eg = async (e, t) => {
            if (e)
              try {
                (await navigator.clipboard.writeText(e),
                  q(t),
                  window.setTimeout(() => q(null), 1500));
              } catch {
                K("Copy failed. Select the text and copy it manually.");
              }
          },
          eb = async () => {
            let e = d ? eL(D.apiKey) : D.apiKey;
            if (t && (i || O || e)) {
              (z(!0), K(null));
              try {
                if (I && !D.cx.trim()) return void K(x("searchEngineIdRequired"));
                let a = null;
                if (h) {
                  let e = eK(D.baseUrl, f);
                  if (e.error) return void K(e.error);
                  a = e.value;
                }
                let r = !!(M && !e),
                  l = null;
                if (!r)
                  try {
                    (U(!0), R(null));
                    let a = await fetch("/api/providers/validate", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          provider: t,
                          apiKey: e,
                          validationModelId: D.validationModelId || void 0,
                          customUserAgent: D.customUserAgent.trim() || void 0,
                          baseUrl: D.baseUrl.trim() || void 0,
                          region: y ? D.region.trim() || v : void 0,
                          cx: D.cx.trim() || void 0,
                        }),
                      }),
                      i = await a.json();
                    ((r = !!i.valid) || !i.error || (l = i.error), R(r ? "success" : "failed"));
                  } catch {
                    R("failed");
                  } finally {
                    U(!1);
                  }
                if (!r)
                  if (!O || e) return void K(l || eh);
                  else
                    console.debug("Validation failed but apiKey is optional; proceeding to save.");
                let i = {};
                (D.customUserAgent.trim() && (i.customUserAgent = D.customUserAgent.trim()),
                  D.routingTags.trim() && (i.tags = e$(D.routingTags)),
                  D.excludedModels.trim() && (i.excludedModels = eD(D.excludedModels)),
                  D.passthroughModels && (i.passthroughModels = !0),
                  "bailian-coding-plan" === t &&
                    D.consoleApiKey.trim() &&
                    (i.consoleApiKey = D.consoleApiKey.trim()),
                  I && D.cx.trim() && (i.cx = D.cx.trim()),
                  h
                    ? (i.baseUrl = a)
                    : y
                      ? (i.region = D.region.trim() || v)
                      : j
                        ? (i.apiRegion = D.apiRegion)
                        : w && D.accountId.trim() && (i.accountId = D.accountId.trim()),
                  n && D.ccCompatibleContext1m && (i.requestDefaults = { context1m: !0 }));
                let o = {
                    name: D.name,
                    apiKey: e.trim() || void 0,
                    priority: D.priority,
                    testStatus: "active",
                    providerSpecificData: Object.keys(i).length > 0 ? i : void 0,
                  },
                  s = await m(o);
                s && K("string" == typeof s ? s : x("failedSaveConnection"));
              } finally {
                z(!1);
              }
            }
          },
          ey = async () => {
            if (!t) return;
            let e = (function (e) {
              let t = e.split(/\r?\n/),
                a = [],
                r = [],
                l = 1;
              t.length > 200 &&
                r.push(`Input has ${t.length} lines; only the first 200 will be processed.`);
              let i = Math.min(t.length, 200);
              for (let e = 0; e < i; e++) {
                let i,
                  o,
                  s = t[e].trim();
                if (!s || s.startsWith("#")) continue;
                let n = s.indexOf("|");
                if (-1 === n) ((i = `Key ${l++}`), (o = s));
                else {
                  let e = s.slice(0, n).trim();
                  ((o = s.slice(n + 1).trim()), (i = e || `Key ${l++}`));
                }
                if (!o) {
                  r.push(`Line ${e + 1}: empty apiKey, skipped`);
                  continue;
                }
                a.push({ name: i, apiKey: o, lineNumber: e + 1 });
              }
              return { entries: a, warnings: r };
            })(el);
            if ((ep(e.warnings), 0 !== e.entries.length)) {
              (z(!0), ed(null), K(null));
              try {
                let a = await fetch("/api/providers/bulk", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      provider: t,
                      entries: e.entries.map((e) => ({ name: e.name, apiKey: e.apiKey })),
                      priority: D.priority || 1,
                      validateKeys: eo,
                    }),
                  }),
                  r = await a.json();
                if (!a.ok)
                  return void K("string" == typeof r?.error ? r.error : x("failedSaveConnection"));
                ed({
                  success: r.success || 0,
                  failed: r.failed || 0,
                  total: r.total || 0,
                  errors: Array.isArray(r.errors) ? r.errors : [],
                });
              } catch (e) {
                K(e instanceof Error ? e.message : x("failedSaveConnection"));
              } finally {
                z(!1);
              }
            }
          };
        return t
          ? (0, r.jsx)(C.aF, {
              isOpen: e,
              title: T
                ? "none" === T.kind
                  ? Q(x, "addProviderConnectionTitle", "Add {provider} connection", { provider: E })
                  : "token" === T.kind
                    ? Q(x, "addProviderWebTokenTitle", "Add {provider} web token", { provider: E })
                    : Q(x, "addProviderSessionCookieTitle", "Add {provider} session cookie", {
                        provider: E,
                      })
                : x("addProviderApiKeyTitle", { provider: E }),
              onClose: u,
              children: (0, r.jsxs)("div", {
                className: "flex flex-col gap-4",
                children: [
                  V &&
                    (0, r.jsxs)("div", {
                      className: "flex gap-1 border-b border-border",
                      children: [
                        (0, r.jsx)("button", {
                          type: "button",
                          onClick: () => {
                            (er("single"), ed(null), ep([]));
                          },
                          className: `px-3 py-1.5 text-sm font-medium transition-colors ${"single" === ea ? "border-b-2 border-primary text-text-main" : "text-text-muted hover:text-text-main"}`,
                          children: x("bulkTabSingle"),
                        }),
                        (0, r.jsx)("button", {
                          type: "button",
                          onClick: () => {
                            (er("bulk"), K(null));
                          },
                          className: `px-3 py-1.5 text-sm font-medium transition-colors ${"bulk" === ea ? "border-b-2 border-primary text-text-main" : "text-text-muted hover:text-text-main"}`,
                          children: x("bulkTabBulkAdd"),
                        }),
                      ],
                    }),
                  V &&
                    "bulk" === ea &&
                    (0, r.jsxs)("div", {
                      className: "flex flex-col gap-3",
                      children: [
                        (0, r.jsx)("p", {
                          className: "text-xs text-text-muted",
                          children: x("bulkAddFormatHint"),
                        }),
                        (0, r.jsx)("textarea", {
                          className:
                            "w-full rounded border border-border bg-background p-2 text-sm font-mono resize-y min-h-[140px] focus:outline-none focus:ring-1 focus:ring-primary",
                          placeholder: "name1|sk-key1\nname2|sk-key2\nsk-key-only-auto-named",
                          value: el,
                          onChange: (e) => ei(e.target.value),
                        }),
                        (0, r.jsxs)("div", {
                          className: "flex items-center gap-4 flex-wrap",
                          children: [
                            (0, r.jsxs)("div", {
                              className: "flex items-center gap-2",
                              children: [
                                (0, r.jsx)("label", {
                                  className: "text-sm text-text-muted",
                                  children: x("priorityLabel"),
                                }),
                                (0, r.jsx)("input", {
                                  type: "number",
                                  min: 1,
                                  max: 100,
                                  value: D.priority,
                                  onChange: (e) =>
                                    L({ ...D, priority: Number.parseInt(e.target.value) || 1 }),
                                  className:
                                    "w-20 px-2 py-1 text-sm border border-border rounded bg-background",
                                }),
                              ],
                            }),
                            (0, r.jsxs)("label", {
                              className:
                                "flex items-center gap-2 text-sm text-text-muted cursor-pointer",
                              children: [
                                (0, r.jsx)("input", {
                                  type: "checkbox",
                                  checked: eo,
                                  onChange: (e) => es(e.target.checked),
                                  className: "rounded border-border",
                                }),
                                x("bulkValidateKeys"),
                              ],
                            }),
                          ],
                        }),
                        ec.length > 0 &&
                          (0, r.jsx)("div", {
                            className:
                              "rounded border border-amber-500/25 bg-amber-500/10 p-2 text-xs text-amber-200 space-y-1",
                            children: ec.map((e, t) => (0, r.jsx)("div", { children: e }, t)),
                          }),
                        en &&
                          (0, r.jsxs)("div", {
                            className: `text-sm font-medium ${en.failed > 0 ? "text-amber-300" : "text-emerald-400"}`,
                            children: [
                              x("bulkAddedCount", { count: en.success }),
                              en.failed > 0 &&
                                (0, r.jsxs)(r.Fragment, {
                                  children: [", ", x("bulkFailedCount", { count: en.failed })],
                                }),
                              en.errors.length > 0 &&
                                (0, r.jsxs)("ul", {
                                  className:
                                    "mt-2 list-disc pl-5 text-xs text-text-muted font-normal space-y-0.5",
                                  children: [
                                    en.errors
                                      .slice(0, 10)
                                      .map((e, t) =>
                                        (0, r.jsxs)(
                                          "li",
                                          { children: [e.name, ": ", e.message] },
                                          t
                                        )
                                      ),
                                    en.errors.length > 10 &&
                                      (0, r.jsxs)("li", {
                                        children: ["… ", en.errors.length - 10, " more"],
                                      }),
                                  ],
                                }),
                            ],
                          }),
                        B && (0, r.jsx)("div", { className: "text-sm text-rose-400", children: B }),
                        (0, r.jsxs)("div", {
                          className: "flex gap-2",
                          children: [
                            (0, r.jsx)(C.$n, {
                              onClick: ey,
                              fullWidth: !0,
                              disabled: H || !el.trim(),
                              children: H ? x("adding") : x("bulkAddAllKeys"),
                            }),
                            (0, r.jsx)(C.$n, {
                              onClick: u,
                              variant: "ghost",
                              fullWidth: !0,
                              children: x("cancel"),
                            }),
                          ],
                        }),
                      ],
                    }),
                  (!V || "single" === ea) &&
                    (0, r.jsxs)(r.Fragment, {
                      children: [
                        n &&
                          (0, r.jsx)("div", {
                            className:
                              "rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-sm text-text-muted",
                            children: (0, r.jsxs)("div", {
                              className: "flex items-start gap-2",
                              children: [
                                (0, r.jsx)("span", {
                                  className:
                                    "material-symbols-outlined mt-0.5 text-[18px] text-amber-500",
                                  children: "warning",
                                }),
                                (0, r.jsx)("p", { children: x("ccCompatibleValidationHint") }),
                              ],
                            }),
                          }),
                        d &&
                          p &&
                          (0, r.jsx)("div", {
                            className:
                              "rounded-lg border border-sky-500/20 bg-sky-500/10 px-3 py-3 text-sm",
                            children: (0, r.jsxs)("div", {
                              className: "flex items-start gap-3",
                              children: [
                                (0, r.jsx)("span", {
                                  className:
                                    "material-symbols-outlined mt-0.5 text-[18px] text-sky-500",
                                  children: "open_in_new",
                                }),
                                (0, r.jsxs)("div", {
                                  className: "min-w-0 flex-1",
                                  children: [
                                    (0, r.jsx)("p", {
                                      className: "font-medium text-text-main",
                                      children: x("providerDetailBrowserManualConnect"),
                                    }),
                                    (0, r.jsx)("p", {
                                      className: "mt-1 text-xs text-text-muted",
                                      children:
                                        "Open Command Code Studio, then paste the returned key/JSON/URL into the API key field below.",
                                    }),
                                    c?.message &&
                                      (0, r.jsxs)("p", {
                                        className: "mt-2 text-xs text-text-muted",
                                        children: [$, ": ", c.message],
                                      }),
                                    c?.authUrl &&
                                      (0, r.jsxs)("div", {
                                        className: "mt-3 space-y-2",
                                        children: [
                                          (0, r.jsxs)("div", {
                                            children: [
                                              (0, r.jsx)("p", {
                                                className:
                                                  "mb-1 text-xs font-medium text-text-main",
                                                children: x("providerDetailAuthUrl"),
                                              }),
                                              (0, r.jsxs)("div", {
                                                className: "flex gap-2",
                                                children: [
                                                  (0, r.jsx)(C.pd, {
                                                    value: c.authUrl,
                                                    readOnly: !0,
                                                    className: "flex-1 font-mono text-xs",
                                                  }),
                                                  (0, r.jsx)(C.$n, {
                                                    variant: "ghost",
                                                    size: "sm",
                                                    icon:
                                                      "authUrl" === W ? "check" : "content_copy",
                                                    onClick: () => eg(c.authUrl, "authUrl"),
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                          c.callbackUrl &&
                                            (0, r.jsxs)("div", {
                                              children: [
                                                (0, r.jsx)("p", {
                                                  className:
                                                    "mb-1 text-xs font-medium text-text-main",
                                                  children: x("providerDetailCallbackUrl"),
                                                }),
                                                (0, r.jsxs)("div", {
                                                  className: "flex gap-2",
                                                  children: [
                                                    (0, r.jsx)(C.pd, {
                                                      value: c.callbackUrl,
                                                      readOnly: !0,
                                                      className: "flex-1 font-mono text-xs",
                                                    }),
                                                    (0, r.jsx)(C.$n, {
                                                      variant: "ghost",
                                                      size: "sm",
                                                      icon:
                                                        "callbackUrl" === W
                                                          ? "check"
                                                          : "content_copy",
                                                      onClick: () =>
                                                        eg(c.callbackUrl, "callbackUrl"),
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                        ],
                                      }),
                                  ],
                                }),
                                (0, r.jsx)(C.$n, {
                                  variant: "secondary",
                                  size: "sm",
                                  icon: "open_in_new",
                                  loading:
                                    c?.phase === "starting" ||
                                    c?.phase === "polling" ||
                                    c?.phase === "applying",
                                  onClick: p,
                                  children: "Connect in browser",
                                }),
                              ],
                            }),
                          }),
                        (0, r.jsx)(C.pd, {
                          label: x("nameLabel"),
                          value: D.name,
                          onChange: (e) => L({ ...D, name: e.target.value }),
                          placeholder: k ? x("personalAccessTokenLabel") : x("productionKey"),
                        }),
                        T && (0, r.jsx)(et, { requirement: T, providerName: E, t: x }),
                        !M &&
                          (0, r.jsxs)("div", {
                            className: "flex gap-2",
                            children: [
                              (0, r.jsx)(C.pd, {
                                label: em,
                                type: "password",
                                value: D.apiKey,
                                onChange: (e) => L({ ...D, apiKey: e.target.value }),
                                className: "flex-1",
                                placeholder: eu,
                                hint: ex,
                                autoComplete: "off",
                                spellCheck: !1,
                                autoCapitalize: "off",
                              }),
                              (0, r.jsx)("div", {
                                className: "pt-6",
                                children: (0, r.jsx)(C.$n, {
                                  onClick: ef,
                                  disabled:
                                    (!i && !O && !D.apiKey) || (I && !D.cx.trim()) || F || H,
                                  variant: "secondary",
                                  children: F ? x("checking") : T ? ee(x, T) : x("check"),
                                }),
                              }),
                            ],
                          }),
                        I &&
                          (0, r.jsx)(C.pd, {
                            label: x("searchEngineIdLabel"),
                            value: D.cx,
                            onChange: (e) => L({ ...D, cx: e.target.value }),
                            placeholder: "012345678901234567890:abc123xyz",
                            hint: x("searchEngineIdHint"),
                          }),
                        _ &&
                          (0, r.jsx)(C.Ex, {
                            variant: "success" === _ ? "success" : "error",
                            children: "success" === _ ? x("valid") : x("invalid"),
                          }),
                        B &&
                          (0, r.jsx)("div", {
                            className:
                              "text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2",
                            children: B,
                          }),
                        n &&
                          (0, r.jsx)("div", {
                            className:
                              "flex flex-col gap-4 rounded-lg border border-border/50 bg-surface/20 p-4",
                            children: (0, r.jsx)(C.lM, {
                              checked: D.ccCompatibleContext1m,
                              onChange: (e) => L({ ...D, ccCompatibleContext1m: e }),
                              label: x("ccCompatibleContext1mLabel"),
                              description: x("ccCompatibleContext1mDescription"),
                            }),
                          }),
                        i &&
                          !n &&
                          (0, r.jsx)("p", {
                            className: "text-xs text-text-muted",
                            children: o
                              ? x("validationChecksAnthropicCompatible", {
                                  provider: a || x("anthropicCompatibleName"),
                                })
                              : x("validationChecksOpenAiCompatible", {
                                  provider: a || x("openaiCompatibleName"),
                                }),
                          }),
                        (0, r.jsxs)("button", {
                          type: "button",
                          className:
                            "text-sm text-text-muted hover:text-text-primary flex items-center gap-1",
                          onClick: () => G(!J),
                          "aria-expanded": J,
                          "aria-controls": "add-api-key-advanced-settings",
                          children: [
                            (0, r.jsx)("span", {
                              className: `transition-transform ${J ? "rotate-90" : ""}`,
                              "aria-hidden": "true",
                              children: "▶",
                            }),
                            x("advancedSettings"),
                          ],
                        }),
                        J &&
                          (0, r.jsxs)("div", {
                            id: "add-api-key-advanced-settings",
                            className: "flex flex-col gap-3 pl-2 border-l-2 border-border",
                            children: [
                              (0, r.jsx)(C.pd, {
                                label: x("customUserAgentLabel"),
                                value: D.customUserAgent,
                                onChange: (e) => L({ ...D, customUserAgent: e.target.value }),
                                placeholder: "my-app/1.0",
                                hint: x("customUserAgentHint"),
                              }),
                              (0, r.jsx)(C.pd, {
                                label: x("routingTagsLabel"),
                                value: D.routingTags,
                                onChange: (e) => L({ ...D, routingTags: e.target.value }),
                                placeholder: x("routingTagsPlaceholder"),
                                hint: x("routingTagsHint"),
                              }),
                              (0, r.jsx)(C.pd, {
                                label: x("excludedModelsLabel"),
                                value: D.excludedModels,
                                onChange: (e) => L({ ...D, excludedModels: e.target.value }),
                                placeholder: x("excludedModelsPlaceholder"),
                                hint: x("excludedModelsHint"),
                              }),
                              (0, r.jsx)(C.lM, {
                                size: "sm",
                                checked: D.passthroughModels,
                                onChange: (e) => L({ ...D, passthroughModels: e }),
                                label: x("perModelQuotaLabel"),
                                description: x("perModelQuotaDescription"),
                              }),
                              "bailian-coding-plan" === t &&
                                (0, r.jsx)(C.pd, {
                                  label: x("consoleApiKeyOracleLabel"),
                                  value: D.consoleApiKey,
                                  onChange: (e) => L({ ...D, consoleApiKey: e.target.value }),
                                  placeholder: x("consoleApiKeyOraclePlaceholder"),
                                  hint: x("consoleApiKeyOracleHint"),
                                  type: "password",
                                }),
                            ],
                          }),
                        (0, r.jsx)(C.pd, {
                          label: x("validationModelIdLabel"),
                          placeholder: x("validationModelIdPlaceholder"),
                          value: D.validationModelId,
                          onChange: (e) => L({ ...D, validationModelId: e.target.value }),
                          hint: x("validationModelIdHint"),
                        }),
                        (0, r.jsx)(C.pd, {
                          label: x("priorityLabel"),
                          type: "number",
                          value: D.priority,
                          onChange: (e) =>
                            L({ ...D, priority: Number.parseInt(e.target.value) || 1 }),
                        }),
                        h &&
                          (0, r.jsx)(C.pd, {
                            label: x("baseUrlLabel"),
                            value: D.baseUrl,
                            onChange: (e) => L({ ...D, baseUrl: e.target.value }),
                            placeholder: eE(t),
                            hint: eP(t, x),
                          }),
                        y &&
                          (0, r.jsx)(C.pd, {
                            label: x("regionLabel"),
                            value: D.region,
                            onChange: (e) => L({ ...D, region: e.target.value }),
                            placeholder: v,
                            hint: x("regionHint"),
                          }),
                        w &&
                          (0, r.jsx)(C.pd, {
                            label: x("accountIdLabel"),
                            value: D.accountId,
                            onChange: (e) => L({ ...D, accountId: e.target.value }),
                            placeholder: x("accountIdPlaceholder"),
                            hint: x("accountIdHint"),
                          }),
                        j &&
                          (0, r.jsxs)("div", {
                            children: [
                              (0, r.jsx)("label", {
                                className: "text-sm font-medium text-text-main mb-1 block",
                                children: x("apiRegionLabel"),
                              }),
                              (0, r.jsxs)("select", {
                                value: D.apiRegion,
                                onChange: (e) => L({ ...D, apiRegion: e.target.value }),
                                className:
                                  "w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary",
                                children: [
                                  (0, r.jsx)("option", {
                                    value: "international",
                                    children: x("apiRegionInternational"),
                                  }),
                                  (0, r.jsx)("option", {
                                    value: "china",
                                    children: x("apiRegionChina"),
                                  }),
                                ],
                              }),
                              (0, r.jsx)("p", {
                                className: "text-xs text-text-muted mt-1",
                                children: x("apiRegionHint"),
                              }),
                            ],
                          }),
                        (0, r.jsxs)("div", {
                          className: "flex gap-2",
                          children: [
                            (0, r.jsx)(C.$n, {
                              onClick: eb,
                              fullWidth: !0,
                              disabled:
                                !D.name ||
                                (!i && !O && !D.apiKey) ||
                                (I && !D.cx.trim()) ||
                                H ||
                                (h && !D.baseUrl.trim() && !f),
                              children: H ? x("saving") : x("save"),
                            }),
                            (0, r.jsx)(C.$n, {
                              onClick: u,
                              variant: "ghost",
                              fullWidth: !0,
                              children: x("cancel"),
                            }),
                          ],
                        }),
                      ],
                    }),
                ],
              }),
            })
          : null;
      }
      function eU(e) {
        try {
          let t = e && "object" == typeof e ? e : null;
          if (!t || (void 0 !== t.auth_mode && null !== t.auth_mode && "chatgpt" !== t.auth_mode))
            return { valid: !1, email: null };
          let a = t.tokens && "object" == typeof t.tokens ? t.tokens : null;
          if (!a?.id_token || "string" != typeof a.id_token) return { valid: !1, email: null };
          return {
            valid: !0,
            email: (function (e) {
              try {
                let t = e.split(".");
                if (3 !== t.length) return null;
                let a = JSON.parse(W.from(t[1], "base64url").toString("utf8"));
                return "string" == typeof a.email ? a.email : null;
              } catch {
                return null;
              }
            })(a.id_token),
          };
        } catch {
          return { valid: !1, email: null };
        }
      }
      function e_({ onClose: e, onSuccess: t }) {
        let a = (0, s.c)("providers"),
          i = (0, y.i)(),
          [o, n] = (0, l.useState)("single"),
          [d, c] = (0, l.useState)("upload"),
          [p, m] = (0, l.useState)(null),
          [u, x] = (0, l.useState)(null),
          [h, f] = (0, l.useState)(null),
          [g, b] = (0, l.useState)(""),
          [v, j] = (0, l.useState)(""),
          [k, N] = (0, l.useState)(""),
          [w, S] = (0, l.useState)(!1),
          [A, I] = (0, l.useState)(!1),
          [T, M] = (0, l.useState)(null),
          [P, E] = (0, l.useState)("upload"),
          [O, $] = (0, l.useState)([]),
          [D, L] = (0, l.useState)(""),
          [F, U] = (0, l.useState)(!1),
          [_, R] = (0, l.useState)(null),
          [H, z] = (0, l.useState)(!1),
          [B, K] = (0, l.useState)(!1),
          [J, G] = (0, l.useState)(null);
        function Z(e) {
          (x(null), f(null), m(null));
          let { valid: t, email: r } = eU(e);
          t
            ? (f(r), r && !k && N(r), m(e))
            : x(a("codexImportInvalidShape") || "Not a valid Codex auth.json");
        }
        async function W() {
          if (p) {
            (I(!0), M(null));
            try {
              let e = await fetch("/api/providers/codex-auth/import", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    source: { kind: "json", json: p },
                    name: v.trim() || void 0,
                    email: k.trim() || void 0,
                    overwriteExisting: w,
                  }),
                }),
                r = await e.json().catch(() => ({}));
              if (!e.ok)
                return void M(
                  "duplicate_account" === r.code
                    ? a("codexImportDuplicate") ||
                        "Account already exists — enable Replace existing to overwrite"
                    : r.error || a("codexImportFailed") || "Failed to import"
                );
              (i.success(a("codexImportSuccess") || "Codex connection imported successfully"), t());
            } catch {
              M(a("codexImportFailed") || "Failed to import Codex auth");
            } finally {
              I(!1);
            }
          }
        }
        async function q(e) {
          let t = e.target.files?.[0];
          if (t) {
            (U(!0), R(null), $([]));
            try {
              let e = await fetch("/api/providers/codex-auth/zip-extract", {
                  method: "POST",
                  headers: { "Content-Type": "application/octet-stream" },
                  body: t,
                }),
                r = await e.json().catch(() => ({}));
              if (!e.ok)
                return void R(r.error || a("codexImportBulkZipError") || "Failed to extract ZIP");
              let l = (r.entries || []).map((e) => {
                if (e.parseError)
                  return { name: e.name, json: null, parseError: e.parseError, email: null };
                let { email: t } = eU(e.json);
                return {
                  name: t || e.name.replace(".json", ""),
                  json: e.json,
                  parseError: null,
                  email: t,
                };
              });
              $(l);
            } catch {
              R(a("codexImportBulkZipError") || "Failed to extract ZIP");
            } finally {
              U(!1);
            }
          }
        }
        async function V() {
          let e = O.filter((e) => !e.parseError && null !== e.json);
          if (0 !== e.length) {
            (K(!0), G(null));
            try {
              let r = await fetch("/api/providers/codex-auth/import-bulk", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    entries: e.map((e) => ({
                      json: e.json,
                      name: e.name || void 0,
                      email: e.email || void 0,
                    })),
                    overwriteExisting: H,
                  }),
                }),
                l = await r.json().catch(() => ({}));
              if (!r.ok)
                return void i.error(l.error || a("codexImportFailed") || "Failed to import");
              (G({ success: l.success, failed: l.failed, errors: l.errors || [] }),
                l.success > 0 && t());
            } catch {
              i.error(a("codexImportFailed") || "Failed to import Codex auth");
            } finally {
              K(!1);
            }
          }
        }
        let Q = !!p && !u && !A,
          X = O.filter((e) => !e.parseError && null !== e.json).length,
          Y = X > 0 && !B && !F,
          ee = [
            { id: "single", label: a("codexImportTabSingle") || "Single" },
            { id: "bulk", label: a("codexImportTabBulk") || "Bulk" },
          ],
          et = [
            { id: "upload", label: a("codexImportBulkModeUpload") || "Upload files" },
            { id: "paste", label: a("codexImportBulkModePaste") || "Paste list" },
            { id: "zip", label: a("codexImportBulkModeZip") || "ZIP archive" },
          ];
        return (0, r.jsx)(C.aF, {
          isOpen: !0,
          onClose: e,
          title: a("codexImportModalTitle") || "Import Codex Auth",
          maxWidth: "max-w-lg",
          children: (0, r.jsxs)("div", {
            className: "flex flex-col gap-4",
            children: [
              (0, r.jsx)("div", {
                className: "flex border-b border-border",
                children: ee.map(({ id: e, label: t }) =>
                  (0, r.jsx)(
                    "button",
                    {
                      onClick: () => {
                        (n(e), G(null), M(null));
                      },
                      className: `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${o === e ? "border-primary text-primary" : "border-transparent text-text-muted hover:text-text-main"}`,
                      children: t,
                    },
                    e
                  )
                ),
              }),
              "single" === o &&
                (0, r.jsxs)(r.Fragment, {
                  children: [
                    (0, r.jsx)("div", {
                      className: "flex border-b border-border",
                      children: ["upload", "paste"].map((e) =>
                        (0, r.jsx)(
                          "button",
                          {
                            onClick: () => {
                              (c(e), m(null), x(null), f(null));
                            },
                            className: `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${d === e ? "border-primary text-primary" : "border-transparent text-text-muted hover:text-text-main"}`,
                            children:
                              "upload" === e
                                ? a("codexImportTabUpload") || "Upload file"
                                : a("codexImportTabPaste") || "Paste JSON",
                          },
                          e
                        )
                      ),
                    }),
                    "upload" === d &&
                      (0, r.jsxs)("div", {
                        className: "flex flex-col gap-2",
                        children: [
                          (0, r.jsx)("label", {
                            className: "text-sm font-medium text-text-main",
                            children: a("codexImportFileLabel") || "Choose auth.json",
                          }),
                          (0, r.jsx)("input", {
                            type: "file",
                            accept: ".json",
                            onChange: function (e) {
                              let t = e.target.files?.[0];
                              if (!t) return;
                              let r = new FileReader();
                              ((r.onload = (e) => {
                                try {
                                  Z(JSON.parse(e.target?.result));
                                } catch {
                                  x(a("codexImportInvalidJson") || "Could not parse JSON");
                                }
                              }),
                                r.readAsText(t));
                            },
                            className:
                              "text-sm text-text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-border file:text-xs file:bg-bg-subtle file:text-text-main hover:file:bg-bg-hover cursor-pointer",
                          }),
                          (0, r.jsx)("p", {
                            className: "text-xs text-text-muted",
                            children:
                              a("codexImportFileHint") ||
                              "Select the auth.json file exported from Codex or OmniRoute.",
                          }),
                        ],
                      }),
                    "paste" === d &&
                      (0, r.jsxs)("div", {
                        className: "flex flex-col gap-2",
                        children: [
                          (0, r.jsx)("label", {
                            className: "text-sm font-medium text-text-main",
                            children: a("codexImportPasteLabel") || "Paste the JSON content",
                          }),
                          (0, r.jsx)("textarea", {
                            value: g,
                            onChange: (e) =>
                              (function (e) {
                                if ((b(e), !e.trim())) {
                                  (m(null), x(null), f(null));
                                  return;
                                }
                                try {
                                  Z(JSON.parse(e));
                                } catch {
                                  (x(a("codexImportInvalidJson") || "Could not parse JSON"),
                                    m(null));
                                }
                              })(e.target.value),
                            rows: 7,
                            placeholder: '{ "auth_mode": "chatgpt", ... }',
                            className:
                              "w-full rounded-lg border border-border bg-bg-subtle px-3 py-2 text-xs font-mono text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none",
                          }),
                        ],
                      }),
                    u && (0, r.jsx)("p", { className: "text-sm text-red-500", children: u }),
                    h &&
                      !u &&
                      (0, r.jsx)("p", {
                        className: "text-xs text-text-muted",
                        children: a("codexImportDetectedEmail", { email: h }) || `Detected: ${h}`,
                      }),
                    (0, r.jsxs)("div", {
                      className: "flex flex-col gap-3",
                      children: [
                        (0, r.jsxs)("div", {
                          className: "flex flex-col gap-1",
                          children: [
                            (0, r.jsx)("label", {
                              className: "text-sm font-medium text-text-main",
                              children: a("codexImportEmailLabel") || "Account email",
                            }),
                            (0, r.jsx)("input", {
                              type: "email",
                              value: k,
                              onChange: (e) => N(e.target.value),
                              placeholder: "user@example.com",
                              className:
                                "rounded-lg border border-border bg-bg-subtle px-3 py-2 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40",
                            }),
                            (0, r.jsx)("p", {
                              className: "text-xs text-text-muted",
                              children:
                                a("codexImportEmailHint") ||
                                "Auto-detected from the file; edit if needed.",
                            }),
                          ],
                        }),
                        (0, r.jsxs)("div", {
                          className: "flex flex-col gap-1",
                          children: [
                            (0, r.jsx)("label", {
                              className: "text-sm font-medium text-text-main",
                              children: a("codexImportNameLabel") || "Connection name (optional)",
                            }),
                            (0, r.jsx)("input", {
                              type: "text",
                              value: v,
                              onChange: (e) => j(e.target.value),
                              placeholder: k || "Codex (imported)",
                              className:
                                "rounded-lg border border-border bg-bg-subtle px-3 py-2 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40",
                            }),
                          ],
                        }),
                        (0, r.jsxs)("label", {
                          className: "flex items-center gap-2 cursor-pointer",
                          children: [
                            (0, r.jsx)("input", {
                              type: "checkbox",
                              checked: w,
                              onChange: (e) => S(e.target.checked),
                              className: "rounded border-border",
                            }),
                            (0, r.jsx)("span", {
                              className: "text-sm text-text-main",
                              children:
                                a("codexImportOverwriteLabel") ||
                                "Replace existing connection if account already exists",
                            }),
                          ],
                        }),
                      ],
                    }),
                    T &&
                      (0, r.jsx)("div", {
                        className:
                          "rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400",
                        children: T,
                      }),
                    (0, r.jsxs)("div", {
                      className: "flex gap-2 pt-1",
                      children: [
                        (0, r.jsx)(C.$n, {
                          onClick: W,
                          disabled: !Q,
                          loading: A,
                          fullWidth: !0,
                          children: a("codexImportSubmit") || "Import",
                        }),
                        (0, r.jsx)(C.$n, {
                          onClick: e,
                          variant: "ghost",
                          fullWidth: !0,
                          children: a("cancel"),
                        }),
                      ],
                    }),
                  ],
                }),
              "bulk" === o &&
                (0, r.jsxs)(r.Fragment, {
                  children: [
                    (0, r.jsx)("div", {
                      className: "flex gap-1 p-1 bg-bg-subtle rounded-lg",
                      children: et.map(({ id: e, label: t }) =>
                        (0, r.jsx)(
                          "button",
                          {
                            onClick: () => {
                              (E(e), $([]), R(null), L(""), G(null));
                            },
                            className: `flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${P === e ? "bg-bg-primary text-text-main shadow-sm" : "text-text-muted hover:text-text-main"}`,
                            children: t,
                          },
                          e
                        )
                      ),
                    }),
                    "upload" === P &&
                      (0, r.jsxs)("div", {
                        className: "flex flex-col gap-2",
                        children: [
                          (0, r.jsx)("input", {
                            type: "file",
                            accept: ".json",
                            multiple: !0,
                            onChange: function (e) {
                              let t = Array.from(e.target.files || []),
                                a = [],
                                r = t.length;
                              0 !== r &&
                                t.forEach((e) => {
                                  let t = new FileReader();
                                  ((t.onload = (t) => {
                                    try {
                                      let r = JSON.parse(t.target?.result),
                                        { email: l } = eU(r);
                                      a.push({
                                        name: l || e.name.replace(".json", ""),
                                        json: r,
                                        parseError: null,
                                        email: l,
                                      });
                                    } catch {
                                      a.push({
                                        name: e.name,
                                        json: null,
                                        parseError: "Invalid JSON",
                                        email: null,
                                      });
                                    }
                                    0 == --r && $([...a]);
                                  }),
                                    t.readAsText(e));
                                });
                            },
                            className:
                              "text-sm text-text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-border file:text-xs file:bg-bg-subtle file:text-text-main hover:file:bg-bg-hover cursor-pointer",
                          }),
                          (0, r.jsx)("p", {
                            className: "text-xs text-text-muted",
                            children:
                              a("codexImportBulkUploadHint") || "Select multiple .json files",
                          }),
                        ],
                      }),
                    "paste" === P &&
                      (0, r.jsxs)("div", {
                        className: "flex flex-col gap-2",
                        children: [
                          (0, r.jsx)("textarea", {
                            value: D,
                            onChange: (e) => {
                              var t;
                              (L((t = e.target.value)), t.trim())
                                ? $(
                                    (function (e) {
                                      let t = e.trim();
                                      if (!t) return [];
                                      try {
                                        let e = JSON.parse(t);
                                        if (Array.isArray(e))
                                          return e.map((e) => {
                                            let { email: t } = eU(e);
                                            return {
                                              name: t || "unknown",
                                              json: e,
                                              parseError: null,
                                              email: t,
                                            };
                                          });
                                        let { email: a } = eU(e);
                                        return [
                                          {
                                            name: a || "unknown",
                                            json: e,
                                            parseError: null,
                                            email: a,
                                          },
                                        ];
                                      } catch {
                                        return t
                                          .split(/^---$/m)
                                          .map((e) =>
                                            ((e) => {
                                              try {
                                                let t = JSON.parse(e),
                                                  { email: a } = eU(t);
                                                return {
                                                  name: a || "unknown",
                                                  json: t,
                                                  parseError: null,
                                                  email: a,
                                                };
                                              } catch {
                                                return {
                                                  name: "parse error",
                                                  json: null,
                                                  parseError: "Invalid JSON",
                                                  email: null,
                                                };
                                              }
                                            })(e.trim())
                                          )
                                          .filter((e) => null !== e.json || null !== e.parseError);
                                      }
                                    })(t)
                                  )
                                : $([]);
                            },
                            rows: 7,
                            placeholder: '[{ "auth_mode": "chatgpt", ... }, ...]',
                            className:
                              "w-full rounded-lg border border-border bg-bg-subtle px-3 py-2 text-xs font-mono text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none",
                          }),
                          (0, r.jsx)("p", {
                            className: "text-xs text-text-muted",
                            children:
                              a("codexImportBulkPasteHint") ||
                              "JSON array or multiple JSONs separated by ---",
                          }),
                        ],
                      }),
                    "zip" === P &&
                      (0, r.jsxs)("div", {
                        className: "flex flex-col gap-2",
                        children: [
                          (0, r.jsx)("input", {
                            type: "file",
                            accept: ".zip",
                            onChange: q,
                            disabled: F,
                            className:
                              "text-sm text-text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-border file:text-xs file:bg-bg-subtle file:text-text-main hover:file:bg-bg-hover cursor-pointer disabled:opacity-50",
                          }),
                          F &&
                            (0, r.jsx)("p", {
                              className: "text-xs text-text-muted animate-pulse",
                              children: a("codexImportBulkZipExtracting") || "Extracting ZIP…",
                            }),
                          _ && (0, r.jsx)("p", { className: "text-sm text-red-500", children: _ }),
                          (0, r.jsx)("p", {
                            className: "text-xs text-text-muted",
                            children:
                              a("codexImportBulkZipHint") ||
                              "Upload a .zip containing auth.json files (max 50 files, 10 MB)",
                          }),
                        ],
                      }),
                    O.length > 0 &&
                      !J &&
                      (0, r.jsxs)("div", {
                        className:
                          "flex flex-col gap-1 max-h-40 overflow-y-auto rounded-lg border border-border bg-bg-subtle p-2",
                        children: [
                          (0, r.jsxs)("p", {
                            className: "text-xs font-medium text-text-muted px-1",
                            children: [X, " / ", O.length, " valid"],
                          }),
                          O.map((e, t) =>
                            (0, r.jsxs)(
                              "div",
                              {
                                className: "flex items-center gap-2 px-2 py-1 rounded",
                                children: [
                                  (0, r.jsx)("span", {
                                    className: `material-symbols-outlined text-[14px] ${e.parseError ? "text-red-500" : "text-emerald-500"}`,
                                    children: e.parseError ? "error" : "check_circle",
                                  }),
                                  (0, r.jsx)("span", {
                                    className: "text-xs text-text-main flex-1 truncate",
                                    children: e.name,
                                  }),
                                  e.parseError &&
                                    (0, r.jsx)("span", {
                                      className: "text-xs text-red-400",
                                      children: e.parseError,
                                    }),
                                ],
                              },
                              t
                            )
                          ),
                        ],
                      }),
                    (0, r.jsxs)("label", {
                      className: "flex items-center gap-2 cursor-pointer",
                      children: [
                        (0, r.jsx)("input", {
                          type: "checkbox",
                          checked: H,
                          onChange: (e) => z(e.target.checked),
                          className: "rounded border-border",
                        }),
                        (0, r.jsx)("span", {
                          className: "text-sm text-text-main",
                          children:
                            a("codexImportOverwriteLabel") ||
                            "Replace existing connections if accounts already exist",
                        }),
                      ],
                    }),
                    J &&
                      (0, r.jsxs)("div", {
                        className: `rounded-lg border px-4 py-3 text-sm ${0 === J.failed ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-amber-500/10 border-amber-500/20 text-amber-400"}`,
                        children: [
                          (0, r.jsxs)("p", {
                            className: "font-medium",
                            children: [
                              J.success,
                              " ",
                              a("codexImportBulkSuccess", { count: J.success }) || "imported",
                              " \xb7",
                              " ",
                              J.failed,
                              " ",
                              a("codexImportBulkFailed", { count: J.failed }) || "failed",
                            ],
                          }),
                          J.errors.length > 0 &&
                            (0, r.jsx)("ul", {
                              className: "mt-2 space-y-0.5 text-xs",
                              children: J.errors.map((e, t) =>
                                (0, r.jsxs)(
                                  "li",
                                  {
                                    children: [
                                      (0, r.jsxs)("span", {
                                        className: "font-medium",
                                        children: [e.name, ":"],
                                      }),
                                      " ",
                                      e.message,
                                    ],
                                  },
                                  t
                                )
                              ),
                            }),
                        ],
                      }),
                    (0, r.jsxs)("div", {
                      className: "flex gap-2 pt-1",
                      children: [
                        (0, r.jsx)(C.$n, {
                          onClick: V,
                          disabled: !Y,
                          loading: B,
                          fullWidth: !0,
                          children: B
                            ? a("saving") || "Importing…"
                            : "function" == typeof a.has && a.has("codexImportBulkSubmit")
                              ? a("codexImportBulkSubmit", { count: X })
                              : `Import ${X} accounts`,
                        }),
                        (0, r.jsx)(C.$n, {
                          onClick: e,
                          variant: "ghost",
                          fullWidth: !0,
                          children: a("cancel"),
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
        });
      }
      function eR({ connectionId: e, inProgress: t, onConfirm: a, onClose: i }) {
        let o = (0, s.c)("providers"),
          [n, d] = (0, l.useState)(!1);
        if (!e) return null;
        let c =
            "function" == typeof o.has && o.has("codexApplyModalTitle")
              ? o("codexApplyModalTitle")
              : "Apply to Local Codex",
          p =
            "function" == typeof o.has && o.has("codexApplyTargetLabel")
              ? o("codexApplyTargetLabel")
              : "Target path",
          m =
            "function" == typeof o.has && o.has("codexApplyBackupLabel")
              ? o("codexApplyBackupLabel")
              : "Backups",
          u =
            "function" == typeof o.has && o.has("codexApplyWarning")
              ? o("codexApplyWarning")
              : "This will replace the existing auth.json. Continue?",
          x =
            "function" == typeof o.has && o.has("codexApplyConfirmCheckbox")
              ? o("codexApplyConfirmCheckbox")
              : "I confirm I want to replace the existing auth.json",
          h = "function" == typeof o.has && o.has("codexApply") ? o("codexApply") : "Apply";
        return (0, r.jsx)(C.aF, {
          isOpen: !!e,
          title: c,
          onClose: i,
          children: (0, r.jsxs)("div", {
            className: "flex flex-col gap-4",
            children: [
              (0, r.jsxs)("div", {
                children: [
                  (0, r.jsx)("div", {
                    className: "text-xs uppercase text-text-muted mb-1",
                    children: p,
                  }),
                  (0, r.jsx)("code", {
                    className:
                      "block rounded bg-sidebar px-2 py-1.5 text-xs font-mono text-text-main",
                    children: "~/.codex/auth.json",
                  }),
                  (0, r.jsx)("p", {
                    className: "mt-1 text-xs text-text-muted",
                    children: o("providerDetailPathAutoDetectedAllOs"),
                  }),
                ],
              }),
              (0, r.jsxs)("div", {
                children: [
                  (0, r.jsx)("div", {
                    className: "text-xs uppercase text-text-muted mb-1",
                    children: m,
                  }),
                  (0, r.jsxs)("ul", {
                    className: "text-xs text-text-muted space-y-0.5 list-disc pl-4",
                    children: [
                      (0, r.jsxs)("li", {
                        children: [
                          (0, r.jsx)("code", {
                            className: "text-text-main",
                            children: "~/.codex/auth-<timestamp>.bak",
                          }),
                          " — quick local rollback",
                        ],
                      }),
                      (0, r.jsx)("li", { children: "Centralized backup history (audit trail)" }),
                    ],
                  }),
                ],
              }),
              (0, r.jsx)("div", {
                className:
                  "rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-sm text-amber-200",
                children: (0, r.jsxs)("div", {
                  className: "flex items-start gap-2",
                  children: [
                    (0, r.jsx)("span", {
                      className: "material-symbols-outlined mt-0.5 text-[18px] text-amber-500",
                      children: "warning",
                    }),
                    (0, r.jsx)("span", { children: u }),
                  ],
                }),
              }),
              (0, r.jsxs)("label", {
                className: "flex items-center gap-2 text-sm text-text-muted cursor-pointer",
                children: [
                  (0, r.jsx)("input", {
                    type: "checkbox",
                    checked: n,
                    onChange: (e) => d(e.target.checked),
                    className: "rounded border-border",
                  }),
                  x,
                ],
              }),
              (0, r.jsxs)("div", {
                className: "flex gap-2",
                children: [
                  (0, r.jsx)(C.$n, {
                    onClick: () => void a(e),
                    fullWidth: !0,
                    disabled: !n || t,
                    children: t ? o("saving") : h,
                  }),
                  (0, r.jsx)(C.$n, {
                    onClick: i,
                    variant: "ghost",
                    fullWidth: !0,
                    disabled: t,
                    children: o("cancel"),
                  }),
                ],
              }),
            ],
          }),
        });
      }
      function eH(e) {
        try {
          let t = e && "object" == typeof e ? e : null;
          if (!t) return { valid: !1, email: null };
          let a = t.claudeAiOauth && "object" == typeof t.claudeAiOauth ? t.claudeAiOauth : null;
          if (!a || !a.accessToken || !a.refreshToken) return { valid: !1, email: null };
          return { valid: !0, email: null };
        } catch {
          return { valid: !1, email: null };
        }
      }
      function ez({ onClose: e, onSuccess: t }) {
        let a = (0, s.c)("providers"),
          i = (0, y.i)(),
          [o, n] = (0, l.useState)("single"),
          [d, c] = (0, l.useState)("upload"),
          [p, m] = (0, l.useState)("upload"),
          [u, x] = (0, l.useState)(null),
          [h, f] = (0, l.useState)(""),
          [g, b] = (0, l.useState)(""),
          [v, j] = (0, l.useState)(""),
          [k, N] = (0, l.useState)(!1),
          [w, S] = (0, l.useState)(!1),
          [A, I] = (0, l.useState)([]),
          [T, M] = (0, l.useState)(""),
          [P, E] = (0, l.useState)(!1),
          [O, $] = (0, l.useState)([]),
          [D, L] = (0, l.useState)(null),
          [F, U] = (0, l.useState)(!1),
          _ = async () => {
            if (!w) {
              S(!0);
              try {
                let e;
                if ("upload" === d) e = u;
                else
                  try {
                    e = JSON.parse(h);
                  } catch {
                    i.error(
                      "function" == typeof a.has && a.has("claudeImportInvalidJson")
                        ? a("claudeImportInvalidJson")
                        : "Could not parse the pasted content as JSON"
                    );
                    return;
                  }
                let r =
                    "paste" === d
                      ? {
                          source: { kind: "text", text: h },
                          name: g || void 0,
                          email: v || void 0,
                          overwriteExisting: k,
                        }
                      : {
                          source: { kind: "json", json: e },
                          name: g || void 0,
                          email: v || void 0,
                          overwriteExisting: k,
                        },
                  l = await fetch("/api/providers/claude-auth/import", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(r),
                  }),
                  o = await l.json().catch(() => ({}));
                if (!l.ok)
                  return void ("duplicate_account" === o.code
                    ? i.error(
                        "function" == typeof a.has && a.has("claudeImportDuplicate")
                          ? a("claudeImportDuplicate")
                          : 'Account already exists — enable "Replace existing" to overwrite'
                      )
                    : "identity_unverified" === o.code
                      ? i.error(
                          "function" == typeof a.has && a.has("claudeImportIdentityUnverified")
                            ? a("claudeImportIdentityUnverified")
                            : 'Bootstrap could not verify the account. Enable "Replace existing" or provide an email.'
                        )
                      : i.error(
                          o.error ||
                            ("function" == typeof a.has && a.has("claudeImportFailed")
                              ? a("claudeImportFailed")
                              : "Failed to import Claude auth")
                        ));
                (i.success(
                  "function" == typeof a.has && a.has("claudeImportSuccess")
                    ? a("claudeImportSuccess")
                    : "Claude connection imported successfully"
                ),
                  t());
              } catch {
                i.error(
                  "function" == typeof a.has && a.has("claudeImportFailed")
                    ? a("claudeImportFailed")
                    : "Failed to import Claude auth"
                );
              } finally {
                S(!1);
              }
            }
          },
          R = async (e) => {
            let t = e.target.files?.[0];
            if (t) {
              U(!0);
              try {
                let e = await fetch("/api/providers/claude-auth/zip-extract", {
                    method: "POST",
                    headers: { "Content-Type": "application/zip" },
                    body: t,
                  }),
                  r = await e.json().catch(() => ({}));
                if (!e.ok)
                  return void i.error(
                    r.error ||
                      ("function" == typeof a.has && a.has("claudeImportBulkZipError")
                        ? a("claudeImportBulkZipError")
                        : "Failed to extract ZIP")
                  );
                let l = (r.entries || []).map((e) => ({
                  name: e.name,
                  json: e.json,
                  parseError: e.parseError,
                  email: null,
                }));
                I(l);
              } catch {
                i.error(
                  "function" == typeof a.has && a.has("claudeImportBulkZipError")
                    ? a("claudeImportBulkZipError")
                    : "Failed to extract ZIP"
                );
              } finally {
                U(!1);
              }
            }
          },
          H = async () => {
            if (!P) {
              (E(!0), $([]), L(null));
              try {
                let e = A.filter((e) => null !== e.json);
                if (0 === e.length) return void i.error("No valid entries to import");
                let r = await fetch("/api/providers/claude-auth/import-bulk", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      entries: e.map((e) => ({
                        json: e.json,
                        name: e.name,
                        email: e.email || void 0,
                      })),
                      overwriteExisting: k,
                    }),
                  }),
                  l = await r.json().catch(() => ({}));
                if (!r.ok)
                  return void i.error(
                    l.error ||
                      ("function" == typeof a.has && a.has("claudeImportBulkFailed")
                        ? a("claudeImportBulkFailed")
                        : "Some entries failed to import")
                  );
                (L({ success: l.success, failed: l.failed, total: l.total }),
                  l.errors?.length > 0 && $(l.errors),
                  l.success > 0 &&
                    (i.success(
                      "function" == typeof a.has && a.has("claudeImportBulkSuccess")
                        ? a("claudeImportBulkSuccess", { count: l.success })
                        : `Imported ${l.success} Claude connections`
                    ),
                    0 === l.failed && t()));
              } catch {
                i.error(
                  "function" == typeof a.has && a.has("claudeImportBulkFailed")
                    ? a("claudeImportBulkFailed")
                    : "Some entries failed to import"
                );
              } finally {
                E(!1);
              }
            }
          },
          z = {
            single:
              "function" == typeof a.has && a.has("claudeImportTabSingle")
                ? a("claudeImportTabSingle")
                : "Single",
            bulk:
              "function" == typeof a.has && a.has("claudeImportTabBulk")
                ? a("claudeImportTabBulk")
                : "Bulk",
          },
          B =
            "function" == typeof a.has && a.has("claudeImportModalTitle")
              ? a("claudeImportModalTitle")
              : "Import Claude Auth";
        return (0, r.jsx)(C.aF, {
          isOpen: !0,
          onClose: e,
          title: B,
          children: (0, r.jsxs)("div", {
            className: "flex flex-col gap-4",
            children: [
              (0, r.jsx)("div", {
                className: "flex gap-1 border-b border-border pb-0",
                children: ["single", "bulk"].map((e) =>
                  (0, r.jsx)(
                    "button",
                    {
                      onClick: () => n(e),
                      className: `px-3 py-1.5 text-sm rounded-t-md transition-colors ${o === e ? "bg-primary/10 text-primary border-b-2 border-primary" : "text-text-muted hover:text-text-primary"}`,
                      children: z[e],
                    },
                    e
                  )
                ),
              }),
              "single" === o &&
                (0, r.jsxs)("div", {
                  className: "flex flex-col gap-3",
                  children: [
                    (0, r.jsx)("div", {
                      className: "flex gap-1",
                      children: ["upload", "paste"].map((e) =>
                        (0, r.jsx)(
                          "button",
                          {
                            onClick: () => c(e),
                            className: `px-2 py-1 text-xs rounded transition-colors ${d === e ? "bg-bg-subtle text-text-primary" : "text-text-muted hover:text-text-primary"}`,
                            children:
                              "upload" === e
                                ? "function" == typeof a.has && a.has("claudeImportTabUpload")
                                  ? a("claudeImportTabUpload")
                                  : "Upload file"
                                : "function" == typeof a.has && a.has("claudeImportTabPaste")
                                  ? a("claudeImportTabPaste")
                                  : "Paste JSON",
                          },
                          e
                        )
                      ),
                    }),
                    "upload" === d
                      ? (0, r.jsxs)("div", {
                          children: [
                            (0, r.jsx)("label", {
                              className: "block text-xs text-text-muted mb-1",
                              children:
                                "function" == typeof a.has && a.has("claudeImportFileLabel")
                                  ? a("claudeImportFileLabel")
                                  : "Choose .credentials.json",
                            }),
                            (0, r.jsx)("input", {
                              type: "file",
                              accept: ".json",
                              onChange: (e) => {
                                let t = e.target.files?.[0];
                                if (!t) return;
                                let r = new FileReader();
                                ((r.onload = (e) => {
                                  try {
                                    let t = JSON.parse(e.target?.result);
                                    x(t);
                                  } catch {
                                    i.error(
                                      "function" == typeof a.has && a.has("claudeImportInvalidJson")
                                        ? a("claudeImportInvalidJson")
                                        : "Could not parse the file as JSON"
                                    );
                                  }
                                }),
                                  r.readAsText(t));
                              },
                              className: "block w-full text-sm",
                            }),
                            u &&
                              eH(u).valid &&
                              (0, r.jsx)("p", {
                                className: "mt-1 text-xs text-emerald-500",
                                children: a("providerDetailValidClaudeCredentialsFile"),
                              }),
                            u &&
                              !eH(u).valid &&
                              (0, r.jsx)("p", {
                                className: "mt-1 text-xs text-red-500",
                                children:
                                  "function" == typeof a.has && a.has("claudeImportInvalidShape")
                                    ? a("claudeImportInvalidShape")
                                    : "The file is not a valid .credentials.json",
                              }),
                          ],
                        })
                      : (0, r.jsxs)("div", {
                          children: [
                            (0, r.jsx)("label", {
                              className: "block text-xs text-text-muted mb-1",
                              children:
                                "function" == typeof a.has && a.has("claudeImportPasteLabel")
                                  ? a("claudeImportPasteLabel")
                                  : "Paste the JSON content",
                            }),
                            (0, r.jsx)("textarea", {
                              value: h,
                              onChange: (e) => f(e.target.value),
                              rows: 6,
                              className:
                                "w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs font-mono text-text-main",
                              placeholder: '{ "claudeAiOauth": { ... } }',
                            }),
                          ],
                        }),
                    (0, r.jsxs)("div", {
                      className: "grid grid-cols-2 gap-2",
                      children: [
                        (0, r.jsxs)("div", {
                          children: [
                            (0, r.jsx)("label", {
                              className: "block text-xs text-text-muted mb-1",
                              children:
                                "function" == typeof a.has && a.has("claudeImportEmailLabel")
                                  ? a("claudeImportEmailLabel")
                                  : "Account email",
                            }),
                            (0, r.jsx)("input", {
                              type: "email",
                              value: v,
                              onChange: (e) => j(e.target.value),
                              placeholder: "auto-detected",
                              className:
                                "w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs text-text-main",
                            }),
                          ],
                        }),
                        (0, r.jsxs)("div", {
                          children: [
                            (0, r.jsx)("label", {
                              className: "block text-xs text-text-muted mb-1",
                              children:
                                "function" == typeof a.has && a.has("claudeImportNameLabel")
                                  ? a("claudeImportNameLabel")
                                  : "Connection name (optional)",
                            }),
                            (0, r.jsx)("input", {
                              type: "text",
                              value: g,
                              onChange: (e) => b(e.target.value),
                              placeholder: "My Claude account",
                              className:
                                "w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs text-text-main",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, r.jsxs)("label", {
                      className: "flex items-center gap-2 text-xs text-text-muted",
                      children: [
                        (0, r.jsx)("input", {
                          type: "checkbox",
                          checked: k,
                          onChange: (e) => N(e.target.checked),
                        }),
                        "function" == typeof a.has && a.has("claudeImportOverwriteLabel")
                          ? a("claudeImportOverwriteLabel")
                          : "Replace existing connection if account already exists",
                      ],
                    }),
                    (0, r.jsx)(C.$n, {
                      loading: w,
                      onClick: _,
                      disabled: "upload" === d ? !u : !h.trim(),
                      children:
                        "function" == typeof a.has && a.has("claudeImportSubmit")
                          ? a("claudeImportSubmit")
                          : "Import",
                    }),
                  ],
                }),
              "bulk" === o &&
                (0, r.jsxs)("div", {
                  className: "flex flex-col gap-3",
                  children: [
                    (0, r.jsx)("div", {
                      className: "flex gap-1",
                      children: ["upload", "paste", "zip"].map((e) =>
                        (0, r.jsx)(
                          "button",
                          {
                            onClick: () => {
                              (m(e), I([]));
                            },
                            className: `px-2 py-1 text-xs rounded transition-colors ${p === e ? "bg-bg-subtle text-text-primary" : "text-text-muted hover:text-text-primary"}`,
                            children:
                              "upload" === e
                                ? "function" == typeof a.has && a.has("claudeImportBulkModeUpload")
                                  ? a("claudeImportBulkModeUpload")
                                  : "Upload files"
                                : "paste" === e
                                  ? "function" == typeof a.has && a.has("claudeImportBulkModePaste")
                                    ? a("claudeImportBulkModePaste")
                                    : "Paste JSON array"
                                  : "function" == typeof a.has && a.has("claudeImportBulkModeZip")
                                    ? a("claudeImportBulkModeZip")
                                    : "Upload ZIP",
                          },
                          e
                        )
                      ),
                    }),
                    "upload" === p &&
                      (0, r.jsxs)("div", {
                        children: [
                          (0, r.jsx)("p", {
                            className: "text-xs text-text-muted mb-1",
                            children:
                              "function" == typeof a.has && a.has("claudeImportBulkUploadHint")
                                ? a("claudeImportBulkUploadHint")
                                : "Drop or pick up to 50 .credentials.json files (256KB each, 10MB total).",
                          }),
                          (0, r.jsx)("input", {
                            type: "file",
                            accept: ".json",
                            multiple: !0,
                            onChange: (e) => {
                              let t = Array.from(e.target.files || []),
                                a = [],
                                r = t.length;
                              r &&
                                t.forEach((e) => {
                                  let t = new FileReader();
                                  ((t.onload = (t) => {
                                    try {
                                      let r = JSON.parse(t.target?.result),
                                        l = (function (e) {
                                          try {
                                            let t = e && "object" == typeof e ? e : null;
                                            if (!t) return null;
                                            return (
                                              !(
                                                t.claudeAiOauth &&
                                                "object" == typeof t.claudeAiOauth &&
                                                t.claudeAiOauth
                                              ),
                                              null
                                            );
                                          } catch {
                                            return null;
                                          }
                                        })(r);
                                      a.push({
                                        name: e.name.replace(/\.json$/, ""),
                                        json: r,
                                        parseError: null,
                                        email: l,
                                      });
                                    } catch {
                                      a.push({
                                        name: e.name,
                                        json: null,
                                        parseError: "Not valid JSON",
                                        email: null,
                                      });
                                    }
                                    0 == --r && I((e) => [...e, ...a]);
                                  }),
                                    t.readAsText(e));
                                });
                            },
                            className: "block w-full text-sm",
                          }),
                        ],
                      }),
                    "paste" === p &&
                      (0, r.jsxs)("div", {
                        children: [
                          (0, r.jsx)("p", {
                            className: "text-xs text-text-muted mb-1",
                            children:
                              "function" == typeof a.has && a.has("claudeImportBulkPasteHint")
                                ? a("claudeImportBulkPasteHint")
                                : "Paste an array of objects: [{ json, name?, email? }, ...]",
                          }),
                          (0, r.jsx)("textarea", {
                            value: T,
                            onChange: (e) =>
                              ((e) => {
                                M(e);
                                let t = e.trim();
                                if (!t) return void I([]);
                                try {
                                  let e = JSON.parse(t);
                                  Array.isArray(e)
                                    ? I(
                                        e.map((e, t) => ({
                                          name: `entry ${t + 1}`,
                                          json: e,
                                          parseError: null,
                                          email: null,
                                        }))
                                      )
                                    : I([
                                        { name: "entry 1", json: e, parseError: null, email: null },
                                      ]);
                                } catch {
                                  I([
                                    {
                                      name: "parse error",
                                      json: null,
                                      parseError: "Invalid JSON",
                                      email: null,
                                    },
                                  ]);
                                }
                              })(e.target.value),
                            rows: 6,
                            className:
                              "w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs font-mono text-text-main",
                            placeholder: "[{ ... }, { ... }]",
                          }),
                        ],
                      }),
                    "zip" === p &&
                      (0, r.jsxs)("div", {
                        children: [
                          (0, r.jsx)("p", {
                            className: "text-xs text-text-muted mb-1",
                            children:
                              "function" == typeof a.has && a.has("claudeImportBulkZipHint")
                                ? a("claudeImportBulkZipHint")
                                : "ZIP containing .json entries. Max 50 entries, 10MB unpacked.",
                          }),
                          F
                            ? (0, r.jsx)("p", {
                                className: "text-xs text-primary animate-pulse",
                                children:
                                  "function" == typeof a.has &&
                                  a.has("claudeImportBulkZipExtracting")
                                    ? a("claudeImportBulkZipExtracting")
                                    : "Extracting ZIP…",
                              })
                            : (0, r.jsx)("input", {
                                type: "file",
                                accept: ".zip",
                                onChange: R,
                                className: "block w-full text-sm",
                              }),
                        ],
                      }),
                    A.length > 0 &&
                      (0, r.jsx)("div", {
                        className:
                          "rounded border border-border bg-bg-subtle px-2 py-1.5 max-h-36 overflow-y-auto",
                        children: A.map((e, t) =>
                          (0, r.jsxs)(
                            "div",
                            {
                              className: `text-xs py-0.5 flex items-center gap-1 ${e.parseError ? "text-red-500" : "text-text-main"}`,
                              children: [
                                (0, r.jsx)("span", {
                                  className: "material-symbols-outlined text-[12px]",
                                  children: e.parseError ? "error" : "check_circle",
                                }),
                                e.name,
                                e.email ? ` (${e.email})` : "",
                                e.parseError ? ` — ${e.parseError}` : "",
                              ],
                            },
                            t
                          )
                        ),
                      }),
                    (0, r.jsxs)("label", {
                      className: "flex items-center gap-2 text-xs text-text-muted",
                      children: [
                        (0, r.jsx)("input", {
                          type: "checkbox",
                          checked: k,
                          onChange: (e) => N(e.target.checked),
                        }),
                        "function" == typeof a.has && a.has("claudeImportOverwriteLabel")
                          ? a("claudeImportOverwriteLabel")
                          : "Replace existing connection if account already exists",
                      ],
                    }),
                    D &&
                      (0, r.jsxs)("div", {
                        className: "rounded bg-bg-subtle px-2 py-1.5 text-xs",
                        children: [
                          D.success,
                          "/",
                          D.total,
                          " imported",
                          D.failed > 0 ? `, ${D.failed} failed` : "",
                        ],
                      }),
                    O.length > 0 &&
                      (0, r.jsx)("div", {
                        className:
                          "rounded border border-red-500/30 bg-red-500/5 px-2 py-1.5 max-h-28 overflow-y-auto",
                        children: O.map((e) =>
                          (0, r.jsxs)(
                            "div",
                            {
                              className: "text-xs text-red-500 py-0.5",
                              children: [e.name, ": ", e.message],
                            },
                            e.index
                          )
                        ),
                      }),
                    (0, r.jsx)(C.$n, {
                      loading: P,
                      onClick: H,
                      disabled: 0 === A.filter((e) => null !== e.json).length,
                      children:
                        "function" == typeof a.has && a.has("claudeImportBulkSubmit")
                          ? a("claudeImportBulkSubmit")
                          : "Import all",
                    }),
                  ],
                }),
            ],
          }),
        });
      }
      function eB({ connectionId: e, inProgress: t, onConfirm: a, onClose: i }) {
        let o = (0, s.c)("providers"),
          [n, d] = (0, l.useState)(!1);
        if (!e) return null;
        let c =
            "function" == typeof o.has && o.has("claudeApplyModalTitle")
              ? o("claudeApplyModalTitle")
              : "Apply to Local Claude Code",
          p =
            "function" == typeof o.has && o.has("claudeApplyTargetLabel")
              ? o("claudeApplyTargetLabel")
              : "Target path",
          m =
            "function" == typeof o.has && o.has("claudeApplyBackupLabel")
              ? o("claudeApplyBackupLabel")
              : "Backups",
          u =
            "function" == typeof o.has && o.has("claudeApplyWarning")
              ? o("claudeApplyWarning")
              : "This will replace the existing claudeAiOauth section. Continue?",
          x =
            "function" == typeof o.has && o.has("claudeApplyConfirmCheckbox")
              ? o("claudeApplyConfirmCheckbox")
              : "I confirm I want to replace the existing claudeAiOauth section",
          h = "function" == typeof o.has && o.has("claudeApply") ? o("claudeApply") : "Apply",
          f =
            "function" == typeof o.has && o.has("claudeApplyMcpHint")
              ? o("claudeApplyMcpHint")
              : "Existing MCP OAuth state will be preserved.";
        return (0, r.jsx)(C.aF, {
          isOpen: !!e,
          title: c,
          onClose: i,
          children: (0, r.jsxs)("div", {
            className: "flex flex-col gap-4",
            children: [
              (0, r.jsxs)("div", {
                children: [
                  (0, r.jsx)("div", {
                    className: "text-xs uppercase text-text-muted mb-1",
                    children: p,
                  }),
                  (0, r.jsx)("code", {
                    className:
                      "block rounded bg-sidebar px-2 py-1.5 text-xs font-mono text-text-main",
                    children: "~/.claude/.credentials.json",
                  }),
                  (0, r.jsx)("p", {
                    className: "mt-1 text-xs text-text-muted",
                    children: "Path is auto-detected per OS (Linux/Mac).",
                  }),
                ],
              }),
              (0, r.jsxs)("div", {
                children: [
                  (0, r.jsx)("div", {
                    className: "text-xs uppercase text-text-muted mb-1",
                    children: m,
                  }),
                  (0, r.jsx)("code", {
                    className:
                      "block rounded bg-sidebar px-2 py-1.5 text-xs font-mono text-text-main",
                    children: "~/.claude/credentials-{timestamp}.bak",
                  }),
                ],
              }),
              (0, r.jsx)("div", {
                className:
                  "rounded bg-sky-500/10 border border-sky-500/20 px-3 py-2 text-xs text-sky-400",
                children: f,
              }),
              (0, r.jsx)("p", { className: "text-sm text-text-muted", children: u }),
              (0, r.jsxs)("label", {
                className: "flex items-center gap-2 text-sm",
                children: [
                  (0, r.jsx)("input", {
                    type: "checkbox",
                    checked: n,
                    onChange: (e) => d(e.target.checked),
                  }),
                  x,
                ],
              }),
              (0, r.jsxs)("div", {
                className: "flex justify-end gap-2",
                children: [
                  (0, r.jsx)(C.$n, {
                    variant: "secondary",
                    onClick: i,
                    disabled: t,
                    children: "Cancel",
                  }),
                  (0, r.jsx)(C.$n, {
                    loading: t,
                    disabled: !n || t,
                    onClick: () => void a(e),
                    children: h,
                  }),
                ],
              }),
            ],
          }),
        });
      }
      function eK(e, t) {
        let a = ("string" == typeof e ? e.trim() : "") || t;
        try {
          let e = new URL(a);
          if ("http:" !== e.protocol && "https:" !== e.protocol)
            return { value: null, error: "Base URL must use http or https" };
          return { value: a, error: null };
        } catch {
          return { value: null, error: "Base URL must be a valid URL" };
        }
      }
      function eJ({ isOpen: e, connection: t, onSave: a, onClose: i }) {
        let o,
          n,
          d,
          c,
          p = (0, s.c)("providers"),
          m = (0, y.i)(),
          [u, x] = (0, l.useState)({
            name: "",
            priority: 1,
            maxConcurrent: "",
            apiKey: "",
            healthCheckInterval: 60,
            baseUrl: "",
            cx: "",
            region: "",
            apiRegion: "international",
            validationModelId: "",
            tag: "",
            routingTags: "",
            excludedModels: "",
            customUserAgent: "",
            accountId: "",
            codexReasoningEffort: "medium",
            codexServiceTier: "default",
            codexOpenaiStoreEnabled: !1,
            consoleApiKey: "",
            ccCompatibleContext1m: !1,
            cloudCodeProjectId: "",
            antigravityClientProfile: "ide",
            blockExtraUsage: t?.provider === "claude" && U(t?.provider, t?.providerSpecificData),
            passthroughModels: t?.providerSpecificData?.passthroughModels === !0,
          }),
          [h, f] = (0, l.useState)(!1),
          [g, b] = (0, l.useState)(null),
          [v, j] = (0, l.useState)(!1),
          [k, A] = (0, l.useState)(null),
          [I, T] = (0, l.useState)(!1),
          [M, P] = (0, l.useState)(null),
          [$, D] = (0, l.useState)([]),
          [F, _] = (0, l.useState)(""),
          [R, H] = (0, l.useState)({}),
          [z, B] = (0, l.useState)(!1),
          { emailsVisible: K, toggleEmailVisibility: G } = (0, O.A)(),
          W = eT(t?.provider),
          q = eM(t?.provider),
          V = t?.provider === "vertex" || t?.provider === "vertex-partner",
          ea = t?.provider === "bedrock",
          er = V || ea,
          el = eO(t?.provider),
          ei = t?.provider === "cloudflare-ai",
          eo = t?.provider === "codex",
          en = t?.provider === "claude",
          ep = t?.provider === "gemini-cli",
          eu = t?.provider === "antigravity",
          ex = ep || eu,
          eh = eI(t?.provider),
          ef = !!eh,
          eg = t?.provider === "google-pse-search",
          eb = Z(t?.provider),
          ey = eb?.kind === "none",
          ev = !!eb && "none" !== eb.kind,
          ej = (t?.provider ? (0, J.S6)(t.provider)?.name : null) || t?.provider || "",
          ek = (0, N.fR)(t?.provider) || !!ey,
          eC = (0, N.Xv)(t?.provider),
          ew = ea ? "eu-west-2" : "us-central1",
          eS = eb ? X(p, eb, ek) : ek ? p("apiKeyOptionalLabel") : p("apiKeyLabel"),
          eA = ev ? eb.placeholder : V ? p("vertexServiceAccountPlaceholder") : p("enterNewApiKey"),
          eL = ev
            ? Y(p, eb, ej, !0)
            : ef
              ? p("localProviderApiKeyOptionalHint", { provider: eh?.name || t?.provider || "" })
              : ek
                ? p("apiKeyOptionalHint")
                : p("leaveBlankKeepCurrentApiKey"),
          eF = (0, l.useMemo)(() => ec.map((e) => ({ value: e, label: em(p, e) })), [p]);
        (0, l.useEffect)(() => {
          if (e && t) {
            var a, r, l, i;
            let e,
              o = t.providerSpecificData?.baseUrl,
              s = t.providerSpecificData?.region,
              n = t.providerSpecificData?.customUserAgent,
              d = "string" == typeof n ? n : "",
              c = t.providerSpecificData?.cx,
              p = t.providerSpecificData?.accountId,
              m =
                ((a = t.providerSpecificData),
                {
                  reasoningEffort: (e = (0, L.vr)(a)).reasoningEffort ?? "medium",
                  ...(e.serviceTier ? { serviceTier: e.serviceTier } : {}),
                }),
              u = ((r = t.providerSpecificData), { context1m: !0 === (0, L.RG)(r).context1m }),
              h = t.providerSpecificData?.consoleApiKey;
            x({
              name: t.name || "",
              priority: t.priority || 1,
              maxConcurrent:
                null !== t.maxConcurrent && void 0 !== t.maxConcurrent
                  ? String(t.maxConcurrent)
                  : "",
              apiKey: "",
              healthCheckInterval: t.healthCheckInterval ?? 60,
              baseUrl: ("string" == typeof o ? o : "") || q,
              cx: "string" == typeof c ? c : "",
              region: ("string" == typeof s ? s : "") || (er ? ew : ""),
              apiRegion: t.providerSpecificData?.apiRegion || "international",
              validationModelId: t.providerSpecificData?.validationModelId || "",
              tag: t.providerSpecificData?.tag || "",
              routingTags: Array.isArray((l = t.providerSpecificData?.tags))
                ? l.filter((e) => "string" == typeof e && e.trim().length > 0).join(", ")
                : "",
              excludedModels: Array.isArray(
                (i =
                  t.providerSpecificData?.excludedModels ?? t.providerSpecificData?.excluded_models)
              )
                ? i.filter((e) => "string" == typeof e && e.trim().length > 0).join(", ")
                : "",
              customUserAgent: d,
              accountId: "string" == typeof p ? p : "",
              codexReasoningEffort: m.reasoningEffort,
              codexServiceTier: m.serviceTier ?? "default",
              codexOpenaiStoreEnabled: t.providerSpecificData?.openaiStoreEnabled === !0,
              consoleApiKey: "string" == typeof h ? h : "",
              ccCompatibleContext1m: u.context1m,
              cloudCodeProjectId: t.providerSpecificData?.projectId || t.projectId || "",
              antigravityClientProfile: S(t.providerSpecificData?.clientProfile),
              blockExtraUsage: U(t.provider, t.providerSpecificData),
              passthroughModels: t?.providerSpecificData?.passthroughModels === !0,
            });
            let f = t.providerSpecificData?.extraApiKeys;
            (D(Array.isArray(f) ? f : []),
              H(t.providerSpecificData?.apiKeyHealth || {}),
              _(""),
              B(!!d),
              b(null),
              A(null),
              P(null));
          }
        }, [e, t, q, er, ew]);
        let eU = async () => {
            if (t?.provider) {
              (f(!0), b(null));
              try {
                let e = await fetch(`/api/providers/${t.id}/test`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ validationModelId: u.validationModelId || void 0 }),
                  }),
                  a = await e.json();
                b({ valid: !!a.valid, diagnosis: a.diagnosis || null, message: a.error || null });
              } catch {
                b({
                  valid: !1,
                  diagnosis: { type: "network_error" },
                  message: p("failedTestConnection"),
                });
              } finally {
                f(!1);
              }
            }
          },
          e_ = async () => {
            if (t?.provider && !ey && (ez || ek || u.apiKey)) {
              (j(!0), A(null));
              try {
                let e = await fetch("/api/providers/validate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      provider: t.provider,
                      apiKey: u.apiKey,
                      validationModelId: u.validationModelId || void 0,
                      customUserAgent: u.customUserAgent.trim() || void 0,
                      baseUrl: u.baseUrl.trim() || void 0,
                      region: er ? u.region.trim() || ew : void 0,
                      cx: u.cx.trim() || void 0,
                    }),
                  }),
                  a = await e.json();
                A(a.valid ? "success" : "failed");
              } catch {
                A("failed");
              } finally {
                j(!1);
              }
            }
          },
          eR = async () => {
            (T(!0), P(null));
            try {
              let e = u.maxConcurrent.trim(),
                r = u.cloudCodeProjectId.trim(),
                l = null;
              if (e) {
                let t = Number(e);
                if (!Number.isInteger(t) || t < 0)
                  return void P(p("maxConcurrentWholeNumberError"));
                l = t;
              }
              let i = {
                name: u.name,
                priority: u.priority,
                maxConcurrent: l,
                healthCheckInterval: u.healthCheckInterval,
              };
              if ((ex && (i.projectId = r || null), eg && !u.cx.trim()))
                return void P(p("searchEngineIdRequired"));
              let o = null;
              if (W) {
                let e = eK(u.baseUrl, q);
                if (e.error) return void P(e.error);
                o = e.value;
              }
              if (!eH && u.apiKey) {
                i.apiKey = u.apiKey;
                let e = "success" === k;
                if (!e)
                  try {
                    (j(!0), A(null));
                    let a = await fetch("/api/providers/validate", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        provider: t.provider,
                        apiKey: u.apiKey,
                        validationModelId: u.validationModelId || void 0,
                        customUserAgent: u.customUserAgent.trim() || void 0,
                        baseUrl: u.baseUrl.trim() || void 0,
                        region: er ? u.region.trim() || ew : void 0,
                        cx: u.cx.trim() || void 0,
                      }),
                    });
                    ((e = !!(await a.json()).valid), A(e ? "success" : "failed"));
                  } catch {
                    A("failed");
                  } finally {
                    j(!1);
                  }
                e &&
                  ((i.testStatus = "active"),
                  (i.lastError = null),
                  (i.lastErrorAt = null),
                  (i.lastErrorType = null),
                  (i.lastErrorSource = null),
                  (i.errorCode = null),
                  (i.rateLimitedUntil = null));
              }
              if (eH)
                ((i.providerSpecificData = {
                  ...(t.providerSpecificData || {}),
                  tag: u.tag.trim() || void 0,
                  tags: e$(u.routingTags),
                  excludedModels: eD(u.excludedModels),
                }),
                  en && (i.providerSpecificData.blockExtraUsage = u.blockExtraUsage),
                  eo &&
                    ((i.providerSpecificData.requestDefaults = {
                      reasoningEffort: u.codexReasoningEffort,
                      ...("default" !== u.codexServiceTier
                        ? { serviceTier: u.codexServiceTier }
                        : {}),
                    }),
                    (i.providerSpecificData.openaiStoreEnabled = !0 === u.codexOpenaiStoreEnabled)),
                  ex && (i.providerSpecificData.projectId = r || null));
              else if (
                ((i.providerSpecificData = {
                  ...(t.providerSpecificData || {}),
                  extraApiKeys: $.filter((e) => e.trim().length > 0),
                  tag: u.tag.trim() || void 0,
                  tags: e$(u.routingTags),
                  excludedModels: eD(u.excludedModels),
                  customUserAgent: u.customUserAgent.trim(),
                  ...(u.passthroughModels ? { passthroughModels: !0 } : {}),
                }),
                "bailian-coding-plan" === t.provider &&
                  (u.consoleApiKey.trim()
                    ? (i.providerSpecificData.consoleApiKey = u.consoleApiKey.trim())
                    : (i.providerSpecificData.consoleApiKey = void 0)),
                u.validationModelId &&
                  (i.providerSpecificData.validationModelId = u.validationModelId),
                eg && (i.providerSpecificData.cx = u.cx.trim() || void 0),
                W
                  ? (i.providerSpecificData.baseUrl = o)
                  : er
                    ? (i.providerSpecificData.region = u.region.trim() || ew)
                    : el
                      ? (i.providerSpecificData.apiRegion = u.apiRegion)
                      : ei &&
                        u.accountId.trim() &&
                        (i.providerSpecificData.accountId = u.accountId.trim()),
                ex && (i.providerSpecificData.projectId = r || null),
                eC)
              ) {
                let e =
                  i.providerSpecificData.requestDefaults &&
                  "object" == typeof i.providerSpecificData.requestDefaults &&
                  !Array.isArray(i.providerSpecificData.requestDefaults)
                    ? { ...i.providerSpecificData.requestDefaults }
                    : {};
                (u.ccCompatibleContext1m ? (e.context1m = !0) : delete e.context1m,
                  (i.providerSpecificData.requestDefaults =
                    Object.keys(e).length > 0 ? e : void 0));
              }
              eu &&
                (i.providerSpecificData = {
                  ...(t.providerSpecificData || {}),
                  ...(i.providerSpecificData || {}),
                  clientProfile: S(u.antigravityClientProfile),
                });
              let s = await a(i);
              s && P("string" == typeof s ? s : p("failedSaveConnection"));
            } finally {
              T(!1);
            }
          };
        if (!t) return null;
        let eH = "oauth" === t.authType,
          ez = (0, N.mq)(t.provider) || (0, N.gb)(t.provider),
          eB = (!g?.valid && g?.diagnosis?.type && eN[g.diagnosis.type]) || null;
        return (0, r.jsx)(C.aF, {
          isOpen: e,
          title: p("editConnection"),
          onClose: i,
          children: (0, r.jsxs)("div", {
            className: "flex flex-col gap-4",
            children: [
              (0, r.jsx)(C.pd, {
                label: p("nameLabel"),
                value: u.name,
                onChange: (e) => x({ ...u, name: e.target.value }),
                placeholder: eH ? p("accountName") : p("productionKey"),
              }),
              (0, r.jsx)(C.pd, {
                label: p("tagGroupLabel"),
                value: u.tag,
                onChange: (e) => x({ ...u, tag: e.target.value }),
                placeholder: p("tagGroupPlaceholder"),
                hint: p("tagGroupHint"),
              }),
              (0, r.jsx)(C.pd, {
                label: p("routingTagsLabel"),
                value: u.routingTags,
                onChange: (e) => x({ ...u, routingTags: e.target.value }),
                placeholder: p("routingTagsPlaceholder"),
                hint: p("routingTagsHint"),
              }),
              (0, r.jsx)(C.pd, {
                label: p("excludedModelsLabel"),
                value: u.excludedModels,
                onChange: (e) => x({ ...u, excludedModels: e.target.value }),
                placeholder: p("excludedModelsPlaceholder"),
                hint: p("excludedModelsHint"),
              }),
              eo &&
                (0, r.jsxs)("div", {
                  className:
                    "flex flex-col gap-4 rounded-lg border border-border/50 bg-surface/20 p-4",
                  children: [
                    (0, r.jsx)(C.l6, {
                      label: p("defaultThinkingStrengthLabel"),
                      value: u.codexReasoningEffort,
                      options: ed,
                      onChange: (e) => x({ ...u, codexReasoningEffort: e.target.value }),
                      hint: p("defaultThinkingStrengthHint"),
                    }),
                    (0, r.jsx)(C.l6, {
                      label: Q(p, "codexServiceTierLabel", "Codex service tier"),
                      value: u.codexServiceTier,
                      options: eF,
                      onChange: (e) => x({ ...u, codexServiceTier: e.target.value }),
                      hint: Q(
                        p,
                        "codexServiceTierDescription",
                        "Default uses the normal Codex tier. Priority shows as Fast; Flex uses the flex service tier when available."
                      ),
                    }),
                    (0, r.jsx)(C.lM, {
                      checked: u.codexOpenaiStoreEnabled,
                      onChange: (e) => x({ ...u, codexOpenaiStoreEnabled: e }),
                      label: p("openaiResponsesStoreLabel"),
                      description: p("openaiResponsesStoreDescription"),
                    }),
                  ],
                }),
              en &&
                (0, r.jsx)("div", {
                  className:
                    "flex flex-col gap-4 rounded-lg border border-border/50 bg-surface/20 p-4",
                  children: (0, r.jsx)(C.lM, {
                    checked: u.blockExtraUsage,
                    onChange: (e) => x({ ...u, blockExtraUsage: e }),
                    label: p("blockClaudeExtraUsageLabel"),
                    description: p("blockClaudeExtraUsageDescription"),
                  }),
                }),
              eC &&
                (0, r.jsx)("div", {
                  className:
                    "flex flex-col gap-4 rounded-lg border border-border/50 bg-surface/20 p-4",
                  children: (0, r.jsx)(C.lM, {
                    checked: u.ccCompatibleContext1m,
                    onChange: (e) => x({ ...u, ccCompatibleContext1m: e }),
                    label: p("ccCompatibleContext1mLabel"),
                    description: p("ccCompatibleContext1mDescription"),
                  }),
                }),
              ex &&
                (0, r.jsxs)("div", {
                  className:
                    "flex flex-col gap-4 rounded-lg border border-border/50 bg-surface/20 p-4",
                  children: [
                    eu &&
                      (0, r.jsx)(C.l6, {
                        label: p("antigravityClientProfileLabel"),
                        value: u.antigravityClientProfile,
                        options: w.map((e) => ({ value: e.value, label: p(e.labelKey) })),
                        onChange: (e) => x({ ...u, antigravityClientProfile: e.target.value }),
                        hint: p("antigravityClientProfileHint"),
                      }),
                    (0, r.jsx)(C.pd, {
                      label: eu ? p("antigravityProjectIdLabel") : p("geminiCliProjectIdLabel"),
                      value: u.cloudCodeProjectId,
                      onChange: (e) => x({ ...u, cloudCodeProjectId: e.target.value }),
                      placeholder: eu
                        ? p("antigravityProjectIdPlaceholder")
                        : p("geminiCliProjectIdPlaceholder"),
                      hint: eu ? p("antigravityProjectIdHint") : p("geminiCliProjectIdHint"),
                      className: "font-mono text-xs",
                    }),
                  ],
                }),
              eH &&
                t.email &&
                (0, r.jsxs)("div", {
                  className: "bg-sidebar/50 p-3 rounded-lg",
                  children: [
                    (0, r.jsx)("p", {
                      className: "text-sm text-text-muted mb-1",
                      children: p("email"),
                    }),
                    (0, r.jsxs)("div", {
                      className: "flex items-center gap-2",
                      children: [
                        (0, r.jsx)("p", {
                          className: "font-medium",
                          title: K ? t.email : void 0,
                          children: K ? t.email : (0, E.vA)(t.email),
                        }),
                        (0, r.jsx)("button", {
                          type: "button",
                          onClick: G,
                          className:
                            "rounded p-1 text-text-muted hover:bg-sidebar hover:text-primary",
                          title: K ? p("hideEmail") : p("showEmail"),
                          children: (0, r.jsx)("span", {
                            className: "material-symbols-outlined text-sm",
                            children: K ? "visibility_off" : "visibility",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              eH &&
                (0, r.jsx)(C.pd, {
                  label: p("healthCheckMinutes"),
                  type: "number",
                  value: u.healthCheckInterval,
                  onChange: (e) =>
                    x({
                      ...u,
                      healthCheckInterval: Math.max(0, Number.parseInt(e.target.value) || 0),
                    }),
                  hint: p("healthCheckHint"),
                }),
              (0, r.jsx)(C.pd, {
                label: p("priorityLabel"),
                type: "number",
                value: u.priority,
                onChange: (e) => x({ ...u, priority: Number.parseInt(e.target.value) || 1 }),
              }),
              (0, r.jsx)(C.pd, {
                label: p("accountConcurrencyCapLabel"),
                type: "number",
                min: 0,
                step: 1,
                value: u.maxConcurrent,
                onChange: (e) => {
                  let t = e.target.value;
                  if ((x({ ...u, maxConcurrent: t }), M && t.trim())) {
                    let e = Number(t);
                    Number.isInteger(e) && e >= 0 && P(null);
                  }
                },
                placeholder: "0",
                hint: p("accountConcurrencyCapHint"),
              }),
              M &&
                (0, r.jsx)("div", {
                  className:
                    "text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2",
                  children: M,
                }),
              !eH &&
                (0, r.jsxs)(r.Fragment, {
                  children: [
                    eb && (0, r.jsx)(et, { requirement: eb, providerName: ej, t: p }),
                    !ey &&
                      (0, r.jsxs)("div", {
                        className: "flex gap-2",
                        children: [
                          (0, r.jsx)(C.pd, {
                            label: eS,
                            type: "password",
                            value: u.apiKey,
                            onChange: (e) => x({ ...u, apiKey: e.target.value }),
                            placeholder: eA,
                            hint: eL,
                            className: "flex-1",
                            autoComplete: "off",
                            spellCheck: !1,
                            autoCapitalize: "off",
                          }),
                          (0, r.jsx)("div", {
                            className: "pt-6",
                            children: (0, r.jsx)(C.$n, {
                              onClick: e_,
                              disabled: (!ez && !ek && !u.apiKey) || (eg && !u.cx.trim()) || v || I,
                              variant: "secondary",
                              children: v ? p("checking") : eb ? ee(p, eb) : p("check"),
                            }),
                          }),
                        ],
                      }),
                    eg &&
                      (0, r.jsx)(C.pd, {
                        label: p("searchEngineIdLabel"),
                        value: u.cx,
                        onChange: (e) => x({ ...u, cx: e.target.value }),
                        placeholder: "012345678901234567890:abc123xyz",
                        hint: p("searchEngineIdHint"),
                      }),
                    k &&
                      (0, r.jsx)(C.Ex, {
                        variant: "success" === k ? "success" : "error",
                        children: "success" === k ? p("valid") : p("invalid"),
                      }),
                    (0, r.jsxs)("button", {
                      type: "button",
                      className:
                        "text-sm text-text-muted hover:text-text-primary flex items-center gap-1",
                      onClick: () => B(!z),
                      "aria-expanded": z,
                      "aria-controls": "edit-connection-advanced-settings",
                      children: [
                        (0, r.jsx)("span", {
                          className: `transition-transform ${z ? "rotate-90" : ""}`,
                          "aria-hidden": "true",
                          children: "▶",
                        }),
                        p("advancedSettings"),
                      ],
                    }),
                    z &&
                      (0, r.jsxs)("div", {
                        id: "edit-connection-advanced-settings",
                        className: "flex flex-col gap-3 pl-2 border-l-2 border-border",
                        children: [
                          (0, r.jsx)(C.pd, {
                            label: p("customUserAgentLabel"),
                            value: u.customUserAgent,
                            onChange: (e) => x({ ...u, customUserAgent: e.target.value }),
                            placeholder: "my-app/1.0",
                            hint: p("customUserAgentHint"),
                          }),
                          (0, r.jsx)(C.lM, {
                            size: "sm",
                            checked: u.passthroughModels,
                            onChange: (e) => x({ ...u, passthroughModels: e }),
                            label: p("perModelQuotaLabel"),
                            description: p("perModelQuotaDescription"),
                          }),
                          "bailian-coding-plan" === t.provider &&
                            (0, r.jsx)(C.pd, {
                              label: p("consoleApiKeyOracleLabel"),
                              value: u.consoleApiKey,
                              onChange: (e) => x({ ...u, consoleApiKey: e.target.value }),
                              placeholder: p("consoleApiKeyOraclePlaceholder"),
                              hint: p("consoleApiKeyOracleHint"),
                              type: "password",
                            }),
                        ],
                      }),
                    (0, r.jsx)(C.pd, {
                      label: p("validationModelIdLabel"),
                      placeholder: p("validationModelIdPlaceholder"),
                      value: u.validationModelId,
                      onChange: (e) => x({ ...u, validationModelId: e.target.value }),
                      hint: p("validationModelIdHint"),
                    }),
                  ],
                }),
              W &&
                (0, r.jsx)(C.pd, {
                  label: p("baseUrlLabel"),
                  value: u.baseUrl,
                  onChange: (e) => x({ ...u, baseUrl: e.target.value }),
                  placeholder: eE(t.provider),
                  hint: eP(t.provider, p),
                }),
              er &&
                (0, r.jsx)(C.pd, {
                  label: p("regionLabel"),
                  value: u.region,
                  onChange: (e) => x({ ...u, region: e.target.value }),
                  placeholder: ew,
                  hint: p("regionHint"),
                }),
              ei &&
                (0, r.jsx)(C.pd, {
                  label: p("accountIdLabel"),
                  value: u.accountId,
                  onChange: (e) => x({ ...u, accountId: e.target.value }),
                  placeholder: p("accountIdPlaceholder"),
                  hint: p("accountIdHint"),
                }),
              el &&
                (0, r.jsxs)("div", {
                  children: [
                    (0, r.jsx)("label", {
                      className: "text-sm font-medium text-text-main mb-1 block",
                      children: p("apiRegionLabel"),
                    }),
                    (0, r.jsxs)("select", {
                      value: u.apiRegion,
                      onChange: (e) => x({ ...u, apiRegion: e.target.value }),
                      className:
                        "w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary",
                      children: [
                        (0, r.jsx)("option", {
                          value: "international",
                          children: p("apiRegionInternational"),
                        }),
                        (0, r.jsx)("option", { value: "china", children: p("apiRegionChina") }),
                      ],
                    }),
                    (0, r.jsx)("p", {
                      className: "text-xs text-text-muted mt-1",
                      children: p("apiRegionHint"),
                    }),
                  ],
                }),
              !eH &&
                t?.apiKey &&
                (0, r.jsxs)("div", {
                  className: "flex flex-col gap-2",
                  children: [
                    (0, r.jsx)("label", {
                      className: "text-sm font-medium text-text-main",
                      children: p("apiKeyHealthLabel"),
                    }),
                    (0, r.jsx)("div", {
                      className: "flex flex-col gap-1.5",
                      children:
                        ((o = R.primary),
                        (n =
                          o?.status === "invalid"
                            ? "text-red-400"
                            : o?.status === "warning"
                              ? "text-yellow-400"
                              : "text-text-muted"),
                        (d =
                          o?.status === "invalid"
                            ? "\uD83D\uDD34"
                            : o?.status === "warning"
                              ? "\uD83D\uDFE1"
                              : "\uD83D\uDFE2"),
                        (c =
                          o?.status === "invalid"
                            ? p("apiKeyStatusInvalid")
                            : o?.status === "warning"
                              ? p("apiKeyStatusWarning", { count: o.failures })
                              : p("apiKeyStatusActive")),
                        (0, r.jsxs)("div", {
                          className: "flex items-center gap-2",
                          children: [
                            (0, r.jsxs)("span", {
                              className: `flex-1 font-mono text-xs bg-sidebar/50 px-3 py-2 rounded border border-border truncate ${n}`,
                              children: [
                                d,
                                " ",
                                p("primaryKey"),
                                ": ",
                                t.apiKey.slice(0, 6),
                                "...",
                                t.apiKey.slice(-4),
                              ],
                            }),
                            o &&
                              (0, r.jsxs)("span", {
                                className: "text-[10px] text-text-muted whitespace-nowrap",
                                title: c,
                                children: [
                                  o.failures,
                                  "x",
                                  o.lastFailure ? ` \xb7 ${es(o.lastFailure)}` : "",
                                  null != o.totalRequests
                                    ? ` \xb7 (${o.totalRequests} req${null != o.totalFailures ? `, ${o.totalFailures} fail` : ""})`
                                    : "",
                                ],
                              }),
                          ],
                        })),
                    }),
                  ],
                }),
              !eH &&
                (0, r.jsxs)("div", {
                  className: "flex flex-col gap-2",
                  children: [
                    (0, r.jsxs)("div", {
                      className: "flex items-center justify-between gap-2",
                      children: [
                        (0, r.jsxs)("label", {
                          className: "text-sm font-medium text-text-main",
                          children: [
                            p("extraApiKeysLabel"),
                            (0, r.jsxs)("span", {
                              className: "ml-2 text-[11px] font-normal text-text-muted",
                              children: ["(", p("extraApiKeysHint"), ")"],
                            }),
                          ],
                        }),
                        $.length > 0 &&
                          (0, r.jsx)("button", {
                            type: "button",
                            onClick: () => D([]),
                            className:
                              "px-2.5 py-1.5 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 text-xs font-medium transition-colors",
                            children: p("deleteAllExtraApiKeys"),
                          }),
                      ],
                    }),
                    $.length > 0 &&
                      (0, r.jsx)("div", {
                        className: "flex flex-col gap-1.5",
                        children: $.map((e, t) => {
                          let a = R[`extra_${t}`],
                            l =
                              a?.status === "invalid"
                                ? "text-red-400"
                                : a?.status === "warning"
                                  ? "text-yellow-400"
                                  : "text-text-muted",
                            i =
                              a?.status === "invalid"
                                ? "\uD83D\uDD34"
                                : a?.status === "warning"
                                  ? "\uD83D\uDFE1"
                                  : "\uD83D\uDFE2",
                            o =
                              a?.status === "invalid"
                                ? p("apiKeyStatusInvalid")
                                : a?.status === "warning"
                                  ? p("apiKeyStatusWarning", { count: a.failures })
                                  : p("apiKeyStatusActive");
                          return (0, r.jsxs)(
                            "div",
                            {
                              className: "flex items-center gap-2",
                              children: [
                                (0, r.jsxs)("span", {
                                  className: `flex-1 font-mono text-xs bg-sidebar/50 px-3 py-2 rounded border border-border truncate ${l}`,
                                  children: [
                                    i,
                                    " ",
                                    p("extraApiKeyMasked", {
                                      index: t + 2,
                                      prefix: e.slice(0, 6),
                                      suffix: e.slice(-4),
                                    }),
                                  ],
                                }),
                                (0, r.jsxs)("div", {
                                  className: "flex items-center gap-1",
                                  children: [
                                    a &&
                                      (0, r.jsxs)("span", {
                                        className: "text-[10px] text-text-muted whitespace-nowrap",
                                        title: o,
                                        children: [
                                          a.failures,
                                          "x",
                                          a.lastFailure ? ` \xb7 ${es(a.lastFailure)}` : "",
                                          null != a.totalRequests
                                            ? ` \xb7 (${a.totalRequests} req${null != a.totalFailures ? `, ${a.totalFailures} fail` : ""})`
                                            : "",
                                        ],
                                      }),
                                    (0, r.jsx)("button", {
                                      onClick: () => D($.filter((e, a) => a !== t)),
                                      className:
                                        "p-1.5 rounded hover:bg-red-500/10 text-red-400 hover:text-red-500",
                                      title: p("removeThisKey"),
                                      children: (0, r.jsx)("span", {
                                        className: "material-symbols-outlined text-[16px]",
                                        children: "close",
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            },
                            t
                          );
                        }),
                      }),
                    (0, r.jsxs)("div", {
                      className: "flex gap-2",
                      children: [
                        (0, r.jsx)("input", {
                          type: "password",
                          value: F,
                          onChange: (e) => _(e.target.value),
                          placeholder: p("addAnotherApiKey"),
                          className:
                            "flex-1 text-sm bg-sidebar/50 border border-border rounded px-3 py-2 text-text-main placeholder:text-text-muted focus:ring-1 focus:ring-primary outline-none",
                          onKeyDown: (e) => {
                            "Enter" === e.key && F.trim() && (D([...$, F.trim()]), _(""));
                          },
                          onPaste: (e) => {
                            let t = e.clipboardData.getData("text");
                            /\r?\n/.test(t) &&
                              (e.preventDefault(),
                              ((e) => {
                                let { added: t, duplicates: a } = (function (e, t) {
                                  let a = new Set(t),
                                    r = new Set(),
                                    l = [],
                                    i = 0;
                                  for (let t of e.split(/\r?\n/)) {
                                    let e = t.trim();
                                    e && (a.has(e) || r.has(e) ? i++ : (r.add(e), l.push(e)));
                                  }
                                  return { added: l, duplicates: i };
                                })(e, $);
                                (t.length > 0 &&
                                  (D((e) => [...e, ...t]),
                                  m.success(p("bulkPasteAdded", { count: t.length }))),
                                  a > 0 &&
                                    m.warning(p("bulkPasteDuplicatesIgnored", { count: a })));
                              })(t));
                          },
                        }),
                        (0, r.jsx)("button", {
                          onClick: () => {
                            F.trim() && (D([...$, F.trim()]), _(""));
                          },
                          disabled: !F.trim(),
                          className:
                            "px-3 py-2 rounded bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-40 text-sm font-medium",
                          children: p("add"),
                        }),
                      ],
                    }),
                    (0, r.jsx)("p", {
                      className: "text-[11px] text-text-muted",
                      children: p("bulkPasteHint"),
                    }),
                    $.length > 0 &&
                      (0, r.jsx)("p", {
                        className: "text-[11px] text-text-muted",
                        children: p("totalKeysRotating", { count: $.length + 1 }),
                      }),
                  ],
                }),
              !ez &&
                (0, r.jsxs)("div", {
                  className: "flex items-center gap-3",
                  children: [
                    (0, r.jsx)(C.$n, {
                      onClick: eU,
                      variant: "secondary",
                      disabled: h,
                      children: h ? p("testing") : p("testConnection"),
                    }),
                    g &&
                      (0, r.jsxs)(r.Fragment, {
                        children: [
                          (0, r.jsx)(C.Ex, {
                            variant: g.valid ? "success" : "error",
                            children: g.valid ? p("valid") : p("failed"),
                          }),
                          eB && (0, r.jsx)(C.Ex, { variant: eB.variant, children: p(eB.labelKey) }),
                        ],
                      }),
                  ],
                }),
              (0, r.jsxs)("div", {
                className: "flex gap-2",
                children: [
                  (0, r.jsx)(C.$n, {
                    onClick: eR,
                    fullWidth: !0,
                    disabled: I || (eg && !u.cx.trim()),
                    children: I ? p("saving") : p("save"),
                  }),
                  (0, r.jsx)(C.$n, {
                    onClick: i,
                    variant: "ghost",
                    fullWidth: !0,
                    children: p("cancel"),
                  }),
                ],
              }),
            ],
          }),
        });
      }
      function eG({
        isOpen: e,
        node: t,
        onSave: a,
        onClose: i,
        isAnthropic: o,
        isCcCompatible: n,
      }) {
        let d = (0, s.c)("providers"),
          [c, p] = (0, l.useState)({
            name: "",
            prefix: "",
            apiType: "chat",
            baseUrl: "https://api.openai.com/v1",
            chatPath: "",
            modelsPath: "",
          }),
          [m, u] = (0, l.useState)(!1),
          [x, h] = (0, l.useState)(""),
          [f, g] = (0, l.useState)(!1),
          [b, y] = (0, l.useState)(null),
          [v, j] = (0, l.useState)(!1);
        (0, l.useEffect)(() => {
          t &&
            (p({
              name: t.name || "",
              prefix: t.prefix || "",
              apiType: t.apiType || "chat",
              baseUrl:
                t.baseUrl ||
                (n
                  ? "https://api.anthropic.com"
                  : o
                    ? "https://api.anthropic.com/v1"
                    : "https://api.openai.com/v1"),
              chatPath: t.chatPath || (n ? en : ""),
              modelsPath: n ? "" : t.modelsPath || "",
            }),
            j(!!(t.chatPath || (!n && t.modelsPath) || (n && !t.chatPath))));
        }, [t, o, n]);
        let k = [
            { value: "chat", label: d("chatCompletions") },
            { value: "responses", label: d("responsesApi") },
            { value: "embeddings", label: d("embeddings") },
            { value: "audio-transcriptions", label: d("audioTranscriptions") },
            { value: "audio-speech", label: d("audioSpeech") },
            { value: "images-generations", label: d("imagesGenerations") },
          ],
          N = async () => {
            if (c.name.trim() && c.prefix.trim() && c.baseUrl.trim()) {
              u(!0);
              try {
                let e = {
                  name: c.name,
                  prefix: c.prefix,
                  baseUrl: c.baseUrl,
                  chatPath: c.chatPath || (n ? en : ""),
                  modelsPath: n ? "" : c.modelsPath,
                };
                (o || (e.apiType = c.apiType), await a(e));
              } finally {
                u(!1);
              }
            }
          },
          w = async () => {
            g(!0);
            try {
              let e = await fetch("/api/provider-nodes/validate", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    baseUrl: c.baseUrl,
                    apiKey: x,
                    type: o ? "anthropic-compatible" : "openai-compatible",
                    compatMode: n ? "cc" : void 0,
                    chatPath: c.chatPath || (n ? en : ""),
                    modelsPath: n ? "" : c.modelsPath,
                  }),
                }),
                t = await e.json();
              y(t.valid ? "success" : "failed");
            } catch {
              y("failed");
            } finally {
              g(!1);
            }
          };
        return t
          ? (0, r.jsx)(C.aF, {
              isOpen: e,
              title: n
                ? d("ccCompatibleDetailsTitle")
                : d("editCompatibleTitle", { type: d(o ? "anthropic" : "openai") }),
              onClose: i,
              children: (0, r.jsxs)("div", {
                className: "flex flex-col gap-4",
                children: [
                  n &&
                    (0, r.jsx)("div", {
                      className:
                        "rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-sm text-text-muted",
                      children: (0, r.jsxs)("div", {
                        className: "flex items-start gap-2",
                        children: [
                          (0, r.jsx)("span", {
                            className:
                              "material-symbols-outlined mt-0.5 text-[18px] text-amber-500",
                            children: "warning",
                          }),
                          (0, r.jsx)("p", { children: d("ccCompatibleValidationHint") }),
                        ],
                      }),
                    }),
                  (0, r.jsx)(C.pd, {
                    label: d("nameLabel"),
                    value: c.name,
                    onChange: (e) => p({ ...c, name: e.target.value }),
                    placeholder: n
                      ? d("ccCompatibleNamePlaceholder")
                      : d("compatibleProdPlaceholder", { type: d(o ? "anthropic" : "openai") }),
                    hint: d(n ? "ccCompatibleNameHint" : "nameHint"),
                  }),
                  (0, r.jsx)(C.pd, {
                    label: d("prefixLabel"),
                    value: c.prefix,
                    onChange: (e) => p({ ...c, prefix: e.target.value }),
                    placeholder: d(
                      n
                        ? "ccCompatiblePrefixPlaceholder"
                        : o
                          ? "anthropicPrefixPlaceholder"
                          : "openaiPrefixPlaceholder"
                    ),
                    hint: d(n ? "ccCompatiblePrefixHint" : "prefixHint"),
                  }),
                  !o &&
                    (0, r.jsx)(C.l6, {
                      label: d("apiTypeLabel"),
                      options: k,
                      value: c.apiType,
                      onChange: (e) => p({ ...c, apiType: e.target.value }),
                    }),
                  (0, r.jsx)(C.pd, {
                    label: d("baseUrlLabel"),
                    value: c.baseUrl,
                    onChange: (e) => p({ ...c, baseUrl: e.target.value }),
                    placeholder: d(
                      n
                        ? "ccCompatibleBaseUrlPlaceholder"
                        : o
                          ? "anthropicBaseUrlPlaceholder"
                          : "openaiBaseUrlPlaceholder"
                    ),
                    hint: n
                      ? d("ccCompatibleBaseUrlHint")
                      : d("compatibleBaseUrlHint", { type: d(o ? "anthropic" : "openai") }),
                  }),
                  (0, r.jsxs)("button", {
                    type: "button",
                    className:
                      "text-sm text-text-muted hover:text-text-primary flex items-center gap-1",
                    onClick: () => j(!v),
                    "aria-expanded": v,
                    "aria-controls": "advanced-settings",
                    children: [
                      (0, r.jsx)("span", {
                        className: `transition-transform ${v ? "rotate-90" : ""}`,
                        "aria-hidden": "true",
                        children: "▶",
                      }),
                      d("advancedSettings"),
                    ],
                  }),
                  v &&
                    (0, r.jsxs)("div", {
                      id: "advanced-settings",
                      className: "flex flex-col gap-3 pl-2 border-l-2 border-border",
                      children: [
                        (0, r.jsx)(C.pd, {
                          label: d("chatPathLabel"),
                          value: c.chatPath,
                          onChange: (e) => p({ ...c, chatPath: e.target.value }),
                          placeholder: n ? en : o ? "/messages" : d("chatPathPlaceholder"),
                          hint: d(n ? "ccCompatibleChatPathHint" : "chatPathHint"),
                        }),
                        !n &&
                          (0, r.jsx)(C.pd, {
                            label: d("modelsPathLabel"),
                            value: c.modelsPath,
                            onChange: (e) => p({ ...c, modelsPath: e.target.value }),
                            placeholder: d("modelsPathPlaceholder"),
                            hint: d("modelsPathHint"),
                          }),
                      ],
                    }),
                  (0, r.jsxs)("div", {
                    className: "flex gap-2",
                    children: [
                      (0, r.jsx)(C.pd, {
                        label: d("apiKeyForCheck"),
                        type: "password",
                        value: x,
                        onChange: (e) => h(e.target.value),
                        className: "flex-1",
                      }),
                      (0, r.jsx)("div", {
                        className: "pt-6",
                        children: (0, r.jsx)(C.$n, {
                          onClick: w,
                          disabled: !x || f || !c.baseUrl.trim(),
                          variant: "secondary",
                          children: d(f ? "checking" : "check"),
                        }),
                      }),
                    ],
                  }),
                  b &&
                    (0, r.jsx)(C.Ex, {
                      variant: "success" === b ? "success" : "error",
                      children: d("success" === b ? "valid" : "invalid"),
                    }),
                  (0, r.jsxs)("div", {
                    className: "flex gap-2",
                    children: [
                      (0, r.jsx)(C.$n, {
                        onClick: N,
                        fullWidth: !0,
                        disabled: !c.name.trim() || !c.prefix.trim() || !c.baseUrl.trim() || m,
                        children: d(m ? "saving" : "save"),
                      }),
                      (0, r.jsx)(C.$n, {
                        onClick: i,
                        variant: "ghost",
                        fullWidth: !0,
                        children: d("cancel"),
                      }),
                    ],
                  }),
                ],
              }),
            })
          : null;
      }
      function eZ(e) {
        try {
          let t = e && "object" == typeof e ? e : null;
          if (!t || !t.access_token || !t.refresh_token || !t.id_token)
            return { valid: !1, email: null };
          let a =
            "string" == typeof t.id_token
              ? (function (e) {
                  try {
                    let t = e.split(".");
                    if (3 !== t.length) return null;
                    let a = JSON.parse(W.from(t[1], "base64url").toString("utf8"));
                    return "string" == typeof a.email ? a.email : null;
                  } catch {
                    return null;
                  }
                })(t.id_token)
              : null;
          return { valid: !0, email: a };
        } catch {
          return { valid: !1, email: null };
        }
      }
      function eW({ onClose: e, onSuccess: t }) {
        let a = (0, s.c)("providers"),
          i = (0, y.i)(),
          [o, n] = (0, l.useState)("single"),
          [d, c] = (0, l.useState)("upload"),
          [p, m] = (0, l.useState)("upload"),
          [u, x] = (0, l.useState)(null),
          [h, f] = (0, l.useState)(""),
          [g, b] = (0, l.useState)(""),
          [v, j] = (0, l.useState)(""),
          [k, N] = (0, l.useState)(!1),
          [w, S] = (0, l.useState)(!1),
          [A, I] = (0, l.useState)([]),
          [T, M] = (0, l.useState)(""),
          [P, E] = (0, l.useState)(!1),
          [O, $] = (0, l.useState)([]),
          [D, L] = (0, l.useState)(null),
          [F, U] = (0, l.useState)(!1),
          _ = async () => {
            if (!w) {
              S(!0);
              try {
                let e =
                    "paste" === d
                      ? {
                          source: { kind: "text", text: h },
                          name: g || void 0,
                          email: v || void 0,
                          overwriteExisting: k,
                        }
                      : {
                          source: { kind: "json", json: u },
                          name: g || void 0,
                          email: v || void 0,
                          overwriteExisting: k,
                        },
                  r = await fetch("/api/providers/gemini-cli-auth/import", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(e),
                  }),
                  l = await r.json().catch(() => ({}));
                if (!r.ok)
                  return void ("duplicate_account" === l.code
                    ? i.error(
                        "function" == typeof a.has && a.has("geminiImportDuplicate")
                          ? a("geminiImportDuplicate")
                          : 'Account already exists — enable "Replace existing" to overwrite'
                      )
                    : "identity_unverified" === l.code
                      ? i.error(
                          "function" == typeof a.has && a.has("geminiImportIdentityUnverified")
                            ? a("geminiImportIdentityUnverified")
                            : 'Could not verify identity from id_token. Enable "Replace existing" or provide an email.'
                        )
                      : i.error(
                          l.error ||
                            ("function" == typeof a.has && a.has("geminiImportFailed")
                              ? a("geminiImportFailed")
                              : "Failed to import Gemini auth")
                        ));
                let o = eZ(u);
                (i.success(
                  "function" == typeof a.has && a.has("geminiImportSuccess")
                    ? a("geminiImportSuccess")
                    : `Gemini connection imported successfully${o.email ? ` (${o.email})` : ""}`
                ),
                  t());
              } catch {
                i.error(
                  "function" == typeof a.has && a.has("geminiImportFailed")
                    ? a("geminiImportFailed")
                    : "Failed to import Gemini auth"
                );
              } finally {
                S(!1);
              }
            }
          },
          R = async (e) => {
            let t = e.target.files?.[0];
            if (t) {
              U(!0);
              try {
                let e = await fetch("/api/providers/gemini-cli-auth/zip-extract", {
                    method: "POST",
                    headers: { "Content-Type": "application/zip" },
                    body: t,
                  }),
                  r = await e.json().catch(() => ({}));
                if (!e.ok)
                  return void i.error(
                    r.error ||
                      ("function" == typeof a.has && a.has("geminiImportBulkZipError")
                        ? a("geminiImportBulkZipError")
                        : "Failed to extract ZIP")
                  );
                let l = (r.entries || []).map((e) => {
                  let { email: t } = eZ(e.json);
                  return { name: e.name, json: e.json, parseError: e.parseError, email: t };
                });
                I(l);
              } catch {
                i.error(
                  "function" == typeof a.has && a.has("geminiImportBulkZipError")
                    ? a("geminiImportBulkZipError")
                    : "Failed to extract ZIP"
                );
              } finally {
                U(!1);
              }
            }
          },
          H = async () => {
            if (!P) {
              (E(!0), $([]), L(null));
              try {
                let e = A.filter((e) => null !== e.json);
                if (0 === e.length) return void i.error("No valid entries to import");
                let r = await fetch("/api/providers/gemini-cli-auth/import-bulk", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      entries: e.map((e) => ({
                        json: e.json,
                        name: e.name,
                        email: e.email || void 0,
                      })),
                      overwriteExisting: k,
                    }),
                  }),
                  l = await r.json().catch(() => ({}));
                if (!r.ok)
                  return void i.error(
                    l.error ||
                      ("function" == typeof a.has && a.has("geminiImportBulkFailed")
                        ? a("geminiImportBulkFailed")
                        : "Some entries failed to import")
                  );
                (L({ success: l.success, failed: l.failed, total: l.total }),
                  l.errors?.length > 0 && $(l.errors),
                  l.success > 0 &&
                    (i.success(
                      "function" == typeof a.has && a.has("geminiImportBulkSuccess")
                        ? a("geminiImportBulkSuccess", { count: l.success })
                        : `Imported ${l.success} Gemini connections`
                    ),
                    0 === l.failed && t()));
              } catch {
                i.error(
                  "function" == typeof a.has && a.has("geminiImportBulkFailed")
                    ? a("geminiImportBulkFailed")
                    : "Some entries failed to import"
                );
              } finally {
                E(!1);
              }
            }
          },
          z = {
            single:
              "function" == typeof a.has && a.has("geminiImportTabSingle")
                ? a("geminiImportTabSingle")
                : "Single",
            bulk:
              "function" == typeof a.has && a.has("geminiImportTabBulk")
                ? a("geminiImportTabBulk")
                : "Bulk",
          },
          B =
            "function" == typeof a.has && a.has("geminiImportModalTitle")
              ? a("geminiImportModalTitle")
              : "Import Gemini Auth";
        return (0, r.jsx)(C.aF, {
          isOpen: !0,
          onClose: e,
          title: B,
          children: (0, r.jsxs)("div", {
            className: "flex flex-col gap-4",
            children: [
              (0, r.jsx)("div", {
                className: "flex gap-1 border-b border-border pb-0",
                children: ["single", "bulk"].map((e) =>
                  (0, r.jsx)(
                    "button",
                    {
                      onClick: () => n(e),
                      className: `px-3 py-1.5 text-sm rounded-t-md transition-colors ${o === e ? "bg-primary/10 text-primary border-b-2 border-primary" : "text-text-muted hover:text-text-primary"}`,
                      children: z[e],
                    },
                    e
                  )
                ),
              }),
              "single" === o &&
                (0, r.jsxs)("div", {
                  className: "flex flex-col gap-3",
                  children: [
                    (0, r.jsx)("div", {
                      className: "flex gap-1",
                      children: ["upload", "paste"].map((e) =>
                        (0, r.jsx)(
                          "button",
                          {
                            onClick: () => c(e),
                            className: `px-2 py-1 text-xs rounded transition-colors ${d === e ? "bg-bg-subtle text-text-primary" : "text-text-muted hover:text-text-primary"}`,
                            children:
                              "upload" === e
                                ? "function" == typeof a.has && a.has("geminiImportTabUpload")
                                  ? a("geminiImportTabUpload")
                                  : "Upload file"
                                : "function" == typeof a.has && a.has("geminiImportTabPaste")
                                  ? a("geminiImportTabPaste")
                                  : "Paste JSON",
                          },
                          e
                        )
                      ),
                    }),
                    "upload" === d
                      ? (0, r.jsxs)("div", {
                          children: [
                            (0, r.jsx)("label", {
                              className: "block text-xs text-text-muted mb-1",
                              children:
                                "function" == typeof a.has && a.has("geminiImportFileLabel")
                                  ? a("geminiImportFileLabel")
                                  : "Choose oauth_creds.json",
                            }),
                            (0, r.jsx)("input", {
                              type: "file",
                              accept: ".json",
                              onChange: (e) => {
                                let t = e.target.files?.[0];
                                if (!t) return;
                                let r = new FileReader();
                                ((r.onload = (e) => {
                                  try {
                                    let t = JSON.parse(e.target?.result);
                                    x(t);
                                  } catch {
                                    i.error(
                                      "function" == typeof a.has && a.has("geminiImportInvalidJson")
                                        ? a("geminiImportInvalidJson")
                                        : "Could not parse the file as JSON"
                                    );
                                  }
                                }),
                                  r.readAsText(t));
                              },
                              className: "block w-full text-sm",
                            }),
                            u &&
                              eZ(u).valid &&
                              (0, r.jsxs)("p", {
                                className: "mt-1 text-xs text-emerald-500",
                                children: [
                                  "Valid Gemini OAuth credentials",
                                  eZ(u).email ? ` (${eZ(u).email})` : "",
                                ],
                              }),
                            u &&
                              !eZ(u).valid &&
                              (0, r.jsx)("p", {
                                className: "mt-1 text-xs text-red-500",
                                children:
                                  "function" == typeof a.has && a.has("geminiImportInvalidShape")
                                    ? a("geminiImportInvalidShape")
                                    : "The file is not a valid oauth_creds.json",
                              }),
                          ],
                        })
                      : (0, r.jsxs)("div", {
                          children: [
                            (0, r.jsx)("label", {
                              className: "block text-xs text-text-muted mb-1",
                              children:
                                "function" == typeof a.has && a.has("geminiImportPasteLabel")
                                  ? a("geminiImportPasteLabel")
                                  : "Paste the JSON content",
                            }),
                            (0, r.jsx)("textarea", {
                              value: h,
                              onChange: (e) => f(e.target.value),
                              rows: 6,
                              className:
                                "w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs font-mono text-text-main",
                              placeholder:
                                '{ "access_token": "...", "refresh_token": "...", "id_token": "..." }',
                            }),
                          ],
                        }),
                    (0, r.jsxs)("div", {
                      className: "grid grid-cols-2 gap-2",
                      children: [
                        (0, r.jsxs)("div", {
                          children: [
                            (0, r.jsx)("label", {
                              className: "block text-xs text-text-muted mb-1",
                              children:
                                "function" == typeof a.has && a.has("geminiImportEmailLabel")
                                  ? a("geminiImportEmailLabel")
                                  : "Account email",
                            }),
                            (0, r.jsx)("input", {
                              type: "email",
                              value: v,
                              onChange: (e) => j(e.target.value),
                              placeholder: "auto-detected from id_token",
                              className:
                                "w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs text-text-main",
                            }),
                          ],
                        }),
                        (0, r.jsxs)("div", {
                          children: [
                            (0, r.jsx)("label", {
                              className: "block text-xs text-text-muted mb-1",
                              children:
                                "function" == typeof a.has && a.has("geminiImportNameLabel")
                                  ? a("geminiImportNameLabel")
                                  : "Connection name (optional)",
                            }),
                            (0, r.jsx)("input", {
                              type: "text",
                              value: g,
                              onChange: (e) => b(e.target.value),
                              placeholder: "My Gemini account",
                              className:
                                "w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs text-text-main",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, r.jsxs)("label", {
                      className: "flex items-center gap-2 text-xs text-text-muted",
                      children: [
                        (0, r.jsx)("input", {
                          type: "checkbox",
                          checked: k,
                          onChange: (e) => N(e.target.checked),
                        }),
                        "function" == typeof a.has && a.has("geminiImportOverwriteLabel")
                          ? a("geminiImportOverwriteLabel")
                          : "Replace existing connection if account already exists",
                      ],
                    }),
                    (0, r.jsx)(C.$n, {
                      loading: w,
                      onClick: _,
                      disabled: "upload" === d ? !u : !h.trim(),
                      children:
                        "function" == typeof a.has && a.has("geminiImportSubmit")
                          ? a("geminiImportSubmit")
                          : "Import",
                    }),
                  ],
                }),
              "bulk" === o &&
                (0, r.jsxs)("div", {
                  className: "flex flex-col gap-3",
                  children: [
                    (0, r.jsx)("div", {
                      className: "flex gap-1",
                      children: ["upload", "paste", "zip"].map((e) =>
                        (0, r.jsx)(
                          "button",
                          {
                            onClick: () => {
                              (m(e), I([]));
                            },
                            className: `px-2 py-1 text-xs rounded transition-colors ${p === e ? "bg-bg-subtle text-text-primary" : "text-text-muted hover:text-text-primary"}`,
                            children:
                              "upload" === e
                                ? "function" == typeof a.has && a.has("geminiImportBulkModeUpload")
                                  ? a("geminiImportBulkModeUpload")
                                  : "Upload files"
                                : "paste" === e
                                  ? "function" == typeof a.has && a.has("geminiImportBulkModePaste")
                                    ? a("geminiImportBulkModePaste")
                                    : "Paste JSON array"
                                  : "function" == typeof a.has && a.has("geminiImportBulkModeZip")
                                    ? a("geminiImportBulkModeZip")
                                    : "Upload ZIP",
                          },
                          e
                        )
                      ),
                    }),
                    "upload" === p &&
                      (0, r.jsxs)("div", {
                        children: [
                          (0, r.jsx)("p", {
                            className: "text-xs text-text-muted mb-1",
                            children:
                              "function" == typeof a.has && a.has("geminiImportBulkUploadHint")
                                ? a("geminiImportBulkUploadHint")
                                : "Drop or pick up to 50 oauth_creds.json files (256KB each, 10MB total).",
                          }),
                          (0, r.jsx)("input", {
                            type: "file",
                            accept: ".json",
                            multiple: !0,
                            onChange: (e) => {
                              let t = Array.from(e.target.files || []),
                                a = [],
                                r = t.length;
                              r &&
                                t.forEach((e) => {
                                  let t = new FileReader();
                                  ((t.onload = (t) => {
                                    try {
                                      let r = JSON.parse(t.target?.result),
                                        { email: l } = eZ(r);
                                      a.push({
                                        name: e.name.replace(/\.json$/, ""),
                                        json: r,
                                        parseError: null,
                                        email: l,
                                      });
                                    } catch {
                                      a.push({
                                        name: e.name,
                                        json: null,
                                        parseError: "Not valid JSON",
                                        email: null,
                                      });
                                    }
                                    0 == --r && I((e) => [...e, ...a]);
                                  }),
                                    t.readAsText(e));
                                });
                            },
                            className: "block w-full text-sm",
                          }),
                        ],
                      }),
                    "paste" === p &&
                      (0, r.jsxs)("div", {
                        children: [
                          (0, r.jsx)("p", {
                            className: "text-xs text-text-muted mb-1",
                            children:
                              "function" == typeof a.has && a.has("geminiImportBulkPasteHint")
                                ? a("geminiImportBulkPasteHint")
                                : "Paste an array of objects: [{ json, name?, email? }, ...]",
                          }),
                          (0, r.jsx)("textarea", {
                            value: T,
                            onChange: (e) =>
                              ((e) => {
                                M(e);
                                let t = e.trim();
                                if (!t) return void I([]);
                                try {
                                  let e = JSON.parse(t);
                                  if (Array.isArray(e))
                                    I(
                                      e.map((e, t) => {
                                        let { email: a } = eZ(e);
                                        return {
                                          name: a || `entry ${t + 1}`,
                                          json: e,
                                          parseError: null,
                                          email: a,
                                        };
                                      })
                                    );
                                  else {
                                    let { email: t } = eZ(e);
                                    I([
                                      { name: t || "entry 1", json: e, parseError: null, email: t },
                                    ]);
                                  }
                                } catch {
                                  I([
                                    {
                                      name: "parse error",
                                      json: null,
                                      parseError: "Invalid JSON",
                                      email: null,
                                    },
                                  ]);
                                }
                              })(e.target.value),
                            rows: 6,
                            className:
                              "w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs font-mono text-text-main",
                            placeholder: "[{ ... }, { ... }]",
                          }),
                        ],
                      }),
                    "zip" === p &&
                      (0, r.jsxs)("div", {
                        children: [
                          (0, r.jsx)("p", {
                            className: "text-xs text-text-muted mb-1",
                            children:
                              "function" == typeof a.has && a.has("geminiImportBulkZipHint")
                                ? a("geminiImportBulkZipHint")
                                : "ZIP containing oauth_creds.json entries. Max 50 entries, 10MB unpacked.",
                          }),
                          F
                            ? (0, r.jsx)("p", {
                                className: "text-xs text-primary animate-pulse",
                                children:
                                  "function" == typeof a.has &&
                                  a.has("geminiImportBulkZipExtracting")
                                    ? a("geminiImportBulkZipExtracting")
                                    : "Extracting ZIP…",
                              })
                            : (0, r.jsx)("input", {
                                type: "file",
                                accept: ".zip",
                                onChange: R,
                                className: "block w-full text-sm",
                              }),
                        ],
                      }),
                    A.length > 0 &&
                      (0, r.jsx)("div", {
                        className:
                          "rounded border border-border bg-bg-subtle px-2 py-1.5 max-h-36 overflow-y-auto",
                        children: A.map((e, t) =>
                          (0, r.jsxs)(
                            "div",
                            {
                              className: `text-xs py-0.5 flex items-center gap-1 ${e.parseError ? "text-red-500" : "text-text-main"}`,
                              children: [
                                (0, r.jsx)("span", {
                                  className: "material-symbols-outlined text-[12px]",
                                  children: e.parseError ? "error" : "check_circle",
                                }),
                                e.name,
                                e.email ? ` (${e.email})` : "",
                                e.parseError ? ` — ${e.parseError}` : "",
                              ],
                            },
                            t
                          )
                        ),
                      }),
                    (0, r.jsxs)("label", {
                      className: "flex items-center gap-2 text-xs text-text-muted",
                      children: [
                        (0, r.jsx)("input", {
                          type: "checkbox",
                          checked: k,
                          onChange: (e) => N(e.target.checked),
                        }),
                        "function" == typeof a.has && a.has("geminiImportOverwriteLabel")
                          ? a("geminiImportOverwriteLabel")
                          : "Replace existing connection if account already exists",
                      ],
                    }),
                    D &&
                      (0, r.jsxs)("div", {
                        className: "rounded bg-bg-subtle px-2 py-1.5 text-xs",
                        children: [
                          D.success,
                          "/",
                          D.total,
                          " imported",
                          D.failed > 0 ? `, ${D.failed} failed` : "",
                        ],
                      }),
                    O.length > 0 &&
                      (0, r.jsx)("div", {
                        className:
                          "rounded border border-red-500/30 bg-red-500/5 px-2 py-1.5 max-h-28 overflow-y-auto",
                        children: O.map((e) =>
                          (0, r.jsxs)(
                            "div",
                            {
                              className: "text-xs text-red-500 py-0.5",
                              children: [e.name, ": ", e.message],
                            },
                            e.index
                          )
                        ),
                      }),
                    (0, r.jsx)(C.$n, {
                      loading: P,
                      onClick: H,
                      disabled: 0 === A.filter((e) => null !== e.json).length,
                      children:
                        "function" == typeof a.has && a.has("geminiImportBulkSubmit")
                          ? a("geminiImportBulkSubmit")
                          : "Import all",
                    }),
                  ],
                }),
            ],
          }),
        });
      }
      function eq({ connectionId: e, inProgress: t, onConfirm: a, onClose: i }) {
        let o = (0, s.c)("providers"),
          [n, d] = (0, l.useState)(!1);
        if (!e) return null;
        let c =
            "function" == typeof o.has && o.has("geminiApplyModalTitle")
              ? o("geminiApplyModalTitle")
              : "Apply to Local Gemini CLI",
          p =
            "function" == typeof o.has && o.has("geminiApplyTargetLabel")
              ? o("geminiApplyTargetLabel")
              : "Target path",
          m =
            "function" == typeof o.has && o.has("geminiApplyBackupLabel")
              ? o("geminiApplyBackupLabel")
              : "Backups",
          u =
            "function" == typeof o.has && o.has("geminiApplyWarning")
              ? o("geminiApplyWarning")
              : "This will replace the existing oauth_creds.json and update google_accounts.json. Continue?",
          x =
            "function" == typeof o.has && o.has("geminiApplyConfirmCheckbox")
              ? o("geminiApplyConfirmCheckbox")
              : "I confirm I want to replace the existing oauth_creds.json",
          h = "function" == typeof o.has && o.has("geminiApply") ? o("geminiApply") : "Apply",
          f =
            "function" == typeof o.has && o.has("geminiApplyAccountsHint")
              ? o("geminiApplyAccountsHint")
              : "The google_accounts.json active account will be updated to match this connection.";
        return (0, r.jsx)(C.aF, {
          isOpen: !!e,
          title: c,
          onClose: i,
          children: (0, r.jsxs)("div", {
            className: "flex flex-col gap-4",
            children: [
              (0, r.jsxs)("div", {
                children: [
                  (0, r.jsx)("div", {
                    className: "text-xs uppercase text-text-muted mb-1",
                    children: p,
                  }),
                  (0, r.jsx)("code", {
                    className:
                      "block rounded bg-sidebar px-2 py-1.5 text-xs font-mono text-text-main",
                    children: "~/.gemini/oauth_creds.json",
                  }),
                  (0, r.jsx)("p", {
                    className: "mt-1 text-xs text-text-muted",
                    children: "Path is auto-detected per OS (Linux/Mac).",
                  }),
                ],
              }),
              (0, r.jsxs)("div", {
                children: [
                  (0, r.jsx)("div", {
                    className: "text-xs uppercase text-text-muted mb-1",
                    children: m,
                  }),
                  (0, r.jsx)("code", {
                    className:
                      "block rounded bg-sidebar px-2 py-1.5 text-xs font-mono text-text-main",
                    children: "~/.gemini/oauth_creds-{timestamp}.bak",
                  }),
                ],
              }),
              (0, r.jsx)("div", {
                className:
                  "rounded bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-xs text-amber-400",
                children: f,
              }),
              (0, r.jsx)("p", { className: "text-sm text-text-muted", children: u }),
              (0, r.jsxs)("label", {
                className: "flex items-center gap-2 text-sm",
                children: [
                  (0, r.jsx)("input", {
                    type: "checkbox",
                    checked: n,
                    onChange: (e) => d(e.target.checked),
                  }),
                  x,
                ],
              }),
              (0, r.jsxs)("div", {
                className: "flex justify-end gap-2",
                children: [
                  (0, r.jsx)(C.$n, {
                    variant: "secondary",
                    onClick: i,
                    disabled: t,
                    children: "Cancel",
                  }),
                  (0, r.jsx)(C.$n, {
                    loading: t,
                    disabled: !n || t,
                    onClick: () => void a(e),
                    children: h,
                  }),
                ],
              }),
            ],
          }),
        });
      }
    },
  },
  (e) => {
    (e.O(
      0,
      [
        28366, 98500, 5772, 3131, 46439, 5989, 44952, 29862, 20909, 8287, 24944, 68942, 86861,
        44603, 28441, 93794, 77358,
      ],
      () => e((e.s = 56411))
    ),
      (_N_E = e.O()));
  },
]);
