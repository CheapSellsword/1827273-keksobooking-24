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


export {getRandomPositiveInteger, getRandomPositiveFloat, getNum, createArrayOfNums, getNonRepeatingNums};
