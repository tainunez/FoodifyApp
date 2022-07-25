import express from "express";
import SavedRecipe from "../models/SavedRecipe.js";

const router = express.Router();

//fetch all the user's favorited recipes
router.get("/savedrecipes", async (req, res) => {
  try {
    const favoritedRecipes = await SavedRecipe.find();

    res.status(200).json({ favoritedRecipes });
    console.log(req.body);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//get all favorites
router.post("/getFavoritedRecipes", (req, res) => {
  SavedRecipe.find().exec((err, favorites) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, favorites });
  });
});

//find favorite information inside favorite collection by title and userFrom
router.post("/savedrecipes", async (req, res) => {
  SavedRecipe.find({ title: req.body.title }).exec((err, favorite) => {
    if (err) return res.send("post route error bruh");

    //return if the user has already favorited this movie before in order to update favorite button
    let result = false;
    if (favorite.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, result });
    console.log(req.body);
  });
});

//add a recipe to favorites in the db
router.post("/addToFavorites", (req, res) => {
  const favorite = new SavedRecipe(req.body);

  favorite.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

//remove a recipe from favorites
router.post("/removeFromFavorites", (req, res) => {
  SavedRecipe.findOneAndDelete({ title: req.body.title }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, doc });
  });
});

export default router;
