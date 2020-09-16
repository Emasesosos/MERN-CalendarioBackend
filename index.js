// Configuración básica de Express
const express = require('express');
require('dotenv').config();
//  console.log(process.env);
//  console.log(process.env.PORT);

// Crear el servidor de express
const app = express();

// Directorio Público
app.use(express.static('public'));
// Lectura y parseo del body
app.use(express.json());

// Rutas
// TODO: Auth => Crear, Login, Renew
app.use('/api/auth', require('./routes/auth'));
// TODO: CRUD: Eventos
// TODO: Email: Registro y Reestablecer Password

// Escuchar Peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});