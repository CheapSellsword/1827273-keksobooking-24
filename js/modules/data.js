import * as util from './util.js';

// <<<Функции для свойств объекта offer>>>

function getPlace () {
  const places = ['palace', 'house', 'bungalow', 'hotel', 'flat'];

  return places[util.getRandomPositiveInteger(0, places.length - 1)];
}

function getCheckInOut() {
  const checks = ['12:00', '13:00', '14:00'];

  return checks[util.getRandomPositiveInteger(0, checks.length - 1)];
}

function getRandomFeats () {
  const feats = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  return feats.slice(util.getRandomPositiveInteger(0, feats.length));
}

function getRandomPhotos () {
  const photos = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ];
  return photos.slice(util.getRandomPositiveInteger(0, photos.length - 1));
}

function getRandomTitle () {
  const titles = ['Прекрасный вид!', 'Удобное расположение!', 'Низкая цена!', 'Лучшее предложение!'];

  return titles[util.getRandomPositiveInteger(0, titles.length - 1)];
}


// <<<Функция для возвращения массива из 10 объявлений>>>

function getOffers () {

  const offersRequired = 10;
  const tenOffers = [];
  const numsArray = util.createArrayOfNums(1, offersRequired);
  const shuffledNums = util.shuffleArray(numsArray);

  for (let authorCount = 0; authorCount < offersRequired; authorCount++) {
    const author = {
      avatar: `img/avatars/user${ shuffledNums[authorCount]  }.png`,
    };

    const location = {
      lat: util.getRandomPositiveFloat(35.65, 35.7, 5),
      lng: util.getRandomPositiveFloat(139.7, 139.8, 5),
    };

    const offer = {
      title: getRandomTitle(),
      address: (`${location.lat  }, ${  location.lng}`),
      price: util.getRandomPositiveInteger(1000, 10000),
      type: getPlace(),
      rooms: util.getRandomPositiveInteger(1, 5),
      guests: util.getRandomPositiveInteger(1, 5),
      checkin: getCheckInOut(),
      checkout: getCheckInOut(),
      features: getRandomFeats(),
      description: '',
      photos: getRandomPhotos(),
    };

    const getDescription = function () {
      let descriptionText = '';

      if (offer.type === 'palace') {
        descriptionText = 'Шикарный дворец.';
      } else if (offer.type === 'flat') {
        descriptionText = 'Хорошая квартира.';
      } else if (offer.type === 'house') {
        descriptionText = 'Теплый дом.';
      } else if (offer.type === 'bungalow') {
        descriptionText = 'Уютное бунгало.';
      } else if (offer.type === 'hotel') {
        descriptionText = 'Популярный отель.';
      }

      offer.description = descriptionText;
    };

    getDescription();

    const authorPlusOffer = {author, offer};
    tenOffers.push(authorPlusOffer);
  }

  return tenOffers;
}

getOffers();

export {getPlace, getCheckInOut, getRandomFeats, getOffers};
