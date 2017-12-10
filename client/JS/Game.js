var cursors;
var velocity = 0
var text;
var x = 150;
var y = 360;
var socket = io();
var car;
var Player = require('./player');
var game = new Phaser.Game(1000, 1000, Phaser.AUTO, 'main_game', {
  preload: preload,
  create: create,
  update: update
});

function preload() {
  this.game.load.spritesheet('track', 'client/Images/Background-Track.png');
  this.game.load.spritesheet('car', 'client/Images/CarSmall.png');
  game.load.spritesheet('Collision-Track', 'client/Images/Collision-Track.png');
  game.load.physics("collision", "client/assets/collision.json");
  this.game.scale.pageAlignHorizontally = true;
  this.game.scale.pageAlignVertically = true;
  this.game.scale.refresh();
  this.game.world.scale.setTo(2.5, 2.5);
}

function create() {
  game.playerMap = {};
  game.physics.startSystem(Phaser.Physics.P2JS);
  var track = game.add.sprite(0, 0, 'track');
  var CollisionTrack = game.add.sprite(500, 500, 'Collision-Track');

  Player.askNewPlayer();
  game.physics.p2.enable(car);
  car.body.angle = 0;
  cursors = game.input.keyboard.createCursorKeys();

  var carCollisionGroup = game.physics.p2.createCollisionGroup();
  var CollisionTrackCollisionGroup = game.physics.p2.createCollisionGroup();
  game.physics.p2.updateBoundsCollisionGroup();

  game.physics.p2.enable(CollisionTrack);
  CollisionTrack.body.kinematic = true;
  CollisionTrack.body.clearShapes();
  CollisionTrack.body.loadPolygon('collision', 'Collision-Track');

  car.body.setCollisionGroup(carCollisionGroup);
  CollisionTrack.body.setCollisionGroup(CollisionTrackCollisionGroup);

  car.body.collides([carCollisionGroup, CollisionTrackCollisionGroup]);
  CollisionTrack.body.collides([CollisionTrackCollisionGroup, carCollisionGroup]);

  count = 0;

  text = game.add.text(150, 900, "Speed = 0", {
      font: "10px Arial",
      fill: "#000000",
      align: "center"
  });

  text.anchor.setTo(0.5 ,0.5 );

}

function update() {
  this.camera.follow(car, Phaser.Camera.FOLLOW_LOCKON);
  if (cursors.up.isDown && velocity <= 200) {
    velocity += 4;
  } else if (cursors.down.isDown && velocity >= -50) {
    velocity -= 4;
  } else {
    if (velocity >= 1)
      velocity -= 1;
  }

  car.body.velocity.x = velocity * Math.cos((car.angle - 90) * 0.01745);
  car.body.velocity.y = velocity * Math.sin((car.angle - 90) * 0.01745);

  if (cursors.left.isDown)
    car.body.angularVelocity = -1 * (velocity / 50);
  else if (cursors.right.isDown)
    car.body.angularVelocity = 1 * (velocity / 50);
  else
    car.body.angularVelocity = 0;

 text.setText("Speed = "+ velocity);
 text.x = Math.floor(car.x);
 text.y = Math.floor(car.y - 20);
}

game.addNewPlayer = function(id,x,y){
    game.playerMap[id] = game.add.sprite(x,y,'car');
};
