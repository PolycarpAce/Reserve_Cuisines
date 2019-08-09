import React from "react";
import RestaurantAdmin from "./RestaurantAdmin";
import MenuAdmin from "./MenuAdmin"

function Admin() {
    return (
       <div className="rc-conteiner">
           <RestaurantAdmin />
           <MenuAdmin />
       </div>
    );
}


export default Admin;