import React, { useEffect } from 'react';
import mapState from '../redux/mapState';
import mapDispatch from '../redux/mapDispatch';
import { connect } from 'react-redux';
import { Divider, Paper, Typography } from '@mui/material';
import { FormatUnderlined } from '@mui/icons-material';
import BackButton from './assets/BackButton';

// RENDERS MENU CARD ACCORDING TO SET FLAGS IN MENU TABLE

function MenuCard(props) {

    useEffect(() => {
        const NEW_OBJ = Object.assign({}, props.menu.find(value => {return value.id === props.currentRecipeId}))
        delete NEW_OBJ.id
        props.setMenuFormData(NEW_OBJ)
        props.loadMenuCard()
    }, [props.menu])

    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
    })

    return props.menu && props.menuCard && props.recipes && props.categories && props.menuFormData.ingredients ? (
        <div>
            <Typography variant='h4' color="var(--dark-contrast)">Menükarte</Typography><br />
            {
                props.menu && props.menuCard && props.recipes && props.categories ?
                props.categories.map((cats, cat_index) => {
                    if(props.catFlags[cat_index])

                        return <>
                        <Paper sx={{ p: 3 }} elevation={4}>
                            <Typography variant="h5" align="left">{cats}</Typography><br />
                            {
                                props.recipes.map((recipes, recipe_index) => {
                                    if(props.menu[recipe_index].recipeFlag && recipes.cat === cat_index)
                                        {
                                            return <>
                                                <Typography align="left" fontWeight={"bold"} sx={{textDecoration: 'underline'}} paddingBottom={0}>{(recipe_index+1) + " - " + recipes.name}</Typography>
                                                {
                                                    <Typography align="left" fontSize={14} paddingTop={0}>
                                                    {props.recipes[recipe_index].ingredients.map((ingredients, ing_index) => {
                                                        if(props.menu[recipe_index].ingredients[ing_index])
                                                            return (ingredients[1] + ", ")
                                                    })}
                                                    </Typography>
                                                }
                                                {props.menu[recipe_index].description && <Typography align="left">{props.menu[recipe_index].description}</Typography>}
                                                {props.menu[recipe_index].notes && <Typography align="left" fontSize={12} paddingTop={0}>*{props.menu[recipe_index].notes}</Typography>}
                                                <Typography align="right" fontWeight={"bold"}>{formatter.format(props.menu[recipe_index].price)}</Typography>
                                                <Divider />
                                            </>
                                        }
                                })
                            }
                        </Paper><br /><br />
                        </>
                        
                }) : "loading"
            }
        </div>
    ) : "Loading Menu";
}

export default connect(mapState, mapDispatch) (MenuCard);