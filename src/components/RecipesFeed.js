import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth.context';
import axios from 'axios'
import {Link} from "react-router-dom"


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
        <div id='recipes-feed'>
            {recipes.map(e => {
            return(
                <div className='recipe-card'>
                    <img src={e.pictureUrl} />
                    <Link className='recipe-title' to={`/recipe/${e._id}`}>{e.title}</Link>
                    <p>{e.description}</p>
                </div>
            )
            })}
        </div>
        

        </div>
    )
}

export default RecipesFeed;