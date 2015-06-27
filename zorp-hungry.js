(function() {
  'use strict';

  var game = new Phaser.Game(
    800,400, Phaser.AUTO, 'zorp-hungry',
    { preload: preload, create: create, update: update });

  var platforms,
      saucer,
      zorp;

  game.state.start('main');

  function preload() {
    game.load.spritesheet('saucer', 'assets/saucer.png', 32, 32);
    game.load.spritesheet('zorp', 'assets/zorp.png', 32, 32);
    game.load.spritesheet('descendingbeam', 'assets/descendingbeam.png', 32, 32);
    game.load.spritesheet('transferbeam', 'assets/transferbeam.png', 32, 32);
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/ground.png');
  }

  function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sky');

    platforms = game.add.group();

    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(8,1);
    ground.body.immovable = true;

    landZorp(game);
  }

  function update() {

    var cursors = game.input.keyboard.createCursorKeys()

    if (zorp) {

      game.physics.arcade.collide(zorp, platforms);

      zorp.body.velocity.x = 0;

      if (cursors.left.isDown) {
        zorp.body.velocity.x = -150;
        zorp.animations.play('walkleft');
      }
      else if (cursors.right.isDown) {
        zorp.body.velocity.x = 150;
        zorp.animations.play('walkright');
      }
      else {
        zorp.animations.stop();
        zorp.frame = 2;
      }

      if (cursors.up.isDown && zorp.body.touching.down) {
        zorp.body.velocity.y = -300;
      }
    }


  }

  function landZorp() {

    saucer = game.add.sprite(game.world.centerX, 0, 'saucer');
    saucer.scale.setTo(1.5, 1.5);

    game.physics.arcade.enable(saucer);

    saucer.body.collideWorldBounds = true;

    saucer.animations.add('fly', [0,1,2,3,4,5], 12, true);

    saucer.animations.play('fly');

    var saucerAppears = game.add.tween(saucer);

    saucerAppears.to({y:255}, 2000);
    saucerAppears.start();

    saucerAppears.onComplete.add(function () {

      var transferbeam = game.add.sprite(
        saucer.position.x, saucer.position.y + 32, 'transferbeam');
      transferbeam.scale.setTo(1.5,1.5);

      transferbeam.animations.add('transfer');
      transferbeam.animations.play('transfer', 12, false, true);

      transferbeam.events.onAnimationComplete.add(function() {
        zorp = game.add.sprite(
          transferbeam.position.x, transferbeam.position.y, 'zorp');
        zorp.scale.setTo(1.5,1.5);

        game.physics.arcade.enable(zorp);

        zorp.body.collideWorldBounds = true;
        zorp.body.gravity.y = 300;

        zorp.animations.add('walkleft', [0,1], 5, true);
        zorp.animations.add('walkright', [3,4], 5, true);

        var saucerDisappears = game.add.tween(saucer);
        saucerDisappears.to({y:0}, 2000);
        saucerDisappears.start();

        saucerDisappears.onComplete.add(function () {
          saucer.kill();
        })
      });

    });
  }

}());
