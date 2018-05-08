const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

    socket.emit('newMessage', {
        from: 'Admin',
        text:'Welcome to the chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage',{
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });

    socket.on('disconnect',()=>{
        console.log('User was disconnected');
    });


        //Listener
    socket.on('createMessage', (message)=>{
        console.log('createMessage', message);
        //io.emit a event to every single connection
        io.emit('newMessage',{
            from: message.from,
            text:message.text,
            createdAt: new Date().getTime()
        });

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