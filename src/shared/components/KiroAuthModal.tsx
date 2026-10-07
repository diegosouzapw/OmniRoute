"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";

type KiroAuthModalProps = {
  isOpen: boolean;
  providerId?: string;
  providerLabel?: string;
  onMethodSelect: (method: string, config?: Record<string, unknown>) => void;
  onClose: () => void;
};

/**
 * Kiro Auth Method Selection Modal
 * Auto-detects token from AWS SSO cache or allows manual import
 */
export default function KiroAuthModal({
  isOpen,
  providerId = "kiro",
  providerLabel = "Kiro",
  onMethodSelect,
  onClose,
}: KiroAuthModalProps) {
  const t = useTranslations("kiroAuthModal");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [idcStartUrl, setIdcStartUrl] = useState("");
  const [idcRegion, setIdcRegion] = useState("us-east-1");
  const [refreshToken, setRefreshToken] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiKeyRegion, setApiKeyRegion] = useState("us-east-1");
  const [error, setError] = useState(null);
  const [importing, setImporting] = useState(false);
  const [importingApiKey, setImportingApiKey] = useState(false);
  const [autoDetecting, setAutoDetecting] = useState(false);

  // Reset the form when the modal closes (render-time adjustment per react.dev
  // "You Might Not Need an Effect" — replaces the old reset effect).
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setSelectedMethod(null);
      setIdcStartUrl("");
      setIdcRegion("us-east-1");
      setRefreshToken("");
      setApiKey("");
      setApiKeyRegion("us-east-1");
      setError(null);
    }
  }

  // Auto-detect token when import method is selected
  useEffect(() => {
    if (selectedMethod !== "import" || !isOpen) return;

    const autoDetect = async () => {
      setAutoDetecting(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/oauth/kiro/auto-import?targetProvider=${encodeURIComponent(providerId)}`
        );
        const data = await res.json();

        if (data.found) {
          onMethodSelect("import");
          onClose();
          return;
        } else {
          setError(data.error || t("errorAutoDetect"));
        }
      } catch (err) {
        setError(t("errorAutoDetectFailed"));
      } finally {
        setAutoDetecting(false);
      }
    };

    autoDetect();
  }, [providerId, selectedMethod, isOpen, onMethodSelect, onClose, t]);

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setError(null);
  };

  const handleBack = () => {
    setSelectedMethod(null);
    setError(null);
  };

  const handleImportToken = async () => {
    if (!refreshToken.trim()) {
      setError(t("errorRefreshTokenRequired"));
      return;
    }

    setImporting(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/oauth/kiro/import?targetProvider=${encodeURIComponent(providerId)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            refreshToken: refreshToken.trim(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || t("errorImportFailed"));
      }

      // Success - close modal
      onMethodSelect("import");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errorImportFailed"));
    } finally {
      setImporting(false);
    }
  };

  const handleImportApiKey = async () => {
    if (!apiKey.trim()) {
      setError(t("errorApiKeyRequired"));
      return;
    }

    setImportingApiKey(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/oauth/kiro/api-key?targetProvider=${encodeURIComponent(providerId)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            apiKey: apiKey.trim(),
            region: apiKeyRegion.trim() || "us-east-1",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || data.error || t("errorApiKeyImportFailed"));
      }

      onMethodSelect("api-key");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errorApiKeyImportFailed"));
    } finally {
      setImportingApiKey(false);
    }
  };

  const handleIdcContinue = () => {
    if (!idcStartUrl.trim()) {
      setError(t("errorIdcStartUrlRequired"));
      return;
    }
    onMethodSelect("idc", { startUrl: idcStartUrl.trim(), region: idcRegion });
  };

  const handleSocialLogin = (provider) => {
    onMethodSelect("social", { provider });
  };

  return (
    <Modal isOpen={isOpen} title={t("title", { providerLabel })} onClose={onClose} size="lg">
      <div className="flex flex-col gap-4">
        {/* Method Selection */}
        {!selectedMethod && (
          <div className="space-y-3">
            <p className="text-sm text-text-muted mb-4">{t("chooseMethod")}</p>

            {/* AWS Builder ID */}
            <button
              onClick={() => onMethodSelect("builder-id")}
              className="w-full p-4 text-left border border-border rounded-lg hover:bg-sidebar transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">shield</span>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{t("builderId")}</h3>
                  <p className="text-sm text-text-muted">
                    {t("builderDescription", { providerLabel })}
                  </p>
                </div>
              </div>
            </button>

            {/* AWS IAM Identity Center (IDC) */}
            <button
              onClick={() => handleMethodSelect("idc")}
              className="w-full p-4 text-left border border-border rounded-lg hover:bg-sidebar transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">business</span>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{t("organization")}</h3>
                  <p className="text-sm text-text-muted">
                    {t("organizationDescription", {
                      url: "https://your-org.awsapps.com/start",
                    })}
                  </p>
                </div>
              </div>
            </button>

            {/* Google Social Login */}
            <button
              onClick={() => handleSocialLogin("google")}
              className="w-full p-4 text-left border border-border rounded-lg hover:bg-sidebar transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">
                  account_circle
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{t("googleAccount")}</h3>
                  <p className="text-sm text-text-muted">{t("googleDescription")}</p>
                </div>
              </div>
            </button>

            {/* GitHub Social Login */}
            <button
              onClick={() => handleSocialLogin("github")}
              className="w-full p-4 text-left border border-border rounded-lg hover:bg-sidebar transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">code</span>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{t("githubAccount")}</h3>
                  <p className="text-sm text-text-muted">{t("githubDescription")}</p>
                </div>
              </div>
            </button>

            {/* Import Token */}
            <button
              onClick={() => handleMethodSelect("import")}
              className="w-full p-4 text-left border border-border rounded-lg hover:bg-sidebar transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">file_upload</span>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{t("importToken")}</h3>
                  <p className="text-sm text-text-muted">
                    {t("importDescription", { providerLabel })}
                  </p>
                </div>
              </div>
            </button>

            {/* API Key */}
            <button
              onClick={() => handleMethodSelect("api-key")}
              className="w-full p-4 text-left border border-border rounded-lg hover:bg-sidebar transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">key</span>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{t("apiKey")}</h3>
                  <p className="text-sm text-text-muted">
                    {t("apiKeyDescription", { providerLabel })}
                  </p>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* IDC Configuration */}
        {selectedMethod === "idc" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("idcStartUrl")} <span className="text-red-500">*</span>
              </label>
              <Input
                value={idcStartUrl}
                onChange={(e) => setIdcStartUrl(e.target.value)}
                placeholder={t("idcStartUrlPlaceholder")}
                className="font-mono text-sm"
              />
              <p className="text-xs text-text-muted mt-1">{t("idcStartUrlDescription")}</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t("awsRegion")}</label>
              <Input
                value={idcRegion}
                onChange={(e) => setIdcRegion(e.target.value)}
                placeholder={t("regionPlaceholder")}
                className="font-mono text-sm"
              />
              <p className="text-xs text-text-muted mt-1">{t("idcRegionDescription")}</p>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex gap-2">
              <Button onClick={handleIdcContinue} fullWidth>
                {t("continue")}
              </Button>
              <Button onClick={handleBack} variant="ghost" fullWidth>
                {t("back")}
              </Button>
            </div>
          </div>
        )}

        {/* Import Token */}
        {selectedMethod === "import" && (
          <div className="space-y-4">
            {/* Auto-detecting state */}
            {autoDetecting && (
              <div className="text-center py-6">
                <div className="size-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-primary animate-spin">
                    progress_activity
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{t("autoDetecting")}</h3>
                <p className="text-sm text-text-muted">
                  {t("readingCredentials", { providerLabel })}
                </p>
              </div>
            )}

            {/* Form (shown after auto-detect completes) */}
            {!autoDetecting && (
              <>
                {/* Info message if not auto-detected */}
                {!error && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex gap-2">
                      <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">
                        info
                      </span>
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        {t("tokenNotDetected", { providerLabel })}
                      </p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("refreshToken")} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="password"
                    value={refreshToken}
                    onChange={(e) => setRefreshToken(e.target.value)}
                    placeholder={t("tokenPlaceholder")}
                    className="font-mono text-sm"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    onClick={handleImportToken}
                    fullWidth
                    disabled={importing || !refreshToken.trim()}
                  >
                    {importing ? t("importing") : t("importToken")}
                  </Button>
                  <Button onClick={handleBack} variant="ghost" fullWidth>
                    {t("back")}
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* API Key Import */}
        {selectedMethod === "api-key" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("apiKey")} <span className="text-red-500">*</span>
              </label>
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={t("apiKeyPlaceholder", { providerLabel })}
                className="font-mono text-sm"
              />
              <p className="text-xs text-text-muted mt-1">{t("apiKeyStoredDescription")}</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t("awsRegion")}</label>
              <Input
                value={apiKeyRegion}
                onChange={(e) => setApiKeyRegion(e.target.value)}
                placeholder={t("regionPlaceholder")}
                className="font-mono text-sm"
              />
              <p className="text-xs text-text-muted mt-1">{t("apiKeyRegionDescription")}</p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={handleImportApiKey}
                fullWidth
                disabled={importingApiKey || !apiKey.trim()}
              >
                {importingApiKey ? t("validating") : t("validateAndSaveApiKey")}
              </Button>
              <Button onClick={handleBack} variant="ghost" fullWidth>
                {t("back")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
