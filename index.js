'use strict';

const express = require('express');
const app = express();
const server = app.listen(3000);

app.use(express.static('public'));

console.log("My socket server is running");

const socket = require('socket.io');
const io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log(`new connection: ${socket.id} `);

    function log() {
        var array = ['Message from server:'];
        array.push.apply(array, arguments);
        socket.emit('log', array);
    }

    socket.on('message', function(message) {
        log('Client said: ', message);
        // for a real app, would be room-only (not broadcast)
        socket.broadcast.emit('message', message);
    });

    socket.on('create or join', function(room) {
        log('Received request to create or join room ' + room);
        
        let clientsInRoom = io.sockets.adapter.rooms[room];
        let numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;

        if( numClients === 0) {
            socket.join(room);
            log('Client ID ' + socket.id + ' created room ' + room);
            socket.emit('created', room, socket.id);
        } else if (numClients === 1) {
            log('Client ID ' + socket.id + ' joined room ' + room);
            io.sockets.in(room).emit('join', room);
            socket.join(room);
            socket.emit('joined', room, socket.id);
            io.sockets.in(room).emit('ready');
        } else {
            socket.emit('full', room);
        }
    })

    socket.on('bye', function(){
        console.log('received bye');
      });

    socket.on('stream', msg => {
        console.log(msg);
    });
}