const express = require('express');

const {addNote, getNotes} = require('./notes.controller.js');

const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.urlencoded({extended: true}));

app.get('/', async (req, res) => {
	res.render('index', {title: 'Express Notes', notes: await getNotes()});
})

app.post('/', async (req, res) => {
	await addNote(req.body.title);
	res.render('index', {title: 'Express Notes', notes: await getNotes()});
})

app.listen(port, () => {
})