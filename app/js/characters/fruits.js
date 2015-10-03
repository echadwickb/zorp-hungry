characters.fruits = (function () {

  var fruits;

  return {
    preload: preload,
    add: add,
    update: update,
    getFirstDead: getFirstDead,
    fruitCount: fruitCount,
    addFruit: addFruit
  };

  function getFirstDead() {
    return fruits.getFirstDead();
  }

  function fruitCount() {
    return fruits.length;
  }

  function preload() {
    game.load.spritesheet('buhnahna','assets/buhnahna.png', 32, 32);
  }

  function add() {
    fruits = game.add.group();

    fruits.enableBody = true;
    fruits.physicsBodyType = Phaser.Physics.ARCADE;
  }

  function addFruit(x,y) {
    var fruit;
    if (fruits.length > 5) {
      fruit = fruits.getFirstDead();
      if (fruit === null) {
              return;
      }
      fruit.reset(x,y);
    }
    else {
      fruit = fruits.create(x,y,'buhnahna');
      fruit.animations.add('dance', [0,0,1,2,1,2], 5, true);
    }

    game.physics.arcade.enable(fruit);

    fruit.body.collideWorldBounds = true;
    fruit.body.gravity.y = 200;

    fruit.animations.play('dance');
  }

  function update() {
    if (fruits) {
      game.physics.arcade.collide(fruits, map.getPlatforms());

    }
  }
})();
