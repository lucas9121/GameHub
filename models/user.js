const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 6

const userSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, unique: true, maxlength: 10, required: true},
    email: {type: String, unique: true, trim: true, lowercase: true, required: true},
    password: {type: String, trim: true, minLength: 5, required: true},
    account: {type: String, require: true, default: "gamer", enum: ["gamer", 'developer', 'admin']}
}, 
{
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password
            return ret
        }
    }
});


// allows the password to be changed and the new on to be saved
userSchema.pre('save', async function(next) {
    //if password wasn't changed
    if(!this.isModified('password')) return next();
    // if it was, update new password with computed hash
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
})

module.exports = mongoose.model('User', userSchema)