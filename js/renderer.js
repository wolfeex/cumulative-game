
(function(game, $){
  game.renderer = {
    _debug: false,
    _renderList: [],
    init: function(debug) {
      this._debug = typeof debug !== 'undefined' ? debug : false;
      if(this._debug) {
        $('#wrapper').append($('<section id="debug">').load('tpl/debug.html'));
      }
      $('#wrapper').append($('<section id="main">').load('tpl/main.html', function(){
        this.render();
        this.updateLanguage();
      }.bind(this)));
    },
    render: function() {
      if(this._debug) {
        $('#debug').find('[data-bind]').each(function(i, elem) {
          try {
            var data = eval($(elem).data('bind'));
            if(!Number.isNaN(data) && data != Number.POSITIVE_INFINITY && data != Number.NEGATIVE_INFINITY) {
              $(elem).text(data);
            }
          } catch(e) {}
        });
      }

      for(var i=0; i<this._renderList.length; i++) {
        $('#'+ this._renderList[i].IDVIEW).find('[data-bind]').each(function(i, elem) {
          try {
            var data = eval($(elem).data('bind'));
            if(!Number.isNaN(data) && data != Number.POSITIVE_INFINITY && data != Number.NEGATIVE_INFINITY) {
              $(elem).text(data);
            }
          } catch(e) {}
        });
      }
    },
    debug: function() {

    },
    updateLanguage: function() {
      var lang = game.engine.getLang();

      $.ajax({
        type: 'GET',
        url: 'i18n/' + lang + '.js',
        dataType: 'json',
        async: false,
        success: function(data) {
          langFile = data;

          $('[data-i18n]').each(function(i, elem) {
            $(elem).text(langFile[$(elem).data('i18n')]);
          });
        }
      });
    },
    addRenderer: function(obj) {
      this._renderList.push(obj);
    },
    removeRenderer: function(obj) {
      for(var i = this._renderList.length-1; i>=0; i--){
        if (this._renderList[i] === obj) this._renderList.splice(i, 1);
      }
    }
  }
})(window.game = window.game || {}, jQuery);
