function calculate(firstOperand, secondOperand, operator) {
  let resultValue;
  switch (operator) {
    case "+":
      resultValue = firstOperand + secondOperand;
      break;
    case "-":
      resultValue = firstOperand - secondOperand;
      break;
    case "×":
      resultValue = firstOperand * secondOperand;

      break;
    case "÷":
      if (secondOperand === 0) {
        return "Erro: Divisão por zero";
      }

      resultValue = firstOperand / secondOperand;
      break;
    default:
      return "Erro: Operador inválido";
  }
  return parseFloat(resultValue.toPrecision(12));
}

module.exports = {
  calculate,
};