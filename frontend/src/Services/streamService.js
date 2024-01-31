export const getActiveRooms = async (url) => {
  const response = await  fetch(url);
  
  return response;
}