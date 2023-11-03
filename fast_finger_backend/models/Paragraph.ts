import mongoose from "mongoose";
const Schema = mongoose.Schema;


const ItemSchema = new Schema({
    paragraph: {type: String, required: true},
    number_of_words : {type: Number, required: true},
});

const item = mongoose.model('Item', ItemSchema);

export default item;