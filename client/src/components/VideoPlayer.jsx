import React, {  useEffect, useRef, useState } from 'react'
import { FaPlay,FaPause,FaStepForward,FaVolumeUp,FaEllipsisV } from "react-icons/fa";
import { MdOutlineZoomInMap,MdOutlineZoomOutMap,MdReplayCircleFilled } from "react-icons/md";
import "../styles/videoplayer.css"
const VideoPlayer = (props) => {
  const [viewControls,updateViewControls]=useState(false)
  const [videoPlaying,updateVideoPlaying]=useState(true)
  const [videoZoomed,updateVideoZoomed]=useState(false)
  const [videoDuration,updateVideoDuration]=useState(0)
  const [videoSoundControls,updateVideoSoundControls]=useState(false)
  const [videoProgressBar,updateVideoProgressBar]=useState(0)
  const [videoSeeker,updateVideoSeeker]=useState(false);
  const [videoReplay,updateVideoReplay]=useState(false)
  const [controlAnimation,updateControlAnimation]=useState(true)
  const video=useRef();
  const videoSlider=useRef();
  const volumeSlider=useRef();
  const videoControls=useRef();

useEffect(()=>{
  if(video.current.duration===video.current.currentTime){
updateViewControls(true)
  }
  else{
    return ()=>{
      if (viewControls===true){
     if(videoControls.current){
    
          videoControls.current.classList.remove("video-controls")
         videoControls.current.classList.add("video-controls-animation")
            
          }
        setTimeout(()=>{
          if(videoControls.current){
          videoControls.current.classList.remove("video-controls-animation")
          videoControls.current.classList.add("video-controls")}
          updateControlAnimation(false)
        },500)
      
       
      }
    }
  }
},[viewControls])
useEffect(()=>{
const videoLoader=()=>{
  updateVideoPlaying(false);
  updateVideoDuration(video.current.currentTime)
  
}
video.current.addEventListener('loadedmetadata',videoLoader)

return ()=>{
  video.current.removeEventListener('loadedmetadata',videoLoader)
}
},[])
const videoDurationString=()=>{
  let videoDurationString=`00:00`;
  if(videoDuration){
    videoDurationString=`${Math.round(videoDuration/60)>=10?Math.round(videoDuration/60):"0"+Math.floor(videoDuration/60)}:${Math.round(videoDuration%60)>=10?Math.round(videoDuration%60):"0"+Math.round(videoDuration%60)}`
  }
  return videoDurationString
}
const videoProgressBarCalculator=()=>{
  if(videoSeeker){
    updateVideoProgressBar(videoSlider.current.target.value)
  }
  else{
    updateVideoProgressBar(((videoDuration/video.current.duration)*100))
  }
    
}
const handleVideoSeek = (value) => {
  updateVideoDuration((value * video.current.duration) / 100)
  console.log(videoDuration)
  updateVideoProgressBar(value);
  
  video.current.currentTime = (value * video.current.duration) / 100;
};
  return (
    <>
      <div className='video-player-container' style={{position:"relative",width:`${props.width}vw`,height:"max-content"}} onMouseLeave={()=>{updateViewControls(false);}}>
      {videoReplay&&(<MdReplayCircleFilled className='replay-button' onClick={()=>{updateVideoReplay(false);video.current.play();updateVideoPlaying(true)}} style={{position:"absolute",inset:"0",margin:"auto",left:"7%",fontSize:"50px"}}/>)}
   
        <video className='video-player' onClick={()=>{if(videoPlaying){video.current.pause();updateVideoPlaying(false)} else{video.current.play();updateVideoPlaying(true);updateVideoReplay(false)}}} onEnded={()=>{updateVideoPlaying(false);updateVideoReplay(true)}} onTimeUpdate={(e)=>{updateVideoDuration(e.target.currentTime); if(videoSeeker===false){videoProgressBarCalculator()};}} ref={video} id='video' style={{width:`${props.width}vw`,borderRadius:"10px"}} onMouseOver={()=>{updateViewControls(true);updateControlAnimation(true)}}  >
        <source src={`http://192.168.1.6:3001/videos/vid${props.videoId}.mp4`} type="video/mp4"/>
        
        </video>
        {(controlAnimation||viewControls||videoReplay)&&(<div ref={videoControls} className='video-controls' style={{display:"flex",flexDirection:"column"}}>
        
        <div >
        
          <input min={0} max={100} ref={videoSlider} style={{  position:"absolute", bottom: '35px',width:`${props.width-1}vw`,margin:"0 0 0.5% 0.5%",accentColor:"#e473ff",height:"5px" }} value={videoProgressBar} className='video-slider' type='range'  onInput={(e) => { updateVideoProgressBar(e.target.value); handleVideoSeek(e.target.value); }}
                onMouseDown={() => { updateVideoSeeker(true); }}
                onClick={()=>{updateVideoSeeker(false);console.log(volumeSlider)}}
                ></input>
          </div>
          <div className='video-controls-buttons' style={{ color: 'white', position:"absolute", bottom: '8px',display:"flex",width:`${props.width}vw`, gap:"2%",fontSize:"18px" }}>
        {videoPlaying?<FaPause onClick={()=>{video.current.pause();updateVideoPlaying(false)}} style={{paddingLeft:"1%"}} />:<FaPlay onClick={()=>{video.current.play();updateVideoPlaying(true)}} style={{paddingLeft:"1%"}} />}<FaStepForward/><FaVolumeUp onClick={()=>{videoSoundControls?updateVideoSoundControls(false):updateVideoSoundControls(true);video.current.muted=false}}/>{videoSoundControls&&(<input ref={volumeSlider} onChange={(e)=>{video.current.volume=e.target.value/100;console.log(e.target.value);volumeSlider.current.style.background=`linear-gradient(90deg, #d3d3d3 ${e.target.value}%,#a1a1a1 0%)`
        }} type="range" min="0" max="100" className="slider" defaultValue={70} style={{background:`linear-gradient(90deg, #d3d3d3 70%, #a1a1a1 0%)`,position:"relative",top:"4px"}}></input>)}<div style={{fontSize:"16px",position:"relative",bottom:"3px",userSelect:"none"}}>{videoDurationString()}</div><FaEllipsisV style={{marginLeft:"auto"}} />{videoZoomed?<MdOutlineZoomInMap  />:<MdOutlineZoomOutMap onClick={()=>{video.current.requestFullscreen()}} style={{paddingRight:"1%",fontSize:"17px"}}/>}
        </div>
        </div>)}
       
    </div>
  
    </>
    
  )
}

export default VideoPlayer