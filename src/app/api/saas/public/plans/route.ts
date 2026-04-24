import { NextResponse } from "next/server";
import { getCombos, listSaasPlans } from "@/lib/localDb";
import { friendlyPublicSignupError } from "@/lib/saas/userFacingMessages";

function formatCombo(combo: Record<string, unknown>) {
  const name = typeof combo.name === "string" ? combo.name : "combo";
  const description =
    typeof combo.description === "string" && combo.description.trim()
      ? combo.description
      : "Roteamento inteligente com fallback e controle de consumo.";

  return {
    id: typeof combo.id === "string" ? combo.id : name,
    name,
    description,
    strategy: typeof combo.strategy === "string" ? combo.strategy : "smart",
  };
}

export async function GET() {
  try {
    const [plans, combos] = await Promise.all([listSaasPlans(), getCombos()]);
    const publicCombos = combos
      .filter((combo) => !Boolean((combo as Record<string, unknown>).isHidden))
      .map((combo) => formatCombo(combo as Record<string, unknown>));

    return NextResponse.json({
      plans: plans
        .filter((plan) => plan.isActive)
        .map((plan) => ({
          id: plan.id,
          name: plan.name,
          slug: plan.slug,
          monthlyTokenLimit: plan.monthlyTokenLimit,
          priceMonthlyCents: plan.priceMonthlyCents,
          allowAllCombos: plan.allowAllCombos,
          combos: plan.allowAllCombos ? publicCombos : publicCombos.slice(0, 3),
        })),
      combos: publicCombos,
    });
  } catch (error) {
    return NextResponse.json({ error: friendlyPublicSignupError(error) }, { status: 500 });
  }
}
