import { renderHook } from "@testing-library/react";
import * as functions from "./functions";
import * as hooks from "./hooks";
import { useSelectedStoreId } from ".";
import {
  createQueryClientWrapper,
  waitForQueryToFinish,
} from "../../utils/test";

beforeEach(() => {
  jest.restoreAllMocks();
});

interface prepareMockProps {
  savedStoreId?: number;
  user?: Partial<functions.User>;
}

function prepareMock({ savedStoreId, user }: prepareMockProps) {
  const spyUseGetMine = jest.spyOn(hooks, "useGetMine");
  jest
    .spyOn(functions, "GetMine")
    .mockResolvedValue({ ...functions.initUser(), ...user });
  jest
    .spyOn(hooks, "useLocalStorageStoreId")
    .mockReturnValue({ storeId: savedStoreId, setStoreId: jest.fn() });
  return { spyUseGetMine };
}

describe("useSelectedStoreId", () => {
  test("自分自身の情報の取得がまだ完了していないとき、selectedStoreId は null になる", async () => {
    prepareMock({ savedStoreId: 1 });
    const wrapper = createQueryClientWrapper();
    const { result } = renderHook(() => useSelectedStoreId(), { wrapper });
    expect(result.current).toBe(null);
  });

  test("自分自身の情報の取得が完了したとき、selectedStoreId は取得した値になる", async () => {
    const { spyUseGetMine } = prepareMock({ savedStoreId: 1 });
    const wrapper = createQueryClientWrapper();
    const { result } = renderHook(() => useSelectedStoreId(), { wrapper });
    await waitForQueryToFinish(spyUseGetMine);
    expect(result.current).toBe(1);
  });

  test("保存された店舗と自分の所属する店舗が異なるとき、自分の所属する店舗が選択される", async () => {
    const { spyUseGetMine } = prepareMock({
      savedStoreId: 1,
      user: { storeId: 2 },
    });
    const wrapper = createQueryClientWrapper();
    const { result } = renderHook(() => useSelectedStoreId(), { wrapper });
    await waitForQueryToFinish(spyUseGetMine);
    expect(result.current).toBe(2);
  });

  test("admin 権限を持ち、保存された店舗が存在しないとき、selectedStoreId は自分の所属する店舗になる", async () => {
    const { spyUseGetMine } = prepareMock({ user: { isAdmin: true } });
    const wrapper = createQueryClientWrapper();
    const { result } = renderHook(() => useSelectedStoreId(), { wrapper });
    await waitForQueryToFinish(spyUseGetMine);
    expect(result.current).toBe(1);
  });

  test("admin 権限を持ち、保存された店舗が存在するとき、selectedStoreId は保存された店舗になる", async () => {
    const { spyUseGetMine } = prepareMock({
      savedStoreId: 2,
      user: { isAdmin: true },
    });
    const wrapper = createQueryClientWrapper();
    const { result } = renderHook(() => useSelectedStoreId(), { wrapper });
    await waitForQueryToFinish(spyUseGetMine);
    expect(result.current).toBe(2);
  });
});
