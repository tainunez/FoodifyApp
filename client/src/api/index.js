import axios from "axios";

const url = "http://localhost:5000/savedrecipes";

export const fetchPosts = () => axios.get(url);
export const favoriteRecipe = (recipe) => axios.post(url, recipe);
