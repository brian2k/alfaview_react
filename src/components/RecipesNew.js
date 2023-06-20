import React, { useEffect, useRef } from 'react';
import mapState from '../redux/mapState';
import mapDispatch from '../redux/mapDispatch';
import { connect } from 'react-redux';
import { Button, Paper, Stack, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { EditNote } from '@mui/icons-material';
import { Save } from '@mui/icons-material';

// ADDS NEW RECIPE IN RECIPE TABLE
// ALSO ADDS NEW MENU RECORD TO ALWAYS MATCH MENU DATA
// NEEDS NEW ERROR HANDLER FOR MUI

function RecipesNew(props) {

    const itemValue = useRef()
    const amountValue = useRef()

    function checkForms(){
        if(props.formdata.name && props.formdata.cooking && props.formdata.ingredients.length){
            props.saveNewRecipe(props.formdata)
            const NEW_OBJ = Object.assign({}, props.menu.find(value => {return value.id === props.currentRecipeId}))
            delete NEW_OBJ.id
            props.setMenuFormData(NEW_OBJ)
        }
        else
            alert("Bitte alle Formfelder überprüfen")
    }

    return (
        <div>
        <Paper sx={{p: 0}} elevation={4}>
            <Typography fontWeight={"bold"}>Titel:</Typography>
            <TextField
                placeholder="Titel"
                fullWidth
                className="input_inactive"
                name="name"
                sx={{borderRadius: "5px", p: 1}}
                onChange={(e) => props.editRecipeData(e)}
                value={
                    props.formdata.name
                }>
            </TextField>
            </Paper>
            <br />
            <Paper sx={{p: 1}} elevation={4}>
                <Typography fontWeight={"bold"}>Zutaten:</Typography>
                {props.formdata.ingredients.length < 1 && "Keine Zutaten"}
                <Table name="ingredients" id="ingredients">
                    <TableBody>
                    {
                        props.formdata.ingredients
                            .map((value, index) => {
                                return <TableRow key={index}>
                                    <TableCell>{value[0]}</TableCell>
                                    <TableCell>{value[1]}</TableCell>
                                    <TableCell style={{ width: "1rem", paddingLeft: "5px"}} onClick={() => props.editIngredient(index, value[0], value[1])}>
                                        <EditNote fontSize="small" />
                                    </TableCell>
                                    <TableCell style={{ width: "1rem", paddingLeft: "5px"}} onClick={() => {
                                            window.confirm("Wollen Sie die Zutat '" + value[1] + "' wirklich löschen?") && props.deleteIngredient(index)
                                        }}>
                                        <Delete sx={{color: "var(--alarm-color)"}} fontSize="small" />
                                    </TableCell>
                                </TableRow>
                            })
                    }
                    </TableBody>
                </Table>                
            </Paper>
            <br />
            <Paper id="addIngredient">
                    <Typography><b>Neue Zutat hinzufügen:</b></Typography>
                    <Stack spacing={0} direction="row">

                    <TextField sx={{width: "200px", p: 1}} inputRef={amountValue} fullWidth type="text" name="amount" id="input_amount" placeholder="Menge/Einheit" onChange={
                        (e) => props.editIngredientAmount(e.target.value)
                    } value={props.ingredientEdit.amount} />
                    <TextField sx={{p: 1}} inputRef={itemValue} fullWidth type="text" name="item" id="input_ingredient" placeholder="Zutat" onChange={
                        (e) => props.editIngredientItem(e.target.value)
                    } value={props.ingredientEdit.item} />
                    </Stack>

                    <Button fullWidth variant="contained" size="large" type="submit" className="save" id="save_ingredient" onClick={
                            () => amountValue.current.value === ""
                                    ? amountValue.current.focus()
                                        : itemValue.current.value === ""
                                            ? itemValue.current.focus()
                                                : props.saveIngredient() 
                            }>Hinzufügen / Ändern</Button>
            </Paper>
            <br />
            <Paper elevation={4}>
                <Typography fontWeight={"bold"}>Zubereitung:</Typography>
                <TextField
                    multiline
                    sx={{borderRadius: "5px", p: 1}}
                    placeholder="Rezept Zubereitung"
                    fullWidth
                    className="input_inactive"
                    name="cooking"
                    onChange={(e) => props.editRecipeData(e)}
                    value={
                        props.formdata.cooking
                }></TextField>
            </Paper>
            <br />
            <Paper elevation={4}>
                <Typography fontWeight={"bold"}>(Allergie-) Hinweise:</Typography>
                <div className="notes">
                    <TextField
                        multiline
                        sx={{borderRadius: "5px", p: 1}}
                        placeholder="Notizen oder Hinweise an die Köche:"
                        fullWidth
                        className="input_inactive"
                        name="notes"
                        onChange={(e) => props.editRecipeData(e)}
                        value={
                            props.formdata.notes
                    }></TextField>
                </div>
            </Paper>
            <br />
                {/* ASK FOR PROMPT BEFORE DELETING */}
            <Button fullWidth variant="contained" size="large" type="submit" startIcon={<Save />} onClick={() => { checkForms() }}>Neues Rezept speichern</Button>
        </div>
    );
}

export default connect(mapState, mapDispatch) (RecipesNew);