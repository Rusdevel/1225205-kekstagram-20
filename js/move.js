'use strict';
(function () {
  var slider = document.querySelector('.img-upload__effect-level');

  var sliderPin = slider.querySelector('.effect-level__pin');

  var effectDepth = slider.querySelector('.effect-level__depth');

  sliderPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,

    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };
      sliderPin.style.left = (sliderPin.offsetLeft - shift.x) + 'px';
      if (sliderPin.offsetLeft - shift.x > 450) {
        sliderPin.style.left = 450 + 'px';
      } else if (sliderPin.offsetLeft - shift.x < 0) {
        sliderPin.style.left = 0 + 'px';
      }


      effectDepth.style.width = (sliderPin.offsetLeft - shift.x) + 'px';
      if (sliderPin.offsetLeft - shift.x > 450) {
        effectDepth.style.width = 450 + 'px';
      } else if (sliderPin.offsetLeft - shift.x < 0) {
        effectDepth.style.width = 0 + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


})();
