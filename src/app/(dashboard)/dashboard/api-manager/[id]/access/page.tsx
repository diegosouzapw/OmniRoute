import ApiKeyAccessEditorClient from "./ApiKeyAccessEditorClient";

export default async function ApiKeyAccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ApiKeyAccessEditorClient apiKeyId={id} />;
}
