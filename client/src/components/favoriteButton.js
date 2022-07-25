import React, { useEffect, useState } from "react";
import Heart from "./heart.js";
import axios from "axios";

function Favorite(props) {
  const BASE_URL = "https://foodify-application.herokuapp.com";
  const [active, setActive] = useState(false);
  const variable = {
    title: props.title,
    calories: props.calories,
    image: props.image,
    recipeLink: props.recipeLink,
  };

  useEffect(() => {
    //check if movie has already been favorited before if success, then set the heart to active
    axios.post(BASE_URL + "/savedrecipes", variable).then((response) => {
      if (response.data.success) {
        setActive(response.data.result);
      } else {
        alert("Failed to get favorite info");
      }
    });
  }, []);

  const onClickFavorite = () => {
    if (active) {
      //if recipe is already added
      axios
        .post(BASE_URL + "/removeFromFavorites", variable)
        .then((response) => {
          if (response.data.success) {
            setActive(!active);
          } else {
            alert("Failed to remove from favorites");
          }
        });
    } else {
      //if recipe has not yet been added to favorites
      axios.post(BASE_URL + "/addToFavorites", variable).then((response) => {
        if (response.data.success) {
          setActive(!active);
        } else {
          alert("Failed to add to favorites");
        }
      });
    }
  };

  return (
    <div style={{ width: "2rem" }}>
      <Heart
        isActive={active}
        onClick={() => onClickFavorite()}
        animationScale={1.25}
      ></Heart>
    </div>
  );
}

export default Favorite;
