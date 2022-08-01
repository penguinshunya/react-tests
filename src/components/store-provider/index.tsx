import { createContext } from "react";

export const StoreContext = createContext({
  storeId: null! as number,
});

export interface StoreProviderProps {
  children?: React.ReactNode;
  storeId: number;
}

export function StoreProvider({ children, storeId }: StoreProviderProps) {
  return (
    <StoreContext.Provider value={{ storeId }}>
      {children}
    </StoreContext.Provider>
  );
}
