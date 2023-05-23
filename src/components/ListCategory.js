import React from 'react';
import mapState from '../redux/mapState'
import mapDispatch from '../redux/mapDispatch';
import { connect } from 'react-redux';

// LIST CATEGORIES IN DROPDOWN

function ListCategory(props) {
    return (
        <div>
            <select onChange={(event) => {
                    props.selectCategory(event.target.selectedIndex)
                    props.recipes.filter(value => {return value.cat === event.target.selectedIndex})[props.selectedRecipe]
                        && props.setCurrentRecipe(props.recipes.filter(value => {return value.cat === event.target.selectedIndex})[props.selectedRecipe].id)
                }}>
                {
                    props.categories.map((value,index) => {                   
                    return <option value={index} key={index}>{value}</option>
                })}
            </select>
        </div>
    );
}

export default connect(mapState, mapDispatch) (ListCategory);