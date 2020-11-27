const express = require('express');

const router = express.Router();
const db = require('../database');
const inet = require('inet');

//Listar equipos
router.get('/equipos', async(req,res) => {
    //await db.query('select * from equipos'), (err,rows) => {
    await db.query('select id_host,hostname,inet_ntoa(dir_ip) as dir_ip, date_format(fecha_carga,"%Y-%m-%d") as fecha_carga, cliente from equipos', (err,rows) => {
        if(!err){
            res.json(rows);
        }else{
            res.json('Error al traer los datos de la tabla equipos');
        }
    });

    //res.json('haciendo uso de ruta a traves del método GET'); 
});
//Eliminar equipo
router.delete('/equipos/:id', (req,res) => {

    var id = req.params.id;
    db.query('delete from equipos where id_host = ?',[id], (err,rows) => {
        if(!err){
            res.json('Se elimino el equipo');
        }else{
            res.json('No se puede eliminar el equipo por estar en uso');
        }
    });
});

//Guardar equipos
router.post('/equipos', (req,res) => {
    
    const unEquipo = {
        hostname:req.body.hostname,
        dir_ip:inet.aton(req.body.dir_ip),
        fecha_carga:req.body.fecha_carga,
        cliente:req.body.cliente
        }

    db.query('insert into equipos set ?',[unEquipo], (err,rows) => {
        if(!err){
            res.json('Se guardo exitosamente!');
        }else{
            res.json('Error al insertar en tabla equipos!');
        }
    });
    
});

//Actualizar equipo
router.put('/equipos/:id', (req,res) => {
    console.log(req.params.id);
    const id = req.params.id;
    const unEquipo  = {
        hostname:req.body.hostname,
        dir_ip:inet.aton(req.body.dir_ip),
        fecha_carga:req.body.fecha_carga,
        cliente:req.body.cliente
        }
    db.query('update equipos set ? where id_host = ?',[unEquipo,id]); 

    res.json('Se actualizo el equipo exitosamente!');
});

//Buscar un equipo
router.get('/equipos/:id', (req,res) => {

    const id = req.params.id;

    db.query('select * from equipos where id_host = ?',[id],(err,rows) => {
        if(!err)
        {
            res.json(rows[0]);
        }else{
            res.json('Ocurrió un error. Revisar!')
        }

    });

});

module.exports = router;