const express = require('express');
const router = express.Router();

const db = require('../database');

 //Listar clientes
router.get('/clientes', (req,res) => {

    db.query('select * from clientes', (err,rows) => {
        if(!err){
            res.json(rows);
        }else{
            res.json('Error al traer los datos de la tabla clientes');
        }
    });
    //res.json('haciendo uso de ruta a traves del método GET'); 
});

//Eliminación de un cliente
router.delete('/clientes/:id', (req,res) => {
    var id = req.params.id;
    db.query('delete from clientes where id_cliente = ?',[id], (err,rows) => {
        if(!err){
            res.json('Se elimino el cliente');
        }else{
            res.json('No se puede eliminar el cliente por estar en uso');
        }
    });
});

//Guardar un cliente
router.post('/clientes', (req,res) => {

    const unCliente = req.body;

    db.query('insert into clientes set ?',[unCliente], (err,rows) => {
        if(!err){
            res.json('Se guardo exitosamente!');
        }else{
            res.json('Error al insertar en tabla clientes!');
        }
    });
    //res.json('Se inserto exitosamente!');
});

//Actualizar cliente
router.put('/clientes/:id', (req,res) => {

    const id = req.params.id;
    const unCliente = req.body;

    db.query('update clientes set ? where id_cliente = ?',[unCliente,id]); 

    res.json('Se actualizo el cliente exitosamente!');
});

//Buscar un cliente
router.get('/clientes/:id', (req,res) => {

    const id = req.params.id;

    db.query('select * from clientes where id_cliente = ?',[id],(err,rows) => {
        if(!err)
        {
            res.json(rows[0]);
        }else{
            res.json('Ocurrió un error. Revisar!')
        }

    });

});

module.exports = router;