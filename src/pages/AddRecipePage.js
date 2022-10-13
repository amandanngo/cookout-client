import axios from 'axios';
import { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth.context';

function AddEventPage(){

    const { user } = useContext(AuthContext);

    const navigate = useNavigate()

    const [state, setState] = useState({
      title: '',
      postedOn: '',
      creator: user._id,
      description: '',
      servings: '',
      imageUrl: ''
    });

    const [ingredients,setIngredients] = useState([])
    const [directions,setDirections] = useState([])

    const addIngredient = (event) =>{
        event.preventDefault();

        setIngredients([...ingredients,''])
    }

    const deleteIngredient = index => (event) =>{
        event.preventDefault();
        const copyIngredients = [...ingredients];

        copyIngredients.splice(index,1);
        setIngredients(copyIngredients);
    }

    const updateIngredient = index => event =>{
        const copyIngredients = [...ingredients]
        copyIngredients[index] = event.target.value;
        setIngredients(copyIngredients);
    }

    const addDirection = (event) =>{
        event.preventDefault();

        setDirections([...directions,''])
    }

    const deleteDirection = index => (event) =>{
        event.preventDefault();
        const copyDirections = [...directions];

        copyDirections.splice(index,1);
        setDirections(copyDirections);
    }

    const updateDirection = index => event =>{
        const copyDirections = [...directions];
        copyDirections[index] = event.target.value;
        setDirections(copyDirections);
    }
  
    const updateState = (event) => setState({
      ...state,
      [event.target.name]: event.target.value
    });

    const [imageUrl, setImageUrl] = useState("");
   
    const handleFileUpload = (event) => {
        const uploadData = new FormData();
        
        uploadData.append("imageUrl", event.target.files[0]);

        const storedToken = localStorage.getItem('authToken');

        axios.post('http://localhost:3001/api/recipeImg',uploadData,{
            headers: {
              authorization: `Bearer ${storedToken}`
            }
          })
            .then(res => {
                console.log('img upload', res.data.fileUrl)
                setImageUrl(res.data.fileUrl);
                // console.log('imgurl',imageUrl)
            })
            .catch(err => console.log)
    }

    const handleSubmit = event => {
      event.preventDefault();

      const storedToken = localStorage.getItem('authToken');

      axios.post(`http://localhost:3001/api/recipes`, {
        title: state.title,
        postedOn: new Date(),
        creator:  user._id,
        description: state.description,
        servings: state.servings,
        ingredients: ingredients,
        directions: directions,
        imageUrl: imageUrl
      }, {
        headers: {
          authorization: `Bearer ${storedToken}`
        }
      })
        .then(res => {
          console.log(res.data);
          navigate('/home');
        })
        .catch(err => console.log(err))
    }


    return(
        <div>
            <h2>Create a new Recipe</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Recipe Title
                    </label>
                    <input
                        name="title"
                        value={state.title}
                        onChange={updateState}
                    />
                    </div>
                <div>
                    <label>
                        Description
                    </label>
                    <input
                        name="description"
                        value={state.description}
                        onChange={updateState}
                    />
                </div>
                <div>
                    <label>
                        Servings
                    </label>
                    <input
                        name="servings"
                        value={state.servings}
                        onChange={updateState}
                    />
                </div>
                <div>
                    <p>Ingredients: </p>
                    {ingredients.map((e,i) => {
                        return (
                            <div>
                                <label>- </label>
                                <input 
                                    value={e} 
                                    onChange={updateIngredient(i)}
                                />
                                <button onClick={
                                    deleteIngredient(i)
                                }>X</button>
                            </div>
                        )
                    })}
                    <button onClick={addIngredient} >Add ingredient</button>
                </div>
                <div>
                    <p>Directions: </p>
                    {directions.map((e,i) => {
                        return (
                            <div>
                                <label>{i+1}. </label>
                                <input 
                                    value={e} 
                                    onChange={updateDirection(i)}
                                />
                                <button onClick={
                                    deleteDirection(i)
                                }>X</button>
                            </div>
                        )
                    })}
                    <button onClick={addDirection} >Add direction</button>
                </div>
                <div>
                    <label>Image</label>

                    {!imageUrl && (
                       <input 
                        id='file-input'
                        type='file'
                        name="imageUrl"
                        value={state.imageUrl}
                        onChange={(event) => handleFileUpload(event)}
                        /> 
                    )}
                    
                    {imageUrl && (
                        <img id='recipe-img' src={imageUrl}/>
                    )}
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

export default AddEventPage;