"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, Button, Input, Select, Toggle } from "@/shared/components";
import { AI_PROVIDERS, AUTH_METHODS } from "@/shared/constants/config";
import { useTranslations } from "next-intl";

const providerOptions = Object.values(AI_PROVIDERS).map((p) => ({
  value: p.id,
  label: p.name,
}));

const authMethodOptions = Object.values(AUTH_METHODS).map((m) => ({
  value: m.id,
  label: m.name,
}));

export default function NewProviderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const t = useTranslations("providers");
  const [formData, setFormData] = useState({
    provider: "",
    authMethod: "api_key",
    apiKey: "",
    displayName: "",
    isActive: true,
  });
  const [errors, setErrors] = useState<any>({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors: any = {};
    if (!formData.provider) newErrors.provider = t("selectProvider");
    if (formData.authMethod === "api_key" && !formData.apiKey) {
      newErrors.apiKey = t("apiKeyRequired");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/dashboard/providers");
      } else {
        const data = await response.json();
        setErrors({ submit: data.error || t("failedCreate") });
      }
    } catch (error) {
      setErrors({ submit: t("errorOccurred") });
    } finally {
      setLoading(false);
    }
  };

  const selectedProvider = (AI_PROVIDERS as any)[formData.provider];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/providers"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary transition-colors mb-4"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          {t("backToProviders")}
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight">{t("addNewProvider")}</h1>
        <p className="text-text-muted mt-2">{t("configureNewProvider")}</p>
      </div>

      {/* Form */}
      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Provider Selection */}
          <Select
            label="Provider"
            options={providerOptions}
            value={formData.provider}
            onChange={(e) => handleChange("provider", e.target.value)}
            placeholder={t("selectProvider")}
            error={errors.provider as string}
            required
          />

          {/* Provider Info */}
          {selectedProvider && (
            <Card.Section className="flex items-center gap-3">
              <div className="size-10 rounded-lg flex items-center justify-center bg-bg border border-border">
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ color: selectedProvider.color }}
                >
                  {selectedProvider.icon}
                </span>
              </div>
              <div>
                <p className="font-medium">{selectedProvider.name}</p>
                <p className="text-sm text-text-muted">{t("selectedProvider")}</p>
              </div>
            </Card.Section>
          )}

          {/* Auth Method */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium">
              {t("authMethod")} <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              {authMethodOptions.map((method) => (
                <button
                  key={method.value}
                  type="button"
                  onClick={() => handleChange("authMethod", method.value)}
                  className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border transition-all ${
                    formData.authMethod === method.value
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="material-symbols-outlined">
                    {method.value === "api_key" ? "key" : "lock"}
                  </span>
                  <span className="font-medium">{method.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* API Key Input */}
          {formData.authMethod === "api_key" && (
            <Input
              label="API Key"
              type="password"
              placeholder={t("enterApiKey")}
              value={formData.apiKey}
              onChange={(e) => handleChange("apiKey", e.target.value)}
              error={errors.apiKey as string}
              hint={t("apiKeySecure")}
              required
            />
          )}

          {/* OAuth2 Button */}
          {formData.authMethod === "oauth2" && (
            <Card.Section className="">
              <p className="text-sm text-text-muted mb-4">{t("oauth2Desc")}</p>
              <Button type="button" variant="secondary" icon="link">
                {t("oauth2Connect")}
              </Button>
            </Card.Section>
          )}

          {/* Display Name */}
          <Input
            label="Display Name"
            placeholder="e.g., Production API, Dev Environment"
            value={formData.displayName}
            onChange={(e) => handleChange("displayName", e.target.value)}
            hint="Optional. A friendly name to identify this configuration."
          />

          {/* Active Toggle */}
          <Toggle
            checked={formData.isActive}
            onChange={(checked) => handleChange("isActive", checked)}
            label={t("active")}
            description={t("activeDescription")}
          />

          {/* Error Message */}
          {errors.submit && (
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              {errors.submit as string}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Link href="/dashboard/providers" className="flex-1">
              <Button type="button" variant="ghost" fullWidth>
                {t("cancel")}
              </Button>
            </Link>
            <Button type="submit" loading={loading} fullWidth className="flex-1">
              {t("createProvider")}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
