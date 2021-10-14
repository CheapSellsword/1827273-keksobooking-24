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
  const place = places[Math.floor(Math.random()*places.length)];

  return place;
}

function getCheckInOut() {
  const checks = ['12:00', '13:00', '14:00'];
  const checkInOut = checks[Math.floor(Math.random()*checks.length)];

  return checkInOut;
}

function getRandomFeats () {
  const feats = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const randomFeats = feats.slice(getRandomPositiveInteger(0, feats.length));

  return randomFeats;
}

function getRandomPhotos () {
  const photos = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ];
  const randomPhotos = photos.slice(getRandomPositiveInteger(0, photos.length - 1));

  return randomPhotos;
}

function getRandomTitle () {
  const titles = ['Прекрасный вид!', 'Удобное расположение!', 'Низкая цена!', 'Лучшее предложение!'];
  const randomTitle = titles[Math.floor(Math.random()*titles.length)];

  return randomTitle;
}


// <<<Функция для возвращения массива из 10 предложений>>>

function getOffers () {

  const tenOffers = [];
  // eslint-disable-next-line id-length
  for (let i = 0; i < 10; i++) {
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

    const description = function getDescription() {
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

    description();

    const authorPlusOffer = Object.assign({}, author, offer);
    tenOffers.push(authorPlusOffer);
  }

  return tenOffers;
}

getOffers();
