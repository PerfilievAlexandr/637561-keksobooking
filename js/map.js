'use strict';

var OFFER_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var similarListElement = document.querySelector('.map__pins');
var similarOfferTemplate = document.querySelector('template').content.querySelector('.map__card');
var similarListOffer = document.querySelector('.map');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getDifferentValues = function (arrEnter) {
  var index = getRandomInt(0, arrEnter.length - 2);
  return (arrEnter.length > 1) ? arrEnter.splice(index, 1) : arrEnter[index];
};

var setFeatures = function (arr) {
  var strLength = getRandomInt(1, arr.length - 1);
  var strFeatures = [];
  for (var i = 0; i < strLength; i++) {
    strFeatures.push(getDifferentValues(arr));
  }
  return strFeatures;
};

var mixValues = function (arrNotMix) {
  for (var i = arrNotMix.length - 1; i > 0; i--) {
    var j = getRandomInt(0, 1);
    var x = arrNotMix[i];
    arrNotMix[i] = arrNotMix[j];
    arrNotMix[j] = x;
  }
  return arrNotMix;
};

var accommodations = [];
for (var i = 0; i < 8; i++) {
  var locationHouseX = getRandomInt(300, 900);
  var locationHouseY = getRandomInt(130, 630);
  accommodations.push({
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    location: {
      x: locationHouseX,
      y: locationHouseY
    },
    offer: {
      title: getDifferentValues(OFFER_TITLE),
      address: locationHouseX + ', ' + locationHouseY,
      price: getRandomInt(1000, 1000000),
      type: OFFER_TYPE[getRandomInt(0, OFFER_TYPE.length - 1)],
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 12),
      checkin: OFFER_TIMES[getRandomInt(0, OFFER_TIMES.length - 1)],
      checkout: OFFER_TIMES[getRandomInt(0, OFFER_TIMES.length - 1)],
      features: setFeatures(OFFER_FEATURES),
      description: '',
      photos: OFFER_PHOTOS
    }
  });
}
document.querySelector('.map').classList.remove('map--faded');

var pinHeight = document.querySelector('.map__pin').style.height;
var pinWidth = document.querySelector('.map__pin').style.width;


var renderMapTags = function (pinParam) {
  var element = similarPinTemplate.cloneNode(true);
  var imageChildren = element.querySelector('img');
  element.style.left = pinParam.location.x + pinWidth / 2 + 'px';
  element.style.top = pinParam.location.y - pinHeight + 'px';
  imageChildren.src = pinParam.author.avatar;
  imageChildren.alt = pinParam.offer.title;
  return element;
};

var houseClass = {
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
  element.querySelector('.popup__type').textContent = houseClass[offerParam.offer.type];
  element.querySelector('.popup__text--capacity').textContent = offerParam.offer.rooms + ' комнаты для ' + offerParam.offer.guests + ' гост' + guestEnd;
  element.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerParam.offer.checkin + ', выезд до ' + offerParam.offer.checkout;
  element.querySelector('.popup__features').textContent = offerParam.offer.features;
  element.querySelector('.popup__description').textContent = offerParam.offer.description;
  element.querySelector('.popup__avatar').src = offerParam.author.avatar;
  mixValues(offerParam.offer.photos).forEach(function (item) {
    var imgConteiner = element.querySelector('.popup__photos img').cloneNode(true);
    imgConteiner.src = item;
    photoElement.appendChild(imgConteiner);
  });
  element.querySelector('.popup__photos img').remove();
  return element;
};

var fragment = document.createDocumentFragment();

for (var j = 0; j < accommodations.length; j++) {
  fragment.appendChild(renderMapTags(accommodations[j]));
}

similarListElement.appendChild(fragment);

similarListOffer.appendChild(renderOfferTags(accommodations[0]));
