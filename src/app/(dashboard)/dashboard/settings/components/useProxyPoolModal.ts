"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";

interface UseProxyPoolModalOptions {
  items: { id: string; name: string }[];
  onSave: (
    scope: string,
    scopeIds: string,
    proxyId: string,
    strategy: "round-robin" | "random" | "sticky"
  ) => Promise<void>;
  onLoad: (
    scope: string,
    scopeIds: string,
    proxyId: string
  ) => Promise<{ members: string[]; strategy: string } | null>;
}

export function useProxyPoolModal({ items, onSave, onLoad }: UseProxyPoolModalOptions) {
  const t = useTranslations("proxyRegistry");
  const [open, setOpen] = useState(false);
  const [scope, setScope] = useState<"global" | "provider">("provider");
  const [scopeIds, setScopeIds] = useState("");
  const [proxyId, setProxyId] = useState("");
  const [strategy, setStrategy] = useState<"round-robin" | "random" | "sticky">("round-robin");
  const [members, setMembers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(async () => {
    if (!proxyId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await onLoad(scope, scopeIds, proxyId);
      if (data) {
        setMembers(data.members);
        setStrategy(data.strategy as "round-robin" | "random" | "sticky");
        setLoaded(true);
      }
    } catch (e: any) {
      setError(e?.message || t("poolLoadFailed"));
    } finally {
      setLoading(false);
    }
  }, [scope, scopeIds, proxyId, onLoad, t]);

  const handleSave = useCallback(async () => {
    if (!proxyId) return;
    setLoading(true);
    setError(null);
    try {
      await onSave(scope, scopeIds, proxyId, strategy);
      setOpen(false);
    } catch (e: any) {
      setError(e?.message || t("poolSaveFailed"));
    } finally {
      setLoading(false);
    }
  }, [scope, scopeIds, proxyId, strategy, onSave, t]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setScope("provider");
    setScopeIds("");
    setProxyId("");
    setStrategy("round-robin");
    setMembers([]);
    setLoaded(false);
    setError(null);
  }, []);

  return {
    open,
    setOpen,
    scope,
    setScope,
    scopeIds,
    setScopeIds,
    proxyId,
    setProxyId,
    strategy,
    setStrategy,
    members,
    loading,
    error,
    loaded,
    handleLoad,
    handleSave,
    handleClose,
    t,
  };
}
