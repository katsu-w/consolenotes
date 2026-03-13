const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const {
	addNote,
	getNotes,
	removeNote,
	editNote
} = require('./notes.controller.js');

const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());

app.get('/', async (req, res) => {
	res.render('index', {
		title: 'Express Notes',
		notes: await getNotes(),
		created: false,
		error: false
	});
})

app.post('/', async (req, res) => {
	try {
		await addNote(req.body.title);
		res.render('index', {
			title: 'Express Notes',
			notes: await getNotes(),
			created: true,
			error: false
		});
	} catch (error) {
		console.error('Creation error', error);
		res.render('index', {
			title: 'Express Notes',
			notes: await getNotes(),
			created: false,
			error: true
		});
	}
})

app.delete('/:id', async (req, res) => {
	await removeNote(req.params.id);
	res.render('index', {
		title: 'Express Notes',
		notes: await getNotes(),
		created: false,
		error: false
	});
})

app.put('/:id/:editedNote', async (req, res) => {
	await editNote(req.params.id, req.params.editedNote);
	res.render('index', {
		title: 'Express Notes',
		notes: await getNotes(),
		created: false,
		error: false
	})
})

mongoose.connect('mongodb://user:mongopass@localhost:27017/notes?authSource=admin').then(() => {
	app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	})
})

