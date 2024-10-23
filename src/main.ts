import { runPlugin } from "./plugin";
import { createActionsPlugin } from "@ubiquity-os/ubiquity-os-kernel";
import * as github from "@actions/github";

console.log(github.context.payload.inputs);
createActionsPlugin(runPlugin).then(console.log).catch(console.error);
