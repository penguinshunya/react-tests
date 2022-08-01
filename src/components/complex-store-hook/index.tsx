import { useMemo } from "react";
import { useGetMine, useLocalStorageStoreId } from "./hooks";

export function useSelectedStoreId() {
  const queMine = useGetMine();
  const mine = queMine.data ?? null;
  const { storeId } = useLocalStorageStoreId();

  const selectedStoreId = useMemo(() => {
    if (mine === null) {
      return null;
    }
    if (mine.isAdmin && storeId !== undefined) {
      return storeId;
    }
    return mine.storeId;
  }, [mine, storeId]);

  return selectedStoreId;
}
