'use strict';
(function () {

  var MainPinDefaults = {
    left: 570,
    top: 375
  };
  var mainPin = window.map.similarListOffer.querySelector('.map__pin--main');
  var similarListElement = document.querySelector('.map__pins');
  var formOffer = document.querySelector('.ad-form');
  var formFields = formOffer.querySelectorAll('fieldset');
  var addressOffer = formOffer.querySelector('input[name="address"]');
  var mainPinLocationX = mainPin.offsetLeft;
  var mainPinLocationY = mainPin.offsetTop;
  var formFilterOffers = document.querySelector('.map__filters');

  var init = function () {
    formFields.forEach(function (item) {
      item.disabled = true;
    });
  };

  formFilterOffers.style.display = 'none';

  init();

  var resetFormOffer = function () {
    var allPins = similarListElement.querySelectorAll('.map__pin');
    var offerPopup = document.querySelector('.map__card');
    var invalidInputs = formOffer.querySelectorAll('.invalid');

    window.map.setMapCords(MainPinDefaults.left, MainPinDefaults.top);

    window.map.applicationActive = false;

    setTimeout(function () {
      addressOffer.value = window.form.getLocation(mainPinLocationX, mainPinLocationY);
    }, 1);

    window.map.similarListOffer.classList.add('map--faded');
    formOffer.classList.add('ad-form--disabled');

    allPins.forEach(function (item) {
      similarListElement.removeChild(item);
    });

    invalidInputs.forEach(function (item) {
      item.style = '';
      item.classList.remove('invalid');
    });

    if (offerPopup) {
      offerPopup.remove();
    }

    init();

    formOffer.reset();
  };

  var mapActivate = function () {

    if (!window.map.applicationActive) {
      addressOffer.value = window.map.fillAdressValue(mainPinLocationX, mainPinLocationY);

      formFilterOffers.style.display = '';
      var onLoad = function (data) {

        window.filter.pins = data;
        window.render.renderPins(data);


        window.map.applicationActive = true;

        window.map.similarListOffer.classList.remove('map--faded');
        formOffer.classList.remove('ad-form--disabled');

        formFields.forEach(function (item) {
          item.disabled = false;
        });

      };

      window.backend.sendRequest(window.backend.URL_ADRESS_GET, 'GET', null, onLoad);
    }
  };

  mainPin.addEventListener('click', mapActivate);

  window.stage = {
    resetFormOffer: resetFormOffer
  };
})();
