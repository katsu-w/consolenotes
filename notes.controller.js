const chalk = require('chalk');
const Note = require('./models/Note');

async function addNote(title) {
	await Note.create({title});
	
	console.log(chalk.bgGreen('Note added successfully.'));
}

async function getNotes() {
	const notes = await Note.find();
	return notes;
}

async function removeNote(id) {
	await Note.deleteOne({_id: id});
	
	console.log(chalk.bgGreen('Note removed successfully.'));
}

async function editNote(id, editedNote) {
	await Note.updateOne({_id: id}, {title: editedNote});
	
	console.log(chalk.bgGreen('Note edited successfully.'));
}

module.exports = {
	addNote, getNotes, removeNote, editNote
}
