const express = require('express');
const router = express.Router();
const db = require('../bd/db'); 
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    try {
        const [productos] = await db.query('SELECT * FROM Producto WHERE activo = 1');

        res.json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ mensaje: "Error interno al obtener el menú" });
    }
});

router.post('/', async (req, res) => {
    const { categoria_id, nombre, descripcion, precio, imagen_url } = req.body;
    if (!nombre || !precio || !categoria_id) {
        return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    try {
        const query = `
            INSERT INTO Producto (categoria_id, nombre, descripcion, precio, imagen_url) 
            VALUES (?, ?, ?, ?, ?)
        `;

        await db.query(query, [categoria_id, nombre, descripcion, precio, imagen_url]);

        res.status(201).json({ mensaje: "Producto guardado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al guardar en base de datos" });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params; 

    try {
        const [resultado] = await db.query('DELETE FROM Producto WHERE producto_id = ?', [id]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.json({ mensaje: "Producto eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar el producto" });
    }
});

module.exports = router;
