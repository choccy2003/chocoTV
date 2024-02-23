import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { setVideoData } from '../redux-slice/videoDataSlice'
import { useDispatch, useSelector } from 'react-redux'
import RecommendSection from '../components/RecommendSection'
import VideoPlayer from '../components/VideoPlayer'
import VideoGrid from '../components/VideoGrid'
const HomePage = () => {
  const dispatch= useDispatch()
  const data = useSelector((state)=>state.videoData)
  useEffect(()=>{
    axios.post("http://192.168.1.6:3001/users/fetch-videos",{})
    .then((response)=>{
      const videos = response.data.data
      dispatch(setVideoData(videos));
    })
  },[])
  return (
    <div>
    <Navbar/>
    <div style={{marginTop:"50px"}}>
      {/* {
        data?(data.map((data)=>{
          return <div style={{margin:"20px"}}><RecommendSection data={data}/></div>
        })):(<div></div>)
      } */}
    <div className='hero-section' style={{display:"flex",marginLeft:"40px",justifyContent:"space-evenly"}}>
<div className='hero-font' style={{fontSize:"44px",whiteSpace:"nowrap",fontFamily:"Righteous",margin:"5% 0% 0% -10%"}}>Explore the Latest Trends<br/>in Video Content Discover<br/> What's Creating a Buzz<br/> Among Viewers<br/><div style={{fontSize:"16px",fontFamily:"calibri",lineHeight:"20px",marginTop:"10px"}}>Dive into the depths of the ocean with us as we uncover the mysteries that lie beneath<br/> the waves. From vibrant coral reefs to mysterious shipwrecks, prepare to be amazed by<br/> the beauty and diversity of marine life</div> </div>
<div style={{marginTop:"3%"}}><VideoPlayer applyMediaQueries={false} videoId={"65d3684327189425cceb253d"} width={35} autoPlay={true} /> </div>
    </div>
    <div style={{margin:"4% 1%"}}>
      <VideoGrid title={"Trending Now"} data={data} />
      <VideoGrid title={"Your Subscriptions"} data={data} />
      <VideoGrid title={"Your Liked Videos"} data={data} />
      <VideoGrid title={"Recommendations"} data={data} />
    </div>


    </div>
    
    </div>
  )
}

export default HomePage