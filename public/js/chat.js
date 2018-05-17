var socket = io();

function scrollToBottom (){
// Selectors
var messages = jQuery('#messages');
var newMessage = messages.children('li:last-child');
// Heights
var clientHeight = messages.prop('clientHeight');

var scrollTop = messages.prop('scrollTop');

var scrollHeight = messages.prop('scrollHeight');

var newMessageHeight = newMessage.innerHeight();
var lastMessageHeight = newMessage.prev().innerHeight();

/*var cai = clientHeight + scrollTop + newMessageHeight + lastMessageHeight;
var cuid = scrollHeight;
console.log(lastMessageHeight);
console.log(newMessageHeight);*/

if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){

    messages.scrollTop(scrollHeight);
}

}

socket.on('connect', function(){
    console.log('Connected to server');
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(err){
        if (err){
            alert(err);
            window.location.href ='/';
        } else{
            console.log('No error');
        }
    }
)

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


//LISTENER
socket.on('updateUserList', function(users){
    var ol = jQuery('<ol></ol>');
    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
});


/*socket.on('newEmail',function (email) {
console.log('New email',email);
});*/

socket.on('newMessage',function (message) {
var formattedTime = moment(message.createdAt).format('h:mm a');
var template = jQuery('#message-template').html();
var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
});
jQuery('#messages').append(html);
scrollToBottom();


    /* console.log('New message',message);
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li);*/

});

socket.on('newLocationMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
   /* var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);*/
    var template = jQuery('#locationmessage-template').html();
    var html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url :message.url
});
jQuery('#messages').append(html);
scrollToBottom();
});
    
var messageTextbox = jQuery('[name=message]');

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
    text:messageTextbox.val()
    }, 
    function(){
        messageTextbox.val('');
    });
    });

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
if (!navigator.geolocation){
    return alert('Geolocation not supported by your browser.');
}
locationButton.attr('disabled','disabled').text('Sending location ...');

navigator.geolocation.getCurrentPosition(function (position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    });
}, function (){//error handler function
    alert('Unable to fetch location.');
    locationButton.removeAttr('disabled').text('Send location');
});
});



