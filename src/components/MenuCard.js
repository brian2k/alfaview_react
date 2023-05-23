import React, { useEffect } from 'react';
import mapState from '../redux/mapState';
import mapDispatch from '../redux/mapDispatch';
import { connect } from 'react-redux';

// RENDERS MENU CARD ACCORDING TO SET FLAGS IN MENU TABLE

function MenuCard(props) {

    useEffect(() => {
        const NEW_OBJ = Object.assign({}, props.menu.find(value => {return value.id === props.currentRecipe}))
        delete NEW_OBJ.id
        props.setMenuFormData(NEW_OBJ)
        props.loadMenuCard()
    }, [props.menu])

    return props.menu && props.menuCard && props.recipes && props.categories && props.menuFormData.ingredients ? (
        <div>
            <h1>Menükarte</h1><br />
            (Preise bitte anfragen)<br /><br />
            {
                props.menu && props.menuCard && props.recipes && props.categories ?
                props.categories.map((cats, cat_index) => {
                    if(props.catFlags[cat_index])
                        return <>
                            <h2>{cats}</h2><br />
                            {
                                props.recipes.map((recipes, recipe_index) => {
                                    if(props.menu[recipe_index].recipeFlag && recipes.cat === cat_index)
                                        {
                                            return <>
                                                <b>{recipes.name}</b><br />
                                                {
                                                    props.recipes[recipe_index].ingredients.map((ingredients, ing_index) => {
                                                        if(props.menu[recipe_index].ingredients[ing_index])
                                                            return <>{ingredients[1]},</>
                                                    })
                                                }<br/ ><br/ >
                                            </>
                                        }
                                })
                            }

                        </>
                        
                }) : "loading"
            }
        </div>
    ) : "Loading Menu";
}

export default connect(mapState, mapDispatch) (MenuCard);