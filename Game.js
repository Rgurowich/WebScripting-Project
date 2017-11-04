var DoctorDash = new Phaser.Game(2048, 2048, Phaser.AUTO, '', {

      var selectedTrack = ("Images/Background-Track.png");
      var selectedCar = ("Images/Car.png");

      init: function() {
        this.scale.scalemanger = Phaser.scalemanger.SHOW_ALL;
        this.scale.maxWidth = 2048;
        this.scale.maxHeight = 2048;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.updateLayout();
      },
      preload: function() {
        this.game.load.image('track', selectedTrack);
        this.game.load.sprite('car', selectedCar);
      },
      render: function() {
        if (this.game.world.scale.x == 1) {
          this.game.debug.box2dWorld();
        }
      },
    }
