
// Check for victory / lose conditions
(function(game, $) {
  game.check = function() {
    // Lost last population => lose
    if(game.population.count <= 0) {
      game.log.add(game.renderer.langFile['log-message-game-lose']);
      return true;
    }
    
    return false;
  };
})(window.game = window.game || {}, jQuery);
