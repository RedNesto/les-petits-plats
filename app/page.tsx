'use client';

import SearchFilterList from "@/components/SearchFilter";
import SearchBar from "@/components/SearchBar";
import styles from "./page.module.css";
import { antonSans } from "@/app/fonts";
import Image from "next/image";
import Link from "next/link";
import { startTransition, useEffect, useMemo, useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@/types";

import { normalizeForSearch } from "@/app/utils";
import { fetchRecipes } from "@/app/api";
import TagList from "@/components/TagList";

type SearchFilterConfig = {
  label: string;
  searchMatcher: (tags: string[], recipe: Recipe) => boolean;
}

const filters: SearchFilterConfig[] = [
  { label: "Ingrédients", searchMatcher: (tags, recipe) => tags.every(tag => recipe.ingredients.some(ingredient => ingredient.ingredient === tag)) },
  { label: "Appareils", searchMatcher: (tags, recipe) => tags.includes(recipe.appliance) },
  { label: "Ustensils", searchMatcher: (tags, recipe) => tags.every(tag => recipe.ustensils.includes(tag)) }
]

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const normalizedSearchValue = useMemo(() => normalizeForSearch(searchValue), [searchValue]);
  const [filterSelectedTags, setFilterSelectedTags] = useState<string[][]>(() => filters.map(() => []));
  const setTagSelected = (filterIndex: number, tag: string, selected: boolean) => {
    const newSelectedTags = filterSelectedTags?.map((tags, index) => {
      if (index === filterIndex) {
        const newSelection = Array.from(tags);
        if (selected) {
          newSelection.push(tag);
        } else {
          newSelection.splice(newSelection.indexOf(tag), 1);
        }
        return newSelection;
      }

      return tags;
    })
    setFilterSelectedTags(newSelectedTags);
  }

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    startTransition(async () => {
      setRecipes(await fetchRecipes() as unknown as Recipe[]);
    })
  }, [])

  const matchingRecipes = recipes.filter(recipe => {
    const allFiltersMatch = filters.every((filter, filterIndex) => {
      const selectedTags = filterSelectedTags[filterIndex];
      return selectedTags.length <= 0 || filter.searchMatcher(selectedTags, recipe)
    })
    if (!allFiltersMatch) {
      return false;
    }

    if (normalizedSearchValue.length < 3) {
      return true;
    }

    return normalizeForSearch(recipe.name).includes(normalizedSearchValue)
      || recipe.ingredients.some(ingredient => normalizeForSearch(ingredient.ingredient).includes(normalizedSearchValue))
      || recipe.ustensils.some(utensil => normalizeForSearch(utensil).includes(normalizedSearchValue))
      || normalizeForSearch(recipe.appliance).includes(normalizedSearchValue)
      || normalizeForSearch(recipe.description).includes(normalizedSearchValue);
  });

  const visibleIngredients = new Set<string>();
  const visibleUtensils = new Set<string>();
  const visibleAppliances = new Set<string>();
  for (const recipe of matchingRecipes) {
    recipe.ingredients.forEach(ingredient => visibleIngredients.add(ingredient.ingredient));
    recipe.ustensils.forEach(utensil => visibleUtensils.add(utensil));
    visibleAppliances.add(recipe.appliance);
  }

  const filterItems = [
    Array.from(visibleIngredients),
    Array.from(visibleAppliances),
    Array.from(visibleUtensils),
  ];

  const allSelectedTags = filterSelectedTags
    .flatMap((byFilter, index) =>
      byFilter.map(tag => ({ filterIndex: index, label: tag })))

  return (
    <>
      <header className={styles.searchHeader}>
        <Link href={"/"}><Image className={styles.logo} src="/logo.png" width={207} height={25} alt="Logo"/></Link>
        <div className={styles.searchBar}>
          <SearchBar searchValue={searchValue} setSearchValue={setSearchValue}/>
        </div>
        <p className={styles.tagline + " " + antonSans.className}>DÉCOUVREZ NOS RECETTES<br/>DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES</p>
      </header>
      <main className={styles.content}>
        <div className={styles.topBar}>
          <div>
            <div className={styles.filters}>
              {filters.map((filter, index) =>
                <SearchFilterList key={index} label={filter.label} items={filterItems[index]}
                                  selectedTags={filterSelectedTags[index]}
                                  setSelectionAction={(tag, selected) => setTagSelected(index, tag, selected)}/>
              )}
            </div>
            <TagList tags={allSelectedTags} removeTag={(filterIndex, tag) => setTagSelected(filterIndex, tag, false)}/>
          </div>
          <p className={styles.recipeCount + " " + antonSans.className}>{matchingRecipes.length} recettes</p>
        </div>
        <div className={styles.recipeList}>
          {matchingRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe}/>)}
        </div>
      </main>
    </>
  );
}
