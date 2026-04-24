import { friendlyMercadoPagoError } from "@/lib/saas/userFacingMessages";

type MercadoPagoPreferenceItem = {
  title: string;
  quantity: number;
  unit_price: number;
  currency_id: "BRL";
};

type MercadoPagoPreferenceInput = {
  items: MercadoPagoPreferenceItem[];
  payer: {
    name?: string;
    surname?: string;
    email: string;
  };
  external_reference: string;
  notification_url?: string;
  back_urls?: {
    success?: string;
    failure?: string;
    pending?: string;
  };
  auto_return?: "approved";
  metadata?: Record<string, unknown>;
};

function getAccessToken() {
  return process.env.MERCADO_PAGO_ACCESS_TOKEN || process.env.MP_ACCESS_TOKEN || "";
}

export function getMercadoPagoPublicKey() {
  return process.env.MERCADO_PAGO_PUBLIC_KEY || process.env.MP_PUBLIC_KEY || "";
}

export function isMercadoPagoConfigured() {
  return Boolean(getAccessToken());
}

async function mercadoPagoFetch(path: string, init?: RequestInit) {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error(
      friendlyMercadoPagoError(
        "Mercado Pago nao configurado. Defina MERCADO_PAGO_ACCESS_TOKEN para ativar checkout."
      )
    );
  }

  let response: Response;
  try {
    response = await fetch(`https://api.mercadopago.com${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
      cache: "no-store",
    });
  } catch (error) {
    throw new Error(friendlyMercadoPagoError(error));
  }

  const text = await response.text();
  let data: any = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    if (!response.ok) {
      throw new Error(friendlyMercadoPagoError(text || response.statusText));
    }
    data = {};
  }

  if (!response.ok) {
    const errorText =
      data?.message ||
      data?.error_description ||
      data?.error ||
      "Falha na chamada ao Mercado Pago.";
    throw new Error(friendlyMercadoPagoError(errorText));
  }
  return data;
}

export async function createMercadoPagoPreference(input: MercadoPagoPreferenceInput) {
  return mercadoPagoFetch("/checkout/preferences", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function getMercadoPagoPayment(paymentId: string) {
  return mercadoPagoFetch(`/v1/payments/${paymentId}`, { method: "GET" });
}
