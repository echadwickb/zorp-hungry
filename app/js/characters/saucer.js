characters.saucer = (function() {
  var saucer;

  return {
    preload: preload,
    add: add,
    update: update
  };

  function preload() {

    game.load.spritesheet('saucer', 'assets/saucer.png', 32, 32);
    game.load.spritesheet('transferbeam', 'assets/transferbeam.png', 32, 32);

    game.load.audio('saucerSfx', [
      'assets/Spurceshurp.mp3',
      'assets/Spurceshurp.ogg'
    ]);
  }

  function add() {

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

      var transferbeam = addTransferBeam(
        saucer.body.x, saucer.body.y + 32);

      transferbeam.events.onAnimationComplete.add(function() {
        characters.zorp.add(transferbeam.position.x, transferbeam.position.y);

        var saucerDisappears = game.add.tween(saucer);
        saucerDisappears.to({y:0}, 2000);
        saucerDisappears.start();

        saucerDisappears.onComplete.add(function () {
          saucer.kill();
        });
      });
    });
  }

  function update() {

    if (saucer && typeof saucerSfx === 'undefined') {
      saucerSfx = game.add.audio('saucerSfx');
      saucerSfx.play();
    } else if (!saucer && saucerSfx) {
      saucerSfx.stop();
    }
  }

  function addTransferBeam(x, y) {
    x = x || 50;
    y = y || 200;

    var transferbeam = game.add.sprite(
      x, y, 'transferbeam');
    transferbeam.scale.setTo(1.5,1.5);

    transferbeam.animations.add('transfer');
    transferbeam.animations.play('transfer', 12, false, true);

    return transferbeam;
  }
}());
