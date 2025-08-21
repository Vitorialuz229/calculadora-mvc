const express = require('express');
const path = require('path');
const calculatorRoutes = require('./src/routes/calculatorRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', calculatorRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse a calculadora em http://localhost:${3000}`);
});