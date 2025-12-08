const express = require('express');
const router = express.Router();
const conection = require('../bd/db');

router.post('/', (req, res) => {
  const { nombre, email, telefono,password_hash } = req.body;
  const sql = 'insert into cliente(nombre,email,telefono,password_hash) values(?,?,?,?)';
  conection.query(sql, [nombre, email, telefono, password_hash], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al crear el usuario' });
    }
    res.json({ id: result.insertId, nombre, email, telefono, password_hash });
  });
});

module.exports = router;
