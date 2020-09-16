/*
    Rutas Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
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
router.post(
    '/new', [ // Middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 })
    ],
    crearUsuario
);
// Login Usuario
router.post(
    '/', [ // Middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 })
    ],
    loginUsuario
);
// Revalidar Token para Usuario
router.get('/renew', revalidarToken);
// Reestablecer Contraseña
router.put(
    '/restablish-pass', [ // Middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 })
    ],
    restablecerContrasena
);
// Enviar Email Confirma Registro
router.post(
    '/send-mail', [
        check('email', 'El email es obligatorio').isEmail()
    ],
    enviarCorreoRegistro
);
// Enviar Email Confirma Restablecer Contraseña
router.post(
    '/resend-mail', [
        check('email', 'El email es obligatorio').isEmail()
    ],
    enviarCorreoRestableceContrasena
);

module.exports = router;