import { createAuthEndpoint } from "better-auth/api";
import { setSessionCookie } from "better-auth/cookies";
import type { User } from "better-auth/types";
import z from "zod";

export const fattorPlugin = () => {
  return {
    id: "fattor-plugin",
    endpoints: {
      signIn: createAuthEndpoint(
        "/fattor/sign-in",
        {
          method: "POST",
          body: z.object({
            email: z.string().min(1),
            password: z.string().min(1),
          }),
        },
        async (ctx) => {
          const {
            body: { email, password },
            context: { adapter, internalAdapter },
          } = ctx;

          const fattorResponse = await fetch(
            "https://symphony.fattorcredito.com.br/public/prova-dev/login",
            {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ email, password }),
            },
          );

          if (!fattorResponse.ok) {
            return ctx.error("UNAUTHORIZED", {
              message: "Credenciais inválidas",
            });
          }

          const { token } = await fattorResponse.json();

          console.log("Fattor Token:", token);

          const user = await adapter.findOne<User>({
            model: "user",
            where: [{ field: "email", value: email }],
          });

          if (!user) {
            return ctx.error("NOT_FOUND", {
              message: "Usuário não encontrado",
            });
          }

          const session = await internalAdapter.createSession(user.id, false, {
            token: token,
          });

          if (!session) {
            return ctx.error("INTERNAL_SERVER_ERROR", {
              message: "Falha ao criar sessão",
            });
          }

          console.log("Created session:", session);

          await setSessionCookie(ctx, { session, user: user });

          return ctx.json({
            ok: true,
            token: token,
          });
        },
      ),
    },
  };
};
