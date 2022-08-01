import { useLocalStorage } from "react-use";
import { useQuery } from "@tanstack/react-query";
import { GetMine } from "./functions";

export function useLocalStorageStoreId() {
  const [storeId, setStoreId] = useLocalStorage<number>(
    "20fd8fa7-e8e6-4545-a93e-1911bc6a1b10",
    undefined
  );
  return { storeId, setStoreId };
}

export function useGetMine() {
  return useQuery(["7bafed0f-d0a0-40f2-a388-358d97c2e605"], GetMine);
}
