import axios from 'axios';
import { useState, useContext, useSyncExternalStore, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/auth.context';



function EditRecipePage(){

    const {recipeId} = useParams();

    const [recipe,setRecipe] = useState(null);

    useEffect(()=>{
        const storedToken = localStorage.getItem('authToken');

        axios.get(`http://localhost:3001/api/recipes/${recipeId}`,{
            headers: {
                authorization: `Bearer ${storedToken}`
              } 
        })
            .then(res => setRecipe(res.data.recipe))
            .catch(err => console.log(err))
    },[])

    console.log('recipe: ', recipe)

    const [state, setState] = useState({
        title: '',
        postedOn: '',
        description: '',
        servings: ''
      });

    console.log('state: ', state)

    // const updateState = event => setState({
    //     ...state,
    //     [event.target.name]: event.target.value
    //   });

    return(
        <div>
            <h2>Edit Recipe</h2>

            <form>
                <div>
                    <label>
                        Recipe Title
                    </label>
                    <input
                        // name="title"
                        // value={state.title}
                        // onChange={updateState}
                    />
                    </div>
                <div>
                    <label>
                        Description
                    </label>
                    <input
         
                    />
                </div>
                <div>
                    <label>
                        Servings
                    </label>
                    <input
                 
                    />
                </div>
                <div>
                    <p>Ingredients: </p>
                  
                </div>
                <div>
                    <p>Directions: </p>
                </div>
                <div>
                    <button>
                        Post Recipe
                    </button>
                </div>


            </form>

            
        </div>
    )
}

export default EditRecipePage;