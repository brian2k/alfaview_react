import React from 'react';
import mapState from '../redux/mapState'
import mapDispatch from '../redux/mapDispatch';
import { connect } from 'react-redux';

// LIST RECIPES IN DROPDOWN

function ListRecipes(props) {
    return (
        <div>
            <select onChange={(event) => {
                    props.selectRecipe(event.target.selectedIndex)
                    props.setCurrentRecipe(props.recipes.filter(value => {return value.cat === props.selectedCat})[event.target.selectedIndex].id)
                }}>
                {
                    props.recipes.filter(value => {return value.cat === props.selectedCat })
                        .map((value,index) => {                   
                            return props.selectedCat === value.cat
                                && <option value={index} key={value.id}>{value.name}</option>
                        })
                }
            </select>
        </div>
    );
}

export default connect(mapState,mapDispatch) (ListRecipes);