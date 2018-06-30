'use strict';
(function () {
  var UNINNHABITED_PREMISE = '100';
  var NON_GUESTS = '0';
  var HouseCoast = {
    PALACE: 10000,
    FLAT: 1000,
    HOUSE: 5000,
    BUNGALO: 0
  };

  var formOffer = document.querySelector('.ad-form');
  var selectTypes = formOffer.querySelector('#type');
  var selectCheckin = formOffer.querySelector('#timein');
  var selectCheckout = formOffer.querySelector('#timeout');
  var selectRooms = formOffer.querySelector('#room_number');
  var selectGuests = formOffer.querySelector('#capacity');
  var addressOffer = formOffer.querySelector('input[name="address"]');
  var mainPin = window.map.similarListOffer.querySelector('.map__pin');
  var mainPinLocationX = mainPin.offsetLeft;
  var mainPinLocationY = mainPin.offsetTop;
  var sendForm = document.querySelector('.ad-form__submit');

  var strLocationPin = function (locX, locY) {
    return locX + ', ' + locY;
  };

  var guestsVsRooms = function () {
    var optionSelectRooms = selectRooms.querySelectorAll('option');
    var indexSelectRooms = selectRooms.options.selectedIndex;
    var valueSelectRooms = optionSelectRooms[indexSelectRooms].value;
    var valueSelectGuests = selectGuests.value;

    if ((valueSelectGuests === NON_GUESTS && valueSelectRooms !== UNINNHABITED_PREMISE) || (valueSelectGuests !== NON_GUESTS && valueSelectRooms === UNINNHABITED_PREMISE)) {
      selectGuests.setCustomValidity('Помещение не предназначено для гостей.');
    } else if (valueSelectGuests > valueSelectRooms) {
      selectGuests.setCustomValidity('Число гостей не может превышать количество комнат');
    } else {
      selectGuests.setCustomValidity('');
    }
  };

  var coastCheck = function () {
    var selectTypeValue = selectTypes.value.toUpperCase();
    var selectCoast = formOffer.querySelector('#price');
    selectCoast.min = HouseCoast[selectTypeValue];
  };

  formOffer.addEventListener('reset', window.stage.resetFormOffer);

  selectTypes.addEventListener('change', coastCheck);

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

  sendForm.addEventListener('click', function () {
    guestsVsRooms();
    coastCheck();
  });

  addressOffer.value = strLocationPin(mainPinLocationX, mainPinLocationY);

  formOffer.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(formOffer);
    window.backend.ajax('https://js.dump.academy/keksobooking', 'POST', formData, window.stage.resetFormOffer);
  });

  window.form = {
    strLocationPin: strLocationPin,
  };

})();
