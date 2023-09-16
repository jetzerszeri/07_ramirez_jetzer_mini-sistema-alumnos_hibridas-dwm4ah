const express = require('express');
const fs = require('fs').promises; //para leer archivos
const router = express.Router();

const rutaJSON = './data/alumnos.json';

//En la ruta Lista de Alumnos (/alumnos) se debe mostrar la lista de alumnos registrados en el sistema, Para cada alumno se debe visualizar un link para ver el alumno, la ruta para ver el alumno debe ser 
router.get('/', async (req, res) => {
    try{
        const data = JSON.parse(await fs.readFile(rutaJSON, 'utf-8'));

        let html = `<h1>Lista de Alumnos</h1>
        <ul>`;

        data.forEach((alumno, index) => {
            html += `<li><a href="/alumnos/${alumno.legajo}">${alumno.name} ${alumno.lastname}</a></li>`;
        });

        html += '</ul>';

        res.status(200).send(html);
    }catch(error){
        res.json({
            msg: 'Error en el servidor ' + error, 
        });
    }
})

//Se debe poder agregar un alumno
router.post('/', async (req, res) => {
    try {
        const data = JSON.parse(await fs.readFile(rutaJSON, 'utf-8'));
        const alumno = req.body;

        data.push(alumno);

        await fs.writeFile(rutaJSON, JSON.stringify(data, null, 2));

        res.json({
            msg: 'El alumno fue agregado correctamente', 
            data
        });
        
    }catch(error){
        res.json({
            msg: 'Error en el servidor ' + error, 
        });
    }
})




module.exports = router;
