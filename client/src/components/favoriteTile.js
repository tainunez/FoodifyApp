import React from "react";
import "../RecipeTile.css";
import Favorite from "../components/favoriteButton";

export default function FavoriteTile({ favorite }) {
  const recipeName = favorite.title;
  const recipeLink = favorite.recipeLink;
  const calories = favorite.calories;
  const image = favorite.image;
  console.log(image);
  return (
    favorite.image.match(/|.(jpeg|jpg|gif|png)$/) != null && (
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
