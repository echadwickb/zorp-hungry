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

    map.preload();

  }

  function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    map.create();

    characters.eirinn.add();
    characters.grumperstorm.add();
    characters.saucer.add();
    characters.bombs.add();
  }

  function update() {

    var cursors = game.input.keyboard.createCursorKeys();

    characters.zorp.update();
    characters.eirinn.update(cursors);
    characters.grumperstorm.update();
    characters.saucer.update();
    characters.bombs.update();

  }

  function render() {
    characters.zorp.render();
  }

}());
