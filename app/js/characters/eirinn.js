characters.eirinn = (function () {

  var eirinn,
      sparkles;

  return {
    preload: preload,
    add: add,
    update: update
  };

  function preload() {
    game.load.spritesheet('eirinn', 'assets/eirinn.png', 64, 64);
    game.load.spritesheet('sparkles', 'assets/sparkles.png', 21, 21);

  }

  function update(controls) {

    if (eirinn) {

      game.physics.arcade.collide(eirinn, map.getPlatforms());
      game.physics.arcade.overlap(sparkles,
                                  map.getPlatforms(),
                                  function (sparkle) {
                                    sparkle.kill();
                                  });
      game.physics.arcade.overlap(sparkles,
                                  characters.bombs.get(),
                                  function (sparkle, bomb) {
                                    sparkle.kill();
                                    characters.bombs.splode(null, bomb);
                                  });
      eirinn.body.velocity.x = 0;

      if (controls.left.isDown) {
        eirinn.body.velocity.x = -150;
      }
      else if (controls.right.isDown) {
        eirinn.body.velocity.x = 150;
      }

      if (controls.up.isDown && eirinn.body.touching.down) {
        eirinn.body.velocity.y = -100;
      }

      if (controls.space.isDown) {
        shoot();
      }

      if (eirinn.body.velocity.x < 0) {
        if (eirinn.body.touching.down) {
          eirinn.animations.play('walkleft');
        } else {
          eirinn.animations.play('flyleft');
        }
      } else if (eirinn.body.velocity.x > 0) {
        if (eirinn.body.touching.down) {
          eirinn.animations.play('walkright');
        } else {
          eirinn.animations.play('flyright');
        }
      } else {
        eirinn.animations.play('stand');
      }

    }

  }

  function add(x,y) {

    x = x || 50;
    y = y || 200;

    eirinn = game.add.sprite(50, 200, 'eirinn');

    //eirinn.scale.setTo(1.5, 1.5);

    game.physics.arcade.enable(eirinn);

    eirinn.body.collideWorldBounds = true;
    eirinn.body.gravity.y = 100;

    eirinn.animations.add('stand', [0,1], 3, true);
    eirinn.animations.add('walkleft', [4,3], 5, true);
    eirinn.animations.add('walkright', [7,6], 5, true);
    eirinn.animations.add('flyleft', [2], 1, true);
    eirinn.animations.add('flyright', [5], 1, true);

    sparkles = game.add.group();

    sparkles.enableBody = true;
    sparkles.physicsBodyType = Phaser.Physics.ARCADE;

    return eirinn;
  }

  function shoot() {

    var sparkle,
        wandX = eirinn.body.x,
        wandY = eirinn.body.y + 18,
        speed = game.rnd.integerInRange(0,30);

    if (eirinn.body.velocity.x === 0) {
      direction = -1;
      wandX += 10;
    } else if (eirinn.body.facing === 2){
      wandX += 55;
    } else {
      wandX -= 10;
    }

    // reuse sparkles if we have 10 already
    if (sparkles.length > 10) {
      sparkle = sparkles.getFirstDead();

      if (sparkle === null) {
        return;
      }
      sparkle.reset(wandX, wandY);
    } else {
      sparkle = sparkles.create(wandX, wandY, 'sparkles');
      sparkle.animations.add('shoot', [0,1,2,3], 3, true);

      game.physics.arcade.enable(sparkle);

      sparkle.body.collideWorldBounds = true;

    }

    sparkle.body.gravity.y = 100;
    sparkle.body.velocity.y = -5;
    sparkle.body.velocity.x = eirinn.body.velocity.x +
                              speed +
                              (eirinn.body.velocity.x * 0.3);

    sparkle.animations.play('shoot');
  }
}());
