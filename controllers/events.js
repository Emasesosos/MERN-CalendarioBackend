const { response } = require("express");
const Evento = require('../models/Evento');

// Crear Eventos
const crearEvento = async(req, res = response) => {

    // Verificar el contenido del evento
    console.log(req.body);

    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.status(201).json({
            ok: true,
            evento: eventoGuardado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};
// Obtener Eventos
const getEventos = async(req, res = response) => {

    const eventos = await Evento.find()
        .populate('user', 'name');

    res.status(201).json({
        ok: true,
        eventos
    });

};
// Actualizar Eventos
const actualizarEvento = (req, res = response) => {

    res.status(201).json({
        ok: true,
        msg: 'Actualizar Eventos',
    });

};
// Eliminar Eventos
const eliminarEvento = (req, res = response) => {

    res.status(201).json({
        ok: true,
        msg: 'Eliminar Eventos',
    });

};

module.exports = {
    crearEvento,
    getEventos,
    actualizarEvento,
    eliminarEvento
};