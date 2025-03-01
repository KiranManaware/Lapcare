const express=require('express');
const { register, login, privateRoute } = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware');

const router=express.Router();

//  url->'/api/user/register'
// user register route
router.post('/register',register);

//  url->'/api/user/login'
// user login route
router.post('/login',login);

// For private route
// url->/api/user/private
router.post('/private',protect,privateRoute);

module.exports=router;