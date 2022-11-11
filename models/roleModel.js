const mongoose = require('mongoose');

const Roles = new mongoose.Schema({
    roleType:{
        type: String,
        required: [true, 'A role must be entered.'],
        unique:[true,"This role already exists."],
    }
});

const Role = mongoose.model('roles', Roles)
module.exports = Role