import { QueryClient } from "@tanstack/react-query";

/**
 * Centralized QueryClient instance with balanced production caching defaults.
 *
 * Tuning rationale:
 * - staleTime: 60 seconds (prevents duplicate simultaneous requests during initial navigation
 *   bursts while ensuring that data does not stay indefinitely stale).
 * - gcTime: 10 minutes (preserves inactive query cache in memory before garbage collection).
 * - retry: 1 (retries network blips once with exponential backoff).
 * - refetchOnWindowFocus: false (prevents unexpected UI layout shifts or input losses while editing).
 * - refetchOnReconnect: true (ensures client recovers fresh server state when internet restores).
 * - refetchOnMount: true (serves immediately from cache if within staleTime; refetches on mount
 *   only when data is older than staleTime, eliminating the stale-data freeze bug).
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      retry: 0,
    },
  },
});
