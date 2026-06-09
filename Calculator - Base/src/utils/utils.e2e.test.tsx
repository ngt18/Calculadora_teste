import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const getDisplay = () => screen.getByTestId("display");

afterEach(cleanup);

describe("e2e - Calculadora", () => {
  test("soma 2 + 3 e exibe 5 (sum via calculate)", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "2" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "3" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(getDisplay()).toHaveTextContent("5");
  });

  test("subtrai 9 - 4 e exibe 5 (subtract via calculate)", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "9" }));
    await user.click(screen.getByRole("button", { name: "-" }));
    await user.click(screen.getByRole("button", { name: "4" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(getDisplay()).toHaveTextContent("5");
  });

  test("multiplica 6 x 7 e exibe 42 (multiply via calculate)", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "6" }));
    await user.click(screen.getByRole("button", { name: "x" }));
    await user.click(screen.getByRole("button", { name: "7" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(getDisplay()).toHaveTextContent("42");
  });

  test("divide 8 / 2 e exibe 4 (divide via calculate)", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "8" }));
    await user.click(screen.getByRole("button", { name: "/" }));
    await user.click(screen.getByRole("button", { name: "2" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(getDisplay()).toHaveTextContent("4");
  });

  test("igual sem operacao nova exibe o numero atual (equal via calculate)", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "7" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(getDisplay()).toHaveTextContent("7");
  });

  test("AC zera o display (allClear via calculate)", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "9" }));
    await user.click(screen.getByRole("button", { name: "9" }));
    await user.click(screen.getByRole("button", { name: "AC" }));

    expect(getDisplay()).toHaveTextContent("0");
  });

  test("divisao por zero mostra a mensagem de erro (divide por zero)", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "8" }));
    await user.click(screen.getByRole("button", { name: "/" }));
    await user.click(screen.getByRole("button", { name: "0" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(getDisplay()).toHaveTextContent("Não é possível dividir por zero");
  });

  test("remove zero a esquerda ao digitar 0 seguido de 5 (removeZeroLeft)", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "0" }));
    await user.click(screen.getByRole("button", { name: "5" }));

    expect(getDisplay()).toHaveTextContent("5");
  });

  test("aceita entrada com ponto (isDot + isNumber)", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "3" }));
    await user.click(screen.getByRole("button", { name: "." }));
    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "4" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "0" }));
    await user.click(screen.getByRole("button", { name: "." }));
    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(getDisplay()).toHaveTextContent("3.64");
  });

  test("trocar operador antes de digitar o segundo operando apenas atualiza o operador", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "x" }));
    await user.click(screen.getByRole("button", { name: "4" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(getDisplay()).toHaveTextContent("20");
  });
});
