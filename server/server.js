const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

/*console.log(__dirname + '/../public');
console.log(publicPath);*/

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

    socket.on('disconnect',()=>{
        console.log('User was disconnected');
    });


        //Listener
    socket.on('createMessage', (message)=>{
        console.log('createMessage', message);
        //io.emit a event to every single connection
        io.emit('newMessage',generateMessage(message.from,message.text));

        /*socket.broadcast.emit('newMessage',{
            from: message.from,
            text:message.text,
            createdAt: new Date().getTime()
        });*/

    });

    //socket.emit a event to a single connection
    /*socket.emit('newMessage',{
        from: 'Elias',
        text:'Hello everyone',
        createdAt:12332
    });*/


});

server.listen(port, ()=>{
   console.log(`Server is up on port: ${port}`); 
});