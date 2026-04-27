import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "../env";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function safeFetch<T = any>(
  query: string,
  params?: Record<string, string | number | boolean>,
): Promise<T | null> {
  if (projectId === "placeholder") {
    return null;
  }
  try {
    return await sanityClient.fetch<T>(query, params ?? {});
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return null;
  }
}
