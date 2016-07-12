const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateSpikePositions = () => {
  const spikePositions = [];
  const spikeStart = 1000;
  for (var i = 0; i < 25; i++) {
    spikePositions.push({
      left: spikeStart + (i * random(350, 500)),
      top: 0
    });
  }
  return spikePositions;
};