characters.grumperstorm = (function() {

  var grumperstorms,
      bombCount = 0,
      maxBombs = 10,
      lastDroppedBomb = 0,
      bombIntervalms = 5000;

  return {
    preload: preload,
    add: add,
    update: update
  };

  function preload() {
    game.load.spritesheet('grumperstorm', 'assets/grumperstorm.png', 200, 120);

  }

  function add() {
    grumperstorms = game.add.group();
    grumperstorms.enableBody = true;
    grumperstorms.physicsBodyType = Phaser.Physics.ARCADE;

    addStorm(20, 50);
    addStorm(500, 20);
  }

  function addStorm(x, y) {
    x = x || 50;
    y = y || 20;

    var grumperstorm = grumperstorms.create(x, y, 'grumperstorm');

    // grumperstorm.scale.setTo(2,2);
    game.physics.arcade.enable(grumperstorm);

    grumperstorm.body.collideWorldBounds = true;
    grumperstorm.body.gravity.y = 0;

    //grumperstorm.animations.add('floatleft', 0, false, true);
    //grumperstorm.animations.add('floatright', 1, false, true);

    grumperstorm.frame = 1;

    return grumperstorm;
  }

  function update() {

    if (grumperstorms.length > 0) {

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

      if (characters.zorp.exists()) {
        dropBombs();
      }

    }
  }

  function dropBombs() {

    var currentTime = Date.now();
    if (characters.bombs.bombCount() < maxBombs &&
        currentTime - lastDroppedBomb > bombIntervalms) {

      var grumperstorm = grumperstorms.getRandom();

      characters.bombs.addBomb(
        game.rnd.integerInRange(
          grumperstorm.position.x + 20,
          grumperstorm.position.x + 180
        ),
        grumperstorm.position.y + 90
      );

      lastDroppedBomb = Date.now();
    }
  }
}());
