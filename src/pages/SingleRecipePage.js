import { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';


function SingleRecipePage(){

    const {recipeId} = useParams();

    const [recipe,setRecipe] = useState([])


    useEffect(()=>{
        const storedToken = localStorage.getItem('authToken');

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/recipes/${recipeId}`,{
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        })
            .then(res => {
                console.log(res)
                setRecipe(res.data.recipe)
            })
            .catch(err => console.log(err))
    },[])



    return(
        <div id='single-recipe'>
            <div className="nav-banner"></div>
            <div id='single-recipe'>
                
                <h2>{recipe.title}</h2>
                <img src={recipe.pictureUrl} />
                <p>{recipe.description}</p>
                <p><b>Servings:</b> {recipe.servings}</p>
                <p><b>Ingredients: </b></p>
                <ul>
                       {recipe.ingredients.map(e =>{
                        return <li>{e}</li>
                        })} 
                </ul>
                <p><b>Directions: </b></p>
                <ul>
                    {recipe.directions.map(e =>{
                        return <li>{e}</li>
                    })}
                </ul>

            </div>
        </div>
    )
}

export default SingleRecipePage;