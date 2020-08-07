const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const port = 4000;

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES

//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1)",
      [description]
    );

    res.status(200).json({ message: "Todo inserted successfully" });
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos
app.get("/todos", (req, res) => {
  const dbquery = "SELECT * FROM todo";

  pool
    .query(dbquery)
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => console.error(err.message));
});

//get a todo
app.get("/todo/:id", (req, res) => {
  const id = req.params.id;
  const dbquery = "SELECT * FROM todo WHERE todo_id=$1";

  pool
    .query(dbquery, [id])
    .then((result) => {
      res.status(200).json(result.rows[0]);
    })
    .catch((err) => console.error(err.message));
});
//update a todo
app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const { description } = req.body;
  const dbquery = "UPDATE todo SET description=$1 WHERE todo_id=$2 ";

  pool
    .query(dbquery, [description, id])
    .then((result) => res.status(201).json({ message: "Updated successfully" }))
    .catch((err) => {
      console.error(err.message);
      res.status(err.status).json({ error: "something went wrong" });
    });
});

//delete a todo
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const dbquery = "DELETE FROM todo WHERE todo_id=$1";

  pool
    .query(dbquery, [id])
    .then((result) => res.status(201).json({ message: "Removed successfully" }))
    .catch((err) => {
      console.error(err.message);
      res.status(err.status).json({ error: "something went wrong" });
    });
});
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
