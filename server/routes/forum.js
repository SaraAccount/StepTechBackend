
const express = require("express");
const router=express.Router();
const forum = require("../controllers/forumControllers");

router.post('/addPost',forum.add_post);
router.get('/getAllPost',forum.get_all_post);
router.delete('/delete_post',forum.delete_post);
module.exports=router;
