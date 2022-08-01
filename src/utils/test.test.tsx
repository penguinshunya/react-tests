import { renderHook } from "@testing-library/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createQueryClientWrapper, waitForQueryToFinish } from "./test";

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("createQueryClientWrapper", () => {
  test("ラッパーで囲わなかった場合はエラーが発生する", async () => {
    jest.spyOn(console, "error").mockImplementation();
    expect(() => renderHook(() => useQueryClient())).toThrow();
  });

  test("作成したラッパーで囲うと useQueryClient() が正常に取得できる", async () => {
    const wrapper = createQueryClientWrapper();
    expect(() => renderHook(() => useQueryClient(), { wrapper })).not.toThrow();
  });
});

describe("waitForQueryToFinish", () => {
  test("データの取得を終えるまで待機する", async () => {
    const obj = {
      GetFoo: () => "foo",
      useGetFoo: () =>
        useQuery(["e9551ab0-ba8c-4bcf-9b4f-67b0eb672b1c"], () => obj.GetFoo()),
    };
    const spyUseGetFoo = jest.spyOn(obj, "useGetFoo");
    const wrapper = createQueryClientWrapper();
    const { result } = renderHook(() => obj.useGetFoo(), { wrapper });
    expect(result.current.data).toBe(undefined);
    await waitForQueryToFinish(spyUseGetFoo);
    expect(result.current.data).toBe("foo");
  });
});
