import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 4000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});


app.get('/books', async (req, res) => {
    try{
        const result = await db.query("SELECT * FROM book INNER JOIN book_type ON book_type.id = book.book_type");
        res.json(result.rows);
    } catch (error){
        res.status(500).json({error: error.message});
    }
});

app.get('/books-type', async (req, res) => {
    try{
        const result = await db.query("SELECT * FROM book_type");
        res.json(result.rows);
    } catch (error){
        res.status(500).json({error : error.message});
    }
});

app.post('/add-book-type', async (req, res) => {
    const type = req.body.book_type;
    try{
        const result = await db.query("INSERT INTO book_type (type_title) VALUES ($1) RETURNING *", [type]);
        res.status(201).json(result.rows[0]);
    } catch (error){
        res.status(500).json({error: error.message});
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})