// script.js
const noteInput = document.getElementById('note-input');
const saveNoteButton = document.getElementById('save-note');
const notesList = document.getElementById('notes-list');
const imageUploadInput = document.getElementById('image-upload');
const documentUploadInput = document.getElementById('document-upload');
const uploadFileButton = document.getElementById('upload-file');
const uploadsList = document.getElementById('uploads-list');

let notes = [];

saveNoteButton.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    if (noteText) {
        notes.push(noteText);
        noteInput.value = '';
        displayNotes();
    }
});

uploadFileButton.addEventListener('click', () => {
    const files = [...imageUploadInput.files, ...documentUploadInput.files];
    files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
            const fileURL = reader.result;
            const fileType = file.type;
            const fileName = file.name;
            const uploadItem = document.createElement('li');
            uploadItem.textContent = `${fileName} (${fileType})`;
            uploadsList.appendChild(uploadItem);
        };
        reader.readAsDataURL(file);
    });
});

function displayNotes() {
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        const noteItem = document.createElement('li');
        noteItem.textContent = note;
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-button';
        editButton.addEventListener('click', () => {
            editNote(index);
        });
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => {
            deleteNote(index);
        });
        noteItem.appendChild(editButton);
        noteItem.appendChild(deleteButton);
        notesList.appendChild(noteItem);
    });
}

function editNote(index) {
    const noteText = prompt('Edit note:', notes[index]);
    if (noteText) {
        notes[index] = noteText;
        displayNotes();
    }
}

function deleteNote(index) {
    if (confirm('Are you sure you want to delete this note?')) {
        notes.splice(index, 1);
        displayNotes();
    }
}

displayNotes();