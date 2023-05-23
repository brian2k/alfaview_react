import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation(props) {
    return (
        <div>
            <h2>Gastro App</h2><br />
            <NavLink to="/shoppinglist">Shoppinglist</NavLink><br />
            <NavLink to="/recipes">Recipes</NavLink><br />
            <NavLink to="/menumanager">Menu Manager</NavLink><br />
            <NavLink to="/menucard">Menu Cards</NavLink>
        </div>
    );
}

export default Navigation;