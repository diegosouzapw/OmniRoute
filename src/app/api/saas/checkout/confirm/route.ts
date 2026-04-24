import { NextResponse } from "next/server";
import { z } from "zod";
import {
  activateSaasCustomerBilling,
  addSaasCustomerCredits,
  getSaasBillingEventByExternalReference,
  getSaasBillingEventByPaymentId,
  updateSaasBillingEvent,
} from "@/lib/localDb";
import { ensureCustomerPrimaryApiKey } from "@/lib/saas/ensureCustomerApiKey";
import { getMercadoPagoPayment, isMercadoPagoConfigured } from "@/lib/payments/mercadoPago";
import {
  friendlyCheckoutConfirmError,
  friendlyCheckoutStatusMessage,
  summarizeValidationError,
} from "@/lib/saas/userFacingMessages";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const confirmSchema = z
  .object({
    paymentId: z.string().trim().min(1).optional(),
    externalReference: z.string().trim().min(1).optional(),
  })
  .strict();

async function applyApprovedBilling(
  event: NonNullable<ReturnType<typeof getSaasBillingEventByPaymentId>>,
  payment: any
) {
  if (event.kind === "credit_purchase") {
    addSaasCustomerCredits(event.customerId, event.tokenCredits);
  } else {
    activateSaasCustomerBilling({
      customerId: event.customerId,
      planId: event.planId,
      paymentId: String(payment?.id || event.paymentId || ""),
      paymentStatus: String(payment?.status || "approved"),
      approvedAt: payment?.date_approved || new Date().toISOString(),
    });
  }
  await ensureCustomerPrimaryApiKey(event.customerId);
  return updateSaasBillingEvent(event.id, {
    status: "approved",
    paymentId: String(payment?.id || event.paymentId || ""),
    approvedAt: payment?.date_approved || new Date().toISOString(),
    metadataJson: JSON.stringify(payment || {}),
  });
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const validation = validateBody(confirmSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(
        {
          error: summarizeValidationError(
            validation.error,
            "Informe um identificador valido do pagamento para consultar o checkout."
          ),
        },
        { status: 400 }
      );
    }

    if (!isMercadoPagoConfigured()) {
      return NextResponse.json(
        { error: friendlyCheckoutConfirmError("Mercado Pago nao configurado neste ambiente.") },
        { status: 400 }
      );
    }

    let event =
      (validation.data.paymentId && getSaasBillingEventByPaymentId(validation.data.paymentId)) ||
      (validation.data.externalReference &&
        getSaasBillingEventByExternalReference(validation.data.externalReference)) ||
      null;

    let payment: any = null;
    if (validation.data.paymentId) {
      payment = await getMercadoPagoPayment(validation.data.paymentId);
      if (!event && payment?.external_reference) {
        event = getSaasBillingEventByExternalReference(payment.external_reference);
      }
    }

    if (!event) {
      return NextResponse.json(
        { error: friendlyCheckoutConfirmError("Pagamento nao encontrado.") },
        { status: 404 }
      );
    }

    if (!payment && event.paymentId) {
      payment = await getMercadoPagoPayment(event.paymentId);
    }

    if (!payment) {
      return NextResponse.json(
        { error: friendlyCheckoutConfirmError("Nao foi possivel consultar o pagamento.") },
        { status: 404 }
      );
    }

    const status = String(payment.status || "").toLowerCase();
    if (status === "approved") {
      const updated = await applyApprovedBilling(event, payment);
      return NextResponse.json({
        ok: true,
        status,
        message: friendlyCheckoutStatusMessage(status),
        event: updated,
      });
    }

    const normalizedStatus =
      status === "rejected"
        ? "rejected"
        : status === "cancelled"
          ? "cancelled"
          : status === "expired"
            ? "expired"
            : "pending";
    const updated = updateSaasBillingEvent(event.id, {
      status: normalizedStatus,
      paymentId: String(payment.id || event.paymentId || ""),
      metadataJson: JSON.stringify(payment || {}),
    });
    return NextResponse.json({
      ok: true,
      status,
      message: friendlyCheckoutStatusMessage(status),
      event: updated,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: friendlyCheckoutConfirmError(message) }, { status: 500 });
  }
}
