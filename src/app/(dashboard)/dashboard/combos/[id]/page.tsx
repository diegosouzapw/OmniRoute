import ComboControlCenterClient from "../ComboControlCenterClient";

export default async function ComboControlCenterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ComboControlCenterClient comboId={id} />;
}
