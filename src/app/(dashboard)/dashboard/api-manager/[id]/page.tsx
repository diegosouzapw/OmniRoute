import ApiKeyDetailsPageClient from "./ApiKeyDetailsPageClient";

export default async function ApiKeyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ApiKeyDetailsPageClient keyId={id} />;
}
