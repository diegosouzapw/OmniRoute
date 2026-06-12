"use client";

import { Modal, Button } from "@/shared/components";

type ExternalLinkModalProps = {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  error: string | null;
  url: string;
  copied: string | false;
  onCopy: (text: string, key: string) => void;
};

export default function ExternalLinkModal({
  isOpen,
  onClose,
  loading,
  error,
  url,
  copied,
  onCopy,
}: ExternalLinkModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adicionar Externo — link do Codex">
      <div className="space-y-4">
        <p className="text-sm text-text-muted">
          Compartilhe este link com quem vai autenticar a conta do Codex. A pessoa abre a
          página, faz o login da OpenAI no próprio navegador e a conexão é cadastrada aqui. Uso
          único, expira em 15 minutos.
        </p>
        {loading ? (
          <p className="text-sm text-text-muted">Gerando link…</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : url ? (
          <>
            <div className="rounded-lg border border-border bg-bg-base p-3 break-all text-sm text-text-main">
              {url}
            </div>
            <div className="flex gap-2">
              <Button
                className="flex-1"
                icon="open_in_new"
                onClick={() => window.open(url, "_blank", "noopener")}
              >
                Abrir
              </Button>
              <Button
                variant="secondary"
                icon="content_copy"
                onClick={() => onCopy(url, "extlink")}
              >
                {copied === "extlink" ? "Copiado" : "Copiar"}
              </Button>
            </div>
            <p className="flex items-center gap-2 text-xs text-text-muted">
              <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
              Aguardando a autenticação no navegador da pessoa… esta janela atualiza sozinha.
            </p>
          </>
        ) : null}
      </div>
    </Modal>
  );
}
