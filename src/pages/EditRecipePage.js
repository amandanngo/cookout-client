import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



function EditRecipePage(){

    const navigate = useNavigate();

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

    const addIngredient = (event) =>{
        event.preventDefault();

        const copyIngredients = [...recipe.ingredients,'']

        setRecipe({
            ...recipe,
            ingredients: copyIngredients
        })
    }

    const deleteIngredient = index => (event) =>{
        event.preventDefault();
        const copyIngredients = [...recipe.ingredients];

        copyIngredients.splice(index,1);
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


    const addDirection = (event) =>{
        event.preventDefault();

        const copyDirections = [...recipe.directions,'']

        setRecipe({
            ...recipe,
            directions: copyDirections
        })
    }

    const deleteDirection = index => (event) =>{
        event.preventDefault();
        const copyDirections = [...recipe.directions];

        copyDirections.splice(index,1);
        setRecipe({
            ...recipe,
            directions: copyDirections
        })
    }  

    const handleSubmit = event => {
        event.preventDefault();

        const storedToken = localStorage.getItem('authToken');

        axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/recipes/${recipeId}`,recipe,{
            headers: {
                authorization: `Bearer ${storedToken}`
              } 
        })
            .then(res => {
                console.log(res);
                navigate('/profile')
            })
            .catch(err => console.log(err))

    }

    return(
        <div className='create'>
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
                    <label>Ingredients: </label>
                    {recipe.ingredients.map((e,i) => {
                        return(
                            <div className='input-list'>
                                <div>
                                    <input
                                        value={e}
                                        onChange={updateIngredients(i)}
                                    ></input>
                                </div>
                                <div>
                                    <button className='delete-btn' onClick={
                                        deleteIngredient(i)
                                    }>X</button>
                                </div>
                            </div>
                        )
                    })}
                    <button onClick={addIngredient}>Add ingredient</button>
                </div>
                <div>
                    <label>Directions: </label>
                    {recipe.directions.map((e,i) => {
                        return(
                            <div className='input-list'>
                                <div>
                                    <input
                                        value={e}
                                        onChange={updateDirections(i)}
                                    ></input>
                                </div>
                                <div>
                                    <button className='delete-btn' onClick={
                                        deleteDirection(i)
                                    }>X</button>
                                </div>
                            </div>
                        )
                    })}
                    <button onClick={addDirection}>Add direction</button>
                </div>
                <div className='post-btn'>
                    <button onClick={handleSubmit}>
                        Edit Recipe
                    </button>
                </div>
            </form>
        )}
        </div>
    )
}

export default EditRecipePage;