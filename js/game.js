
$(document).ready(function() {
  game.engine.setRenderer(game.renderer);

  game.engine.addComponent(game.stock);

  game.engine.init('en', true);
});
