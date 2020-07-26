'use strict';

var NUMBER_OF_PHOTOS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_NUMBER_AVATAR = 1;
var MAX_NUMBER_AVATAR = 6;
var SOMETHIG_MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Петя', 'Саша', 'Маша', 'Павел', 'Юля', 'Вова'];

var picturesTemplate = document.querySelector('#picture').content
.querySelector('.picture');
var picturesContainer = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var socialCommentCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');

// случайное целое число в пределах min-max
function getRandomNumber(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

// Создание  массива комментариев
var getComment = function (count) {
  var avatar = 'img/avatar-' + getRandomNumber(MIN_NUMBER_AVATAR, MAX_NUMBER_AVATAR) + '.svg';
  var comments = [];
  for (var i = 0; i < count; i++) {
    comments.push({
      avatar: avatar,
      message: SOMETHIG_MESSAGES[getRandomNumber(0, 5)],
      name: NAMES[getRandomNumber(0, 5)],
    });
  }
  return comments;
};

// Описание массива с описанием фотографий
var photoDescription = function () {
  var objectPhotoDescription = [];
  for (var i = 1; i <= NUMBER_OF_PHOTOS; i++) {
    objectPhotoDescription.push({
      url: 'photos/' + i + '.jpg',
      description: 'Описание фото',
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: getComment(getRandomNumber(MIN_NUMBER_AVATAR, MAX_NUMBER_AVATAR))
    });
  }
  return objectPhotoDescription;
};
// создаем фото с лайками и комментраиями
var createDomPicture = function (picture) {
  var pictureElement = picturesTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments;
  return pictureElement;
};

var showPicture = function (objects) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < objects.length; i++) {
    fragment.appendChild(createDomPicture(objects[i]));
  }
  picturesContainer.appendChild(fragment);
};


var renderSocialComment = function (comment, template) {
  var socialComment = template.cloneNode(true);
  socialComment.querySelector('.social__picture').src = comment.avatar;
  socialComment.querySelector('.social__picture').alt = comment.name;
  socialComment.querySelector('.social__text').textContent = comment.message;
  return socialComment;
};

var renderBigPicture = function (picture) {
  var socialComment = bigPicture.querySelector('.social__comment');
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < picture.comments.length; i++) {
    fragment.appendChild(renderSocialComment(picture.comments[i], socialComment));
  }
  if (picture.comments.length > 0) {
    bigPicture.querySelector('.social__comments').innerHTML = '';
  }
  bigPicture.querySelector('.social__comments').appendChild(fragment);
  return bigPicture;
};

var init = function () {
  var pictures = photoDescription();
  showPicture(pictures);
  renderBigPicture(pictures[0]);
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
};

init();
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

// Валидация Хеш-тега
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
