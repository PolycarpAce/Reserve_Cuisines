import React from "react";
import { Link } from "@reach/router";

function NavBar(){
    return(
        <div className="rc-container">
            <nav className="rc-nav">
                <span className="rc-title">Reserve Cuisine</span>
                <link to="/">Home</link>
                <link to="/restaurants">Restaurants</link>
                <link to="/menu">Menu</link>
                
            </nav>
        </div>
    );

}

export default NavBar;