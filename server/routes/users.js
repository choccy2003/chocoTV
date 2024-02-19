var express = require('express');
var router = express.Router();
const Videos=require('../models/videos')
const multer = require('multer');
const Users = require('../models/users');
require('dotenv').config()
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { errorMonitor } = require('events');
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

router.post('/upload-video', upload.fields([{ name: 'mp4file' }, { name: 'jpgfile' }]), async (req, res, next) => {
try {
  const mp4file = req.files['mp4file'][0];
  const jpgfile = req.files['jpgfile'][0];
  if (!mp4file || !jpgfile) {
    const error = new Error('Please attach a file');
    error.statusCode = 400;
    throw error;
  }
  const { videoTitle, videoDescription, channelName, channelId } = req.body;
  const video = new Videos({ videoTitle, videoDescription, channelName, channelId });
  const saveVideo = await video.save();
  const videoResourcePath = `http://localhost:3001/videos/${saveVideo._id}`;
  const thumbnailResourcePath = `http://localhost:3001/images/${saveVideo._id}`;
  saveVideo.videoResourcePath = videoResourcePath;
  saveVideo.thumbnailResourcePath = thumbnailResourcePath;
  await saveVideo.save(); 
  const mp4filename = saveVideo._id+'.mp4'
  const jpgfilename = saveVideo._id+".jpg"
  fs.renameSync('public/videos/' + mp4file.filename, 'public/videos/' + mp4filename);
  fs.renameSync('public/videos/' + jpgfile.filename, 'public/images/' + jpgfilename);
  if (saveVideo) {
    const user = await Users.findByIdAndUpdate(saveVideo.channelId,{$push: {uploadedVideos:saveVideo._id}})
    if(user){
      res.json({msg:'Success',id:saveVideo._id});
    }
    else{
      res.send("Failure")
    }
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
          res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            maxAge: 1000 * 60 * 60 * 24 * 60
          })
          res.json({msg:"Success"})
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
    const tokenCook = req.cookies.token;
    if(tokenCook){
      const decoded= jwt.verify(tokenCook,usersecretKey)
      const user = await Users.findById(decoded.userId).exec();
    
      if(user){
        res.send({data:{userName:user.userName,email:user.email,uploadedVideos:user.uploadedVideos,subscriberCount:user.subscriberCount,subscribedChannels:user.subscribedChannels,subscribedChannelIds:user.subscribedChannelIds,likedVideos:user.likedVideos,userId:user._id},msg:"success"})
      }
      else{
        res.send("Session Expired!")
      }
    }
    else{
      res.send("invalid session")
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
router.post("/fetch-videos",async(req,res,next)=>{
try{
  const videos = await Videos.find().exec()
    if (videos && videos.length > 0) { // Check if videos array is not empty
      const formattedVideos = videos.map(video => ({
        videoTitle: video.videoTitle,
        viewCount: video.viewCount,
        thumbnailResourcePath: video.thumbnailResourcePath,
        videoId: video._id,
        uploadDate: video.uploadDate,
        channelName: video.channelName
      }));
      res.json({ data: formattedVideos });
  }
  else{
    res.send("failure")
  }
  
}
catch(err){
  res.send(errorMonitor)
}
})


module.exports = router;
