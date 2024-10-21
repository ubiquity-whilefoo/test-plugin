import { runPlugin } from "./plugin";
import { createPlugin } from "@ubiquity-os/ubiquity-os-kernel";

const app = createPlugin(runPlugin, { name: "test plugin" });

export default {
  async fetch(req, env, ctx) {
    return (await app).fetch(req, env, ctx);
  },
};
