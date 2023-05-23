import React, { useEffect } from 'react';
import mapState from '../redux/mapState';
import mapDispatch from '../redux/mapDispatch';
import { connect } from 'react-redux';
import ListCategory from './ListCategory';
import ListRecipes from './ListRecipes';
import { useNavigate } from 'react-router-dom';
import MenuManagerRecipeData from './MenuManagerRecipeData';

// MANAGES MENU CARD BY SETTING FLAGS ON EACH CATEGORY, RECIPE AND INGREDIENT
// ALSO CONTAINS ADDITIONAL DATA LIKE DISH DESCRIPTION

function MenuManager(props) {
    const navigation = useNavigate()
    
    useEffect(() => {
        const NEW_OBJ = Object.assign({}, props.menu.find(value => {return value.id === props.currentRecipe}))
        delete NEW_OBJ.id
        props.setMenuFormData(NEW_OBJ)
    }, [props.selectedCat, props.selectedRecipe, props.menu])

    
    return props.menu.length && props.catFlags.length &&  props.recipes.length ? (
        <div>
            <h2>Menu Manager</h2><br />
            <button onClick={() => {navigation(-1)}}>zurück</button>
            <ListCategory />
            <label className="checkbox_label" dataid="categories">
                Diese Kategorie einblenden<input type="checkbox"
                checked={props.catFlags[props.selectedCat] || false}
                name="catFlags" onChange={() => props.changeCategoryFlag(props.selectedCat)} />
                <span className="checkbox"></span>
            </label>
            <ListRecipes />
            <label className="checkbox_label" dataid="recipe">
                Dieses Rezept einblenden<input type="checkbox"
                checked={props.menuFormData.recipeFlag || false}
                name="recipeFlag" onChange={() => props.changeRecipeFlag()}/>
                <span className="checkbox"></span>
            </label>
            <MenuManagerRecipeData /><br />
            <button onClick={() => props.saveMenuData(props.currentRecipe, props.menuFormData, {flags: props.catFlags})}>Menü speichern</button>
        </div>
    ) : "loading recipes";
}

export default connect(mapState, mapDispatch) (MenuManager);