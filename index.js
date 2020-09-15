// Configuración básica de Express
const express = require('express');
require('dotenv').config();
//  console.log(process.env);
//  console.log(process.env.PORT);

// Crear el servidor de express
const app = express();

// Directorio Público
app.use(express.static('public'));

// Rutas
// app.get('/', (req, res) => { // Petición Get
//     res.json({
//         ok: true
//     });
// });

// Escuchar Peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});