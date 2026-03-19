import type { BetterAuthClientPlugin } from "better-auth";
import type { fattorPlugin } from "./plugin";

export const fattorPluginClient = () => {
  return {
    id: "fattor-plugin",
    $InferServerPlugin: {} as ReturnType<typeof fattorPlugin>,
  } satisfies BetterAuthClientPlugin;
};
