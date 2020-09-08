'use strict';
/*
Не могу сделать так что бы точка не выходила за пределы слайдера. В html разметке менять ничего не надо.
С изменением положения слайдера, должна меняться насышенность эффекта
*/
(function () {
  var slider = document.querySelector('.img-upload__effect-level');

  var sliderPin = slider.querySelector('.effect-level__pin');


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
