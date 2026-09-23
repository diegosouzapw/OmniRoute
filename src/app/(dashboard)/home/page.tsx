import { getMachineId } from "@/shared/utils/machine";
import { getSettings } from "@/lib/db/settings";
import HomePageClient from "../dashboard/HomePageClient";
import BootstrapBanner from "../dashboard/BootstrapBanner";
import KimiSponsorBanner from "../dashboard/KimiSponsorBanner";
import CheaperInferenceSponsorBanner from "../dashboard/CheaperInferenceSponsorBanner";
import VscodeCopilotBanner from "../dashboard/VscodeCopilotBanner";
import NewsBanner from "../dashboard/NewsBanner";
import FirstRunReadinessCard from "../dashboard/FirstRunReadinessCard";
import UnpricedUsageBanner from "../dashboard/UnpricedUsageBanner";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Even if getSettings() rejects, getMachineId() runs concurrently, which is acceptable
  // as both paths fail-fast on error and avoids the waterfall penalty.
  const [settings, machineId] = await Promise.all([getSettings(), getMachineId()]);
  const isBootstrapped = process.env.OMNIROUTE_BOOTSTRAPPED === "true";
  return (
    <>
      {isBootstrapped && <BootstrapBanner />}
      <FirstRunReadinessCard setupComplete={Boolean(settings.setupComplete)} />
      <UnpricedUsageBanner />
      <KimiSponsorBanner />
      <CheaperInferenceSponsorBanner />
      <VscodeCopilotBanner />
      <NewsBanner />
      <HomePageClient machineId={machineId} />
    </>
  );
}
