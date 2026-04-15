import { getPayload } from "payload";
import configPromise from "@payload-config";

/**
 * Get the Payload client — use in Server Components and Route Handlers.
 * Payload is a singleton so this is safe to call multiple times.
 */
export async function getPayloadClient() {
  return getPayload({ config: configPromise });
}
