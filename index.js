'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var Person = require('./model/person');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost:27017/testMegaDb', function (err) {
  if (err) {
    console.log('An error occurred while creating data base connection', err);
    process.exit(1);
  }
  console.log('Database connection successfully establish');
});

app.get('/', function (req, res) {
    res.send('<h1>Hello THIS IS TEST TASasdasK</h1>');
});

app.get('/mega', function (req, res) {
    res.send('<h1>welcome Mega</h1>');
});

app.get('/name/:name', function (req, res) {
   res.send('Welcome ' + req.params['name']);
});

app.get('/name/:name/age/:age', function (req, res) {
   res.send('Your name is ' + req.params['name'] + ' and age is ' + req.params['age']);
});

app.get('/query', function (req, res) {
   res.send('Your query params object is like ' + JSON.stringify(req.query));
});

app.delete('/mega', function (req, res) {
   res.send('DELETE METHOD FOR MEGA');
});

app.post('/person', function (req, res) {
    new Person({
     'first_name': req.body.first_name,
     'last_name': req.body.last_name
    }).save(function save(err, data) {
        if (err) {
            console.log('An error occurred while inserting data into collection', err);
            return res.status(500).send(JSON.stringify(err));
        }
        res.status(201).json(data.toObject());
    });
});

app.put('/person/:id', function (req, res) {
    Person.findById(req.params['id'], function (err, person) {
       if (err) {
           console.log('An error occurred while retrieving data from collection', err);
           return res.status(500).send(JSON.stringify(err));
       }
            person['first_name'] = req.body.first_name;
            person['last_name'] = req.body.last_name;
            if (person.isModified()) {
                person.increment();
            }
            person.save(function(err, updatedPerson) {
                if (err) {
                    console.log('An error occurred while updating data into collection', err);
                    return res.status(500).send(JSON.stringify(err));
                }
                res.json(updatedPerson.toObject());
            })
    });
});

app.delete('/person/:id', function (req, res) {
   Person.remove({_id: req.params.id}, function (err, record) {
       if (err) {
           console.log('An error occurred while deleting data from collection', err);
           return res.status(500).send(JSON.stringify(err));
       }
       return res.json(record);
   })
});

app.get('/person', function (req, res) {
   Person.find({}, function (err, personsData) {
       if (err) {
           console.log('An error occurred while retrieving data from collection', err);
           return res.status(500).send(JSON.stringify(err));
       }
       return res.json(personsData)
   })
});

app.listen(9000, function (err) {
    if (err) {
        console.log('An error occurred while start the server on port 9000', err);
        process.exit(1);
    }
    console.log('Server start successfully on http://localhost:9000')
});