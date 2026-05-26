"use client";

interface DeliveryStatusBadgeProps {
  status: string;
  httpStatus?: number | null;
}

export function DeliveryStatusBadge({ status, httpStatus }: DeliveryStatusBadgeProps) {
  const isSuccess = status === "success";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${
        isSuccess
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
          : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-300"
      }`}
    >
      <span className="material-symbols-outlined text-[12px]">
        {isSuccess ? "check_circle" : "error"}
      </span>
      {httpStatus ? httpStatus : isSuccess ? "OK" : "ERR"}
    </span>
  );
}
