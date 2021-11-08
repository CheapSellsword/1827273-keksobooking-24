import * as data from './data.js';

const offer = data.getOffers()[0];

const title       = offer.offer.title;
const address     = offer.offer.address;
const price       = offer.offer.price;
const type        = offer.offer.type;
const rooms       = offer.offer.rooms;
const guests      = offer.offer.guests;
const checkin     = offer.offer.checkin;
const checkout    = offer.offer.checkout;
const features    = offer.offer.features;
const photos      = offer.offer.photos;
const avatar      = offer.author.avatar;
const description = offer.offer.description;

const cardTemplate = document.querySelector('#card').content;
const popupClone = cardTemplate.querySelector('.popup').cloneNode(true);

// Не уверен что это лучший способ скрывать блоки при отсутствии данных. Можете посоветовать как сделать по другому или, всё-таки, оставить так?
if (!title)       { popupClone.querySelector('.popup__title').classList.add('visually-hidden'); }
if (!address)     { popupClone.querySelector('.popup__text--address').classList.add('visually-hidden'); }
if (!price)       { popupClone.querySelector('.popup__text--price').classList.add('visually-hidden'); }
if (!type)        { popupClone.querySelector('.popup__type').classList.add('visually-hidden'); }
if (!features)    { popupClone.querySelector('.popup__features').classList.add('visually-hidden'); }
if (!photos)      { popupClone.querySelector('.popup__photos').classList.add('visually-hidden'); }
if (!avatar)      { popupClone.querySelector('.popup__avatar').classList.add('visually-hidden'); }
if (!description) { popupClone.querySelector('.popup__description').classList.add('visually-hidden'); }

if (!rooms || !guests)     { popupClone.querySelector('.popup__text--capacity').classList.add('visually-hidden'); }
if (!checkin || !checkout) { popupClone.querySelector('.popup__text--time').classList.add('visually-hidden'); }

// <<< Заполнение блоков >>>
popupClone.querySelector('.popup__title').textContent = title;
popupClone.querySelector('.popup__text--address').textContent = address;
popupClone.querySelector('.popup__text--price').textContent = `${price  } ₽/ночь`;
popupClone.querySelector('.popup__text--capacity').textContent = `${rooms  } комнаты для ${  guests  } гостей`;
popupClone.querySelector('.popup__text--time').textContent = `Заезд после ${  checkin  }, выезд до ${  checkout}`;
popupClone.querySelector('.popup__description').textContent = description;

// <<< Сопоставление типов жилья с подписями >>>

let typeTitle;
// eslint-disable-next-line no-shadow
const getTypeTitle = function (type) {

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

  } else { typeTitle = '';}

  return typeTitle;
};

getTypeTitle(type);

popupClone.querySelector('.popup__type').textContent = typeTitle;


// <<< Выведение удобств в объявление >>>

const featureContainer = popupClone.querySelector('.popup__features');

for (let i = 0; i < featureContainer.children.length; i++) {
  featureContainer.children[i].classList.add('visually-hidden');
}

const featureListFragment = document.createDocumentFragment();

features.forEach ((feature) => {
  const featureListItem = featureContainer.querySelector(`.popup__feature--${  feature}`);
  featureListItem.classList.remove('visually-hidden');
  featureListFragment.append(featureListItem);
});

featureContainer.append(featureListFragment);


// <<< Выведение фотографий >>>

const photoContainer = popupClone.querySelector('.popup__photos');
const photoListFragment = document.createDocumentFragment();

for (let i = 0; i < photos.length; i++ ) {
  const photoListItem = photoContainer.querySelector('.popup__photo').cloneNode(true);
  photoListItem.src = photos[i];
  photoListFragment.append(photoListItem);
}

photoContainer.querySelector('.popup__photo').remove();

photoContainer.append(photoListFragment);

popupClone.querySelector('.popup__avatar').src = avatar;

//const mapCanvas = document.querySelector('#map-canvas');
//mapCanvas.append(popupClone);
