import './App.css';
import { Routes, Route } from 'react-router-dom'
import Shoppinglist from './components/Shoppinglist';
import Recipes from './components/Recipes';
import MenuManager from './components/MenuManager';
import MenuCard from './components/MenuCard';
import Navigation from './components/Navigation';
import { useEffect } from 'react';
import mapState from './redux/mapState';
import mapDispatch from './redux/mapDispatch';
import { connect } from 'react-redux';
import BottomNav from './components/BottomNav';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import BackButton from './components/assets/BackButton';
import { RocketLaunch } from '@mui/icons-material';


function App(props) {  

  useEffect(() => {
    props.loadCategories()
    props.loadShoppinglist()        
    props.loadRecipes()
    props.loadMenu()
    props.loadCatFlags()
  }, [])

  return (
    <>
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <RocketLaunch /> Gastroboy
          </Typography>
          <BackButton />
        </Toolbar>
      </AppBar>
    </Box>
    <Box className='Nav' sx={{mt: 6}}>
      <Routes>
        <Route path="/" element={<Navigation />} />
        <Route path="/shoppinglist" element={<Shoppinglist />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/menumanager" element={<MenuManager />} />
        <Route path="/menucard" element={<MenuCard />} />
      </Routes>
    </Box>
      <BottomNav />
</>
  );
}

export default connect(mapState,mapDispatch) (App);