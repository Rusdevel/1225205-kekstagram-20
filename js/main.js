'use strict';
(function () {

  var NUMBER_OF_PHOTOS = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MIN_NUMBER = 1;
  var MAX_NUMBER = 6;
  var SOMETHIG_MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var NAMES = ['Петя', 'Саша', 'Маша', 'Павел', 'Юля', 'Вова'];


  // случайное целое число в пределах min-max
  window.main = {
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max - min + 1));
    },
    // Создание  массива комментариев
    getComment: function (count) {
      var comments = [];
      for (var i = 0; i < count; i++) {
        comments.push({
          avatar: 'img/avatar-' + window.main.getRandomNumber(MIN_NUMBER, MAX_NUMBER) + '.svg',
          message: SOMETHIG_MESSAGES[window.main.getRandomNumber(MIN_NUMBER, MAX_NUMBER - 1)],
          name: NAMES[window.main.getRandomNumber(MIN_NUMBER, MAX_NUMBER - 1)],
        });
      }
      return comments;
    },
    // Описание массива с описанием фотографий
    photoDescription: function () {
      var objectPhotoDescription = [];
      for (var i = 1; i <= NUMBER_OF_PHOTOS; i++) {
        objectPhotoDescription.push({
          url: 'photos/' + i + '.jpg',
          description: 'Описание фото',
          likes: window.main.getRandomNumber(MIN_LIKES, MAX_LIKES),
          comments: window.main.getComment(window.main.getRandomNumber(MIN_NUMBER, MAX_NUMBER))
        });
      }
      return objectPhotoDescription;
    }
  };

})();
