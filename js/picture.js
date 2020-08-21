'use strict';
(function () {
  var fileInput = document.querySelector('#upload-file');
  var uploadingForm = document.querySelector('.img-upload__overlay');

  fileInput.addEventListener('change', function () {
    uploadingForm.classList.remove('hidden');
  });
  var onClickCancel = function () {
    uploadingForm.classList.add('hidden');
  };
  var buttonCancel = document.querySelector('#upload-cancel');
  var onKeyDownEsc = function (evt) {
    if (evt.key === 'Escape') {
      onClickCancel();
    }
  };
  buttonCancel.addEventListener('click', onClickCancel);
  document.addEventListener('keydown', onKeyDownEsc);

  // меняем фильтры
  var arrayStyle = ['', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat'];

  var photofilters = document.querySelectorAll('.effects__preview');
  var divFullPhoto = document.querySelector('.img-upload__preview');
  var fullPhoto = divFullPhoto.querySelector('img');

  // var valuePin;

  var addEvents = function (filterPicture, style) {
    filterPicture.addEventListener('click', function () {
    // fullPhoto.style.filter = grayscale(valuePin * 1 / 100);
    // fullPhoto.style.filter = blur(valuePin * 3 / 100);
      if (style !== '') {
        fullPhoto.classList.add(style);
      }
      for (var i = 0; i < arrayStyle.length; i++) {
        if (arrayStyle[i] !== style && arrayStyle[i] !== '') {

          fullPhoto.classList.remove(arrayStyle[i]);
        }
      }
    });
  };
  for (var i = 0; i < photofilters.length; i++) {
    addEvents(photofilters[i], arrayStyle[i]);
  }
  // var pinInput = document.querySelector('.effect-level__value');

  var onMouseupPin = function () {
  // valuePin = pinInput.value;

  };
  var pin = document.querySelector('.effect-level__pin');
  pin.addEventListener('mouseup', onMouseupPin);
})();
