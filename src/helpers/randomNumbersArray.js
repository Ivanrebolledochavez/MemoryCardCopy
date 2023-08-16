const randomNumbersArray = (numberOfCards) => {
  const randomNumberSet = new Set();
  const arrayLength = numberOfCards;
  const maxRandomNumber = 820;

  while (randomNumberSet.size < arrayLength) {
    const randomNumber = Math.floor(Math.random() * maxRandomNumber) + 1;
    randomNumberSet.add(randomNumber);
  }
  return Array.from(randomNumberSet);
};

export default randomNumbersArray;
