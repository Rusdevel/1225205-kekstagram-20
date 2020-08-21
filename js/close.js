'use strict';
(function () {
  window.close = {
    isEscEvent: function (evt, action) {
      if (evt.key === 'Escape') {
        action();
      }
    }
  };

})();
