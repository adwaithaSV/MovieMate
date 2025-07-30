const API_BASE_URL = 'http://127.0.0.1:5000/api'; // Replace with your backend URL

export const getToken = () => localStorage.getItem('token');
export const getUsername = () => localStorage.getItem('username');
export const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
};

const authHeader = () => {
  const token = getToken();
  return token ? { 'x-access-token': token } : {};
};

export const signup = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const login = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const getMovies = async () => {
  const response = await fetch(`${API_BASE_URL}/movies`, {
    headers: authHeader(),
  });
  return response.json();
};

export const addMovie = async (movieData) => {
  const response = await fetch(`${API_BASE_URL}/movies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(movieData),
  });
  return response.json();
};

export const updateMovie = async (movieId, movieData) => {
  const response = await fetch(`${API_BASE_URL}/movies/${movieId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(movieData),
  });
  return response.json();
};

export const deleteMovie = async (movieId) => {
  const response = await fetch(`${API_BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: authHeader(),
  });
  return response.json();
};