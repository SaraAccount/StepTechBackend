
const express = require("express");
const router=express.Router();
const login = require("../controllers/logControllers");

 router.post('/postSign_in',login.sign_in);
router.get('/getAllUser',login.getAllUser);
router.get('/getNameSemMail',login.getNameSemMail);

 router.put('/putSign_up',login.sign_up);
router.delete('/deleteUserById',login.delete_id)
router.put('/updateUser',login.update_data)
router.post('/checkUserExists',login.checkUserExists)
module.exports=router;


