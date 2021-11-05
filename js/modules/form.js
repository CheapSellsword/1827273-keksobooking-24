/* eslint-disable */

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;

let adForm = document.querySelector('.ad-form');
adForm.action = 'https://24.javascript.pages.academy/keksobooking';


// <<< Валидация заголовка >>>

let titleInput = adForm.querySelector('#title');

titleInput.required = true;

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`)
  }

  else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`)
  }

  else {
    titleInput.setCustomValidity('')
  }

  titleInput.reportValidity();
})


// <<< Валидация цены >>>

let priceInput = adForm.querySelector('#price');

priceInput.required = true;

priceInput.addEventListener('input', () => {

  if (priceInput.value > MAX_PRICE) {
    priceInput.setCustomValidity(`Максимальная цена - ${ MAX_PRICE }`)
  }

  else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
})


// <<< Валидация комнат и гостей >>>

let roomNumberSelect = adForm.querySelector('#room_number');
let capacitySelect = adForm.querySelector('#capacity')

let roomOptions = roomNumberSelect.querySelectorAll('option');
let capacityOptions = capacitySelect.querySelectorAll('option');

capacitySelect.innerHTML='';
capacitySelect.appendChild(capacityOptions[2]);

function giveSelection(roomValue) {
  capacitySelect.innerHTML='';

    if (roomValue == 1) {
      capacitySelect.appendChild(capacityOptions[2]);

    } else if (roomValue == 2) {
      capacitySelect.appendChild(capacityOptions[2]);
      capacitySelect.appendChild(capacityOptions[1]);

    } else if (roomValue == 3) {
      capacitySelect.appendChild(capacityOptions[2]);
      capacitySelect.appendChild(capacityOptions[1]);
      capacitySelect.appendChild(capacityOptions[0]);

    } else {
      capacitySelect.appendChild(capacityOptions[3]);
    }
}

function onRoomChange (evt) {

    giveSelection(evt.target.value)

    console.log(evt.target.value)
    console.log(capacitySelect)
}

roomNumberSelect.addEventListener('change', onRoomChange)


console.log(capacityOptions);
console.log(roomNumberSelect);
//console.log(roomNumbers);
console.log(capacitySelect);
//console.log(priceInput.value)
//console.log(titleInput.validity)
//console.log(priceInput);
//console.log(adForm);


  /*for (let i = 0; i < capacityOptions.length; i++) {

    if (capacityOptions[i].value === roomValue) {
      capacitySelect.appendChild(capacityOptions[i]);

    } else if (capacityOptions[i].value !== roomValue) {
      capacitySelect.appendChild(capacityOptions[3])
    }
  }*/
