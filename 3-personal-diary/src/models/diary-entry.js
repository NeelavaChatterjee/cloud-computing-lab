const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        minlength: 1
    }},
    {timestamps: true});

const DiaryEntry = mongoose.model('DiaryEntry', schema)

module.exports = DiaryEntry