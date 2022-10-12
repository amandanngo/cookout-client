import { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';


function SingleRecipePage(){

    const {recipeId} = useParams();

    const [recipe,setRecipe] = useState([])


    useEffect(()=>{
        const storedToken = localStorage.getItem('authToken');

        axios.get(`http://localhost:3001/api/recipes/${recipeId}`,{
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
        <div>
            <h2>Single Recipe</h2>
            <p>{recipe.title}</p>
        </div>
    )
}

export default SingleRecipePage;