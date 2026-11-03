import Header from "@/components/Header";
import { fetchRecipe } from "@/app/api";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { antonSans } from "@/app/fonts";

export const instant = false;

type RecipePageProps = {
  params: Promise<{ slug: string; }>;
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await fetchRecipe(slug);
  if (!recipe) {
    notFound();
  }

  return (
    <>
      <Header/>
      <main className={styles.content}>
        <div className={styles.picture} style={{ backgroundImage: `url('/recipe_images/${recipe.image}')` }}/>
        <article>
          <h2 className={antonSans.className}>{recipe.name}</h2>
          <section>
            <h3>Temps de préparation</h3>
            <p className={styles.time}>{recipe.time}min</p>
          </section>
          <section>
            <h3>Ingrédients</h3>
            <div className={styles.ingredientList}>
              {recipe.ingredients.map((ingredient, index) =>
                <div key={index} className={styles.ingredient}>
                  <p>{ingredient.ingredient}</p>
                  <p className={styles.quantity}>{ingredient.quantity} {ingredient.unit}</p>
                </div>
              )}
            </div>
          </section>
          <section>
            <h3>Ustensils nécessaires</h3>
            <div className={styles.ingredientList}>
              {recipe.ustensils.map((utensil, index) =>
                <div key={index} className={styles.ingredient}>
                  <p>{utensil}</p>
                  <p className={styles.quantity}>1</p>
                </div>
              )}
            </div>
          </section>
          <section>
            <h3>Appareils nécessaires</h3>
            <div className={styles.ingredientList}>
              <div className={styles.ingredient}>
                <p>{recipe.appliance}</p>
                <p className={styles.quantity}>1</p>
              </div>
            </div>
          </section>
          <section>
            <h3>Recette</h3>
            <p>{recipe.description}</p>
          </section>
        </article>
      </main>
    </>
  );
}
