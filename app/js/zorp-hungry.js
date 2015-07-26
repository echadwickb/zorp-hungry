
// Let's get it started . . .
var game = (function() {
  'use strict';

  var game = new Phaser.Game(
    800,400, Phaser.AUTO, 'zorp-hungry',
    { preload: preload, create: create, update: update });

  var platforms,
      saucer,
      zorp,
      music,
      bombs,
      grumperstorms,
      eirinn,
      saucerSfx;

  game.state.start('main');

  return game;

  function preload() {
    game.load.spritesheet('saucer', 'assets/saucer.png', 32, 32);
    game.load.spritesheet('zorp', 'assets/zorp.png', 64, 64);
    game.load.spritesheet('transferbeam', 'assets/transferbeam.png', 32, 32);
    game.load.spritesheet('bomb', 'assets/bomb.png', 32, 32);
    game.load.spritesheet('eirinn', 'assets/eirinn.png', 64, 64);
    game.load.spritesheet('grumperstorm', 'assets/grumperstorm.png', 200, 120);

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/ground.png');
    game.load.audio('bgmusic', [
      'assets/bg-music.ogg',
      'assets/bg-music.mp3'
    ]);
    game.load.audio('saucerSfx', [
      'assets/Spurceshurp.mp3',
      'assets/Spurceshurp.ogg'
    ]);
  }

  function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sky');

    platforms = game.add.group();

    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(8,1);
    ground.body.immovable = true;

    bombs = game.add.group();

    bombs.enableBody = true;
    bombs.physicsBodyType = Phaser.Physics.ARCADE;

    grumperstorms = game.add.group();
    grumperstorms.enableBody = true;
    grumperstorms.physicsBodyType = Phaser.Physics.ARCADE;

    eirinn = characters.addEirinn();

    characters.addGrumperStorm(20, 50, grumperstorms);
    characters.addGrumperStorm(500, 20, grumperstorms);
    landZorp(game);
  }

  function update() {

    var cursors = game.input.keyboard.createCursorKeys();

    game.physics.arcade.collide(bombs, platforms);

    if (zorp) {
      game.physics.arcade.overlap(zorp, bombs, splodeZorp);
      game.physics.arcade.collide(zorp, platforms);
      characters.dropBombs(bombs, grumperstorms);
    }

    if (grumperstorms) {

      grumperstorms.forEach(function (grumperstorm) {

        var newSpeed = game.rnd.integerInRange(15,20);

        if (grumperstorm.body.position.x > 580) {

          grumperstorm.body.velocity.x = -1 * newSpeed;
          grumperstorm.frame = 0;

        } else if (grumperstorm.body.position.x < 20) {
          grumperstorm.body.velocity.x = newSpeed;
          grumperstorm.frame = 1;

        } else {

          if (grumperstorm.body.velocity.x === 0) {
            grumperstorm.body.velocity.x = newSpeed;
          }
        }
      });

    }

    if (eirinn) {

      game.physics.arcade.collide(eirinn, platforms);

      eirinn.body.velocity.x = 0;

      if (cursors.left.isDown) {
        eirinn.body.velocity.x = -150;
        if (!eirinn.body.touching.down) {
          eirinn.animations.play('flyleft');

        } else {
          eirinn.animations.play('walkleft');
        }
      }
      else if (cursors.right.isDown) {
        eirinn.body.velocity.x = 150;

        if (!eirinn.body.touching.down) {
          eirinn.animations.play('flyright');
        } else {
          eirinn.animations.play('walkright');
        }
      }

      if (cursors.up.isDown && eirinn.body.touching.down) {
        eirinn.body.velocity.y = -100;
      }
      /*
      if (eirinn.animations.currentAnim = 'flyleft') {

      }
      */

    }

    if (zorp && typeof music === 'undefined') {
      music = game.add.audio('bgmusic', 1, true);
      music.play();
    }

    if (saucer && typeof saucerSfx === 'undefined') {
      saucerSfx = game.add.audio('saucerSfx');
      saucerSfx.play();
    } else if (!saucer && saucerSfx) {
      saucerSfx.stop();
    }
  }

  function landZorp() {

    saucer = characters.addSaucer();

    var saucerAppears = game.add.tween(saucer);

    saucerAppears.to({y:255}, 2000);
    saucerAppears.start();

    saucerAppears.onComplete.add(function () {

      var transferbeam = characters.addTransferBeam(
        saucer.body.x, saucer.body.y + 32);

      transferbeam.events.onAnimationComplete.add(function() {
        zorp = characters.addZorp(transferbeam.position.x, transferbeam.position.y);

        var saucerDisappears = game.add.tween(saucer);
        saucerDisappears.to({y:0}, 2000);
        saucerDisappears.start();

        saucerDisappears.onComplete.add(function () {
          saucer.kill();
        });
      });
    });
  }

  function splodeZorp(zorp, bomb) {

    if (bomb && bomb.animations.name === 'dance') {
      bomb.body.allowGravity = false;
      bomb.animations.stop();
      bomb.animations.play('splode', 10, false, true);
    }
  }

}());
