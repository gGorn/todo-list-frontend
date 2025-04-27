import axios from "axios";

const API_UR = "https://api.themoviedb.org";

const randomLetter = () => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const randomIndex = Math.floor(Math.random() * letters.length);
  return letters[randomIndex];
};

export const list = async (search = "", page) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  search = search || randomLetter();
  return await axios.get(
    `${API_UR}/3/search/movie?api_key=${apiKey}&query=${search}&page=${page}`
  );
};