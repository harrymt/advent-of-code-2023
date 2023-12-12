const fs = require('fs');

fs.readFile('./in.csv', 'utf8', (_err, data) => {
  let output = 0;
  const lines = data.split('\n');
  const scratchCardsInstances = {};
  for (const line of lines) {
    const [left, right] = line.trim().split(' | ');
    const [id, winningNumbers] = left.trim().split(': ');
    const cardId = id.trim().replace('Card', '').trim();
    const numbers = winningNumbers
      .trim()
      .split(/[ ]+/)
      .map((i) => i.trim())
      .map(Number);
    const numbersYouHave = right.trim().split(/[ ]+/).map(Number);

    let cardsToWin = 0;

    for (const num of numbersYouHave) {
      if (numbers.includes(num)) {
        cardsToWin++;
      }
    }

    if (scratchCardsInstances[cardId]) {
      scratchCardsInstances[cardId]++;
    } else {
      scratchCardsInstances[cardId] = 1;
    }
    let timesToProcess = scratchCardsInstances[cardId];

    for (let time = 0; time < timesToProcess; time++) {
      for (let i = 1; i < cardsToWin + 1; i++) {
        const currentCard = Number(cardId);
        if (!scratchCardsInstances[currentCard + i]) {
          scratchCardsInstances[currentCard + i] = 1;
        } else {
          scratchCardsInstances[currentCard + i]++;
        }
      }
    }

    console.log(scratchCardsInstances);
  }

  for (const key in scratchCardsInstances) {
    output += scratchCardsInstances[key];
  }

  console.log(output);
});
