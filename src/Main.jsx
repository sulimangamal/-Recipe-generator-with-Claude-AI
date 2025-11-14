import React from "react"
import IngredientsList from "./Components/IngredientsList.jsx"
import ClaudeRecipe from "./Components/ClaudeRecipe.jsx"
import { getRecipeFromChefClaude} from "./ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const recipeSection=React.useRef(null)
    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromChefClaude(ingredients)
        setRecipe(recipeMarkdown)
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    React.useEffect(()=>{
        if(recipe !== "" && recipeSection.current !== null){
            recipeSection.current.scrollIntoView({behavior:"smooth"})
        }
    },[recipe])

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}