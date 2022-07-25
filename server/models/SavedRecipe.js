import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
  title: String,
  calories: String,
  image: String,
  recipeLink: String,
});

var SavedRecipe = mongoose.model("SavedRecipe", recipeSchema);
export default SavedRecipe;
