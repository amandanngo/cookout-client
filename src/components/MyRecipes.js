import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'


function MyRecipes(){

    const [recipes,setRecipes] = useState([])

    const getRecipes = () => {
        const storedToken = localStorage.getItem('authToken');

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/recipes`,{
            headers: {
                authorization: `Bearer ${storedToken}`
            }
        })
            .then(res => {
                // console.log(res.data.recipes)
                setRecipes(res.data.recipes)
            })
            .catch(err => console.log(err))
    }    

    useEffect(()=>{
        getRecipes();
    },[])

    const deleteRecipe = (recipeId) => {
        
        const storedToken = localStorage.getItem('authToken');

        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/recipes/${recipeId}`,{
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        })
            .then(res => {
                getRecipes();
            })
            .catch(err => console.log(err))

    }


    return(
        <div>
            <h2>Recipes</h2>

            {recipes.map(e => {
                return(
                    <div className='profile-recipe' key={e._id}>
                        <div><h2>{e.title}</h2></div>
                        <div class='recipe-btn'><button><Link to={`/recipe/${e._id}/edit`}><a>Edit</a></Link></button></div>
                        <div class='recipe-btn'><button onClick={()=>deleteRecipe(e._id)}>Delete</button></div>
                    </div>
                )
            })}
        </div>
    )
}

export default MyRecipes;