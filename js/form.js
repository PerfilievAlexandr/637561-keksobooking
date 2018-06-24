'use strict';
(function () {
  var UNINNHABITED_PREMISE = '100';
  var NON_GUESTS = '0';

  var formOffer = document.querySelector('.ad-form');
  var formFields = formOffer.querySelectorAll('fieldset');
  var selectTypes = formOffer.querySelector('#type');
  var selectCheckin = formOffer.querySelector('#timein');
  var selectCheckout = formOffer.querySelector('#timeout');
  var selectRooms = formOffer.querySelector('#room_number');
  var selectGuests = formOffer.querySelector('#capacity');
  var similarListElement = document.querySelector('.map__pins');
  var addressOffer = formOffer.querySelector('input[name="address"]');
  var mainPin = window.map.similarListOffer.querySelector('.map__pin');
  var mainPinLocationX = mainPin.offsetLeft;
  var mainPinLocationY = mainPin.offsetTop;

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
  };

  var init = function () {
    for (var i = 0; i < formFields.length - 1; i++) {
      formFields[i].setAttribute('disabled', 'disabled');
    }
    addressOffer.value = strLocationPin(mainPinLocationX, mainPinLocationY);
  };

  formOffer.addEventListener('reset', function () {
    window.map.applicationActive = false;
    var allPins = similarListElement.querySelectorAll('.map__pin');
    document.querySelector('.map__card').remove();
    setTimeout(function () {
      addressOffer.value = strLocationPin(mainPinLocationX, mainPinLocationY);
    }, 1);

    window.map.similarListOffer.classList.add('map--faded');
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
})();
