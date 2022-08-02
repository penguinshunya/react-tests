import { renderHook } from "@testing-library/react";
import { useTestContextName, useTestContextNameThrowError } from ".";

describe("TestContext", () => {
  it("供給されていないコンテキストの値を参照すると正しく終了する", async () => {
    const { result } = renderHook(() => useTestContextName());
    expect(result.current).toBe("default");
  });

  it("供給されていないコンテキストの値を参照するとエラーが発生する", async () => {
    jest.spyOn(console, "error").mockImplementation();
    expect(() => renderHook(() => useTestContextNameThrowError())).toThrow();
  });
});
