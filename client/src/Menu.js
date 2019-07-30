import React from "react";
import { Link } from "@reach/router";

function Menu({ availableDinner }){
    const { menu_id, dish_name, restaurant_id , price, preparation_time, dinner_count } = availableDinner;
    let dinnerText = "";

    if (dinner_count == 0) {
        dinnerText = "No Dinner available";
    }else if (dinner_count == 1){
        dinnerText = "1 Dinner available";
    }else{
        dinnerText = " available"
    }

    return(
        <div className ="rc-menu">
            <img className="rc-poster" src={"Cropped_20181105_134740.jpg"} alt={dish_name}/>
            <div className="rc-menu-body">
                <div className="rc-title">{dish_name}</div>
                <p className = "rc-dinner-count">{dinnerText}</p>
            </div>
            <div className="rc-menu-footer">
                <Link to={'/menu/${menu_id}'} className="rc-btn rc-btn-dinner">
                    See Dinner
                </Link>
            </div>
        </div>
    );
}



export default Menu;