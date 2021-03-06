const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: may have some add-ons
const UserAccountSchema = new Schema({
    name: {
        type: String, 
        required: [true, 'Please add an username'],
        minlength: [3, 'Name too short: at least 3 characters'],
        maxlength: [10, 'Name too long: at most 10 characters']
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        maxlength: [254, 'Email too long: at most 254 characters']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        select: false
    },
    profile: { type: Schema.Types.ObjectId, ref: 'UserProfile' },
    status: {type: Number, default: 0}
}, { timestamps: true });

module.exports = mongoose.model('UserAccount', UserAccountSchema);