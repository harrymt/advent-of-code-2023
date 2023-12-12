const fs = require('fs');

fs.readFile('./in.csv', 'utf8', (_err, data) => {
  let output = 0;
  const lines = data.split('\n');
  for (const line of lines) {
    const parts = line.split('');

    let leftValue = null;
    let rightValue = null;
    let isLeftWord = '';
    let isRightWord = '';
    let left = 0;
    let right = parts.length - 1;
    let found = false;

    while (left < right) {
      if (leftValue === null) {
        if (isNaN(parts[left])) {
          isLeftWord = `${isLeftWord}${parts[left]}`;
          const foundNum = findNumber(isLeftWord);
          if (foundNum) {
            leftValue = foundNum;
          } else {
            left++;
            continue;
          }
        } else {
          leftValue = parts[left];
        }
      }
      if (rightValue === null) {
        if (isNaN(parts[right])) {
          isRightWord = `${parts[right]}${isRightWord}`;
          const foundNum = findNumber(isRightWord);
          if (foundNum) {
            rightValue = foundNum;
          } else {
            right--;
            continue;
          }
        } else {
          rightValue = parts[right];
        }
      }
      output += Number(`${leftValue}${rightValue}`);
      found = true;
      break;
    }
    if (!found) {
      output += Number(`${parts[left]}${parts[right]}`);
    }
  }
  console.log(output);
});

// 55218

const numbers = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

const numbersToValue = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const findNumber = (word) => {
  for (const num of numbers) {
    if (word.includes(num)) {
      return numbersToValue[num];
    }
  }
  return null;
};
