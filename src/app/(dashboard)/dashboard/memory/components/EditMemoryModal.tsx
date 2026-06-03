"use client";

import { useState, useEffect } from "react";
import { Modal, Button, Input, Select } from "@/shared/components";
import { useTranslations } from "next-intl";

interface Memory {
  id: string;
  type: "factual" | "episodic" | "procedural" | "semantic";
  key: string;
  content: string;
  metadata: Record<string, unknown>;
}

interface Props {
  memory: Memory | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function EditMemoryModal({ memory, isOpen, onClose, onSaved }: Props) {
  const t = useTranslations("memory");
  const [type, setType] = useState<"factual" | "episodic" | "procedural" | "semantic">("factual");
  const [key, setKey] = useState("");
  const [content, setContent] = useState("");
  const [metadataStr, setMetadataStr] = useState("{}");
  const [metadataError, setMetadataError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (memory && isOpen) {
      setType(memory.type);
      setKey(memory.key);
      setContent(memory.content);
      setMetadataStr(JSON.stringify(memory.metadata ?? {}, null, 2));
      setMetadataError("");
      setError("");
    }
  }, [memory, isOpen]);

  const handleMetadataChange = (value: string) => {
    setMetadataStr(value);
    try {
      JSON.parse(value);
      setMetadataError("");
    } catch {
      setMetadataError(t("editModal.metadataInvalid"));
    }
  };

  const handleSave = async () => {
    if (!memory) return;
    if (metadataError) return;
    setIsSaving(true);
    setError("");
    try {
      let metadata: Record<string, unknown> = {};
      try {
        metadata = JSON.parse(metadataStr);
      } catch {
        setError(t("editModal.metadataInvalid"));
        return;
      }
      const res = await fetch(`/api/memory/${memory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, key, content, metadata }),
      });
      if (res.ok) {
        onSaved();
        onClose();
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.error?.message ?? t("editModal.saveFailed"));
      }
    } catch {
      setError(t("editModal.saveFailed"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("editModal.title")}
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            {t("cancel")}
          </Button>
          <Button
            onClick={handleSave}
            loading={isSaving}
            disabled={!key.trim() || !content.trim() || Boolean(metadataError)}
          >
            {t("save")}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">{t("type")}</label>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value as typeof type)}
            className="w-full"
          >
            <option value="factual">{t("factual")}</option>
            <option value="episodic">{t("episodic")}</option>
            <option value="procedural">{t("procedural")}</option>
            <option value="semantic">{t("semantic")}</option>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t("key")}</label>
          <Input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder={t("keyPlaceholder")}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t("content")}</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t("contentPlaceholder")}
            rows={4}
            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 resize-y"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t("editModal.metadataLabel")}</label>
          <textarea
            value={metadataStr}
            onChange={(e) => handleMetadataChange(e.target.value)}
            rows={4}
            spellCheck={false}
            className={`w-full px-3 py-2 rounded-lg bg-background border text-xs font-mono focus:outline-none focus:ring-1 focus:ring-violet-500 resize-y ${
              metadataError ? "border-red-500" : "border-border"
            }`}
          />
          {metadataError && (
            <p className="text-xs text-red-400 mt-1">{metadataError}</p>
          )}
        </div>
      </div>
    </Modal>
  );
}
