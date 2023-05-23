import './App.css';
import Darkmode from 'darkmode-js'
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

new Darkmode().showWidget()

function App(props) {  

  useEffect(() => {
    props.loadCategories()
    props.loadShoppinglist()        
    props.loadRecipes()
    props.loadMenu()
    props.loadCatFlags()
  }, [])

  return (
    <div className='Nav'>
      <Routes>
        <Route path="/" element={<Navigation />} />
        <Route path="/shoppinglist" element={<Shoppinglist />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/menumanager" element={<MenuManager />} />
        <Route path="/menucard" element={<MenuCard />} />
      </Routes>
    </div>
  );
}

export default connect(mapState,mapDispatch) (App);