import { NextResponse } from "next/server";
import {
  activateSaasCustomerBilling,
  addSaasCustomerCredits,
  getSaasBillingEventByExternalReference,
  getSaasBillingEventByPaymentId,
  updateSaasBillingEvent,
} from "@/lib/localDb";
import { ensureCustomerPrimaryApiKey } from "@/lib/saas/ensureCustomerApiKey";
import { getMercadoPagoPayment, isMercadoPagoConfigured } from "@/lib/payments/mercadoPago";

async function applyBillingApproval(
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
    if (!isMercadoPagoConfigured()) {
      return NextResponse.json({ ok: true, skipped: "not_configured" });
    }

    const payload = await request.json().catch(() => ({}));
    const paymentId =
      payload?.data?.id || payload?.id || payload?.resource?.split("/").pop() || null;
    if (!paymentId) {
      return NextResponse.json({ ok: true, skipped: "missing_payment_id" });
    }

    const payment = await getMercadoPagoPayment(String(paymentId));
    const event =
      getSaasBillingEventByPaymentId(String(payment.id || paymentId)) ||
      (payment?.external_reference
        ? getSaasBillingEventByExternalReference(String(payment.external_reference))
        : null);

    if (!event) {
      return NextResponse.json({ ok: true, skipped: "billing_event_not_found" });
    }

    const status = String(payment.status || "").toLowerCase();
    if (status === "approved") {
      await applyBillingApproval(event, payment);
    } else {
      const normalizedStatus =
        status === "rejected"
          ? "rejected"
          : status === "cancelled"
            ? "cancelled"
            : status === "expired"
              ? "expired"
              : "pending";
      updateSaasBillingEvent(event.id, {
        status: normalizedStatus,
        paymentId: String(payment.id || paymentId),
        metadataJson: JSON.stringify(payment || {}),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : String(error) },
      { status: 200 }
    );
  }
}
