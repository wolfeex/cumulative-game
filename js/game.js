
$(document).ready(function() {
  game.engine.setRenderer(game.renderer);

  /* Register all game components */
  game.engine.addComponent(game.footer);
  game.engine.addComponent(game.buildings);
  game.engine.addComponent(game.stock);
  game.engine.addComponent(game.population);
  game.engine.addComponent(game.events);
  game.engine.addComponent(game.log);

  game.engine.init('en', true);
});
