const express=require('express');
const { getComplaints, getComplaint, raiseComplaint, updateComplaint } = require('../controllers/complaintController');
const protect = require('../middlewares/authMiddleware');

const router=express.Router();


//api->'/api/complaints
router.get('/',protect,getComplaints);

//api->'/api/complaints/id
router.get('/:id',protect,getComplaint);




//api->'/api/complaint
router.post('/',protect,raiseComplaint);

//api->'/api/complaint/id
router.put('/:id',protect,updateComplaint);


// Comments route
router.use('/:id/comment',require('./commentRoutes'))

module.exports=router

