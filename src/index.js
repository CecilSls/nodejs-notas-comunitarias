import express from "express";
import http from 'http';
import { v4 as uuid } from 'uuid'
import { Server as WebSocket } from 'socket.io'

require("dotenv").config();

let notes = [];

const app = express();
const httpServer = http.createServer(app); //* Crear un modulo http
const io = new WebSocket(httpServer);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public")); //* Poder usar el directorio public index.html

/**
 * @description - Acciones que realizara el servidor con las peticiones del socket en los clientes
 */
io.on('connection', (socket) => {
    console.log('a user connected::>', socket.id);

    socket.emit('server:loadnotes', notes);

    socket.on('client:newnote', (data) => {
        const new_data = {...data, id: uuid()};
        notes.push(new_data);
        io.emit('server:newnote', new_data);
    });

    socket.on('client:deletenote', (id) => {
        notes = notes.filter(note => note.id !== id);
        io.emit('server:loadnotes', notes);
    });

    socket.on('client:getnote', (id) => {
        const note = notes.find(note => note.id === id);
        socket.emit('server:selectnote', note);
    });

    socket.on('client:updatenote', (data) => {
        notes = notes.map(note => {
            if (note.id === data.id) {
                note.title = data.title;
                note.description = data.description;
            }

            return note;
        });

        io.emit('server:loadnotes', notes);
    });

});

httpServer.listen(port, () => {
    console.log(`Server is running on port::> ${ port }`);
    
});