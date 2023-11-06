const fs=require('fs');
const path=require('path');
const router=require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { notes } = require('../../db/db.json');
const { createNewNote, validateNote, deleteNote } = require('../../lib/notes');

router.get('/notes', (req, res) => {
    let results=notes;
    res.json(results);
}
);

router.post('/notes', (req, res) => {
    let newNote=req.body;
    let uniqueId=uuidv4();
    console.log(uniqueId);
    newNote.id=uniqueId;
    notes.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
    res.json(newNote);
}   
);

    
router.delete('/notes/:id', (req, res) => {
    let noteId=req.params.id;
    let newNoteId=0;
    notes=notes.filter(currentNote => {
        return currentNote.id != noteId;
    });
    const note = deleteNote (req.params.id, notes);
    res.json(note);
}   
);

module.exports=router;

// Path: lib/notes.js   
// Compare this snippet from Develop/public/assets/js/index.js:
// const getNotes = () =>
//   fetch('/api/notes', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//
// const saveNote = (note) =>
//   fetch('/api/notes', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(note)
//   });
//
// const deleteNote = (id) =>