import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "SmartSpend Admin - Login",
  robots: { index: false, follow: false },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#0a0c10]">
        {children}
      </div>
    </ThemeProvider>
  );
}
