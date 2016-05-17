
(function(game, $) {
  game.population = {
    IDVIEW: 'population',
    init: function() {
      this.count = 1;
      this.max = 10;
      this.hunger = 0;
      this.hungerMax = 5;
      this.hungerCheck = 2;
      this.lastFeed = 0;

      $('#action-feed-btn').click(function() {
        this._feed();
        game.renderer.renderComponent(game.stock);
        game.renderer.renderComponent(game.population);
        this._updateButtons();
      }.bind(this));
    },
    tick: function() {
      var currentTick = game.engine.infos.tickCount;
      if((currentTick - this.lastFeed) % this.hungerCheck === 0) {
        this._hungry();
      }
      if(this.count <= 0) {
        game.log.add(game.renderer.langFile['log-message-game-lose']);
        game.engine.stop();
      }
    },
    _feed: function() {
      game.stock.food -= this.count;
      this.hunger = 0;
      this.lastFeed = game.engine.infos.tickCount;
      game.log.add(game.renderer.langFile['log-message-feed']);
    },
    _hungry: function() {
      if(this.hunger < this.hungerMax) {
        this.hunger++;
      } else {
        this._die();
        if(this.count > 0) {
          game.log.add(game.renderer.langFile['log-message-feed-lose']);
        } else {
          game.log.add(game.renderer.langFile['log-message-population-lose']);
        }
      }
    },
    _die: function() {
      if(this.count > 0) {
        this.count--;
      }
    },
    render: function() {
      this._updateButtons();
    },
    _updateButtons: function() {
      if(!game.engine.infos.end && game.stock.food >= game.population.count) {
        $('#action-feed-btn').prop('disabled', false);
      } else {
        $('#action-feed-btn').prop('disabled', true);
      }
    }
  };
})(window.game = window.game || {}, jQuery);
