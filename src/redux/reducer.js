const initState = {
    categories: [],
    recipes: [],
    menu: [],
    selectedCat: 0,
    selectedRecipe: 0,
    selectedCheckboxes: [],
    shoppinglist: [],
    editMode: false,
    editModeIngredient: false,
    newRecipeFlag: false,
    currentRecipe: 1,
    ingredientEdit: {id: 0, amount: "", item: ""},
    ingredientChecklist: [],
    recipeFlag: false,
    menuDescription: "",
    menuNotes: "",
    menuCard: [],    
    catFlags: [],
    menuFormData: {
        recipeFlag: false,
        name: "",
        ingredients: [],
        notes: "",
        description: "",
        id: 0,
        cat: 0
    },
    formdata: {
        name: "",
        ingredients: [],
        notes: "",
        cooking: "",
        cat: 0
    },    
}

const reducer = (state = initState, action) => {

    // Logic for the Methods used in mapDispatch

    switch(action.type){

        case "RESET_STATES":
            return {
                ...state,
                selectedCat: 0,
                selectedRecipe: 0,
                selectedCheckboxes: [],
                editMode: false,
                newRecipeFlag: false,
                // TO DO? Doesnt get set again to the right database id, right after state got a reset
                // Check useEffect in RecipeView
                // currentRecipe: 0,
                ingredientEdit: {id: 0, amount: "", item: ""},
                formdata: {
                    name: "",
                    ingredients: [],
                    notes: "",
                    cooking: "",
                    cat: 0
                }
            }

        // ========== SHOPPINGLIST ==============
  
        case "LOAD_SHOPPINGLIST":
            return {
                ...state,
                shoppinglist: action.payload
            }

        case "ADD_GROCERY":
            return {
                ...state,
                shoppinglist: [...state.shoppinglist, action.payload]
            }

        case "SELECT_CHECKBOXES":
            return {
                ...state,
                selectedCheckboxes: [...state.selectedCheckboxes, action.payload]
            }

        case "DESELECT_CHECKBOXES":
            return {
                ...state,
                selectedCheckboxes: action.payload
            }

        case "CHECK_GROCERIES":
            const NEW_LIST = state.shoppinglist.filter(value => {
                return value.id !== action.payload
            })

            return {
                ...state,
                shoppinglist: NEW_LIST,
                selectedCheckboxes: []
            }      

        // ========== CATEGORY LIST ==============

        case "SELECT_CAT":
            return {
                ...state,
                selectedCat: action.payload,
                selectedRecipe: 0,
                editMode: false,
                newRecipeFlag: false,
                selectedCheckboxes: [],
                formdata: {
                    name: "",
                    ingredients: [],
                    notes: "",
                    cooking: "",
                    cat: 0
                }
            }

        case "LOAD_CATEGORIES":
            return {
                ...state,
                categories: action.payload
            }

        // ========== RECIPE LIST ==============

        case "LOAD_RECIPES":
            return {
                ...state,
                recipes: action.payload
            }

        case "SELECT_RECIPE":
            return {
                ...state,
                selectedRecipe: action.payload,
                editMode: false,
                newRecipeFlag: false,
                formdata: {
                    name: "",
                    ingredients: [],
                    notes: "",
                    cooking: "",
                    cat: 0
                }
            }

        case "SET_CURRENT_RECIPE":
            return {
                ...state,
                currentRecipe: action.payload
            }

        // ========== RECIPE EDIT / NEW ==============

        case "RECIPE_EDIT":
            return {
                ...state,
                editMode: !state.editMode
            }

        case "SET_FORM_DATA":
            return {
                ...state,
                formdata: {
                    name: action.payload.name,
                    ingredients: action.payload.ingredients,
                    cooking: action.payload.cooking,
                    notes: action.payload.notes,
                    cat: action.payload.cat
                }
            }

        case "EDIT_RECIPE_DATA":
            return {
                ...state,
                formdata: {
                    ...state.formdata,
                    [action.payload.target.name]: action.payload.target.value
                }
            }

        case "DELETE_RECIPE":
            const NEW_ARRAY = state.recipes.filter(value => {
                return value.id != action.payload
            })

            return {
                ...state,
                editMode: false,
                selectedRecipe: 0,
                newRecipeFlag: false,
                currentRecipe: 1,
                recipes: NEW_ARRAY
            }

        case "NEW_RECIPE":
            return {
                ...state,
                newRecipeFlag: !state.newRecipeFlag,
                formdata: {
                    ...state.formdata,
                    cat: state.selectedCat
                }
            }

        case "SAVE_NEW_RECIPE":
            return {
                ...state,
                recipes: [...state.recipes, action.payload],
                currentRecipe: action.payload.id,
                newRecipeFlag: false,
                ingredientEdit: {
                    id: 0,
                    amount: "",
                    item: ""
                },
                formdata: {
                    name: "",
                    ingredients: [],
                    notes: "",
                    cooking: "",
                    cat: 0
                }
            }

        // ========== INGREDIENTS EDIT / NEW ==============

        case "ADD_RECIPE_INGREDIENT":
            return {
                ...state,
                formdata: {
                    ...state.formdata,
                    ingredients: action.payload
                }
            }

        case "EDIT_INGREDIENT_AMOUNT":
            return {
                ...state,
                ingredientEdit: {
                    id: state.ingredientEdit.id,
                    amount: action.payload, 
                    item: state.ingredientEdit.item
                }
            }

        case "EDIT_INGREDIENT_ITEM":
            return {
                ...state,
                ingredientEdit: {
                    id: state.ingredientEdit.id,
                    amount: state.ingredientEdit.amount,
                    item: action.payload
                }
            }

        case "SAVE_RECIPE_EDIT":
            const NEW_RECIPES = state.recipes.map(value => {
                if (value.id === state.currentRecipe)
                    return action.payload
                else return value
            })

            return {
                ...state,
                recipes: NEW_RECIPES,
                editMode: false,
                formdata: {
                    name: "",
                    ingredients: [],
                    notes: "",
                    cooking: "",
                    cat: 0
                } 
            }

        case "EDIT_INGREDIENT":
            return {
                ...state,
                ingredientEdit: {
                    id: action.payload[0],
                    amount: action.payload[1],
                    item: action.payload[2]
                },
                editModeIngredient: true
            }


        case "SAVE_INGREDIENT":
            const NEW_INGREDIENT = state.formdata.ingredients.map((value, index) => {
                if (index === state.ingredientEdit.id) return [state.ingredientEdit.amount, state.ingredientEdit.item]
                else return value
            })  
            
            if (state.editModeIngredient){

                return {
                    ...state,
                    formdata: {
                        ...state.formdata,
                        ingredients: NEW_INGREDIENT
                    },
                    editModeIngredient: false,
                    ingredientEdit: {
                        amount: "",
                        id: 0,
                        item: ""
                    }
                }
            }else{
                return {
                    ...state,
                    formdata: {
                        ...state.formdata,
                        ingredients: [...state.formdata.ingredients, [state.ingredientEdit.amount, state.ingredientEdit.item]]
                    },
                    ingredientEdit: {
                        amount: "",
                        id: 0,
                        item: ""
                    }
                }
            }

        case "DELETE_INGREDIENT":
            const INGREDIENTS_AFTER_DELETE = state.formdata.ingredients.filter((value, index) => {
                return index !== action.payload
            })
            return {
                ...state,
                formdata: {
                    ...state.formdata,
                    ingredients: INGREDIENTS_AFTER_DELETE
                }

            }

        // ========== MENU MANAGER / CHECKBOXES ==============

        case "SET_MENU_FORM_DATA":
            return {
                ...state,
                menuFormData: action.payload
            }

        case "LOAD_MENU":
            return {
                ...state,
                menu: action.payload
            }

        case "LOAD_CAT_FLAGS":
            return {
                ...state,
                catFlags: action.payload
            }

        case "CHECK_INGREDIENT":
            const NEW_INGREDIENT_FLAG = state.menuFormData.ingredients.map((value, index) => {
                if(index === action.payload) return true
                else return value
            })

            return {
                ...state,
                menuFormData: 
                {
                    ...state.menuFormData,
                    ingredients: NEW_INGREDIENT_FLAG
                }
            }

        case "UNCHECK_INGREDIENT":
            
            const NEW_INGREDIENT_FLAG_UNCHECK = state.menuFormData.ingredients.map((value, index) => {
                if(index === action.payload) return false
                else return value
            })

            return {
                ...state,
                menuFormData: 
                {
                    ...state.menuFormData,
                    ingredients: NEW_INGREDIENT_FLAG_UNCHECK
                }
            }
            
        case "CHANGE_CAT_FLAG":

            const NEW_FLAGS = state.catFlags.map((value, index) => {
                if(index === action.payload)
                    return !value
                else
                    return value
            })
            return {
                ...state,
                catFlags: NEW_FLAGS
            }

        case "CHANGE_RECIPE_FLAG":
            return {
                ...state,
                menuFormData: {
                    ...state.menuFormData,
                    recipeFlag: !state.menuFormData.recipeFlag
                }           
            }

        case "SET_MENU_DESCRIPTION":
            return {
                ...state,
                menuFormData: 
                {
                    ...state.menuFormData,
                    description: action.payload
                }
            }

        case "SET_MENU_NOTES":
            return {
                ...state,
                menuFormData: 
                {
                    ...state.menuFormData,
                    notes: action.payload
                }
            }

        // ========== MENU CARD ==============

        case "LOAD_MENU_CARD":
            return {
                ...state,
                menuCard: action.payload
            }


        default:
            return state
    }
}

export default reducer;