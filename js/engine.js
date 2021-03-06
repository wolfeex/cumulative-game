
(function(game, $) {
  game.engine = {
    _debug: false,
    _lang: 'en',
    _loopInterval: null,
    _startDate: null,
    _componentList: [],
    _renderer: null,
    infos: {
      tickCount: null
    },
    TICKDURATION: 1,
    init: function(lang, debug) {
      this.infos.tickCount = 0;
      this._debug = typeof debug !== 'undefined' ? debug : false;
      this._lang = typeof lang !== 'undefined' ? lang : 'en';
      this._startDate = Date.now();
      this._renderer.init(this._debug, function(){
        if(this._loopInterval) {
          this._stop();
        }
        for(var i=0; i<this._componentList.length; i++) {
          if(typeof this._componentList[i].init == 'function') {
            this._componentList[i].init();
          }
        }
        this._loopInterval = setInterval(this._tick.bind(this), this.TICKDURATION * 1000);
      }.bind(this));
    },
    setSpeed: function(interval) {
      if(this._loopInterval) {
        clearInterval(this._loopInterval);
        this.TICKDURATION = interval;
        this._loopInterval = setInterval(this._tick.bind(this), this.TICKDURATION * 1000);
      };
    },
    _stop: function() {
      clearInterval(this._loopInterval);
      this._loopInterval = null;
      this._renderer.disableAllButtons();
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
      if(game.check()) {
        this._stop();
      }
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
    setLanguage: function(lang) {
      if(lang != this._lang) {
        this._lang = lang;
        this._renderer.updateLanguage();
      }
    },
    getLanguage: function() {
      return this._lang;
    }
  };
})(window.game = window.game || {}, jQuery);
