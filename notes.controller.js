const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
	const notes = await getNotes();
	
	const note = {
		title,
		id: Date.now().toString(),
	}
	
	notes.push(note);
	
	await fs.writeFile(notesPath, JSON.stringify(notes));
	console.log(chalk.bgGreen('Note added successfully.'));
}

async function getNotes() {
	const notes = await fs.readFile(notesPath, {encoding: 'utf8'});
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function removeNote(id) {
	const notes = await getNotes();
	const filteredNotes = notes.filter(note => note.id !== id);
	
	await fs.writeFile(notesPath, JSON.stringify(filteredNotes));
	
	console.log(chalk.bgGreen('Note removed successfully.'));
}

async function editNote(id, editedNote) {
	const notes = await getNotes();
	const editNoteIndex = notes.findIndex(note => note.id === id);
	notes[editNoteIndex].title = editedNote;
	
	await fs.writeFile(notesPath, JSON.stringify(notes));
	
	console.log(chalk.bgGreen('Note edited successfully.'));
}

module.exports = {
	addNote, getNotes, removeNote, editNote
}
