document.addEventListener('click', (event) => {
	if (event.target.dataset.type === 'remove') {
		const id = event.target.dataset.id;
		
		removeNote(id).then(() => {
			event.target.closest('li').remove();
		});
	} else if (event.target.dataset.type === 'edit') {
		const id = event.target.dataset.id;
		
		const editedNote = prompt('New text for note', event.target.closest('li').firstChild.textContent.trim())?.trim();
		
		editedNote && editNote(id, editedNote).then(() => {
			event.target.closest('li').firstChild.textContent = editedNote;
		});
	}
})

async function editNote(id, editedNote) {
	await fetch(`/${id}/${editedNote}`, {method: 'PUT'})
}

async function removeNote(id) {
	await fetch(`/${id}`, {method: 'DELETE'})
}