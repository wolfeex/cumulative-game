
(function(game, $) {
  game.engine = {
    _debug: false,
    _lang: 'en',
    _loopInterval: null,
    _startDate: null,
    _tickList: [],
    _renderer: null,
    init: function(lang, debug) {
      this._debug = typeof debug !== 'undefined' ? debug : false;
      this._lang = typeof debug !== 'undefined' ? lang : 'en';
      this._startDate = Date.now();
      this._renderer.init(this._debug);
      this.start();
    },
    start: function() {
      if(!this._loopInterval) {
        this._loopInterval = setInterval(this._tick.bind(this), 1000);
      }
    },
    stop: function() {
      clearInterval(this._loopInterval);
      this._loopInterval = null;
    },
    /* Game loop function */
    _tick: function() {
      for(var i=0; i<this._tickList.length; i++) {
        this._tickList[i].tick();
      }
      this._render();
    },
    _render: function() {
      this._renderer.render();
      if(this._debug) {
        this._renderer.debug();
      }
    },
    /* Observer design pattern */
    subscribe: function(obj) {
      this._tickList.push(obj);
      if(typeof obj.render == 'function') {
        this._renderer.subscribe(obj);
      }
    },
    unsubscribe: function(obj) {
      for(var i = this._tickList.length-1; i>=0; i--){
        if (this._tickList[i] === obj) this._tickList.splice(i, 1);
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


$(document).ready(function() {
  game.engine.setRenderer(game.renderer);

  game.engine.subscribe(game.stock);

  game.engine.init('en', true);
});
