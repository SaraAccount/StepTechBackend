const mongoose = require('mongoose');

const forumPostSchema = new mongoose.Schema({
    name: { type: String, required: true },
    post: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }  
});

const ForumPost = mongoose.model('ForumPost', forumPostSchema);

module.exports = ForumPost;



