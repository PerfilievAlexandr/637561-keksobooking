
'use strict';
(function () {

  var ANY_SELECT = 'any';

  var HousePrice = {
    MIN_COAST: 10000,
    MAX_COAST: 50000,
  };

  var PriceCategories = {
    LOW_CATEGORY: 'low',
    MIDDLE_CATEGORY: 'middle',
    HIGH_CATEGORY: 'high',
  };

  var pins = [];
  var mapFilters = document.querySelector('.map__filters');
  var houseType = mapFilters.querySelector('#housing-type');
  var coastHouse = mapFilters.querySelector('#housing-price');
  var qualityRooms = mapFilters.querySelector('#housing-rooms');
  var qualityGuests = mapFilters.querySelector('#housing-guests');
  var featuresHouse = mapFilters.querySelector('#housing-features');

  var getSelectValue = function (sel) {
    return sel.value;
  };

  var valueHouseType = getSelectValue(houseType);
  var valueCoastHouse = getSelectValue(coastHouse);
  var valueQualityRooms = getSelectValue(qualityRooms);
  var valueQualityGuests = getSelectValue(qualityGuests);
  var valueFeatures = [];

  var filters = {
    type: function (item) {
      return (valueHouseType === ANY_SELECT || item.offer.type === valueHouseType);
    },

    coast: function (item) {
      var elem = item.offer.price;
      if (+item.offer.price < HousePrice.MIN_COAST) {
        elem = PriceCategories.LOW_CATEGORY;
      } else if (+item.offer.price > HousePrice.MAX_COAST) {
        elem = PriceCategories.HIGH_CATEGORY;
      } else {
        elem = PriceCategories.MIDDLE_CATEGORY;
      }
      return (valueCoastHouse === ANY_SELECT || elem === valueCoastHouse);
    },

    guests: function (item) {
      return (valueQualityGuests === ANY_SELECT || item.offer.guests === +valueQualityGuests);
    },

    rooms: function (item) {
      return (valueQualityRooms === ANY_SELECT || item.offer.rooms === +valueQualityRooms);
    },

    features: function (item) {
      for (var i = 0; i < valueFeatures.length; i++) {
        if (item.offer.features.indexOf(valueFeatures[i]) === -1) {
          return false;
        }
      }
      return true;
    }
  };

  var filterPins = function () {
    var offerPopup = document.querySelector('.popup');
    var result = window.filter.pins.filter(filters.type).filter(filters.coast).filter(filters.guests).filter(filters.rooms).filter(filters.features);
    window.pin.removeBlock(offerPopup);
    window.render.renderPins(result);
  };

  houseType.addEventListener('change', function () {
    valueHouseType = getSelectValue(houseType);
    window.debounse.debounce(filterPins)();
  });

  coastHouse.addEventListener('change', function () {
    valueCoastHouse = getSelectValue(coastHouse);
    window.debounse.debounce(filterPins)();
  });

  qualityRooms.addEventListener('change', function () {
    valueQualityRooms = getSelectValue(qualityRooms);
    window.debounse.debounce(filterPins)();
  });

  qualityGuests.addEventListener('change', function () {
    valueQualityGuests = getSelectValue(qualityGuests);
    window.debounse.debounce(filterPins)();
  });


  featuresHouse.addEventListener('change', function () {
    var checkedFeatures = document.querySelectorAll('.map__checkbox:checked');
    valueFeatures = [];
    checkedFeatures.forEach(function (item) {
      valueFeatures.push(getSelectValue(item));
    });
    window.debounse.debounce(filterPins)();
  });

  window.filter = {
    pins: pins
  };

})();


