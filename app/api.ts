'use server';

import recipes from "./recipes.json";

export async function fetchRecipes() {
  return recipes;
}
