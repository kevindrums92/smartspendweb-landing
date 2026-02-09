"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  Loader2,
  ShieldCheck,
  Lock,
  KeyRound,
} from "lucide-react";

export default function MfaVerifyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [factorId, setFactorId] = useState("");
  const [code, setCode] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadFactors() {
      try {
        const res = await fetch("/api/admin/auth/mfa/factors");
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Error al cargar factores MFA");
          return;
        }

        if (data.factors.length === 0) {
          // No verified factors — redirect to enroll
          router.replace("/admin/mfa-enroll");
          return;
        }

        setFactorId(data.factors[0].id);
      } catch {
        setError("Error de conexion. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    }

    loadFactors();
  }, [router]);

  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (code.length !== 6 || !factorId) return;

    setError("");
    setVerifying(true);

    try {
      const res = await fetch("/api/admin/auth/mfa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ factorId, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Codigo incorrecto");
        setCode("");
        inputRef.current?.focus();
        return;
      }

      router.push("/admin/users");
      router.refresh();
    } catch {
      setError("Error de conexion. Intenta de nuevo.");
    } finally {
      setVerifying(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[#060810]">
      {/* Radial base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(24,183,176,0.08) 0%, rgba(6,8,16,1) 70%)",
        }}
      />

      {/* Floating ambient blobs */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full opacity-30"
        style={{
          top: "-25%",
          left: "-15%",
          background:
            "radial-gradient(circle, rgba(24,183,176,0.25) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "float-slow 12s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          bottom: "-20%",
          right: "-10%",
          background:
            "radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "float-slow 14s ease-in-out infinite reverse",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo & Brand */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative group">
            <div
              className="absolute inset-0 rounded-3xl opacity-60 blur-xl transition-opacity duration-500 group-hover:opacity-80"
              style={{
                background:
                  "linear-gradient(135deg, #18B7B0 0%, #10B981 100%)",
              }}
            />
            <div className="relative w-16 h-16 bg-gradient-to-br from-[#18B7B0] to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <TrendingUp className="text-white" size={30} />
            </div>
          </div>
          <h1 className="mt-6 text-2xl font-black tracking-tight text-white uppercase italic">
            Verificacion <span className="text-[#18B7B0]">2FA</span>
          </h1>
        </div>

        {/* Glass Card */}
        <div
          className="relative rounded-[2rem] p-8 sm:p-10"
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow:
              "0 30px 60px -15px rgba(0,0,0,0.5), inset 0 1px 0 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Gradient border shine */}
          <div
            className="absolute top-0 left-[10%] right-[10%] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(24,183,176,0.4) 50%, transparent)",
            }}
          />

          {loading ? (
            <div className="flex flex-col items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#18B7B0]" />
              <p className="mt-4 text-sm text-gray-500">Cargando...</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-[#18B7B0]/10 flex items-center justify-center">
                  <KeyRound size={28} className="text-[#18B7B0]" />
                </div>
                <h2 className="text-lg font-semibold text-white mb-1.5">
                  Codigo de verificacion
                </h2>
                <p className="text-gray-500 text-sm">
                  Ingresa el codigo de tu app de autenticacion
                </p>
              </div>

              <form onSubmit={handleVerify} className="space-y-6">
                <div>
                  <input
                    ref={inputRef}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={code}
                    onChange={(e) =>
                      setCode(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    placeholder="000000"
                    autoComplete="one-time-code"
                    className="w-full bg-white/[0.03] border-b-2 border-white/10 py-4 text-center text-3xl font-mono tracking-[0.6em] text-white placeholder:text-white/15 focus:outline-none focus:border-[#18B7B0] transition-all duration-300"
                  />
                  <div className="h-[2px] bg-gradient-to-r from-transparent via-[#18B7B0]/30 to-transparent mt-0" />
                </div>

                {/* Error */}
                {error && (
                  <div
                    className="rounded-xl px-4 py-3 text-sm text-red-400"
                    style={{
                      background: "rgba(239, 68, 68, 0.08)",
                      border: "1px solid rgba(239, 68, 68, 0.15)",
                    }}
                  >
                    {error}
                  </div>
                )}

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={verifying || code.length !== 6}
                    className="w-full group relative flex items-center justify-center py-4 px-6 font-bold text-white transition-all disabled:pointer-events-none"
                  >
                    <div
                      className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, #18B7B0, #10B981)",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#18B7B0] to-emerald-500 rounded-2xl transition-all duration-300 group-hover:scale-[1.03] group-active:scale-[0.97] group-disabled:opacity-40 group-disabled:scale-100" />
                    <span className="relative flex items-center gap-2.5 uppercase tracking-widest text-sm font-semibold">
                      {verifying ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          Verificar
                          <ShieldCheck size={18} />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Security footer */}
        <div className="mt-8 flex items-center justify-center gap-8 text-gray-600">
          <div className="flex items-center gap-1.5 text-xs tracking-wide">
            <ShieldCheck size={14} className="text-[#18B7B0]/60" />
            SSL Encrypted
          </div>
          <div className="h-3 w-px bg-white/10" />
          <div className="flex items-center gap-1.5 text-xs tracking-wide">
            <Lock size={14} className="text-[#18B7B0]/60" />
            2FA Required
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-30px) translateX(15px);
          }
          66% {
            transform: translateY(15px) translateX(-10px);
          }
        }
      `}</style>
    </div>
  );
}
