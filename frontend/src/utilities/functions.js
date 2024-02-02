export function capitalized(word) {
  return word[0].toUpperCase() + word.slice(1);
}

export function millToHour(timeInSeconds) {
  // Convert milliseconds to minutes
  let minutes = timeInSeconds / (1000 * 60);

  // Calculate the whole hours
  let hours = Math.floor(minutes / 60);

  // Calculate the remaining minutes
  let remainingMinutes = minutes % 60;

  // let remainingSeconds = timeInSeconds % 3600;  // Calculate remaining seconds
  return `${hours}h ${remainingMinutes.toFixed(0)}min`;
}

export const formatUsername = (username) => {
  // Split the input username into an array of two elements: firstName and lastName
  // If there is no space in the input, 
  // default values of empty strings are assigned to both firstName and lastName.
  const [firstName = "", lastName = ""] = username.split(' ');

  // Extract the first letter of the firstName and capitalize it,
  return `${firstName.slice(0, 1).toUpperCase()}${lastName.slice(0, 1).toUpperCase()}`;
};