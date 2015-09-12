characters.bombs = (function() {
  var bombs;

  return {
    preload: preload,
    add: add,
    bombCount: bombCount,
    addBomb: addBomb,
    get: get,
    update: update
  };

  function get() {
    return bombs;
  }
  function bombCount() {
    return bombs.length;
  }

  function preload() {
    game.load.spritesheet('bomb', 'assets/bomb.png', 32, 32);

  }

  function add() {

    bombs = game.add.group();

    bombs.enableBody = true;
    bombs.physicsBodyType = Phaser.Physics.ARCADE;
  }

  function addBomb(x,y) {
    var bomb = bombs.create(x,y,'bomb');

    bomb.name = 'bomb' + bombCount;

    game.physics.arcade.enable(bomb);

    bomb.body.collideWorldBounds = true;
    bomb.body.gravity.y = 200;
    bomb.animations.add('dance', [1,1,2,3,3,2,1,1,2,0,0,2], 5, true);
    bomb.animations.add('splode', [4,5,4,4,6,5,4,5,4], 10, true);
    bomb.animations.play('dance');
  }

  function update() {

    if (bombs) {
      game.physics.arcade.collide(bombs, map.getPlatforms());

      game.physics.arcade.overlap(bombs, characters.zorp.get(), splode);
    }
  }

  function splode(zorp, bomb) {

    bomb.body.velocity.y = 0;
    bomb.body.velocity.x = 0;
    bomb.body.allowGravity = false;
    bomb.body = false;
    bomb.animations.stop();
    bomb.animations.play('splode', 10, false, true);

    return false;
  }
}());
