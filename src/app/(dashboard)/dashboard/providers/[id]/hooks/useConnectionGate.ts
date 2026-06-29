// Phase 1t.3 extraction — Issue #3501
// Encapsulates gateConnectionFlow + risk-notice modal state + confirm/cancel handlers.
import { useState, useRef, useCallback } from "react";
import { isRiskAcknowledged, useRiskAcknowledged } from "../../hooks/useRiskAcknowledged";

interface UseConnectionGateParams {
  providerId: string;
  subscriptionRisk: boolean;
}

export function useConnectionGate({ providerId, subscriptionRisk }: UseConnectionGateParams) {
  const [showRiskNoticeModal, setShowRiskNoticeModal] = useState(false);
  const pendingRiskActionRef = useRef<(() => void) | null>(null);
  const { acknowledged: riskAcknowledged, acknowledge: acknowledgeRisk } =
    useRiskAcknowledged(providerId);

  const gateConnectionFlow = useCallback(
    (callback: () => void) => {
      if (subscriptionRisk && !riskAcknowledged && !isRiskAcknowledged(providerId)) {
        pendingRiskActionRef.current = callback;
        setShowRiskNoticeModal(true);
        return;
      }
      callback();
    },
    [providerId, riskAcknowledged, subscriptionRisk]
  );

  const handleConfirmRiskNotice = useCallback(() => {
    acknowledgeRisk();
    setShowRiskNoticeModal(false);
    const pendingAction = pendingRiskActionRef.current;
    pendingRiskActionRef.current = null;
    pendingAction?.();
  }, [acknowledgeRisk]);

  const handleCancelRiskNotice = useCallback(() => {
    pendingRiskActionRef.current = null;
    setShowRiskNoticeModal(false);
  }, []);

  return {
    showRiskNoticeModal,
    gateConnectionFlow,
    handleConfirmRiskNotice,
    handleCancelRiskNotice,
  };
}
