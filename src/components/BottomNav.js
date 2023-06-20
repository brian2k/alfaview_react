import { CalendarMonth } from '@mui/icons-material';
import { AccountCircle } from '@mui/icons-material';
import { Checklist } from '@mui/icons-material';
import { Home } from '@mui/icons-material';
import { LibraryBooks } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Button, Fab, Paper } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function BottomNav(props) {
    const [navigationValue, setnavigationValue] = React.useState()

    const handleChange = (event, newValue) => {
        setnavigationValue(newValue);
    }

    return (
        <div>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation value={navigationValue} onChange={handleChange}>
                    <BottomNavigationAction icon={<Checklist />} label="Shoppinglist" LinkComponent={Link} to="/shoppinglist"/>
                    <BottomNavigationAction icon={<LibraryBooks />} LinkComponent={Link} to="/recipes" label="Recipes" />
                    <BottomNavigationAction icon={<Home />} LinkComponent={Link} to="/" label="Home" />
                    <BottomNavigationAction icon={<CalendarMonth />} LinkComponent={Link} to="/menumanager" label="Calendar" />
                    <BottomNavigationAction icon={<AccountCircle />} LinkComponent={Link} to="/menucard" label="Profile" />
                </BottomNavigation>
            </Paper>
        </div>
    );
}

export default BottomNav;