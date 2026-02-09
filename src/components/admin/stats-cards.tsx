"use client";

import { Users, UserCheck, UserX, Crown } from "lucide-react";
import type { AdminUser } from "@/lib/admin/types";

interface StatsCardsProps {
  users: AdminUser[];
  total: number;
}

export function StatsCards({ users, total }: StatsCardsProps) {
  const authenticated = users.filter((u) => !u.is_anonymous).length;
  const anonymous = users.filter((u) => u.is_anonymous).length;
  const proActive = users.filter(
    (u) => u.subscription?.status === "active"
  ).length;

  const stats = [
    {
      label: "Total usuarios",
      value: total,
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
    },
    {
      label: "Autenticados",
      value: authenticated,
      icon: UserCheck,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
    },
    {
      label: "Anonimos",
      value: anonymous,
      icon: UserX,
      color: "text-gray-600 dark:text-gray-400",
      bg: "bg-gray-100 dark:bg-gray-500/10",
    },
    {
      label: "Pro activos",
      value: proActive,
      icon: Crown,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl bg-white dark:bg-[#1a1d26] p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}
            >
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
