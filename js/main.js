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

// Создание  массива сомментариев
var getComment = function (count) {
  var avatar = 'img/avatar-' + getRandomNumber(MIN_NUMBER_AVATAR, MAX_NUMBER_AVATAR) + '.svg';
  var comments = [];
  for (var i = 0; i < count; i++) {
    comments.push = ({
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
    objectPhotoDescription.push = ({
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


// продолжаем

var renderSocialComment = function (comment, template) {
  var socialComment = template.cloneNode(true);
  socialComment.querySelector('.social__picture').src = comment.avatar;
  socialComment.querySelector('.social__picture').alt = comment.name;
  socialComment.querySelector('.social__text').textContent = comment.message;
  return socialComment;
};

var renderBigPicture = function (picture) {
  var socialComment = bigPicture.querySelector('.social__comment');
  bigPicture.querySelector('.big-picture__img').src = picture.url;
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
