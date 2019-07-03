const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getUsers = async () => {
  return fetch(`${BASE_URL}/users`).then(response => response.json());
};

export const getUser = async userId => {
  return fetch(`${BASE_URL}/users/${userId}`).then(response => response.json());
};

export const getPosts = async (userId) => {
  const posts = await fetch(`${BASE_URL}/posts`).then(response => response.json());
  return posts.filter(post => post.userId === userId);
};

export const getComments = async (postId) => {
  const posts = await fetch(`${BASE_URL}/comments`).then(response => response.json());
  return posts.filter(post => post.postId === postId);
};