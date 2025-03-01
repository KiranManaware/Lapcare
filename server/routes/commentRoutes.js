const express=require('express');
const protect = require('../middlewares/authMiddleware');
const { getComments, addComment } = require('../controllers/commentController');
const router=express.Router({mergeParams:true});


router.get('/',protect,getComments);
router.post('/',protect,addComment);

module.exports=router;