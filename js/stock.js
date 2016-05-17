
(function(game, jquery){
  game.stock = {
    IDVIEW: 'stock',
    init: function() {
      this.wood = 0;
      this.iron = 0;
      this.copper = 0;
      this.gold = 0;
      this.food = 0;
      this.woodMax = 100;
      this.ironMax = 100;
      this.copperMax = 100;
      this.goldMax = 100;
      this.foodMax = 100;
    },
    updateStock: function(resources) {
      if(typeof resources.wood != 'undefined' && resources.wood != 0) {
        this.wood = ((this.wood+resources.wood>this.woodMax)?this.woodMax:this.wood+resources.wood);
      }
      if(typeof resources.iron != 'undefined' && resources.iron != 0) {
        this.iron = ((this.iron+resources.iron>this.ironMax)?this.ironMax:this.iron+resources.iron);
      }
      if(typeof resources.copper != 'undefined' && resources.copper != 0) {
        this.copper = ((this.copper+resources.copper>this.copperMax)?this.copperMax:this.copper+resources.copper);
      }
      if(typeof resources.gold != 'undefined' && resources.gold != 0) {
        this.gold = ((this.gold+resources.gold>this.goldMax)?this.goldMax:this.gold+resources.gold);
      }
      if(typeof resources.food != 'undefined' && resources.food != 0) {
        this.food = ((this.food+resources.food>this.foodMax)?this.foodMax:this.food+resources.food);
      }
    },
    updateMaxStock: function(stock) {
      if(typeof stock.wood != 'undefined' && stock.wood > 0) {
        this.woodMax += stock.wood;
      }
      if(typeof stock.iron != 'undefined' && stock.iron > 0) {
        this.ironMax += stock.iron;
      }
      if(typeof stock.copper != 'undefined' && stock.copper > 0) {
        this.copperMax += stock.copper;
      }
      if(typeof stock.gold != 'undefined' && stock.gold > 0) {
        this.goldMax += stock.gold;
      }
      if(typeof stock.food != 'undefined' && stock.food > 0) {
        this.foodMax += stock.food;
      }
    },
    checkResources: function(resources) {
      var result = true;

      if(typeof resources.wood != 'undefined' && resources.wood > this.wood) {
        result = false;
      }
      if(typeof resources.iron != 'undefined' && resources.iron > this.iron) {
        result = false;
      }
      if(typeof resources.copper != 'undefined' && resources.copper > this.copper) {
        result = false;
      }
      if(typeof resources.gold != 'undefined' && resources.gold > this.gold) {
        result = false;
      }
      if(typeof resources.food != 'undefined' && resources.food > this.food) {
        result = false;
      }

      return result;
    }
  };
})(window.game = window.game || {}, jQuery);
