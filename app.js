var http = require('http');
var fs = require('fs');
var ent = require('ent');
var url = require('url');
var suitest = require('suitest');

var server = http.createServer(function(req, res)
{    
    var page = url.parse(req.url).pathname;
    
    if (req.url.indexOf('.css') != -1)
    {
        fs.readFile(__dirname + page, function (err, data)
        {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data);
            res.end();
        });
    }
    else if (req.url.indexOf('.js') != -1)
    {
        fs.readFile(__dirname + page, function (err, data)
        {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'application/javascript'});
            res.write(data);
            res.end();
        });
    }
    else
    {
        if (page == '/')
        {
            fs.readFile('./index.html', 'utf-8', function(error, content) 
            {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(content);
            });
        }
        else if (page == '/test')
        {
            fs.readFile('./test.html', 'utf-8', function(error, content) 
            {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(content);
            });
        }
        else
        {
            console.log(page);
            res.redirect('/');
        }
    }
    
});

                     
var io = require('socket.io').listen(server);

String.prototype.replaceAt = function(index, character)
{
    var newString =  this.substr(0, index) 
        + character 
        + this.substr(index + character.length);
    
    return newString;
}

function reverseString (message, index)
{
    var chartmp = message[index];
    
    if(index > (message.length - 1)/2)
    {
        return message;
    }
    else
    {      
        message = message.replaceAt(index, message[message.length - 1 - index]);
        message = message.replaceAt(message.length - 1 - index, chartmp);
        index++;
        
        return reverseString(message,index);
    }
}

io.sockets.on('connection', function (socket)
{
    socket.on('message', function(message)
    {
        message = reverseString(ent.encode(message), 0);
        socket.emit('message', message);
    });
});

server.listen(8080);