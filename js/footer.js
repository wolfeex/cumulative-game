
(function(game, $) {
  game.footer = {
    IDVIEW: 'footer',
    init: function() {
      var langs = [
        {
          'code': 'en',
          'text': 'English'
        },
        {
          'code': 'fr',
          'text': 'Français'
        }
      ];
      $.each(langs, function(index, lang) {
        $('#selectLanguage').append($('<option>', {
  				value: lang.code,
  				text: lang.text
  			}));
      });

      $('#selectLanguage').val(game.engine.getLanguage());
    },
    changeLanguage: function() {
      game.engine.setLanguage($('#selectLanguage').val());
    }
  };
})(window.game = window.game || {}, jQuery);
