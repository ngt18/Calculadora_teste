import { calculate } from "./calculate";
import { isDot } from "./isDot";
import { isNumber } from "./isNumber";
import {
  allClear,
  divide,
  equal,
  multiply,
  subtract,
  sum,
} from "./operations";
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

describe("sum", () => {
  it("soma dois valores", () => {
    expect(sum(5, 7)).toBe(12);
  });
});

describe("subtract", () => {
  it("subtrai o segundo valor do primeiro", () => {
    expect(subtract(10, 3)).toBe(7);
  });
});

describe("multiply", () => {
  it("multiplica dois valores", () => {
    expect(multiply(6, 4)).toBe(24);
  });
});

describe("divide", () => {
  it("divide o primeiro valor pelo segundo", () => {
    expect(divide(20, 5)).toBe(4);
  });

  it("retorna Infinity quando divide por zero", () => {
    expect(divide(8, 0)).toBe(Infinity);
  });
});

describe("equal", () => {
  it("retorna o segundo operando", () => {
    expect(equal(99, 42)).toBe(42);
  });
});

describe("allClear", () => {
  it("retorna zero", () => {
    expect(allClear()).toBe(0);
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

  it("remove apenas o primeiro zero a esquerda por chamada", () => {
    expect(removeZeroLeft("0007")).toBe("007");
  });
});