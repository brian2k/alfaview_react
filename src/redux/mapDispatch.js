import axios from "axios"
import { LOCALHOST } from '../assets/baseURL'

const mapDispatch = (dispatch) => {
    return {
        // Use Methods to define payloads:

        resetStates: () => {
            dispatch({
                type: "RESET_STATES"
            })
        },

        // ========== SHOPPINGLIST ==============

        loadShoppinglist: () => {
            dispatch(() => {
                axios.get(`${LOCALHOST}/shoppinglist`)
                    .then(data => {
                        dispatch({
                            type: "LOAD_SHOPPINGLIST",
                            payload: data.data
                        })
                    })
            })
        },

         addGrocery: (item) => {
            dispatch(() => {
                axios.post(`${LOCALHOST}/shoppinglist`, item)
                    .then(data => {                        
                        dispatch({
                            type: "ADD_GROCERY",
                            payload: data.data
                        })
                    })
            })
        },

        selectCheckboxes: (id) => {
            dispatch({
                type: "SELECT_CHECKBOXES",
                payload: id
            })
        },

        deselectCheckboxes: (id) => {
            dispatch({
                type: "DESELECT_CHECKBOXES",
                payload: id
            })
        },

        checkGroceries: (ids) => {
            ids.forEach(id => {
                axios.delete(`${LOCALHOST}/shoppinglist/${id}`)
                    .then(() => {
                        dispatch({
                            type: "CHECK_GROCERIES",
                            payload: id
                        })
                    })
            });
        },

        // ========== CATEGORY LIST ==============

        selectCategory: (cat) => {
            dispatch({
                type: "SELECT_CAT",
                payload: cat
            })
        },

        loadCategories: () => {
            dispatch(() => {
                axios.get(`${LOCALHOST}/categories`)
                    .then(data => {
                        dispatch({
                            type: "LOAD_CATEGORIES",
                            payload: data.data
                        })
                    })
            })
        },

        // ========== RECIPE LIST ==============

        loadRecipes: () => {
            dispatch(() => {
                axios.get(`${LOCALHOST}/recipes`)
                    .then(data => {
                        dispatch({
                            type: "LOAD_RECIPES",
                            payload: data.data
                        })
                    })
            })
        },

        selectRecipe: (recipe) => {
            dispatch({
                type: "SELECT_RECIPE",
                payload: recipe
            })
        },

        setCurrentRecipe: (id) => {
            dispatch({
                type: "SET_CURRENT_RECIPE",
                payload: id
            })
        },

        // ========== RECIPE EDIT / NEW ==============

        recipeEditMode: () => {
            dispatch({
                type: "RECIPE_EDIT"
            })
        },

        setFormData: (data) => {
            dispatch({
                type: "SET_FORM_DATA",
                payload: data
            })
        },

        editRecipeData: (event) => {
            dispatch({
                type: "EDIT_RECIPE_DATA",
                payload: event
            })
        },

        deleteRecipe: (id) => {
            axios.delete(`${LOCALHOST}/recipes/${id}`)
            .then(data => {
                axios.delete(`${LOCALHOST}/menu/${id}`)
                .then(data => {
                    dispatch({
                        type: "DELETE_RECIPE",
                        payload: id
                    })
                })
            })
        },

        newRecipe: () => {
            dispatch({
                type: "NEW_RECIPE"
            })
        },

        saveNewRecipe: (formdata) => {            
            axios.post(`${LOCALHOST}/recipes`, formdata)
                .then(data => {     
                    const MENU_RECORD = {
                        recipeFlag: false,
                        cat: data.data.cat,
                        id: data.data.id,
                        name: data.data.name,
                        notes: "",
                        description: "",
                        ingredients: new Array(data.data.ingredients.length)
                    }
                    // CREATES MENU RECORD TOO TO MATCH RECIPES
                    axios.post(`${LOCALHOST}/menu`, MENU_RECORD)
                        .then(menu_data => {                            

                            dispatch({
                                type: "SAVE_NEW_RECIPE",
                                payload: data.data
                            })
                        })

                })
        },

        // ========== INGREDIENTS EDIT / NEW ==============

        addRecipeIngredient: (ingredient) => {
            dispatch({
                type: "ADD_RECIPE_INGREDIENT",
                payload: ingredient
            })
        },

        editIngredientAmount: (data) => {
            dispatch({
                type: "EDIT_INGREDIENT_AMOUNT",
                payload: data
            })
        },

        editIngredientItem: (data) => {
            dispatch({
                type: "EDIT_INGREDIENT_ITEM",
                payload: data
            })
        },

        saveRecipeEdit: (id, formdata) => {
            dispatch(() => {
                axios.put(`${LOCALHOST}/recipes/${id}`, formdata)
                    .then((data) => {
                        dispatch({
                            type: "SAVE_RECIPE_EDIT",
                            payload: data.data
                        })
                    })
            })
        },

        editIngredient: (id, amount, item) => {
            dispatch({
                type: "EDIT_INGREDIENT",
                payload: [id, amount, item]
            })
        },

        deleteIngredient: (id) => {
            // DELETE INGREDIENT IN DATABASE

            dispatch({
                type: "DELETE_INGREDIENT",
                payload: id
            })
        },

        saveIngredient: () => {
            dispatch({
                type: "SAVE_INGREDIENT"
            })
        },

        // ========== MENU MANAGER CHECKBOXES ==============

        setMenuFormData: (data) => {
            dispatch({
                type: "SET_MENU_FORM_DATA",
                payload: data
            })
        },

        loadMenu: () => {
            dispatch(() => {
                axios.get(`${LOCALHOST}/menu`)
                    .then(data => {
                        dispatch({
                            type: "LOAD_MENU",
                            payload: data.data
                        })
                    })
            })
        },

        loadCatFlags: () => {
            axios.get(`${LOCALHOST}/menucats/1`)
                .then(data => {
                    dispatch({
                        type: "LOAD_CAT_FLAGS",
                        payload: data.data.flags
                    })
                })
            
        },

        saveMenuData: (id, menuFormData, catFlags) => {
            axios.put(`${LOCALHOST}/menu/${id}`, menuFormData)
                .then(data => {
                    axios.put(`${LOCALHOST}/menucats/1`, catFlags)
                        .then(data => {
                            
                        })
                })
        },

        checkCategory: (event) => {
            dispatch({
                type: "CHECK_CATEGORY",
                payload: event
            })
        },

        checkRecipe: (event) => {
            dispatch({
                type: "CHECK_RECIPE",
                payload: event
            })
        },

        checkIngredient: (id) => {
            dispatch({
                type: "CHECK_INGREDIENT",
                payload: id
            })
        },

        uncheckIngredient: (id) => {
            dispatch({
                type: "UNCHECK_INGREDIENT",
                payload: id
            })
        },

        changeCategoryFlag: (id) => {
            dispatch({
                type: "CHANGE_CAT_FLAG",
                payload: id
            })
        },

        changeRecipeFlag: () => {
            dispatch({
                type: "CHANGE_RECIPE_FLAG"
            })
        },

        setMenuDescription: (data) => {
            dispatch({
                type: "SET_MENU_DESCRIPTION",
                payload: data
            })
        },

        setMenuNotes: (data) => {
            dispatch({
                type: "SET_MENU_NOTES",
                payload: data
            })
        },

        saveMenu: () => {
            
            dispatch({
                type: "SAVE_MENU"
            })
        },

        // ========== MENU CARD ==============

        loadMenuCard: () => {
            axios.get(`${LOCALHOST}/menu`)
                .then(data => {
                    dispatch({
                        type: "LOAD_MENU_CARD",
                        payload: data.data
                    })
                })
        }

    }
}

export default mapDispatch;