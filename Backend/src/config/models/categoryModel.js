const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoriesSchema = new Schema({
    name: { type: String, required: true, trim:true, unique:true },
    singleDigitKey: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return /^[0-9]$/.test(value);
            },
            message: props => `${props.value} is not a valid single digit (0-9).`
        }
    },
});

module.exports = mongoose.model('categories', categoriesSchema);