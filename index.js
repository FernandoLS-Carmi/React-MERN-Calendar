const path = require('path');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

console.log( process.env );

// Servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors())

// Directorio publico
app.use( express.static('public') );
// Lectura y parseo del body
app.use(express.json());


// Rutas
app.use('/api/auth', require('./routes/auth')); //authentication
app.use('/api/events', require('./routes/events')); //eventos

app.use('*', (req, res ) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
});