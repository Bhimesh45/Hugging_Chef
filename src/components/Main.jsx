import React, { useEffect, useRef, useState } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "../ai";

export default function Main(){
    const [ingredients, setIngredients] = useState(["Chicken" , "All main spices" , "Heavy Cream" , "Pasta"]);
    const [recipe, setRecipe] = useState("");
    const [error, setError] = useState(""); // State for error message
    const recipeSection = useRef(null)

    useEffect(() =>{
        if(recipe !=="" && recipeSection !== null){
            recipeSection.current.scrollIntoView({behaviour: "smooth"})
        }
    },[recipe])

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient").trim(); // Trim whitespace

        if (!newIngredient) {
            setError("Ingredient cannot be empty!"); // Show error message
            return;
        }

        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
        setError(""); // Clear error message after successful submission
    }

    function clearList() {
        setIngredients([]); // Reset the ingredients list
        setRecipe(""); // Optionally reset the recipe as well
    }

   async function handleGetRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients);
        setRecipe(recipeMarkdown);
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input 
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                    onChange={() => setError("")} // Clear error when typing
                />
                <button type="submit">Add ingredient</button>
                <button className="clear" type="button" onClick={clearList}>
                CLEAR ALL
            </button>
            </form>

            

            {error && <p className="error-message">{error}</p>} {/* Inline Error Message */}

            {ingredients.length > 0 && 
                <IngredientsList 
                    ref={recipeSection}
                    ingredients={ingredients} 
                    handleGetRecipe={handleGetRecipe}
                />
            }
            
            {recipe ? <ClaudeRecipe recipe={recipe}/> : null}
        </main>
    );
}
