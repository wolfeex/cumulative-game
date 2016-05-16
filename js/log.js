
(function(game, $) {
  game.log = {
    IDVIEW: 'log',
    add: function(message) {
      var currentTick = game.engine.infos.tickCount;
      $('#log').find('div').prepend('<p>' + currentTick + ': ' + message + '</p>');
    }
  }
})(window.game = window.game || {}, jQuery);
