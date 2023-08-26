const getCardsData = async (charactersId) => {
  try {
    const results = await fetch(
      `https://rickandmortyapi.com/api/character/${charactersId}`
    );
    if (!results.ok) {
      throw new Error("something went wrong");
    }
    const data = await results.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export default getCardsData;
