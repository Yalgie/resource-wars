var express = require('express')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
var username = undefined;
var people = {}
app.use(express.static('static'))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {

    socket.on('set_username', function(username) {
        people[socket.id] = username
        io.emit('username_set', people[socket.id] + " has joined the room");
    });

    socket.on('send_message', function(msg) {
        if (msg.length > 0) {
            io.emit('send_message', people[socket.id] + ": " + msg);
        }
    });

    socket.on('disconnect', function() {
        io.emit('send_message', (people[socket.id] + " has left the chat"));
        delete people[socket.id];
    });

});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
