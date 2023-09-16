const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 2023;

app.get('/', (req, res) => {
    res.send(`<h1>Bienvenido al sistema de alumnos</h1>
    <a href="/alumnos">Lista de Alumnos</a>`)
})


//llamo a nuestras rutas y le pasamos la app
routerApi(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
