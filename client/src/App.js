import React from 'react';
import { Router } from "@reach/router";
import NavBar from './NavBar';
import Dinner from "./Dinner";
import MenuDetails from "./MenuDetails";
import RestaurantList from "./RestaurantList";
import RestaurantDetails from"./RestaurantDetails";
import Admin from "./Admin";
import NotFound from "./NotFound";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <NavBar />

      </header>
      <main className="rc-main">
        
        <Router>
          <Dinner path="/" />
          <MenuDetails path="/menu/:menu_id" />
          <RestaurantList path="/restaurants" />
          <RestaurantDetails path="/restaurants/restaurant_id" />
          <Admin path="/admin" />
          <NotFound default />
        </Router>
      </main>
    </div>
  );
}

export default App;
