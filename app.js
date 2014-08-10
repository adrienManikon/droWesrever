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
    if( (message === 'undefined') || (message.length <= 1) || index > (message.length - 1)/2 )
    {
        return message;
    }
    else
    { 
        var chartmp = message[index];
        
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
        message = reverseString(message, 0);
        socket.emit('message', message);
    });
    
    socket.on("test_script_js", function(message)
    {
        message = reverseString(message, 0);
        socket.emit('test_script_js', message);
    });
    
    socket.on('test', function(message)
    {
        var unit_1 = new suitest('Module 1');
        // test 1
        unit_1.test('test 1', function(unit)
        {
            unit.describe('Test description 1!')
            .exec(true, 1).done(); // true
        });
        
        var unit_2 = new Suitest('Module string');
        
        unit_2.test('test 1', function(unit)
        {
            var text = "test";
            var result = "tset";
            
            unit.describe("Test with 'test'").exec(reverseString(text, 0), result).done();
        });
        
        unit_2.test('test 2', function(unit)
        {
            var text = "";
            var result = "";
            
            unit.describe("Test with ''").exec(reverseString(text, 0), result).done();
        });
        
        unit_2.test('test 3', function(unit)
        {
            var text = "a";
            var result = "a";
            
            unit.describe("Test with one letter").exec(reverseString(text, 0), result).done();
        });
        
        unit_2.test('test 4', function(unit)
        {
            var text = "a&'(-à)_('é\"&çà_'àç-'é";
            var result = "";
            
            unit.describe("Test with with special characters").exec(reverseString(text, 0), reverseString(text, 0)).done();
        });
    });
});

server.listen(8080);