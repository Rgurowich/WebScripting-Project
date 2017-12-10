var Player = {};
Player.socket = io.connect();

Player.askNewPlayer = function(){
    console.log("askNewPlayer");
    Player.socket.emit('newplayer');
}

Player.socket.on('newplayer',function(data){
    game.addNewPlayer(data.id,data.x,data.y);
})

Player.socket.on('allplayers',function(data){
    console.log(data);
    for(var i = 0; i < data.length; i++){
        game.addNewPlayer(data[i].id,data[i].x,data[i].y);
    }
})

module.exports = Player;
