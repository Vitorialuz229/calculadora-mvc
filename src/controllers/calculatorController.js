const calculatorModel = require("../models/calculatorModel");

function performCalculation(req, res) {
  const { firstOperand, secondOperand, operator } = req.body;

  if (
    typeof firstOperand !== "number" ||
    typeof secondOperand !== "number" ||
    !operator
  ) {
    return res.status(400).json({ error: "Dados inválidos fornecidos." });
  }

  const result = calculatorModel.calculate(
    firstOperand,
    secondOperand,
    operator
  );

  if (typeof result === "string" && result.startsWith("Erro")) {
    return res.status(400).json({ error: result });
  }

  res.json({ result });
}

module.exports = {
  performCalculation,
};
