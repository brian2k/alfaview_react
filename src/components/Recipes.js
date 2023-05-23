import { useNavigate } from 'react-router-dom';
import ListCategory from './ListCategory';
import ListRecipes from './ListRecipes';
import mapState from '../redux/mapState';
import mapDispatch from '../redux/mapDispatch';
import { connect } from 'react-redux';
import RecipesView from './RecipesView';
import RecipesEdit from './RecipesEdit';
import RecipesNew from './RecipesNew';
import { useEffect } from 'react';

function Recipes(props) {
    const navigation = useNavigate()

    useEffect(() => {
        props.resetStates()
    }, [])

    return (
        <div>
            <h2>Rezepte</h2><br />
            <button onClick={() => {navigation(-1)}}>zurück</button>
            <ListCategory />
            <ListRecipes />
            {!props.editMode ? props.newRecipeFlag ? <RecipesNew /> : <RecipesView /> : <RecipesEdit />}
            {!props.newRecipeFlag && <button onClick={
                !props.editMode
                ? () => {
                    props.setFormData(
                        props.recipes.find(value => {return value.id === props.currentRecipe})
                    )
                    props.recipeEditMode()   
                }
                : () => props.saveRecipeEdit(props.currentRecipe, props.formdata)
            } 
            className="edit" id="edit">{!props.editMode ? "Rezept bearbeiten" : "Änderungen speichern" }</button>}
            {!props.editMode &&  <button  id="addRecipe" onClick={() => props.newRecipe()}>
                {!props.newRecipeFlag ? "Neues Rezept" : "Verwerfen" }
            </button>}


        </div>            
    );
}

export default connect(mapState, mapDispatch) (Recipes);