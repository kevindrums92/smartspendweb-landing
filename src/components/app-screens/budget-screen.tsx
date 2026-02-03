"use client";

import { motion } from "framer-motion";
import { TrendingUp, ChevronLeft, ChevronRight, Plus, Home, Wallet, BarChart3, Settings, UtensilsCrossed, PiggyBank, RefreshCw } from "lucide-react";

export function BudgetScreen() {
  const budgets = [
    {
      icon: UtensilsCrossed,
      name: "Restaurantes",
      spent: 1864000,
      total: 2500000,
      color: "bg-orange-500",
      bgColor: "bg-orange-500/20",
      textColor: "text-orange-500",
      percentage: 75,
    },
    {
      icon: PiggyBank,
      name: "Ahorro",
      spent: 50000,
      total: 500000,
      color: "bg-emerald-500",
      bgColor: "bg-emerald-500/20",
      textColor: "text-emerald-500",
      percentage: 10,
    },
  ];

  const formatCurrency = (amount: number) => {
    return `$ ${amount.toLocaleString('es-CO')}`;
  };

  return (
    <div className="h-full bg-white dark:bg-[#0f1117] text-gray-900 dark:text-white flex flex-col text-[11px]">
      {/* Header */}
      <div className="px-3 pt-1 pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#18B7B0] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold">SmartSpend</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
        </div>
        
        {/* Month Navigation */}
        <div className="flex items-center justify-center gap-3">
          <ChevronLeft className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-medium text-gray-500 dark:text-gray-300">ENE. DE 2026</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Summary Card */}
      <motion.div 
        className="mx-3 p-3 rounded-2xl bg-gray-50 dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between mb-3">
          <div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5">Presupuestado</p>
            <p className="text-lg font-bold">$ 3.000.000</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5">Gastado</p>
            <p className="text-lg font-bold">$ 1.914.000</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 bg-gray-200 dark:bg-[#2d313e] rounded-full overflow-hidden mb-2">
          <motion.div 
            className="h-full bg-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "64%" }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
          />
        </div>
        
        <p className="text-center text-[10px] text-gray-500 dark:text-gray-400">
          Quedan $ 1.086.000 (64%)
        </p>
      </motion.div>

      {/* Active Budgets */}
      <div className="flex-1 overflow-hidden px-3 mt-4">
        <h3 className="text-sm font-semibold mb-3">Presupuestos activos</h3>
        
        <div className="space-y-3">
          {budgets.map((budget, index) => (
            <motion.div 
              key={budget.name}
              className="p-3 rounded-xl bg-gray-50 dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg ${budget.bgColor} flex items-center justify-center shrink-0`}>
                  <budget.icon className={`w-3.5 h-3.5 ${budget.textColor}`} />
                </div>
                <span className="font-medium text-[11px] flex-1 truncate">{budget.name}</span>
                <RefreshCw className="w-3 h-3 text-gray-400 dark:text-gray-500 shrink-0" />
              </div>
              
              {/* Progress Bar */}
              <div className="h-1.5 bg-gray-200 dark:bg-[#2d313e] rounded-full overflow-hidden mb-2">
                <motion.div 
                  className={`h-full ${budget.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${budget.percentage}%` }}
                  transition={{ delay: 0.5 + index * 0.2, duration: 1.5, ease: "easeOut" }}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-[11px]">{formatCurrency(budget.spent)}</span>
                  <span className="text-gray-400 text-[10px]"> / {formatCurrency(budget.total)}</span>
                </div>
                <span className={`font-semibold text-[11px] ${budget.textColor} shrink-0`}>
                  {budget.percentage}%
                </span>
              </div>
              
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                Quedan {formatCurrency(budget.total - budget.spent)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-3 py-3 pb-4 bg-gray-50 dark:bg-[#1a1d26] border-t border-gray-200 dark:border-[#2d313e] shrink-0">
        <div className="flex items-center justify-around">
          <div className="flex flex-col items-center gap-1">
            <Home className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <span className="text-[9px] text-gray-400 dark:text-gray-500">Inicio</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Wallet className="w-5 h-5 text-[#18B7B0]" />
            <span className="text-[9px] text-[#18B7B0]">Presupuesto</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <BarChart3 className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <span className="text-[9px] text-gray-400 dark:text-gray-500">Estadisticas</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Settings className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <span className="text-[9px] text-gray-400 dark:text-gray-500">Ajustes</span>
          </div>
        </div>
      </div>

      {/* FAB */}
      <motion.button 
        className="absolute bottom-14 right-3 w-10 h-10 rounded-full bg-[#18B7B0] flex items-center justify-center shadow-lg shadow-[#18B7B0]/30"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus className="w-5 h-5 text-white" />
      </motion.button>
    </div>
  );
}
