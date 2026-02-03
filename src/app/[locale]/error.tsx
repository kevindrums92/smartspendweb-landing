"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { useI18n } from "@/i18n/i18n-context";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();

  useEffect(() => {
    // Log error to console for debugging
    console.error("[Error Boundary]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#0a0c10] px-4">
      <div className="w-full max-w-md text-center">
        {/* Error Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
          <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>

        {/* Error Title */}
        <h1 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
          {t("error.title")}
        </h1>

        {/* Error Message */}
        <p className="mb-6 text-base text-gray-600 dark:text-gray-400">
          {t("error.message")}
        </p>

        {/* Error Details (dev only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 rounded-xl bg-gray-100 dark:bg-gray-900 p-4 text-left">
            <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
              {error.message}
            </p>
            {error.digest && (
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={reset}
            className="flex-1 rounded-xl bg-gray-900 dark:bg-emerald-500 py-3 text-sm font-medium text-white transition-all hover:bg-gray-800 dark:hover:bg-emerald-600 active:scale-[0.98]"
          >
            {t("error.retry")}
          </button>
          <Link
            href="/"
            className="flex-1 rounded-xl bg-gray-100 dark:bg-gray-800 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-[0.98] flex items-center justify-center"
          >
            {t("error.goHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
