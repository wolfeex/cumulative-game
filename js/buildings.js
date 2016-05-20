
(function(game, $) {
  game.buildings = {
    IDVIEW: 'buildings',
    init: function() {
      this.house = {
        count: 0,
        production: {},
        stock: {},
        max: 6,
        cost: {
          wood: 10
        },
        population: 10
      };
      this.farm = {
        count: 0,
        production: {
          food: 1
        },
        stock: {},
        max: 2,
        cost: {
          wood: 50
        },
        population: 0
      };
      this.sawmill = {
        count: 0,
        production: {
          wood: 1
        },
        stock: {},
        max: 1,
        cost: {
          wood: 50
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
        max: 1,
        cost: {
          wood: 50,
          iron: 20
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
        max: 1,
        cost: {
          wood: 50,
          iron: 20
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
        count: 0,
        production: {
          copper: 1
        },
        stock: {},
        max: 2,
        cost: {
          wood: 100,
          iron: 100
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
          wood: 200,
          iron: 200,
          copper: 200
        },
        population: 0
      };
      this.wonder = {
        count: 0,
        production: {},
        stock: {},
        max: 1,
        cost: {
          wood: 200,
          iron: 200,
          copper: 200,
          gold: 200
        },
        population: 0
      };

      $('#buildings-house-btn').click(function() {
        this._construct(this.house, game.renderer.langFile['log-message-house']);
        this._updateButtons();
      }.bind(this));

      $('#buildings-farm-btn').click(function() {
        this._construct(this.farm, game.renderer.langFile['log-message-farm']);
        this._updateButtons();
      }.bind(this));

      $('#buildings-sawmill-btn').click(function() {
        this._construct(this.sawmill, game.renderer.langFile['log-message-sawmill']);
        this._updateButtons();
      }.bind(this));

      $('#buildings-barn-btn').click(function() {
        this._construct(this.barn, game.renderer.langFile['log-message-barn']);
        this._updateButtons();
      }.bind(this));

      $('#buildings-storehouse-btn').click(function() {
        this._construct(this.storehouse, game.renderer.langFile['log-message-storehouse']);
        this._updateButtons();
      }.bind(this));

      $('#buildings-ironmine-btn').click(function() {
        this._construct(this.ironMine, game.renderer.langFile['log-message-ironmine']);
        this._updateButtons();
      }.bind(this));

      $('#buildings-coppermine-btn').click(function() {
        this._construct(this.copperMine, game.renderer.langFile['log-message-coppermine']);
        this._updateButtons();
      }.bind(this));

      $('#buildings-goldmine-btn').click(function() {
        this._construct(this.goldMine, game.renderer.langFile['log-message-goldmine']);
        this._updateButtons();
      }.bind(this));

      $('#buildings-wonder-btn').click(function() {
        this._construct(this.wonder, game.renderer.langFile['log-message-wonder']);
        this._updateButtons();
      }.bind(this));
    },
    _construct: function(building, message) {
      building.count++;

      var resources = {
        wood: 0,
        iron: 0,
        copper: 0,
        gold: 0,
        food: 0
      };

      var stock = {
        wood: 0,
        iron: 0,
        copper: 0,
        gold: 0,
        food: 0
      };

      this._addResources(resources, building.cost, true);
      this._addResources(stock, building.stock);
      game.stock.updateStock(resources);
      game.stock.updateMaxStock(stock);
      game.renderer.renderComponent(game.buildings);
      game.renderer.renderComponent(game.stock);

      if(building.population > 0) {
        game.population.addMaxPopulation(building.population);
        game.renderer.renderComponent(game.population);
      }

      game.log.add(message);
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
      this._addProduction(resources, this.sawmill);
      this._addProduction(resources, this.ironMine);
      this._addProduction(resources, this.copperMine);
      this._addProduction(resources, this.goldMine);

      return resources;
    },
    _addResources: function(obj, resources, reverse) {
      if(typeof resources.wood == 'undefined') {
        reverse = false;
      }
      if(typeof resources.wood != 'undefined' && resources.wood > 0) {
        obj.wood += resources.wood * (reverse?-1:1);
      }
      if(typeof resources.iron != 'undefined' && resources.iron > 0) {
        obj.iron += resources.iron * (reverse?-1:1);
      }
      if(typeof resources.copper != 'undefined' && resources.copper > 0) {
        obj.copper += resources.copper * (reverse?-1:1);
      }
      if(typeof resources.gold != 'undefined' && resources.gold > 0) {
        obj.gold += resources.gold * (reverse?-1:1);
      }
      if(typeof resources.food != 'undefined' && resources.food > 0) {
        obj.food += resources.food * (reverse?-1:1);
      }
    },
    _addProduction: function(obj, building) {
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
    },
    render: function() {
      this._updateButtons();
    },
    _updateButtons: function() {
      if(this.house.count < this.house.max && game.stock.checkResources(this.house.cost)) {
        $('#buildings-house-btn').prop('disabled', false);
      } else {
        $('#buildings-house-btn').prop('disabled', true);
      }

      if(this.farm.count < this.farm.max && game.stock.checkResources(this.farm.cost)) {
        $('#buildings-farm-btn').prop('disabled', false);
      } else {
        $('#buildings-farm-btn').prop('disabled', true);
      }

      if(this.sawmill.count < this.sawmill.max && game.stock.checkResources(this.sawmill.cost)) {
        $('#buildings-sawmill-btn').prop('disabled', false);
      } else {
        $('#buildings-sawmill-btn').prop('disabled', true);
      }

      if(this.barn.count < this.barn.max && game.stock.checkResources(this.barn.cost)) {
        $('#buildings-barn-btn').prop('disabled', false);
      } else {
        $('#buildings-barn-btn').prop('disabled', true);
      }

      if(this.storehouse.count < this.storehouse.max && game.stock.checkResources(this.storehouse.cost)) {
        $('#buildings-storehouse-btn').prop('disabled', false);
      } else {
        $('#buildings-storehouse-btn').prop('disabled', true);
      }

      if(this.ironMine.count < this.ironMine.max && game.stock.checkResources(this.ironMine.cost)) {
        $('#buildings-ironmine-btn').prop('disabled', false);
      } else {
        $('#buildings-ironmine-btn').prop('disabled', true);
      }

      if(this.copperMine.count < this.copperMine.max && game.stock.checkResources(this.copperMine.cost)) {
        $('#buildings-coppermine-btn').prop('disabled', false);
      } else {
        $('#buildings-coppermine-btn').prop('disabled', true);
      }

      if(this.goldMine.count < this.goldMine.max && game.stock.checkResources(this.goldMine.cost)) {
        $('#buildings-goldmine-btn').prop('disabled', false);
      } else {
        $('#buildings-goldmine-btn').prop('disabled', true);
      }

      if(this.wonder.count < this.wonder.max
        && game.stock.checkResources(this.wonder.cost)
        && this.house.count === this.house.max
        && this.farm.count === this.farm.max
        && this.sawmill.count === this.sawmill.max
        && this.barn.count === this.barn.max
        && this.storehouse.count === this.storehouse.max
        && this.ironMine.count === this.ironMine.max
        && this.copperMine.count === this.copperMine.max
        && this.goldMine.count === this.goldMine.max) {
        $('#buildings-wonder-btn').prop('disabled', false);
      } else {
        $('#buildings-wonder-btn').prop('disabled', true);
      }
    }
  };
})(window.game = window.game || {}, jQuery);
