
(function(game, $){
  game.action = {
    IDVIEW: 'action',
    init: function() {
      $('#action-feed-btn').click(function() {
        game.population.feed();
        game.renderer.renderComponent(game.stock);
        game.renderer.renderComponent(game.population);
        this._updateButtons();
      }.bind(this));
    },
    tick: function() {
      this._updateButtons();
    },
    _updateButtons: function() {
      if(game.stock.food >= game.population.count) {
        $('#action-feed-btn').prop('disabled', false);
      } else {
        $('#action-feed-btn').prop('disabled', true);
      }
    }
  };
})(window.game = window.game || {}, jQuery);
