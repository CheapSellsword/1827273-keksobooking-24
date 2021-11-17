
import * as data from './data.js';

const offers = data.getOffers();

const cardTemplate = document.querySelector('#card').content;
const popupClone = cardTemplate.querySelector('.popup').cloneNode(true);

const popupClones = [];

for (let i = 0; i < offers.length; i++) {

  popupClones.push(popupClone);
  //photoListFragments.push(photoListFragment);

  const title       = offers[i].offer.title;
  const address     = offers[i].offer.address;
  const price       = offers[i].offer.price;
  const type        = offers[i].offer.type;
  const rooms       = offers[i].offer.rooms;
  const guests      = offers[i].offer.guests;
  const checkin     = offers[i].offer.checkin;
  const checkout    = offers[i].offer.checkout;
  const features    = offers[i].offer.features;
  const photos      = offers[i].offer.photos;
  const avatar      = offers[i].author.avatar;
  const description = offers[i].offer.description;

  if (!title)       { popupClones[i].querySelector('.popup__title')         .classList.add('visually-hidden'); }
  if (!address)     { popupClones[i].querySelector('.popup__text--address') .classList.add('visually-hidden'); }
  if (!price)       { popupClones[i].querySelector('.popup__text--price')   .classList.add('visually-hidden'); }
  if (!type)        { popupClones[i].querySelector('.popup__type')          .classList.add('visually-hidden'); }
  if (!features)    { popupClones[i].querySelector('.popup__features')      .classList.add('visually-hidden'); }
  if (!photos)      { popupClones[i].querySelector('.popup__photos')        .classList.add('visually-hidden'); }
  if (!avatar)      { popupClones[i].querySelector('.popup__avatar')        .classList.add('visually-hidden'); }
  if (!description) { popupClones[i].querySelector('.popup__description')   .classList.add('visually-hidden'); }

  if (!rooms || !guests)     { popupClones[i].querySelector('.popup__text--capacity').classList.add('visually-hidden'); }
  if (!checkin || !checkout) { popupClones[i].querySelector('.popup__text--time').classList.add('visually-hidden'); }

  // <<< Заполнение блоков >>>
  popupClones[i].querySelector('.popup__title')          .textContent = title;
  popupClones[i].querySelector('.popup__text--address')  .textContent = address;
  popupClones[i].querySelector('.popup__description')    .textContent = description;
  popupClones[i].querySelector('.popup__text--price')    .textContent = `${price  } ₽/ночь`;
  popupClones[i].querySelector('.popup__text--capacity') .textContent = `${rooms  } комнаты для ${  guests  } гостей`;
  popupClones[i].querySelector('.popup__text--time')     .textContent = `Заезд после ${  checkin  }, выезд до ${  checkout}`;


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

  popupClones[i].querySelector('.popup__type').textContent = typeTitle;


  // <<< Выведение удобств в объявление >>>

  const featureContainer = popupClones[i].querySelector('.popup__features');

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

  const photoContainer = popupClones[i].querySelector('.popup__photos');
  const photoListFragment = document.createDocumentFragment();

  photos.forEach ((photo) => {
    const photoListItem = photoContainer.querySelector('.popup__photo').cloneNode(true);
    photoListItem.src = photo;
    photoListFragment.append(photoListItem);
  });

  photoContainer.querySelector('.popup__photo').remove();
  photoContainer.append(photoListFragment);


  popupClones[i].querySelector('.popup__avatar').src = avatar;

}

export {popupClones};

