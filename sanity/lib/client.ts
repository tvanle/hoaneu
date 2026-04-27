import { createClient, type SanityClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "../env";

const isConfigured = projectId !== "placeholder";

export const sanityClient: SanityClient | null = isConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function safeFetch<T = any>(
  query: string,
  params?: Record<string, string | number | boolean>,
): Promise<T | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<T>(query, params ?? {});
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return null;
  }
}
