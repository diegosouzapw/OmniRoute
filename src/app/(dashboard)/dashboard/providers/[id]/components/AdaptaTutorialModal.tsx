"use client";
import { Modal } from "@/shared/components";

type AdaptaTutorialModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AdaptaTutorialModal({ isOpen, onClose }: AdaptaTutorialModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Como conectar o Adapta Web" size="md">
      <div className="flex flex-col gap-5 text-sm">
        <p className="text-text-muted">
          O Adapta usa autenticação via Clerk. O token{" "}
          <code className="bg-surface-2 px-1 rounded font-mono text-xs">__client</code> é um JWT
          de longa duração que permite renovar sessões automaticamente.
        </p>

        <ol className="flex flex-col gap-4 list-none">
          <li className="flex gap-3">
            <span className="flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
              1
            </span>
            <div>
              <p className="font-medium">Acesse o chat do Adapta</p>
              <p className="text-text-muted mt-0.5">
                Abra{" "}
                <a
                  href="https://agent.adapta.one/agentic-chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary"
                >
                  agent.adapta.one/agentic-chat
                </a>{" "}
                e faça login com sua conta Gold ou Business.
              </p>
            </div>
          </li>

          <li className="flex gap-3">
            <span className="flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
              2
            </span>
            <div>
              <p className="font-medium">Abra o DevTools</p>
              <p className="text-text-muted mt-0.5">
                Pressione{" "}
                <kbd className="bg-surface-2 px-1.5 py-0.5 rounded text-xs font-mono">F12</kbd>{" "}
                ou{" "}
                <kbd className="bg-surface-2 px-1.5 py-0.5 rounded text-xs font-mono">
                  Cmd+Option+I
                </kbd>{" "}
                para abrir as Ferramentas do Desenvolvedor.
              </p>
            </div>
          </li>

          <li className="flex gap-3">
            <span className="flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
              3
            </span>
            <div>
              <p className="font-medium">Vá em Application → Cookies</p>
              <p className="text-text-muted mt-0.5">
                Na aba <strong>Application</strong> (Chrome/Edge) ou <strong>Storage</strong>{" "}
                (Firefox), expanda <strong>Cookies</strong> e clique em{" "}
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
                Copie o valor do cookie{" "}
                <code className="bg-surface-2 px-1 rounded font-mono text-xs">__client</code>
              </p>
              <p className="text-text-muted mt-0.5">
                Localize o cookie chamado{" "}
                <code className="bg-surface-2 px-1 rounded font-mono text-xs">__client</code> na
                lista. Clique nele e copie o conteúdo da coluna <strong>Value</strong> — começa
                com <code className="bg-surface-2 px-1 rounded font-mono text-xs">eyJ…</code>.
              </p>
            </div>
          </li>

          <li className="flex gap-3">
            <span className="flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
              5
            </span>
            <div>
              <p className="font-medium">Cole aqui e salve</p>
              <p className="text-text-muted mt-0.5">
                Clique em <strong>Add Connection</strong>, cole o valor do{" "}
                <code className="bg-surface-2 px-1 rounded font-mono text-xs">__client</code> no
                campo de API Key e salve. O OmniRoute renovará a sessão automaticamente.
              </p>
            </div>
          </li>
        </ol>

        <div
          className="rounded-lg p-3 text-xs text-text-muted"
          style={{ backgroundColor: "rgba(110,58,211,0.08)", borderLeft: "3px solid #6E3AD3" }}
        >
          <strong>Dica:</strong> O cookie <code className="font-mono">__client</code> tem
          validade longa (meses). Só será necessário renová-lo se você sair da conta ou o Adapta
          invalidar a sessão.
        </div>
      </div>
    </Modal>
  );
}
