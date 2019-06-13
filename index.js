require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const app = express();
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

app.get("/", (req, res) => res.json({message:"ACE!"}));

app.get("/api/restaurants", (req, res) => {
    pool.query("SELECT restaurant_id, restaurant_name, delicacy, menu_id, capacity, open_hours, closing_hours FROM restaurants", (error, rows)=> {
        if(error) {
            return res.status(500).json({error});

        }
        res.json(rows);
    } );

    
});

app.get("/api/restaurants/:restaurant_id", (req, res) => {
    pool.query(
        "SELECT restaurant_id, restaurant_name, delicacy, menu_id, capacity, open_hours, closing_hours FROM restaurants WHERE restaurant_id = ? ",
        [req.params.restaurant_id],
        (error,rows) => {
            if (error) {
                return res.status(500).json({error});
            }

            res.json(rows);
        }
    );
});

app.get("/api/restaurants/:restaurant_id/menu", (req, res) =>{
    pool.query(
        'SELECT d.menu_id, d.restaurant_id, m.preparation_time, m.dish_name, m.restaurant_id, m.menu_id, m.price FROM delicacy_relation d JOIN menu m ON m.menu_id = d.menu_id WHERE d.restaurant_id = ? GROUP BY m.menu_id, d.restaurant_id ORDER BY m.dish_name, d.restaurant_id',
        [req.params.menu_id],
        (error, rows) => {
            if (error){
                return res.status(500).json({ error });

            }

            res.json(rows);
            
        }
        
        


    );
});

app.get("/api/menu/:menu_id", (req, res)=> {
    pool.query(
        'SELECT m.menu_id, m.dish_name, m.restaurant_id, m.price, m.preparation_time FROM menu m WHERE m.menu_id = ? GROUP BY m.menu_id',
        [req.params.menu_id],
        (error, rows) =>{
            if (error) {
                return res.status(500).json({ error });
            }
            res.json(rows);
        }
    );

});

app.listen(9000, () => console.log("App listening on port 9000"));

