import { getMachineId } from "@/shared/utils/machine";
import { loadHomeSettings } from "./loadHomeSettings";
import HomePageClient from "../dashboard/HomePageClient";
import BootstrapBanner from "../dashboard/BootstrapBanner";
import KimiSponsorBanner from "../dashboard/KimiSponsorBanner";
import CheaperInferenceSponsorBanner from "../dashboard/CheaperInferenceSponsorBanner";
import VscodeCopilotBanner from "../dashboard/VscodeCopilotBanner";
import NewsBanner from "../dashboard/NewsBanner";
import FirstRunReadinessCard from "../dashboard/FirstRunReadinessCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Settings failures degrade to defaults here (display-only) — see loadHomeSettings (#14060).
  const [settings, machineId] = await Promise.all([loadHomeSettings(), getMachineId()]);
  const isBootstrapped = process.env.OMNIROUTE_BOOTSTRAPPED === "true";
  return (
    <>
      {isBootstrapped && <BootstrapBanner />}
      <FirstRunReadinessCard setupComplete={Boolean(settings.setupComplete)} />
      <KimiSponsorBanner />
      <CheaperInferenceSponsorBanner />
      <VscodeCopilotBanner />
      <NewsBanner />
      <HomePageClient machineId={machineId} />
    </>
  );
}
