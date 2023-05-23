import React, { useEffect } from 'react';
import mapState from '../redux/mapState';
import mapDispatch from '../redux/mapDispatch';
import { connect } from 'react-redux';

// HANDLES INGREDIENTS AND ADDITIONAL DATA TO SET FLAGS FOR MENU TABLE

function MenuManagerRecipeData(props) {
    
    useEffect(() => {
        const NEW_OBJ = Object.assign({}, props.menu.find(value => {return value.id === props.currentRecipe}))
        delete NEW_OBJ.id
        props.setMenuFormData(NEW_OBJ)
    }, [props.selectedCat, props.selectedRecipe, props.menu, props.recipes, props.currentRecipe])

    // Handles Checkboxes and adds them to selectedCheckboxes Array
    const checkboxHandler = (event, id) => {
        if(event.target.checked && !props.menuFormData.ingredients[id]){
            props.checkIngredient(id)
        }else{
            props.uncheckIngredient(id)
        }
    }

    return (props.menu.length && props.menuFormData.ingredients.length && props.recipes.length) ? (
        <div>
        <b>Zutaten:</b>
        <table id="ingredients">
            <tbody>
            {
                props.recipes.filter(value => {return value.cat === props.selectedCat})[props.selectedRecipe]
                ? props.recipes.filter(value => {return value.cat === props.selectedCat})[props.selectedRecipe].ingredients
                    .map((value, index) => {
                        return <tr key={index}>
                            <td className="left_align">
                                <label className="checkbox_label">
                                    {value[1]}
                                    <input type="checkbox" name="ingredients"  checked={props.menuFormData.ingredients[index] || false} 
                                    onChange={(e) => checkboxHandler(e, index)} />
                                    <span className="checkbox"></span>
                                </label>
                            </td>
                        </tr>
                    })
                : <td>no recipes</td>
            }
            </tbody>
        </table>

        <fieldset>
            <legend>Beschreibung:</legend>        
            <textarea className="input_inactive" name="menuDescription" onChange={(e) => props.setMenuDescription(e.target.value)} value={
                props.menuFormData.description
            } >
            </textarea>
        </fieldset>

        <fieldset>
            <legend>(Allergie-) Hinweise:</legend>
            <div className="notes">
                <textarea className="input_inactive" name="menuNotes" onChange={(e) => props.setMenuNotes(e.target.value)} id="recipe_notes" value={
                    props.menuFormData.notes
                } >
                </textarea>
            </div>
        </fieldset>  
    </div>
    ) : "loading recipes...";
}

export default connect(mapState, mapDispatch) (MenuManagerRecipeData);