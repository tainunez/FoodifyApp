import "./App.css";
import Axios from "axios";
import RecipeTile from "./components/RecipeTile";
import FavoriteTile from "./components/favoriteTile";
import { useState } from "react";

function App() {
  const [query, setquery] = useState("");
  const [recipes, setrecipes] = useState([]);
  const [favorites, setfavorites] = useState([]);
  const [healthlabel, sethealthlabel] = useState("vegetarian");

  const APP_ID = "8a99bf63";
  const APP_KEY = "48c446195f8931988191fdb35b80d712";

  var apiurl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&diet=balanced&health=${healthlabel}`;
  var dburl = "https://foodify-application.herokuapp.com/getFavoritedRecipes";

  async function getRecipes() {
    var result = await Axios.get(apiurl);
    setrecipes(result.data.hits);
  }

  async function getFavorites() {
    var result = await Axios.post(dburl);
    setfavorites(result.data.favorites);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  };

  const onClickViewFavorites = (e) => {
    e.preventDefault();
    setrecipes([]);
    getFavorites();
  };

  return (
    <div className="app">
      <title>Foodify</title>
      <h1 className="title">FOODIFY</h1>

      <form className="app__searchForm" onSubmit={onSubmit}>
        <div className="search">
          <input
            type="text"
            className="app__input"
            placeholder="enter ingredient"
            value={query}
            onChange={(e) => setquery(e.target.value)}
          />

          <select className="app__healthlabels">
            <option onClick={() => sethealthlabel("vegan")}>Vegan</option>
            <option onClick={() => sethealthlabel("vegetarian")}>
              Vegetarian
            </option>
            <option onClick={() => sethealthlabel("dairy-free")}>
              Dairy Free
            </option>
            <option onClick={() => sethealthlabel("egg-free")}>Egg Free</option>
            <option onClick={() => sethealthlabel("pork-free")}>
              Pork Free
            </option>
          </select>
          <input className="app__submit" type="submit" value="Search" />
          <button className="show__favorites" onClick={onClickViewFavorites}>
            View Favorites
          </button>
        </div>
      </form>

      <div className="app__recipes">
        {recipes?.map((recipe) => {
          return <RecipeTile recipe={recipe} />;
        })}
      </div>
      <div className="app_recipes">
        {favorites?.map((favorite) => {
          return <FavoriteTile favorite={favorite} />;
        })}
      </div>
    </div>
  );
}

export default App;
