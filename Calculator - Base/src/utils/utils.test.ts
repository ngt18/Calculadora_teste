import { calculate } from "./calculate";
import { isDot } from "./isDot";
import { isNumber } from "./isNumber";
import { OPERATIONS } from "./operations";
import { removeZeroLeft } from "./removeZeroLeft";

describe("calculate", () => {
  test.each([
    ["+", "2", "3", "5"],
    ["-", "9", "4", "5"],
    ["x", "6", "7", "42"],
    ["/", "8", "2", "4"],
    ["=", "10", "4", "4"],
    ["AC", "99", "10", "0"],
  ])(
    "aplica a operacao %s com os operandos informados",
    (buttonName, accumulator, displayNumber, expected) => {
      expect(calculate(buttonName, accumulator, displayNumber)).toBe(expected);
    },
  );
});

describe("isDot", () => {
  it("retorna true quando o valor e um ponto", () => {
    expect(isDot(".")).toBe(true);
  });

  it("retorna false para qualquer outro caractere", () => {
    expect(isDot("a")).toBe(false);
    expect(isDot("1")).toBe(false);
  });
});

describe("isNumber", () => {
  test.each(["0", "25", "-7", "3.14"])(
    "reconhece %s como numero valido",
    (value) => {
      expect(isNumber(value)).toBe(true);
    },
  );

  test.each(["", ".", "a", "1a"])(
    "rejeita %s como numero invalido",
    (value) => {
      expect(isNumber(value)).toBe(false);
    },
  );
});

describe("OPERATIONS", () => {
  it("soma dois valores", () => {
    expect(OPERATIONS["+"](5, 7)).toBe(12);
  });

  it("subtrai o segundo valor do primeiro", () => {
    expect(OPERATIONS["-"](10, 3)).toBe(7);
  });

  it("multiplica dois valores", () => {
    expect(OPERATIONS["x"](6, 4)).toBe(24);
  });

  it("divide o primeiro valor pelo segundo", () => {
    expect(OPERATIONS["/"](20, 5)).toBe(4);
  });

  it("retorna Infinity quando divide por zero", () => {
    expect(OPERATIONS["/"](8, 0)).toBe(Infinity);
  });

  it("equal retorna o segundo operando", () => {
    expect(OPERATIONS["="](99, 42)).toBe(42);
  });

  it("allClear retorna zero", () => {
    expect(OPERATIONS["AC"]()).toBe(0);
  });
});

describe("removeZeroLeft", () => {
  it("mantem strings com um unico caractere", () => {
    expect(removeZeroLeft("0")).toBe("0");
  });

  it("remove um zero a esquerda de numeros com mais de um caractere", () => {
    expect(removeZeroLeft("05")).toBe("5");
  });

  it("mantem o valor quando nao existe zero a esquerda", () => {
    expect(removeZeroLeft("15")).toBe("15");
  });
});