function validarCpf(cpf) {
  const cpfLimpo = cpf.replace(/[^\d]/g, "");

  if (!/^\d{11}$/.test(cpfLimpo)) return false;

  const cpfArray = cpfLimpo.split("").map(Number);

  const calcularDigito = (array, pesoInicial) => {
    let soma = 0;
    for (let i = 0; i < array.length; i++) {
      soma += array[i] * (pesoInicial - i);
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const primeiroDigito = calcularDigito(cpfArray.slice(0, 9), 10);
  const segundoDigito = calcularDigito(cpfArray.slice(0, 10), 11);

  return primeiroDigito === cpfArray[9] && segundoDigito === cpfArray[10];
}

module.exports = validarCpf;
