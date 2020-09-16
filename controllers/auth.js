const { response } = require('express');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

// Crear Usuario
const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email: email });
        // console.log(usuario);
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }

        usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        });

    } catch (error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el Administrador'
        });
    }

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
const restablecerContrasena = async(req, res = response) => {

    const { email, password: newPassword } = req.body;

    try {

        let usuario = await Usuario.findOne({ email: email });
        // console.log('Antes: ', usuario);
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe usuario con ese correo'
            });
        }

        // Almacenar nuevo password para actualizar
        const nuevoPassword = {};
        nuevoPassword.password = newPassword;

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        nuevoPassword.password = bcrypt.hashSync(newPassword, salt);

        usuario = await Usuario.findByIdAndUpdate({ _id: usuario.id }, { $set: nuevoPassword }, { new: true });
        // console.log('Después: ', usuario);

        res.status(201).json({
            ok: true,
            msg: 'Cambio de Contraseña Exitoso',
            uid: usuario.id,
            name: usuario.name
        });

    } catch (error) {

        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el Administrador'
        });

    }

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
        text: "¡Registro Exitoso!",
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
        text: "¡Cambio de Contraseña Exitoso!",
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