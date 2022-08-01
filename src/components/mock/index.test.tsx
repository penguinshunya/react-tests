import { render, screen } from "@testing-library/react";
import { Foo } from ".";
import * as functions from "./functions";

describe("Incorrect test Foo", () => {
  test("spyOn を実行する", async () => {
    jest.spyOn(functions, "getZero").mockReturnValue(1);
    render(<Foo />);
    expect(screen.getByTestId("div")).toHaveTextContent("1");
  });

  test("前の spyOn の影響により、結果が予期したものにならない。このテストは失敗する可能性がある", async () => {
    render(<Foo />);
    expect(screen.getByTestId("div")).not.toHaveTextContent("0");
  });
});

describe("Correct test Foo", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("spyOn を実行する", async () => {
    jest.spyOn(functions, "getZero").mockReturnValue(1);
    render(<Foo />);
    expect(screen.getByTestId("div")).toHaveTextContent("1");
  });

  test("前の spyOn の影響を受けずに想定通りの結果になる", async () => {
    render(<Foo />);
    expect(screen.getByTestId("div")).toHaveTextContent("0");
  });
});
