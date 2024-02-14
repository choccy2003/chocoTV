var express = require('express');
var router = express.Router();
const Videos=require('../models/videos')
const multer = require('multer');
const Users = require('../models/users');
require('dotenv').config()
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const fs = require('fs');
const usersecretKey = process.env.SECRET_KEY;
const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, 'public/videos/')
    },
    
    filename: (req, file, cb) => {
      const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname;
      cb(null, uniqueFilename);
    }
});
const upload = multer({ storage });

router.post('/upload-video', upload.single('mp4file'), async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      const error = new Error('Please attach a file');
      error.statusCode = 400;
      throw error;
    }
    const { videoTitle, videoDescription, thumbnailResourcePath, channelName, channelId } = req.body;
    const video = new Videos({ videoTitle, videoDescription, thumbnailResourcePath, channelName, channelId });
    const saveVideo = await video.save();
    const videoResourcePath = `http://localhost:3001/videos/${saveVideo._id}`;
    saveVideo.videoResourcePath = videoResourcePath; 
    await saveVideo.save(); 
    const filename = saveVideo._id+'.mp4'
    fs.renameSync('public/videos/' + file.filename, 'public/videos/' + filename);
    if (saveVideo) {
      res.send('Success');
    } else {
      res.send('Failure');
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
          res.send({data:{userName:userExist.userName,email:userExist.email,uploadedVideos:userExist.uploadedVideos,subscriberCount:userExist.subscriberCount,subscribedChannels:userExist.subscribedChannels,subscribedChannelIds:userExist.subscribedChannelIds,likedVideos:userExist.likedVideos,userId:userExist._id},token:token,msg:"Success"})
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
    res.send({data:{userName:user.userName,email:user.email,uploadedVideos:user.uploadedVideos,subscriberCount:user.subscriberCount,subscribedChannels:user.subscribedChannels,subscribedChannelIds:user.subscribedChannelIds,likedVideos:user.likedVideos,userId:user._id}})
  }
  else{
    res.send("Unauthorized!")
  }
  }
  catch(err){
    res.send(err)
  }

})
router.post('/fetch-video',async(req,res,next)=>{
  try{
    const videoId = req.body._id
    const video = await Videos.findById(videoId).exec()
    if(video){
      res.send(video)
    }
    else{
      res.send("not found")
    }
  }
  catch(err){
    res.send(err)
  }
})


module.exports = router;
