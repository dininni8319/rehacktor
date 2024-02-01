export function capitalized(word) {
  return word[0].toUpperCase()  + word.slice(1);
}

export function millToHour(n) {
  let time = n / (1000 * 60);
  let hours = Math.floor(time / 60);
  let minutes = time % 60;

  return `${hours}h ${minutes.toFixed(0)}min`;
}

export const formatUsername = (username) => {
  const [firstName = "", lastName = ""] = username.split(' ');

  return `${firstName.slice(0, 1).toUpperCase()}${lastName.slice(0, 1).toUpperCase()}`;
};