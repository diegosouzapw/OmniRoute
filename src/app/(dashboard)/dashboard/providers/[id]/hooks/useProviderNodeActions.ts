// Phase 1t.4 extraction — Issue #3501
// Encapsulates handleUpdateNode and handleUpdateConnection async handlers.
import type { ProviderMessageTranslator } from "../providerPageHelpers";

interface UseProviderNodeActionsParams {
  providerId: string;
  fetchConnections: () => Promise<void>;
  selectedConnection: { id: string } | null;
  setProviderNode: (node: any) => void;
  setShowEditNodeModal: (open: boolean) => void;
  setShowEditModal: (open: boolean) => void;
  t: ProviderMessageTranslator;
}

export function useProviderNodeActions({
  providerId,
  fetchConnections,
  selectedConnection,
  setProviderNode,
  setShowEditNodeModal,
  setShowEditModal,
  t,
}: UseProviderNodeActionsParams) {
  const handleUpdateNode = async (formData: any) => {
    try {
      const res = await fetch(`/api/provider-nodes/${providerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setProviderNode(data.node);
        await fetchConnections();
        setShowEditNodeModal(false);
      }
    } catch (error) {
      console.log("Error updating provider node:", error);
    }
  };

  const handleUpdateConnection = async (formData: any) => {
    try {
      const res = await fetch(`/api/providers/${selectedConnection?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        await fetchConnections();
        setShowEditModal(false);
        return null;
      }
      const data = await res.json().catch(() => ({}));
      return data.error?.message || data.error || t("failedSaveConnection");
    } catch (error) {
      console.log("Error updating connection:", error);
      return t("failedSaveConnectionRetry");
    }
  };

  return { handleUpdateNode, handleUpdateConnection };
}
