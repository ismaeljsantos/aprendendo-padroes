const validarCpf = require("../../src/utils/cpfValidator");

describe("Validação de CPF", () => {
  test("CPF válido sem pontuação", () => {
    expect(validarCpf("12345678909")).toBe(true);
  });

  test("CPF válido com pontuação", () => {
    expect(validarCpf("123.456.789-09")).toBe(true);
  });

  test("CPF inválido com menos de 11 dígitos", () => {
    expect(validarCpf("12345678")).toBe(false);
  });

  test("CPF inválido com dígitos errados", () => {
    expect(validarCpf("12345678900")).toBe(false);
  });

  test("CPF inválido com formato errado", () => {
    expect(validarCpf("abc.def.ghi-jk")).toBe(false);
  });
});
