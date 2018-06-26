'use strict';
(function () {

  var similarOfferTemplate = document.querySelector('template').content.querySelector('.map__card');
  var HOUSE_CLASS = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var renderOfferTags = function (offerParam) {
    var element = similarOfferTemplate.cloneNode(true);
    var photoElement = element.querySelector('.popup__photos');
    var guestEnd = (offerParam.offer.guests === 1) ? 'я.' : 'ей.';
    element.querySelector('.popup__title').textContent = offerParam.offer.title;
    element.querySelector('.popup__text--address').textContent = offerParam.offer.address;
    element.querySelector('.popup__text--price').innerHTML = offerParam.offer.price + '&#8381;/ночь';
    element.querySelector('.popup__type').textContent = HOUSE_CLASS[offerParam.offer.type];
    element.querySelector('.popup__text--capacity').textContent = offerParam.offer.rooms + ' комнаты для ' + offerParam.offer.guests + ' гост' + guestEnd;
    element.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerParam.offer.checkin + ', выезд до ' + offerParam.offer.checkout;
    var feturesNode = element.querySelector('.popup__features');
    element.querySelector('.popup__features').textContent = '';
    offerParam.offer.features.forEach(function (item) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature', 'popup__feature--' + item);
      feturesNode.appendChild(feature);
    });
    element.querySelector('.popup__description').textContent = offerParam.offer.description;
    element.querySelector('.popup__avatar').src = offerParam.author.avatar;
    offerParam.offer.photos.forEach(function (item) {
      var imgConteiner = element.querySelector('.popup__photos img').cloneNode(true);
      imgConteiner.src = item;
      photoElement.appendChild(imgConteiner);
    });
    element.querySelector('.popup__photos img').remove();
    return element;
  };

  window.card = {
    renderOfferTags: renderOfferTags
  };
})();
