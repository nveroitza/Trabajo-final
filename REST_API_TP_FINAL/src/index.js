//Guardamos en una constante todo lo que nos ofrece express
const express = require('express');
const cors = require('cors');
//const socketio = require('socket.io');

//Se inicializan y guarda las funcionalidades de expres
const server = express();

//Seteamos el puerto disponible en el sistema
server.set('port', process.env.PORT || 3000);

//El formato de datos para la recepcion y envio de datos sera en JSON
server.use(express.json());
server.use(cors());

//Nuestras rutas
server.use(require('./routes/route.clientes'));
server.use(require('./routes/route.equipos'));

//Le damos arranque a nuestro servidor
const servidor = server.listen( server.get('port') );

//Mensaje que muestra ejecucion del server
console.log('Servidor de desarrollo en el puerto', server.get('port'));

//websocket requiere de un servidor para trabajar
//const socket = socketio(servidor);

//socket.on('connection', (socket) => {

    //setInterval(()=>{
        //socket.emit('random',Math.random());
    //},1000);
    
//});