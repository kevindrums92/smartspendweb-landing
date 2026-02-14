"use client";

import { useState, useEffect, useCallback, Fragment } from "react";
import {
  Search,
  Gift,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar,
  Receipt,
  Clock,
  User,
  RefreshCw,
} from "lucide-react";
import type { AdminUser, PaginatedResponse } from "@/lib/admin/types";
import { STATUS_LABELS, PLAN_LABELS } from "@/lib/admin/types";
import { StatsCards } from "./stats-cards";
import { GiftModal } from "./gift-modal";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(dateStr: string | null) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleString("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function timeAgo(dateStr: string | null) {
  if (!dateStr) return "-";
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `hace ${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `hace ${days}d`;
  return formatDate(dateStr);
}

function SubscriptionBadge({
  subscription,
}: {
  subscription: AdminUser["subscription"];
}) {
  if (!subscription) {
    return (
      <span className="rounded-lg bg-gray-100 dark:bg-gray-500/10 px-2 py-1 text-xs font-medium text-gray-400">
        Free
      </span>
    );
  }

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

  const plan = PLAN_LABELS[subscription.product_id] || subscription.product_id;
  const status = STATUS_LABELS[subscription.status] || subscription.status;

  return (
    <span
      className={`rounded-lg px-2 py-1 text-xs font-medium ${statusStyles[subscription.status] || statusStyles.cancelled}`}
    >
      {plan} - {status}
    </span>
  );
}

type FilterType = "all" | "authenticated" | "anonymous";

const FILTER_LABELS: Record<FilterType, string> = {
  all: "Todos",
  authenticated: "Autenticados",
  anonymous: "Anonimos",
};

/* ── Drill-down detail (shared between mobile & desktop) ── */
function UserDetail({ user }: { user: AdminUser }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10">
            <Receipt className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {user.total_transactions ?? 0}
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Transacciones
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-500/10">
            <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {formatDate(user.created_at)}
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Fecha de registro
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-500/10">
            <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {formatDateTime(user.last_sync)}
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Ultima sincronizacion
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-500/10">
            <User className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {user.full_name || "-"}
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Nombre
            </p>
          </div>
        </div>
      </div>

      <p className="mt-3 text-[11px] text-gray-400 font-mono">
        ID: {user.id}
      </p>
    </div>
  );
}

export function UsersTable() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [loading, setLoading] = useState(true);
  const [giftUser, setGiftUser] = useState<AdminUser | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        filter,
      });
      if (search) params.set("search", search);

      const res = await fetch(`/api/admin/users?${params}`);
      if (!res.ok) {
        console.error("[UsersTable] API error:", res.status);
        return;
      }
      const data: PaginatedResponse<AdminUser> = await res.json();

      setUsers(data.data || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("[UsersTable] Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  }, [page, search, filter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Debounced search
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  function toggleExpand(userId: string) {
    setExpandedId((prev) => (prev === userId ? null : userId));
  }

  return (
    <div className="space-y-6">
      <StatsCards users={users} total={total} />

      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-[#2d313e] bg-white dark:bg-[#1a1d26] px-3 py-2 sm:w-80">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Buscar por email o ID..."
            className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Filter tabs + Refresh button */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1 rounded-xl bg-gray-100 dark:bg-[#2d313e] p-1">
            {(Object.keys(FILTER_LABELS) as FilterType[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setFilter(key);
                  setPage(1);
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  filter === key
                    ? "bg-white dark:bg-[#1a1d26] text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {FILTER_LABELS[key]}
              </button>
            ))}
          </div>

          {/* Refresh button */}
          <button
            type="button"
            onClick={fetchUsers}
            disabled={loading}
            className="rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-[#2d313e] transition-colors disabled:opacity-50"
            title="Actualizar lista"
          >
            <RefreshCw
              className={`h-4 w-4 text-gray-600 dark:text-gray-400 ${
                loading ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          MOBILE: Card list (visible < lg)
         ════════════════════════════════════════════ */}
      <div className="space-y-3 lg:hidden">
        {loading ? (
          <div className="rounded-xl border border-gray-200 dark:border-[#2d313e] bg-white dark:bg-[#1a1d26] px-4 py-12 text-center text-gray-400">
            Cargando usuarios...
          </div>
        ) : users.length === 0 ? (
          <div className="rounded-xl border border-gray-200 dark:border-[#2d313e] bg-white dark:bg-[#1a1d26] px-4 py-12 text-center text-gray-400">
            No se encontraron usuarios
          </div>
        ) : (
          users.map((user) => {
            const isExpanded = expandedId === user.id;
            return (
              <div
                key={user.id}
                className="overflow-hidden rounded-xl border border-gray-200 dark:border-[#2d313e] bg-white dark:bg-[#1a1d26]"
              >
                {/* Card header – tap to expand */}
                <button
                  type="button"
                  onClick={() => toggleExpand(user.id)}
                  className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors active:bg-gray-50 dark:active:bg-[#15171e]"
                >
                  {/* Left: user info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        {user.email || (
                          <span className="italic text-gray-400">
                            Anonimo
                          </span>
                        )}
                      </span>
                      <span
                        className={`shrink-0 rounded-lg px-1.5 py-0.5 text-[10px] font-medium ${
                          user.is_anonymous
                            ? "bg-gray-100 dark:bg-gray-500/10 text-gray-500"
                            : "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400"
                        }`}
                      >
                        {user.is_anonymous ? "Anon" : "Auth"}
                      </span>
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      <SubscriptionBadge subscription={user.subscription} />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {timeAgo(user.last_sync)}
                      </span>
                    </div>

                    <p className="mt-1 text-[10px] text-gray-400 font-mono">
                      {user.id.slice(0, 8)}...
                    </p>
                  </div>

                  {/* Right: chevron */}
                  <ChevronDown
                    className={`mt-1 h-4 w-4 shrink-0 text-gray-400 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t border-gray-100 dark:border-[#2d313e] bg-gray-50/50 dark:bg-[#12141a] px-4 py-4">
                    <UserDetail user={user} />

                    <button
                      type="button"
                      onClick={() => setGiftUser(user)}
                      className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#18B7B0]/10 px-3 py-2 text-xs font-medium text-[#18B7B0] hover:bg-[#18B7B0]/20 transition-colors"
                    >
                      <Gift className="h-3.5 w-3.5" />
                      Regalar Pro
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Mobile pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-[#2d313e] bg-white dark:bg-[#1a1d26] px-4 py-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Pagina {page} de {totalPages} ({total})
            </p>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-[#2d313e] disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-[#2d313e] disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════════
          DESKTOP: Table (visible >= lg)
         ════════════════════════════════════════════ */}
      <div className="hidden lg:block overflow-hidden rounded-xl border border-gray-200 dark:border-[#2d313e] bg-white dark:bg-[#1a1d26]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-[#2d313e] bg-gray-50 dark:bg-[#15171e]">
                <th className="w-8 px-2 py-3" />
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Tipo
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Ultima sync
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Suscripcion
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Acciones
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
                    Cargando usuarios...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-gray-400"
                  >
                    No se encontraron usuarios
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const isExpanded = expandedId === user.id;
                  return (
                    <Fragment key={user.id}>
                      {/* Main row */}
                      <tr
                        onClick={() => toggleExpand(user.id)}
                        className="hover:bg-gray-50 dark:hover:bg-[#15171e] transition-colors cursor-pointer"
                      >
                        <td className="px-2 py-3 text-center">
                          <ChevronDown
                            className={`h-4 w-4 text-gray-400 transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {user.email || (
                              <span className="italic text-gray-400">
                                Anonimo
                              </span>
                            )}
                          </span>
                          <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                            {user.id.slice(0, 8)}...
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-lg px-2 py-1 text-xs font-medium ${
                              user.is_anonymous
                                ? "bg-gray-100 dark:bg-gray-500/10 text-gray-500"
                                : "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400"
                            }`}
                          >
                            {user.is_anonymous ? "Anonimo" : "Autenticado"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                          {timeAgo(user.last_sync)}
                        </td>
                        <td className="px-4 py-3">
                          <SubscriptionBadge subscription={user.subscription} />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setGiftUser(user);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#18B7B0]/10 px-3 py-1.5 text-xs font-medium text-[#18B7B0] hover:bg-[#18B7B0]/20 transition-colors"
                          >
                            <Gift className="h-3.5 w-3.5" />
                            Regalar Pro
                          </button>
                        </td>
                      </tr>

                      {/* Drill-down row */}
                      {isExpanded && (
                        <tr className="bg-gray-50/50 dark:bg-[#12141a]">
                          <td colSpan={6} className="px-4 py-4">
                            <div className="ml-6">
                              <UserDetail user={user} />
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Desktop pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 dark:border-[#2d313e] px-4 py-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Pagina {page} de {totalPages} ({total} usuarios)
            </p>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-[#2d313e] disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-[#2d313e] disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Gift Modal */}
      {giftUser && (
        <GiftModal
          user={giftUser}
          onClose={() => setGiftUser(null)}
          onSuccess={() => {
            setGiftUser(null);
            fetchUsers();
          }}
        />
      )}
    </div>
  );
}
