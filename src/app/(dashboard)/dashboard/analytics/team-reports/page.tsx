import ReportsPageClient from "./ReportsPageClient";

export const metadata = {
  title: "Team Reports — OmniRoute",
  description: "Coding-agent usage, tokens and cost by team member, project, provider and account.",
};

export default function ReportsPage() {
  return <ReportsPageClient />;
}
