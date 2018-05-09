var socket = io();
socket.on('connect', function(){
    console.log('Connected to server');

    /*socket.emit('createEmail',{
        to:'jen@love.com',
        text: 'Hi hello'
    });*/

   /* socket.emit('createMessage',{
        from:'Andrew',
        text: 'Yup, that works'
    });*/
});

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

/*socket.on('newEmail',function (email) {
console.log('New email',email);
});*/

socket.on('newMessage',function (message) {
    console.log('New message',message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

/*socket.emit('createMessage',{
    from: 'Elias',
    text:'Hi hello'
}, function(data){
    console.log('Got it!');
    console.log(data);
});*/

jQuery('#message-form').on('submit', function(e){
e.preventDefault();
socket.emit('createMessage', {
from: 'User',
text: jQuery('[name=message]').val()
}, 
function(){

});

});

