"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { AdminSubscription, PaginatedResponse } from "@/lib/admin/types";
import { STATUS_LABELS, PLAN_LABELS } from "@/lib/admin/types";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type StatusFilter = "all" | "active" | "expired" | "cancelled" | "trial";

const FILTER_LABELS: Record<StatusFilter, string> = {
  all: "Todas",
  active: "Activas",
  expired: "Expiradas",
  cancelled: "Canceladas",
  trial: "Trial",
};

const statusStyles: Record<string, string> = {
  active:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  trial:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  expired:
    "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  cancelled:
    "bg-gray-100 text-gray-600 dark:bg-gray-500/10 dark:text-gray-400",
};

function Pagination({
  page,
  totalPages,
  total,
  label,
  onPrev,
  onNext,
}: {
  page: number;
  totalPages: number;
  total: number;
  label: string;
  onPrev: () => void;
  onNext: () => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Pagina {page} de {totalPages} ({total} {label})
      </p>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={onPrev}
          disabled={page === 1}
          className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-[#2d313e] disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={page === totalPages}
          className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-[#2d313e] disabled:opacity-30 transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
}

export function SubscriptionsTable() {
  const [subscriptions, setSubscriptions] = useState<AdminSubscription[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState<StatusFilter>("all");
  const [loading, setLoading] = useState(true);

  const fetchSubscriptions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        status,
      });

      const res = await fetch(`/api/admin/subscriptions?${params}`);
      if (!res.ok) {
        console.error("[SubscriptionsTable] API error:", res.status);
        return;
      }
      const data: PaginatedResponse<AdminSubscription> = await res.json();

      setSubscriptions(data.data || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("[SubscriptionsTable] Error:", err);
    } finally {
      setLoading(false);
    }
  }, [page, status]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const paginationProps = {
    page,
    totalPages,
    total,
    label: "suscripciones",
    onPrev: () => setPage((p) => Math.max(1, p - 1)),
    onNext: () => setPage((p) => Math.min(totalPages, p + 1)),
  };

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl bg-white dark:bg-[#1a1d26] p-4 shadow-sm">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {total}
          </p>
          <p className="text-xs text-gray-500">Total suscripciones</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-1 rounded-xl bg-gray-100 dark:bg-[#2d313e] p-1 w-fit">
        {(Object.keys(FILTER_LABELS) as StatusFilter[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setStatus(key);
              setPage(1);
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              status === key
                ? "bg-white dark:bg-[#1a1d26] text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {FILTER_LABELS[key]}
          </button>
        ))}
      </div>

      {/* ═══ MOBILE: Card list (< lg) ═══ */}
      <div className="space-y-3 lg:hidden">
        {loading ? (
          <div className="rounded-xl border border-gray-200 dark:border-[#2d313e] bg-white dark:bg-[#1a1d26] px-4 py-12 text-center text-gray-400">
            Cargando suscripciones...
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="rounded-xl border border-gray-200 dark:border-[#2d313e] bg-white dark:bg-[#1a1d26] px-4 py-12 text-center text-gray-400">
            No se encontraron suscripciones
          </div>
        ) : (
          subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="rounded-xl border border-gray-200 dark:border-[#2d313e] bg-white dark:bg-[#1a1d26] px-4 py-3"
            >
              {/* Row 1: user + status badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className="block truncate text-sm font-medium text-gray-900 dark:text-white">
                    {sub.user_email || (
                      <span className="italic text-gray-400">Anonimo</span>
                    )}
                  </span>
                  <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                    {sub.user_id.slice(0, 8)}...
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-lg px-2 py-1 text-xs font-medium ${statusStyles[sub.status] || statusStyles.cancelled}`}
                >
                  {STATUS_LABELS[sub.status] || sub.status}
                </span>
              </div>

              {/* Row 2: plan + env + dates */}
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium text-gray-900 dark:text-white">
                  {PLAN_LABELS[sub.product_id] || sub.product_id}
                </span>
                <span
                  className={`rounded-lg px-1.5 py-0.5 text-[10px] font-medium ${
                    sub.environment === "PRODUCTION"
                      ? "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400"
                      : "bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400"
                  }`}
                >
                  {sub.environment}
                </span>
                <span>Comprado: {formatDate(sub.purchased_at)}</span>
                <span>
                  Expira:{" "}
                  {sub.expires_at ? (
                    formatDate(sub.expires_at)
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      Nunca
                    </span>
                  )}
                </span>
              </div>
            </div>
          ))
        )}

        {/* Mobile pagination */}
        <div className="rounded-xl border border-gray-200 dark:border-[#2d313e] bg-white dark:bg-[#1a1d26]">
          <Pagination {...paginationProps} />
        </div>
      </div>

      {/* ═══ DESKTOP: Table (>= lg) ═══ */}
      <div className="hidden lg:block overflow-hidden rounded-xl border border-gray-200 dark:border-[#2d313e] bg-white dark:bg-[#1a1d26]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-[#2d313e] bg-gray-50 dark:bg-[#15171e]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Usuario
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Plan
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Estado
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Comprado
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Expira
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Entorno
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#2d313e]">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-gray-400"
                  >
                    Cargando suscripciones...
                  </td>
                </tr>
              ) : subscriptions.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-gray-400"
                  >
                    No se encontraron suscripciones
                  </td>
                </tr>
              ) : (
                subscriptions.map((sub) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-gray-50 dark:hover:bg-[#15171e] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {sub.user_email || (
                          <span className="italic text-gray-400">
                            Anonimo
                          </span>
                        )}
                      </span>
                      <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                        {sub.user_id.slice(0, 8)}...
                      </p>
                    </td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">
                      {PLAN_LABELS[sub.product_id] || sub.product_id}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-lg px-2 py-1 text-xs font-medium ${statusStyles[sub.status] || statusStyles.cancelled}`}
                      >
                        {STATUS_LABELS[sub.status] || sub.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {formatDate(sub.purchased_at)}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {sub.expires_at ? formatDate(sub.expires_at) : (
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                          Nunca
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-lg px-2 py-1 text-[11px] font-medium ${
                          sub.environment === "PRODUCTION"
                            ? "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400"
                            : "bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400"
                        }`}
                      >
                        {sub.environment}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Desktop pagination */}
        <div className="border-t border-gray-200 dark:border-[#2d313e]">
          <Pagination {...paginationProps} />
        </div>
      </div>
    </div>
  );
}
