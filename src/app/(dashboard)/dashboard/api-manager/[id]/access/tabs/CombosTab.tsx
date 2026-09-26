"use client";

import { AllowedCombosSection } from "@/app/(dashboard)/dashboard/api-manager/components/AllowedCombosSection";
import { ApiKeyAutoCombosToggle } from "@/app/(dashboard)/dashboard/api-manager/components/ApiKeyAutoCombosToggle";
import type { ApiKeyAccessFormState } from "../useApiKeyAccessForm";
import TabErrorList from "./TabErrorList";

export interface ComboOption {
  name: string;
  models?: string[];
  strategy?: string;
  isActive?: boolean;
  isHidden?: boolean;
}

interface CombosTabProps {
  formState: ApiKeyAccessFormState;
  allCombos: ComboOption[];
  setAllowAllCombos: (allow: boolean) => void;
  setSelectedCombos: (combos: string[]) => void;
  toggleCombo: (comboName: string) => void;
  setAllowAutoCombos: (enabled: boolean) => void;
  errors?: string[];
}

export default function CombosTab({
  formState,
  allCombos,
  setAllowAllCombos,
  setSelectedCombos,
  toggleCombo,
  setAllowAutoCombos,
  errors,
}: CombosTabProps) {
  return (
    <div className="flex flex-col gap-5">
      <TabErrorList errors={errors} />

      {/* Auto Combos Toggle */}
      <ApiKeyAutoCombosToggle
        enabled={formState.allowAutoCombos}
        onToggle={() => setAllowAutoCombos(!formState.allowAutoCombos)}
      />

      {/* Allowed Combos Section */}
      <AllowedCombosSection
        allCombos={allCombos}
        allowAllCombos={formState.allowAllCombos}
        selectedCombos={formState.selectedCombos}
        onAllowAll={(preservedRules) => {
          setAllowAllCombos(true);
          setSelectedCombos(preservedRules);
        }}
        onRestrict={() => setAllowAllCombos(false)}
        onToggleCombo={toggleCombo}
      />
    </div>
  );
}
