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
  var successSend = document.querySelector('.success');

  var getLocation = function (locX, locY) {
    return locX + ', ' + locY;
  };

  var compareGuestsVsRooms = function () {
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

  var checkCoast = function () {
    var selectTypeValue = selectTypes.value.toUpperCase();
    var selectCoast = formOffer.querySelector('#price');
    selectCoast.min = HouseCoast[selectTypeValue];
  };

  var closeSuccessByESC = function (e) {
    if (e.keyCode === window.map.KeyCodes.ESC) {
      successSend.classList.add('hidden');
      document.removeEventListener('keydown', closeSuccessByESC);
    }
  };

  formOffer.addEventListener('reset', window.stage.resetFormOffer);

  selectTypes.addEventListener('change', checkCoast);

  selectCheckin.addEventListener('change', function (evt) {
    selectCheckout.value = evt.target.value;
  });

  selectCheckout.addEventListener('change', function (evt) {
    selectCheckin.value = evt.target.value;
  });

  formOffer.addEventListener('invalid', function (evt) {
    evt.target.style = 'border: 5px solid red';
  }, true);

  selectGuests.addEventListener('change', compareGuestsVsRooms);

  sendForm.addEventListener('click', function () {
    compareGuestsVsRooms();
    checkCoast();
  });

  addressOffer.value = getLocation(mainPinLocationX, mainPinLocationY);

  formOffer.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(formOffer);
    window.backend.sendRequest('https://js.dump.academy/keksobooking', 'POST', formData, function () {
      window.stage.resetFormOffer();
      successSend.classList.remove('hidden');
      document.addEventListener('keydown', closeSuccessByESC);
    });
  });

  window.form = {
    getLocation: getLocation,
    closeSuccessByESC: closeSuccessByESC
  };

})();
