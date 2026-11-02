import styles from "./RecipeCard.module.css";

import { Recipe } from "@/types";
import { antonSans } from "@/app/fonts";

export default function RecipeCard({recipe}: {recipe: Recipe}) {
  return (
    <article className={styles.card}>
      <div className={styles.thumbnail} style={{backgroundImage: `url("/recipe_images/${recipe.image}")`}}>
        <p className={styles.time}>{recipe.time}min</p>
      </div>
      <h3 className={antonSans.className}>{recipe.name}</h3>
      <section>
        <h4>Recette</h4>
        <p className={styles.description}>{recipe.description}</p>
      </section>
      <section>
        <h4>Ingrédients</h4>
        <div className={styles.ingredientList}>
          {recipe.ingredients.map((ingredient, index) =>
            <div key={index} className={styles.ingredient}>
              <p>{ingredient.ingredient}</p>
              <p className={styles.quantity}>{ingredient.quantity} {ingredient.unit}</p>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
