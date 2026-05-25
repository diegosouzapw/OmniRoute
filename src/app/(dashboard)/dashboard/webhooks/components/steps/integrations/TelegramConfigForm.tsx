"use client";

export interface TelegramConfig {
  botToken: string;
  chatId: string;
}

interface TelegramConfigFormProps {
  value: TelegramConfig;
  onChange: (v: TelegramConfig) => void;
  t: (key: string) => string;
}

export function TelegramConfigForm({ value, onChange, t }: TelegramConfigFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-text-muted">
          {t("telegram.botToken")}
        </label>
        <input
          type="password"
          value={value.botToken}
          onChange={(e) => onChange({ ...value, botToken: e.target.value })}
          placeholder={t("telegram.botTokenPlaceholder")}
          autoComplete="new-password"
          className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <p className="mt-1 text-xs text-text-muted">{t("telegram.botTokenHint")}</p>
      </div>
      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-text-muted">
          {t("telegram.chatId")}
        </label>
        <input
          value={value.chatId}
          onChange={(e) => onChange({ ...value, chatId: e.target.value })}
          placeholder={t("telegram.chatIdPlaceholder")}
          className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <p className="mt-1 text-xs text-text-muted">{t("telegram.chatIdHint")}</p>
      </div>
      <details className="rounded-lg border border-border bg-sidebar p-3">
        <summary className="cursor-pointer text-xs font-medium text-text-muted hover:text-text-main">
          {t("telegram.tutorial")}
        </summary>
        <ol className="mt-3 space-y-1.5 text-xs text-text-muted">
          {[1, 2, 3, 4].map((n) => (
            <li key={n} className="flex gap-2">
              <span className="font-bold text-primary">{n}.</span>
              {t(`telegram.tutorialStep${n}`)}
            </li>
          ))}
        </ol>
      </details>
    </div>
  );
}
