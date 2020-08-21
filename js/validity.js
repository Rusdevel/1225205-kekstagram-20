'use strict';

// Валидация Хеш-тега
(function () {
  var MAX_QUANTITY_HASHTAGS = 5;
  var MAX_HASHTAGS_LENGTH = 20;

  var inputHashTag = document.querySelector('.text__hashtags');
  var imageUploadButton = document.querySelector('.img-upload__submit');

  inputHashTag.addEventListener('input', function () {
    inputHashTag.setCustomValidity('');
  });

  imageUploadButton.addEventListener('click', function () {
    var checkForm = /^#[a-zA-Zа-яА-ЯёЁ0-9]{1,19}$/; // регулярное выражение для проверки формы
    var hashtags = inputHashTag.value.toLowerCase().split(' '); // toLowerCase() переводит все строки в нижний регистр, split('') делит строку на массивы
    var sorthashtags = hashtags.slice().sort(); // копируем массивы и сортируем
    inputHashTag.setCustomValidity(''); // очищаем сообщение об ошибке

    if (hashtags.length > MAX_QUANTITY_HASHTAGS) {
      inputHashTag.setCustomValidity('колличество хештегов не должно превышать ' + MAX_QUANTITY_HASHTAGS);
    }

    for (var j = 0; j < sorthashtags.length; j++) {
      var hashtag = sorthashtags[j];
      if (hashtag.length === 0) {
        continue;
      } // если хештегов нет, пропускаем
      if (!checkForm.test(hashtag)) {
        inputHashTag.setCustomValidity('Хэштег ' + hashtag + ' должен соответствовать критериям ввода: символ #, за которым следуют любые не специальные символы (от 1 до 20) без пробелов');
      }// проверяем на условия символов
      if (hashtag === sorthashtags[j + 1]) {
        inputHashTag.setCustomValidity('Хештеги не могут повторяться');
      }
      // проверяем на повторяния хештегов
      if (hashtag.length > MAX_HASHTAGS_LENGTH) {
        inputHashTag.setCustomValidity('длина Хештега не может быть длинее ' + MAX_HASHTAGS_LENGTH + 'символов');
      } // проверяем на длину хештега
    }
  });
})();
