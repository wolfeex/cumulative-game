
(function(game, jquery){
  game.stock = {
    IDVIEW: 'stock',
    wood: 0,
    iron: 0,
    copper: 0,
    gold: 0,
    food: 0,
    woodMax: 100,
    ironMax: 100,
    copperMax: 100,
    goldMax: 100,
    foodMax: 100,
    tick: function() {
      if(this.wood >= this.woodMax) {
        this.wood = this.woodMax;
      } else {
        this.wood++;
      }
    }
  };
})(window.game = window.game || {}, jQuery);
