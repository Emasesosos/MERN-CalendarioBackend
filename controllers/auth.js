const { response } = require('express');

// Crear Usuario
const crearUsuario = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Register'
    });
};
// Login Usuario
const loginUsuario = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Login'
    });
};
// Revalidar Token para Usuario
const revalidarToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Renew'
    });
};
// Reestablecer Contraseña
const restablecerContrasena = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Restablecer Contrasena'
    });
};
// Enviar Email Confirma Registro
const enviarCorreoRegistro = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Send Mail Register'
    });
};
// Enviar Email Confirma Restablecer Contraseña
const enviarCorreoRestableceContrasena = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Send Mail Restablish Pass'
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    restablecerContrasena,
    enviarCorreoRegistro,
    enviarCorreoRestableceContrasena
};