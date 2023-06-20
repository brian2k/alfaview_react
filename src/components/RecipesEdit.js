import React, { useEffect, useRef } from 'react';
import mapState from '../redux/mapState';
import mapDispatch from '../redux/mapDispatch';
import { connect } from 'react-redux';
import { Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { Delete } from '@mui/icons-material';
import { EditNote } from '@mui/icons-material';

function RecipesEdit(props) {

    const itemValue = useRef()
    const amountValue = useRef()

    const deleteRecepieFunction = () => {
        props.deleteRecipe(props.currentRecipeId)
        props.resetFormData()
    }

    return (
        <div>
            <Paper sx={{p: 0}} elevation={4}>
                <Typography fontWeight={"bold"}>Titel:</Typography>
                <TextField
                    fullWidth
                    sx={{borderRadius: "5px", p:1}}
                    placeholder="Titel"
                    className="input_inactive"
                    name="name"
                    onChange={(e) => props.editRecipeData(e)}
                    value={
                        props.formdata.name
                    }>
                </TextField>
            </Paper><br />
            <Paper sx={{p: 1}} elevation={4}>
                    <Typography fontWeight={"bold"}>Zutaten:</Typography>
                    <Table name="ingredients" id="ingredients">
                        <TableBody>
                        {
                            props.formdata.ingredients
                                .map((value, index) => {
                                    return <TableRow key={index}>
                                        <TableCell align="right">{value[0]}</TableCell>
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
                <Paper elevation={4} id="addIngredient">
                    <Stack spacing={0} direction="row">
                        <TextField
                        inputRef={amountValue}
                        sx={{width: "200px", p:1}}
                            type="text" label="Menge" name="amount" id="input_amount" placeholder="Menge" onChange={
                            (e) => props.editIngredientAmount(e.target.value)
                        } value={props.ingredientEdit.amount} />
                        <TextField
                            sx={{p:1}}
                            inputRef={itemValue}
                            fullWidth label="Zutat" type="text" name="item" id="input_ingredient" placeholder="Zutat" onChange={
                            (e) => props.editIngredientItem(e.target.value)
                        } value={props.ingredientEdit.item} />
                    </Stack>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<AddCircleOutline />}
                        type="submit"
                        size="large"
                        className="save"
                        id="save_ingredient"onClick={
                            () => amountValue.current.value === ""
                                    ? amountValue.current.focus()
                                        : itemValue.current.value === ""
                                            ? itemValue.current.focus()
                                                : props.saveIngredient() 
                            }>
                            Zutat hinzufügen/ändern
                    </Button>                    
                    
                </Paper>
            <br />
            <Paper elevation={4}>
                <Typography fontWeight={"bold"}>Zubereitung:</Typography>
                <TextField
                    sx={{borderRadius: "5px", p: 1}}
                    multiline
                    fullWidth
                    placeholder="Rezept Zubereitung"
                    rows={1}
                    className="input_inactive"
                    name="cooking"
                    onChange={(e) => props.editRecipeData(e)}
                    value={
                        props.formdata.cooking
                    }>
                </TextField>
            </Paper>
            <br />
            <Paper elevation={4}>
                <Typography fontWeight={"bold"}>(Allergie-) Hinweise:</Typography>
                <TextField
                    sx={{borderRadius: "5px", p: 1}}
                    multiline
                    fullWidth
                    placeholder="Notizen oder Hinweise an die Köche:"
                    rows={1}
                    className="input_inactive"
                    name="notes"
                    onChange={(e) => props.editRecipeData(e)} value={
                        props.formdata.notes
                    }>
                </TextField>
            </Paper><br />
            <Button color="error" fullWidth variant="outlined" size="large" type="submit" id="btn_delete_recipe" onClick={() => {
                 window.confirm("Wollen Sie das Rezept '" + props.formdata.name + "' wirklich löschen?") && deleteRecepieFunction()
                }}>Rezept löschen</Button>
        </div>
    );
}

export default connect(mapState, mapDispatch) (RecipesEdit);