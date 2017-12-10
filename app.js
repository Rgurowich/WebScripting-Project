console.log('Server Start');

var express = require('express');
var app = express();
var gameServer = require('http').Server(app);
var io = require('socket.io')(gameServer,{});


app.use('/client', express.static(__dirname + '/client'));
app.use('/client/Images', express.static(__dirname + '/client/Images'));
app.use('/client/assets', express.static(__dirname + '/client/assets'));
app.use('/client/JS', express.static(__dirname + '/client/JS'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/game.html');
});

gameServer.listen(8081);

gameServer.lastPlayderID = 0;


io.sockets.on('connection',function(socket){
    socket.on('newplayer',function(){
        socket.player = {
            id: gameServer.lastPlayderID++,
            x: 160,
            y: 370
        };
        socket.emit('allplayers',getAllPlayers());
        socket.broadcast.emit('newplayer',socket.player);

    });
    console.log('socket connection');
});

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}

//var SOCKET_LIST = {};

//var io = require('socket.io')(gameServer,{});
//io.sockets.on('connection', function(socket){
//  socket.id = Math.random();
//  socket.x = 0;
//  socket.y = 0;
//  SOCKET_LIST[socket.id] = socket;
//  console.log('socket connection');
///});

//setInterval(function(){
//  var pack = [];
//  for(var i in SOCKET_LIST){
//    var socket = SOCKET_LIST[i];
//    pack.push({
//      x:socket.x,
//      y:socket.y
//    });
//  }
//  for(var i in SOCKET_LIST){
//    var socket = SOCKET_LIST[i];
//    socket.emit('newPosition', pack);
//  }

//},1000/25)
