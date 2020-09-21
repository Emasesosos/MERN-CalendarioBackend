const { response } = require('express');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

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

        // Generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
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
const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email: email });
        // console.log(usuario);
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });


    } catch (error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el Administrador'
        });
    }

};
// Revalidar Token para Usuario
const revalidarToken = async(req, res = response) => {

    const { uid, name } = req;

    // Generar nuevo JWT y retornarlo en la petición
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
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

        // Generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            msg: 'Cambio de Contraseña Exitoso',
            uid: usuario.id,
            name: usuario.name,
            token
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
const enviarCorreoRegistro = async(req, res = response) => {

    const { email } = req.body;

    try {

        const usuario = await Usuario.findOne({ email: email });
        const { name } = usuario;

        res.status(200).json({
            ok: true,
            msg: 'Se envió correo de confirmación',
            name,
            email,
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el Administrador'
        });

    }

    // try {

    //     const usuario = await Usuario.findOne({ email: email });
    //     const { name } = usuario;

    //     // Enviar correo con Nodemailer
    //     const transporter = nodemailer.createTransport({
    //         host: "smtp.ethereal.email",
    //         port: 587,
    //         secure: false,
    //         auth: {
    //             user: "nat.reinger@ethereal.email",
    //             pass: "uNrUxaggy3qe6cvdbw",
    //         }
    //     });

    //     const mailOptions = {
    //         from: "Remitente",
    //         to: email,
    //         subject: "Enviado desde nodemailer",
    //         text: `¡${ name } tu Registro ha sido Exitoso!`,
    //     }

    //     transporter.sendMail(mailOptions, (error, info) => {
    //         if (error) {
    //             res.status(500).send(error.message);
    //         } else {
    //             res.status(200).json({
    //                 ok: true,
    //                 msg: 'Send Mail Register',
    //                 name,
    //                 email,
    //             });
    //         }
    //     });

    // } catch (error) {

    //     // console.log(error);
    //     res.status(500).json({
    //         ok: false,
    //         msg: 'Por favor hable con el Administrador'
    //     });

    // }

};
// Enviar Email Confirma Restablecer Contraseña
const enviarCorreoRestableceContrasena = async(req, res = response) => {

    const { email } = req.body;

    try {

        const usuario = await Usuario.findOne({ email: email });
        const { name } = usuario;

        res.status(200).json({
            ok: true,
            msg: 'Se envió correo de confirmación',
            name,
            email,
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el Administrador'
        });

    }

    // try {

    //     const usuario = await Usuario.findOne({ email: email });
    //     const { name } = usuario;

    //     // Enviar correo con Nodemailer
    //     const transporter = nodemailer.createTransport({
    //         host: "smtp.ethereal.email",
    //         port: 587,
    //         secure: false,
    //         auth: {
    //             user: "nat.reinger@ethereal.email",
    //             pass: "uNrUxaggy3qe6cvdbw",
    //         }
    //     });

    //     const mailOptions = {
    //         from: "Remitente",
    //         to: email,
    //         subject: "Enviado desde nodemailer",
    //         text: `¡${ name } el cambio de contraseña ha sido exitoso!`,
    //     }

    //     transporter.sendMail(mailOptions, (error, info) => {
    //         if (error) {
    //             res.status(500).send(error.message);
    //         } else {
    //             res.status(200).json({
    //                 ok: true,
    //                 msg: 'Send Mail Restablish Pass',
    //                 name,
    //                 email,
    //             });
    //         }
    //     });

    // } catch (error) {

    //     // console.log(error);
    //     res.status(500).json({
    //         ok: false,
    //         msg: 'Por favor hable con el Administrador'
    //     });

    // }

};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    restablecerContrasena,
    enviarCorreoRegistro,
    enviarCorreoRestableceContrasena
};