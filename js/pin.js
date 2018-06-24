'use strict';
(function () {

  var pinHeight = document.querySelector('.map__pin').offsetHeight;
  var pinWidth = document.querySelector('.map__pin').offsetWidth;
  var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  window.renderMapTags = function (pinParam) {
    var element = similarPinTemplate.cloneNode(true);
    var imageChildren = element.querySelector('img');
    element.style.left = pinParam.location.x + pinWidth / 2 + 'px';
    element.style.top = pinParam.location.y - pinHeight + 'px';
    imageChildren.src = pinParam.author.avatar;
    imageChildren.alt = pinParam.offer.title;
    element.addEventListener('click', function () {
      window.map.similarListOffer.appendChild(window.renderOfferTags(pinParam));
    });
    return element;
  };
})();
