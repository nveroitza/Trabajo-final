const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');
var osu = require('node-os-utils');
//const { netstat } = require('node-os-utils');


const server = express();

server.set('port', process.env.PORT || 3030);

server.use(express.json());
server.use(cors());

//Nuestras rutas
//server.use(require('./routes/route.clientes'));
//server.use(require('./routes/route.equipos'));

const servidor = server.listen(server.get('port'), () => {
    console.log('Servidor corriendo en el puerto:',server.get('port'));

});

//Websocket requiere de un servidor para trabajar
const socket = socketio(servidor);
var cpu = osu.cpu;
var mem = osu.mem;
var netstat = osu.netstat;
socket.on('connection', (socket) => {
    
    //emitimos constantemente segundo a segundo
    setInterval(() => {
        cpu.usage()
        .then(cpuPercentage => {
            socket.emit('cpu',cpuPercentage)
        });
        mem.used()
        .then(usada => {
            socket.emit('ram',usada)
        });
        netstat.stats()
        .then(red => {
            socket.emit('entradaR',red[0].inputBytes)
            
        });
        netstat.stats()
        .then(red => {
            
            socket.emit('salidaR',red[0].outputBytes)
        });

    },1000);
   

});