const express=require('express');
const { getUsers, getComplaints, updateComplaint, getComments, addComment } = require('../controllers/adminContoller');
const adminProtect = require('../middlewares/adminMiddleware');
const router=express.Router();

router.get('/users',adminProtect,getUsers);
router.get('/complaints',adminProtect,getComplaints);
router.get('/comments',adminProtect,getComments);
router.post('/:cid',adminProtect,addComment);
router.put('/:cid',adminProtect,updateComplaint);

module.exports=router;