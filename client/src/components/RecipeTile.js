import React from "react";
import "../RecipeTile.css";
import Favorite from "./favoriteButton";

export default function RecipeTile({ recipe }) {
  const recipeName = recipe["recipe"]["label"];
  const recipeLink = recipe["recipe"]["url"];
  const calories = recipe["recipe"]["calories"].toFixed(0);
  const image = recipe["recipe"]["image"];
  return (
    image.match(/|.(jpeg|jpg|gif|png)$/) != null && (
      <div className="recipeTile">
        <img
          className="recipeTile__image"
          src={image}
          alt="recipe tile img"
        ></img>
        <div className="flex__container">
          <p className="recipeTile__name">{recipeName}</p>
          <a className="view__button" href={recipeLink}>
            View Recipe
          </a>
        </div>
        <div className="flex__container">
          <p className="item__data">Calories: {calories} </p>
          <Favorite
            title={recipeName}
            calories={calories}
            image={image}
            recipeLink={recipeLink}
          ></Favorite>
        </div>
      </div>
    )
  );
}
