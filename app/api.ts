'use server';

import recipes from "./recipes.json";
import { Recipe } from "@/types";

export async function fetchRecipes(): Promise<Recipe[]> {
  return recipes as Recipe[];
}

export async function fetchRecipe(slug: string): Promise<Recipe> {
  return recipes.find(recipe => recipe.slug === slug) as Recipe;
}
