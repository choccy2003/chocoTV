import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const VideoCard = (props) => {
const title = useRef(null)
useEffect(()=>{
    
    if(title.current.textContent.split('').length > 60){
        title.current.style.color="white"
        title.current.textContent=title.current.textContent.slice(0,45)+"..."
    }
    else{
        title.current.style.color="white"
    }    
},[title])
const navigate = useNavigate()

  return (
   <>
   <div onClick={()=>{
    navigate(`/video/${props.data.videoId}`);
    window.scrollTo(0,0)
   }} style={{marginTop:"10px",cursor:"pointer",minWidth:"300px"}}>
    <div>
    <img style={{borderRadius:"15px"}} width={"100%"} src={props.data.thumbnailResourcePath+".jpg"} />
    </div>
    <div style={{display:"flex",alignItems:"center"}}>

    <div style={{width:"35px",backgroundColor:"white",height:"35px",borderRadius:"50%",margin:"2% 1%",minWidth:"35px",backgroundImage:"url(http://192.168.1.6:3001/images/a.jpg)",backgroundSize:"contain"}}></div>
    <div ref={title} style={{fontSize:"17px",fontWeight:"500",margin:"1% 2% 2% 2%",color:"transparent"}}>
    {props.data.videoTitle}
    </div>
   
    </div>
    <div style={{display:"flex",position:"relative",left:"50px",opacity:"0.7",fontSize:"14px",position:"relative",bottom:"5px"}}>
        <div>
            {props.data.channelName}
        </div>
         <div style={{backgroundColor:"white",width:"4px",borderRadius:"100%",height:"4px",margin:"9px 9px 9px 9px"}}></div>
         <div>
            {props.data.viewCount} views
         </div>
    </div>
   </div>
   </>
  )
}

export default VideoCard