"use client";

import { useEffect } from "react";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n/i18n-context";

export default function ContactError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t, locale } = useI18n();
  const router = useRouter();

  useEffect(() => {
    // Log error to console for debugging
    console.error("[Contact Page Error]", error);
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
        <div className="space-y-3">
          <button
            type="button"
            onClick={reset}
            className="w-full rounded-xl bg-gray-900 dark:bg-emerald-500 py-3 text-sm font-medium text-white transition-all hover:bg-gray-800 dark:hover:bg-emerald-600 active:scale-[0.98]"
          >
            {t("error.retry")}
          </button>
          <button
            type="button"
            onClick={() => router.push(`/${locale}`)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-100 dark:bg-gray-800 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("error.goHome")}
          </button>
        </div>
      </div>
    </div>
  );
}
