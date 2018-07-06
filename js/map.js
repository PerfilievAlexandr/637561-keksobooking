'use strict';
(function () {
  var RESTRICTION_MAP_Y_MIN = 130;
  var RESTRICTION_MAP_Y_MAX = 630;
  var KeyCodes = {
    ESC: 27
  };

  var body = document.querySelector('body');
  var similarListOffer = body.querySelector('.map');
  var pinHeight = similarListOffer.querySelector('.map__pin--main').offsetHeight;
  var pinWidth = similarListOffer.querySelector('.map__pin--main').offsetWidth;
  var applicationActive = false;
  var mainPin = similarListOffer.querySelector('.map__pin--main');
  var formOffer = body.querySelector('.ad-form');
  var addressOffer = formOffer.querySelector('input[name="address"]');
  var mapWidth = getComputedStyle(body).maxWidth.replace(/\D/g, '') - pinWidth;

  var fillAdressValue = function (x, y) {
    return parseInt(x + pinWidth / 2, 10) + ', ' + parseInt(y - pinHeight, 10);
  };

  var setMapCords = function (left, top) {
    mainPin.style.left = left + 'px';
    mainPin.style.top = top + 'px';
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

      if ((mainPinLocation.x > 0 && mainPinLocation.x < mapWidth) && (mainPinLocation.y > RESTRICTION_MAP_Y_MIN && mainPinLocation.y < RESTRICTION_MAP_Y_MAX)) {
        setMapCords(mainPinLocation.x, mainPinLocation.y);
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
    fillAdressValue: fillAdressValue,
    KeyCodes: KeyCodes,
    setMapCords: setMapCords
  };
})();
