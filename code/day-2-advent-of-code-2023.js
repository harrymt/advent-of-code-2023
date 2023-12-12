const fs = require('fs');

fs.readFile('./in.csv', 'utf8', (_err, data) => {
  let output = 0;
  const lines = data.split('\n');
  for (const line of lines) {
    const [gameTitle, games] = line.split(': ');
    const [_, id] = gameTitle.split(' ');

    const maximums = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (const game of games.split('; ')) {
      const colours = game.split(', ');
      for (const colour of colours) {
        const [amount, type] = colour.split(' ');

        maximums[type] = Math.max(maximums[type], Number(amount));
      }
    }

    output += maximums.red * maximums.green * maximums.blue;
  }
  console.log(output);
});
