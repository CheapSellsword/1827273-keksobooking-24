// <<<Функции для получения случайных чисел>>>

function getRandomPositiveFloat (first, second, digits = 1) {

  const lower = Math.min(Math.abs(first), Math.abs(second));
  const upper = Math.max(Math.abs(first), Math.abs(second));

  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
}

function getRandomPositiveInteger (first, second) {

  const lower = Math.ceil(Math.min(Math.abs(first), Math.abs(second)));
  const upper = Math.floor(Math.max(Math.abs(first), Math.abs(second)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}


// <<<Функции для получения 10 не повторяющихся чисел для author>>>
// https://www.youtube.com/watch?v=WUOOMVaZRe4&ab_channel=KodeBase

function getNum (min, max) {
  const step1 = max - min + 1;
  const step2 = Math.random() * step1;

  const result = Math.floor(step2) + min;

  return result;
}

function createArrayOfNums(start, end) {
  const myArray = [];
  // eslint-disable-next-line id-length
  for(let i = start; i <= end; i++) {
    myArray.push(i);
  }

  return myArray;
}

const numsArray = createArrayOfNums(1, 10);

function getNonRepeatingNums () {
  const randomIndex = getNum(0, numsArray.length-1);
  const randomNum = numsArray[randomIndex];

  numsArray.splice(randomIndex, 1);
  if(randomNum < 10) {
    return `0${  randomNum}`;
  }

  return randomNum;
}


// <<<Функции для свойств объекта offer>>>

function getPlace () {
  const places = ['palace', 'house', 'bungalow', 'hotel', 'flat'];

  return places[getRandomPositiveInteger(0, places.length - 1)];
}

function getCheckInOut() {
  const checks = ['12:00', '13:00', '14:00'];

  return checks[getRandomPositiveInteger(0, checks.length - 1)];
}

function getRandomFeats () {
  const feats = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  return feats.slice(getRandomPositiveInteger(0, feats.length));
}

function getRandomPhotos () {
  const photos = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ];
  return photos.slice(getRandomPositiveInteger(0, photos.length - 1));
}

function getRandomTitle () {
  const titles = ['Прекрасный вид!', 'Удобное расположение!', 'Низкая цена!', 'Лучшее предложение!'];

  return titles[getRandomPositiveInteger(0, titles.length - 1)];
}


// <<<Функция для возвращения массива из 10 объявлений>>>

function getOffers () {

  const offersRequired = 10;
  const tenOffers = [];

  for (let authorCount = 0; authorCount < offersRequired; authorCount++) {
    const author = {
      avatar: `img/avatars/user${  getNonRepeatingNums()  }.png`,
    };

    const location = {
      lat: getRandomPositiveFloat(35.65, 35.7, 5),
      lng: getRandomPositiveFloat(139.7, 139.8, 5),
    };

    const offer = {
      title: getRandomTitle(),
      address: (`${location.lat  }, ${  location.lng}`),
      price: getRandomPositiveInteger(1000, 10000),
      type: getPlace(),
      rooms: getRandomPositiveInteger(1, 5),
      guests: getRandomPositiveInteger(1, 5),
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

export {getRandomPositiveInteger, getRandomPositiveFloat, getPlace, getCheckInOut, getRandomFeats, getOffers, getNum, createArrayOfNums, getNonRepeatingNums};

