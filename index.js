const express = require('express');
const app = express();
require('dotenv').config();
const { dbConnection } = require('./config/config');
const postRoutes = require('./routes/posts');

const PORT = process.env.PORT || 8080;

// Middleware para entender JSON
app.use(express.json());

// Conexión a la Base de Datos
dbConnection();

// Rutas
app.use('/', postRoutes);

// Solo levantamos el servidor si NO estamos haciendo tests
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`✅ Servidor de Red Social corriendo en http://localhost:${PORT}`);
    });
}

// Exportamos app para que Supertest pueda usarlo
module.exports = app;