import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import VideoPlayer from '../components/VideoPlayer'
import VideoDiscription from '../components/VideoDiscription'
import "../styles/videodiscription.css"
import CommentSection from '../components/CommentSection'
import RecommendSection from '../components/RecommendSection'
import { useParams } from 'react-router-dom'

const VideoPage = () => {
    let {videoId}=useParams();
    const [recommendedVideosArray,updateRecommendedVideosArray]=useState([0,0,0,0,0,0,0,0])
    return (
      <>
      <Navbar/>
       <div style={{marginTop:"50px"}}>
  
  <div className='home-page' style={{display:"flex"}}>
    
    <div className='video-section' style={{display:"flex",flexDirection:"column",width:"69%",marginLeft:"2%"}}>
  <VideoPlayer videoId={videoId} className="video-section-1" width={64}/>
  <VideoDiscription/>
  <CommentSection/>
  
    </div>
    <div className='recommend-section' style={{width:"31%",}}>
      {recommendedVideosArray.map(()=>{
        return <div style={{margin:"0px 0 15px 0"}}><RecommendSection/></div>
      })}
      
    </div>
  
  
  </div>
  
      </div>
      </>
     
    )
}

export default VideoPage