'use strict';

var OFFER_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var similarListElement = document.querySelector('.map__pins');
var similarOfferTemplate = document.querySelector('template').content.querySelector('.map__card');
var similarListOffer = document.querySelector('.map');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var suffle = function (arr, newLength) {
  var newArray = [];
  var localArr = arr.slice(0);
  while (localArr.length > 0) {
    var middleArr = localArr.splice(getRandomInt(0, localArr.length - 1), 1);
    newArray.push(middleArr.pop());
  }
  return (newLength) ? newArray.slice(0, newLength) : newArray;
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
      title: suffle(OFFER_TITLE, 1),
      address: locationHouseX + ', ' + locationHouseY,
      price: getRandomInt(1000, 1000000),
      type: suffle(OFFER_TYPE),
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 12),
      checkin: suffle(OFFER_CHECKIN, 1),
      checkout: suffle(OFFER_CHECKOUT, 1),
      features: suffle(OFFER_FEATURES, getRandomInt(1, OFFER_FEATURES.length - 1)),
      description: '',
      photos: suffle(OFFER_PHOTOS)
    }
  });
}

var pinHeight = document.querySelector('.map__pin img').height;
var pinWidth = document.querySelector('.map__pin img').width;

var renderMapTags = function (pinParam) {
  var element = similarPinTemplate.cloneNode(true);
  var imageChildren = element.querySelector('img');
  element.style.left = pinParam.location.x + pinWidth / 2 + 'px';
  element.style.top = pinParam.location.y - pinHeight + 'px';
  imageChildren.src = pinParam.author.avatar;
  imageChildren.alt = pinParam.offer.title;
  pinParam.button = element;

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
  var feturesNode = element.querySelector('.popup__features');
  element.querySelector('.popup__features').textContent = '';
  offerParam.offer.features.forEach(function (item) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature', 'popup__feature--' + item);
    feturesNode.appendChild(feature);
  });
  element.querySelector('.popup__description').textContent = offerParam.offer.description;
  element.querySelector('.popup__avatar').src = offerParam.author.avatar;
  suffle(offerParam.offer.photos).forEach(function (item) {
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
var formOffer = document.querySelector('.ad-form');
var formFields = formOffer.querySelectorAll('fieldset');
var mainPin = similarListOffer.querySelector('.map__pin');
var mainPinLocation = mainPin.getAttribute('style').match(/(\d+)\S+(\d+)/g);
var addressOffer = formOffer.querySelector('input[name="address"]');
var selectTypes = formOffer.querySelector('#type');
var selectCheckin = formOffer.querySelector('#timein');
var selectCheckout = formOffer.querySelector('#timeout');
var selectRooms = formOffer.querySelector('#room_number');
var selectGuests = formOffer.querySelector('#capacity');


for (var j = 0; j < formFields.length - 1; j++) {
  formFields[j].setAttribute('disabled', 'disabled');
}

addressOffer.value = mainPinLocation.join(', ');

mainPin.addEventListener('mouseup', function () {
  similarListOffer.classList.remove('map--faded');
  formOffer.classList.remove('ad-form--disabled');
  for (var j = 0; j < formFields.length - 1; j++) {
    formFields[j].removeAttribute('disabled');
  }
  addressOffer.value = (+mainPinLocation[0] + pinWidth / 2) + ', ' + (mainPinLocation[1] - pinHeight);
  similarListElement.appendChild(fragment);
});

similarListElement.addEventListener('mouseup', function (evt) {
  var mapPin = evt.target;

  if (mapPin instanceof Image) {
    mapPin = mapPin.parentElement;
  }

  for (var j = 0; j < accommodations.length; j++) {
    if (accommodations[j].button === mapPin) {
      similarListOffer.appendChild(renderOfferTags(accommodations[j]));
    }
  }

});

selectTypes.addEventListener('change', function (evt) {
  var selectCoast = formOffer.querySelector('#price');
  var houseCoast = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };
  selectCoast.min = houseCoast[evt.target.value];
});

selectCheckin.addEventListener('change', function () {
  selectCheckout.value = selectCheckin.value;
});

selectCheckout.addEventListener('change', function () {
  selectCheckin.value = selectCheckout.value;
});
