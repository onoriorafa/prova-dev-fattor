import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { fattorPlugin } from "./plugin/plugin";

export const auth = betterAuth({
  trustedOrigins: [String(process.env.BETTER_AUTH_URL)],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [fattorPlugin()],
});
