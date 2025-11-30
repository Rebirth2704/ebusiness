const express = require('express');
const router = express.Router();
const db = require('../bd/db'); 
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'duki';

const verificarToken = (req, res, next) => {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];

if (!token) {
return res.status(401).json({ mensaje: "Acceso denegado. Token no proporcionado." });
}

try {
const verificado = jwt.verify(token, SECRET_KEY);
req.usuario = verificado; 
next(); 
} catch (error) {
res.status(403).json({ mensaje: "Token inválido o expirado." });
    }
};

router.post("/", async (req, res) => {
try {
const { email, password } = req.body;

if (!email || !password) {
return res.status(400).json({ mensaje: "Faltan email o contraseña" });
}


const [resultado] = await db.query("SELECT cliente_id, password_hash FROM cliente WHERE email = ?", [email]);
const usuario = resultado[0];

if (!usuario) {
return res.status(401).json({ mensaje: "Usuario no encontrado" });
}

if (password !== usuario.password_hash) {
return res.status(401).json({ mensaje: "Contraseña incorrecta" });
}

const token = jwt.sign({ id: usuario.cliente_id }, SECRET_KEY, { expiresIn: '1h' });

res.json({ 
mensaje: "Autenticación exitosa",
token: token 
});

} catch (error) {
console.error("Error en login:", error);
res.status(500).json({ mensaje: "Error interno del servidor" });
}
});

router.get('/perfil', verificarToken, (req, res) => {
res.json({ 
message: "Acceso autorizado al perfil",
usuarioId: req.usuario.id 
});
});

module.exports = router;