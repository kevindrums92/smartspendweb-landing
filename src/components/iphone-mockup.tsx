"use client";

import { ReactNode } from "react";

interface IPhoneMockupProps {
  children: ReactNode;
  className?: string;
}

export function IPhoneMockup({ children, className = "" }: IPhoneMockupProps) {
  return (
    <div className={`relative ${className}`}>
      {/* iPhone Frame */}
      <div className="relative" style={{ width: '280px', height: '570px' }}>
        {/* Outer frame with border */}
        <div className="absolute inset-0 rounded-[40px] bg-gray-300 dark:bg-[#1a1a1a] p-2 shadow-2xl">
          {/* Inner frame */}
          <div className="w-full h-full rounded-[32px] bg-white dark:bg-[#0f1117] overflow-hidden relative">
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-50" />
            
            {/* Status Bar */}
            <div className="flex items-center justify-between px-6 pt-2 pb-1 text-gray-900 dark:text-white text-[10px] relative z-40">
              <span>10:25</span>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                </svg>
                <div className="flex items-center gap-0.5">
                  <div className="w-4 h-2 border border-gray-600 dark:border-white rounded-sm relative">
                    <div className="absolute inset-0.5 bg-gray-600 dark:bg-white rounded-sm w-[70%]"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Screen Content */}
            <div className="h-full overflow-hidden pt-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
