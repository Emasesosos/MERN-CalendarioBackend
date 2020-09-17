/*
    Rutas Usuarios / Eventos
    host + /api/events
*/
const { Router } = require('express');
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
router.post('/', crearEvento);
// Obtener Eventos
router.get('/', getEventos);
// Actualizar Eventos
router.put('/:id', actualizarEvento);
// Eliminar Eventos
router.delete('/:id', eliminarEvento);

module.exports = router;