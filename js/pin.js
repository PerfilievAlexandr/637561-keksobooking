'use strict';
(function () {

  var pinHeight = document.querySelector('.map__pin').offsetHeight;
  var pinWidth = document.querySelector('.map__pin').offsetWidth;
  var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var removeBlock = function (el) {
    if (el) {
      el.remove();
    }
  };

  var renderMapTags = function (pinParam) {
    var element = similarPinTemplate.cloneNode(true);
    var imageChildren = element.querySelector('img');
    element.style.left = pinParam.location.x + pinWidth / 2 + 'px';
    element.style.top = pinParam.location.y - pinHeight + 'px';
    imageChildren.src = pinParam.author.avatar;
    imageChildren.alt = pinParam.offer.title;
    element.addEventListener('click', function (e) {
      var currentActive = document.querySelector('.map__pin--active');
      if (currentActive) {
        currentActive.classList.remove('map__pin--active');
      }
      e.currentTarget.classList.add('map__pin--active');

      var similarOffer = document.querySelector('.map__card');
      if (similarOffer) {
        removeBlock(similarOffer);
      }

      window.map.similarListOffer.appendChild(window.card.renderOfferTags(pinParam));
      var offerPopup = document.querySelector('.map__card');
      var closeOfferPopUp = document.querySelector('.popup__close');

      closeOfferPopUp.addEventListener('click', function () {
        removeBlock(offerPopup);
      });
    });
    return element;
  };
  window.pin = {
    renderMapTags: renderMapTags,
    removeBlock: removeBlock
  };

})();
