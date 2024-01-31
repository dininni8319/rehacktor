export const getGame = async (gameUrl, slug, gameSecret) => {
  const response = await fetch(`${gameUrl}/api/games/${slug}?&key=${gameSecret}`);

  return response;
}

export const getGenre = async (genreUrl) => {
  const response = await fetch(genreUrl);

  return response;
}