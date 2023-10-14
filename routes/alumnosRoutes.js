const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


//creamos la conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/sistema_alumnos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


//defino un esquema, 
//recibe como parametro el json que va a tener la estructura de la base de datos
const studentSchema = mongoose.Schema({
    name: String,
    lastname: String,
    year: Date
})


//creo el objeto
const Student = mongoose.model('student', studentSchema);

//esto de arriba se va a hacer por cada colección que tenga la base de datos, ejemplo, usuarios, productos, categorías, etc




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


//ver info de cada alumno
router.get('/:legajo', async (req, res) => {
    try{
        const {legajo} = req.params;
        const data = JSON.parse(await fs.readFile(rutaJSON, 'utf-8'));

        const alumno = data.findIndex(alumno => alumno.legajo == legajo);

        if(alumno == -1){
            res.status(404).json({
                msg: 'El alumno no existe'
            });
            return;
        }

        res.status(200).json({
            msg: `Información del alumno ${legajo}`, 
            alumno: data[alumno]
        });

    }catch(error){
        res.json({
            msg: 'Error en el servidor ' + error, 
        });
    }
})

//Se debe poder modificar los datos de un alumno
router.put('/:legajo', async (req, res) => {
    try{
        const {legajo} = req.params;
        const data = JSON.parse(await fs.readFile(rutaJSON, 'utf-8'));

        const index = data.findIndex(alumno => alumno.legajo == legajo);

        if(index == -1){
            res.status(404).json({
                msg: 'El alumno no existe'
            });
            return;
        }

        const info = req.body;

        const updatedData = {
            legajo: legajo,
            name: info.name,
            lastname: info.lastname,
            year: info.year,
        }

        data[index] = updatedData;

        await fs.writeFile(rutaJSON, JSON.stringify(data, null, 2));

        res.status(200).json({
            msg: 'El alumno fue modificado correctamente', 
            info
        });


    
    }catch(error){
        res.json({
            msg: 'Error en el servidor ' + error, 
        });
    }
})


//Se debe poder eliminar un alumno
router.delete('/:legajo', async (req, res) => {
    try{
        const {legajo} = req.params;
        const data = JSON.parse(await fs.readFile(rutaJSON, 'utf-8'));

        const index = data.findIndex(alumno => alumno.legajo == legajo);

        if(index == -1){
            res.status(404).json({
                msg: 'El alumno no existe'
            });
            return;
        }else{
            data.splice(index, 1);

            await fs.writeFile(rutaJSON, JSON.stringify(data, null, 2));

            res.status(200).json({
                msg: 'El alumno fue eliminado correctamente', 
                data
            });
        }

    }catch(error){
        res.json({
            msg: 'Error en el servidor ' + error, 
        });
    }
})


module.exports = router;
