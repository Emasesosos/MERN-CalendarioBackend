/*
    Rutas Usuarios / Eventos
    host + /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    crearEvento,
    getEventos,
    actualizarEvento,
    eliminarEvento

} = require('../controllers/events');
const router = Router();

router.use(validarJWT);

// Crear Eventos
router.post(
    '/', [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearEvento
);
// Obtener Eventos
router.get('/', getEventos);
// Actualizar Eventos
router.put('/:id', actualizarEvento);
// Eliminar Eventos
router.delete('/:id', eliminarEvento);

module.exports = router;