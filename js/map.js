'use strict';
(function () {

  var pinHeight = document.querySelector('.map__pin--main').offsetHeight;
  var pinWidth = document.querySelector('.map__pin--main').offsetWidth;
  var applicationActive = false;
  var similarListOffer = document.querySelector('.map');
  var mainPin = similarListOffer.querySelector('.map__pin--main');
  var formOffer = document.querySelector('.ad-form');
  var addressOffer = formOffer.querySelector('input[name="address"]');
  var RESTRICTION_MAP_Y_MIN = 130;
  var RESTRICTION_MAP_Y_MAX = 630;
  var body = document.querySelector('body');
  var MAP_WIDTH = getComputedStyle(body).maxWidth.replace(/\D/g, '') - pinWidth;

  var fillAdressValue = function (x, y) {
    return '' + (x + pinWidth / 2) + ', ' + (y - pinHeight);
  };


  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

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
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  window.map = {
    applicationActive: applicationActive,
    similarListOffer: similarListOffer,
    fillAdressValue: fillAdressValue
  };
})();
