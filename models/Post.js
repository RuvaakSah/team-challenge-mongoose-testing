const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'El título es obligatorio'] 
    },
    body: { 
        type: String, 
        required: [true, 'El cuerpo de la publicación es obligatorio'] 
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);