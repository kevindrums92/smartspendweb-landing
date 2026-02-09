"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const PAGE_TITLES: Record<string, string> = {
  "/admin/users": "Usuarios",
  "/admin/subscriptions": "Suscripciones",
};

export function AdminHeader() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const title = PAGE_TITLES[pathname] || "Admin";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 dark:border-[#2d313e] bg-white dark:bg-[#1a1d26] px-6">
      {/* Title (with left padding on mobile for hamburger) */}
      <h1 className="text-lg font-semibold text-gray-900 dark:text-white pl-12 lg:pl-0">
        {title}
      </h1>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {mounted && (
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-[#2d313e] transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-gray-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        )}
      </div>
    </header>
  );
}
