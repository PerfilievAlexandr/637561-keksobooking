'use strict';
(function () {
  var OFFER_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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

  window.generateMockData = function () {
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
    return accommodations;
  };
})();
