"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ChevronLeft, ChevronRight, Plus, Home, Wallet, BarChart3, Settings, ShoppingCart, UtensilsCrossed, PiggyBank } from "lucide-react";

export function HomeScreen() {
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

      {/* Balance Card */}
      <motion.div 
        className="mx-3 p-3 rounded-2xl bg-gradient-to-br from-[#18B7B0] to-[#149E98]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-[10px] text-white/80 mb-0.5">Balance Disponible</p>
        <h2 className="text-2xl font-bold mb-3">$ 115.000</h2>
        
        <div className="flex gap-2">
          <div className="flex-1 bg-white/20 rounded-xl p-2 flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <TrendingUp className="w-3 h-3 text-white" />
            </div>
            <div>
              <p className="text-[8px] text-white/70">INGRESOS</p>
              <p className="text-[10px] font-semibold">+$ 12.850.000</p>
            </div>
          </div>
          <div className="flex-1 bg-white/20 rounded-xl p-2 flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <TrendingDown className="w-3 h-3 text-white" />
            </div>
            <div>
              <p className="text-[8px] text-white/70">GASTOS</p>
              <p className="text-[10px] font-semibold">-$ 12.735.000</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Daily Budget Banner */}
      <motion.div 
        className="mx-3 mt-2 p-2.5 rounded-xl bg-gray-50 dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e] flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="w-7 h-7 rounded-lg bg-[#18B7B0]/20 flex items-center justify-center shrink-0">
          <Wallet className="w-3.5 h-3.5 text-[#18B7B0]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] text-[#18B7B0] font-medium">AL MES LE QUEDAN 5 DIAS</p>
          <p className="text-[10px] text-gray-600 dark:text-gray-300 truncate">Podrias gastar $ 23.000 / dia</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 shrink-0">
          <span className="text-base">×</span>
        </button>
      </motion.div>

      {/* History Link */}
      <div className="px-3 mt-2">
        <button className="text-[#18B7B0] text-[11px] font-medium flex items-center gap-1">
          Ver historial completo <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Transactions */}
      <div className="flex-1 overflow-hidden px-3 mt-2">
        <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-2 flex justify-between">
          <span>Hoy</span>
          <span>-$ 211.000</span>
        </p>
        
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 dark:bg-[#1a1d26]">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
              <ShoppingCart className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium truncate">Compra de carnes</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">Mercado</p>
            </div>
            <p className="text-[11px] font-medium shrink-0">-$ 86.000</p>
          </div>
          
          <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 dark:bg-[#1a1d26]">
            <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0">
              <UtensilsCrossed className="w-3.5 h-3.5 text-orange-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium truncate">Cena nocturna</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">Restaurantes</p>
            </div>
            <p className="text-[11px] font-medium shrink-0">-$ 125.000</p>
          </div>
        </motion.div>

        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-3 mb-2 flex justify-between">
          <span>Ayer</span>
          <span>-$ 165.000</span>
        </p>
        
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 dark:bg-[#1a1d26]">
            <div className="w-7 h-7 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
              <PiggyBank className="w-3.5 h-3.5 text-red-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium truncate">Ahorro para la moto</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">Ahorro</p>
            </div>
            <p className="text-[11px] font-medium shrink-0">-$ 50.000</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="px-3 py-3 pb-4 bg-gray-50 dark:bg-[#1a1d26] border-t border-gray-200 dark:border-[#2d313e] shrink-0">
        <div className="flex items-center justify-around">
          <div className="flex flex-col items-center gap-1">
            <Home className="w-5 h-5 text-[#18B7B0]" />
            <span className="text-[9px] text-[#18B7B0]">Inicio</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Wallet className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <span className="text-[9px] text-gray-400 dark:text-gray-500">Presupuesto</span>
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
