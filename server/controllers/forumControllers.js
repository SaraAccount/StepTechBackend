console.log("forumcontrollers"); 
const mongoose = require('mongoose');
const ForumPost = require('../models/forum'); 
const jwt = require('jsonwebtoken');


function generateJWTToken(user) {
  const token = jwt.sign({ id: user.id, name: user.name }, process.env.SECRET);
  return token;
}

let add_post = async (req, res) => {
    const { name, post } = req.body;

    if (!name || !post) {
        return res.status(400).json({ error: 'Name and post content are required' });
    }

    try {
        const newPost = new ForumPost({
            name,
            post
        });

        await newPost.save();

        return res.status(201).json(newPost);
    } catch (error) {
        console.error('Error adding post:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


let get_all_post = async (req, res) => {
    try {
        const posts = await ForumPost.find({}).sort({ createdAt: -1 });

        return res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

require('dotenv').config(); 


let delete_post = async (req, res) => {
    const { postId, password } = req.body; 
    try {
        if (password !== process.env.CODE_MANAGER) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const result = await ForumPost.findByIdAndDelete(postId);
        if (!result) {
            return res.status(404).json({ error: 'Post not found' });
        }

        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = {
    add_post,
    get_all_post,
    delete_post
};
