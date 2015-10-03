characters.grumperstorm = (function() {

  var grumperstorms,
      bombTimes = 0,
      bombIntervalms = 3000,
      bombDropping = false;

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
    game.time.events.loop(3000, dropBombs, this);
    game.time.events.loop(5000, dropFruits, this);
  }

  function addStorm(x, y) {
    x = x || 50;
    y = y || 20;

    var grumperstorm = grumperstorms.create(x, y, 'grumperstorm');

    grumperstorm.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(grumperstorm);

    grumperstorm.body.collideWorldBounds = true;
    grumperstorm.body.gravity.y = 0;

    //grumperstorm.animations.add('floatleft', 0, false, true);
    //grumperstorm.animations.add('floatright', 1, false, true);
    grumperstorm.animations.add('thunder', [1,1,1,1,1,1,2,3,4,3,4,2,0], false, true);
    grumperstorm.frame = 0;

    return grumperstorm;
  }

  function update() {

    if (grumperstorms.length > 0) {

      grumperstorms.forEach(function (grumperstorm) {

        var newSpeed = game.rnd.integerInRange(15,20);

        if (grumperstorm.body.onWall()) {
          if (grumperstorm.body.blocked.right) {
            grumperstorm.body.velocity.x = newSpeed * -1;
          } else {
            grumperstorm.body.velocity.x = newSpeed;
          }
        }

        if (grumperstorm.body.velocity.x === 0) {
          grumperstorm.body.velocity.x = newSpeed;
        }
        if (grumperstorm.body.velocity.x < 0) {
          grumperstorm.scale.x = 1;
        } else {
          grumperstorm.scale.x = -1;
        }
      });
    }
  }

  function dropBombs() {
   if ( characters.zorp.exists()) {
      var grumperstorm = grumperstorms.getRandom();
      
      if (characters.bombs.getFirstDead() !== null ||
          characters.bombs.bombCount() < 20 ) { 
        grumperstorm.animations
                    .play('thunder', 6, false)
                    .onComplete
                    .addOnce(function () {
            
            characters.bombs.addBomb(
              game.rnd.integerInRange(
                grumperstorm.position.x - 30,
                grumperstorm.position.x + 30
              ),
              grumperstorm.position.y - 40
            );
        });
      }
    }
  }

  
  function dropFruits() {
   if ( characters.zorp.exists()) {
      var grumperstorm = grumperstorms.getRandom();
      
      if (characters.fruits.getFirstDead() !== null ||
          characters.fruits.fruitCount() < 20 ) { 
        grumperstorm.animations
                    .play('thunder', 6, false)
                    .onComplete
                    .addOnce(function () {
            
            characters.fruits.addFruit(
              game.rnd.integerInRange(
                grumperstorm.position.x - 30,
                grumperstorm.position.x + 30
              ),
              grumperstorm.position.y - 40
            );
        });
      }
    }
  }
}());
