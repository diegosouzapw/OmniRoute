"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button, Select } from "@/shared/components";
import type { SearchProviderCatalogItem } from "@/shared/schemas/searchTools";

interface SearchProvider {
  id: string;
  name: string;
  status: "active" | "no_credentials";
  cost_per_query: number;
}

/** Extended provider info from the catalog (optional — shown if catalogProviders is supplied). */
interface SearchFormExtendedProps {
  /** If supplied, shows cost + quota + status badges next to the provider dropdown. */
  catalogProviders?: SearchProviderCatalogItem[];
}

export interface SearchFormData {
  query: string;
  provider: string;
  search_type: string;
  max_results: number;
  country?: string;
  language?: string;
  time_range?: string;
  include_domains?: string[];
  exclude_domains?: string[];
  safe_search?: string;
}

interface SearchFormProps extends SearchFormExtendedProps {
  onSearch: (data: SearchFormData) => void;
  loading: boolean;
  onCancel: () => void;
  providers: SearchProvider[];
}

export default function SearchForm({ onSearch, loading, onCancel, providers, catalogProviders }: SearchFormProps) {
  const t = useTranslations("search");
  const tc = useTranslations("common");
  const [query, setQuery] = useState("");
  const [provider, setProvider] = useState("auto");
  const [searchType, setSearchType] = useState("web");
  const [maxResults, setMaxResults] = useState(5);
  const [showFilters, setShowFilters] = useState(false);
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [timeRange, setTimeRange] = useState("");
  const [includeDomains, setIncludeDomains] = useState<string[]>([]);
  const [excludeDomains, setExcludeDomains] = useState<string[]>([]);
  const [safeSearch, setSafeSearch] = useState("moderate");
  const [domainInput, setDomainInput] = useState("");
  const [excludeDomainInput, setExcludeDomainInput] = useState("");

  const activeProviders = providers.filter((p) => p.status === "active");
  const noProviders = activeProviders.length === 0;

  // Look up catalog metadata for the currently selected provider
  const catalogInfo = catalogProviders?.find((cp) => cp.id === provider) ?? null;

  const handleSubmit = () => {
    const data: SearchFormData = {
      query,
      provider: provider === "auto" ? "" : provider,
      search_type: searchType,
      max_results: maxResults,
    };
    if (country) data.country = country;
    if (language) data.language = language;
    if (timeRange) data.time_range = timeRange;
    if (includeDomains.length > 0) data.include_domains = includeDomains;
    if (excludeDomains.length > 0) data.exclude_domains = excludeDomains;
    if (safeSearch !== "moderate") data.safe_search = safeSearch;
    onSearch(data);
  };

  const addDomain = (type: "include" | "exclude") => {
    const input = type === "include" ? domainInput : excludeDomainInput;
    const setter = type === "include" ? setIncludeDomains : setExcludeDomains;
    const list = type === "include" ? includeDomains : excludeDomains;
    if (input.trim() && !list.includes(input.trim())) {
      setter([...list, input.trim()]);
    }
    type === "include" ? setDomainInput("") : setExcludeDomainInput("");
  };

  const removeDomain = (domain: string, type: "include" | "exclude") => {
    const setter = type === "include" ? setIncludeDomains : setExcludeDomains;
    const list = type === "include" ? includeDomains : excludeDomains;
    setter(list.filter((d) => d !== domain));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Query */}
      <div className="p-4 border-b border-border">
        <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2">
          {t("searchQuery")}
        </label>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("queryPlaceholder")}
          className="w-full bg-surface border border-border rounded-lg p-2.5 text-sm text-text-main resize-none h-16 focus:outline-none focus:ring-2 focus:ring-primary/30"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!noProviders && query.trim()) handleSubmit();
            }
          }}
        />
      </div>

      {/* Provider + Type + Max Results */}
      <div className="p-4 border-b border-border space-y-2">
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">
              {t("provider")}
            </label>
            <Select
              value={provider}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProvider(e.target.value)}
              options={[
                { value: "auto", label: t("providerAuto") },
                ...activeProviders.map((p) => ({
                  value: p.id,
                  label: p.name,
                })),
              ]}
              className="w-full"
            />
            {/* Catalog metadata badge (F8 — provider cost/quota/status) */}
            {catalogInfo && (
              <div className="mt-1 flex flex-wrap gap-x-2 text-[10px] text-text-muted">
                <span>
                  <span className="font-medium text-text-main">
                    ${catalogInfo.costPerQuery.toFixed(4)}
                  </span>
                  /query
                </span>
                {catalogInfo.freeMonthlyQuota > 0 && (
                  <span>
                    Free{" "}
                    <span className="font-medium text-text-main">
                      {catalogInfo.freeMonthlyQuota >= 1000
                        ? `${(catalogInfo.freeMonthlyQuota / 1000).toFixed(0)}k`
                        : catalogInfo.freeMonthlyQuota}
                    </span>
                    /mo
                  </span>
                )}
                <span
                  className={
                    catalogInfo.status === "configured"
                      ? "text-success"
                      : catalogInfo.status === "rate_limited"
                        ? "text-warning"
                        : "text-text-muted"
                  }
                  data-testid="provider-status-badge"
                >
                  {catalogInfo.status === "configured"
                    ? "● ok"
                    : catalogInfo.status === "rate_limited"
                      ? "● limited"
                      : "● missing"}
                </span>
                {catalogInfo.status === "missing" && (
                  <Link
                    href={catalogInfo.configureHref}
                    className="text-accent hover:underline"
                  >
                    Configure →
                  </Link>
                )}
              </div>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">
              {t("searchType")}
            </label>
            <Select
              value={searchType}
              onChange={(e: any) => setSearchType(e.target.value)}
              options={[
                { value: "web", label: t("searchTypeWeb") },
                { value: "news", label: t("searchTypeNews") },
              ]}
              className="w-full"
            />
          </div>
        </div>
        <div className="w-20">
          <label className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">
            {t("maxResults")}
          </label>
          <input
            type="number"
            value={maxResults}
            onChange={(e) => setMaxResults(parseInt(e.target.value) || 5)}
            min={1}
            max={100}
            className="w-full bg-surface border border-border rounded-lg px-2.5 py-1.5 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Filters (collapsible) */}
      <div className="p-4 border-b border-border">
        <button
          className="flex justify-between items-center w-full"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
            {t("filters")}
          </span>
          <span className="text-text-muted text-xs">{showFilters ? "▼" : "▶"}</span>
        </button>
        {showFilters && (
          <div className="mt-3 space-y-2">
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-[10px] text-text-muted mb-1">{t("country")}</label>
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder={t("optionAny")}
                  className="w-full bg-surface border border-border rounded-md px-2 py-1.5 text-xs text-text-main focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] text-text-muted mb-1">{t("language")}</label>
                <input
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  placeholder={t("optionAny")}
                  className="w-full bg-surface border border-border rounded-md px-2 py-1.5 text-xs text-text-main focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] text-text-muted mb-1">{t("timeRange")}</label>
              <Select
                value={timeRange}
                onChange={(e: any) => setTimeRange(e.target.value)}
                options={[
                  { value: "", label: t("optionAny") },
                  { value: "day", label: t("timeRangeDay") },
                  { value: "week", label: t("timeRangeWeek") },
                  { value: "month", label: t("timeRangeMonth") },
                  { value: "year", label: t("timeRangeYear") },
                ]}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-[10px] text-text-muted mb-1">
                {t("includeDomains")}
              </label>
              <div className="flex gap-1">
                <input
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  placeholder={t("domainPlaceholder")}
                  className="flex-1 bg-surface border border-border rounded-md px-2 py-1.5 text-xs text-text-main focus:outline-none"
                  onKeyDown={(e) => e.key === "Enter" && addDomain("include")}
                />
                <button onClick={() => addDomain("include")} className="text-primary text-lg px-1">
                  +
                </button>
              </div>
              {includeDomains.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {includeDomains.map((d) => (
                    <span
                      key={d}
                      className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center gap-1"
                    >
                      {d}
                      <button
                        onClick={() => removeDomain(d, "include")}
                        className="text-primary/60"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="block text-[10px] text-text-muted mb-1">
                {t("excludeDomains")}
              </label>
              <div className="flex gap-1">
                <input
                  value={excludeDomainInput}
                  onChange={(e) => setExcludeDomainInput(e.target.value)}
                  placeholder={t("domainPlaceholder")}
                  className="flex-1 bg-surface border border-border rounded-md px-2 py-1.5 text-xs text-text-main focus:outline-none"
                  onKeyDown={(e) => e.key === "Enter" && addDomain("exclude")}
                />
                <button onClick={() => addDomain("exclude")} className="text-primary text-lg px-1">
                  +
                </button>
              </div>
              {excludeDomains.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {excludeDomains.map((d) => (
                    <span
                      key={d}
                      className="text-[10px] bg-error/10 text-error px-2 py-0.5 rounded-full flex items-center gap-1"
                    >
                      {d}
                      <button onClick={() => removeDomain(d, "exclude")} className="text-error/60">
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="block text-[10px] text-text-muted mb-1">{t("safeSearch")}</label>
              <Select
                value={safeSearch}
                onChange={(e: any) => setSafeSearch(e.target.value)}
                options={[
                  { value: "off", label: t("safeSearchOff") },
                  { value: "moderate", label: t("safeSearchModerate") },
                  { value: "strict", label: t("safeSearchStrict") },
                ]}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Search button */}
      <div className="p-4 border-b border-border">
        {loading ? (
          <Button variant="danger" onClick={onCancel} className="w-full">
            {tc("cancel")}
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={noProviders || !query.trim()}
            className="w-full"
          >
            {tc("search")}
          </Button>
        )}
        {noProviders && <p className="text-xs text-text-muted mt-2">{t("noSearchProviders")}</p>}
      </div>
    </div>
  );
}
