/*
    Rutas Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    restablecerContrasena,
    enviarCorreoRegistro,
    enviarCorreoRestableceContrasena
} = require('../controllers/auth');
const router = Router();

// Crear Usuario
router.post(
    '/new', [ // Middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos

    ],
    crearUsuario
);
// Login Usuario
router.post(
    '/', [ // Middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
);
// Revalidar Token para Usuario
router.get('/renew', revalidarToken);
// Reestablecer Contraseña
router.put(
    '/restablish-pass', [ // Middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    restablecerContrasena
);
// Enviar Email Confirma Registro
router.post(
    '/send-mail', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    enviarCorreoRegistro
);
// Enviar Email Confirma Restablecer Contraseña
router.post(
    '/resend-mail', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    enviarCorreoRestableceContrasena
);

module.exports = router;