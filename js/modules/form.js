import * as similar from './similar-elements.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const BUNGALOW_MIN_PRICE = 0;
const FLAT_MIN_PRICE = 1000;
const HOTEL_MIN_PRICE = 3000;
const HOUSE_MIN_PRICE = 5000;
const PALACE_MIN_PRICE = 10000;

const adForm = document.querySelector('.ad-form');

// <<< Валидация заголовка >>>

const titleInput = adForm.querySelector('#title');

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  }

  else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  }

  else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});


// <<< Валидация комнат и гостей >>>

const roomNumberSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');

const capacityOptions = capacitySelect.querySelectorAll('option');

capacitySelect.innerHTML='';
capacitySelect.appendChild(capacityOptions[2]);

function giveSelectedRoom(roomValue) {
  capacitySelect.innerHTML='';

  if (roomValue === '1') {
    capacitySelect.appendChild(capacityOptions[2]);

  } else if (roomValue === '2') {
    capacitySelect.appendChild(capacityOptions[2]);
    capacitySelect.appendChild(capacityOptions[1]);

  } else if (roomValue === '3') {
    capacitySelect.appendChild(capacityOptions[2]);
    capacitySelect.appendChild(capacityOptions[1]);
    capacitySelect.appendChild(capacityOptions[0]);

  } else {
    capacitySelect.appendChild(capacityOptions[3]);
  }
}

function onRoomChange (evt) {
  giveSelectedRoom(evt.target.value);
}

roomNumberSelect.addEventListener('change', onRoomChange);


// <<< Валидация типов жилья и цен >>>

const typeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');

typeSelect.addEventListener('change', onTypeChange);

function onTypeChange (evt) {
  applyMinPriceToType(evt.target.value);
}

function applyMinPriceToType(typeValue) {
  if (typeValue === 'bungalow') {
    priceInput.placeholder = BUNGALOW_MIN_PRICE;
  } else if (typeValue === 'flat') {
    priceInput.placeholder = FLAT_MIN_PRICE;
  } else if (typeValue === 'hotel') {
    priceInput.placeholder = HOTEL_MIN_PRICE;
  } else if (typeValue === 'house') {
    priceInput.placeholder = HOUSE_MIN_PRICE;
  } else if (typeValue === 'palace') {
    priceInput.placeholder = PALACE_MIN_PRICE;
  } else {
    priceInput.placeholder = 0;
  }
}

const currentSelectedTypeValue = typeSelect.value;
applyMinPriceToType(currentSelectedTypeValue);

priceInput.addEventListener('input', () => {

  if (priceInput.value > MAX_PRICE) {
    priceInput.setCustomValidity(`Максимальная цена - ${ MAX_PRICE }`);
  } else if (priceInput.value < Number(priceInput.placeholder)) {
    priceInput.setCustomValidity(`Минимальная цена - ${ priceInput.placeholder }`);
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
});


// <<< Синхронизация времен заезда и выезда  >>>

const timeInSelect = adForm.querySelector('#timein');
const timeOutSelect = adForm.querySelector('#timeout');


timeInSelect.addEventListener('change', onTimeInChange);

function onTimeInChange(evt) {
  syncSelectedTimeIn(evt.target.selectedIndex);
}
function syncSelectedTimeIn(selectedTimeInIndex) {
  timeOutSelect.selectedIndex = selectedTimeInIndex;
}


timeOutSelect.addEventListener('change', onTimeOutChange);

function onTimeOutChange(evt) {
  syncSelectedTimeOut(evt.target.selectedIndex);
}
function syncSelectedTimeOut(selectedTimeOutIndex) {
  timeInSelect.selectedIndex = selectedTimeOutIndex;
}


// <<< Переключение страницы в неактивный и активный режимы >>>

const mapFilters = document.querySelector('.map__filters');
const formFieldsets = adForm.querySelectorAll('.ad-form__element');
const mapFiltersFeaturesFieldset = mapFilters.querySelector('.map__features');
const mapFiltersSelects = mapFilters.querySelectorAll('.map__filter');

function disablePage() {
  adForm.classList.add('ad-form--disabled');
  formFieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });

  mapFilters.classList.add('map__filters--disabled');
  mapFiltersFeaturesFieldset.disabled = true;
  mapFiltersSelects.forEach((select) => {
    select.disabled = true;
  });
}

function enablePage() {
  adForm.classList.remove('ad-form--disabled');
  formFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });

  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersFeaturesFieldset.disabled = false;
  mapFiltersSelects.forEach((select) => {
    select.disabled = false;
  });
}

disablePage();


// <<< Карта >>>

const initialMapCoordinates = {
  // Токио
  lat: 35.65283,
  lng: 139.83947,
};

const map = L.map('map-canvas')
  .on('load', () => {
    enablePage();
  })

  .setView({
    lat: initialMapCoordinates.lat,
    lng: initialMapCoordinates.lng,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


// <<< Главный маркер и синхронизация с адресом >>>

const mainMarkerIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: initialMapCoordinates.lat,
    lng: initialMapCoordinates.lng,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

const addressInput = adForm.querySelector('#address');

addressInput.value = `${initialMapCoordinates.lat  }, ${  initialMapCoordinates.lng}`;

mainMarker.on('moveend', (evt) => {
  const markerCoordinates = evt.target.getLatLng();

  markerCoordinates.lat = Math.floor(markerCoordinates.lat * 100000) / 100000;
  markerCoordinates.lat.toFixed(5);

  markerCoordinates.lng = Math.floor(markerCoordinates.lng * 100000) / 100000;
  markerCoordinates.lng.toFixed(5);

  addressInput.value = `${markerCoordinates.lat  }, ${  markerCoordinates.lng}`;
});

mainMarker.addTo(map);

// <<< Обычные маркеры >>>

// Задание: Напишите код, который добавит на карту метки объявлений, «обычные».
// Для отображения используйте данные для разработки, которые мы генерировали несколько заданий назад.

const markers = [
  {
    title: '',
    lat: 35.50000,
    lng: 139.70000,
  },
  {
    title: '',
    lat: 35.60000,
    lng: 139.80000,
  },
  {
    title: '',
    lat: 35.70000,
    lng: 139.90000,
  },
];

// как вставлять карточку?
const popup = L.popup()
  .setLatLng([35.6, 139.9])
  .setContent(similar.popupClone)
  .openOn(map);

markers.forEach(({lat, lng}) => {

  const icon =L.icon({
    iconUrl: '/img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker({
    lat,
    lng,
  },
  {
    icon,
  },
  );

  marker.addTo(map);
  marker.bindPopup(popup);
});


