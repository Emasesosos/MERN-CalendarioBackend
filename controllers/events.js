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
const actualizarEvento = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        };

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.status(201).json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...'
        });
    }

};
// Eliminar Eventos
const eliminarEvento = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para borrar este evento'
            });
        }

        await Evento.findByIdAndDelete(eventoId);

        res.status(201).json({
            ok: true,
            msg: 'Nota eliminada correctamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...'
        });
    }

};

module.exports = {
    crearEvento,
    getEventos,
    actualizarEvento,
    eliminarEvento
};