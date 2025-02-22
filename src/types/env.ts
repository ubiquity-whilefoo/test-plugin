import { StaticDecode, Type as T } from "@sinclair/typebox";
import "dotenv/config";

/**
 * Define sensitive environment variables here.
 *
 * These are fed into the worker/workflow as `env` and are
 * taken from either `dev.vars` or repository secrets.
 * They are used with `process.env` but are type-safe.
 */
export const envSchema = T.Object({});

export type Env = StaticDecode<typeof envSchema>;
