"use client";

import { useState } from "react";
import { X, Gift, Loader2, AlertTriangle, Check } from "lucide-react";
import type { AdminUser, GiftDuration } from "@/lib/admin/types";
import { DURATION_LABELS, PLAN_LABELS } from "@/lib/admin/types";

interface GiftModalProps {
  user: AdminUser;
  onClose: () => void;
  onSuccess: () => void;
}

const DURATION_OPTIONS: {
  value: GiftDuration;
  description: string;
}[] = [
  { value: "monthly", description: "30 dias de acceso Pro" },
  { value: "annual", description: "365 dias de acceso Pro" },
  { value: "lifetime", description: "Acceso Pro permanente" },
];

export function GiftModal({ user, onClose, onSuccess }: GiftModalProps) {
  const [duration, setDuration] = useState<GiftDuration | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const hasActiveSub =
    user.subscription?.status === "active" ||
    user.subscription?.status === "trial";

  async function handleGift() {
    if (!duration) return;
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/subscriptions/gift", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, duration }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al regalar suscripcion");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch {
      setError("Error de conexion. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative mx-4 w-full max-w-md rounded-2xl bg-white dark:bg-[#1a1d26] p-6 shadow-xl">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-[#2d313e] transition-colors"
        >
          <X className="h-5 w-5 text-gray-400" />
        </button>

        {/* Success state */}
        {success ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
              <Check className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Suscripcion regalada
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {DURATION_LABELS[duration!]} de Pro para{" "}
              {user.email || `Usuario ${user.id.slice(0, 8)}`}
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#18B7B0]/10">
                <Gift className="h-5 w-5 text-[#18B7B0]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Regalar Suscripcion Pro
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email || `Usuario ${user.id.slice(0, 8)}...`}
                </p>
              </div>
            </div>

            {/* Warning if already has subscription */}
            {hasActiveSub && (
              <div className="mb-4 flex items-start gap-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 px-3 py-2.5">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <p className="text-xs text-amber-700 dark:text-amber-400">
                  Este usuario ya tiene una suscripcion{" "}
                  <strong>
                    {PLAN_LABELS[user.subscription!.product_id]}{" "}
                    {user.subscription!.status}
                  </strong>
                  . Regalar una nueva reemplazara la actual.
                </p>
              </div>
            )}

            {/* Duration selector */}
            <div className="mb-5 space-y-2">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Duracion
              </p>
              {DURATION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setDuration(opt.value)}
                  className={`flex w-full items-center justify-between rounded-xl border-2 px-4 py-3 text-left transition-colors ${
                    duration === opt.value
                      ? "border-[#18B7B0] bg-[#18B7B0]/5"
                      : "border-gray-200 dark:border-[#2d313e] hover:border-gray-300 dark:hover:border-[#3d414e]"
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {DURATION_LABELS[opt.value]}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {opt.description}
                    </p>
                  </div>
                  {duration === opt.value && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#18B7B0]">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 rounded-xl bg-red-50 dark:bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl bg-gray-100 dark:bg-[#2d313e] py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#3d414e] transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleGift}
                disabled={!duration || loading}
                className="flex-1 rounded-xl bg-[#18B7B0] py-3 text-sm font-medium text-white hover:bg-[#15a39d] disabled:opacity-50 transition-all active:scale-[0.98]"
              >
                {loading ? (
                  <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                ) : (
                  "Confirmar regalo"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
