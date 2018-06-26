'use strict';
(function () {

  var mainPin = window.map.similarListOffer.querySelector('.map__pin--main');
  var similarListElement = document.querySelector('.map__pins');
  var formOffer = document.querySelector('.ad-form');
  var formFields = formOffer.querySelectorAll('fieldset');
  var addressOffer = formOffer.querySelector('input[name="address"]');
  var mainPinLocationX = mainPin.offsetLeft;
  var mainPinLocationY = mainPin.offsetTop;

  var init = function () {
    for (var i = 0; i < formFields.length - 1; i++) {
      formFields[i].disabled = true;
    }
  };

  var resetFormOffer = function () {
    var allPins = similarListElement.querySelectorAll('.map__pin');
    var offerPopup = document.querySelector('.map__card');

    window.map.applicationActive = false;

    if (offerPopup) {
      offerPopup.remove();
    }
    setTimeout(function () {
      addressOffer.value = window.form.strLocationPin(mainPinLocationX, mainPinLocationY);
    }, 1);

    window.map.similarListOffer.classList.add('map--faded');
    formOffer.classList.add('ad-form--disabled');

    for (var j = 1; j < allPins.length; j++) {
      similarListElement.removeChild(allPins[j]);
    }

    init();
  };

  var mapActivate = function () {
    if (!window.map.applicationActive) {
      var accommodations = window.data.generateMockData();
      var fragment = document.createDocumentFragment();
      accommodations.forEach(function (item) {
        fragment.appendChild(window.pin.renderMapTags(item));
      });
      similarListElement.appendChild(fragment);
      window.map.applicationActive = true;

      window.map.similarListOffer.classList.remove('map--faded');
      formOffer.classList.remove('ad-form--disabled');

      for (var i = 0; i < formFields.length - 1; i++) {
        formFields[i].disabled = false;
      }
    }
  };

  mainPin.addEventListener('click', mapActivate);

  window.stage = {
    resetFormOffer: resetFormOffer,
  };

})();
