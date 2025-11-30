const express = require('express');
const router = express.Router();
const db = require('../bd/db'); // tu conexión MySQL
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'duki';

// Función para generar token JWT
function generarToken(userId) {
return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
}

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    const [resultado] = await db.query("SELECT cliente_id, password_hash FROM cliente WHERE email = ?", [email]);
    const usuario = resultado[0];

    if (!usuario) {
        return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    const passwordCorrecto = await bcrypt.compare(password, usuario.password_hash);
    if (!passwordCorrecto) {
        return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }
    
    // ⚠️ Asegúrate de usar la propiedad correcta del objeto MySQL (ej: cliente_id)
    const token = generarToken(usuario.cliente_id); 
    
    // Envía el token al frontend
    res.json({ token, mensaje: "Autenticación exitosa" }); 
});

// RUTA PROTEGIDA DE PERFIL
router.get('/perfil', (req, res) => {
    res.json({ message: "Ruta de perfil (requiere validación de token)" });
});

module.exports = router;
