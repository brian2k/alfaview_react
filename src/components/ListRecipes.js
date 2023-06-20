import React, { useEffect } from 'react';
import mapState from '../redux/mapState'
import mapDispatch from '../redux/mapDispatch';
import { connect } from 'react-redux';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { ArrowLeft } from '@mui/icons-material';
import { ArrowRight } from '@mui/icons-material';

// LIST RECIPES IN DROPDOWN

function ListRecipes(props) {
    

    return (
        <div>
            <FormControl fullWidth>
                <Grid container>
                    <Grid item xs>
                        <Button sx={{p:0, minWidth: 0, height: "100%"}} variant="contained" onClick={() => {
                                props.selectedRecipe > 0 && props.selectRecipe(props.selectedRecipe - 1)
                            }}><ArrowLeft /></Button>
                    </Grid>
                    <Grid item xs={10}>
                        <Select
                        fullWidth
                            sx={props.isShoppinglist ? {backgroundColor: 'var(--shoppinglist-dark)'} : {backgroundColor: 'var(--light-contrast)'}}
                            defaultValue=""
                            onChange={(event) => {
                            props.selectRecipe(event.target.value)
                            props.setCurrentRecipeId(props.recipes.filter(value => {return value.cat === props.selectedCat})[event.target.value].id)
                            }}
                            value={props.selectedRecipe}>
                            {
                                props.recipes.filter(value => {return value.cat === props.selectedCat })
                                    .map((value,index) => {                   
                                        return props.selectedCat === value.cat
                                            && <MenuItem value={index} key={value.id}>{value.name}</MenuItem>
                                    }).sort((a, b) => (a.value > b.value) ? 1 : -1)
                            }
                        </Select>
                    </Grid>
                    <Grid item xs>
                        <Button sx={{p:0, minWidth: 0, height: "100%"}} variant="contained" onClick={() => {
                                (props.selectedRecipe < props.recipes.filter(value => {return value.cat === props.selectedCat }).length - 1) && props.selectRecipe(props.selectedRecipe + 1)
                            }}><ArrowRight /></Button>
                    </Grid>
                </Grid>
            </FormControl>
        </div>
    );
}


export default connect(mapState,mapDispatch) (ListRecipes);