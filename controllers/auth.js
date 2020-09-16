const { response } = require('express');

// Crear Usuario
const crearUsuario = (req, res = response) => {

    const { name, email, password } = req.body;

    res.json({
        ok: true,
        msg: 'Register',
        name,
        email,
        password,
    });

};
// Login Usuario
const loginUsuario = (req, res = response) => {

    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'Login',
        email,
        password,
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

    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'Restablecer Contrasena',
        email,
        password,
    });

};
// Enviar Email Confirma Registro
const enviarCorreoRegistro = (req, res = response) => {

    const { email } = req.body;

    res.json({
        ok: true,
        msg: 'Send Mail Register',
        email,
    });

};
// Enviar Email Confirma Restablecer Contraseña
const enviarCorreoRestableceContrasena = (req, res = response) => {

    const { email } = req.body;

    res.json({
        ok: true,
        msg: 'Send Mail Restablish Pass',
        email,
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