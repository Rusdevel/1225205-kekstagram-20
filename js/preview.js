'use strict';
// создаем фото с лайками и комментраиями
(function () {
  var bigPicture = document.querySelector('.big-picture');
  var picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');

  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');


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
    var pictures = window.main.photoDescription();
    showPicture(pictures);
    renderBigPicture(pictures[0]);
    bigPicture.classList.remove('hidden');
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    document.body.classList.add('modal-open');
  };
  // init();
})();
