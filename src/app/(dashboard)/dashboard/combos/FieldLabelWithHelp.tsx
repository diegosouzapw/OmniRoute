"use client";

import Tooltip from "@/shared/components/Tooltip";

type FieldLabelWithHelpProps = {
  label: string;
  help: string;
  showHelp?: boolean;
  htmlFor?: string;
};

export default function FieldLabelWithHelp({
  label,
  help,
  showHelp = true,
  htmlFor,
}: FieldLabelWithHelpProps) {
  return (
    <div className="flex items-center gap-1 mb-0.5">
      <label htmlFor={htmlFor} className="text-[10px] text-text-muted">
        {label}
      </label>
      {showHelp && (
        <Tooltip position="bottom" content={help}>
          <span className="material-symbols-outlined text-[12px] text-text-muted cursor-help">
            help
          </span>
        </Tooltip>
      )}
    </div>
  );
}