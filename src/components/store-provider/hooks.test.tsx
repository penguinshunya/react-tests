import { renderHook } from "@testing-library/react";
import { StoreProvider } from ".";
import { useStoreId } from "./hooks";

describe("useStoreId", () => {
  test("Provider に初期値を与えるとその値になる。createContext に与えた値には決してならない", () => {
    function wrapper({ children }: { children?: React.ReactNode }) {
      return <StoreProvider storeId={1}>{children}</StoreProvider>;
    }

    const { result } = renderHook(() => useStoreId(), { wrapper });
    expect(result.current).toBe(1);
  });
});
