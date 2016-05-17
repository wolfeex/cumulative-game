
(function(game, $) {
  game.population = {
    IDVIEW: 'population',
    HUNTDURATION: 20,
    init: function() {
      this.count = 1;
      this.max = 10;
      this.hunger = 0;
      this.hungerMax = 10;
      this.hungerCheck = 5;
      this.lastFeed = 0;
      this.timeHunt = 0;

      $('#action-feed-btn').click(function() {
        this._feed();
        game.renderer.renderComponent(game.stock);
        game.renderer.renderComponent(game.population);
        this._updateButtons();
      }.bind(this));

      $('#action-hunt-btn').click(function() {
        this._hunt();
        game.renderer.renderComponent(game.stock);
        this._updateButtons();
      }.bind(this));
    },
    tick: function() {
      var currentTick = game.engine.infos.tickCount;
      if((currentTick - this.lastFeed) % this.hungerCheck === 0) {
        this._hungry();
      }
    },
    _feed: function() {
      game.stock.food -= this.count;
      this.hunger = 0;
      this.lastFeed = game.engine.infos.tickCount;
      game.log.add(game.renderer.langFile['log-message-feed']);
    },
    _hunt: function() {
      var resources = {
        food: this.count * 2
      };
      game.stock.updateStock(resources);
      this.timeHunt = game.engine.infos.tickCount + 1 + this.HUNTDURATION;
      game.log.add(game.renderer.langFile['log-message-hunt']);
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
      if(game.stock.food >= game.population.count) {
        $('#action-feed-btn').prop('disabled', false);
      } else {
        $('#action-feed-btn').prop('disabled', true);
      }

      if(this.timeHunt <= game.engine.infos.tickCount) {
        $('#action-hunt-btn').prop('disabled', false);
      } else {
        $('#action-hunt-btn').prop('disabled', true);
      }
    }
  };
})(window.game = window.game || {}, jQuery);
