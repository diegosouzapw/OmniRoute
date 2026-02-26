"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@/shared/components/Card";
import PricingModal from "@/shared/components/PricingModal";
import { useTranslations } from "next-intl";

export default function PricingSettingsPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [currentPricing, setCurrentPricing] = useState(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("settings");

  useEffect(() => {
    loadPricing();
  }, []);

  const loadPricing = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/pricing");
      if (response.ok) {
        const data = await response.json();
        setCurrentPricing(data);
      }
    } catch (error) {
      console.error("Failed to load pricing:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePricingUpdated = () => {
    loadPricing();
  };

  // Count total models with pricing
  const getModelCount = () => {
    if (!currentPricing) return 0;
    let count = 0;
    for (const provider in currentPricing) {
      count += Object.keys(currentPricing[provider]).length;
    }
    return count;
  };

  // Get providers list
  const getProviders = () => {
    if (!currentPricing) return [];
    return Object.keys(currentPricing).sort();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("pricingSettingsTitle")}</h1>
          <p className="text-text-muted mt-1">{t("modelPricingDesc")}</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
        >
          {t("editPricing")}
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-text-muted text-sm uppercase font-semibold">{t("totalModels")}</div>
          <div className="text-2xl font-bold mt-1">{loading ? "..." : getModelCount()}</div>
        </Card>
        <Card className="p-4">
          <div className="text-text-muted text-sm uppercase font-semibold">{t("providers")}</div>
          <div className="text-2xl font-bold mt-1">{loading ? "..." : getProviders().length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-text-muted text-sm uppercase font-semibold">{t("status")}</div>
          <div className="text-2xl font-bold mt-1 text-success">
            {loading ? "..." : t("active")}
          </div>
        </Card>
      </div>

      {/* Info Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">{t("howPricingWorks")}</h2>
        <div className="space-y-3 text-sm text-text-muted">
          <p>
            <strong>{t("costCalculation")}:</strong> {t("costCalculationDesc")}
          </p>
          <p>
            <strong>{t("pricingFormat")}:</strong> {t("pricingFormatDesc")}
          </p>
          <p>
            <strong>{t("tokenTypes")}:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>{t("input")}:</strong> {t("inputTokenDesc")}
            </li>
            <li>
              <strong>{t("output")}:</strong> {t("outputTokenDesc")}
            </li>
            <li>
              <strong>{t("cached")}:</strong> {t("cachedTokenDesc")}
            </li>
            <li>
              <strong>{t("reasoning")}:</strong> {t("reasoningTokenDesc")}
            </li>
            <li>
              <strong>{t("cacheCreation")}:</strong> {t("cacheCreationTokenDesc")}
            </li>
          </ul>
          <p>{t("customPricingNote")}</p>
        </div>
      </Card>

      {/* Current Pricing Preview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{t("currentPricing")}</h2>
          <button
            onClick={() => setShowModal(true)}
            className="text-primary hover:underline text-sm"
          >
            {t("viewFullDetails")}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-4 text-text-muted">{t("loadingPricing")}</div>
        ) : currentPricing ? (
          <div className="space-y-3">
            {Object.keys(currentPricing)
              .slice(0, 5)
              .map((provider) => (
                <div key={provider} className="text-sm">
                  <span className="font-semibold">{provider.toUpperCase()}:</span>{" "}
                  <span className="text-text-muted">
                    {Object.keys(currentPricing[provider]).length} {t("models")}
                  </span>
                </div>
              ))}
            {Object.keys(currentPricing).length > 5 && (
              <div className="text-sm text-text-muted">
                + {t("moreProviders", { count: Object.keys(currentPricing).length - 5 })}
              </div>
            )}
          </div>
        ) : (
          <div className="text-text-muted">{t("noPricing")}</div>
        )}
      </Card>

      {/* Pricing Modal */}
      {showModal && (
        <PricingModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handlePricingUpdated}
        />
      )}
    </div>
  );
}
