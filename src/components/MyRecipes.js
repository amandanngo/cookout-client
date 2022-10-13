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
            <h2>My Recipes</h2>

            {recipes.map(e => {
                return(
                    <div key={e._id}>
                        <h4>{e.title}</h4>
                        <button onClick={()=>deleteRecipe(e._id)}>Delete</button>
                        <button><Link to={`/recipe/${e._id}/edit`}>Edit</Link></button>
                    </div>
                )
            })}
        </div>
    )
}

export default MyRecipes;