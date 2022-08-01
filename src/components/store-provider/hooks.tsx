import { useContext } from "react";
import { StoreContext } from ".";

export function useStoreId() {
  const { storeId } = useContext(StoreContext);
  return storeId;
}
