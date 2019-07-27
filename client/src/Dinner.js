import React from "react";
import Menu from "./Menu";

function Dinner({ availableDinner }) {
    return(
        <div className="rc-container">
            <div className="rc-dinner">
                {availableDinner.map(m =>(
                    <Menu key={m.menu_id} availableDinner={m} />
                ))}
            </div>
        </div>

    );
}

export default Dinner;