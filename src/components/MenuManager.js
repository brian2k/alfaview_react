import React, { useEffect } from 'react';
import mapState from '../redux/mapState';
import mapDispatch from '../redux/mapDispatch';
import { connect } from 'react-redux';
import ListCategory from './ListCategory';
import ListRecipes from './ListRecipes';
import MenuManagerRecipeData from './MenuManagerRecipeData';
import { Button, Checkbox, Fab, FormControlLabel, Paper, Stack, Typography } from '@mui/material';
import BackButton from './assets/BackButton';
import { Save } from '@mui/icons-material';
import * as styles from './Styles'

// MANAGES MENU CARD BY SETTING FLAGS ON EACH CATEGORY, RECIPE AND INGREDIENT
// ALSO CONTAINS ADDITIONAL DATA LIKE DISH DESCRIPTION

function MenuManager(props) {
    
    useEffect(() => {
        props.resetMenuFormData()
    }, [])

    useEffect(() => {
        const NEW_OBJ = Object.assign({}, props.menu.find(value => {return value.id === props.currentRecipeId}))
        delete NEW_OBJ.id
        props.setMenuFormData(NEW_OBJ)
    }, [props.selectedCat, props.selectedRecipe, props.menu])
    
    return props.menu.length && props.catFlags.length &&  props.recipes.length ? (
        <div>
            <Paper sx={{p:1}}>
                
                <ListCategory />
                <FormControlLabel className="checkbox_label" control={<Checkbox />} dataid="categories" label="Diese Kategorie einblenden"
                    checked={props.catFlags[props.selectedCat] || false}
                    name="catFlags" onChange={() => props.changeCategoryFlag(props.selectedCat)}  />
            </Paper><br />
            <Paper sx={{p:1}}>
                <ListRecipes />
                <FormControlLabel className="checkbox_label" control={<Checkbox />} dataid="recipe" label="Dieses Rezept einblenden"
                    checked={props.menuFormData.recipeFlag || false}
                    name="recipeFlag" onChange={() => props.changeRecipeFlag()} />
            </Paper><br />
            <MenuManagerRecipeData /><br />
            <Fab style={styles.fabstyle} onClick={() => props.saveMenuData(props.currentRecipeId, props.menuFormData, {flags: props.catFlags})}><Save /></Fab>
        </div>
    ) : "loading recipes";
}

export default connect(mapState, mapDispatch) (MenuManager);