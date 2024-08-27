const mongoose = require('mongoose')


const alienSchema = new mongoose.Schema
({

    name: 
    {
        type: String,
        required: true
    },
    rollno: 
    {
        type: String,
        required: true
    },
    sub: 
   {
        type: Boolean,
        required: true,
        default: false
    },
    cgpa: 
    {
         type: String,
         required:true,
     }
 

})

module.exports = mongoose.model('Alien',alienSchema)
