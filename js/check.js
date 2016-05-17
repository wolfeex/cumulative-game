
// Check for victory / lose conditions
(function(game, $) {
  game.check = function() {
    // Lost last population => LOSE
    if(game.population.count <= 0) {
      game.log.add(game.renderer.langFile['log-message-game-lose']);
      return true;
    }

    // Wonder has been contructed => WIN
    if(game.buildings.wonder.count == 1) {
      game.log.add(game.renderer.langFile['log-message-game-win']);
      return true;
    }

    return false;
  };
})(window.game = window.game || {}, jQuery);
