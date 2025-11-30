const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./bd/db'); 
const loginRoute = require('./routes/login')
const usariosRoute = require('./routes/users')
const PORT = 3000;
const path = require("path");

app.use(cors());
app.use(express.json());

app.use('/usuarios', usariosRoute);
app.use('/login', loginRoute);
app.use(express.static(path.join(__dirname, "../FRONTEND")));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});