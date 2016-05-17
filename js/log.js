
(function(game, $) {
  game.log = {
    IDVIEW: 'log',
    add: function(message) {
      var currentTick = game.engine.infos.tickCount;
      $('#log').find('div').prepend('<p>' + currentTick + ': ' + message + '</p>');
      $('#log').find('div').animate({ scrollTop: 0 }, 'fast');
    }
  }
})(window.game = window.game || {}, jQuery);
