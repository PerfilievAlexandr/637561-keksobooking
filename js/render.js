'use strict';
(function () {
  var SHOW_MAX_PINS = 5;

  var renderPins = function (pins) {
    var pinsAll = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    Array.from(pinsAll).forEach(function (item) {
      item.remove();
    });


    var similarListElement = document.querySelector('.map__pins');

    var fragment = document.createDocumentFragment();

    pins.slice(0, SHOW_MAX_PINS).forEach(function (item) {
      fragment.appendChild(window.pin.renderMapTags(item));
    });

    similarListElement.appendChild(fragment);
  };

  window.render = {
    renderPins: renderPins
  };

})();
