
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
  				'value': lang.code,
  				'text': lang.text
  			}));
      });

      $('#selectLanguage').val(game.engine.getLanguage());

      var speeds = [
        {
          'code': 1,
          'i18n': 'footer-speed-slow'
        },
        {
          'code': 0.6,
          'i18n': 'footer-speed-medium'
        },
        {
          'code': 0.2,
          'i18n': 'footer-speed-fast'
        },
      ];
      $.each(speeds, function(index, speed) {
        $('#selectSpeed').append($('<option>', {
  				'value': speed.code,
          'text': game.renderer.langFile[speed.i18n],
          'data-i18n': speed.i18n
  			}));
      });

      $('#selectSpeed').val(game.engine.TICKDURATION);
    },
    changeLanguage: function() {
      game.engine.setLanguage($('#selectLanguage').val());
    },
    changeSpeed: function() {
      game.engine.setSpeed($('#selectSpeed').val());
    }
  };
})(window.game = window.game || {}, jQuery);
