'use strict';
(function () {

  var renderPins = function (pins) {
    var pinsAll = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    Array.from(pinsAll).forEach(function (item) {
      item.remove();
    });


    var similarListElement = document.querySelector('.map__pins');

    var fragment = document.createDocumentFragment();

    pins.slice(0, 5).forEach(function (item) {
      fragment.appendChild(window.pin.renderMapTags(item));
    });

    similarListElement.appendChild(fragment);
  };

  window.render = {
    renderPins: renderPins
  };

})();
