
(function(game, $) {
  game.events = {
    IDVIEW: null,
    tick: function() {
      if(Math.floor((Math.random() * 10) + 1) === 1) {
        if(game.population.count < game.population.max) {
          game.population.count++;
          game.log.add(game.renderer.langFile['log-message-arrival']);
        }
      }
    }
  };
})(window.game = window.game || {}, jQuery);
