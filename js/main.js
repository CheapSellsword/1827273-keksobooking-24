// Решения нашел здесь:
// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
// https://www.codegrepper.com/code-examples/javascript/one+digit+after+decimal+point+javascript+random+number


// Если передать значение «до» меньшее, чем значение «от», то они поменяются местами с помощью minSwap и maxSwap.
let minSwap;
let maxSwap;

function getRandomWholeNum(min, max) {
  if (min > max) {

    minSwap = min;
    maxSwap = max;
    max = minSwap;
    min = maxSwap;

  } if (min < 0 || min === max) {

    return (null);

  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomNumWithDecimals(min, max, decimals) {
  if (min > max) {

    minSwap = min;
    maxSwap = max;
    max = minSwap;
    min = maxSwap;

  } if (min < 0 || min === max) {

    return (null);

  }

  return Number((Math.random() * (max - min) + min).toFixed(decimals));
}

getRandomNumWithDecimals(1, 2, 3);
getRandomWholeNum(1, 2);
