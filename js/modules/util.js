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

function createArrayOfNums(start, end) {
  const myArray = [];
  // eslint-disable-next-line id-length
  for(let i = start; i <= end; i++) {

    // Добавил проверку на единичные числа, чтобы добавлять перед ними '0'.
    if (i < 10) {
      myArray.push(`0${  i}`);
    } else {
      myArray.push(i);
    }
  }
  return myArray;
}

function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = array[i];
    array[i] = array[j];
    array[j] = swap;
  }
  return array;
}

export {getRandomPositiveInteger, getRandomPositiveFloat, shuffleArray, createArrayOfNums};
