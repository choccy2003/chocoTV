import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { setVideoData } from '../redux-slice/videoDataSlice'
import { useDispatch, useSelector } from 'react-redux'
import RecommendSection from '../components/RecommendSection'
const HomePage = () => {
  const dispatch= useDispatch()
  const data = useSelector((state)=>state.videoData)
  console.log(data)
  useEffect(()=>{
    axios.post("http://localhost:3001/users/fetch-videos",{})
    .then((response)=>{
      console.log(response.data.data)
      const videos = response.data.data
      dispatch(setVideoData(videos));
    })
  },[])
  return (
    <div>
    <Navbar/>
    <div style={{marginTop:"50px"}}>
      {
        data?(data.map((data)=>{
          return <div style={{margin:"20px"}}><RecommendSection data={data}/></div>
        })):(<div></div>)
      }

    </div>
    
    </div>
  )
}

export default HomePage