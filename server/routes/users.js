var express = require('express');
var router = express.Router();
const Videos=require('../models/videos')
const multer = require('multer');
const Users = require('../models/users');
require('dotenv').config()
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const usersecretKey = process.env.SECRET_KEY;
const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, 'public/videos/')
    },
    
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage });

router.post('/upload-video', upload.single('mp4file'), async (req, res, next) => {
  try {
    console.log('Received file upload request');
    
    const file = req.file;
    if (!file) {
      const error = new Error('Please attach a file');
      error.statusCode = 400;
      throw error;
    }
    
    console.log('File:', file);
    
    const { videoTitle, videoDescription, videoResourcePath, thumbnailResourcePath, channelName, channelId } = req.body;
    console.log('Received form data:', req.body);
    
    const video = new Videos({ videoTitle, videoDescription, videoResourcePath, thumbnailResourcePath, channelName, channelId });
    const saveVideo = await video.save();

    if (saveVideo) {
      console.log('Video saved successfully');
      res.send('File uploaded successfully and video saved successfully');
    } else {
      console.log('Failed to save video');
      res.send('File uploaded successfully but video failed to save');
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  }
});

router.post('/register',async(req, res, next)=>{
  try{
    const {userName,password,email,phoneNumber}=req.body;
    const userExist= await Users.findOne({email}).exec()
    if(userExist){
      res.send({msg:"failure"})
    }
    else{
      
      bcrypt.hash(password, 10).then((hash) => {
        const user = new Users({
          userName: userName,
          password: hash,
          email: email,
          phoneNumber: phoneNumber
        });
        return user.save();
      })
      .then(savedUser => {
        res.send({data:savedUser.$assertPopulated,msg:"success"});
      })
    }
    
  }
  catch(err){
    res.send(err)
  }

})
router.post('/login',async(req,res,next)=>{
  try{
    const {email,password}=req.body;
    const userExist=await Users.findOne({email}).exec();
    if(userExist){
      const savedPassword=userExist.password;
      bcrypt.compare(password,savedPassword).then((match)=>{
        if(!match){
          res.send("Match Failure")
        }
        else{
          const token = jwt.sign({userId: userExist._id},usersecretKey,{expiresIn:'30d'});
          res.send({data:{userName:userExist.userName,email:userExist.email,uploadedVideos:userExist.uploadedVideos,subscriberCount:userExist.subscriberCount,subscribedChannels:userExist.subscribedChannels,subscribedChannelIds:userExist.subscribedChannelIds,likedVideos:userExist.likedVideos},token:token,msg:"Success"})
        }
      })
    }
    else{
      res.send("Failure")
    }
  }
  catch(err){
    res.send(err)
  }
})
router.post("/fetch-user-data",async(req,res,next)=>{
  
  try{
  const token = req.headers.authorization.split(' ')[1];
  const decoded= jwt.verify(token,usersecretKey)
  const user = await Users.findById(decoded.userId).exec();

  if(user){
    res.send({data:{userName:user.userName,email:user.email,uploadedVideos:user.uploadedVideos,subscriberCount:user.subscriberCount,subscribedChannels:user.subscribedChannels,subscribedChannelIds:user.subscribedChannelIds,likedVideos:user.likedVideos}})
  }
  else{
    res.send("Unauthorized!")
  }
  }
  catch(err){
    res.send(err)
  }

})


module.exports = router;
