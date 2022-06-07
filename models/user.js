const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 6

const userSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, unique: true, maxlength: 10, required: true},
    email: {type: String, unique: true, trim: true, lowercase: true, required: true},
    password: {type: String, trim: true, minLength: 5, required: true},
    account: {type: String, require: true, default: "gamer", enum: ['gamer', 'developer', 'admin']},
    bought: [{type: Schema.Types.ObjectId, ref: 'Game' }],
    question1: {
        type: String,
        enum: [
            "What is your mother's maiden name?",
            "What is the name of your first pet?",
            "What was your first car?",
            "What elementary school did you attend?",
            "What is the name of the town where you were born?",
            "Where did you meet your spouse?"
        ]
    },
    answer1: String,
    question2: {
        type: String,
        enum: [
            "What is your mother's maiden name?",
            "What is the name of your first pet?",
            "What was your first car?",
            "What elementary school did you attend?",
            "What is the name of the town where you were born?",
            "Where did you meet your spouse?"
        ]
    },
    answer2: String,
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