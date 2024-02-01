export const getGame = async (gameUrl, slug, gameSecret) => {
  const response = await fetch(`${gameUrl}/api/games/${slug}?&key=${gameSecret}`);

  return response;
}

export const getGenre = async (genreUrl) => {
  const response = await fetch(genreUrl);

  return response;
}

export const getGames = async (gamesUrl) => {
  const response = await fetch(gamesUrl);

  return response;
}

export const getSearchedGame = async (searchUrl) => {
  const response = await fetch(searchUrl);

  return response;
}

export const getMostPopularGames = async (gamesUrl) => {
  const response = await fetch(gamesUrl)

  return response;
}