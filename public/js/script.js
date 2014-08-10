var socket = io.connect('http://localhost:8080');

var writeMessage = function(message)
{                    
    message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    $('#zoneserver').prepend("<p class='zonemessage'>" 
                       + message
                       + "</p>");
};

socket.on('message', function(message){
    writeMessage(message);
});

$('#form_input').submit(function ()
{
    socket.emit('message', $('#message').val());
    $('#message').val('').focus();
    
    return false;
});