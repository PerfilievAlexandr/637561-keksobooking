'use strict';

var OFFER_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var UNINNHABITED_PREMISE = '100';
var NON_GUESTS = '0';
var HOUSE_CLASS = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var pinHeight = document.querySelector('.map__pin img').height;
var pinWidth = document.querySelector('.map__pin img').width;
var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var similarListElement = document.querySelector('.map__pins');
var similarOfferTemplate = document.querySelector('template').content.querySelector('.map__card');
var similarListOffer = document.querySelector('.map');
var formOffer = document.querySelector('.ad-form');
var formFields = formOffer.querySelectorAll('fieldset');
var mainPin = similarListOffer.querySelector('.map__pin');
var mainPinLocationX = mainPin.offsetLeft;
var mainPinLocationY = mainPin.offsetTop;
var addressOffer = formOffer.querySelector('input[name="address"]');
var selectTypes = formOffer.querySelector('#type');
var selectCheckin = formOffer.querySelector('#timein');
var selectCheckout = formOffer.querySelector('#timeout');
var selectRooms = formOffer.querySelector('#room_number');
var selectGuests = formOffer.querySelector('#capacity');
var clearOfferForm = formOffer.querySelector('.ad-form__reset');
var accommodations = [];
var applicationActive = false;


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

var generateMockData = function () {
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
};

var renderMapTags = function (pinParam) {
  var element = similarPinTemplate.cloneNode(true);
  var imageChildren = element.querySelector('img');
  element.style.left = pinParam.location.x + pinWidth / 2 + 'px';
  element.style.top = pinParam.location.y - pinHeight + 'px';
  imageChildren.src = pinParam.author.avatar;
  imageChildren.alt = pinParam.offer.title;
  element.addEventListener('click', function () {
    similarListOffer.appendChild(renderOfferTags(pinParam));
  });
  return element;
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

var strLocationPin = function (locX, locY) {
  return locX + ', ' + locY;
};

var guestsVsRooms = function (evt) {
  var optionSelectRooms = selectRooms.querySelectorAll('option');
  var indexSelectRooms = selectRooms.options.selectedIndex;
  var valueSelectRooms = optionSelectRooms[indexSelectRooms].value;
  var valueSelectGuests = evt.target.value || selectGuests.value;

  if ((valueSelectGuests === NON_GUESTS && valueSelectRooms !== UNINNHABITED_PREMISE) || (valueSelectGuests !== NON_GUESTS && valueSelectRooms === UNINNHABITED_PREMISE)) {
    selectGuests.setCustomValidity('Помещение не предназначено для гостей.');
  } else if (valueSelectGuests > valueSelectRooms) {
    selectGuests.setCustomValidity('Число гостей не может превышать количество комнат');
  } else {
    selectGuests.setCustomValidity('');
  }
  // return false;
};

var init = function () {
  for (var i = 0; i < formFields.length - 1; i++) {
    formFields[i].setAttribute('disabled', 'disabled');
  }
  addressOffer.value = strLocationPin(mainPinLocationX, mainPinLocationY);
};

mainPin.addEventListener('mouseup', function () {
  if (!applicationActive) {
    var fragment = document.createDocumentFragment();
    generateMockData();
    accommodations.forEach(function (item) {
      fragment.appendChild(renderMapTags(item));
    });
    applicationActive = true;
  }

  similarListOffer.classList.remove('map--faded');
  formOffer.classList.remove('ad-form--disabled');

  for (var i = 0; i < formFields.length - 1; i++) {
    formFields[i].removeAttribute('disabled');
  }

  addressOffer.value = (mainPinLocationX + pinWidth / 2) + ', ' + (mainPinLocationY - pinHeight);
  similarListElement.appendChild(fragment);
});

clearOfferForm.addEventListener('click', function () {

  var allPins = similarListElement.querySelectorAll('.map__pin');
  applicationActive = false;
  accommodations = [];

  addressOffer.value = strLocationPin(mainPinLocationX, mainPinLocationY);
  similarListOffer.classList.add('map--faded');
  formOffer.classList.add('ad-form--disabled');

  for (var j = 1; j < allPins.length; j++) {
    similarListElement.removeChild(allPins[j]);
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

selectCheckin.addEventListener('change', function (evt) {
  selectCheckout.value = evt.target.value;
});

selectCheckout.addEventListener('change', function (evt) {
  selectCheckin.value = evt.target.value;
});

formOffer.addEventListener('invalid', function (evt) {
  evt.target.style = 'border: 5px solid red';
}, true);

selectGuests.addEventListener('change', guestsVsRooms);

init();

// formOffer.querySelector('.ad-form__submit').addEventListener('change', guestsVsRooms);

