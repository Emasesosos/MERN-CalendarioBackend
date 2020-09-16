/*
    Rutas Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const router = Router();
const {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    restablecerContrasena,
    enviarCorreoRegistro,
    enviarCorreoRestableceContrasena
} = require('../controllers/auth');

// Crear Usuario
router.post('/new', crearUsuario);
// Login Usuario
router.post('/', loginUsuario);
// Revalidar Token para Usuario
router.get('/renew', revalidarToken);
// Reestablecer Contraseña
router.put('/restablish-pass', restablecerContrasena);
// Enviar Email Confirma Registro
router.post('/send-mail', enviarCorreoRegistro);
// Enviar Email Confirma Restablecer Contraseña
router.post('/resend-mail', enviarCorreoRestableceContrasena);

module.exports = router;