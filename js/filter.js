
'use strict';
(function () {

  var HousePrice = {
    MIN_COAST: 10000,
    MAX_COAST: 50000
  };

  var pins = [];
  var houseType = document.querySelector('#housing-type');
  var coastHouse = document.querySelector('#housing-price');
  var qualityRooms = document.querySelector('#housing-rooms');
  var qualityGuests = document.querySelector('#housing-guests');
  var featuresHouse = document.querySelector('#housing-features');

  var getSelectValue = function (sel) {
    return sel.value;
  };

  var valueHouseType = getSelectValue(houseType);
  var valueCoastHouse = getSelectValue(coastHouse);
  var valueQualityRooms = getSelectValue(qualityRooms);
  var valueQualityGuests = getSelectValue(qualityGuests);
  var valueFeatures;

  var filters = {
    type: function (item) {
      return (valueHouseType === 'any' || item.offer.type === valueHouseType);
    },

    coast: function (item) {
      var elem = item.offer.price;
      if (+item.offer.price < HousePrice.MIN_COAST) {
        elem = 'low';
      } else if (+item.offer.price > HousePrice.MAX_COAST) {
        elem = 'high';
      } else {
        elem = 'middle';
      }
      return (valueCoastHouse === 'any' || elem === valueCoastHouse);
    },

    guests: function (item) {
      return (valueQualityGuests === 'any' || item.offer.guests === +valueQualityGuests);
    },

    rooms: function (item) {
      return (valueQualityRooms === 'any' || item.offer.rooms === +valueQualityRooms);
    },

    features: function () {

    }
  };

  var filterPins = function () {

    var result = window.filter.pins.filter(filters.type).filter(filters.coast).filter(filters.guests).filter(filters.rooms);
    window.render.renderPins(result);
  };

  houseType.addEventListener('change', function () {
    valueHouseType = getSelectValue(houseType);
    filterPins();
  });

  coastHouse.addEventListener('change', function () {
    valueCoastHouse = getSelectValue(coastHouse);
    filterPins();
  });

  qualityRooms.addEventListener('change', function () {
    valueQualityRooms = getSelectValue(qualityRooms);
    filterPins();
  });

  qualityGuests.addEventListener('change', function () {
    valueQualityGuests = getSelectValue(qualityGuests);
    filterPins();
  });


  featuresHouse.addEventListener('click', function (evt) {
    evt.stopPropagation();
    var checkedFeatures = document.querySelectorAll('.map__checkbox:checked');
    valueFeatures = [];
    for (var i = 0; i < checkedFeatures.length; i++) {
      valueFeatures[i] = getSelectValue(checkedFeatures[i]);
    }
  }, true);

  window.filter = {
    pins: pins
  };

})();


