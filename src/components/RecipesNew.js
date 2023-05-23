import React, { useEffect } from 'react';
import mapState from '../redux/mapState';
import mapDispatch from '../redux/mapDispatch';
import { connect } from 'react-redux';

// ADDS NEW RECIPE IN RECIPE TABLE
// ALSO ADDS NEW MENU RECORD TO ALWAYS MATCH MENU DATA

function RecipesNew(props) {

    function checkForms(){
        if(props.formdata.name && props.formdata.cooking && props.formdata.ingredients.length){
            props.saveNewRecipe(props.formdata)
            const NEW_OBJ = Object.assign({}, props.menu.find(value => {return value.id === props.currentRecipe}))
            delete NEW_OBJ.id
            props.setMenuFormData(NEW_OBJ)
        }
        else
            alert("Bitte alle Formfelder überprüfen")
    }

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
                                    <td onClick={() => props.editIngredient(index, value)}>edit</td>
                                    <td>delete</td>
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
                <legend>Notiz/Hinweise:</legend>
                <div className="notes">
                    <textarea className="input_inactive" name="notes" onChange={(e) => props.editRecipeData(e)} value={
                        props.formdata.notes
                    }></textarea>
                </div>
            </fieldset>
            
            <fieldset>
                <legend>Zubereitung:</legend>        
                <textarea className="input_inactive" name="cooking" onChange={(e) => props.editRecipeData(e)} value={
                    props.formdata.cooking
                }></textarea>
            </fieldset>
                {/* ASK FOR PROMPT BEFORE DELETING */}
            <button type="submit" onClick={() => { checkForms() }}>Neues Rezept speichern</button>
        </div>
    );
}

export default connect(mapState, mapDispatch) (RecipesNew);