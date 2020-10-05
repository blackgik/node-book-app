// creating a books api
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./new.js');
const { demand, argv } = require('yargs');
const { listNotes } = require('./new.js');

// creating our yargs version
yargs.version('2.1.0');
// creating the add command
yargs.command({
    command: 'add',
    describe: 'this is an add function',
    builder: {
        title:{
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'notes body',
            demandOption: true,
            type: 'string',
        }
    },
    handler: function (argv){
        notes.addNotes(argv.title, argv.body)
    }
});

//creating a remove function;
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title:{
            describe: 'note title',
            demandOption: true,
            type: 'string',
        },

    },
    handler: function(argv) {
        notes.removeNotes(argv.title );
    }
})

// reading from the directory, the notes stored
yargs.command({
    command: 'read',
    describe: 'reading file',
    builder: {
        title: {
            describe: 'read notes',
            demandOption:true,
            type: 'string',
        }
    },
    handler: function(argv) {
        notes.readNotes(argv.title);
    }

});

// listing command line
yargs.command({
    command: "list",
    describe: 'lisitng notes available',
    handler: function (){
       notes.listNotes();
    }
})

// parsing the arguments in the commans line 
yargs.parse();
