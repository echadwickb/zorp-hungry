zorpHungry = (function() {
  'use strict';

  game = new Phaser.Game( 800, 400,
                          Phaser.AUTO,
                          'zorp-hungry-container',
                          { preload: preload,
                            create: create,
                            update: update,
                            render: render });

  game.state.start('main');

  return game;

  function preload() {

    characters.eirinn.preload();
    characters.grumperstorm.preload();
    characters.saucer.preload();
    characters.bombs.preload();
    characters.zorp.preload();
    characters.fruits.preload();

    map.preload();

  }

  function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    map.create();

    characters.eirinn.add();
    characters.grumperstorm.add();
    characters.saucer.add();
    characters.bombs.add();
    characters.fruits.add();

  }

  function update() {

    var controls = game.input.keyboard.addKeys({
      'space': Phaser.Keyboard.SPACEBAR,
      'left': Phaser.Keyboard.LEFT,
      'right': Phaser.Keyboard.RIGHT,
      'up': Phaser.Keyboard.UP
    });

    characters.zorp.update();
    characters.eirinn.update(controls);
    characters.grumperstorm.update();
    characters.saucer.update();
    characters.bombs.update();
    characters.fruits.update();
  }

  function render() {
    characters.zorp.render();
  }

}());
