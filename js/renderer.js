
(function(game, $){
  game.renderer = {
    _debug: false,
    _renderList: [],
    langFile: null,
    init: function(debug, complete) {
      this._debug = typeof debug !== 'undefined' ? debug : false;

      if($('#wrapper #main').length) {
        $('#wrapper').empty();
      }

      $('#wrapper').append($('<section id="main">').load('tpl/main.html', function(){
        $('#wrapper').append($('<footer id="footer">').load('tpl/footer.html', function() {
          var request = this.updateLanguage();

          request.done(function(){
            complete();
            this.render();
          }.bind(this));

        }.bind(this)));
      }.bind(this)));
    },
    render: function() {
      for(var i=0; i<this._renderList.length; i++) {
        this.renderComponent(this._renderList[i]);
      }
    },
    renderComponent: function(component) {
      if(component.IDVIEW === null) {
        return;
      }
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

      return $.ajax({
        type: 'GET',
        url: 'i18n/' + lang + '.js',
        dataType: 'json',
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
      $('#main button').each(function(i, elem) {console.log('disable');
        $(elem).prop('disabled', true);
        $(elem).unbind('click');
      });
    }
  }
})(window.game = window.game || {}, jQuery);
