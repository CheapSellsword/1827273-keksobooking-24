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
let roomNumbers = roomNumberSelect.children;

let capacitySelect = adForm.querySelector('#capacity')
let capacity = capacitySelect.children;

//function onRoomChange (evt) {
//  if (evt.target.matches('option')) {
//    console.log('o')
//  }
//}

roomNumberSelect.addEventListener('click', () => {

if (roomNumbers[0].selected && !capacity[0]) {
  roomNumberSelect.setCustomValidity('nooooooo')
}
})



//console.log(roomNumberSelect);
//console.log(roomNumbers);
//console.log(capacitySelect);
//console.log(priceInput.value)
//console.log(titleInput.validity)
//console.log(priceInput);
//console.log(adForm);

