import {
  UseQueryResult,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { waitFor } from "@testing-library/react";

export function createQueryClientWrapper() {
  const queryClient = new QueryClient();
  return ({ children }: { children?: React.ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

export async function waitForQueryToFinish<T>(
  spy: jest.SpyInstance<UseQueryResult<T, unknown>, []>
) {
  return waitFor(() => {
    const res = spy.mock.results.at(-1);
    expect(res?.type === "return" && !res.value.isFetching).toBe(true);
  });
}
