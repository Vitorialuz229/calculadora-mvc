const historyEl = document.querySelector(".history");
const resultEl = document.querySelector(".result");
const buttons = document.querySelectorAll(".buttons button");

let currentNumber = "";
let firstOperand = null;
let operator = null;
let shouldRestart = false;

function updateDisplay() {
  resultEl.innerText =
    currentNumber === "" ? "0" : currentNumber.replace(".", ",");
  let expression = "";
  if (firstOperand !== null) {
    expression += firstOperand.toString().replace(".", ",");
  }
  if (operator) {
    expression += " " + operator;
  }
  historyEl.innerText = expression;
}

function addDigit(digit) {
  if (digit === "," && currentNumber.includes(",")) return;
  if (shouldRestart) {
    currentNumber = "";
    shouldRestart = false;
  }
  currentNumber += digit;
  updateDisplay();
}

function setOperator(newOperator) {
  if (currentNumber === "") return;
  if (firstOperand !== null) {
    calculate();
  }
  firstOperand = parseFloat(currentNumber.replace(",", "."));
  operator = newOperator;
  shouldRestart = true;
  updateDisplay();
}

async function calculate() {
  if (operator === null || firstOperand === null || currentNumber === "")
    return;

  const secondOperand = parseFloat(currentNumber.replace(",", "."));

  try {
    const response = await fetch("/api/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstOperand, secondOperand, operator }),
    });

    const data = await response.json();

    if (!response.ok) {
      currentNumber = data.error || "Erro";
    } else {
      currentNumber = data.result.toString();
    }
  } catch (error) {
    console.error("Falha ao conectar com o servidor:", error);
    currentNumber = "Erro de Conexão";
  }

  operator = null;
  firstOperand = null;
  shouldRestart = true;
  updateDisplay();
}

function clearCalculator() {
  currentNumber = "";
  firstOperand = null;
  operator = null;
  shouldRestart = false;
  updateDisplay();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (!isNaN(value) || value === ",") {
      addDigit(value);
    } else if (["÷", "×", "-", "+"].includes(value)) {
      setOperator(value);
    } else if (value === "=") {
      calculate();
    } else if (value === "C") {
      clearCalculator();
    }
  });
});

updateDisplay();
