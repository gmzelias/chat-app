const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

/*console.log(__dirname + '/../public');
console.log(publicPath);*/

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('New user connected');

   /* socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));*/

    socket.on('disconnect',()=>{
        var user = users.removeUser(socket.id);

        if (user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }

        console.log('User was disconnected');
    });

    socket.on('join', (params,callback)=>{
       /* console.log(params.name);
        console.log(params.room);
        console.log(isRealString(params.name));
        console.log(isRealString(params.room));*/
       

        if (!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room are required') // remember, the callback needs and argument to be used
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);
        //socket.leave(params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        //io.emit -sends a message to every connection
        //socket.broadcast.emit -a message to every connection to the socket server except for the current user
        //socket.emit -event specifically to one user.

        socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined.`));


        callback();
    }
);

        //Listener
    socket.on('createMessage', (message, callback)=>{
        console.log('createMessage', message);
        //io.emit a event to EVERY single connection
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback();
        /*socket.broadcast.emit('newMessage',{
            from: message.from,
            text:message.text,
            createdAt: new Date().getTime()
        });*/
    });

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude))
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