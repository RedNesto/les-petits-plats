'use server';

import recipes from "./recipes.json";

export async function fetchRecipes() {
  return recipes;
}

export async function fetchRecipe(slug: string) {
  return recipes.find(recipe => recipe.slug === slug);
}
