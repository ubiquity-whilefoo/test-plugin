import { Context as KernelContext } from "@ubiquity-os/ubiquity-os-kernel";
import { PluginSettings } from "./plugin-inputs";

/**
 * Update `manifest.json` with any events you want to support like so:
 *
 * ubiquity:listeners: ["issue_comment.created", ...]
 */
export type SupportedEvents = "issue_comment.created";

export type Context<TSupportedEvents extends SupportedEvents = SupportedEvents> = KernelContext<PluginSettings, object, TSupportedEvents>;
