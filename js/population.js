
(function(game, $) {
  game.population = {
    IDVIEW: 'population',
    init: function() {
      this.count = 1;
      this.max = 10;
      this.hunger = 0;
      this.hungerMax = 10;
      this.hungerCheck = 5;
      this.lastFeed = 0;
    },
    tick: function() {
      var currentTick = game.engine.infos.tickCount;
      if((currentTick - this.lastFeed) % this.hungerCheck === 0) {
        this._hungry();
      }
      if(this.count <= 0) {
        console.log('game losed');
        game.engine.stop();
      }
    },
    feed: function() {
      game.stock.food -= this.count;
      this.hunger = 0;
      this.lastFeed = game.engine.infos.tickCount;
    },
    _hungry: function() {
      if(this.hunger < this.hungerMax) {
        this.hunger++;
      } else {
        this._die();
      }
    },
    _die: function() {
      if(this.count > 0) {
        this.count--;
      }
    }
  };
})(window.game = window.game || {}, jQuery);
