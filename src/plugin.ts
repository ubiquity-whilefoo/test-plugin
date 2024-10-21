import { Context } from "./types";
import { isIssueCommentEvent } from "./types/typeguards";
import { helloWorld } from "./handlers/hello-world";

/**
 * The main plugin function. Split for easier testing.
 */
export async function runPlugin(context: Context) {
  const { logger, eventName } = context;

  if (isIssueCommentEvent(context)) {
    await helloWorld(context);
    return;
  }

  logger.error(`Unsupported event: ${eventName}`);

  return undefined;
}
