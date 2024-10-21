import { runPlugin } from "./plugin";
import { createActionsPlugin } from "@ubiquity-os/ubiquity-os-kernel";

createActionsPlugin(runPlugin).then(console.log).catch(console.error);
