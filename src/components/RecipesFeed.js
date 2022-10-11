import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth.context';
import axios from 'axios'


function RecipesFeed(){

    const [recipes,setRecipes] = useState([])

    useEffect(()=>{
        const storedToken = localStorage.getItem('authToken');

        axios.get('http://localhost:3001/api/recipes-feed',{
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        })
            .then(res => {
                setRecipes(res.data.recipes)
            })
            .catch(err => console.log(err))
    },[])

    return(
        <div>
        <h2>Recipes</h2>

        {recipes.map(e => {
            return(
                <div>
                    <h3>{e.title}</h3>
                    <p>{e.description}</p>
                </div>
            )
        })}

        </div>
    )
}

export default RecipesFeed;