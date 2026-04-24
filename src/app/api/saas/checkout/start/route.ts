import { NextResponse } from "next/server";
import { z } from "zod";
import {
  createSaasBillingEvent,
  createSaasCustomer,
  getSaasCustomerByEmail,
  getSaasCustomerById,
  listSaasPlans,
  setSaasCustomerPassword,
  updateSaasBillingEvent,
  updateSaasCustomer,
} from "@/lib/localDb";
import {
  createMercadoPagoPreference,
  getMercadoPagoPublicKey,
  isMercadoPagoConfigured,
} from "@/lib/payments/mercadoPago";
import {
  friendlyCheckoutStartError,
  summarizeValidationError,
} from "@/lib/saas/userFacingMessages";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const checkoutSchema = z
  .object({
    kind: z.enum(["plan_purchase", "plan_renewal", "credit_purchase"]).default("plan_purchase"),
    customerId: z.string().trim().optional(),
    name: z.string().trim().min(1).max(160).optional(),
    email: z.string().trim().email().max(240).optional(),
    company: z.string().trim().max(160).optional(),
    password: z.string().min(6).max(200).optional(),
    planId: z.string().trim().max(120).nullable().optional(),
    tokenCredits: z.number().int().min(0).max(10_000_000_000).optional(),
  })
  .strict();

function getSitePublicUrl(request: Request) {
  return (
    process.env.SITE_PUBLIC_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.PUBLIC_SITE_URL ||
    "http://127.0.0.1:20132"
  ).replace(/\/$/, "");
}

function getApiPublicUrl(request: Request) {
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

function buildCheckoutItem(kind: string, name: string, amountCents: number, tokenCredits: number) {
  if (kind === "credit_purchase") {
    return {
      title: `${name} - recarga de ${tokenCredits.toLocaleString("pt-BR")} tokens`,
      quantity: 1,
      unit_price: amountCents / 100,
      currency_id: "BRL" as const,
    };
  }

  return {
    title: `Easy IA - ${name}`,
    quantity: 1,
    unit_price: amountCents / 100,
    currency_id: "BRL" as const,
  };
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const validation = validateBody(checkoutSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(
        {
          error: summarizeValidationError(
            validation.error,
            "Revise os dados do checkout e tente novamente."
          ),
        },
        { status: 400 }
      );
    }

    const body = validation.data;
    let customer = body.customerId ? getSaasCustomerById(body.customerId) : null;

    if (!customer) {
      if (!body.email || !body.name) {
        return NextResponse.json(
          { error: "Nome e email sao obrigatorios para iniciar a assinatura." },
          { status: 400 }
        );
      }
      customer = getSaasCustomerByEmail(body.email, { includeUsage: false });
      if (!customer) {
        customer = createSaasCustomer({
          name: body.name,
          email: body.email,
          company: body.company || "",
          status: "inactive",
          billingStatus: "past_due",
          paidUntil: null,
          planId: body.planId || null,
          allowedModels: [],
          allowedCombos: [],
        });
      } else {
        customer = updateSaasCustomer(customer.id, {
          name: body.name,
          company: body.company || customer.company,
          planId: body.planId === undefined ? customer.planId : body.planId,
        });
      }
      if (!customer) {
        return NextResponse.json(
          { error: "Nao foi possivel preparar o cadastro." },
          { status: 500 }
        );
      }
      if (body.password) {
        setSaasCustomerPassword(customer.id, body.password);
      }
    }

    if (body.password) {
      setSaasCustomerPassword(customer.id, body.password);
    }

    const plan =
      body.planId && body.planId !== null
        ? listSaasPlans().find((item) => item.id === body.planId)
        : customer.planId
          ? listSaasPlans().find((item) => item.id === customer?.planId)
          : null;

    const tokenCredits = Math.max(0, body.tokenCredits || 0);
    const amountCents =
      body.kind === "credit_purchase"
        ? Math.max(100, Math.round(tokenCredits / 1000))
        : Math.max(0, plan?.priceMonthlyCents || customer.priceMonthlyCents || 0);

    if (body.kind !== "credit_purchase" && !plan) {
      return NextResponse.json(
        { error: friendlyCheckoutStartError("Plano nao encontrado para pagamento.") },
        { status: 404 }
      );
    }

    if (amountCents <= 0 && body.kind !== "credit_purchase") {
      const activated = updateSaasCustomer(customer.id, {
        status: "active",
        billingStatus: "active",
        paidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        planId: plan?.id || customer.planId,
      });
      return NextResponse.json({
        checkoutUrl: null,
        customer: activated,
        freeActivation: true,
      });
    }

    if (!isMercadoPagoConfigured()) {
      return NextResponse.json(
        {
          error: friendlyCheckoutStartError(
            "Mercado Pago ainda nao foi configurado neste ambiente. Defina MERCADO_PAGO_ACCESS_TOKEN para liberar o checkout."
          ),
        },
        { status: 400 }
      );
    }

    const event = createSaasBillingEvent({
      customerId: customer.id,
      planId: plan?.id || customer.planId,
      kind: body.kind,
      amountCents,
      tokenCredits,
      metadataJson: JSON.stringify({
        customerId: customer.id,
        planId: plan?.id || customer.planId || null,
        tokenCredits,
      }),
    });

    const sitePublicUrl = getSitePublicUrl(request);
    const apiPublicUrl = getApiPublicUrl(request);
    const preference = await createMercadoPagoPreference({
      items: [
        buildCheckoutItem(body.kind, plan?.name || "Recarga de tokens", amountCents, tokenCredits),
      ],
      payer: {
        name: customer.name,
        email: customer.email,
      },
      external_reference: event.externalReference,
      notification_url: `${apiPublicUrl}/api/saas/checkout/webhook`,
      back_urls: {
        success: `${sitePublicUrl}/portal?checkout=success`,
        failure: `${sitePublicUrl}/portal?checkout=failure`,
        pending: `${sitePublicUrl}/portal?checkout=pending`,
      },
      auto_return: "approved",
      metadata: {
        customerId: customer.id,
        planId: plan?.id || customer.planId || null,
        billingEventId: event.id,
        kind: body.kind,
        tokenCredits,
      },
    });

    updateSaasBillingEvent(event.id, {
      checkoutUrl: preference.init_point || preference.sandbox_init_point || null,
      preferenceId: preference.id || null,
      metadataJson: JSON.stringify(preference),
    });

    return NextResponse.json({
      checkoutUrl: preference.init_point || preference.sandbox_init_point || null,
      preferenceId: preference.id || null,
      publicKey: getMercadoPagoPublicKey() || null,
      customerId: customer.id,
      billingEventId: event.id,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: friendlyCheckoutStartError(message) }, { status: 500 });
  }
}
