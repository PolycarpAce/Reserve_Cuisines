import React from 'react';
import NavBar from './NavBar';
import Dinner from "./Dinner";
import './App.css';

const AVAILABLE_DINNER = [
  {
    menu_id: 1,
    dish_name: "Panzenella",
    restaurant_id: 3,
    price:600,
    preparation_time:"00:02:00"
  },

  {
    menu_id: 2,
    dish_name: "French touast",
    restaurant_id: 2,
    price:250,
    preparation_time:"00:00:30"

  },
  {
    menu_id: 3,
    dish_name: "Bruschetta",
    restaurant_id:4 ,
    price:300,
    preparation_time:"00:01:00"
  }
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <NavBar />

      </header>
      <main className="rc-main">
        <Dinner availableDinner={AVAILABLE_DINNER} />
      </main>
    </div>
  );
}

export default App;
