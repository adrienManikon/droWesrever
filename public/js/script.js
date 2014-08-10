/*******************

    CLIENT SIDE

*******************/

// create a socket
var socket = io.connect('http://localhost:8080');

// Method which writes the message from the server
var writeMessage = function(message)
{                    
    message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    $('#zoneserver').prepend("<p class='zonemessage'>" 
                       + message
                       + "</p>");
    $('#zoneserver').height($('#zoneserver').height() + 30);
};

socket.on('message', function(message){
    writeMessage(message);
});

// When submit a word
$('#form_input').submit(function ()
{
    socket.emit('message', $('#message').val());
    $('#message').val('').focus();
    
    //return false to stop submit event form
    return false;
});

// When we run test
$("#run").click(function(e)
{
    socket.emit("test");
    socket.emit("test_script_js", ">tpircs/<;)'olleh'(trela>tpircs<");
});

socket.on("test_script_js", function(message)
{
    writeMessage(message);
});

// When we receipt result tests
socket.on("result", function(message)
{
    $('#zoneserver').prepend(
        "<div class='zonetest'"
        + "<h2>" + message.title + "</h2>"
        + "<ul><li>Description: " + message.desc + "</li>"
        + "<li>Expected: " + message.exp + "</li>"
        + "<li>Actual: " + message.actual + "</li>"
        + "<li>Status: <span class='" + message.status + "'>" + message.status + "</span></li>"
        + "<li>Time: " + message.time + "</li>"
        + "</ul></div>"
    );
    
    $('#zoneserver').height($('#zoneserver').height() + $('.zonetest').height() + 30);
});