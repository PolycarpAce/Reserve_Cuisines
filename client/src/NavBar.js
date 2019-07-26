import React from "react";

function NavBar(){
    return(
        <div className="rc-container">
            <nav className="rc-nav">
                <span className="rc-title">Reserve Cuisine</span>
                <a href="/">Home</a>
                <a href="/restaurants">Restaurants</a>
                <a href="/menu">Menu</a>
                
            </nav>
        </div>
    );

}

export default NavBar;