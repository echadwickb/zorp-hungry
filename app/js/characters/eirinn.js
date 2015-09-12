characters.eirinn = (function () {

  var eirinn;

  return {
    preload: preload,
    add: add,
    update: update
  };

  function preload() {
    game.load.spritesheet('eirinn', 'assets/eirinn.png', 64, 64);

  }

  function update(cursors) {

    if (eirinn) {

      game.physics.arcade.collide(eirinn, map.getPlatforms());

      eirinn.body.velocity.x = 0;

      if (cursors.left.isDown) {
        eirinn.body.velocity.x = -150;
      }
      else if (cursors.right.isDown) {
        eirinn.body.velocity.x = 150;
      }

      if (cursors.up.isDown && eirinn.body.touching.down) {
        eirinn.body.velocity.y = -100;
      }

      if (eirinn.body.velocity.x < 0) {
        if (eirinn.body.touching.down) {
          eirinn.animations.play('walkleft');
        } else {
          eirinn.animations.play('flyleft');
        }
      } else if (eirinn.body.velocity.x > 0) {
        if (eirinn.body.touching.down) {
          eirinn.animations.play('walkright');
        } else {
          eirinn.animations.play('flyright');
        }
      } else {
        eirinn.animations.play('stand');
      }
    }

  }

  function _move() {

  }

  function add(x,y) {

    x = x || 50;
    y = y || 200;

    eirinn = game.add.sprite(50, 200, 'eirinn');

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
}());
