const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
    console.log(req.body);
  
    const { errors } = req.body;
  
    if (req.body) {
      const newError = {
        error_id: uuidv4(),
        time: Date.now(),
        errors
      };
  
      readAndAppend(newError, './db/diagnostics.json');
      res.json(`Error added successfully 🚀`);
    } else {
      res.error('Error in adding error');
    }
  });


module.exports = diagnostics;
