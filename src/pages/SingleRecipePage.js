import { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';


function SingleRecipePage(){

    const {recipeId} = useParams();

    const [recipe, setRecipe] = useState(undefined)

    useEffect(()=>{
        const storedToken = localStorage.getItem('authToken');

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/recipes/${recipeId}`,{
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        })
            .then(res => {
                setRecipe(res.data.recipe);
            })
            .catch(err => console.log(err))
    },[])

    return(
        <div id='single-recipe'>
            <div className="nav-banner"></div>
            <div className='single-recipe'>

                {recipe && (
                    <>
                    <h2>{recipe.title}</h2>
                    <img src={recipe.pictureUrl} alt={recipe.title}/>
                    <p>{recipe.description}</p>
                    <p><b>Servings:</b> {recipe.servings}</p>
                    <p><b>Ingredients: </b></p>
                    <ul>
                        {recipe.ingredients.map((e,i) =>{
                        return (
                            <div key={i}>
                                <li>{e}</li>
                            </div>
                        )
                        })} 
                    </ul>

                    <p><b>Directions: </b></p>
                    <ol>
                        {recipe.directions.map(e =>{
                            return <li>{e}</li>
                        })}
                    </ol>
                    </>
                )}
        
            </div>
        </div>
    )
}

export default SingleRecipePage;