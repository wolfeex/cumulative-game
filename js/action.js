
(function(game, $){
  game.action = {
    IDVIEW: 'action',
    init: function() {
      this._disabled = false;
      $('#action-feed-btn').click(function() {
        game.population.feed();
        game.renderer.renderComponent(game.stock);
        game.renderer.renderComponent(game.population);
        this._updateButtons();
      }.bind(this));
    },
    render: function() {
      this._updateButtons();
    },
    _updateButtons: function() {
      if(!this._disabled && game.stock.food >= game.population.count) {
        $('#action-feed-btn').prop('disabled', false);
      } else {
        $('#action-feed-btn').prop('disabled', true);
      }
    },
    disableAll: function() {
      this._disabled = true;
    }
  };
})(window.game = window.game || {}, jQuery);
