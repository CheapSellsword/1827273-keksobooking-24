// Решения нашел здесь:
// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
// https://www.codegrepper.com/code-examples/javascript/one+digit+after+decimal+point+javascript+random+number


// Если передать значение «до» меньшее, чем значение «от», то они поменяются местами с помощью функции swapAndRoundNums. Дополнительно, эта функция округляет числа.

function swapAndRoundNums(a, b) {
  a = Math.ceil(a);
  b = Math.floor(b);

  if (a > b) {
    let swap = a;
    a = b;
    b = swap;
  }

 //https://stackoverflow.com/questions/27142657/how-to-write-a-function-that-returns-an-error-in-javascript
  if (a < 0 || a === b) {
    throw new Error("Числа не должны быть отрицательными или равными друг-другу.");
  }

};

function getRandomWholeNum(min, max) {

  swapAndRoundNums(min, max);

  return Math.floor(Math.random() * (max - min)) + min;
};


function getRandomNumWithDecimals(min, max, decimals) {

  swapAndRoundNums(min, max);

  return Number((Math.random() * (max - min) + min).toFixed(decimals));
};
