// authService.js
export const registerUser = async (apiUrl, username, email, password, passwordConfirmation) => {
  const response = await fetch(`${apiUrl}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: username,
      email,
      password,
      password_confirmation: passwordConfirmation,
    }),
  });

  return response;
};

export const loginUser = async (apiUrl, email, password) => {
  const response = await fetch(`${apiUrl}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return response;
};

export const viewProfile = async (apiUrl, token) => {
  const response = await fetch(`${apiUrl}/api/users/view-profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
