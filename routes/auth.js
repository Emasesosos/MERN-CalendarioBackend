/*
    Rutas Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => { // Petición Get
    res.json({
        ok: true
    });
});

module.exports = router;