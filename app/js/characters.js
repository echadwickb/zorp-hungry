var characters = (function() {
  'use strict';

  var bombCount = 0,
      maxBombs = 10,
      lastDroppedBomb = 0,
      bombIntervalms = 1200;

  return {
    addZorp: addZorp,
    addEirinn: addEirinn,
    dropBombs: dropBombs,
    addSaucer: addSaucer,
    addTransferBeam: addTransferBeam,
    addGrumperStorm: addGrumperStorm
  };

  function addZorp(x, y) {

    x = x || 50;
    y = y || 200;

    y = (y > 266) ? 266 : y;

    var zorp = game.add.sprite( x, y, 'zorp');

    console.log('zorp coords: '+ x + ':' + y);
    //zorp.scale.setTo(1.5,1.5);

    game.physics.arcade.enable(zorp);

    zorp.body.collideWorldBounds = true;
    zorp.body.gravity.y = 300;

    zorp.animations.add('walkleft', [0,1], 5, true);
    zorp.animations.add('walkright', [3,4], 5, true);

    zorp.frame = 2;

    return zorp;
  }

  function addEirinn(x, y) {

    x = x || 50;
    y = y || 200;
    var eirinn = game.add.sprite(
      50, 200, 'eirinn');

    //eirinn.scale.setTo(1.5, 1.5);

    game.physics.arcade.enable(eirinn);

    eirinn.body.collideWorldBounds = true;
    eirinn.body.gravity.y = 100;

    eirinn.animations.add('stand', [0,1], 3, true);
    eirinn.animations.add('walkleft', [4,3], 5, true);
    eirinn.animations.add('walkright', [7,6], 5, true);
    eirinn.animations.add('flyleft', [2], 1, true);
    eirinn.animations.add('flyright', [5], 1, true);

    return eirinn;
  }

  function dropBombs(bombs, grumperstorms) {

    var currentTime = Date.now();
    if (bombs.length < maxBombs &&
        currentTime - lastDroppedBomb > bombIntervalms) {

      var grumperstorm = grumperstorms.getRandom();

      var bomb = bombs.create(
        game.rnd.integerInRange(
          grumperstorm.position.x + 20,
          grumperstorm.position.x + 180
        ),
        grumperstorm.position.y + 90,
        'bomb'
      );

      //bomb.scale.setTo(.75,.75);

      bomb.name = 'bomb' + bombCount;

      game.physics.arcade.enable(bomb);
      bomb.body.collideWorldBounds = true;
      bomb.body.gravity.y = 200;
      bomb.animations.add('dance', [1,1,2,3,3,2,1,1,2,0,0,2], 5, true);
      bomb.animations.add('splode', [4,5,4,4,6,5,4,5,4], 10, true);
      bomb.animations.play('dance');

      lastDroppedBomb = Date.now();
    }
  }

  function addSaucer() {
    var saucer = game.add.sprite(game.world.centerX, 0, 'saucer');
    saucer.scale.setTo(1.5, 1.5);

    game.physics.arcade.enable(saucer);

    saucer.body.collideWorldBounds = true;

    saucer.animations.add('fly', [0,1,2,3,4,5], 12, true);

    saucer.animations.play('fly');

    return saucer;
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

  function addGrumperStorm(x, y, grumperstorms) {

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

}());
