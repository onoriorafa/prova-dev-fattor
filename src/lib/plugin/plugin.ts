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
            `${process.env.FATTOR_BASE_URL}/login`,
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

          const schema = z.object({
            token: z.string(),
            expires_in: z.number(),
          });
          const { token, expires_in } = schema.parse(
            await fattorResponse.json().catch(() => {
              return ctx.error("BAD_REQUEST", {
                message: "Resposta inválida da API do Fattor",
              });
            }),
          );

          const user = await adapter.findOne<User>({
            model: "user",
            where: [{ field: "email", value: email }],
          });

          if (!user) {
            return ctx.error("NOT_FOUND", {
              message: "Usuário não encontrado",
            });
          }

          const session = await internalAdapter.createSession(user.id);

          if (!session) {
            return ctx.error("INTERNAL_SERVER_ERROR", {
              message: "Falha ao criar sessão",
            });
          }

          const updatedSession = await internalAdapter.updateSession(
            session.token,
            {
              token,
              expiresAt: new Date(Date.now() + expires_in * 1000),
            },
          );

          if (!updatedSession) {
            return ctx.error("INTERNAL_SERVER_ERROR", {
              message: "Falha ao atualizar sessão",
            });
          }

          await setSessionCookie(ctx, {
            session: {
              ...updatedSession,
              token: token,
              expiresAt: new Date(Date.now() + expires_in * 1000),
            },
            user: user,
          });

          return ctx.json({
            success: true,
            token: token,
            expires_in: expires_in,
          });
        },
      ),
    },
  };
};
