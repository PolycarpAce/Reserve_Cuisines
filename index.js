const express = require("express");
const mysql = require("mysql");
const app = express();
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

app.get("/", (req, res) => res.json({message:"Hello World!"}));
app.get("/api/customer", (req, res)=> {
    pool.query("SELECT customer_id, first_name, last_name, date_registered FROM customer", (error, rows)=> {
        if(error) {
            return res.status(500).json({error});

        }
        res.json(rows);
    } );

});

app.listen(9000, () => console.log("App listening on port 9000"));

