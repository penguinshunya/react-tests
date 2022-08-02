import { createContext, useContext } from "react";

export const TestContext = createContext({ name: "default" });

export function useTestContextName() {
  const { name } = useContext(TestContext);
  return name;
}

export function useTestContextNameThrowError() {
  const { name } = useContext(TestContext);
  if (name === "default") {
    throw new Error();
  }
  return name;
}
