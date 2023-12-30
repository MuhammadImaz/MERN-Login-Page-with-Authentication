const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    email: {type: String, requird: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, require: true}
})

//uper ka sab kuch basiclly aik variable me da rae. Everything in 1 bg basket. User wo big basket hai
const User = mongoose.model('User', userSchema)

module.exports = User
