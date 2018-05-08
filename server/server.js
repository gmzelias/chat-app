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

    socket.on('disconnect',()=>{
        console.log('User was disconnected');
    });

    /*socket.on('createEmail', (newEmail)=>{
        console.log('createEmail', newEmail);
    });*/

        //Listener
    socket.on('createMessage', (message)=>{
        console.log('createMessage', message);
        //io.emit a event to every single connection
        io.emit('newMessage',{
            from: message.from,
            text:message.text,
            createdAt: new Date().getTime()
        });
    });

    /*socket.emit('newEmail',{
        from: 'mike@example.com',
        text:'how you doing?',
        createdat:123
    });*/

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