const { response } = require('express');
const nodemailer = require('nodemailer');

// Crear Usuario
const crearUsuario = (req, res = response) => {

    const { name, email, password } = req.body;

    res.status(201).json({
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

    res.status(201).json({
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

    res.status(201).json({
        ok: true,
        msg: 'Restablecer Contrasena',
        email,
        password
    });

};
// Enviar Email Confirma Registro
const enviarCorreoRegistro = (req, res = response) => {

    const { name, email } = req.body;

    // Enviar correo con Nodemailer
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: "alaina46@ethereal.email",
            pass: "WREhp6bz9Kt1RGPT8H",
        }
    });

    const mailOptions = {
        from: "Remitente",
        to: email,
        subject: "Enviado desde nodemailer",
        text: "¡Hola Mundo!",
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.status(200).json({
                ok: true,
                msg: 'Send Mail Register',
                name,
                email,
            });
        }
    });

};
// Enviar Email Confirma Restablecer Contraseña
const enviarCorreoRestableceContrasena = (req, res = response) => {

    const { name, email } = req.body;

    // Enviar correo con Nodemailer
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: "alaina46@ethereal.email",
            pass: "WREhp6bz9Kt1RGPT8H",
        }
    });

    const mailOptions = {
        from: "Remitente",
        to: email,
        subject: "Enviado desde nodemailer",
        text: "¡Hola Mundo!",
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.status(200).json({
                ok: true,
                msg: 'Send Mail Restablish Pass',
                name,
                email,
            });
        }
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