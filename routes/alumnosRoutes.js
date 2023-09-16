const express = require('express');

const fs = require('fs').promises; //para leer archivos

const router = express.Router();

const rutaJSON = './data/alumnos.json';

router.get('/', async (req, res) => {
    try{
        const data = JSON.parse(await fs.readFile(rutaJSON, 'utf-8'));
        res.json({
            msg: 'Listado de usuarios del Calendario', 
            usuarios: data
        });
    }catch(error){
        res.json({
            msg: 'Error en el servidor ' + error, 
        });
    }
})

module.exports = router;


//retorna el listado de los usuarios
// router.get('/', async (req, res) => {
//     try {
//         const data = JSON.parse(await fs.readFile(rutaJSON, 'utf-8'));
//         res.json({
//             msg: 'Listado de usuarios del Calendario', 
//             usuarios: data.users
//         });
//     }catch(error){
//         res.json({
//             msg: 'Error en el servidor ' + error, 
//         });
//     }
// })