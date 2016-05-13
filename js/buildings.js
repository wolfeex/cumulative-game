
(function(game, $) {
  game.buildings = {
    IDVIEW: 'buildings',
    init: function() {
      this.house = {
        count: 0,
        production: {},
        stock: {},
        max: 20,
        cost: {
          wood: 10
        },
        population: 10
      };
      this.farm = {
        count: 1,
        production: {
          food: 5
        },
        stock: {},
        max: 10,
        cost: {
          wood: 10,
          iron: 10
        },
        population: 0
      };
      this.barn = {
        count: 0,
        production: {},
        stock: {
          wood: 100,
          food: 100
        },
        max: 5,
        cost: {
          wood: 10,
          iron: 10
        },
        population: 0
      };
      this.storehouse = {
        count: 0,
        production: {},
        stock: {
          iron: 100,
          copper: 100,
          gold: 100
        },
        max: 5,
        cost: {
          wood: 10,
          iron: 10
        },
        population: 0
      };
      this.ironMine = {
        count: 0,
        production: {
          iron: 1
        },
        stock: {},
        max: 3,
        cost: {
          wood: 50
        },
        population: 0
      };
      this.copperMine = {
        count: 2,
        production: {
          copper: 1
        },
        stock: {},
        max: 2,
        cost: {
          wood: 50,
          iron: 50
        },
        population: 0
      };
      this.goldMine = {
        count: 0,
        production: {
          gold: 1
        },
        stock: {},
        max: 1,
        cost: {
          wood: 50,
          iron: 50,
          copper: 50
        },
        population: 0
      };
      this.wonder = {
        count: 0,
        production: {},
        stock: {},
        max: 1,
        cost: {
          wood: 100,
          iron: 100,
          copper: 100,
          gold: 100,
          food: 100
        },
        population: 0
      };
    },
    _getProduction: function() {
      var resources = {
        wood: 0,
        iron: 0,
        copper: 0,
        gold: 0,
        food: 0
      };

      this._addProduction(resources, this.farm);
      this._addProduction(resources, this.ironMine);
      this._addProduction(resources, this.copperMine);
      this._addProduction(resources, this.goldMine);

      return resources;
    },
    _addProduction(obj, building) {
      if(building.count == 0) {
        return;
      }
      if(typeof building.production.wood != 'undefined' && building.production.wood > 0) {
        obj.wood += building.count * building.production.wood;
      }
      if(typeof building.production.iron != 'undefined' && building.production.iron > 0) {
        obj.iron += building.count * building.production.iron;
      }
      if(typeof building.production.copper != 'undefined' && building.production.copper > 0) {
        obj.copper += building.count * building.production.copper;
      }
      if(typeof building.production.gold != 'undefined' && building.production.gold > 0) {
        obj.gold += building.count * building.production.gold;
      }
      if(typeof building.production.food != 'undefined' && building.production.food > 0) {
        obj.food += building.count * building.production.food;
      }
    },
    tick: function() {
      game.stock.updateStock(this._getProduction());
    }
  };
})(window.game = window.game || {}, jQuery);
