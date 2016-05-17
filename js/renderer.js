
(function(game, $){
  game.renderer = {
    _debug: false,
    _renderList: [],
    langFile: null,
    init: function(debug, complete) {
      this._debug = typeof debug !== 'undefined' ? debug : false;
      $('#wrapper').append($('<section id="main">').load('tpl/main.html', function(){
        complete();
        this.render();
        this.updateLanguage();
      }.bind(this)));
      $('#wrapper').append($('<footer>').load('tpl/footer.html'));
    },
    render: function() {
      for(var i=0; i<this._renderList.length; i++) {
        this.renderComponent(this._renderList[i]);
      }
    },
    renderComponent(component) {
      $('#'+ component.IDVIEW).find('[data-bind]').each(function(i, elem) {
        try {
          var data = eval($(elem).data('bind'));
          if(!Number.isNaN(data) && data != Number.POSITIVE_INFINITY && data != Number.NEGATIVE_INFINITY) {
            $(elem).text(data);
          }
        } catch(e) {}
      });
      if(typeof component.render == 'function') {
        component.render();
      }
    },
    debug: function() {

    },
    updateLanguage: function() {
      var lang = game.engine.getLanguage();

      $.ajax({
        type: 'GET',
        url: 'i18n/' + lang + '.js',
        dataType: 'json',
        async: false,
        cache: false,
        context: this,
        success: function(data) {
          this.langFile = data;

          $('[data-i18n]').each(function(i, elem) {
            $(elem).text(this.langFile[$(elem).data('i18n')]);
          }.bind(this));
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
    },
    disableAllButtons: function() {
      $('#main button').each(function(i, elem) {
        $(elem).prop('disabled', true);
      });
    }
  }
})(window.game = window.game || {}, jQuery);
