'use strict';
(function () {
  var UNINNHABITED_PREMISE = '100';
  var NON_GUESTS = '0';

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

  formOffer.addEventListener('reset', window.stage.resetFormOffer);

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

  addressOffer.value = strLocationPin(mainPinLocationX, mainPinLocationY);

  window.form = {
    strLocationPin: strLocationPin,
  };

})();
