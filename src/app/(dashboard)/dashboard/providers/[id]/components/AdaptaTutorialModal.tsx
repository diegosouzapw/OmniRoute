"use client";
import { useTranslations } from "next-intl";
import { Modal } from "@/shared/components";

type AdaptaTutorialModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AdaptaTutorialModal({ isOpen, onClose }: AdaptaTutorialModalProps) {
  const t = useTranslations("providers.adaptaTutorial");

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("title")} size="md">
      <div className="flex flex-col gap-5 text-sm">
        <p className="text-text-muted">
          {t("introPrefix")}{" "}
          <code className="bg-surface-2 px-1 rounded font-mono text-xs">__client</code>{" "}
          {t("introSuffix")}
        </p>

        <ol className="flex flex-col gap-4 list-none">
          <li className="flex gap-3">
            <span className="flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
              1
            </span>
            <div>
              <p className="font-medium">{t("step1Title")}</p>
              <p className="text-text-muted mt-0.5">
                {t("step1DescPrefix")}{" "}
                <a
                  href="https://agent.adapta.one/agentic-chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary"
                >
                  agent.adapta.one/agentic-chat
                </a>{" "}
                {t("step1DescSuffix")}
              </p>
            </div>
          </li>

          <li className="flex gap-3">
            <span className="flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
              2
            </span>
            <div>
              <p className="font-medium">{t("step2Title")}</p>
              <p className="text-text-muted mt-0.5">
                {t("step2DescPrefix")}{" "}
                <kbd className="bg-surface-2 px-1.5 py-0.5 rounded text-xs font-mono">F12</kbd>{" "}
                {t("or")}{" "}
                <kbd className="bg-surface-2 px-1.5 py-0.5 rounded text-xs font-mono">
                  Cmd+Option+I
                </kbd>{" "}
                {t("step2DescSuffix")}
              </p>
            </div>
          </li>

          <li className="flex gap-3">
            <span className="flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
              3
            </span>
            <div>
              <p className="font-medium">{t("step3Title")}</p>
              <p className="text-text-muted mt-0.5">
                {t("step3DescPrefix")} <strong>Application</strong> (Chrome/Edge) {t("or")}{" "}
                <strong>Storage</strong> (Firefox), {t("step3DescMiddle")} <strong>Cookies</strong>{" "}
                {t("step3DescSuffix")}{" "}
                <code className="bg-surface-2 px-1 rounded font-mono text-xs">
                  .clerk.agent.adapta.one
                </code>
                .
              </p>
            </div>
          </li>

          <li className="flex gap-3">
            <span className="flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
              4
            </span>
            <div>
              <p className="font-medium">
                {t("step4Title")}{" "}
                <code className="bg-surface-2 px-1 rounded font-mono text-xs">__client</code>
              </p>
              <p className="text-text-muted mt-0.5">
                {t("step4DescPrefix")}{" "}
                <code className="bg-surface-2 px-1 rounded font-mono text-xs">__client</code>{" "}
                {t("step4DescMiddle")} <strong>Value</strong> {t("step4DescSuffix")}{" "}
                <code className="bg-surface-2 px-1 rounded font-mono text-xs">eyJ...</code>.
              </p>
            </div>
          </li>

          <li className="flex gap-3">
            <span className="flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
              5
            </span>
            <div>
              <p className="font-medium">{t("step5Title")}</p>
              <p className="text-text-muted mt-0.5">
                {t("step5DescPrefix")} <strong>Add Connection</strong>, {t("step5DescMiddle")}{" "}
                <code className="bg-surface-2 px-1 rounded font-mono text-xs">__client</code>{" "}
                {t("step5DescSuffix")}
              </p>
            </div>
          </li>
        </ol>

        <div
          className="rounded-lg p-3 text-xs text-text-muted"
          style={{ backgroundColor: "rgba(110,58,211,0.08)", borderLeft: "3px solid #6E3AD3" }}
        >
          <strong>{t("tipLabel")}</strong> {t("tipPrefix")}{" "}
          <code className="font-mono">__client</code> {t("tipSuffix")}
        </div>
      </div>
    </Modal>
  );
}
