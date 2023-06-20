import React from 'react';
import mapState from '../redux/mapState'
import mapDispatch from '../redux/mapDispatch';
import { connect } from 'react-redux';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { ArrowLeft } from '@mui/icons-material';
import { ArrowRight } from '@mui/icons-material';

// LIST CATEGORIES IN DROPDOWN

function ListCategory(props) {
    return (
        <div>
            <FormControl fullWidth>
                <Grid container spacing={0} >
                    <Grid item xs>
                        <Button sx={{p:0, minWidth: 0, height: "100%"}} variant="contained" onClick={() => {
                                props.selectedCat > 0 && props.selectCategory(props.selectedCat - 1)
                            }}><ArrowLeft /></Button>
                    </Grid>
                    <Grid item xs={10}>
                        <Select 
                            fullWidth
                            size="large"
                            defaultValue=""
                            sx={props.isShoppinglist ? {backgroundColor: 'var(--shoppinglist-dark)'} : {backgroundColor: 'var(--light-contrast)'}}
                            style={props.isShoppinglist &&
                                {borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px" }
                                // Shows only in Shoppinglist.js
                            }
                            onChange={(event) => {
                                props.selectCategory(event.target.value)
                                props.recipes.filter(value => {return value.cat === event.target.value})[props.selectedRecipe] &&
                                    props.setCurrentRecipeId(props.recipes.filter(value => {return value.cat === event.target.value})[props.selectedRecipe].id)
                            }}
                            value={props.selectedCat}>
                            <MenuItem value="none" disabled>
                                Wähle eine Kategorie
                            </MenuItem>
                            {
                                props.categories.map((value,index) => {                   
                                return <MenuItem value={index} key={index}>{value}</MenuItem>
                            }).sort((a, b) => (a.value > b.value) ? 1 : -1)}
                        </Select>
                    </Grid>
                    <Grid item xs>
                        <Button sx={{p:0, minWidth: 0, height: "100%"}} variant="contained" onClick={() => {
                                (props.selectedCat < props.categories.length - 1) && props.selectCategory(props.selectedCat + 1)
                            }}><ArrowRight /></Button>
                    </Grid>
                </Grid>
            </FormControl>
        </div>
    );
}

export default connect(mapState, mapDispatch) (ListCategory);