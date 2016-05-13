
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
    add: function(resources) {
      if(typeof resources.wood != 'undefined' && resources.wood > 0) {
        this.wood = ((this.wood+resources.wood>this.woodMax)?this.woodMax:this.wood+resources.wood);
      }
      if(typeof resources.iron != 'undefined' && resources.iron > 0) {
        this.iron = ((this.iron+resources.iron>this.ironMax)?this.ironMax:this.iron+resources.iron);
      }
      if(typeof resources.copper != 'undefined' && resources.copper > 0) {
        this.copper = ((this.copper+resources.copper>this.copperMax)?this.copperMax:this.copper+resources.copper);
      }
      if(typeof resources.gold != 'undefined' && resources.gold > 0) {
        this.gold = ((this.gold+resources.gold>this.goldMax)?this.goldMax:this.gold+resources.gold);
      }
      if(typeof resources.food != 'undefined' && resources.food > 0) {
        this.food = ((this.food+resources.food>this.foodMax)?this.foodMax:this.food+resources.food);
      }
    }
  };
})(window.game = window.game || {}, jQuery);
