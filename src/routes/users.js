const express = require('express');
const router = express.Router();
const conection = require('../bd/db');
//import conection from '../bd/db';

// // (POST)
// router.post('/', (req, res) => {
//   const { nombre, apellido, correo, telefono, direccion, fecha_registro } = req.body;
//   const sql = 'insert into clientes(nombre,apellido,correo,telefono,direccion,fecha_registro) values(?,?,?,?,?,?)';
//   conection.query(sql, [nombre, apellido, correo, telefono, direccion, fecha_registro], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Error al crear el usuario' });
//     }
//     res.json({ id: result.insertId, nombre, apellido, correo, telefono, direccion, fecha_registro });
//   });
// });

//  (GET todos)
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM articulos_cocina';
  conection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
    res.json(results);
  });
});

// READ (GET uno)
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM articulos_cocina WHERE id_articulo= ?';
  conection.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener el usuario' });
    }
    res.json(results[0]);
  });
});

// UPDATE (PUT)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, apellido,correo,telefono,direccion,fecha_registro } = req.body;
  const sql = 'UPDATE articulos_cocina SET nombre = ?, tipo = ?, marca= ?, capacidad = ?, estado = ?, fecha_compra= ?, compra = ? WHERE id_articulo = ?';
  conection.query(sql, [nombre, apellido, correo,telefono,direccion,fecha_registro,id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
    res.json({ message: 'Usuario actualizado correctamente' });
  });
});

// DELETE
router.delete('/:id_articulo', (req, res) => {
  const { id_articulo } = req.params;
  const sql = 'DELETE FROM articulos_cocina WHERE id_articulo = ?';
  conection.query(sql, [id_articulo], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
    console.log(id_articulo);
    res.json({ message: 'usuario eliminado correctamente' });
  });
});

module.exports = router;
