
(function(game, $) {
  game.engine = {
    _debug: false,
    _lang: 'en',
    _loopInterval: null,
    _startDate: null,
    _componentList: [],
    _renderer: null,
    infos: {
      tickCount: 0
    },
    init: function(lang, debug) {
      this._debug = typeof debug !== 'undefined' ? debug : false;
      this._lang = typeof debug !== 'undefined' ? lang : 'en';
      this._startDate = Date.now();
      this._renderer.init(this._debug);
      for(var i=0; i<this._componentList.length; i++) {
        if(typeof this._componentList[i].init == 'function') {
          this._componentList[i].init();
        }
      }
      if(this._loopInterval) {
        this.stop();
      }
      this._loopInterval = setInterval(this._tick.bind(this), 1000);
    },
    stop: function() {
      clearInterval(this._loopInterval);
      this._loopInterval = null;
    },
    /* Game loop function */
    _tick: function() {
      this.infos.tickCount++;
      for(var i=0; i<this._componentList.length; i++) {
        if(typeof this._componentList[i].tick == 'function') {
          this._componentList[i].tick();
        }
      }
      this._render();
    },
    _render: function() {
      this._renderer.render();
      if(this._debug) {
        this._renderer.debug();
      }
    },
    addComponent: function(obj) {
      this._componentList.push(obj);
      if(typeof obj.IDVIEW != 'undefined') {
        this._renderer.addRenderer(obj);
      }
    },
    removeComponent: function(obj) {
      for(var i = this._componentList.length-1; i>=0; i--){
        if (this._componentList[i] === obj) this._componentList.splice(i, 1);
      }
    },
    setRenderer: function(obj) {
      this._renderer = obj;
    },
    getLang: function() {
      return this._lang;
    }
  };
})(window.game = window.game || {}, jQuery);
