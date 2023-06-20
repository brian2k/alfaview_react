import React, { useEffect, useState } from 'react';
import mapState from '../redux/mapState';
import mapDispatch from '../redux/mapDispatch';
import { connect } from 'react-redux';
import { Card, CardActions, Collapse, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

// SHOWS SELECTED RECIPE

function RecipesView(props) {
    useEffect(() => {
        // TO DO? ID is set initial to 1 - but if there is no id:1 in DB this throws an ERROR
        props.recipes.length &&    
            props.setCurrentRecipeId(props.recipes.filter(value => {return value.cat === props.selectedCat})[props.selectedRecipe].id)            
    }, [])

    const [expanded, setExpanded] = useState(false)

    const expandCard = () => {
        setExpanded(!expanded)
    }

    return props.recipes.length ? (
        <div>
            <Paper sx={{p: 1}} elevation={4}>
                <Typography fontWeight={"bold"}>Zutaten:</Typography>
                <Table
                    aria-label="simple table"
                    id="ingredients">
                    <TableBody>                
                    {   
                        props.recipes.filter(value => {return value.cat === props.selectedCat})[props.selectedRecipe]
                            ? props.recipes.filter(value => {return value.cat === props.selectedCat})[props.selectedRecipe].ingredients
                            .map((value, index) => {
                                return <TableRow key={index}>
                                    <TableCell align="right">{value[0]}</TableCell>
                                    <TableCell>{value[1]}</TableCell>
                                </TableRow>
                            })
                            : <td>Keine Rezepte</td>
                    }
                    </TableBody>
                </Table>
            </Paper><br />
            <Card elevation={4}>
                <CardActions>
                    <Typography fontWeight={"bold"}>Zubereitung:</Typography>
                    <ExpandMore  onClick={expandCard}/>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Typography
                        sx={{p:1}}
                        placeholder="Rezept Zubereitung"
                        id="cooking"
                    >{
                        props.recipes.filter(value => {return value.cat === props.selectedCat})[props.selectedRecipe]
                        ? props.recipes.filter(value => {return value.cat === props.selectedCat})[props.selectedRecipe].cooking
                        : "Keine Rezepte"
                    }
                    </Typography>
                </Collapse>
            </Card>
            <br />
            <Paper elevation={4}>
                <Typography fontWeight={"bold"}>(Allergie-) Hinweise:</Typography>
                <Typography display="block"
                    sx={{p:1, whiteSpace: 'pre-line'}}
                    placeholder="Notizen oder Hinweise an die Köche:"
                    id="recipe_notes"
                >
                    {
                        props.recipes.filter(value => {return value.cat === props.selectedCat})[props.selectedRecipe]
                        ? props.recipes.filter(value => {return value.cat === props.selectedCat})[props.selectedRecipe].notes
                        : "Keine Rezepte"
                    }
                </Typography>
            </Paper>  
        </div>
    ) : "loading recipes...";
}

export default connect(mapState, mapDispatch) (RecipesView);