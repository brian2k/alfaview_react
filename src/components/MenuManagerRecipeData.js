import React, { useEffect } from 'react';
import mapState from '../redux/mapState';
import mapDispatch from '../redux/mapDispatch';
import { connect } from 'react-redux';
import { Checkbox, FormControlLabel, InputAdornment, Paper, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { CheckBox } from '@mui/icons-material';

// HANDLES INGREDIENTS AND ADDITIONAL DATA TO SET FLAGS FOR MENU TABLE

function MenuManagerRecipeData(props) {
    
    useEffect(() => {
        props.loadMenu();
    }, [])
    
    useEffect(() => {
        const NEW_OBJ = Object.assign({}, props.menu.find(value => {return value.id === props.currentRecipeId}))
        delete NEW_OBJ.id
        props.setMenuFormData(NEW_OBJ)
    }, [props.selectedCat, props.selectedRecipe, props.menu, props.recipes, props.currentRecipeId])


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
        <Paper sx={{p:1}} elevation={4}>
            <Typography fontWeight={"bold"}>Preis:</Typography>
                <TextField
                    fullWidth
                    type="number"
                    label="Preis"
                    className="input_inactive"
                    name="menuPrice"
                    onChange={(e) => props.setMenuPrice(e.target.value)}
                    id="recipe_price"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">€</InputAdornment>,
                    }}
                    value={
                        props.menuFormData.price
                    }/>
        </Paper><br />
        <Paper sx={{p: 1}} elevation={4}>
            <Typography fontWeight={"bold"}>Zutaten:</Typography>
            <Table id="ingredients">
                <TableBody>
                {
                    props.recipes.filter(value => {return value.cat === props.selectedCat})[props.selectedRecipe]
                    ? props.recipes.filter(value => {return value.cat === props.selectedCat})[props.selectedRecipe].ingredients
                        .map((value, index) => {
                            return <TableRow key={index}>
                                <TableCell sx={{p:0}} className="left_align">
                                    <FormControlLabel className="checkbox_label" control={<Checkbox />} name="ingredients" label={value[1]} checked={props.menuFormData.ingredients[index] || false} 
                                        onChange={(e) => checkboxHandler(e, index)} >
                                    </FormControlLabel>
                                </TableCell>
                            </TableRow>
                        })
                    : <td>no recipes</td>
                }
                </TableBody>
            </Table>
        </Paper><br />
        <Paper elevation={4}>
        <Typography fontWeight={"bold"}>Beschreibung:</Typography>
            <TextField sx={{p:1}} fullWidth multiline className="input_inactive" name="menuDescription" onChange={(e) => props.setMenuDescription(e.target.value)} value={
                props.menuFormData.description
            } />
        </Paper>
        <br />
        <Paper elevation={4}>
            <Typography fontWeight={"bold"}>(Allergie-) Hinweise:</Typography>
            <div className="notes">
                <TextField sx={{p:1}} fullWidth multiline className="input_inactive" name="menuNotes" onChange={(e) => props.setMenuNotes(e.target.value)} id="recipe_notes" value={
                    props.menuFormData.notes
                } />
            </div>
        </Paper>
    </div>
    ) : "loading recipes...";
}

export default connect(mapState, mapDispatch) (MenuManagerRecipeData);