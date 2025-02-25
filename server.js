import express, { response } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


app.get('/', async (req, res) => {
    try{
        const response_book = await axios.get(`${API_URL}/book`);
        const response_type = await axios.get(`${API_URL}/book-type`);
        res.render('index.ejs', {
            books: response_book.data,
            types: response_type.data
        });
    } catch (error){
        res.render('index.ejs', {
            books: [], 
            types: [],
            error: error.message
        });
    }
});

app.post('/type', async (req, res) => {
    console.log("Received Data:", req.body); 
    try{
        await axios.post(`${API_URL}/add-book-type`, req.body);
        res.redirect('/');
    } catch (error){
        res.redirect('/');
    }
});

app.get('/add', (req, res) => {
    res.render('addPage.ejs');
});

app.get('/book', (req, res) => {
    res.render('detail.ejs');
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});