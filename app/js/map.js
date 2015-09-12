map = (function () {

  var platforms,
      ground;

  return {
    preload: preload,
    create: create,
    getPlatforms: getPlatforms
  };

  function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/ground.png');
    game.load.audio('bgmusic', [
      'assets/bg-music.ogg',
      'assets/bg-music.mp3'
    ]);
  }

  function create() {

    game.add.sprite(0, 0, 'sky');

    platforms = game.add.group();

    platforms.enableBody = true;

    ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(8,1);
    ground.body.immovable = true;
  }

  function getPlatforms() {
    return platforms;
  }
}());
