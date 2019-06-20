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


app.get("/api/menu/:menu_id/restaurants", (req, res) => {
    pool.query(
        'SELECT d.restaurant_id FROM delicacy_relation d JOIN restaurants r ON r.restaurant_id = d.restaurant_id WHERE d.menu_id = ? ORDER BY r.restaurant_id',
        [req.params.restaurant_id],
        (error, rows) =>{
            if (error){
                return res.status(500).json({error});
            }
            res.json(rows);
        }
    );
});

app.post("/api/customer", (req, res) => {
    const cinema = req.body;
    if (!customer) {
        return res.status(400).json({error: "Invalid payload"});

    } 
    pool.query(
        "INSERT INTO customer (first_name, last_name,) VALUES (?)",
        [customer],
        (error, results) => {
            if (error) {
                return res.status(500).json({error});
            }

            res.json(results.insertId);
        }
    );
});

app. post("/api/menu", (req, res) => {
    const menu = req.body;

    if (!menu.dish_name) {
        return res.status(400).json({error: "Invalid payload" });

    }
     pool.query(
         "INSERT INTO menu (dish_name, price, preparation_time) VALUES (?, ?, ?)",
         [menu.dish_name],
         (error, results) => {
             if (error) {
                 return res.status(500).json({ error });

             }

             res.json(results.insertId);
         }
     );
});

app.post("/api/restaurants", (req, res) => {
    const restaurants = req.body;

    if (!restaurants.restaurant_name) {
        return res.status(400).json({ error: "Invalid payload"});
    
    }
    
    pool.query(
        "INSERT INTO restaurants (menu_id, restaurant_name, delicacy, capacity, open_hours, clossing_hours) VALUES (?, ?, ?, ?, ?)",
        [restaurants.restaurant_name],
        (error, results) => {
            if (error) {
                return res.status.json({ error });

            }

            res.json(results.insertId);
        }
    );

});


app.put("/api/menu/:menu_id", (res1, req) => {
    const menu = req.body;

    if (!menu.dish_name) {
        return res.status(400).json({ error: "Invalide payload"});
    }

    pool.query(
        "UPDATE menu SET dish_name = ? WHERE menu_id = ?",
        [menu.dish_name, req.params.menu_id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }

            res.json(results.changedRows);
        }
    );
});

app.put("/api/customer/:customer_id", (req, res) =>{
    const customer = req.body;

    if (!customer.first_name){
        return res.status(400).json({ error: "Invalid payload"});

    }

    pool.query(
        "UPDATE customer SET fisrt_name = ? WHERE customer_id = ?",
        [customer.first_name, req.params.customer_id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }

            res.json(results.changedRows);
        }

    );



});

app.delete("/api/restaurants/:restaurant_id", (req, res) => {
    pool.query(
        "DELETE FROM restaurants WHERE restaurant_id = ?",
        [req.params.restaurant_id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }

            res.json(results.affectedRows);
        }
    );
});

app.delete("/api/menu/:menu_id", (req, res) => {
    pool.query(
        "DELETE FROM menu WHERE menu_id = ?",
        [req.params.menu_id],
        (error , results) => {
            if (error) {
                return res.status(500).json({ error });
            }
            res.json(results.affectedRows);
        }
    );
});

app.delete("/appi/customer/:customer_id", (req, res) => {
    pool.query(
        "DELETE FROM customer WHERE customer_id = ?",
        [req.params.customer_id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }
            res.json(results.affectedRows);
        }
    );
});


app.listen(9000, () => console.log("App listening on port 9000"));

