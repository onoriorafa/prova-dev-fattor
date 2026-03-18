import { createAuthClient } from "better-auth/react";
import { fattorPluginClient } from "./plugin/client";

export const authClient = createAuthClient({
  plugins: [fattorPluginClient()],
});
