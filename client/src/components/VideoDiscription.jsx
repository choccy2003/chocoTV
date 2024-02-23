import React, { useEffect, useRef, useState } from 'react'
import { IoMdThumbsUp,IoMdThumbsDown } from "react-icons/io";
import { FaShare } from "react-icons/fa";
import "../styles/videodiscription.css"
import axios from 'axios';
import { useSelector } from 'react-redux';
const VideoDiscription = (props) => {
  const likeCount=useRef()
  const [likeButtonActive,setLikeButtonActive]=useState(false)
  const [dislikeButtonActive,setDislikeButtonActive]=useState(false)
  const [isSubscribed,setIsSubscribed]=useState(false)
  const [likeStatus,setLikeStatus]=useState(null)
  const [videoDetails,setVideoDetails]=useState(null)
  
  const userData =useSelector(state => state.userData)
  useEffect(() => {
    
    if (props.videoId) {
      axios.post('http://192.168.1.6:3001/users/fetch-video', { _id: props.videoId })
        .then((response) => {
          setVideoDetails(response.data);
        })
        .catch((error) => {
          console.error('Error fetching video:', error);
        });
        
    }
    
  }, [props.videoId ]);
 
  const handleButtonStatus=()=>{
 
    if(dislikeButtonActive){
      setDislikeButtonActive(false)
    }
    if(likeButtonActive){
      setLikeButtonActive(false)
    }
  }
 
  
   useEffect(()=>{
    
   if(videoDetails){
        const filterArray = userData.likedVideos.filter(id => id==videoDetails._id)
    console.log(filterArray)
    if(filterArray.length>=1){
      setLikeButtonActive(true)
      setDislikeButtonActive(false)
    }
    console.log(videoDetails.likeCount)
   }

   },[userData,videoDetails,likeStatus])

   useEffect(() => {
    if (likeStatus !== null && videoDetails) {
      axios.post("http://localhost:3001/users/handle-like", {
        likeStatus: likeStatus,
        videoId: videoDetails._id
      },{withCredentials:true})
      .then((res) => {
        console.log(res.data)
        console.log("no")
      if(res.data.msg==="Unliked"){
        setLikeButtonActive(false)
      }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      
    }
  }, [likeStatus,videoDetails]);
{/* <div style={{display:"inline-block",height:"5px",backgroundColor:"white",width:"5px",borderRadius:"100%",position:"relative",bottom:"2px",margin:"0 0.5% 0 0.5%"}}></div><span>21h ago</span> */}
if(videoDetails){
  return (
   <>
   <div style={{display:"flex",flexDirection:"column",marginTop:"0.5%",width:"100%"}}>
       <div className='video-title' style={{fontSize:"1.6rem",fontWeight:"500"}}>{videoDetails.videoTitle}</div>
       <div style={{margin:"0.2%",fontWeight:"500",fontSize:"0.9rem"}}>{videoDetails.viewCount} views</div>
       <div style={{display:"flex",marginTop:"0.5%",maxHeight:"40px"}}><div style={{width:"40px",backgroundColor:"white",height:"40px",borderRadius:"50%",marginRight:"1%",minWidth:"40px",backgroundImage:"url(http://192.168.1.6:3001/images/a.jpg)",backgroundSize:"contain"}}></div><div style={{display:"flex",flexDirection:"column"}}><div className='channel-name' style={{fontSize:"1.1rem",fontWeight:"500"}}>{videoDetails.channelName} {isSubscribed?(<span onClick={()=>{setIsSubscribed(false)}} style={{backgroundColor:"#1c1d1f",padding:"1px 4px 2px 4px",fontSize:"0.8rem",borderRadius:"5px",cursor:"pointer"}} className='subscribe-button'>Subscribed</span>):(<span onClick={()=>{setIsSubscribed(true)}} className='subscribe-button' style={{backgroundColor:"#ff2d55",padding:"1px 4px 2px 4px",fontSize:"0.8rem",borderRadius:"5px",cursor:"pointer"}}>Subscribe</span>)}</div><div style={{opacity:"0.7",fontSize:"0.8rem",marginLeft:"0%",width:"max-content"}}>{videoDetails.subscriberCount} subscribers</div></div><div className='share-button' style={{display:"flex",marginLeft:"auto",fontSize:"22px",backgroundColor:"#1c1d1f",padding:"5px 10px",borderRadius:"40px",alignItems:"center",gap:"10px",marginRight:"1%",minHeight:"25px",maxHeight:"25px"}}><FaShare /><div  style={{fontSize:"16px"}}>Share</div></div><div className='button-grid' style={{margin:"0 5% 0 0",display:"flex",fontSize:"25px",gap:"18px",backgroundColor:"#1c1d1f",height:"fit-content",padding:"5px 10px",alignItems:"center",borderRadius:"40px",position:"relative",width:"146px",minHeight:"25px",flexShrink:"0"}}
       ><IoMdThumbsUp className='like-button' onClick={()=>{likeButtonActive?(()=>{setLikeButtonActive(false);setLikeStatus("false")})():(()=>{setLikeButtonActive(true);setLikeStatus("true")})();handleButtonStatus();}} style={{fill:`${likeButtonActive?"rgb(228, 115, 255)":""}`}} /><div ref={likeCount} style={{fontSize:"14px",position:"relative",right:"5%",width:"12px"}}>{videoDetails.likeCount}</div><hr style={{height:"20px",position:"absolute",bottom:"-7px",left:"82px",maxWidth:"1px",backgroundColor:"white"}}/><IoMdThumbsDown className='dislike-button' onClick={()=>{dislikeButtonActive?setDislikeButtonActive(false):setDislikeButtonActive(true);handleButtonStatus()}} style={{fill:`${dislikeButtonActive?"rgb(255, 115, 115)":""}`}} /><div style={{fontSize:"14px",width:"12px"}}>{videoDetails.dislikeCount}</div></div></div>
       <div className='video-description' style={{}}>{videoDetails.videoDescription}</div>
   </div>
   </>
 )
}
else{
  return (
    <>
    <div style={{display:"flex",flexDirection:"column",marginTop:"0.5%",width:"100%"}}>
        <div className='video-title' style={{fontSize:"1.6rem",fontWeight:"500"}}></div>
        <div style={{margin:"0.2%",fontWeight:"500",fontSize:"0.9rem"}}></div>
        <div style={{display:"flex",marginTop:"0.5%",maxHeight:"40px"}}><div style={{width:"40px",backgroundColor:"white",height:"40px",borderRadius:"50%",marginRight:"1%",minWidth:"40px"}}></div><div style={{display:"flex",flexDirection:"column"}}><div className='channel-name' style={{fontSize:"1.1rem",fontWeight:"500"}}> {isSubscribed?(<span onClick={()=>{setIsSubscribed(false)}} style={{backgroundColor:"#1c1d1f",padding:"1px 4px 2px 4px",fontSize:"0.8rem",borderRadius:"5px",cursor:"pointer"}} className='subscribe-button'>Subscribed</span>):(<span onClick={()=>{setIsSubscribed(true)}} className='subscribe-button' style={{backgroundColor:"rgb(255, 115, 115)",padding:"1px 4px 2px 4px",fontSize:"0.8rem",borderRadius:"5px",cursor:"pointer"}}>Subscribe</span>)}</div><div style={{opacity:"0.7",fontSize:"0.8rem",marginLeft:"3%"}}></div></div><div className='share-button' style={{display:"flex",marginLeft:"auto",fontSize:"22px",backgroundColor:"#1c1d1f",padding:"5px 10px",borderRadius:"40px",alignItems:"center",gap:"10px",marginRight:"1%",minHeight:"25px",maxHeight:"25px"}}><FaShare /><div  style={{fontSize:"16px"}}>Share</div></div><div className='button-grid' style={{margin:"0 5% 0 0",display:"flex",fontSize:"25px",gap:"18px",backgroundColor:"#1c1d1f",height:"fit-content",padding:"5px 10px",alignItems:"center",borderRadius:"40px",position:"relative",width:"146px",minHeight:"25px",flexShrink:"0"}}
        ><IoMdThumbsUp className='like-button' style={{fill:`${likeButtonActive?"rgb(228, 115, 255)":""}`}} /><div style={{fontSize:"14px",position:"relative",right:"5%",width:"12px"}}></div><hr style={{height:"20px",position:"absolute",bottom:"-7px",left:"82px",maxWidth:"1px",backgroundColor:"white"}}/><IoMdThumbsDown className='dislike-button' onClick={()=>{dislikeButtonActive?setDislikeButtonActive(false):setDislikeButtonActive(true);handleButtonStatus()}} style={{fill:`${dislikeButtonActive?"rgb(255, 115, 115)":""}`}} /><div style={{fontSize:"14px",width:"12px"}}></div></div></div>
        <div className='video-description' style={{}}></div>
    </div>
    </>
  )
}
  
}

export default VideoDiscription