const express=require('express');
const { getUsers, getComplaints, updateComplaint, getComments, addComment } = require('../controllers/adminContoller');
const adminProtect = require('../middlewares/adminMiddleware');
const router=express.Router();

//All user
// /api/admin/users
router.get('/users',adminProtect,getUsers);

//All complaints
// /api/admin/complaints
router.get('/complaints',adminProtect,getComplaints);

//All comments
// /api/admin/comments
router.get('/comments',adminProtect,getComments);

//add comment
// /api/admin/:id
router.post('/:cid',adminProtect,addComment);

//update complaint
// /api/admin/:id
router.put('/:cid',adminProtect,updateComplaint);

module.exports=router;