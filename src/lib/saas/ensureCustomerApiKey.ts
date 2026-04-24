import {
  createApiKey,
  getSaasCustomerById,
  linkApiKeyToSaasCustomer,
  updateApiKeyPermissions,
} from "@/lib/localDb";
import { getConsistentMachineId } from "@/shared/utils/machineId";

export async function ensureCustomerPrimaryApiKey(customerId: string) {
  const existing = getSaasCustomerById(customerId);
  const activeKey = existing?.apiKeys?.find((key) => key.isActive) || existing?.apiKeys?.[0];
  if (activeKey) return activeKey;

  const customer = getSaasCustomerById(customerId);
  if (!customer) throw new Error("Cliente nao encontrado para gerar API key.");

  const machineId = await getConsistentMachineId();
  const apiKey = await createApiKey(`${customer.name} API Key`, machineId);
  await updateApiKeyPermissions(apiKey.id, {
    allowedModels: customer.allowedModels || [],
    noLog: false,
    isActive: customer.status === "active" && customer.billingStatus === "active",
  });
  linkApiKeyToSaasCustomer({
    customerId,
    apiKeyId: apiKey.id,
    label: "Principal",
    isActive: customer.status === "active" && customer.billingStatus === "active",
  });
  const refreshed = getSaasCustomerById(customerId);
  return (
    refreshed?.apiKeys?.find((key) => key.apiKeyId === apiKey.id) || refreshed?.apiKeys?.[0] || null
  );
}
