
(function(game, $) {
  game.population = {
    IDVIEW: 'population',
    HUNTDURATION: 20,
    CHOPWOODDURATION: 20,
    init: function() {
      this.count = 1;
      this.max = 10;
      this.hunger = 0;
      this.hungerMax = 10;
      this.hungerCheck = 5;
      this.lastFeed = 0;
      this.endHunt = 0;
      this.endChopWood = 0;

      $('#population-feed-btn').click(function() {
        this._feed();
        game.renderer.renderComponent(game.stock);
        game.renderer.renderComponent(game.population);
        this._updateButtons();
      }.bind(this));

      $('#population-hunt-btn').click(function() {
        this._hunt();
        game.renderer.renderComponent(game.stock);
        this._updateButtons();
      }.bind(this));

      $('#population-chopwood-btn').click(function() {
        this._chopWood();
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
    addMaxPopulation: function(value) {
      this.max += value;
    },
    _feed: function() {
      if(game.stock.food >= this.count) {
        game.stock.food -= this.count;
        this.hunger = 0;
        this.lastFeed = game.engine.infos.tickCount;
        game.log.add(game.renderer.langFile['log-message-feed']);
      }
    },
    _hunt: function() {
      var resources = {
        food: this.count * 2
      };
      game.stock.updateStock(resources);
      this.endHunt = game.engine.infos.tickCount + this.HUNTDURATION;
      this.endChopWood = game.engine.infos.tickCount + this.HUNTDURATION;
      game.log.add(game.renderer.langFile['log-message-hunt']);
    },
    _chopWood: function() {
      var resources = {
        wood: this.count * 2
      };
      game.stock.updateStock(resources);
      this.endChopWood = game.engine.infos.tickCount + this.CHOPWOODDURATION;
      this.endHunt = game.engine.infos.tickCount + this.CHOPWOODDURATION;
      game.log.add(game.renderer.langFile['log-message-chopwood']);
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
      if(game.stock.food >= this.count) {
        $('#population-feed-btn').prop('disabled', false);
      } else {
        $('#population-feed-btn').prop('disabled', true);
      }

      if(this.endHunt <= game.engine.infos.tickCount) {
        $('#population-hunt-btn').find('span').remove();
        $('#population-hunt-btn').prop('disabled', false);
      } else {
        if($('#population-hunt-btn').find('span').length == 0) {
          $('#population-hunt-btn').append('<span></span>');
        }
        $('#population-hunt-btn').find('span').text(' (' + (this.endHunt - game.engine.infos.tickCount) + ')');
        $('#population-hunt-btn').prop('disabled', true);
      }

      if(this.endChopWood <= game.engine.infos.tickCount) {
        $('#population-chopwood-btn').find('span').remove();
        $('#population-chopwood-btn').prop('disabled', false);
      } else {
        if(this.endChopWood - game.engine.infos.tickCount > 0) {
          if($('#population-chopwood-btn').find('span').length == 0) {
            $('#population-chopwood-btn').append('<span></span>');
          }
          $('#population-chopwood-btn').find('span').text(' (' + (this.endChopWood - game.engine.infos.tickCount) + ')');
        }
        $('#population-chopwood-btn').prop('disabled', true);
      }
    }
  };
})(window.game = window.game || {}, jQuery);
