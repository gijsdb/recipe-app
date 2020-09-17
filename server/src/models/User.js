const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_FACTOR = 8

const { Schema } = mongoose;

const userSchema = new Schema({
    Name: {
        type: String,
        unique: true,
        required: true,
    },
    Email: {
        type: String,
        unique: true,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('Password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.Password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.Password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = async function comparePassword(data) {
    return bcrypt.compare(data, this.Password);
};



module.exports = mongoose.model('User', userSchema);