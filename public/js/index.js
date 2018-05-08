var socket = io();
socket.on('connect', function(){
    console.log('Connected to server');

    /*socket.emit('createEmail',{
        to:'jen@love.com',
        text: 'Hi hello'
    });*/

    socket.emit('createMessage',{
        from:'Andrew',
        text: 'Yup, that works'
    });
});

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

/*socket.on('newEmail',function (email) {
console.log('New email',email);
});*/

socket.on('newMessage',function (message) {
    console.log('New email',message);
});
