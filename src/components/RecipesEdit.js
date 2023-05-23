import React from 'react';
import mapState from '../redux/mapState';
import mapDispatch from '../redux/mapDispatch';
import { connect } from 'react-redux';

function RecipesEdit(props) {
    return (
        <div>
            <fieldset>
                <legend>Titel:</legend>
                <div>
                    <input type="text" className="input_inactive" name="name" onChange={(e) => props.editRecipeData(e)} value={
                        props.formdata.name
                    }></input>
                </div>
            </fieldset>

            <fieldset>
                <legend>Zutaten:</legend>
                <table name="ingredients" id="ingredients">
                    <tbody>
                    {
                        props.formdata.ingredients
                            .map((value, index) => {
                                return <tr key={index}>
                                    <td>{value[0]}</td>
                                    <td>{value[1]}</td>
                                    <td onClick={() => props.editIngredient(index, value[0], value[1])}>edit</td>
                                    <td onClick={() => {
                                        window.confirm("Wollen Sie die Zutat '" + value[1] + "' wirklich löschen?") && props.deleteIngredient(index)
                                    }}>delete</td>
                                </tr>
                            })
                    }
                    </tbody>
                </table>
                <div id="addIngredient">
                    <p><b>Neue Zutat hinzufügen:</b></p>
                    <input type="text" name="amount" id="input_amount" placeholder="Menge/Einheit" onChange={
                        (e) => props.editIngredientAmount(e.target.value)
                    } value={props.ingredientEdit.amount} />
                    <input type="text" name="item" id="input_ingredient" placeholder="Zutat" onChange={
                        (e) => props.editIngredientItem(e.target.value)
                    } value={props.ingredientEdit.item} />
                    <button type="submit" className="save" id="save_ingredient" onClick={() => props.saveIngredient()}>Zutat hinzufügen/ändern</button>    
                </div>
            </fieldset>
            
            <fieldset>
                <legend>Zubereitung:</legend>        
                <textarea className="input_inactive" name="cooking" onChange={(e) => props.editRecipeData(e)} value={
                    props.formdata.cooking
                }></textarea>
            </fieldset>

            <fieldset>
                <legend>(Allergie-) Hinweise:</legend>
                <div className="notes">
                    <textarea className="input_inactive" name="notes" onChange={(e) => props.editRecipeData(e)} value={
                        props.formdata.notes
                    }></textarea>
                </div>
            </fieldset>
            <button type="submit" className="delete" id="btn_delete_recipe" onClick={() => {
                 window.confirm("Wollen Sie das Rezept '" + props.formdata.name + "' wirklich löschen?") && props.deleteRecipe(props.currentRecipe)
                }}>Rezept löschen</button>
        </div>
    );
}

export default connect(mapState, mapDispatch) (RecipesEdit);