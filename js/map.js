'use strict';
(function () {

  var pinHeight = document.querySelector('.map__pin').offsetHeight;
  var pinWidth = document.querySelector('.map__pin').offsetWidth;
  var similarListElement = document.querySelector('.map__pins');
  window.map = {
    applicationActive: false,
    similarListOffer: document.querySelector('.map')
  };
  var mainPin = window.map.similarListOffer.querySelector('.map__pin');
  var mainPinLocationX = mainPin.offsetLeft;
  var mainPinLocationY = mainPin.offsetTop;
  var formOffer = document.querySelector('.ad-form');
  var formFields = formOffer.querySelectorAll('fieldset');
  var addressOffer = formOffer.querySelector('input[name="address"]');

  var fillAdressValue = function (x, y) {
    return '' + (x + pinWidth / 2) + ' ,' + (y - pinHeight);
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var body = document.querySelector('body');
    var RESTRICTION_MAP_Y_MIN = 130;
    var RESTRICTION_MAP_Y_MAX = 630;
    var MAP_WIDTH = getComputedStyle(body).maxWidth.replace(/\D/g, '') - pinWidth;


    var initialCoordinates = {
      x: evt.pageX,
      y: evt.pageY
    };

    var mainPinLocation = {};

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      var shift = {
        x: initialCoordinates.x - evtMove.pageX,
        y: initialCoordinates.y - evtMove.pageY
      };

      initialCoordinates = {
        x: evtMove.pageX,
        y: evtMove.pageY
      };

      mainPinLocation.x = mainPin.offsetLeft - shift.x;
      mainPinLocation.y = mainPin.offsetTop - shift.y;

      if ((mainPinLocation.x > 0 && mainPinLocation.x < MAP_WIDTH) && (mainPinLocation.y > RESTRICTION_MAP_Y_MIN && mainPinLocation.y < RESTRICTION_MAP_Y_MAX)) {
        mainPin.style.left = '' + mainPinLocation.x + 'px';
        mainPin.style.top = '' + mainPinLocation.y + 'px';
      }
      addressOffer.value = fillAdressValue(mainPinLocation.x, mainPinLocation.y);
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      addressOffer.value = fillAdressValue(mainPinLocationX, mainPinLocationY);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);


    if (!window.map.applicationActive) {
      var accommodations = window.generateMockData();
      var fragment = document.createDocumentFragment();
      accommodations.forEach(function (item) {
        fragment.appendChild(window.renderMapTags(item));
      });
      similarListElement.appendChild(fragment);
      window.map.applicationActive = true;
    }

    window.map.similarListOffer.classList.remove('map--faded');
    formOffer.classList.remove('ad-form--disabled');

    for (var i = 0; i < formFields.length - 1; i++) {
      formFields[i].removeAttribute('disabled');
    }
  });
})();
