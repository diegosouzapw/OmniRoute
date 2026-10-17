"use client";

import { useTranslations } from "next-intl";

export function isManagedProxySource(value: string): boolean {
  return (
    /^(?!https?:\/\/|socks5?:\/\/)[a-z0-9]+:\/\//i.test(value.trim()) ||
    value.trim().startsWith("{")
  );
}

type Props = {
  proxyTypes: Array<{ value: string; label: string }>;
  proxyType: string;
  setProxyType: (v: string) => void;
  host: string;
  setHost: (v: string) => void;
  port: string;
  setPort: (v: string) => void;
  username: string;
  setUsername: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  showAuth: boolean;
  setShowAuth: (v: boolean) => void;
  core: string;
  setCore: (v: string) => void;
  getDefaultPort: (type: string) => string;
};
const inputClass =
  "w-full px-3 py-2.5 rounded-lg bg-bg-subtle border border-border text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-primary";

export default function ProxyCustomFields(p: Props) {
  const t = useTranslations("proxyConfigModal");
  const managed = isManagedProxySource(p.host);
  return (
    <>
      {!managed && (
        <div>
          <label className="text-xs text-text-muted mb-1.5 block">{t("proxyType")}</label>
          <div className="flex gap-1 bg-bg-subtle rounded-lg p-1 border border-border">
            {p.proxyTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => p.setProxyType(type.value)}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium ${p.proxyType === type.value ? "bg-primary text-white shadow-sm" : "text-text-muted hover:text-text-primary"}`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-3 gap-3">
        <div className={managed ? "col-span-3" : "col-span-2"}>
          <label htmlFor="proxy-custom-host" className="text-xs text-text-muted mb-1.5 block">
            {t("host")}
          </label>
          <input
            id="proxy-custom-host"
            type="text"
            value={p.host}
            onChange={(e) => p.setHost(e.target.value)}
            placeholder={t("hostPlaceholder")}
            autoComplete="off"
            spellCheck={false}
            className={inputClass}
          />
        </div>
        {!managed && (
          <div>
            <label htmlFor="proxy-custom-port" className="text-xs text-text-muted mb-1.5 block">
              {t("port")}
            </label>
            <input
              id="proxy-custom-port"
              type="text"
              value={p.port}
              onChange={(e) => p.setPort(e.target.value)}
              placeholder={p.getDefaultPort(p.proxyType)}
              className={inputClass}
            />
          </div>
        )}
      </div>
      {managed ? (
        <div>
          <label htmlFor="proxy-managed-core" className="text-xs text-text-muted mb-1.5 block">
            Proxy core
          </label>
          <select
            id="proxy-managed-core"
            value={p.core}
            onChange={(e) => p.setCore(e.target.value)}
            className={inputClass}
          >
            <option value="">Select a core</option>
            <option value="singbox">sing-box</option>
            <option value="xray">Xray</option>
          </select>
          <p className="text-xs text-text-muted mt-2">
            Save downloads and verifies the official core if needed, checks the configuration, then
            activates this proxy. Typing does not install anything.
          </p>
        </div>
      ) : (
        <ProxyAuthFields p={p} />
      )}
    </>
  );
}

function ProxyAuthFields({ p }: { p: Props }) {
  const t = useTranslations("proxyConfigModal");
  return (
    <div>
      <button
        type="button"
        onClick={() => p.setShowAuth(!p.showAuth)}
        aria-expanded={p.showAuth}
        className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary"
      >
        <span className="material-symbols-outlined text-base">
          {p.showAuth ? "expand_less" : "expand_more"}
        </span>
        {t("authOptional")}
      </button>
      {p.showAuth && (
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <label htmlFor="proxy-custom-user" className="text-xs text-text-muted mb-1.5 block">
              {t("username")}
            </label>
            <input
              id="proxy-custom-user"
              value={p.username}
              onChange={(e) => p.setUsername(e.target.value)}
              placeholder={t("usernamePlaceholder")}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="proxy-custom-password" className="text-xs text-text-muted mb-1.5 block">
              {t("password")}
            </label>
            <input
              id="proxy-custom-password"
              type="password"
              value={p.password}
              onChange={(e) => p.setPassword(e.target.value)}
              placeholder={t("passwordPlaceholder")}
              className={inputClass}
            />
          </div>
        </div>
      )}
    </div>
  );
}
