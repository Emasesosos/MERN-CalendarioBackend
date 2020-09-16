const { response } = require('express');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// Crear Usuario
const crearUsuario = (req, res = response) => {

    const { name, email, password } = req.body;

    // Manejo de errores
    const errors = validationResult(req);
    //   console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }

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

    // Manejo de errores
    const errors = validationResult(req);
    //   console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }

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

    // Manejo de errores
    const errors = validationResult(req);
    //   console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }

    res.status(201).json({
        ok: true,
        msg: 'Restablecer Contrasena',
        email,
        password
    });

};
// Enviar Email Confirma Registro
const enviarCorreoRegistro = (req, res = response) => {

    const { email } = req.body;

    // Manejo de errores
    const errors = validationResult(req);
    //   console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }

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
                email,
            });
        }
    });

};
// Enviar Email Confirma Restablecer Contraseña
const enviarCorreoRestableceContrasena = (req, res = response) => {

    const { email } = req.body;

    // Manejo de errores
    const errors = validationResult(req);
    //   console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }

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