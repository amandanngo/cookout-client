import axios from 'axios';
import { useState, useContext, useSyncExternalStore, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/auth.context';



function EditRecipePage(){

    const {recipeId} = useParams();

    const [recipe,setRecipe] = useState(null);

    useEffect(()=>{
        const storedToken = localStorage.getItem('authToken');

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/recipes/${recipeId}`,{
            headers: {
                authorization: `Bearer ${storedToken}`
              } 
        })
            .then(res => setRecipe(res.data.recipe))
            .catch(err => console.log(err))
    },[recipeId])

    console.log('recipe: ', recipe)

    const updateRecipe = event => setRecipe({
        ...recipe,
        [event.target.name]: event.target.value
    });

    const updateIngredients = index => event =>{
        const copyIngredients = [...recipe.ingredients]
        copyIngredients[index] = event.target.value;

        setRecipe({
            ...recipe,
            ingredients: copyIngredients
        })
    }
    const updateDirections = index => event =>{
        const copyDirections = [...recipe.directions]
        copyDirections[index] = event.target.value;

        setRecipe({
            ...recipe,
            directions: copyDirections
        })
    }


    return(
        <div>
            <div className="nav-banner"></div>
            <h2>Edit Recipe</h2>
{ recipe && (
     <form>
                <div>
                    <label>
                        Recipe Title
                    </label>
                    <input
                        
                        name="title"
                        value={recipe.title}
                        onChange={updateRecipe}
                    />
                    </div>
                <div>
                    <label>
                        Description
                    </label>
                    <input
                        
                        name="description"
                        value={recipe.description}
                        onChange={updateRecipe}
                    />
                </div>
                <div>
                    <label>
                        Servings
                    </label>
                    <input
                        
                        name="servings"
                        value={recipe.servings}
                        onChange={updateRecipe}
                    />
                </div>
                <div>
                    <p>Ingredients: </p>
                    {recipe.ingredients.map((e,i) => {
                        return(
                            <div>
                                <input
                                    value={e}
                                    onChange={updateIngredients(i)}
                                ></input>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <p>Directions: </p>
                    {recipe.directions.map((e,i) => {
                        return(
                            <div>
                                <input
                                    value={e}
                                    onChange={updateDirections(i)}
                                ></input>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <button>
                        Post Recipe
                    </button>
                </div>


            </form>
)}
           

            
        </div>
    )
}

export default EditRecipePage;