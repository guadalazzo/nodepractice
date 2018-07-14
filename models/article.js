let mongoose = require('mongoose');
// Article Schema formate from article body
let articleSchema = mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    author:{
        type: String,
        required:true
    },
    body:{
        type: String,
        required:true
    }
});

let Article = module.exports = mongoose.model('Article',articleSchema);