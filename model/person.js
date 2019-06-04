'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    }
    // },
    // address: {
    //     street_name: {
    //         type: String
    //     },
    //     city: {
    //         type: String
    //     },
    //     pincode: {
    //         type: String
    //     }
    // },
    // phone_numbers: [String]
}, {
    collection: 'Person'
});

module.exports = mongoose.model('Person', personSchema);
