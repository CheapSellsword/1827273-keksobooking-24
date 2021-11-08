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

const currentSelectedTypeValue = typeSelect.options[typeSelect.selectedIndex].value;
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
timeOutSelect.addEventListener('change', onTimeOutChange);

function onTimeInChange(evt) {
  syncSelectedTimeIn(evt.target.selectedIndex);
}
function onTimeOutChange(evt) {
  syncSelectedTimeOut(evt.target.selectedIndex);
}

function syncSelectedTimeIn(selectedTimeInIndex) {
  timeOutSelect.selectedIndex = selectedTimeInIndex;
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

// eslint-disable-next-line no-unused-vars
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
enablePage();
