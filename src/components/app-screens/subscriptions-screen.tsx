"use client";

import { motion } from "framer-motion";
import { ChevronLeft, Tv, Power } from "lucide-react";

export function SubscriptionsScreen() {
  const subscriptions = [
    {
      name: "Netflix",
      category: "Suscripciones",
      amount: "$ 60.000",
      frequency: "Mensual el dia 17",
      nextDate: "17 de feb. de 2026",
      color: "text-red-500",
      bgColor: "bg-red-500/20",
    },
    {
      name: "Disney plus",
      category: "Suscripciones",
      amount: "$ 50.000",
      frequency: "Mensual el dia 17",
      nextDate: "17 de feb. de 2026",
      color: "text-blue-500",
      bgColor: "bg-blue-500/20",
    },
    {
      name: "Apple",
      category: "Suscripciones",
      amount: "$ 60.000",
      frequency: "Mensual el dia 14",
      nextDate: "14 de feb. de 2026",
      color: "text-gray-400",
      bgColor: "bg-gray-500/20",
    },
    {
      name: "Rappi prime",
      category: "Suscripciones",
      amount: "$ 33.000",
      frequency: "Mensual el dia 14",
      nextDate: "14 de feb. de 2026",
      color: "text-orange-500",
      bgColor: "bg-orange-500/20",
    },
  ];

  return (
    <div className="h-full bg-white dark:bg-[#0f1117] text-gray-900 dark:text-white flex flex-col text-[11px]">
      {/* Header */}
      <div className="px-3 pt-1 pb-3 flex items-center gap-3">
        <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#1a1d26] flex items-center justify-center">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold">Programadas</h1>
      </div>

      {/* Subscriptions List */}
      <div className="flex-1 overflow-hidden px-3">
        <div className="space-y-3">
          {subscriptions.map((sub, index) => (
            <motion.div 
              key={sub.name}
              className="p-3 rounded-xl bg-gray-50 dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.15 }}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-8 h-8 rounded-lg ${sub.bgColor} flex items-center justify-center shrink-0`}>
                    <Tv className={`w-4 h-4 ${sub.color}`} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[11px] truncate">{sub.name}</h3>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{sub.category}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 text-[9px] font-medium shrink-0">
                  Activa
                </span>
              </div>
              
              <p className="text-lg font-bold mb-1">-{sub.amount}</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5">{sub.frequency}</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-3">Proxima: {sub.nextDate}</p>
              
              <button className="w-full py-2 rounded-lg bg-red-500/10 text-red-500 dark:text-red-400 text-[11px] font-medium flex items-center justify-center gap-1.5 hover:bg-red-500/20 transition-colors">
                <Power className="w-3.5 h-3.5" />
                Desactivar
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
