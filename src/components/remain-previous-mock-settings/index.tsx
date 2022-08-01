import { useMemo } from "react";
import { getZero } from "./functions";

export function Foo() {
  const zero = useMemo(() => getZero(), []);
  return <div data-testid="div">{zero}</div>;
}
