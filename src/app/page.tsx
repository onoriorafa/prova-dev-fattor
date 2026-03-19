"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const res = await authClient.fattor.signIn({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
      setIsSubmitting(false);
    } else {
      window.location.href = "/dashboard";
    }
  }

  return (
    <main className="app-bg flex items-center justify-center">
      <section className="app-container max-w-md">
        <article className="app-card flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h1 className="app-title">Sign In</h1>
            <p className="app-subtitle">Acesse sua conta para continuar.</p>
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-300"
              >
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                autoComplete="email"
                required
                className="app-input"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-300"
              >
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="app-input"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="app-button-primary mt-1 w-full"
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </article>
      </section>
    </main>
  );
}
