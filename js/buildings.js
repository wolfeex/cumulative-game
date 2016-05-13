
(function(game, $) {
  game.buildings = {
    IDVIEW: 'buildings',
    farm: {
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
      evolution: []
    },
    barn: {
      count: 0,
      production: {},
      stock: {
        wood: 10,
        iron: 10,
        copper: 10,
        gold: 10,
        food: 100
      },
      max: 5,
      cost: {
        wood: 10,
        iron: 10
      },
      evolution: []
    },
    ironMine: {
      count: 0,
      production: {
        iron: 1
      },
      stock: {},
      max: 3,
      cost: {
        wood: 50
      },
      evolution: []
    },
    copperMine: {
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
      evolution: []
    },
    goldMine: {
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
      evolution: []
    },
    wonder: {
      count: 0,
      production: {},
      stock: {},
      max: 1,
      cost: {
        gold: 100
      },
      evolution: []
    },
    _getProduction: function() {
      var production = {
        wood: 0,
        iron: 0,
        copper: 0,
        gold: 0,
        food: 0
      };

      this._addProduction(production, this.farm);
      this._addProduction(production, this.ironMine);
      this._addProduction(production, this.copperMine);
      this._addProduction(production, this.goldMine);

      return production;
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
      game.stock.add(this._getProduction());
    }
  };
})(window.game = window.game || {}, jQuery);
