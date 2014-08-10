/*******************

    SERVER SIDE

*******************/

var http = require('http');
var fs = require('fs');
var ent = require('ent');
var url = require('url');
var suitest = require('suitest');

//Create a server
var server = http.createServer(function(req, res)
{    
    var page = url.parse(req.url).pathname;
    

    if (req.url.indexOf('.css') != -1) // load css file
    {
        fs.readFile(__dirname + page, function (err, data)
        {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data);
            res.end();
        });
    }
    else if (req.url.indexOf('.js') != -1) // load js file
    {
        fs.readFile(__dirname + page, function (err, data)
        {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'application/javascript'});
            res.write(data);
            res.end();
        });
    }
    else //for any other request, we are redirected to index.html
    {
        fs.readFile('./index.html', 'utf-8', function(error, content) 
        {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(content);
        });
    }
    
});

// Create a socket listening the server                      
var io = require('socket.io').listen(server);

/*****************
    Public methods for the application
*****************/

// Replace a character at index
String.prototype.replaceAt = function(index, character)
{
    var newString =  this.substr(0, index) 
        + character 
        + this.substr(index + character.length);
    
    return newString;
}

// Reverse word
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
    // When socket receipts a word
    socket.on('message', function(message)
    {
        message = reverseString(message, 0);
        socket.emit('message', message);
    });
    
    // When we click on run test
    socket.on("test_script_js", function(message)
    {
        message = reverseString(message, 0);
        socket.emit('test_script_js', message);
    });
    
    socket.on('test', function(message)
    {
        // Create unit test object
        var unit_test = new Suitest('Module string');
        
        // test : "test"
        unit_test.test('test 1', function(unit)
        {
            var text = "test";
            var test =
            {
                title: 'test 1',
                desc: "Test with 'test'",
                exp: "tset",
                actual: reverseString(text, 0)
            }
            
            unit.describe("Test with 'test'").exec(test.actual, test.exp).done(function(e) {
                    test.status = e.status;
                    test.time = e.time;
                    socket.emit("result", test);
            });
        });
        
        // test : ""
        unit_test.test('test 2', function(unit)
        {
            var text = "";
            var test =
            {
                title: 'test 2',
                desc: "Test with an empty word",
                exp: "",
                actual: reverseString(text, 0)
            }
                        
            unit.describe("Test with ''").exec(test.actual, test.exp).done(function(e) {
                    test.status = e.status;
                    test.time = e.time;
                    socket.emit("result", test);
            });
        });
        
        // test : "a"
        unit_test.test('test 3', function(unit)
        {
            var text = "a";
            var test =
            {
                title: 'test 3',
                desc: "Test with one letter",
                exp: "a",
                actual: reverseString(text, 0)
            }
            
            unit.describe("Test with one letter").exec(test.actual, test.exp).done(function(e) {
                    test.status = e.status;
                    test.time = e.time;
                    socket.emit("result", test);
            });
        });
        
        // test with special character
        unit_test.test('test 4', function(unit)
        {
            var text = "a&'(-à)_('é\"&çà_'àç-'é";
            var test =
            {
                title: 'test 2',
                desc: "Test with special characters",
                exp: "é'-çà'_àç&\"\é'(_)à-('&a",
                actual: reverseString(text, 0)
            }
            
            unit.describe("Test with with special characters").exec(test.actual, test.exp).done(function(e) {
                    test.status = e.status;
                    test.time = e.time;
                    socket.emit("result", test);
            });
        });
        
    });
});

server.listen(8080);