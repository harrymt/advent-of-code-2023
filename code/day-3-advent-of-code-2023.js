const fs = require('fs');

fs.readFile('./in.csv', 'utf8', (_err, data) => {
  let output = {};
  let rows = data.split('\n');
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    const columns = row.split('');

    // List of all the gears
    let foundParts = [];
    // Current gear detected
    let foundPart = '';
    let currentNumber = null;
    for (let c = 0; c < columns.length; c++) {
      const col = columns[c];
      if (!isNaN(Number(col))) {
        currentNumber = `${currentNumber || ''}${col}`;

        if (rows[r - 1]?.[c] === '*') {
          if (!foundParts.includes(`${r - 1}-${c}`)) {
            foundParts.push(`${r - 1}-${c}`);
          }
          foundPart = `${r - 1}-${c}`;
        }
        if (rows[r - 1]?.[c - 1] === '*') {
          if (!foundParts.includes(`${r - 1}-${c - 1}`)) {
            foundParts.push(`${r - 1}-${c - 1}`);
          }
          foundPart = `${r - 1}-${c - 1}`;
        }
        if (rows[r - 1]?.[c + 1] === '*') {
          if (!foundParts.includes(`${r - 1}-${c + 1}`)) {
            foundParts.push(`${r - 1}-${c + 1}`);
          }
          foundPart = `${r - 1}-${c + 1}`;
        }
        if (rows[r + 1]?.[c] === '*') {
          if (!foundParts.includes(`${r + 1}-${c}`)) {
            foundParts.push(`${r + 1}-${c}`);
          }
          foundPart = `${r + 1}-${c}`;
        }
        if (rows[r + 1]?.[c - 1] === '*') {
          if (!foundParts.includes(`${r + 1}-${c - 1}`)) {
            foundParts.push(`${r + 1}-${c - 1}`);
          }
          foundPart = `${r + 1}-${c - 1}`;
        }
        if (rows[r + 1]?.[c + 1] === '*') {
          if (!foundParts.includes(`${r + 1}-${c + 1}`)) {
            foundParts.push(`${r + 1}-${c + 1}`);
          }
          foundPart = `${r + 1}-${c + 1}`;
        }
        if (rows[r]?.[c - 1] === '*') {
          if (!foundParts.includes(`${r}-${c - 1}`)) {
            foundParts.push(`${r}-${c - 1}`);
          }
          foundPart = `${r}-${c - 1}`;
        }
        if (rows[r]?.[c + 1] === '*') {
          if (!foundParts.includes(`${r}-${c + 1}`)) {
            foundParts.push(`${r}-${c + 1}`);
          }
          foundPart = `${r}-${c + 1}`;
        }
      } else {
        if (currentNumber !== null && foundPart) {
          console.log('Adding to', currentNumber);
          if (output[foundPart]) {
            output[foundPart] = [...output[foundPart], Number(currentNumber)];
          } else {
            output[foundPart] = [Number(currentNumber)];
          }
          foundPart = '';
        }
        currentNumber = null;
      }
    }
    if (currentNumber !== null && foundPart) {
      console.log('Adding', currentNumber);
      if (output[foundPart]) {
        output[foundPart] = [...output[foundPart], Number(currentNumber)];
      } else {
        output[foundPart] = [Number(currentNumber)];
      }
      foundPart = '';
      currentNumber = null;
    }
  }
  console.log(output);
  let sum = 0;
  for (const gear of Object.keys(output)) {
    console.log('gear', gear, output[gear]);
    if (output[gear].length === 2) {
      sum += output[gear][0] * output[gear][1];
    }
  }
  console.log('sum', sum);
});
