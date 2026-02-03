"use client";

import { motion } from "framer-motion";
import { TrendingUp, ChevronLeft, ChevronRight, Home, Wallet, BarChart3, Settings, DollarSign, UtensilsCrossed, Calendar, TrendingUp as TrendIcon, SlidersHorizontal, FileText } from "lucide-react";

export function StatsScreen() {
  const chartData = [
    { color: "#18B7B0", percentage: 35 },
    { color: "#f59e0b", percentage: 20 },
    { color: "#10b981", percentage: 15 },
    { color: "#3b82f6", percentage: 10 },
    { color: "#8b5cf6", percentage: 8 },
    { color: "#ec4899", percentage: 5 },
    { color: "#f97316", percentage: 4 },
    { color: "#06b6d4", percentage: 3 },
  ];

  const categories = [
    { name: "Facturas", amount: "$ 4.500.000", color: "#18B7B0", icon: FileText },
    { name: "Restaurantes", amount: "$ 1.864.000", color: "#f59e0b", icon: UtensilsCrossed },
  ];

  const calculateArc = (startAngle: number, endAngle: number, innerRadius: number, outerRadius: number) => {
    const start = polarToCartesian(100, 100, outerRadius, endAngle);
    const end = polarToCartesian(100, 100, outerRadius, startAngle);
    const innerStart = polarToCartesian(100, 100, innerRadius, endAngle);
    const innerEnd = polarToCartesian(100, 100, innerRadius, startAngle);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", start.x, start.y,
      "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
      "L", innerEnd.x, innerEnd.y,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  let currentAngle = 0;

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

      {/* Quick View Section */}
      <div className="px-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Vista Rapida</h3>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#18B7B0] text-[10px] font-medium">
            <SlidersHorizontal className="w-3 h-3" />
            Personalizar
            <span className="w-4 h-4 rounded-full bg-white text-[#18B7B0] text-[9px] flex items-center justify-center font-bold">1</span>
          </button>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <motion.div 
            className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center mb-2">
              <DollarSign className="w-3 h-3 text-blue-500" />
            </div>
            <p className="text-[9px] text-gray-500 dark:text-gray-400 mb-0.5 leading-tight">Promedio de Gasto Diario</p>
            <p className="text-sm font-bold">$ 316.731</p>
          </motion.div>
          
          <motion.div 
            className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-6 h-6 rounded-lg bg-orange-500/20 flex items-center justify-center mb-2">
              <UtensilsCrossed className="w-3 h-3 text-orange-500" />
            </div>
            <p className="text-[9px] text-gray-500 dark:text-gray-400 mb-0.5">Categoria Top</p>
            <p className="text-sm font-bold truncate">Restaurantes</p>
          </motion.div>
          
          <motion.div 
            className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center mb-2">
              <Calendar className="w-3 h-3 text-purple-500" />
            </div>
            <p className="text-[9px] text-gray-500 dark:text-gray-400 mb-0.5 leading-tight">Dia que mas gastas</p>
            <p className="text-sm font-bold">Sabado</p>
          </motion.div>
          
          <motion.div 
            className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-6 h-6 rounded-lg bg-red-500/20 flex items-center justify-center mb-2">
              <TrendIcon className="w-3 h-3 text-red-500" />
            </div>
            <p className="text-[9px] text-gray-500 dark:text-gray-400 mb-0.5">vs Mes Anterior</p>
            <p className="text-sm font-bold text-red-500 dark:text-red-400">+37%</p>
          </motion.div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex-1 overflow-hidden px-3">
        <h3 className="text-sm font-semibold mb-3">Gastos por Categoria</h3>
        
        {/* Donut Chart */}
        <motion.div 
          className="relative w-32 h-32 mx-auto mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
            {chartData.map((segment, index) => {
              const startAngle = currentAngle;
              const endAngle = currentAngle + (segment.percentage / 100) * 360;
              currentAngle = endAngle;
              
              return (
                <motion.path
                  key={index}
                  d={calculateArc(startAngle, endAngle, 60, 90)}
                  fill={segment.color}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                />
              );
            })}
          </svg>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-base font-bold">$ 12.735.000</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">gastado</p>
          </div>
        </motion.div>

        {/* Category List */}
        <div className="space-y-2">
          {categories.map((category, index) => (
            <motion.div 
              key={category.name}
              className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div 
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: category.color }}
              />
              <div 
                className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: category.color + "20" }}
              >
                <category.icon className="w-3 h-3" style={{ color: category.color }} />
              </div>
              <span className="flex-1 font-medium text-[11px] truncate">{category.name}</span>
              <span className="font-semibold text-[11px] shrink-0">{category.amount}</span>
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
            <Wallet className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <span className="text-[9px] text-gray-400 dark:text-gray-500">Presupuesto</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <BarChart3 className="w-5 h-5 text-[#18B7B0]" />
            <span className="text-[9px] text-[#18B7B0]">Estadisticas</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Settings className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <span className="text-[9px] text-gray-400 dark:text-gray-500">Ajustes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
