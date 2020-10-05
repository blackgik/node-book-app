const fs  = require('fs');
const chalk = require('chalk')

// add notes function
const addNotes = function(title, body) {
    const notes = loadNotes();
    const duplicateNote = notes.find((note)=>note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        console.log(chalk.green(title) + ' note has been added');
    }else{
        console.log(`note with title, '${chalk.red(title)}' already added` )
    }

    saveNotes(notes);
}

//function to remove the notes selected
const removeNotes = function(title) {
    const notes = loadNotes();
    const selectedNotes = notes.filter(note=> note.title !== title);
    
    if(notes.length === selectedNotes.length) {
        console.log(`sorry title selected ${chalk.green.bold(title)} does not exist`)
    }else{
        // console.log(selectedNotes)
        saveNotes(selectedNotes);
        console.log('note removed from log successfully')
    }
}

// function to create notes
const listNotes = () => {
    console.log(chalk.inverse.green.bold('........YOUR NOTES.......'))
    const notes = loadNotes()
    notes.forEach(element => {
        console.log(element.title)
    });

}

const readNotes = (title)=> {
    const notes = loadNotes();
    const findNoteToRead = notes.find(note=>note.title === title);

    if(findNoteToRead) {
            console.log(chalk.inverse(findNoteToRead.title) + '\n' + findNoteToRead.body)
        }else{
            console.log(chalk.red.bold('!ERROR, note not in library'))
        }
}


//saving our notes after running the file
const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}
//before we add notes we a function to always load the notes first.
const loadNotes = function() {
    try{
        const bufferdata = fs.readFileSync('notes.json');
        const data = bufferdata.toString()
        parsedData = JSON.parse(data);
        return parsedData
    } catch (e) {
        return [];
    }
}

module.exports = {
    addNotes: addNotes,
    loadNotes: loadNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}