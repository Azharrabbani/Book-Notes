import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/add', (req, res) => {
    res.render('addPage.ejs');
})

app.get('/book', (req, res) => {
    res.render('detail.ejs');
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})