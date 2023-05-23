import React, { useEffect } from 'react';
import mapState from '../redux/mapState';
import mapDispatch from '../redux/mapDispatch';
import { connect } from 'react-redux';

// SHOWS SELECTED RECIPE

function RecipesView(props) {
    useEffect(() => {
        // TO DO? ID is set initial to 1 - but if there is no id:1 in DB this throws an ERROR
        props.recipes.length &&    
            props.setCurrentRecipe(props.recipes.filter(value => {return value.cat === props.selectedCat})[props.selectedRecipe].id)            
    }, [])

    return props.recipes.length ? (
        <div>
            <b>Zutaten:</b>
            <table id="ingredients">
                <tbody>                
                {   
                    props.recipes.filter(value => {return value.cat === props.selectedCat})[props.selectedRecipe]
                        ? props.recipes.filter(value => {return value.cat === props.selectedCat})[props.selectedRecipe].ingredients
                        .map((value, index) => {
                            return <tr key={index}>
                                <td>{value[0]}</td>
                                <td>{value[1]}</td>
                            </tr>
                        })
                        : <td>Keine Rezepte</td>
                }
                </tbody>
            </table>

            <fieldset>
                <legend>Zubereitung:</legend>        
                <textarea className="input_inactive" id="cooking" value={
                    props.recipes.filter(value => {return value.cat === props.selectedCat})[props.selectedRecipe]
                    ? props.recipes.filter(value => {return value.cat === props.selectedCat})[props.selectedRecipe].cooking
                    : "Keine Rezepte"
                } readOnly>
                </textarea>
            </fieldset>

            <fieldset>
                <legend>(Allergie-) Hinweise:</legend>
                <div className="notes">
                    <textarea className="input_inactive" id="recipe_notes" value={
                        props.recipes.filter(value => {return value.cat === props.selectedCat})[props.selectedRecipe]
                        ? props.recipes.filter(value => {return value.cat === props.selectedCat})[props.selectedRecipe].notes
                        : "Keine Rezepte"
                    } readOnly>
                    </textarea>
                </div>
            </fieldset>  
        </div>
    ) : "loading recipes...";
}

export default connect(mapState, mapDispatch) (RecipesView);