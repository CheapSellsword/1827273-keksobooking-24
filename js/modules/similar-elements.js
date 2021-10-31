/* eslint-disable */

import * as data from './data.js';

let offer = data.getOffers()[0];

let title       = offer.offer.title;
let address     = offer.offer.address;
let price       = offer.offer.price;
let type        = offer.offer.type;
let rooms       = offer.offer.rooms;
let guests      = offer.offer.guests;
let checkin     = offer.offer.checkin;
let checkout    = offer.offer.checkout;
let features    = offer.offer.features;
let description = offer.offer.description;
let photos      = offer.offer.photos;
let avatar      = offer.author.avatar;

const cardTemplate = document.querySelector('#card').content;
let popupClone = cardTemplate.querySelector('.popup').cloneNode(true);

popupClone.querySelector('.popup__title').innerHTML = title;
popupClone.querySelector('.popup__text--address').innerHTML = address;
popupClone.querySelector('.popup__text--price').innerHTML = price + ' ₽/ночь';
popupClone.querySelector('.popup__text--capacity').innerHTML = rooms + ' комнаты для ' + guests + ' гостей';
popupClone.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + checkin + ', выезд до ' + checkout;
popupClone.querySelector('.popup__description').innerHTML = description;


// <<< Сопоставление типов жилья с подписями >>>

let typeTitle;
let getTypeTitle = function (type) {

  if (type === 'flat') {
    typeTitle = 'Квартира';

  } else if (type === 'bungalow') {
    typeTitle = 'Бунгало';

  } else if (type === 'house') {
    typeTitle = 'Дом';

  } else if (type === 'palace') {
    typeTitle = 'Дворец';

  } else if (type === 'hotel') {
    typeTitle = 'Отель';

  } else { typeTitle = ''}

return typeTitle;
};

getTypeTitle(type);

popupClone.querySelector('.popup__type').innerHTML = typeTitle;


// <<< Выведение удобств в объявление >>>
// Применил решение из демонстрации 7.8

const featureContainer = popupClone.querySelector('.popup__features');
const featureListFragment = document.createDocumentFragment();

features.forEach ((feature) => {
  const featureListItem = featureContainer.querySelector('.popup__feature--' + feature);
  featureListFragment.append(featureListItem);
})


// <<< Выведение фотографий >>>

const photoContainer = popupClone.querySelector('.popup__photos');
const photoListFragment = document.createDocumentFragment();

  for (let i = 0; i < photos.length; i++ ) {
  let photoListItem = photoContainer.querySelector('.popup__photo').cloneNode(true);
  photoListItem.src = photos[i];
  photoListFragment.append(photoListItem);
  photoContainer.append(photoListFragment);
}

let notice = document.querySelector('.notice');
notice.appendChild(popupClone);

// Почему avatar = "img/avatars/userundefined.png"? Точнее, почему GetNonRepetingNums выдает undefined?
popupClone.querySelector('.popup__avatar').src = avatar;
console.log(data.getOffers()[0]);
