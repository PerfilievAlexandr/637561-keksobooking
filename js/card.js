'use strict';
(function () {

  var HouseClass = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var similarOfferTemplate = document.querySelector('template').content.querySelector('.map__card');

  var renderFeatures = function (element, offerParam) {
    var feturesNode = element.querySelector('.popup__features');
    element.querySelector('.popup__features').textContent = '';
    offerParam.offer.features.forEach(function (item) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature', 'popup__feature--' + item);
      feturesNode.appendChild(feature);
    });
  };

  var renderPhotos = function (element, offerParam) {
    var photoElement = element.querySelector('.popup__photos');
    offerParam.offer.photos.forEach(function (item) {
      var imgConteiner = element.querySelector('.popup__photos img').cloneNode(true);
      imgConteiner.src = item;
      photoElement.appendChild(imgConteiner);
    });
  };

  var renderOfferTags = function (offerParam) {
    var element = similarOfferTemplate.cloneNode(true);
    var guestEnd = (offerParam.offer.guests === 1) ? 'я.' : 'ей.';
    element.querySelector('.popup__title').textContent = offerParam.offer.title;
    element.querySelector('.popup__text--address').textContent = offerParam.offer.address;
    element.querySelector('.popup__text--price').innerHTML = offerParam.offer.price + '&#8381;/ночь';
    element.querySelector('.popup__type').textContent = HouseClass[offerParam.offer.type];
    element.querySelector('.popup__text--capacity').textContent = offerParam.offer.rooms + ' комнаты для ' + offerParam.offer.guests + ' гост' + guestEnd;
    element.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerParam.offer.checkin + ', выезд до ' + offerParam.offer.checkout;
    element.querySelector('.popup__description').textContent = offerParam.offer.description;
    element.querySelector('.popup__avatar').src = offerParam.author.avatar;

    renderPhotos(element, offerParam);
    renderFeatures(element, offerParam);

    element.querySelector('.popup__photos img').remove();

    var onRemoveOfferParams = function () {
      window.pin.disactivePin();
      element.remove();
      document.removeEventListener('keydown', onRemoveOfferParamsESC);
    };

    var onRemoveOfferParamsESC = function (evt) {
      if (evt.keyCode === window.map.KeyCodes.ESC) {
        onRemoveOfferParams();
      }
    };

    var closeButton = element.querySelector('.popup__close');

    closeButton.addEventListener('click', onRemoveOfferParams);

    document.addEventListener('keydown', onRemoveOfferParamsESC);


    return element;
  };

  window.card = {
    renderOfferTags: renderOfferTags
  };
})();
