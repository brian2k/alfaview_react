import { useNavigate } from 'react-router-dom';
import ListCategory from './ListCategory';
import ListRecipes from './ListRecipes';
import mapState from '../redux/mapState';
import mapDispatch from '../redux/mapDispatch';
import { connect } from 'react-redux';
import RecipesView from './RecipesView';
import RecipesEdit from './RecipesEdit';
import RecipesNew from './RecipesNew';
import { useEffect } from 'react';
import BackButton from './assets/BackButton';
import { Button, Fab, Stack, Typography } from '@mui/material';
import { AddCircleOutline, Edit } from '@mui/icons-material';
import { Cancel } from '@mui/icons-material';
import * as styles from './Styles'
import { Add } from '@mui/icons-material';
import { Clear } from '@mui/icons-material';

function Recipes(props) {
    const navigation = useNavigate()

    useEffect(() => {
        props.resetStates()
    }, [])

    const checkFlagStatus = () => {
        if(!props.newRecipeFlag){
           props.newRecipe()
        }else{
            props.newRecipe()
            props.resetIngredientForm()
            props.setFormData({
                name: "",
                ingredients: [],
                notes: "",
                cooking: "",
                cat: 0
            })
        }
    }

    return (
        <div>
            <Stack
                spacing={2}
                direction="column"
                justifyContent="center">
                <ListCategory />
                <ListRecipes /><br /> 
            </Stack>
            {!props.editMode ? props.newRecipeFlag ? <RecipesNew /> : <RecipesView /> : <RecipesEdit />}
            {!props.newRecipeFlag && <Button 
                                        size="large"
                                        sx={{margin: "10px 0 0 0"}}
                                        fullWidth
                                        variant="contained"
                                        startIcon={<Edit/>}
                                        onClick={
                                            !props.editMode
                                            ? () => {
                                                props.recipeEditMode()   

                                                props.setFormData(
                                                    props.recipes.find(value => {return value.id === props.currentRecipeId})
                                                )
                                            }
                                            : () => props.saveRecipeEdit(props.currentRecipeId, props.formdata)
                                        } 
                                        className="edit"
                                        id="edit">{
                                            !props.editMode ? "Rezept bearbeiten" : "Änderungen speichern"
                                        }
                                    </Button>}
            {!props.editMode ?     
                            
                                <Fab
                                    style={styles.fabstyle}
                                    id="addRecipe"
                                    onClick={() => {
                                        checkFlagStatus()
                                    }}>
                                    {!props.newRecipeFlag ? <Add /> : <Clear /> }
                                </Fab>
                            :
                                <Button
                                    size="large"
                                    sx={{margin: "10px 0 0 0"}}
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<Cancel/>}
                                    id="addRecipe"
                                    onClick={() => {
                                        props.recipeEditMode()
                                        props.setFormData({
                                            name: "",
                                            ingredients: [],
                                            notes: "",
                                            cooking: "",
                                            cat: 0
                                        })
                                        props.resetIngredientForm()
                                    }}>
                                    "Abbrechen"
                                </Button>
                            
            }


        </div>            
    );
}

export default connect(mapState, mapDispatch) (Recipes);