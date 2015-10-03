characters.zorp = (function() {
  var zorp,
      velocity = 50,
      gravity = 200,
      timeToChangeDirection = 0,
      foodness = 50,
      muchFood = 1000;

  return {
    preload: preload,
    add: add,
    update: update,
    render: render,
    exists: exists,
    get: get,
    splode: splode,
    changeDirection: changeDirection,
    jump: jump
  };

  function get() {
    return zorp;
  }

  function exists() {
    if (zorp) {
      return true;
    }

    return false;
  }
  function preload() {

    game.load.spritesheet('zorp', 'assets/zorp.png', 64, 64);
  }

  function add(x, y) {

    x = x || 50;
    y = y || 200;

    y = (y > 266) ? 266 : y;

    zorp = game.add.sprite( x, y, 'zorp');

    game.physics.arcade.enable(zorp);

    zorp.body.collideWorldBounds = true;
    zorp.enableBody = true;
    zorp.body.gravity.y = gravity;

    zorp.animations.add('walkleft', [0,1], 5, true);
    zorp.animations.add('walkright', [3,4], 5, true);

    zorp.frame = 2;

    var music = game.add.audio('bgmusic', 1, true);
    music.play();

    game.time.events.loop(Phaser.Timer.SECOND * 2, changeDirection, this);
    return zorp;
  }

  function update() {

    if (zorp) {
      game.physics.arcade.collide(zorp, map.getPlatforms());

      game.physics.arcade.overlap(zorp, characters.bombs.get(), splode);

      // change directions if we're against a wall
      if (zorp.body.onWall()) {
        if (zorp.body.blocked.right) {
          zorp.body.velocity.x = velocity * -1;
        } else {
          zorp.body.velocity.x = velocity;
        }
      }

      if (zorp.body.touching.down) {

        var impendingX = zorp.body.x + 32 + (60 * (zorp.body.facing == 1 ? -1 : 1)),
            impendingY = zorp.body.bottom - 10;

        // get outta the way!!!!
        var stuffsInWay = game.physics.arcade.getObjectsAtLocation(
          impendingX,
          impendingY,
          characters.bombs.get(),
          jump,
          this
        );
      }

      if (zorp.body.velocity.x < 0) {
        zorp.animations.play('walkleft');
      } else if (zorp.body.velocity.x > 0) {
        zorp.animations.play('walkright');
      } else {
        zorp.frame = 2;
      }
    }
  }

  function jump() {
    zorp.body.velocity.x = velocity * 1.5 * (zorp.body.velocity.x < 0 ? -1 : 1);
    zorp.body.velocity.y = gravity * -1;
  }

  function changeDirection() {
    if (!zorp.body.touching.down) {
      return;
    }
    var seed = game.rnd.integerInRange(0, 100);

    var newVelocity = (velocity + (velocity * seed / 100));

    // go left
    if (seed < 50) {
      newVelocity = newVelocity * -1;
    }

    zorp.body.velocity.x = newVelocity;
  }

  function splode(zorp, bombs) {

    console.log('blow up zorp');
    zorp.body.velocity.x = 0;
    return true;
  }

  function render() {
    if (zorp) {
      // game.debug.spriteInfo(zorp, 32, 32);
      // game.debug.bodyInfo(zorp, 32, 32);
    }
  }
}());
