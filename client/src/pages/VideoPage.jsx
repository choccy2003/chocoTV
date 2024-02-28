import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import VideoPlayer from '../components/VideoPlayer'
import VideoDiscription from '../components/VideoDiscription'
import "../styles/videodiscription.css"
import CommentSection from '../components/CommentSection'
import RecommendSection from '../components/RecommendSection'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setVideoData } from '../redux-slice/videoDataSlice'

const VideoPage = () => {
  let { videoId } = useParams();
  const data = useSelector((state) => state.videoData)
  const [filteredData, setFilteredData] = useState()
  useEffect(() => {
    const filteredData = data.filter(video => video.videoId !== videoId);
    setFilteredData(filteredData);
  }, [data, videoId]);
  const dispatch = useDispatch()

  useEffect(() => {
    axios.post("http://localhost:3001/users/fetch-videos", {})
      .then((response) => {
        const videos = response.data.data
        dispatch(setVideoData(videos));
      })
  }, [])
  console.log(videoId)
  const registerView = () => {
    axios.post("http://localhost:3001/users/register-view", { videoId: videoId })
      .then((res) => {
        console.log(res)
      })
  }
  useEffect(() => {


    setTimeout(registerView, 30000)



  }, [])
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "50px" }}>

        <div className='home-page' style={{ display: "flex" }}>

          <div className='video-section' style={{ display: "flex", flexDirection: "column", width: "69%", marginLeft: "2%" }}>
            <VideoPlayer applyMediaQueries={true} videoId={videoId} className="video-section-1" width={64} />

            <VideoDiscription videoId={videoId} />
            <CommentSection />

          </div>
          <div className='recommend-section' style={{ width: "31%", }}>
            {filteredData ? (filteredData.map((data, i) => {
              return <div key={i} style={{ margin: "0px 0 15px 0" }}><RecommendSection data={data} /></div>
            })) : (<div></div>)}

          </div>


        </div>

      </div>
    </>

  )
}

export default VideoPage