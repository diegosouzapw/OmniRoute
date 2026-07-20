"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { useAnnotations } from "../../hooks/useAnnotations";

interface AnnotationFieldProps {
  requestId: string | null;
  initialValue?: string;
}

export function AnnotationField({ requestId, initialValue = "" }: AnnotationFieldProps) {
  const t = useTranslations("trafficInspector");
  const [value, setValue] = useState(initialValue);
  const { save, saving } = useAnnotations(requestId);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      save(e.target.value);
    },
    [save]
  );

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={t("annotationPlaceholder")}
        rows={3}
        maxLength={10_000}
        className="w-full rounded border border-border bg-bg-subtle px-3 py-2 text-sm text-text-main resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      {saving && (
        <span className="absolute right-2 bottom-2 text-xs text-text-muted animate-pulse">
          {t("saving")}
        </span>
      )}
    </div>
  );
}
