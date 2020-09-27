const express=require('express');
const router=express.Router();
const {getCalTime}=require('../controllers/map');


router.post('/location',getCalTime);

module.exports=router;